document.addEventListener("DOMContentLoaded", () => {
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



    // Ouvrir la modal au clic sur modifier
    modifyButton.addEventListener("click", () => {
        modalContainer.style.display = "flex";
    });

    // Fermer la modal au clic sur la croix
    crossClosed.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });

    // Fermer la modal au clic en dehors de la modal
    modalContainer.addEventListener("click", (e) => {
        if (e.target.classname === modalContainer) {
            modalContainer.style.display = "none";
        }
    });

    // Affichage des images dans la modal
    async function displayWorksModal() {
        modalContain.innerHTML = "";
        const modalWorks = await getWorks();
        modalWorks.forEach(element => {
            const figure = document.createElement("figure");
            figure.style.width = "calc(100% / 5)";
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
        eraseWork();
    }

    displayWorksModal();

    // Fonction pour effacer un travail
    function eraseWork() {
        const garbages = document.querySelectorAll(".fa-trash-can");
        garbages.forEach(element => {
            element.addEventListener("click", () => {
                const id = element.id;
                fetch("http://localhost:5678/api/works/" + id, {
                    method: "DELETE",
                    headers: {
                        "Authorization": "Bearer " + sessionStorage.getItem("token")
                    }
                })
                .then((response) => {
                    if (!response.ok) {
                        console.log("Le delete n'a pas marché");
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("Le delete a réussi, voici la data:", data);
                    displayWorksModal();
                })
                .catch(error => console.log('Erreur:', error));
            });
        });
    }

    // Afficher la deuxième modal
    addImageButton.addEventListener("click", () => {
        modalAddImage.style.display = "flex";
        modal.style.display = "none";
    });

    // Fermer la deuxième modal au clic sur la croix
    crossClosedModal2.addEventListener("click", () => {
        modalContainer.style.display = "none"
        form.reset();
        previewImg.src = "";
        previewImg.style.display = "none";
        labelForm.style.display = "block";
        iconForm.style.display = "block";
        pForm.style.display = "block";
        errorTitle.textContent = "";
        errorImage.textContent = "";
        buttonValidate.style.background = "grey";
        buttonValidate.style.color = "white";
        buttonValidate.disabled = true;

        // Masquer la modal d'ajout d'image et afficher la modal principale
        modalAddImage.style.display = "none";
        modal.style.display = "flex";
    });

    // Retourner à la première modal au clic sur la flèche
    ArrowBack.addEventListener("click", () => {
        modalAddImage.style.display = "none";
        modal.style.display = "flex";
    });

    // Prévisualisation de l'image
    const previewImg = document.querySelector(".containerForm img");
    const inputForm = document.querySelector(".containerForm input");
    const labelForm = document.querySelector(".containerForm label");
    const iconForm = document.querySelector(".containerForm .fa-image");
    const pForm = document.querySelector(".containerForm p");

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
            };
            reader.readAsDataURL(file);
        }
    });

    // Créer une liste de catégories dans l'input select
    async function displayCategoriesModal() {
        const select = document.querySelector(".modalAddImage select");
        const categories = await getCategories();
        categories.forEach(element => {
            const option = document.createElement("option");
            option.value = element.id;
            option.textContent = element.name;
            select.appendChild(option);
        });
    }

    displayCategoriesModal();

    // Poster une nouvelle image
    const form = document.querySelector(".modalAddImage form");
    const title = document.querySelector(".modalAddImage #title");
    const category = document.querySelector(".modalAddImage #category");

    

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Reset error messages
        errorTitle.textContent = "";
        errorImage.textContent = "";

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



            // Afficher la troisième modal
            modalMessage.style.display = "flex";
            modalAddImage.style.display = "none";

        } catch (error) {
            console.log("Voici l'erreur", error);
            // Gestion des erreurs
            if (title.value == "") {
                errorTitle.innerHTML = "Le champs est requis.";
                errorTitle.style.color = "red";
                buttonValidate.disabled = false;
            } else { 
                buttonValidate.disabled = true;

            }
            if (file.value == "") {
                errorImage.innerHTML = "Ajouter une image.";
                errorImage.style.color = "red";
                buttonValidate.disabled = false;
            } else {
                buttonValidate.disabled = true;
        
            }

        }
    });

    // Fonction pour changer de couleur le bouton si les champs sont remplis et rendre le bouton cliquable si les champs sont remplis
    form.addEventListener("input", () => {
        if (title.value !== "") {
            errorTitle.innerHTML = "";
        }
        if (file.value !=="") {
            errorImage.innerHTML = "";
        }
        if (title.value !== "" && category.value !== "" && inputForm.files.length > 0) {
            buttonValidate.style.background = "#1D6154";
            buttonValidate.style.color = "white";
            buttonValidate.disabled = false;
        } else {
            buttonValidate.style.background = "grey";
            buttonValidate.style.color = "white";
            buttonValidate.disabled = true;
        }
    });

    crossClosedModal3.addEventListener("click", () => {
        modalContainer.style.display = "none";
    });
});


