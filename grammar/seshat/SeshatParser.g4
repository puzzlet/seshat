parser grammar SeshatParser;

options {
    tokenVocab=SeshatLexer;
}


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

arithmetic_statement
    : addition_statement
    | reverse_subtraction_statement
    | multiplication_statement
    | division_statement
    ;

addition_statement: SUM_UP summands+=term (AND summands+=term)+;
// dmd.ḫr=k XX ḥnꜥ YY ḥnꜥ ZZ
// "(You) Sum up XX, YY, and ZZ."
// temp = XX + YY + ZZ;

reverse_subtraction_statement: REDUCE subtrahend=term IN_FRONT_OF minuend=term;
// ḫb=k YY ḫnt XX
// "(You) Reduce YY from XX."
// temp = XX - YY;

multiplication_statement: WORK M factors+=term TIMES factors+=term;
// wꜣḥ-tp m XX zp YY
// "(You) Calculate YY times XX."
// temp = XX * YY;

division_statement: DIVIDE dividend=term IN_FRONT_OF divisor=term;

function_call_statement: DO name=identifier (M args+=term (AND args+=term)*)? ;
// TODO: proper preposition other than M

conditional_statement: IF term THEN statement+ END;

assert_equal_statement: IT_SHALL_BECOME value=term;
// ḫpr-ḫr[=f] XX
// "[It] shall become XX"
// assert temp == XX;

statement
    : arithmetic_statement
    | function_call_statement
    | conditional_statement
    | assert_equal_statement
    | term;

seshat_start_rule: statement*;
