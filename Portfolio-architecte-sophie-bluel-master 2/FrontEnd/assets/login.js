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



      

    











