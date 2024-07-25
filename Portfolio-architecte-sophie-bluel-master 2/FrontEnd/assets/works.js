
const gallery = document.querySelector(".gallery");

async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
    /* .then(response => {
         return response.json();
     })
     .then(json => {
         console.log(json);

     })*/
}
getWorks()


async function displayWorks() {
    const works = await getWorks();
    works.forEach((element) => {
        const figure = document.createElement("figure");
        figure.dataset.category = element.categoryId;
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        figure.appendChild(img);
        img.src = element.imageUrl;
        figure.appendChild(figcaption);
        figcaption.textContent = element.title;
        const gallery = document.querySelector(".gallery");
        gallery.appendChild(figure);
    });
}
displayWorks();


async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}
getCategories();

async function uploadButton() {
    const categories = await getCategories();
    categories.forEach(element => {
        const button = document.createElement("button");
        button.dataset.category = element.id;
        button.classList.add("btn");
        button.textContent = element.name;
        button.id = element.id;
        const filters = document.querySelector(".filters")
        filters.appendChild(button);
    });
}
async function uploadButton() {
    const categories = await getCategories();
    const filters = document.querySelector(".filters");
    filters.innerHTML = ''; // Vide les boutons

    // Ajout d'un bouton "Tous" pour afficher tous les travaux
    const allButton = document.createElement("button");
    allButton.dataset.category = "0";
    allButton.classList.add("btn");
    allButton.textContent = "Tous";
    filters.appendChild(allButton);

    // Ajout des boutons pour chaque catégorie
    categories.forEach(element => {
        const button = document.createElement("button");
        button.dataset.category = element.id;
        button.classList.add("btn");
        button.textContent = element.name;
        filters.appendChild(button);
    });
}
uploadButton();

async function categoriesFilter() {
    const objects = await getWorks();
    console.log(objects);
    const buttons = document.querySelectorAll(".filters button");
    console.log(buttons);
    buttons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const btnId = e.target.dataset.category;
            const figures = document.querySelectorAll(".gallery figure");
            if (btnId === "0") {
                figures.forEach(figure => {
                    figure.style.display = "block"; // Affiche tous les éléments
                });
            } else {
                figures.forEach(figure => {
                    if (figure.dataset.category === btnId) {
                        figure.style.display = "block"; // Affiche les éléments correspondants
                    } else {
                        figure.style.display = "none"; // Masque les autres éléments
                    }
                });
            }
        });
    });
}
categoriesFilter()









