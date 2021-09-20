$(document).ready(function () {
    let startTime = performance.now();
    let feedBack = $('#feedback');
    let sentenceContainer = $('#sentence');
    let sentences = ['ten ate neite ate nee enet ite ate inet ent eate', 'Too ato too nOt enot one totA not anot tOO aNot', 'oat itain oat tain nate eate tea anne inant nean', 'itant eate anot eat nato inate eat anot tain eat', 'nee ene ate ite tent tiet ent ine ene ete ene ate'];
    let keyPressed = false;
    let sentenceChars = [];
    let currentSentence = 0;
    let counter = 0;
    let numberOfWords = 0;
    let numberofErrors = 0;
    let key;

    // sets upper case keyboard to be hidden when game starts
    $('#keyboard-upper-container').children('div').each(function () {
        $(this).toggle();
    })
    $(document).keydown(function (event) {
        highlightText(event, 'lower');
        toggleKeyboard(event, 'lower');
        isCorrectKey(event);
    })
    $(document).keyup(function (event) {
        checkSentenceEnd();
        highlightText(event, 'upper');
        toggleKeyboard(event, 'upper');
        keyPressed = false;
    })

    // Clears previous feedback/sentence and changes sentence when called. 
    function changeSentence() {
        sentenceChars = [];
        feedBack.empty();
        sentenceContainer.empty();
        // loops through provided sentence array and its indexes to push each string character into a new array. 
        for (let x = 0; x < sentences[currentSentence].length; x++) {
            sentenceChars.push(sentences[currentSentence][x]);
            // counts the number of spaces to determine how many words are in a given string
            if (sentences[currentSentence][x] == " ") {
                numberOfWords++
            }
        }
        // loops through current index of sentences and appends the characters one at a time
        for (let y = 0; y < sentences[currentSentence].length; y++) {
            sentenceContainer.append('<span id =c' + y + '>' + sentenceChars[y] + '</span>');
        }
    }
    // Resets game when called
    function resetGame() {
        let userChoice = confirm("Play again?")
        if (userChoice) {
            currentSentence = 0;
            numberOfWords = 0; // this is here to account for the last word of each sentence
            counter = 0;
            startTime = 0;
            numberofErrors = 0;
            changeSentence();
        }
    }
    // Calculates and displays score when called
    function displayResult() {
        feedBack.empty();
        let endTime = performance.now();
        let playTime = Math.round((endTime - startTime) / 1000);
        let wordsPerMinute = Math.round((numberOfWords / (playTime / 60)) - (2 * numberofErrors));
        feedBack.append('<span> Score: ' + wordsPerMinute + '</span>');
    }

    // Toggles between upper case and lower case keyboard when shift key is pressed
    function toggleKeyboard(event, keyboard){
        let upperCaseKeyboard = $('#keyboard-upper-container').children('div');
        let lowerCaseKeyboard = $('#keyboard-lower-container').children('div');
        key = event.which;
        if (keyboard == 'lower'){
            if (keyPressed === false) {
                keyPressed = true;
                if (key == 16) {
                    upperCaseKeyboard.toggle();
                    lowerCaseKeyboard.toggle();
                }
            }
        }
        if (keyboard == 'upper'){
            if (key == 16) {
                if (keyPressed === true) {
                    keyPressed = false;
                }
                upperCaseKeyboard.toggle();
                lowerCaseKeyboard.toggle();
            }
        }
    }

    // Highlights or removes highlight from keys as they are entered. Not all keys are supported at this time. 
    function highlightText(event, keyboard){
        let keyIsAlpha = event.which >= 65 && event.which <= 90;
        let lowerCase = $('#' +(event.which +32));
        let currentKey = $('#' + event.which);
        key = event.which;
        if (keyboard == 'lower'){
            currentKey.css('background', 'yellow');
            if (keyIsAlpha) {
                lowerCase.css('background', 'yellow');
            }
        }
        if (keyboard == 'upper'){
            currentKey.css('background', '');
            if (keyIsAlpha) {
                lowerCase.css('background', '');
            }
        }
    }

    // Prevents wrong key presses from advancing the game. Increments counter on correct key press to continue game. Appends check mark if correct key pressed, cross mark if not.
    function isCorrectKey(event){
        let keyEntered = $('#c' + counter)[0].innerText
        let previousKey = $('#c' + counter)
        let nextKey = $('#c' + (counter + 1))
        let nextLetter = $('#target-letter')
        // ignores shift key when pressed
        if (event.which == 16){
            return;
        }
        if (event.key == keyEntered && counter < sentences[currentSentence].length) {
            nextKey.css('background', 'yellow');
            previousKey.css('background', '');
            counter++;
            nextLetter.empty();
            nextLetter.append(nextKey[0].innerText);
            feedBack.append('<span> &#x2705 </span>');
        }
        else {
            feedBack.append('<span> &#x274c </span>');
            numberofErrors++
        }
    }

    function checkSentenceEnd(){
        if (counter == (sentences[currentSentence].length) && (currentSentence <= (sentences.length - 2))) {
            currentSentence++;
            numberOfWords++; // this is here to account for the last word of each sentence
            counter = 0;
            changeSentence();
        }
        if (counter == (sentences[currentSentence].length) && currentSentence == (sentences.length - 1)) {
            feedBack.empty();
            sentenceContainer.empty();
            displayResult();
            setTimeout(_ => {
                resetGame();
            }, 2000)
        }
    }
    changeSentence();
})