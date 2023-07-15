**Seshat** is a programming language in Egyptian hieroglyphs. Its goal is to make programming easy for anyone who can read and write Egyptian hieroglyphs.

"Seshat" (𓋇 Zẖꜣ.t) is the name of an Egyptian goddess. The goddess of writing, architecture, and mathematics, she would definitely be the goddess of programming.

```seshat
# hello.seshat
𓁹𓎡 𓏞𓏜𓎡 𓅓 𓌃𓆓𓇋𓐩𓋇𓅨𓂋𓏏𓎟𓏞𓎟𓐪𓏧𓂢
# ir=k zẖꜣ=k ḏd-mdw j.nḏ Zẖꜣ.t Nb.t Wr.t Zẖꜣ Nb.t Jqd.w grḥ
# "Do write: "Hail Seshat, the Great, Mistress of the Script, Mistress of the Builders."
```

```sh
$ node build/lib/seshat.js hello.seshat
𓇋𓐩𓋇𓅨𓂋𓏏𓎟𓏞𓎟𓐪𓏧
```

## Documentation

TODO

## Shoutouts for Ancient Egyptians

It's here because nobody will read it if it's in the documentation.

### Algorithms before antiquity

Among the oldest mathematical texts in human history are Rhind Mathematical Papyrus and Moscow Mathematical Papyrus. They mostly consist of problems and their solutions, and the solutions are written as line-by-line instructions. Like a description of an algorithm, they're very programmatic:

> Make 10 _heqats_ of the fat into _ro_; it shall become 3200.  
> Make a year into days; it shall become 365.  
> Divide 3200 by 365; it shall become 8 + 2/3 + 1/10 + 1/2190.  
> Make this in [_haqet_ and _ro_ notation]; 1/64 [_haqet_ and] 1/3 + 1/10 + 1/2190 _ro_.
>
> -- from Rhind Mathematical Papyrus Problem 66

```python
x = heqat_to_ro(10)
assert x == 3200
assert days_in_a_year == 365
x = x / days_in_a_year
assert x == 8 + 2/3 + 1/10 + 1/2190
result = ro_to_haqet_and_ro(x)
assert result.haqet == 1/64
assert result.ro == 1/13 + 1/10 + 1/2190
```

### Binary calculations

For multiplications and divisions, Egyptians used a method called "doubling." For example, to calculate 2000 * 5:

```
\1      2000
 2      4000
\4      8000
Total  10000
```
-- from Rhind Mathematical Papyrus Problem 52

Over 3000 years later, it is similar to how computers multiply numbers every day.

### Type systems everywhere

Egyptians used what we call "determinatives" at the ends of words to specify the categories of the meanings of the words. For example, the words 𓊢𓂝𓂻 ꜥḥꜥ "to stand" and 𓊢𓂝𓇤 ꜥḥꜥ "heap, quantity (in mathematics)" share the same spelling 𓊢𓂝 ꜥḥꜥ, but the determinatives 𓂻 and 𓇤 tell the meaning and make the words different. Like when we declare variables in typed programming languages.

In Seshat, you might use 𓇤 at the end of a variable to indicate it's about the quantity, namely a number variable. Or a papyrus scroll 𓏛 for the string variables.

## References & Further Readings

### The first books

Reimer (2014) is a good introductory book about ancient Egyptian mathematics.

If you are interested in Egyptian hieroglyphs for the first time, McDermott (2001) would be a good starter. Collier & Manley (1998) gives more about grammar and vocabulary.

- Collier, M. & Manley, B. (1998). _How to read Egyptian hieroglyphs: a step-by-step guide to teach yourself_. Univ of California Press.
  - [at archive.org](https://archive.org/details/how-to-read-egyptian-hieroglyphs-a-step-by-step-guide-to-teach-yourself-mark-collier-z-library)
  - 《(대영박물관이 만든) 이집트 상형문자 읽는 법》. 하연희 옮김. 루비박스, 2005.
- McDermott, B. (2001). _Decoding Egyptian hieroglyphs: How to read the secret language of the pharaohs_. Chronicle Books.
  - [at archive.org](https://archive.org/details/decodingegyptian0000mcde)
  - 《파라오의 비밀문자: 이집트 상형문자 읽는 법》. 권영진 옮김. 예경, 2005.
- Reimer, D. (2014). _Count like an Egyptian: a hands-on introduction to ancient mathematics_. Princeton University Press.

### Language & dictionaries

- Allen, J. P. (2000). _Middle Egyptian: An introduction to the language and culture of hieroglyphs_. Cambridge University Press.
  - [at archive.org](https://archive.org/details/middleegyptianin0000alle)
- Budge, E. A. W. (1911). _A Hieroglyphic Vocabulary to the Theban Recension of the Book of the Dead: with an index to all the English equivalents of the Egyptian words_ (Vol. 31). Kegan Paul, Trench, Trübner & Co. Ltd.
  - [at archive.org](https://archive.org/details/in.ernet.dli.2015.69888)
- Budge, E. A. W. (1920). _An Egyptian Hieroglyphic Dictionary: with an index of english words, king list, and geographical list with indexes, list of hieroglyphic characters, coptic and semitic alphabets_ (Vols. 1-2). John Murray.
  - [Vol. 1 at archive.org](https://archive.org/details/egyptianhierogly01budguoft)
  - [Vol. 2 at archive.org](https://archive.org/details/egyptianhierogly02budguoft)
- Dickson, P. (2006). _Dictionary of middle Egyptian in Gardiner classification order_.
- Faulkner, R. O. (1964). _A concise dictionary of Middle Egyptian_.
  - [at archive.org](https://archive.org/details/concisedictionar0000faul)
- Gardiner, A. H. (1927). _Egyptian grammar: being an introduction to the study of hieroglyphs_. 3rd ed. Oxford University Press.
  - [at archive.org](https://archive.org/details/egyptiangrammar0000alan)
- Loprieno, A. (1995). _Ancient Egyptian: a linguistic introduction_. Cambridge University Press.
  - [at archive.org](https://archive.org/details/ancientegyptianl0000lopr)

### Online dictionaries

- Kilani, Marwan. (2000). _Madùwwe Project - [ThotBank dataset](http://maduwwe.herokuapp.com/ThotBank/)_.
- [_Ancient Egyptian Dictionary_](https://simondschweitzer.github.io/aed/).
- [_Thesaurus Linguae Aegyptiae_](https://aaew.bbaw.de/tla/index.html).

### The texts & researches

- Chace, A. B., Archibald, R. C., Bull, L., Glanville, S. R. K., & Manning, H. P. (1929). _The Rhind Mathematical Papyrus. Volume II: Photographs, Transcription Transliteration, Literal Translation_. Mathematical Association of America.
  - [at archive.org](https://archive.org/details/arnoldbuffumchaceludlowbullhenryparkermanningtherhindmathematicalpapyrus.volumei)
- Clagett, M. (1999). _Ancient Egyptian Science: A Source Book_ (vol. 3). American Philosophical Society.
  - [at archive.org](https://archive.org/details/bub_gb_8c10QYoGa4UC)
- Imhausen, A. (2002). _Ägyptische Algorithmen: eine Untersuchung zu den mittelägyptischen mathematischen Aufgabentexten_ (Vol. 65). Harrassowitz Verlag.
- Ritter, J. (2002). _Closing the Eye of Horus: The Rise and Fall of 'Horus-eye Fractions'_. In J. M. Steele & A. Imhausen (Eds.), _Under One Sky: Astronomy and Mathematics in the Ancient Near East_ (pp. 297-323). Ugarit-Verlag.
- Sethe, K. (1908). _Die altägyptischen Pyramidentexte nach den Papierabdrucken und Photographien des Berliner Museums_, (Vols. 1-2). J. C. Hinrichs'sche Buchhandlung.
  - [at uchicago.edu](https://www.lib.uchicago.edu/cgi-bin/eos/eos_title.pl?callnum=PJ1553.A1_1908_cop3)
- Struve, W. W. (1930). _Mathematischer Papyrus des staatlichen Museums der schönen Künste in Moskau: herausgegeben und kommentiert von WW Struve, unter Benutzung einer hieroglyphischen Transkription von BA Turajeff_ (Quellen und Studien zur Geschichte der Mathematik, Abt. A, Quellen, Band 1). Verlag von Julius Springer.
