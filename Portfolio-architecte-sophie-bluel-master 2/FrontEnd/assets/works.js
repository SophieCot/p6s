
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
    console.log(works);
    works.forEach(element => {
        const figure = document.createElement("figure");
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


async function getButtons() {
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}
getButtons();

async function uploadButton () {
const categories = await getButtons();
console.log(categories);
categories.forEach(element => {
    const button = document.createElement("button");
    button.textContent = element.name;
    button.id = element.id;
    const filters = document.querySelector(".filters")
    filters.appendChild(button);
});
}

uploadButton();







