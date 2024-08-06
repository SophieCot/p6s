const modifyButton = document.querySelector(".modify");
const modalContainer = document.querySelector(".modalContainer");
const crossClosed = document.querySelector(".modalContainer .fa-xmark");
const modalContain = document.querySelector(".modalContain");
const addImageButton = document.querySelector(".addImageButton");
const modalAddImage = document.querySelector(".modalAddImage");
const modal = document.querySelector(".modal");
const crossClosedModal2 = document.querySelector(".modalAddImage .fa-xmark");
const ArrowBack = document.querySelector(".fa-arrow-left");
const buttonValidate = document.querySelector(".buttonValidate");
const modalMessage = document.querySelector(".modalMessage");
const errorTitle = document.querySelector(".errorTitle");
const errorImage = document.querySelector(".errorImage");
const crossClosedModal3 = document.querySelector(".modalMessage .fa-xmark");
console.log(modalAddImage);
console.log(modalContain)
console.log(crossClosed);
console.log(modalContainer);

//Ouvrir la modal au clic sur modifier 
modifyButton.addEventListener("click", () => {
    console.log(modifyButton);
    modalContainer.style.display = "flex";

})
//Fermer la modal au clic sur la croix
crossClosed.addEventListener("click", () => {
    console.log(crossClosed);
    modalContainer.style.display = "none";
});

//Fermer la modal au clic en dehors de la modal
modalContainer.addEventListener("click", (e) => {
    if (e.target.className == "modalContainer") {
        modalContainer.style.display = "none";
    }
});

//Affichage des images dans la modal
async function displayWorksModal() {
    modalContain.innerHTML = "";
    const modalWorks = await getWorks();
    modalWorks.forEach(element => {
        const figure = document.createElement("figure");
        figure.style.width = "calc(100%/5";
        const img = document.createElement("img");
        const span = document.createElement("span");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid", "fa-trash-can");
        trash.id = element.id;
        img.src = element.imageUrl;
        span.appendChild(trash);
        figure.appendChild(span);
        figure.appendChild(img);
        modalContain.appendChild(figure);
    });
    eraseWork()
}

displayWorksModal();

function eraseWork() {
    const garbages = document.querySelectorAll(".fa-trash-can");
    garbages.forEach(element => {
        element.addEventListener("click", (e) => {
            const id = element.id;
            fetch("http://localhost:5678/api/works/" + id, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token")
                }
            })


                .then((response) => {
                    if (!response.ok) {
                        console.log("delete n'a pas marche");
                    }
                    return response.json()
                })
                .then((data) => {
                    console.log("delete a reussi voici la data:", data);
                    displayWorksModal();
                    displayWorks();
                })
        })
    });


}

//Fait apparaitre la deuxieme modal
function modal2() {
    addImageButton.addEventListener("click", () => {
        console.log(addImageButton);
        modalAddImage.style.display = "flex";
    })
 // Fait disparaitre la premiere modal
    addImageButton.addEventListener("click", () => {
        modal.style.display = "none";
    })
// Ferme la modal au clic sur la croix
    crossClosedModal2.addEventListener("click", () => {
        console.log(crossClosedModal2);
        modalContainer.style.display = "none";
    })
 //Retourne à la Modal 1 au clic sur la fléche 
    ArrowBack.addEventListener("click", () => {
        modalAddImage.style.display = "none";
    })
    ArrowBack.addEventListener("click", () => {
        modal.style.display = "flex";
    })

}
modal2();

//Fait apparaitre la troisième modal

function modal3() {
    buttonValidate.addEventListener("click", () => {
        if(!title.value =="" && !category.value == "" && !inputForm.value =="") {
        console.log(buttonValidate);
        modalMessage.style.display = "flex";
        modalAddImage.style.display = "none";
        } else {
            buttonValidate.disabled = false;
        } 
        if (title.value == "") {
            errorTitle.innerHTML = "Le champs est requis."
            errorTitle.style.color= "red";
            buttonValidate.disabled = false;
        } else {
            buttonValidate.disabled = true;
            errorTitle.innerHTML="";
            errorImage.innerHTML="";
        }
        if (file.value == "") {
            errorImage.innerHTML ="Ajouter une image."
            errorImage.style.color = "red"
            buttonValidate.disabled = false;
        } else {
            buttonValidate.disabled = true;
            errorImage.innerHTML="";
        }
       
    })
    crossClosedModal3.addEventListener("click", () => {
        console.log(crossClosedModal3);
        modalContainer.style.display = "none";
    });

}
modal3();

//Permet de prévisualiser l'image 
const previewImg = document.querySelector(".containerForm img");
const inputForm = document.querySelector(".containerForm input");
const labelForm = document.querySelector(".containerForm label");
const iconForm = document.querySelector(".containerForm .fa-image");
const pForm = document.querySelector("containerForm p");

inputForm.addEventListener("change", () => {
    const file = inputForm.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewImg.src = e.target.result;
            previewImg.style.display = "flex";
            labelForm.style.display = "none";
            iconForm.style.display = "none";
            pForm.style.display = "none";
        }
        reader.readAsDataURL(file);
    }

})

// Créer une liste de catégories dans l'input select 

async function displayCategoriesModal () {
    const select = document.querySelector(".modalAddImage select");
    const categories = await getCategories();
    categories.forEach(element => {
        const option = document.createElement("option");
        option.value = element.id;
        option.textContent = element.name;
        select.appendChild(option);
    })
}

displayCategoriesModal()


// Post ajouter une photo

const form = document.querySelector(".modalAddImage form");
const title = document.querySelector(".modalAddImage #title");
const category = document.querySelector(".modalAddImage #category");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    try {
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            },
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Voici la photo ajoutée", data);
    } catch (error) {
        console.log("Voici l'erreur", error);
    }
})

// Fonction afficher message d'erreur si tous les champs ne sont pas remplis

form.addEventListener("input",()=>{
    if(!title.value =="" && !category.value == "" && !inputForm.value =="") 
    {
        buttonValidate.style.background ="#1D6154";
        buttonValidate.style.color="white";
        
    } else {
        buttonValidate.style.background="grey";
        buttonValidate.style.color="white";
        buttonValidate.disabled = false; 
    }

})
console.log(buttonValidate);

