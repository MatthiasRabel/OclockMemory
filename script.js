var container = $("#container"); //On récupère le container une fois, puisque l'on va être amenés à l'utiliser plusieurs fois
var fruit1 = null;
var fruit2 = null;
var waiting = false;
var timer = 90;
var interval = null;


/*
Fonction qui créer le tableau de jeu
*/
function constructGame() {
    for (var i = 0; i < 28; ++i) { // On crée au total 28 cartes
        var childs = container.children(); // Pour chaque passage dans la boucle, on récupère les cartes déjà existantes
        var newCard = document.createElement('div'); //Et on crée l'élément qui sera la nouvelle carte
        $(newCard).addClass("card hidden"); //On lui donne donc la classe 'card' ainsi que 'hidden', puis qu'elle va apparaître face cachée
        switch (i) { //En fonction de son numéro, on lui attribut un fruit, avec une classe pour la feuille de style et un attribut pour manipuler en JS
            case 0:
            case 1:
                $(newCard).addClass("abricot");
                $(newCard).attr("fruit", "abricot");
                break;
            case 2:
            case 3:
                $(newCard).addClass("bananejaune");
                $(newCard).attr("fruit", "bananejaune");
                break;
            case 4:
            case 5:
                $(newCard).addClass("cerisesjaunes");
                $(newCard).attr("fruit", "cerisesjaunes");
                break;
            case 6:
            case 7:
                $(newCard).addClass("cerisesrouges");
                $(newCard).attr("fruit", "cerisesrouges");
                break;
            case 8:
            case 9:
                $(newCard).addClass("citronjaune");
                $(newCard).attr("fruit", "citronjaune");
                break;
            case 10:
            case 11:
                $(newCard).addClass("citronvert");
                $(newCard).attr("fruit", "citronvert");
                break;
            case 12:
            case 13:
                $(newCard).addClass("fraise");
                $(newCard).attr("fruit", "fraise");
                break;
            case 14:
            case 15:
                $(newCard).addClass("framboise");
                $(newCard).attr("fruit", "framboise");
                break;
            case 16:
            case 17:
                $(newCard).addClass("goyave");
                $(newCard).attr("fruit", "goyave");
                break;
            case 18:
            case 19:
                $(newCard).addClass("grenade");
                $(newCard).attr("fruit", "grenade");
                break;
            case 20:
            case 21:
                $(newCard).addClass("orange");
                $(newCard).attr("fruit", "orange");
                break;
            case 22:
            case 23:
                $(newCard).addClass("pasteque");
                $(newCard).attr("fruit", "pasteque");
                break;
            case 24:
            case 25:
                $(newCard).addClass("peche");
                $(newCard).attr("fruit", "peche");
                break;
            case 26:
            case 27:
                $(newCard).addClass("poire");
                $(newCard).attr("fruit", "poire");
                break;
        }
        if (childs.length == 0) { //Si il n'existe encore aucune carte, on l'ajoute simplement au conteneur
            container.append(newCard);
        } else {
            var elementReference = null;
            if (childs.length == 1) { // Si il n'y en a qu'une, on l'ajoute soit devant soit après
                if (Math.random > 0.5) { //A revoir
                    container.append(newCard);
                } else {
                    container.prepend(newCard);
                }
            } else { // Sinon, on récupère une carte existante au hazard et on place la nouvelle soit avant soit après
                var aleat = Math.floor((childs.length-1) * Math.random());
                elementReference = childs[aleat];
                if (Math.random > 0.5) {
                    elementReference.after(newCard);
                } else {
                    elementReference.before(newCard);
                }
            }
        }
    }

    $(".card").click(function() { //On définit ensuite un listener sur le click sur une carte
        if ($(this).hasClass("hidden") && !waiting) { //Si elle n'est pas face visible et qu'on est pas en attente (état utilisé si on a perdu ou qu'on a pas trouvé de pair)
            $(this).removeClass("hidden"); //Alors on la montre
            if (fruit1) { // Si on a déjà une carte en mémoire
                fruit2 = $(this);
                if (fruit1.attr("fruit") != fruit2.attr("fruit")) { // Si les deux cartes n'ont pas le même fruit
                    waiting = true;
                    setTimeout(function() { // On cache à nouveau les cartes et on réinitialise la mémoire des deux cartes au bout d'une seconde
                        fruit1.addClass("hidden");
                        fruit2.addClass("hidden");
                        fruit1 = null;
                        fruit2 = null;
                        waiting = false;
                    }, 1000);
                } else { //Sinon, on a trouvé une pair ! On réinitialise donc seulement la mémoire des deux cartes
                    fruit1 = null;
                    fruit2 = null;
                }
                var hiddens = $(".hidden"); // On récupère le nombre de cartes encore cachées
                if (hiddens.length == 0) {
                    alert("GG !"); // S'il n'y en a plus, GG !! On peut donc arêter le timer et enregistrer le temps en base et mettre à jour les tableaux de score
                    clearInterval(interval);
                    updateTimes();
                }
            } else { // Sinon, on garde en mémoire la carte
                fruit1 = $(this);
            }
        }
    });
}



/*
Fonction qui permet de mettre à jour le Timer et de retirer une seconde au compteur
*/
function launchTimer() {
    $("#tempsRestant").text(timer + " secondes restantes");
    $("#progressbar").val(90-timer);
    if (timer == 0) { // Si le timer est tombé à 0, dommage, c'est perdu :( On utilise l'état d'attente pour que l'utilisateur ne puisse plus retourner de carte et on arrête le timer
        alert("C'est perdu dommage !");
        waiting = true;
        clearInterval(interval);
    }
    timer--;
}


/*
Fonction pour mettre à jour les records, d'abord en enregistrant le nouveau temps, puis une fois fait, en récupérant à nouveau les temps pour mettre à jour les tableaux de score.
*/
function updateTimes() {
    var sessionTime = 90 - timer;
    $.ajax({ //On utilise l'AJAX afin de faire appel au serveur PHP sans avoir besoin de changer de page ou de recharger
        url: "registerTime.php",
        method: "POST",
        data: {timer: sessionTime}
    }).done(function(){
        getTimes();
    });
}



/*
Fonction qui permet de récupérer les temps dans la bases afin de mettre à jour les tableaux
*/
function getTimes() {
    $.ajax({
        url: "getTimes.php",
        method: "POST"
    }).done(function(response){
        var result = JSON.parse(response); //On transforme la réponse (au format JSON) en object pour le manipuler
        var bestTimesBody = $("#bestTimes").children("tbody"); //O récupère puis vide le tableau des scores existants
        bestTimesBody.html("");
        var bestTimes = result.bestTimes; //On parcours les réponses de la base de données et on construits nos lignes puis on les intègre au tableau
        for (var i = 0; i < bestTimes.length; ++i) {
            var row = document.createElement("tr");
            var caseTemps = document.createElement("td");
            caseTemps.textContent = bestTimes[i][0] + " secondes";
            var caseDate = document.createElement("td");
            var date = new Date(bestTimes[i][1] * 1000);
            caseDate.textContent = date.toLocaleString();
            row.appendChild(caseTemps);
            row.appendChild(caseDate);
            bestTimesBody.append(row);
        }
        var lastTimesBody = $("#lastTimes").children("tbody");
        lastTimesBody.html("");
        var lastTimes = result.lastTimes;
        for (var i = 0; i < lastTimes.length; ++i) {
            var row = document.createElement("tr");
            var caseTemps = document.createElement("td");
            caseTemps.textContent = lastTimes[i][0] + " secondes";
            var caseDate = document.createElement("td");
            var date = new Date(lastTimes[i][1] * 1000);
            caseDate.textContent = date.toLocaleString();
            row.appendChild(caseTemps);
            row.appendChild(caseDate);
            lastTimesBody.append(row);
        }
    });
}

getTimes(); //On appelle une première fois la récupération des temps pour les tableaux au chargement de la page

$("#startButton").click(function() { // On ajoute un listener sur le click sur le bouton start afin de faire apparâitre la grille de jeu, que l'on génère.
    container.css("display", "flex");
    $("#restartButton").css("display", "block"); //On fait appraître le bouton restart et disparâitre le bouton start
    $("#start").css("display", "none");
    constructGame();
    launchTimer(); // Puis on lance le timer
    interval = setInterval(launchTimer, 1000);
});

$("#restartButton").click(function() { // On ajoute un listener sur le click sur le bouton restart afin de régénérer une nouvelle grille et redémarer le timer.
    waiting = false;
    container.html("");
    constructGame();
    clearInterval(interval);
    timer = 90;
    launchTimer();
    interval = setInterval(launchTimer, 1000);
});