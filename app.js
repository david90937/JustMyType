$(document).ready(function () {
    let startTime = performance.now();
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
        key = event.which;
        $('#' + event.which).css('background', 'yellow');
        if (event.which >= 65 && event.which <= 90) {
            $('#' + (event.which + 32)).css('background', 'yellow');
        }
        // if shift is pressed toggles keyboard display on key down
        if (keyPressed === false) {
            keyPressed = true;
            if (key == 16) {
                $('#keyboard-upper-container').children('div').toggle();
                $('#keyboard-lower-container').children('div').toggle();
            }
        }
        // prevents wrong key presses from advancing the game. Increments counter on correct key press to continue game. Appends check mark if correct key pressed, cross mark if not.
        if (event.key == $('#c' + counter)[0].innerText && counter < sentences[currentSentence].length) { // hard coded 48 to prevent type error at end of game
            $('#c' + (counter + 1)).css('background', 'yellow');
            $('#c' + counter).css('background', '');
            counter++;
            $('#target-letter').empty();
            $('#target-letter').append($('#c' + counter)[0].innerText)
            $('#feedback').append('<span> &#x2705 </span>');
        }
        else {
            $('#feedback').append('<span> &#x274c </span>');
            numberofErrors++
        }
        console.log(counter);
    })
    $(document).keyup(function (event) {
        key = event.which;
        $('#' + event.which).css('background', '');
        // if at end of string and not last sentence, changes sentence. 
        if (counter == (sentences[currentSentence].length) && (currentSentence <= (sentences.length - 2))) {
            currentSentence++;
            numberOfWords++; // this is here to account for the last word of each sentence
            counter = 0;
            changeSentence();
        }
        // if at end of last sentence - empty fields, display result, and reset game. 
        if (counter == (sentences[currentSentence].length) && currentSentence == (sentences.length - 1)) {
            $('#feedback').empty();
            $('#sentence').empty();
            //numberOfWords++
            displayResult();
            setTimeout(_ => {
                resetGame();
            }, 2000)
        }
        // .which returns the same code for both upper and lower case letters. This adds 32 to ensure all lower case letters has highlight removed properly. No support for non-alpha numeric numbers are this time.
        if (event.which >= 65 && event.which <= 90) {
            $('#' + (event.which + 32)).css('background', '');
        }
        // if shift is pressed toggles keyboards on key release
        if (key == 16) {
            if (keyPressed === true) {
                keyPressed = false;
            }
            $('#keyboard-upper-container').children('div').toggle();
            $('#keyboard-lower-container').children('div').toggle();
        }
        keyPressed = false;
    })
    // Clears previous feedback/sentence and changes sentence when called. 
    function changeSentence() {
        sentenceChars = [];
        $('#feedback').empty();
        $('#sentence').empty();
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
            $('#sentence').append('<span id =c' + y + '>' + sentenceChars[y] + '</span>');
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
        $('#feedback').empty();
        let endTime = performance.now();
        let playTime = Math.round((endTime - startTime) / 1000);
        let wordsPerMinute = Math.round((numberOfWords / (playTime / 60)) - (2 * numberofErrors));
        $('#feedback').append('<span> Score: ' + wordsPerMinute + '</span>');
    }
    changeSentence();
})