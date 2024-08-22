let sectionPrincipale = document.querySelector('section');


// variables "nom" dans la fonction permet d'aller chercher l'objet en question dans le .json
async function recupChecklist(nom) {
    let test = await fetch('./checklist.json');
    const dataTransformed = await test.json();

    const newDiv = document.createElement('div');
    let ordre = "order: " + dataTransformed[nom].id;
    newDiv.setAttribute("style", ordre);
    
    sectionPrincipale.append(newDiv);
    
    
    const newImg = document.createElement('img');
    let imageAchievement = dataTransformed[nom].image;
    newImg.setAttribute("src", imageAchievement);
    newDiv.appendChild(newImg);
    
    const newForm = document.createElement('form');
    newDiv.appendChild(newForm);

    let valueCheckbox = dataTransformed[nom].value;
    let newInput = null;
    let newLabel = document.createElement('label');
    let newBreak = "<br>"
    newLabel.innerText = "";

    // Boucle qui créée les checkboxs pour chaque éléments du tableau
    for (const nomCheckbox of dataTransformed[nom].checkboxes){

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
}


//appel de la fonction pour chacun des objets

recupChecklist("supremeWeaponReinforcement")
recupChecklist("masterOfInfusions")
recupChecklist("masterOfSorceries")
recupChecklist("masterOfPyromancies")
recupChecklist("masterOfMiracles")
recupChecklist("masterOfRings")
recupChecklist("masterOfExpressions")
recupChecklist("ultimateBonfire")
recupChecklist("ultimateEstus")