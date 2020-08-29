

    // se main.js for fullstendig kode. main.js brukes av index og registreringssiden.

    window.addEventListener("load", function() {

        loadSignedUp(true);


        $("btnReg").addEventListener("click", function() {
            var presExists = false;
            for (var i = 0; i < presentationsArray.length; i++) {
                console.log(presentationsArray[i]["availSeats"]);
                if ($("selectPres").value === presentationsArray[i]["roomNumber"] && presentationsArray[i]["availSeats"] > 0) {
                    presExists = true;
                }
            }

            if (presExists === true) {
                regSeat($("selectPres").value, $("txtName").value, $("txtEmail").value);
            } else {
                showImg("hacker.jpg");
                alert("Den presentasjonen er finnes ikke i dropdown menyen.");
            }


        });


    });
