//alert()

// 1. Je stocke dans une variable, de type objet, les élements gagnants de chaque choix : victimes et actions associées.
// Je crée un objet qui associe chaque choix à un autre objet contenant les choix qu'il bat et l'action correspondante.
// Chaque choix est une clé de l'objet conditionsGagnantes, et sa valeur est un autre objet qui contient les choix qu'il bat et l'action associée.
const conditionsGagnantes = {
    pierre: { ciseaux: "écrase", lezard: "écrase" },
    feuille: { pierre: "couvre", spock: "désavoue" },
    ciseaux: { feuille: "découpent", lezard: "décapitent" },
    lezard: { spock: "empoisonne", feuille: "mange" },
    spock: { ciseaux: "écrabouille", pierre: "vaporise" }
};    
        // Pour le fun : je transforme le texte en Emoji + Texte : cf. https://emojipedia.org/
        // Je crée un objet qui associe chaque choix à une icône correspondante (emoji + texte) pour l'affichage visuel.
            const icones = {
                pierre: "🪨 Pierre",
                feuille: "📄 Feuille",
                ciseaux: "✂️ Ciseaux",
                lezard: "🦎 Lézard",
                spock: "🖖 spock",
        };

// 2. J' initialise les scores :
let scoreJoueur = 0;
let scoreOrdinateur = 0;

// 3. Je récupère les éléments HTML pour pouvoir les modifier plus tard :
// (Note : # pour les id et . pour classe).
const visuelJoueur = document.querySelector("#visuelChoixCombatJoueur");
const visuelOrdi = document.querySelector("#visuelChoixCombatOrdinateur");
const afficheMessage = document.querySelector("#message");
const afficheScoreJoueur = document.querySelector("#scoreJoueur");
const afficheScoreOrdinateur = document.querySelector("#scoreOrdinateur");
const boutons = document.querySelectorAll(".choixBoutons button");
const btnRejouer = document.querySelector("#rejouer");

// 4. Fonction pour que l'ordinateur choisisse au hasard :
// Appel des clés de l'objet conditionsGagnantes, qui sont les choix possibles pour l'ordinateur :
function lOrdinateurChoisit() {
    const choixPossibles = Object.keys(conditionsGagnantes);
    return choixPossibles[Math.floor(Math.random() * choixPossibles.length)];// Renvoi d'un choix aléatoire parmi les choix possibles.
}
        // Math.random() génère un nombre aléatoire entre 0 (inclus) et 1 (exclus), que l'on multiplie par la longueur du tableau des choix 
        // possibles pour obtenir un index valide. 
        // Math.floor() arrondit ce nombre à l'entier inférieur pour obtenir un index entier.

// 5. Fonction principale déclenchée au clic par le joueur (utilisateur): jouer
function jouer(choixJoueur) {
    const choixOrdinateur = lOrdinateurChoisit();

    // Affichage des Emojis
    visuelJoueur.textContent = icones[choixJoueur];// La clé est le choix du joueur pour récupérer l'icône correspondante dans l'objet icones 
    visuelOrdi.textContent = icones[choixOrdinateur];  //pour afficher visuellement le choix du joueur.

// 6. Je compare les choix du joueur et de l'ordinateur pour déterminer le résultat : 
// Je crée une variable pour stocker le message du resultat qui sera affiché sur le navigateur après la comparaison des choix du joueur et de l'ordinateur.
    let messageResultat = "";
    console.log("Le joueur a choisi : " + choixJoueur);
    if (choixJoueur === choixOrdinateur) {
        messageResultat = `Égalité ! <br> Vous avez tous les deux choisi ${choixJoueur}.`;
    }                   // En cas d'égalité, on affiche un message spécifique et les scores changes.
 
    // Vérification : choix de l'ordinateur est une clé dans l'objet du choix du joueur : 
   
    else if (conditionsGagnantes[choixJoueur][choixOrdinateur]) {                       // Si vrai, le joueur a gagné
        scoreJoueur++;                                                                  // Incrémentation du score du joueur : +1
        let action = conditionsGagnantes[choixJoueur][choixOrdinateur];                 // Récupération de l'action associée à la victoire du joueur et
        messageResultat = `Gagné ! ${choixJoueur} ${action} ${choixOrdinateur}.`;       // de l'objet conditionsGagnantes : choix du joueur et choix de l'ordinateur.
    }                                                                                   // Construction du message : Victoire du joueur. 
    
    else {                                                                              // Sinon, l'ordinateur a gagné.
        scoreOrdinateur++;                                                              // Incrémentation du score du joueur : +1
        let action = conditionsGagnantes[choixOrdinateur][choixJoueur];                 // Récupération de l'action associée à la victoire de l'ordinateur et 
        messageResultat = `Perdu... ${choixOrdinateur} ${action} ${choixJoueur}.`;      // Construction du message : Défaite du joueur.
    }
    
    // Mise à jour de l'affichage
    afficheMessage.innerHTML = messageResultat;
    afficheScoreJoueur.textContent = scoreJoueur;
    afficheScoreOrdinateur.textContent = scoreOrdinateur;
}
// 7. J'écoute les clics sur les boutons pour déclencher la fonction jouer avec le choix du joueur
boutons.forEach(btn => {                        // Sur chaque bouton, ajout d'un écouteur d'évènement "click" qui lance la fonction joueur via le choix du joueur (id du bouton).               
    btn.addEventListener("click", () => {       // Lorsque le joueur clique sur un bouton, la fonction jouer est appelée via le choix du joueur.
        jouer(btn.id);                          // Le choix du joueur est déterminé par l'id du bouton cliqué.
    });
});

// 8. Reset lorsque le joueur clique sur le bouton "Rejouer", les scores et l'affichage se réinitialisent :
btnRejouer.addEventListener("click", () => {    // Sur le bouton "Rejouer", ajout d'un écouteur d'évènement "click" qui lance la réinitialisation.L
    scoreJoueur = 0; scoreOrdinateur = 0;       // Mise à zéro des scores.
    afficheScoreJoueur.textContent = "0";       // Mise à jour des scores affichés.
    afficheScoreOrdinateur.textContent = "0";   // 
    visuelJoueur.textContent = "?";             // Mise à jour des indicateur de choix.
    visuelOrdi.textContent = "?";
    afficheMessage.innerHTML = "En garde !<br>Choisissez votre arme !"; // Le message d'accueil est réaffiché?
});
