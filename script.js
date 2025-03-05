let sectionPrincipale = document.querySelector('section');

// function creating div tag, with its pictures and form
// for each achievement found in the .json
// fill the form with a checkbox for each element found in the list
// "nom" variable in the function allows to parse the correct object in .json file
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
    const newButton = document.createElement('button');
    newButton.innerText = "Completed"
    newButton.setAttribute("class", "Button");

    let valueCheckbox = dataTransformed.complexAchievements[nom].value;
    let newInput = null;
    let newLabel = document.createElement('label');
    let newBreak = "<br>"
    newLabel.innerText = "";

    // Loop creationg checkboxes for each element of the array
    for (const nomCheckbox of dataTransformed.complexAchievements[nom].checkboxes) {

        newLabel = document.createElement('label');
        newInput = document.createElement('input');

        // adding attributes to checkboxes and labels to link them
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
 
    // Call to function to changer order and greying
    // to check completiong on page load
    completedAchievement(nom);
    // and a checkbox event listener
    document.getElementById(nom).addEventListener('click', () => {
        completedAchievement(nom);
    });
    
    
}

// Call to function for each achievement
let complexAchievement = ["supremeWeaponReinforcement", "masterOfInfusions",
    "masterOfSorceries", "masterOfPyromancies", "masterOfMiracles",
    "masterOfRings", "masterOfExpressions", "ultimateBonfire", "ultimateEstus"];
complexAchievement.forEach((value) => {
    recupChecklist(value)
});

// function to put a box at the end of the list
async function changeOrder(nom) {
    
    let test = await fetch('./checklist.json');
    const dataTransformed = await test.json();
    let ordre = "order: " + (dataTransformed.complexAchievements[nom].id + 10);
    document.getElementById(nom).setAttribute("style", ordre);
}

// function to reset the position of a box
async function resetOrder(nom) {
    let test = await fetch('./checklist.json');
    const dataTransformed = await test.json();
    let ordre = "order: " + (dataTransformed.complexAchievements[nom].id);
    document.getElementById(nom).setAttribute("style", ordre);
}

// function checking if each checkbox is checked or not
// and changes position and class if achievement is completed
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


/* WIP of full completion button, not working

function completionButton() {
    console.log("bouton pressé")
    let toutLesInput = document.querySelectorAll("#" + identification + " > form > input");
    // let achievementBeingChecked = document.getElementById(identification);
    for (let value of toutLesInput) {
        if (value.checked == false) {
            value.checked == true
        }
    };
}

let Buttons = document.querySelector("#supremeWeaponReinforcementButton");

Buttons.addEventListener('click', completionButton)

const leH1 = document.querySelectorAll("button")
// On ajoute l'événement (écouteur) sur un ou plusieurs éléments
leH1.addEventListener('click', () => {
    console.log('Mon titre principal a déclenché l\'événement `click`');
});

*/
