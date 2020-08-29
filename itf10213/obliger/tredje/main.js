
        /// Diverse som er felles for flere deler av koden ///
        var $ = function(id) {
            return document.getElementById(id);
        }

        var arrNames = ["Ola", "Per", "Kari", "Joergen", "Jonas", "Harald", "Richard", "Dennis", "Linus", "Nora", "Emma", "Maja", "William", "Oskar", "Lucas", "Mathias", "Oliver", "Phillip"];
        var assOneArray = [25, 52, 8, 2, 48, 23, 57, 84, 2, 8, 4, 81, 75, 4, 5, 6, 8, 92, 1];
        var assEightArray = [1, 23, 42, 75, 29, 2, 0, 85, 3];


            /// Vent paa page load ///
        window.addEventListener("load", function() {
            // Det at enkelte av oppgavene starter naar siden har lastet er gjort med vilje.
            assOne();
            assTwo();
            assThree();
            assFour();
            $("btnAnalyze").onclick = assFive;
            $("btnRansom").onclick = assSix;

            assSeven(5, 1, 10);
            assSeven(1337, 1, 999);
            assSeven(420, 100, 500);

            $("btnCheckSeven").addEventListener("click", function() { // Oppgave 7

                if ($("txtNumber").value.length > 0 && $("txtStart").value.length > 0 && $("txtEnd").value.length > 0) {
                    var specValue = parseInt($("txtNumber").value);
                    var startValue = parseInt($("txtStart").value);
                    var endValue = parseInt($("txtEnd").value);
                    assSeven(specValue, startValue, endValue);
                } else {
                    alert("Du må skrive inn et tall i alle tekstboksene");

                }

            });

            assEight();


            // For innstillingene på høyre side
            $("btnGenArray").addEventListener("click", function() {
                for (var i = 0; i <= 49; i++) {
                    assOneArray[i] = Math.floor(Math.random() * (100 - 0) + 0);
                }
                assOne();
            });

            $("btnAddName").addEventListener("click", function() {
                var addName = $("txtAddName").value.replace(/[&\\/#,+()$~%.'":*?<>{}0-9]/g, ""); // Fjerner tegn som ikke egner seg i navn.
                addName = addName.charAt(0).toUpperCase() + addName.slice(1); // Sørger for at navnet starter med stor forbokstav. .slice fra 1 til enden av navnet.
                if (addName.length > 1) {
                    arrNames.push(addName);
                    $("settingsName").innerHTML = addName + " ble lagt til i arrayet";
                    $("settingsName").style.color = "#8bf49e";
                } else {
                    $("settingsName").innerHTML = "Navnet må være lengre enn 1 bokstav";
                    $("settingsName").style.color = "#f79191";
                }
            });

            $("btnGenArrayEight").addEventListener("click", function()  {
                for (var i = 0; i < 50; i++) {
                    assEightArray[i] = Math.floor(Math.random() * (100 - 0) + 0);
                }
            });

        });






/* Oppgave 1 - for ctrl+f
    ____                                      __
   / __ \                                    /_ |
  | |  | |_ __  _ __   __ _  __ ___   _____   | |
  | |  | | '_ \| '_ \ / _` |/ _` \ \ / / _ \  | |
  | |__| | |_) | |_) | (_| | (_| |\ V /  __/  | |
   \____/| .__/| .__/ \__, |\__,_| \_/ \___|  |_|
         | |   | |     __/ |
         |_|   |_|    |___/
*/

        function assOne() {
            var content = "";
            var occNum = [8, 2]; // occurence number
            var count = [0, 0];
            var arrEven = [];
            var arrLess = [];
            var sum = [0, 0];
            var occured = false;

                for (var i = 0; i <= (assOneArray.length - 1); i++) {
                    if (i === 0) { // Annenhver
                        content = assOneArray[i];
                    } else if (i % 2 === 0) {
                        content += ", " + assOneArray[i];
                    }

                    if (assOneArray[i] < 10) { // Mindre enn 10
                        arrLess.push(" " + assOneArray[i]);
                    }

                    if (assOneArray[i] % 2 === 0) { // Partall
                        arrEven.push(" " + assOneArray[i]);
                        sum[1] += assOneArray[i];
                    }

                    if (i !== assOneArray.length) { // summen av arrayet | bruker !== her for aa ikke ta med det siste tallet i array.length. Length teller fra 1 og oppover, mens arrayet indexer fra 0 og oppover.
                        sum[0] += assOneArray[i];
                    }

                    if (assOneArray[i] === occNum[0]) { // Teller antall ganger x er i arrayen
                        count[0]++;
                    }

                    if (assOneArray[i] === occNum[1]) {
                        occured = true;
                        count[1]++;
                    }

                }

            $("outNormal").innerHTML = "Hele arrayet: " + assOneArray.join(", ");

            $("outReverse").innerHTML = "Hele arrayet baklengs: " + assOneArray.reverse().join(", ");
            assOneArray.reverse(); // for aa gjoer det "riktig" vei igjen.

            $("outEveryOther").innerHTML = "<p>Annenhver: " + content + "</p>";
            $("outLessTen").innerHTML = "<p>Mindre enn ti: " + arrLess + "</p>";
            $("outEven").innerHTML = "<p>Partall: " + arrEven.sort() + "</p>";
            $("outSum").innerHTML = "<p>Summen av arrayet: " + (sum[0]).toFixed(0) + "</p>";
            $("outElements").innerHTML = "<p>Antall elementer: " + assOneArray.length + "</p>";
            $("outAverage").innerHTML = "Gjennomsnittet av arrayet: " + ((parseInt(sum[0]) / parseInt(assOneArray.length)).toFixed(2)).replace(".",","); // .replace for aa endre til norsk standard. | .toFixed(2) for aa vise to desimaler
            $("outSumEven").innerHTML = "<p>Summen av partall: " + (sum[1]).toFixed(0) + "</p>";
            assOneArray.sort();
            $("outSmallest").innerHTML = "Det minste tallet i arrayet er: " + assOneArray[0];

            if (occured === true){
                $("outOccurence").innerHTML = "<p>Tallet " + occNum[1] + " finnes i arrayet</p>";
            } else {
                $("outOccurence").innerHTML = "<p>Tallet " + occNum[1] + " finnes <strong>ikke</strong> i arrayet</p>";
            }

            $("outAmountX").innerHTML = "<p>Antall ganger tallet <em>" + occNum[0] + "</em> finnes i arrayen: " + count[0] + "</p>";

        }






/* Oppgave 2 - for ctrl+f
    ____                                      ___
   / __ \                                    |__ \
  | |  | |_ __  _ __   __ _  __ ___   _____     ) |
  | |  | | '_ \| '_ \ / _` |/ _` \ \ / / _ \   / /
  | |__| | |_) | |_) | (_| | (_| |\ V /  __/  / /_
   \____/| .__/| .__/ \__, |\__,_| \_/ \___| |____|
         | |   | |     __/ |
         |_|   |_|    |___/
*/

        function assTwo() {
            var monthDecimal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
            var monthName = ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];
            var tInput = new String();

            $("btnMonth").onclick = assTwo;

            if ($("txtMonth").value === "") { // Slik at den viser nåværende måned når siden lastes
                tInput = new Date();
                tInput = tInput.getMonth();
            } else {
                tInput = parseInt($("txtMonth").value - 1); // Soerger for at det brukeren skriver inn stemmer overens i indekseringen i arrayet.
            }

            if (tInput >= 0 && tInput < 12) {
                $("pMonth").style.color = "";
                $("pMonth").innerHTML = "Det er " + monthDecimal[tInput] + " dager i " + monthName[tInput];
            } else {
                $("pMonth").style.color = "red";
                $("pMonth").innerHTML = "Vennligst skriv inn et tall mellom 1-12";
            }
        }






/* Oppgave 3 - for ctrl+f
    ____                                      ____
   / __ \                                    |___ \
  | |  | |_ __  _ __   __ _  __ ___   _____    __) |
  | |  | | '_ \| '_ \ / _` |/ _` \ \ / / _ \  |__ <
  | |__| | |_) | |_) | (_| | (_| |\ V /  __/  ___) |
   \____/| .__/| .__/ \__, |\__,_| \_/ \___| |____/
         | |   | |     __/ |
         |_|   |_|    |___/
*/


        function assThree() {
            $("btnNamesDupe").onclick = assThree;


            var out = new Array();

            for (var i = 0; i <= 2; i++) {
                var rand = Math.floor(Math.random() * ((arrNames.length - 1) - 0) + 0); // math.floor for aa faa et helt tall, runder ned til det helt tall.
                out.push(arrNames[rand]); // legger til navnet i arrayet som skal skrives ut
            }

            $("pNamesDupe").innerHTML = out.join(", "); // .join bestemmer hva som skiller elementene i et array
        }






/* Oppgave 4 - for ctrl+f
    ____                                      _  _
   / __ \                                    | || |
  | |  | |_ __  _ __   __ _  __ ___   _____  | || |_
  | |  | | '_ \| '_ \ / _` |/ _` \ \ / / _ \ |__   _|
  | |__| | |_) | |_) | (_| | (_| |\ V /  __/    | |
   \____/| .__/| .__/ \__, |\__,_| \_/ \___|    |_|
         | |   | |     __/ |
         |_|   |_|    |___/
*/


        function assFour() {
            $("btnNamesProper").onclick = assFour;


            var out = new Array();
            var used = [];

            for (var i = 0; i <= 2; i++) {
                var rand = Math.floor(Math.random() * ((arrNames.length - 1) - 0) + 0); // math.floor for a faa et helt tall, runder ned til det helt tall.

                if (!used.includes(arrNames[rand])) { // så lenge arrayet used _ikke_ inkluderer current navn || kunne evt. brukt splice
                    out.push(arrNames[rand]);
                    used.push(arrNames[rand]); // legger til navnet i arrayet som inneholder navnene som allerede er brukt
                } else {
                    i--; // fjerner en saa den alltid printer ut 3 navn, i tilfelle den genererer samme tall som tidligere
                }

            }

            $("pNamesProper").innerHTML = out.join(", "); // .join bestemmer hva som skal skille elementene i arrayet naar det skrives ut i sin helhet


        }






/* Oppgave 5 - for ctrl+f
    ____                                      _____
   / __ \                                    | ____|
  | |  | |_ __  _ __   __ _  __ ___   _____  | |__
  | |  | | '_ \| '_ \ / _` |/ _` \ \ / / _ \ |___ \
  | |__| | |_) | |_) | (_| | (_| |\ V /  __/  ___) |
   \____/| .__/| .__/ \__, |\__,_| \_/ \___| |____/
         | |   | |     __/ |
         |_|   |_|    |___/
*/


        function assFive() {
            var textField = $("txtAnalyze").value;
            textField = textField.toLowerCase().replace(/[&\\#,+()$~%.'":*?<>{}]/g, ""); // Fjerner en rekke tegn som ikke egner seg i ord. "/" er ikke med her med vilje, da RegExp'en under soerger for at ord1/ord2 blir telt som to forskjellige ord. Alt som replaces her vil jeg skal bli telt som ett ord. (F.eks: I'd vil jeg skal telles som ett ord og ikke I og D)
            var arrWords = textField.split(/\W+/); // Regular expression for alt annet enn vanlige bokstaver/ord (dvs. spesialtegn)
            var assWords = {}; // definerer et tomt objekt (eller assosiativt array)
            var word;
            var assSort = []; // definerer et tomt array som brukes til å sortere det assosiative arrayet.
            var outStat = "";
            var topAmount = document.getElementById("selectedPrint").value;

            for (var i = 0; i < (arrWords.length -1); i++) { // arrWords.length -1 her for aa ikke telle med tomt element. Siden length teller fra 1 til maks og indekseringen teller fra 0 til maks faar man et tomt array om man bruker length.
                word = arrWords[i];
                if (assWords[word] === undefined) { // sjekker om ordet allerede eksisterer i objektet/assosiative arrayet assWords
                    assWords[word] = 1;
                    assSort.push(word);
                } else {
                    assWords[word] += 1; // plusser på en i objektet om ordet allerede eksisterer.
                }
            }


            assSort.sort(function(even, odd) { // sorterer et assosiativt array
                var indexEven = assWords[even];
                var indexOdd = assWords[odd];
                return indexOdd - indexEven;
            });

            var output = "";


            for (var i = 0; i < topAmount; i++) {
                if (assSort[i] !== undefined) { // soerger for at den ikke skriver ut "undefined" om teksten har mindre enn 10 unike ord.
                    output += "<p class=\"pstat\">" + assSort[i] + " " + "</p>" + "<div class=\"stat green\" style=\"max-width: " + (assWords[assSort[i]] * 30) + "px; height: 10px;\" ></div>" + "<div class=\"border\">" + assWords[assSort[i]] + "</div>";
                } else { // Om den er tom for unike ord, avslutt loop.
                    i = topAmount; // stopper loopen om den når siste ord
                }
            }

            $("outList").innerHTML = output;

        }






/* Oppgave 6 - for ctrl+f
    ____                                        __
   / __ \                                      / /
  | |  | |_ __  _ __   __ _  __ ___   _____   / /_
  | |  | | '_ \| '_ \ / _` |/ _` \ \ / / _ \ | '_ \
  | |__| | |_) | |_) | (_| | (_| |\ V /  __/ | (_) |
   \____/| .__/| .__/ \__, |\__,_| \_/ \___|  \___/
         | |   | |     __/ |
         |_|   |_|    |___/
 */


        function assSix() {
            $("printRansom").innerHTML = "";
            var ransomInput = $("txtRansom").value.toLowerCase().split("");
            var randomNum = 0; // nummer som brukes til å velge random bakgrunn
            var htmlOut = ""; // brukes til å lagre html før den skrives ut, slik at nettsiden ikke blir veldig treg før løkken er ferdig.
            for (var i = 0; i < ransomInput.length; i++) {

                randomNum = Math.floor(Math.random() * 6);
                switch(ransomInput[i]) {
                    case ".": // om tegnet er .
                        htmlOut += "<img src=\"img/abcsvg/punc.svg\" alt=\"period\" />";
                    break;

                    case "'": case "’": // om tegnet er ' eller ’
                        htmlOut += "<img src=\"img/abcsvg/apo.svg\" alt=\"apostrophe\" />";
                    break;

                    case ",": // osv
                        htmlOut += "<img src=\"img/abcsvg/comma.svg\" alt=\"comma\" />";
                    break;

                    case "!":
                        htmlOut += "<img src=\"img/abcsvg/ex.svg\" alt=\"exclamation mark\" />";
                    break;

                    case "?":
                        htmlOut += "<img src=\"img/abcsvg/qm.svg\" alt=\"question mark\" />";
                    break;

                    case " ":
                        htmlOut += "<img src=\"img/abcsvg/blank.svg\" alt=\"space\" />";
                    break;

                    case "-":
                        htmlOut += "<img src=\"img/abcsvg/dash.svg\" alt=\"dash\" />";
                    break;


                    default: // om input ikke matcher noe over
                        htmlOut += "<img src=\"img/abcsvg/" + ransomInput[i] + ".svg\" id=\"" + ransomInput[i] + randomNum + "\" alt=\"" + ransomInput[i] + "\" style=\"background-image: url('img/abcsvg/back" + randomNum + ".svg');\">";
                    break;
                }

            }

            $("printRansom").innerHTML = htmlOut;

        }





/* Oppgave 7 - for ctrl+f
    ____                                      ______
   / __ \                                    |____  |
  | |  | |_ __  _ __   __ _  __ ___   _____      / /
  | |  | | '_ \| '_ \ / _` |/ _` \ \ / / _ \    / /
  | |__| | |_) | |_) | (_| | (_| |\ V /  __/   / /
   \____/| .__/| .__/ \__, |\__,_| \_/ \___|  /_/
         | |   | |     __/ |
         |_|   |_|    |___/
*/


        function assSeven(spec, start, end) {
            if (spec >= start && spec <= end) { // jeg tolker det saann at "innenfor" vil si til og med, derfor har jeg valgt aa bruke >= og <=.
                $("sevenOut").innerHTML += "<p>Tallet " + spec + " er innenfor " + start + "-" + end + "</p>";
            } else {
                $("sevenOut").innerHTML += "Tallet " + spec + " er ikke innenfor " + start + "-" + end + "</p>";
            }
        }





/* Oppgave 8 - for ctrl+f
    ____                                       ___
   / __ \                                     / _ \
  | |  | |_ __  _ __   __ _  __ ___   _____  | (_) |
  | |  | | '_ \| '_ \ / _` |/ _` \ \ / / _ \  > _ <
  | |__| | |_) | |_) | (_| | (_| |\ V /  __/ | (_) |
   \____/| .__/| .__/ \__, |\__,_| \_/ \___|  \___/
         | |   | |     __/ |
         |_|   |_|    |___/
*/


        function assEight() {

            $("btnCheckArrayAll").addEventListener("click", function() {
                $("listOut").innerHTML = ""; // renser lista
                biggestValue(assEightArray);
                sumArray(assEightArray, true);
                averageArray(assEightArray);
                specArray(assEightArray, 2);
            });

            $("btnCheckArrayBiggest").addEventListener("click", function() {
                biggestValue(assEightArray);
            });

            $("btnCheckArraySum").addEventListener("click", function() {
                sumArray(assEightArray, true);
            });

            $("btnCheckArrayAverage").addEventListener("click", function() {
                averageArray(assEightArray);
            });

            $("btnCheckArraySpec").addEventListener("click", function() {
                specArray(assEightArray, 2);
            });

        }

        function biggestValue(i) {

            i.sort(); // sorterer arret fra minst til størst
            printResult("Det stoerste tallet i arrayet er: " + i[(i.length - 1)]); // viser det siste elementet i arrayet


        }

        function sumArray(arr, printBool) {
            var sum = 0;

            for (var i = 0; i < arr.length; i++) {
                sum += arr[i];
            }

            if (printBool === true) {
                printResult("Summen av arrayet er: " + sum);
            }

            return sum; // sender summen tilbake til variabelen som eventuelt skal holde verdien fra funksjonen.
        }

        function averageArray(arr) {
            var sum = sumArray(arr, false); // false for at den ikke skal skrive ut summen igjen.

            printResult("Gjennomsnittet av arrayet er: " + (sum / arr.length).toFixed(2));

        }

        function specArray(arr, specValue) {
            var bool = false;

            for (var i = 0; i < arr.length; i++) {
                if (arr[i] === specValue) {
                    bool = true;
                }
            }

            if (bool === true) {
                printResult("Tallet " + specValue + " finnes i arrayet");
            } else if (bool === false) {
                printResult("Tallet " + specValue + " finnes ikke i arrayet");

            }

        }

        function printResult(i) {
            $("listOut").innerHTML += "<li>" + i + "</li>";
        }
