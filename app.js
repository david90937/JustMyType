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

    $('#keyboard-upper-container').children('div').each(function () {
        $(this).toggle();
    })
    $(document).keydown(function (event) {
        key = event.which;
        $('#' + event.which).css('background', 'yellow');
        if (counter == 48){
            $('#feedback').empty();
            //numberOfWords++
            let endTime = performance.now();
            let playTime = Math.round((endTime - startTime) / 1000);
            let wordsPerMinute = (numberOfWords/(playTime/60)) - (2 * numberofErrors);
            $('#feedback').append('<span>' + wordsPerMinute + '</span>');
            counter++
            resetGame();
        }     
        if (counter == (sentences[currentSentence].length -1 ) && (currentSentence <= 3)){
            currentSentence++;
            numberOfWords++; // this is here to account for the last word of each sentence
            counter = 0;
            $('#sentence').empty();
            $('#feedback').empty();
            changeSentence();   
        }
        if (event.which >= 65 && event.which <= 90) {
            $('#' + (event.which + 32)).css('background', 'yellow');
        }
        if (keyPressed === false) {
            keyPressed = true;
            if (key == 16) {
                $('#keyboard-upper-container').children('div').toggle();
                $('#keyboard-lower-container').children('div').toggle();
            }
        }
        if (event.key == $('#c'+counter)[0].innerText && counter < 48){ // hard coded 48 to prevent type error at end of game
            $('#c' + (counter+1)).css('background', 'yellow');
            $('#c' + counter).css('background', '');
            counter++;
            $('#target-letter').empty();
            $('#target-letter').append($('#c'+counter)[0].innerText)
            $('#feedback').append('<span> &#x2705 </span>');
        }
        else {
            $('#feedback').append('<span> &#x274c </span>');
            numberofErrors++
        }
    })
    $(document).keyup(function (event) {
        key = event.which;
        $('#' + event.which).css('background', '');
        if (event.which >= 65 && event.which <= 90) {
            $('#' + (event.which + 32)).css('background', '');
        }
        if (key == 16) {
            if (keyPressed === true) {
                keyPressed = false;
            }
            $('#keyboard-upper-container').children('div').toggle();
            $('#keyboard-lower-container').children('div').toggle();
        }
        keyPressed = false;
    })

    function changeSentence (){
        sentenceChars = [];
        for (let x = 0; x < sentences[currentSentence].length; x++) {
             sentenceChars.push(sentences[currentSentence][x]);
             // counts the number of spaces to determine how many words are in a given string
             if (sentences[currentSentence][x] == " "){
                numberOfWords++ 
             } 
        }
        for (let y = 0; y < sentences[currentSentence].length; y++) {
            $('#sentence').append('<span id =c' + y + '>' + sentenceChars[y] + '</span>');
        }
    }
    
    function resetGame(){
        let userChoice = confirm("Play again?")
        if (userChoice){
            currentSentence = 0;
            numberOfWords = 0; // this is here to account for the last word of each sentence
            counter = 0;
            startTime = 0;
            numberofErrors = 0;
            $('#sentence').empty();
            $('#feedback').empty();
            changeSentence();
        }
    }
    changeSentence();
})