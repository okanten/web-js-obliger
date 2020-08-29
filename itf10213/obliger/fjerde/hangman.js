        // Hold deg fast, dette kunne sett mye bedre ut.


        var $ = function(id) {
            return document.getElementById(id);
        }

        var hangmanArray = ["Lol", "Rofl", "Lmao", "Meme", "Moxnes", "Jensen", "Grande", "Søreide", "Akseptabel", "Interessert", "Sofistikert", "Onomatopoetikon", "Hensiktsmessig", "Høytrykksspyler", "Rundebordskonferanse", "Submikroskopisk"];
        var count = 0;
        var hangCount = -1;
        var letterIndex = [];
        var lettersToBePrinted = [];
        var correctPrintedLetters = [];
        var wrongLetters = [];
        var triesLeft = 10;
        var startPosX = 15;
        var letterPosX = [];
        var rand = 0;
        var prevRandMax = 4;
        var letterNotPrintedYet;

        window.addEventListener("keydown", function(event) { // sjekker etter tastetrykk i hele vinduet

            switch (event.key.toLowerCase()) {

                case "+": // hvis + tasten blir trykket
                    if (prevRandMax >= (hangmanArray.length -1)) {
                        prevRandMax = 0;
                    } else if (prevRandMax >= 12) {
                        prevRandMax = 12;
                    }
                    pickWord(prevRandMax, (prevRandMax + 4));
                    console.log("Difficulty: " + prevRandMax);
                break;

                case "-": // om minus blir trykket
                    if (prevRandMax <= 4) {
                        pickWord(0, 4);
                    } else {
                        pickWord((prevRandMax - 4), (prevRandMax - 8));
                    }
                break;

                case "backspace": // osv osv
                    pickWord((prevRandMax - 4), prevRandMax); // restarter spillet med samme vanskelighetsgrad
                break;

                case ".":
                    //showHint();
                break;

                // Hele alfabetet + æ ø å
                case "a": case "b": case "c": case "d": case "e": case "f": case "g": case "h": case "i": case "j": case "k": case "l": case "m": case "n":
                case "o": case "p": case "q": case "r": case "s": case "t": case "u": case "v": case "w": case "x": case "y": case "z": case "æ": case "ø": case "å":
                    checkLetter((event.key).toLowerCase()); // i tilfelle capslock
                break;

                default:
                    //alert("Det er ikke registrert noen handling for denne tasten\n\n" + "(" + event.key + ")");
                break;

            }

        });


        window.addEventListener("load", function() {

            $("hangman").addEventListener("click", function() {
                if (hangCount !== 9 && triesLeft !== 0) {
                    hangCount++;
                    triesLeft--;
                    nextElement(hangCount);
                }
            });

            pickWord(0, 4);
        });

        function clearVariables() {
            count = 0;
            hangCount = -1;
            letterIndex = [];
            lettersToBePrinted = [];
            correctPrintedLetters = [];
            wrongLetters = [];
            triesLeft = 10;
            startPosX = 15;
            letterPosX = [];
            rand = 0;
            prevRandMax = 4;
            letterNotPrintedYet = undefined; // skitten fix men hysj
        }

        function pickWord(startDifficulty, endDifficulty) {

            clearVariables();

            rand = Math.floor(Math.random() * (endDifficulty - startDifficulty) + startDifficulty);
            drawInitialize(hangmanArray[rand].split(""));
            prevRandMax = endDifficulty;

        }

        function drawInitialize(index) {
            var x = 50;
            var xTo = 80;
            drawCanvas("clear", 0, 0, $("hangman").width, $("hangman").height);

            // tegner galge
            drawCanvas("line", 50, 135, 31, 145, 1.5); // venstre støtte
            drawCanvas("line", 50, 135, 69, 145, 1.5); // høyre støtte
            drawCanvas("line", 69, 145, 31, 145, 1.5);
            drawCanvas("line", 50, 20, 50, 145);
            drawCanvas("line", 50, 20, 130, 20);
            drawCanvas("line", 130, 20, 130, 40);

            // "tegner" instrukser
            drawCanvas("char", 350, 40, "Instrukser: ", 15);
            drawCanvas("char", 350, 65, "1. Gjett bokstav med tastaturet");
            drawCanvas("char", 350, 80, "2. Plusstegnet øker vanskelighetsgraden");
            drawCanvas("char", 350, 95, "3. Minustegnet senker vanskelighetsgraden");
            drawCanvas("char", 350, 110, "4. Backspace restarter og gir nytt ord (grad beholdes)");

            drawCanvas("char", 45, 450, "Forsøk igjen: " + triesLeft, 15);
            drawCanvas("char", 45, 500, "Bokstaver du allerede har prøvd: ", 20);

            for (var i = 0; i < index.length; i++) {
                drawCanvas("line", x, 300, xTo, 300, 1.5); // Tegner _ _ _ _ i canvas
                letterPosX[i] = x + 2.5; // Bestemmer posisjonen til hver bokstav
                x += 40;
                xTo += 40;
            }
        }

        function nextElement(index) {

            switch (index) {

                case 0:
                    drawCanvas("circle", 130, 55, 15, 0, 1.5); // hode
                break;

                case 1:
                    drawCanvas("line", 130, 70, 130, 85); // hals
                break;

                case 2:
                    drawCanvas("line", 130, 85, 115, 70, 1.5); // venstre arm
                break;

                case 3:
                    drawCanvas("line", 130, 85, 145, 70, 1.5); // høyre arm
                break;

                case 4:
                    drawCanvas("line", 130, 85, 130, 100); // kropp
                break;

                case 5:
                    drawCanvas("line", 130, 100, 115, 115, 1.5); // venstre bein
                break;

                case 6:
                    drawCanvas("line", 130, 100, 145, 115, 1.5); // høyre bein
                break;

                case 7:
                    drawCanvas("circle", 124, 50, 2.5, 0); // venstre øye
                break; // 127

                case 8:
                    drawCanvas("circle", 136, 50, 2.5, 0); // høyre øye
                break;

                case 9:
                    drawCanvas("circle", 130, 62, 5, 9.5, 1.5); // munn, halv sirkel
                    drawCanvas("char", 320, 380, "Du tapte :(", 30);
                    drawCanvas("char", 250, 400, "Trykk backspace for å starte nytt spill", 15);
                    drawCanvas("char", 200, 250, "Ordet du ikke klarte å gjette var: " + hangmanArray[rand], 15);
                break;

                case "Winner winner chicken dinner":
                    drawCanvas("char", 240, 380, "Gratulerer, du vant!!", 30);
                    drawCanvas("char", 250, 400, "Trykk backspace for å starte nytt spill", 15);
                break;


            }

            drawCanvas("clear", 45, 425, 500, 465);
            drawCanvas("char", 45, 450, "Forsøk igjen: " + triesLeft, 15);
            drawCanvas("char", 45, 500, "Bokstaver du allerede har prøvd: ", 20);

        }

        function printLetter(letter, x, y) {
            drawCanvas("char", x, y, letter.toUpperCase(), 30);
        }

        function checkLetter(letter) {

            if (triesLeft !== 0 || hangCount !== 9) {

                var word = hangmanArray[rand].split(""); // deler ordet opp i hver bokstav til arrayet 'word'
                lettersToBePrinted = word; // brukes sammen med letterIndex. Kunne brukt word overalt, men føler dette gjør koden litt mer forståelig/oversiktlig, spesielt uten kommentarer.

                var letterExistsInWord = false; // boolean som brukes til å finne ut om bokstaven brukeren trykket finnes i ordet. Kunne brukt kortere bool-navn, men føler dette gir mer oversiktlig.

                letterIndex = []; // brukes for å lagre hvilken index bokstaven har i lettersToBePrinted / word arrayet (om den eksisterer)

                for (var i = 0; i < word.length; i++) {
                    if (letter === word[i].toLowerCase()) {
                        letterExistsInWord = true;
                        letterIndex.push(i); // legger til tallet i loopen i arrayet som holder på posisjonen til bokstaven den fant. dvs: om letterIndex er tom og tallet 6 pushes til arrayet vil den ha indeks 0. (letterIndex[0] = 6).
                    }
                }


                if (letterExistsInWord === false) {
                    var wrongLetterExistsInArray = false;
                    for (var i = 0; i < wrongLetters.length; i++) {
                        if (wrongLetters[i] === letter.toUpperCase()) {
                            wrongLetterExistsInArray = true;
                        }
                    }

                    if (wrongLetterExistsInArray === false) { // om den finner en bokstav som ikke er prøvd før, men som er feil så fjerner den et forsøk og tegner et nytt element.
                        hangCount++;
                        triesLeft--;
                        wrongLetters.push(letter.toUpperCase());
                        nextElement(hangCount);
                        drawCanvas("char", 50, 550, wrongLetters.join(" - "), 17);

                    }


                } else if (letterExistsInWord === true) {

                    for (var i = 0; i < (word.length + 1); i++) {
                        if (correctPrintedLetters[i] !== undefined) {
                            if (letter === correctPrintedLetters[i].toLowerCase()) { // Må ha to if statements her. Må først sjekke om indeksen ikke er undefined før jeg kan gjøre den om til lowercase. JavaScript som er weak?
                                letterNotPrintedYet = false;
                            }
                        }
                    }

                    if (letterNotPrintedYet === true || letterNotPrintedYet === undefined) { // undefined her for første gang denne koden kjører.

                        // Under her bruker jeg letterIndex[i] som inneholder et annet tall enn i (f.eks 6) som brukes til å finne bokstaven i hangman-ordet.
                        // Det kan se veldig rotete ut (noe det er imo), men det fikk til å funke best. Kunne kanskje evt. brukt charAt.
                        for (var i = 0; i < word.length; i++) {
                            if (lettersToBePrinted[letterIndex[i]] !== undefined || letterPosX[letterIndex[i]] !== undefined) { // !== undefined her slik at loopen hopper til neste tall og ikke kræsjer.
                                printLetter(lettersToBePrinted[letterIndex[i]], letterPosX[letterIndex[i]], 295, 30);
                                correctPrintedLetters.push((lettersToBePrinted[letterIndex[i]]));
                                count++;
                            }

                        }

                    }

                    if (count === word.length) {
                        nextElement("Winner winner chicken dinner"); // ber nextElement tegne "Gratulerer"
                        correctPrintedLetters = [];
                        lettersToBePrinted = [];
                        count = 0;
                    }



                    letterNotPrintedYet = true; // resetter booleanen for neste gjennomkjøring

                }


            }
        }

        function drawCanvas(type, x, y, mx, my, thickness) { // type brukes til å bestemme hva funksjonen skal tegne (f.eks line), x og y brukes til koordinater, mens mx og my brukes enten til moveTo kordinater eller fontstørrelse til tekst. Thickness bestemmer som oftest tykkelsen.
            var ctx = $("hangman").getContext("2d");

            if (thickness === undefined) {
                thickness = 1;
            }

            switch (type) {
                case "line":
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(mx, my);
                    ctx.lineWidth = thickness;
                    ctx.stroke();
                break;

                case "circle":
                    ctx.beginPath();
                    ctx.arc(x, y, mx, my, 2 * Math.PI);
                    ctx.lineWidth = thickness;
                    ctx.stroke();
                break;

                case "char":
                    ctx.beginPath();
                    ctx.fillStyle = "black";
                    ctx.font = "bold " + my + "px Arial";
                    ctx.fillText(mx, x, y);
                break;

                case "cleanArea":
                    ctx.rect(x, y, mx, my);
                    ctx.fillStyle = "#ad7701";
                    ctx.fill();
                    ctx.stroke();
                break;

                case "clear":
                    ctx.save();
                    ctx.setTransform(1,0,0,1,0,0);
                    ctx.clearRect(x, y, mx, my);
                    ctx.restore();
                break;

            }

            thickness = undefined; // skitten fix

        }
