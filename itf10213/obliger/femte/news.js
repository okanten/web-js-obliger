var xmlrequest;

var data;

var $ = function(id) {
    return document.getElementById(id);
}



window.addEventListener("load", function() {
    loadXML();
});

function loadXML() {
    xmlrequest = new XMLHttpRequest();
    var file = "xmlproxy.php" + "?id="+Math.random();
    xmlrequest.onreadystatechange = showNews;
    xmlrequest.open("GET", file, true);
    xmlrequest.send();
}

function showNews() {
    if (xmlrequest.readyState == 4 && xmlrequest.status == 200) {
        data = xmlrequest.responseXML;
        $("articles").innerHTML = "<h1>VG Nyheter - Innenriks og utenriks</h1>";

        for (var i = 1; i < 11; i++) {
            var tittel = data.getElementsByTagName("title")[i].childNodes[0].nodeValue; // Henter tittel for nyhetsartikkel
            var link = data.getElementsByTagName("id")[i].childNodes[0].nodeValue; // Henter linken
            var updated = "Sist oppdatert: " + new Date(data.getElementsByTagName("updated")[i].childNodes[0].nodeValue); // osv osv
            var summary = data.getElementsByTagName("summary")[(i - 1)].childNodes[0].nodeValue; // Ingress
            link = link.toString().replace(/"/g, ""); // Fjerner "" rundt linken, dette må til for at a href ikke skal bli a href=""link"". /g betyr global
            createArticle(tittel, link, updated, summary);
        }
    }
}


function createArticle(title, link, updated, summary) {
    var container = document.createElement("ARTICLE");
    var articleTitle = document.createElement("H3");
    var articleDate = document.createElement("P");
    var articleLink = document.createElement("A");
    var summaryPara = document.createElement("P");
    var titleInput = document.createTextNode(title);
    var hrefLink = document.createTextNode(link);
    var updatedDate = document.createTextNode(updated);
    var summaryAvail = document.createTextNode(summary);
    articleTitle.appendChild(titleInput);
    articleDate.appendChild(updatedDate);
    articleDate.setAttribute("class", "small");
    articleLink.appendChild(hrefLink);
    articleLink.setAttribute("href", link);
    articleLink.setAttribute("target", "_blank");
    summaryPara.appendChild(summaryAvail);
    container.appendChild(articleTitle);
    container.appendChild(articleDate);
    container.appendChild(summaryPara);
    container.appendChild(articleLink);
    document.getElementById("articles").appendChild(container);
}
