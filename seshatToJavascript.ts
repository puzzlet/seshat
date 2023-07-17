import { CharStreams } from 'antlr4ts/CharStreams';
import { CommonTokenStream } from 'antlr4ts/CommonTokenStream';
import { AbstractParseTreeVisitor } from 'antlr4ts/tree/AbstractParseTreeVisitor';
import assert from 'assert';

import { EgyptianNumber } from './egyptianNumber';
import { SeshatLexer } from './grammar/seshat/SeshatLexer';
import {
    Addition_statementContext, Assert_equal_statementContext, Division_statementContext,
    Function_call_statementContext, IntegerContext, Multiplication_statementContext, NumberContext,
    Reverse_subtraction_statementContext, SeshatParser, Single_fractionContext,
    String_literalContext, TermContext
} from './grammar/seshat/SeshatParser';
import { SeshatParserVisitor } from './grammar/seshat/SeshatParserVisitor';

export class SeshatToJavascript extends AbstractParseTreeVisitor<string> implements SeshatParserVisitor<string> {
  static transpile(script: string): string {
    const chars = CharStreams.fromString(script);
    const lexer = new SeshatLexer(chars);
    const tokens = new CommonTokenStream(lexer);
    const parser = new SeshatParser(tokens);
    const tree = parser.seshat_start_rule();
    const visitor = new SeshatToJavascript();

    const javascriptCode: string = visitor.visit(tree);
    return javascriptCode;
  }

  visitAddition_statement(ctx: Addition_statementContext): string {
    const args = ctx._summands.map(arg => this.visit(arg)).join(', ');
    return `temp = seshatEnvironment.EgyptianNumber.addAll(${args});`;
  }

  visitReverse_subtraction_statement(ctx: Reverse_subtraction_statementContext): string {
    return `temp = seshatEnvironment.EgyptianNumber.subtract(${this.visit(ctx._minuend)}, ${this.visit(ctx._subtrahend)});`;
  }

  visitMultiplication_statement(ctx: Multiplication_statementContext): string {
    const args = ctx._factors.map(arg => this.visit(arg)).join(', ');
    return `temp = seshatEnvironment.EgyptianNumber.multiply(${args});`;
  }

  visitDivision_statement(ctx: Division_statementContext): string {
    return `temp = seshatEnvironment.EgyptianNumber.divide(${this.visit(ctx._dividend)}, ${this.visit(ctx._divisor)});`;
  }

  visitAssert_equal_statement(ctx: Assert_equal_statementContext): string {
    return `seshatEnvironment.assertEqual(temp, ${this.visit(ctx._value)});`;
  }

  visitFunction_call_statement(ctx: Function_call_statementContext): string {
    const functionName = ctx._name.text;
    assert(! functionName.includes('"'));
    const args = ctx._args.map(arg => this.visitTerm(arg)).join(', ');
    if (functionName == '𓏞𓏜𓎡') {
      return `seshatEnvironment.print(${args});`;
    }
    return `${functionName}(${args});`;
    // `seshatCall("${functionName}", context?, ${args});`;
  }

  visitTerm(ctx: TermContext): string {
    if (ctx.WHAT_HAS_BEEN_FOUND()) return 'temp';
    if (ctx.string_literal()) return this.visitString_literal(ctx.string_literal());
    if (ctx.number()) return this.visitNumber(ctx.number());
    return '';
  }

  visitString_literal(ctx: String_literalContext | undefined): string {
    if (! ctx)  return '';
    return JSON.stringify(ctx.text.replace(/^𓆓𓌃(.*)𓂢$/, '$1'));
  }

  visitNumber(ctx: NumberContext | undefined): string {
    if (! ctx)  return '';
    const parsed = this.parseNumber(ctx);
    return `(new seshatEnvironment.EgyptianNumber(${parsed.nominator}, ${parsed.denominator}))`;
  }

  parseNumber(ctx: NumberContext): EgyptianNumber {
    return ctx.children?.map(child => {
      if (child instanceof IntegerContext) return this.parseInteger(child);
      else if (child instanceof Single_fractionContext)  return this.parseSingle_fraction(child);
      return new EgyptianNumber(0);
    }).reduce(EgyptianNumber.add) || new EgyptianNumber(0);
  }

  parseSingle_fraction(ctx: Single_fractionContext): EgyptianNumber {
    const tokenToFraction:{[key: string]: EgyptianNumber} = {
      '𓐛': new EgyptianNumber(1, 2),
      '𓂌': new EgyptianNumber(2, 3),
      '𓂍': new EgyptianNumber(3, 4),
      '𓏴': new EgyptianNumber(1, 4),
    }
    if (ctx.text in tokenToFraction) {
      return tokenToFraction[ctx.text];
    }
    return new EgyptianNumber(1, EgyptianNumber.parseIntegerFromString(ctx._denominator.text));
  }

  parseInteger(ctx: IntegerContext): EgyptianNumber {
    return new EgyptianNumber(EgyptianNumber.parseIntegerFromString(ctx.text));
  }

  protected defaultResult(): string {
    return '';
  }

  protected aggregateResult(aggregate: string, nextResult: string): string {
    return aggregate + '\n' + nextResult;
  }
}
