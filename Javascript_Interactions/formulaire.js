// déclaration des variables
// ciblage du formulaire entier
let formulaire = document.querySelector("#formulaire");

// ciblage des champs du formulaire
let prenom = document.querySelector("#prenom");
let nom = document.querySelector("#nom");
let email = document.querySelector("#email");
let adresse = document.querySelector("#adresse");
let ville = document.querySelector("#ville");
let code = document.querySelector("#codepostal");
let pays = document.querySelector("#pays");
let etudes = document.querySelectorAll("#classe");
let axes = document.querySelector("#axes");
let password = document.querySelector("#password");
let passwordCheck = document.querySelector("#passwordcheck");
let tos = document.querySelector("#tos");
let button = document.querySelector("#valider");

console.log(etudes);

// ciblage des blocs de notification
let erreur = document.querySelector(".notif-erreur");
let erreurList = document.querySelector(".notif-erreur ul");
let succes = document.querySelector(".notif-succes");

// ensemble de caractères autorisés pour le prénom et le nom
let nomCheck = /^[a-zA-Zéèàç\s-]*$/;

// ensemble de caractères autorisés pour le code postal
let codeCheck = /^\d*$/;

// ensemble de caractères obligatoires pour le mot de passe
let passCheck = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$");

window.onload = tosCheck();

// déblocage du bouton de validation si les conditions d'utilisation/tos sont acceptés
function tosCheck() {
  if (tos.checked) {
    console.log("checked");
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

// vérification des champs
formulaire.addEventListener("submit", function (event) {
  // sauvegarde des champs après envoi
  event.preventDefault();
  console.log("formulaire envoyé");

  // purge de la liste des erreurs
  document.querySelectorAll(".notif-erreur li").forEach(function (item) {
    item.remove();
  });

  // vérification de la longueur du prénom et des caractères autorisés
  if (prenom.value.length < 2 || nomCheck.test(prenom.value) == false) {
    prenom.classList.remove("valid");
    prenom.classList.add("invalid");
    let li = document.createElement("li");
    li.innerText =
      'Votre prénom doit contenir au moins 2 caractères autorisés (A-Z, *apostrophe*, "-", "é", "è", "à", "ç", " ")';
    erreurList.appendChild(li);
  } else {
    prenom.classList.remove("invalid");
    prenom.classList.add("valid");
  }

  // vérification de la longueur du nom de famille et des caractères autorisés
  if (nom.value.length < 2 || nomCheck.test(prenom.value) == false) {
    nom.classList.remove("valid");
    nom.classList.add("invalid");
    erreur.style.display = "block";
    let li = document.createElement("li");
    li.innerText =
      'Votre nom de famille doit contenir au moins 2 caractères autorisés (A-Z, *apostrophe*, "-", "é", "è", "à", "ç", " ")';
    erreurList.appendChild(li);
  } else {
    nom.classList.remove("invalid");
    nom.classList.add("valid");
  }

  // (la vérification de l'email est intégrée au navigateur)
  if (email.value == "" || email.value.includes("@") == false) {
    email.classList.remove("valid");
    email.classList.add("invalid");
    erreur.style.display = "block";
    let li = document.createElement("li");
    li.innerText = 'Votre email doit contenir un caractère "@"';
    erreurList.appendChild(li);
  } else {
    email.classList.remove("invalid");
    email.classList.add("valid");
  }

  // vérification de la longueur de l'adresse
  if (adresse.value.length < 2) {
    adresse.classList.remove("valid");
    adresse.classList.add("invalid");
    erreur.style.display = "block";
    let li = document.createElement("li");
    li.innerText = "Votre adresse doit contenir au moins 2 caractères";
    erreurList.appendChild(li);
  } else {
    adresse.classList.remove("invalid");
    adresse.classList.add("valid");
  }

  // vérification de la longueur de la ville
  if (ville.value.length < 2) {
    ville.classList.remove("valid");
    ville.classList.add("invalid");
    erreur.style.display = "block";
    let li = document.createElement("li");
    li.innerText = "Le nom de votre ville doit contenir au moins 2 caractères";
    erreurList.appendChild(li);
  } else {
    ville.classList.remove("invalid");
    ville.classList.add("valid");
  }

  // vérification de la longueur du code postal
  if (code.value.length != 5 || codeCheck.test(code.value) == false) {
    console.log(code.value.length);
    code.classList.remove("valid");
    code.classList.add("invalid");
    erreur.style.display = "block";
    let li = document.createElement("li");
    li.innerText = "Votre code postal doit contenir 5 chiffres";
    erreurList.appendChild(li);
  } else {
    code.classList.remove("invalid");
    code.classList.add("valid");
  }

  // vérification du pays sélectionné
  if (pays.value == "select") {
    pays.classList.remove("valid");
    pays.classList.add("invalid");
    erreur.style.display = "block";
    let li = document.createElement("li");
    li.innerText = "Veuillez sélectionner un pays";
    erreurList.appendChild(li);
  } else {
    pays.classList.remove("invalid");
    pays.classList.add("valid");
  }

  // vérification si un niveau d'études est sélectionné
  let counter = 0;

  etudes.forEach(function (item) {
    if (item.checked) {
      counter++;
    }
  });

  console.log(counter);

  if (counter == 0) {
    let li = document.createElement("li");
    li.innerText = "Veuillez sélectionner un niveau d'études actuel";
    erreurList.appendChild(li);
  }

  // vérification de l'axe sélectionné
  if (axes.value == "select") {
    axes.classList.remove("valid");
    axes.classList.add("invalid");
    erreur.style.display = "block";
    let li = document.createElement("li");
    li.innerText = "Veuillez sélectionner un axe préféré";
    erreurList.appendChild(li);
  } else {
    axes.classList.remove("invalid");
    axes.classList.add("valid");
  }

  // vérification de la longueur du mot de passe et des caractères obligatoires
  if (password.value.length < 6 || passCheck.test(password.value) == false) {
    password.classList.remove("valid");
    password.classList.add("invalid");
    erreur.style.display = "block";
    let li = document.createElement("li");
    li.innerText =
      "Votre mot de passe doit contenir au moins 6 caractères dont des minuscules (a-z), des majuscules (A-Z) et des chiffres (0-9)";
    erreurList.appendChild(li);
  } else {
    password.classList.remove("invalid");
    password.classList.add("valid");
  }

  // double vérification du mot de passe
  if (password.value != passwordCheck.value) {
    passwordCheck.classList.remove("valid");
    passwordCheck.classList.add("invalid");
    erreur.style.display = "block";
    let li = document.createElement("li");
    li.innerText = "Veuillez ressaisir votre mot de passe correctement";
    erreurList.appendChild(li);
  } else {
    passwordCheck.classList.remove("invalid");
    passwordCheck.classList.add("valid");
  }

  // affichage du résultat final (succès ou erreur)
  if (document.querySelectorAll(".notif-erreur ul li").length == 0) {
    succes.style.display = "block";
    formulaire.style.display = "none";
    erreur.style.display = "none";
    formulaire.reset();
  } else {
    erreur.style.display = "block";
  }
});
