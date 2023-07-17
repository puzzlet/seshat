/**
 * Seshat grammar version 2023.07a.
 *
 * The grammar is subject to change.
 *
 * See SeshatLexer.g4 for the design principle.
 */
parser grammar SeshatParser;

options {
    tokenVocab=SeshatLexer;
}


seshat_start_rule: statement*;

statement
    : arithmetic_statement
    | function_call_statement
    | conditional_statement
    | assert_equal_statement
    | term;

arithmetic_statement
    : addition_statement
    | reverse_subtraction_statement
    | multiplication_statement
    | division_statement
    ;

/**
 * | dmd=k XX ḥnꜥ YY ḥnꜥ ZZ
 * | "You Sum up XX, YY, and ZZ."
 * | ``temp = XX + YY + ZZ;``
 */
addition_statement: SUM_UP summands+=term (AND summands+=term)+;

/**
 * | ḫb=k YY ḫnt XX
 * | "You Reduce YY from XX."
 * | ``temp = XX - YY;``
 */
reverse_subtraction_statement: REDUCE subtrahend=term IN_FRONT_OF minuend=term;

/**
 * | wꜣḥ-tp m XX zp YY
 * | "(You) Calculate YY times XX."
 * | ``temp = XX * YY;``
 */
multiplication_statement: WORK M factors+=term TIMES factors+=term;

/**
 * | njs m XX ḫnt YY
 * | "Divide XX by YY."
 * | ``temp = XX / YY;``
 */
division_statement: DIVIDE dividend=term IN_FRONT_OF divisor=term;

function_call_statement: DO name=identifier (M args+=term (AND args+=term)*)? ;
// TODO: proper preposition other than M

conditional_statement: IF term THEN statement+ END;

/**
 * | ḫpr-ḫr[=f] XX
 * | "[It] shall become XX"
 * | ``assert temp == XX;``
 */
assert_equal_statement: IT_SHALL_BECOME value=term;
identifier: HIEROGLYPH_RANGE+;

term
    : number
    | string_literal
    | WHAT_HAS_BEEN_FOUND
    ;

number: (integer single_fraction*) | (single_fraction+);
integer: INTEGER;
single_fraction: SPECIAL_FRACTION | (R denominator=INTEGER);

string_literal: STRING_LITERAL;
