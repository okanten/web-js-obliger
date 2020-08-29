
    var $ = function(id) {
        return document.getElementById(id);
    }


    /* For PC */
    window.addEventListener("scroll", function() {

        if (window.innerWidth > 1200) { // hvis vinduet er større enn 600 piksler

            if (window.scrollY > 0) { // window.scrollY returnerer et tall som tilsvarer antall piksler man har scrollet ned på siden.
                $("navheader").classList.remove("full");
                $("navheader").classList.add("mini");
            } else {
                $("navheader").classList.remove("mini");
                $("navheader").classList.add("full");
            }
        }


    });


    window.addEventListener("load", function() {

        $("btnOpen").addEventListener("click", function() {
            $("navheader").classList.remove("full");
            $("navheader").classList.add("mini");
        })

        $("btnClose").addEventListener("click", function() {
            $("navheader").classList.remove("mini");
            $("navheader").classList.add("full");
        })

    });
