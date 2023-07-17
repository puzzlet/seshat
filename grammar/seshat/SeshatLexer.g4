/**
 * Seshat grammar version 2023.07a.
 *
 * The grammar is subject to change, especially if the Egyptian grammar was found wrong.
 *
 * Design principles:
 *  - Make it close to natural ancient Egyptian phrases. (Think of what BASIC is to English language.)
 *  - Especially the phrases written on the mathematical papyri. These are written in Middle Egyptian.
 *
 * Some considerations:
 *  - *Lack of spaces & punctuations*. Egyptians didn't have punctuations. They didn't space between words. Line breaks were inconsistant among the written texts. This was probably not a problem with human readers, but it is with parsers.
 *  - *Glyph layout*. 𓂋 *over* 𓏼 means "1/3", but 𓂋 *next to* 𓏼  means "more than 3". There is a set of unicode control letters for the hieroglyph layouts; but because of the poor font support, we're not using it. So whenever there is an ambiguity we have to choose either one.
 *  - *Grammatical gender*. Following the papyrus texts, numbers will be marked masculine where they should be marked. (No such a case yet.) Second persons in Middle Egyptian language also had gender, so imperative should be marked masculine or feminine. Here imperative verbs will be marked masculine, reluctantly following the papyrus texts.
 *
 * Abbreviations:
 *  - MMP - Moscow Mathematical Papyrus
 *  - RMP - Rhind Mathematical Papyrus
 */
lexer grammar SeshatLexer;


/**
 * 𓂋 r "with respect to" (preposition)
 */
R: '𓂋' ;

/**
 * 𓂢 grḥ "end" (noun), actually used to mark the end of scripts.
 */
END: '𓂢' ;

/**
 * 𓆓𓌃 ḏd-mdw "recitation" (literally "saying words"), commonly used in religious texts as starting quotation mark.
 *
 * It seems that there was no end quotation mark. 𓂢 grḥ "end" is not a end quotation mark, but used here for the similarity.
 */
STRING_LITERAL: '𓆓𓌃' ~'\u{130a2}'+ END ;
// TODO: '\n' END ?

/**
 * 𓋬𓂧𓎡 dmd=k "you sum up"
 *
 * Attested in RMP Problems 63 & 65, MMP Problems 14 & 25.
 */
SUM_UP: '𓋬𓂧𓎡' ;

/**
 * 𓐍𓃀𓏴𓎡 ḫb=k "you reduce"
 *
 * Attested in RMP Problems 43, 63, 64, & 72, MMP Problems 13 & 39.
 */
REDUCE: '𓐍𓃀𓏴𓎡' ;

/**
 * 𓎝𓎛𓏛𓁶𓏤 wꜣḥ-tp (lit. "bow head")
 *
 * Used in RMP for working on calculation table for multiplication & division.
 */
WORK: '𓎝𓎛𓏛𓁶𓏤' ;

/**
 * 𓈖𓇋𓋴𓀁𓎡 njs=k "you call upon"
 *
 * Attested in RMP 2/3, 2/17, 2/41, 2/53, 2/65, 2/77, 2/89, Problems 35, 63, 66, and MMP Problem 7.
 */
DIVIDE: '𓈖𓇋𓋴𓀁𓎡' ;

/**
 * 𓊃𓊪𓊗 zp "times" (as in both "three times a day" & "2 times 3")
 *
 * Attested in most of the problems of RMP & MMP.
 */
TIMES: '𓊃𓊪𓊗' ;

/**
 * 𓏃 ḫnt "at the head of" (preposition)
 */
IN_FRONT_OF: '𓏃' ;

/**
 * 𓇋𓂋 jr "if" (particle)
 */
IF: '𓇋𓂋' ;

/**
 * 𓊢𓂝𓈖 ꜥḥꜥ.n "then" (introductory word to describe subsequent action. lit. "stood up")
 */
THEN: '𓊢𓂝𓈖' ;

/**
 * 𓁹𓎡 jr=k "you do"
 */
DO: '𓁹𓎡' ;

/**
 * 𓅓 m "in" (preposition)
 */
M: '𓅓' ;

/**
 * 𓎛𓈖𓂝 ḥnꜥ  "together with" (conjunction)
 */
AND: '𓎛𓈖𓂝' ;

/**
 * 𓅠𓅓𓏏𓈖 gm.t.n
 */
WHAT_HAS_BEEN_FOUND: '𓅠𓅓𓏏𓈖' ;
// TODO: gm.t or gm.t.n?

/**
 * 𓆣𓂋𓐍𓂋 ḫpr-ḫr[=f] "[It] shall become"
 */
IT_SHALL_BECOME: '𓆣𓂋𓐍𓂋' ;

INTEGER
    : ('𓁨'+ '𓆐'* TEN_THOUSANDS* THOUSANDS* HUNDREDS* TENS* ONES*)
    | ('𓆐'+ TEN_THOUSANDS* THOUSANDS* HUNDREDS* TENS* ONES*)
    | (TEN_THOUSANDS+ THOUSANDS* HUNDREDS* TENS* ONES*)
    | (THOUSANDS+ HUNDREDS* TENS* ONES*)
    | (HUNDREDS+ TENS* ONES*)
    | (TENS+ ONES*)
    | (ONES+)
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

/**
 * 𓐛 "1/2", 𓂌 "2/3", 𓂍 "3/4", and 𓏴 "1/4"
 *
 * 𓂍 was rarely used, and 𓏴 was found in hieratic texts in papyri.
 *
 * "Horus eye notations" were also used in Egyptian texts, but they were only for specific fractional units of grains, not for the number. Also they're unlikely to be fragments of the Horus' eye. [Ritter 2002]
 */
SPECIAL_FRACTION: ('𓐛' | '𓂌' | '𓂍' | '𓏴');
// TODO: Along with Aa13, there are Aa14, Aa15, & Aa16. Should they also be accepted as 1/2?

HIEROGLYPH_RANGE: '\u{13000}'..'\u{1342e}' ;

SKIP_: ([ \t\r\n\f]+ | COMMENT) -> skip ;

fragment COMMENT
    : '#' ~[\r\n\f]*
    ;
