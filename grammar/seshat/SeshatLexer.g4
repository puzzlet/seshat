lexer grammar SeshatLexer;


INTEGER
    : ('𓁨'+ '𓆐'* TEN_THOUSANDS* THOUSANDS* HUNDREDS* TENS* ONES*)
    | ('𓁨'* '𓆐'+ TEN_THOUSANDS* THOUSANDS* HUNDREDS* TENS* ONES*)
    | ('𓁨'* '𓆐'* TEN_THOUSANDS+ THOUSANDS* HUNDREDS* TENS* ONES*)
    | ('𓁨'* '𓆐'* TEN_THOUSANDS* THOUSANDS+ HUNDREDS* TENS* ONES*)
    | ('𓁨'* '𓆐'* TEN_THOUSANDS* THOUSANDS* HUNDREDS+ TENS* ONES*)
    | ('𓁨'* '𓆐'* TEN_THOUSANDS* THOUSANDS* HUNDREDS* TENS+ ONES*)
    | ('𓁨'* '𓆐'* TEN_THOUSANDS* THOUSANDS* HUNDREDS* TENS* ONES+)
    ;

ONES
    : '𓏺' | '𓏻' | '𓏼' | '𓏽' | '𓏾'
    | '𓏿' | '𓐀' | '𓐁' | '𓐂'
    | '𓐃'
    ;
TENS
    : '𓎆' | '𓎇' | '𓎈' | '𓎉' | '𓎊'
    | '𓎋' | '𓎌' | '𓎍' | '𓎎'
    | '𓎏' | '𓎐' | '𓎑' | '𓎒'
    ;
HUNDREDS
    : '𓍢' | '𓍣' | '𓍤' | '𓍥' | '𓍦'
    | '𓍧' | '𓍨' | '𓍩' | '𓍪' | '𓍫'
    ;
THOUSANDS
    : '𓆼' | '𓆽' | '𓆾' | '𓆿' | '𓇀'
    | '𓇁' | '𓇂' | '𓇃' | '𓇄'
    ;
TEN_THOUSANDS
    : '𓂭' | '𓂮' | '𓂯' | '𓂰' | '𓂱'
    | '𓂲' | '𓂳' | '𓂴' | '𓂵' | '𓂶'
    ;

SPECIAL_FRACTION: ('𓐛' | '𓂌' | '𓂍' | '𓏴');
// TODO: Along with Aa13, there are Aa14, Aa15, & Aa16. Should they also be accepted as 1/2?
// NOTE: "Horus eye notation" was also used in Egyptian texts, but it was only for specific (fractional) unit of grains, not for the number.

R: '𓂋' ; // r "with respect to" (preposition)

END: '𓂢' ; // grḥ "end" (noun), actually used to mark the end of scripts.

STRING_LITERAL: '𓌃𓆓' ~'\u{130a2}'+ END ; // 𓌃𓆓 ḏd-mdw "recitation" (literally "saying words"), commonly used in religious texts as starting quotation mark. (It seems that there's no end quotation mark.)

SUM_UP: '𓋬𓂧' ; // dmd "sum up" -- attested in RMP Problems 63 & 65, MMP Problems 14 & 25
REDUCE: '𓐍𓃀𓏴' ; // ḫb "reduce" -- attested in RMP Problems 43, 63, 64, & 72, MMP Problems 13 & 39
WORK: '𓎝𓎛𓏛𓁶𓏤' ; // wꜣḥ-tp (lit. "bow head") -- used in RMP to work on calculation table for multiplication & division.
DIVIDE: '𓈖𓇋𓋴𓀁' ; // njs "call upon" - attested in RMP 2/3, 2/17, 2/41, 2/53, 2/65, 2/77, 2/89, Problems 35, 63, 66, and MMP Problem 7

TIMES: '𓊃𓊪𓊗' ; // zp "times" (as in both "three times a day" & "2 times 3") -- attested in most of the problems of RMP & MMP.
IN_FRONT_OF: '𓏃' ; // ḫnt "at the head of" (preposition)

IF: '𓇋𓂋' ;  // jr "if" (particle)
THEN: '𓊢𓂝𓈖' ; // ꜥḥꜥ.n "then" (introductory word to describe subsequent action. lit. "stood up")

DO: '𓁹𓎡' ; // jr=k
M: '𓅓' ; // m "in" (preposition)
AND: '𓎛𓈖𓂝' ; // ḥnꜥ  "together with" (conjunction)

WHAT_HAS_BEEN_FOUND: '𓅠𓅓𓏏𓈖'; // gm.t.n
// TODO: gm.t or gm.t.n?

IT_SHALL_BECOME: '𓆣𓂋𓐍𓂋';

HIEROGLYPH_RANGE: '\u{13000}'..'\u{1342e}' ;

SKIP_: ([ \t\r\n\f]+ | COMMENT) -> skip ;

fragment COMMENT
    : '#' ~[\r\n\f]*
    ;
