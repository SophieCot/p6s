const button = document.querySelector("input[type=submit]");
    button.addEventListener("click", function (e) { // écouteur d'événement de clic au bouton
        e.preventDefault();
        post();
    });

function post() {
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email, password
        }),
       
    })
    .then((response) => {
        if (!response.ok) {
          // Si le statut de la réponse n'est pas OK (200), lance une erreur
          throw new Error(
            "L’authentification a échoué. Veuillez vérifier votre identifiant et votre mot de passe et réessayer."
          );
        }
        return response.json(); // Analyse le corps de la réponse en tant que JSON
      })
      .then((data) => {
        sessionStorage.setItem("token", data.token); // Stocke le jeton dans le stockage de session
        window.location.href = "./index.html"; // Redirige l'utilisateur vers la page index.html
      })
      .catch((error) => {
        alert("Erreur dans l'identifiant ou le mot de passe"); // Affiche une alerte s'il y a une erreur
      });
    
}



      
document.addEventListener("DOMContentLoaded", function() {
  console.log("Chargement de la page index.html");

  function login() {
      const modifyButton = document.getElementById("modifyButton");
      const filtersRemove = document.getElementById("filtersRemove");
      const blackBand = document.querySelector(".blackBand");

      if (!modifyButton || !filtersRemove) {
          console.error("Les éléments modifyButton ou filtersRemove n'existent pas.");
          return;
      }

      const token = sessionStorage.getItem("token");
      console.log("Vérification du jeton dans sessionStorage:", token);

      if (token) {
          modifyButton.style.display = "flex";
          filtersRemove.style.display = "none";
          blackBand.style.display = "flex";
          console.log("Bouton modify affiché, filtres cachés");
      } else {
          modifyButton.style.display = "none";
          filtersRemove.style.display = "flex";
          blackBand.style.display = "none";
          console.log("Bouton modify caché, filtres affichés");
      }
  }

  login();
});

    











