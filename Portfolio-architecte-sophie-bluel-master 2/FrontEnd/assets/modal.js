const modifyButton = document.querySelector(".modify");
const modalContainer = document.querySelector(".modalContainer");
const crossClosed = document.querySelector(".modalContainer .fa-xmark");
const modalContain = document.querySelector(".modalContain");
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
async function displayWorksModal () {
    modalContain.innerHTML="";
    const modalWorks = await getWorks();
    modalWorks.forEach(element => {
        const figure = document.createElement("figure");
        figure.style.width = "calc(100%/5";
        const img = document.createElement("img");
        const span = document.createElement("span");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid","fa-trash-can");
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
   garbages.forEach(element=> {
    element.addEventListener("click", (e)=>{
        const id = element.id;
        fetch("http://localhost:5678/api/works/"+id, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"},
                "Authorization":"Bearer " + sessionStorage.getItem("token")
            })
            
    
        .then((response)=> {
            if (!response.ok) {
                console.log("delete n'a pas marche");
            }
            return response.json()
        })
        .then((data)=> {
            console.log("delete a reussi voici la data:",data);
            displayWorksModal();
            displayWorks();
        })
    })
   });


}


