//alert()

// 1. Je stocke dans une variable, de type objet, les élements gagnants de 
// chaque choix : victimes et actions associées.
const conditionsGagnantes = {
    pierre: { ciseaux: "écrase", lezard: "écrase" },
    feuille: { pierre: "couvre", spock: "désavoue" },
    ciseaux: { feuille: "découpent", lezard: "décapitent" },
    lezard: { spock: "empoisonne", feuille: "mange" },
    spock: { ciseaux: "écrabouille", pierre: "vaporise" }
};      
        //Pour le fun :
        //Dictionnaire pour transformer le texte en Emoji + Texte
            const icones = {
                pierre: "🪨 Pierre",
                feuille: "📄 Feuille",
                ciseaux: "✂️ Ciseaux",
                lezard: "🦎 Lézard",
                spock: "🖖 spock"
        };

 // 2. J' initialise les scores
let scoreJoueur = 0;
let scoreOrdinateur = 0;

// 3. Je récupère les éléments HTML pour pouvoir les modifier plus tard
// (Note : # pour les id et . pour classe)
const visuelJoueur = document.querySelector("#visuelChoixCombatJoueur");
const visuelOrdi = document.querySelector("#visuelChoixCombatOrdinateur");
const afficheMessage = document.querySelector("#message");
const afficheScoreJoueur = document.querySelector("#scoreJoueur");
const afficheScoreOrdinateur = document.querySelector("#scoreOrdinateur");
const boutons = document.querySelectorAll(".choixBoutons button");
const btnRejouer = document.querySelector("#rejouer");

// 4. Fonction pour que l'ordinateur choisisse au hasard
function lOrdinateurChoisit() {
    const choixPossibles = Object.keys(conditionsGagnantes);
    return choixPossibles[Math.floor(Math.random() * choixPossibles.length)];
}

// 5. Fonction principale déclenchée au clic par le joueur (utilisateur): jouer
function jouer(choixJoueur) {
    const choixOrdinateur = lOrdinateurChoisit();

    // Affichage des Emojis
    visuelJoueur.textContent = icones[choixJoueur];
    visuelOrdi.textContent = icones[choixOrdinateur];  

    let messageResultat = "";
    console.log("Le joueur a choisi : " + choixJoueur);

    //Je crée une variable pour stocker le message du résultat.
    if (choixJoueur === choixOrdinateur) {
        messageResultat = `Égalité ! <br> Vous avez tous les deux choisi ${choixJoueur}.`;
    } 
    // On vérifie si le choix de l'ordinateur est une clé dans l'objet du choix du joueur
    else if (conditionsGagnantes[choixJoueur][choixOrdinateur]) {
        scoreJoueur++; //Victoire du joueur
        let action = conditionsGagnantes[choixJoueur][choixOrdinateur];
        messageResultat = `Gagné ! ${choixJoueur} ${action} ${choixOrdinateur}.`;
    } 
    else {
        scoreOrdinateur++; //Victoire de l'ordinateur
        let action = conditionsGagnantes[choixOrdinateur][choixJoueur];
        messageResultat = `Perdu... ${choixOrdinateur} ${action} ${choixJoueur}.`;
    }
    

    // Mise à jour de l'affichage (on garde le même code qu'avant)
    afficheMessage.innerHTML = messageResultat;
    afficheScoreJoueur.textContent = scoreJoueur;
    afficheScoreOrdinateur.textContent = scoreOrdinateur;
}
// 7. Écouteurs pour les boutons
boutons.forEach(btn => {
    btn.addEventListener("click", () => {
        // On utilise l'ID du bouton comme choix
        jouer(btn.id);
    });
});

// Reset
btnRejouer.addEventListener("click", () => {
    scoreJoueur = 0; scoreOrdinateur = 0;
    afficheScoreJoueur.textContent = "0";
    afficheScoreOrdinateur.textContent = "0";
    visuelJoueur.textContent = "?";
    visuelOrdi.textContent = "?";
    afficheMessage.innerHTML = "En garde !<br>Choisissez votre arme !";
});