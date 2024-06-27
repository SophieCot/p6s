
async function getWorks() {
    fetch("http://localhost:5678/api/works")
        .then(response => {
            return response.json();
        })
        .then(json => {
            console.log(json);
        })
}
getWorks()


async function deleteGallery() {
    gallery = document.querySelector(".gallery");
    gallery.innerHtml = "";
    console.log(deleteGallery);
};


async function displayWorks() {
    const listWorks = getWorks();
    console.log(listWorks);

    for (let i = 0; i < getWorks.length; i++) {
        const element = works[i];
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        img.src = element.imageUrl;
        const figcaption = document.createElement("figcaption");
        figcaption.innerText = element.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }
    console.log(displayWorks);
};

displayWorks()






