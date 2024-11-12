let sectionPrincipale = document.querySelector('section');

// fonction qui créée une balise div, avec son image, et son formulaire
// à chaque achievement trouvé dans le .json
// rempli le formulaire avec une checkbox par élément dans la liste des checkboxes
// variable "nom" dans la fonction permet d'aller chercher l'objet en question dans le .json
async function recupChecklist(nom) {
    let test = await fetch('./checklist.json');
    const dataTransformed = await test.json();

    const newDiv = document.createElement('div');
    newDiv.setAttribute("id", nom);
    let ordre = "order: " + dataTransformed.complexAchievements[nom].id;
    newDiv.setAttribute("style", ordre);

    sectionPrincipale.append(newDiv);

    const newImg = document.createElement('img');
    let imageAchievement = dataTransformed.complexAchievements[nom].image;
    newImg.setAttribute("src", imageAchievement);
    newDiv.appendChild(newImg);

    const newForm = document.createElement('form');
    newDiv.appendChild(newForm);
    // let newButton = "<button>Completed</button>"
    const newButton = document.createElement('button');
    newButton.innerText = "Completed"
    newButton.setAttribute("class", "Button");
    // newDiv.appendChild(newButton);

    let valueCheckbox = dataTransformed.complexAchievements[nom].value;
    let newInput = null;
    let newLabel = document.createElement('label');
    let newBreak = "<br>"
    newLabel.innerText = "";

    // Boucle qui créée les checkboxs pour chaque éléments du tableau
    for (const nomCheckbox of dataTransformed.complexAchievements[nom].checkboxes) {

        newLabel = document.createElement('label');
        newInput = document.createElement('input');

        // ajout des attributs aux checkbox et labels pour les liés
        newInput.setAttribute("type", "checkbox");
        newInput.setAttribute("name", nomCheckbox);
        newInput.setAttribute("value", valueCheckbox);
        newLabel.setAttribute("for", nomCheckbox);
        newLabel.innerText = nomCheckbox;

        newForm.append(newInput);
        newForm.innerHTML += " ";
        newForm.append(newLabel);
        newForm.innerHTML += newBreak;
    }

    // appel de la fonction pour changer ordre + grisage  
    // un appel classique de la fonction
    // pour faire une vérification au chargement de la page
    completedAchievement(nom);
    // et un sur l'event listener des checkbox qui sera passé par référence
    document.getElementById(nom).addEventListener('click', () => {
        completedAchievement(nom);
    });
    
    
}

//appel de la fonction pour chacun des objets
let complexAchievement = ["supremeWeaponReinforcement", "masterOfInfusions", "masterOfSorceries", "masterOfPyromancies", "masterOfMiracles", "masterOfRings", "masterOfExpressions", "ultimateBonfire", "ultimateEstus"];
complexAchievement.forEach((value) => {
    recupChecklist(value)
});


//fonction pour mettre une boîte à la fin de la liste
async function changeOrder(nom) {
    
    let test = await fetch('./checklist.json');
    const dataTransformed = await test.json();
    let ordre = "order: " + (dataTransformed.complexAchievements[nom].id + 10);
    document.getElementById(nom).setAttribute("style", ordre);
}

//fonction pour remettre une boîte à sa position initiale
async function resetOrder(nom) {
    let test = await fetch('./checklist.json');
    const dataTransformed = await test.json();
    let ordre = "order: " + (dataTransformed.complexAchievements[nom].id);
    document.getElementById(nom).setAttribute("style", ordre);
}

// fonction qui vérifie si chaque checkbox est cochée ou non,
// et change la position et la classe si l'achievement est complété
function completedAchievement(identification) {
    let toutLesInput = document.querySelectorAll("#" + identification + " > form > input");
    let achievementBeingChecked = document.getElementById(identification);
    for (let value of toutLesInput) {
        if (value.checked == false) {
            resetOrder(identification);
            achievementBeingChecked.removeAttribute("class", "completed");
            return "boucle incomplète"; //sortie de boucle si incomplet
        }
    };
    console.log("Achievement Completed, and moved to the bottom of the list");
    
    changeOrder(identification);
    achievementBeingChecked.setAttribute("class", "completed");
}

function completionButton() {
    console.log("bouton pressé")
    // let toutLesInput = document.querySelectorAll("#" + identification + " > form > input");
    // // let achievementBeingChecked = document.getElementById(identification);
    // for (let value of toutLesInput) {
    //     if (value.checked == false) {
    //         value.checked == true
    //     }
    // };
}

// let Buttons = document.querySelector("#supremeWeaponReinforcementButton");

// Buttons.addEventListener('click', completionButton)

// const leH1 = document.querySelectorAll("button")
// // On ajoute l'événement (écouteur) sur un ou plusieurs éléments
// leH1.addEventListener('click', () => {
//     console.log('Mon titre principal a déclenché l\'événement `click`');
// });
