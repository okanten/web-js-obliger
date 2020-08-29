
    var $ = function(id)  {
        return document.getElementById(id);
    }

    var xmlrequest;
    var reservedSeats = {};
    var presentationsArray = [];
    var tempObject = {}; // dette blir bare brukt for å pushe objekter inn til presentationsArray hvor hver index blir et objekt.
    var loadOption = false;

    function loadSignedUp(bool) {
        loadOption = bool;
        xmlrequest = new XMLHttpRequest();
        var file = "paameldinger.dat";
        xmlrequest.onreadystatechange = countAvailSeats;
        xmlrequest.open("GET", file, true);
        xmlrequest.send();
    }

    function loadPres() {
        xmlrequest = new XMLHttpRequest();
        var file = "presentasjoner.dat";
        xmlrequest.onreadystatechange = showContent;
        xmlrequest.open("GET", file, true);
        xmlrequest.send();
    }

    function countAvailSeats() {

        if (xmlrequest.readyState == 4 && xmlrequest.status == 200) {
            clearArrays();
            var signedUp = xmlrequest.responseText.split("\n");
            var currentLine = "";

            for (var i = 0; i < (signedUp.length - 1); i++) {
                currentLine = signedUp[i];
                currentLine = currentLine.split("¤");

                if (reservedSeats[currentLine[0]] === undefined) { // om arrayet reservedSeats[index] ikke eksisterer setter vi verdien til 1.
                    reservedSeats[currentLine[0]] = 1;
                } else {
                    reservedSeats[currentLine[0]]++;
                }

            }

            loadPres();
        }

    }

    function clearArrays() {
        presentationsArray = [];
    }

    function showContent() {
        if (xmlrequest.readyState == 4 && xmlrequest.status == 200) {
            clearArrays();
            if (loadOption === false) {
                $("presentations").innerHTML = "<h1>Presentasjoner</h1>";
            }
            var presArray = xmlrequest.responseText.split("\n");

            var currentLine = "";
            var todayDate = new Date();
            var presentationDate;

            for (var i = 0; i < (presArray.length - 1); i++) {
                currentLine = presArray[i];
                currentLine = currentLine.split("¤");

                presentationDate = new Date(currentLine[2]);

                if (presentationDate > todayDate) {
                    tempObject = {}; // tempObject renses for hver loop
                    tempObject["presID"] = currentLine[0];
                    tempObject["presTitle"] = currentLine[1];
                    tempObject["presDate"] = currentLine[2];
                    if (reservedSeats[currentLine[0]] === undefined) {
                        tempObject["availSeats"] = currentLine[3];
                    } else {
                        tempObject["availSeats"] = (currentLine[3] - reservedSeats[currentLine[0]]);
                    }
                    tempObject["presSeats"] = currentLine[3];
                    presentationsArray.push(tempObject); // Dytter hele objektet inn i arrayet, hver index blir da et eget objekt.
                }
            }


            /*
                Jeg har prøvd å finne ut hvilken sorting algoritme JavaScript bruker, men jeg har ikke funnet noe konkret svar så det er litt vanskelig å forklare (og forstå) hvordan dette foregår. Jeg prøver likevel.
                Denne sorteringen sammenligner to verdier fra presentationsArray.presDate opp mot hverandre og skyver det største tallet til høyre i arrayet.
                La oss si at arrayet har verdier på [8][2][5][1][9]
                a vil da være 8, og b vil være 2. 8-2 = 6, et positivt tall. Da vet vi at a er større enn b, og skyver 8 mot høyre. (Jeg -tror- også at tallet 2 lagres et sted i minne slik at den kan hente det ut igjen rimelig kjapt).
                Videre vil a fortsatt være 8, men b vil være 5. 8-5 = 3, så a er fortsatt større enn b. Skyv a til høyre.
                Nå som b = 1, -tror- jeg at den ser at tallet er mindre noe den har sjekket før (2), så den vil da sammenligne 2 og 1, og plassere 1 til venstre for 2. (Jeg er ikke helt sikker om det er slik det foregår.)
                8-9 = -1, så det vil si at b er større enn a her. Ikke skyv noe. Hadde det vært enda et tall bak 9'ern ville da a blitt 9 i neste omgang, og b tallet etter 9.

                Som sagt er jeg ikke helt sikker på om det er akkurat slik det fungerer, men er rimelig sikker på at det er noe i den duren hvertfall.

                Koden under er det svaret man kan finne på f.eks StackExchange om man søker etter hvordan man sorterer et array etter objekter. (dvs, jeg har funnet dette på nettet), derfor har jeg også gjort et forsøk på å forstå koden og forklare den ut ifra det jeg har forstått.
            */

            presentationsArray.sort(function(a, b) { // Siden jeg ønsker å sortere etter et bestemt objekt (presDate) må jeg spesifisere dette ved bruk av en funksjon inni array.sort().
                a = new Date(a.presDate); // definerer a som en dato med verdi array.presDate
                b = new Date(b.presDate); // definerer b som en dato med verdi array.presDate
                return a - b;
            });


            for (var i = 0; i < presentationsArray.length; i++) {
                if (loadOption === true) { // siden denne .js fila brukes til både index.html og registrer.php valgte jeg å implementere en sjekk slik at den ikke prøver å skrive til et html-element som ikke eksisterer.
                    if (presentationsArray[i]["availSeats"] > 0) {
                        addReg(presentationsArray[i]["presID"], presentationsArray[i]["presTitle"]); // denne tilhører registrer.php
                    }
                } else { // denne tilhører index.html
                    createPres(presentationsArray[i]["presID"] + " - " + presentationsArray[i]["presTitle"], presentationsArray[i]["presDate"], presentationsArray[i]["availSeats"], presentationsArray[i]["presSeats"], presentationsArray[i]["presID"], i);
                }
            }

        }
    }


    function createPres(title, date, seatsA, seatsT, id, selectedIndex) { // Denne brukes til index.html || seatsA = seatsAvailable, seatsT = seatsTotal. 

        var article = document.createElement("ARTICLE");
        var heading = document.createElement("H3");
        var datePara = document.createElement("P");
        var seatsPara = document.createElement("P");
        var link = document.createElement("A")
        var linktext = document.createTextNode("(meld deg på)");
        var headingInput = document.createTextNode(title);
        var dateFor = document.createTextNode(date);
        var seatsAvail = document.createTextNode("Antall ledige plasser: " + seatsA + " av " + seatsT);
        heading.appendChild(headingInput);
        datePara.appendChild(dateFor);
        seatsPara.appendChild(seatsAvail);
        seatsPara.id = id;
        article.appendChild(heading);
        article.appendChild(datePara);
        article.appendChild(seatsPara);
        document.getElementById("presentations").appendChild(article);
        link.appendChild(linktext);
        link.setAttribute("href", "registrer.php?selected=" + selectedIndex);

        if (seatsA > 0) {
            $(id).appendChild(link);
        }

    }

    function addReg(number, title) { // denne brukes til registrer.php siden.
        var selectOption = document.createElement("OPTION");
        selectOption.value = number;
        selectOption.text = number + " - " + title;

        $("selectPres").appendChild(selectOption);
    }

    function showImg(img) { // denne brukes til registrer.php siden.
        var image = document.createElement("IMG");
        image.id = "hacker";
        image.src = "img/" + img;
        image.alt = "Image of a scriptkiddie";
        $("images").appendChild(image);
    }

    function regSeat(room, name, email) { // denne brukes til registrer.php siden.

        if (room.includes("¤") || name.includes("¤") || email.includes("¤")) { // Hvis ett eller flere av tekstfeltene inneholder ¤
            alert("Ikke ødelegg fila mi tjommi ;-)") // nytter ikke fjerne dette i inspektoren, da det også sjekkes i PHP koden.
        } else if (room.length < 1 || name.length < 1 || email.length < 1) {
            alert("Vennligst skriv inn navn, email og velg en presentasjon");
        } else {
            xmlrequest = new XMLHttpRequest();
            var url = "registrer.php?code=" + room + "&name=" + name + "&email="+ email;
            xmlrequest.onreadystatechange = function() {
                if (xmlrequest.readyState == 4 && xmlrequest.status == 200) {
                    alert("Registrert!");
                    reservedSeats[room]++;
                    $("selectPres").innerHTML = "";
                    loadPres();
                }
            };
            xmlrequest.open("GET", url, true);
            xmlrequest.send();
        }
    }
