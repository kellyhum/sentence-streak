### a grammar checking sentence building app

chinese essays are hard to write when you don't know how to _actually_ use that word in a sentence. let's fix that.

### stack

| section  | technologies              |
| -------- | ------------------------- |
| frontend | next.js; react/typescript |
| backend  | flask; the groq api       |
| database | firebase                  |

### todos

-   ~~visualization of day:total words ratio (temporarily hardcode)~~

-   ~~add timer~~
-   ~~currently can only input one sentence -> add "next question" ability~~
-   user authentication -> wip
-   searching = filtering the display

-   technically play again button uses the "nextQ" function -> this will mess up statistics. fix!
-   fix dashboard button
-   can get the same word in a row b/c not marking whether a word has already been tested -> this could honestly be a feature though

-   update visualization (currently hardcoded)
-   make it impossible to enter an empty word (required fields)
-   input doesn't clear when clicking next question
-   able to press enter instead of clicking (for submit sentence + next question)
-   dark mode
-   ux fixes (cursor pointer on hover, etc)
