let sectionPrincipale = document.querySelector('section');


// variables "nom" dans la fonction permet d'aller chercher l'objet en question dans le .json
async function recupChecklist(nom) {
    let test = await fetch('./checklist.json');
    const dataTransformed = await test.json();

    const newDiv = document.createElement('div');
    let ordre = "order: " + dataTransformed.complexAchievements[nom].id;
    newDiv.setAttribute("id", nom);
    newDiv.setAttribute("style", ordre);

    sectionPrincipale.append(newDiv);


    const newImg = document.createElement('img');
    let imageAchievement = dataTransformed.complexAchievements[nom].image;
    newImg.setAttribute("src", imageAchievement);
    newDiv.appendChild(newImg);

    const newForm = document.createElement('form');
    newDiv.appendChild(newForm);

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

    // ici appel de la fonction pour changer ordre + grisage 
    
    // un appel classique de la fonction
    completedAchievement(nom);
    // et un sur l'event listener des checkbox qui sera passé par référence
    document.getElementById(nom).addEventListener('click', completedAchievement);


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

    console.log(document.getElementById(nom));

    let ordre = "order: " + (dataTransformed.complexAchievements[nom].id + 10);

    console.log(ordre);

    document.getElementById(nom).setAttribute("style", ordre);
}

// changeOrder("masterOfInfusions");

function completedAchievement(nom) {
    console.log(nom + " :");
    let toutLesInput = document.querySelectorAll("#" + nom + " > form > input");
    let achievementBeingChecked = document.getElementById(nom);
    for (let value of toutLesInput) {
        console.log(value.checked);
        if (value.checked == false) {
            return "boucle incomplète";
        }
    };
    console.log("boucle finie");
    changeOrder(nom);
    achievementBeingChecked.setAttribute("class", "completed");
}

