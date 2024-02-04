//// déclaration des variables

// sélection du formulaire entier
let formulaire = document.querySelector("#formulaire");

// sélection des champs
let prenom = document.querySelector("#prenom");
let nom = document.querySelector("#nom");
let email = document.querySelector("#email");
let adresse = document.querySelector("#adress");
let ville = document.querySelector("#ville");
let password = document.querySelector("#password");
let passwordCheck = document.querySelector("#passwordcheck");

// selecting result panels
let erreur = document.querySelector(".notif-erreur");
let erreurList = document.querySelector(".notif-erreur ul");
let succes = document.querySelector(".notif-succes");

// creating allowed characters registry for password
let passCheck = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
);

//// running checklist
formulaire.addEventListener("submit", function (event) {
  // preventing suppression of inputs
  event.preventDefault();
  console.log("Form has been sent");

  // deleting error list
  document.querySelectorAll(".messageError li").forEach(function (item) {
    item.remove();
  });

  // checking first name length
  if (prenom.value.length < 2) {
    prenom.classList.remove("valid");
    prenom.classList.add("invalid");
    erreur.style.display = "block";
    let li = document.createElement("li");
    li.innerText = "First name must contain at least 2 characters";
    erreurList.appendChild(li);
  } else {
    prenom.classList.remove("invalid");
    prenom.classList.add("valid");
  }

  // checking second name length
  if (nom.value.length < 2) {
    nom.classList.remove("valid");
    nom.classList.add("invalid");
    erreur.style.display = "block";
    let li = document.createElement("li");
    li.innerText = "Second name name must contain at least 2 characters";
    erreurList.appendChild(li);
  } else {
    nom.classList.remove("invalid");
    nom.classList.add("valid");
  }

  // checking selected country
  if (country.value == "select") {
    country.classList.remove("valid");
    country.classList.add("invalid");
    erreur.style.display = "block";
    let li = document.createElement("li");
    li.innerText = "Select a country";
    erreurList.appendChild(li);
  } else {
    country.classList.remove("invalid");
    country.classList.add("valid");
  }

  if (email.value == "") {
    email.classList.remove("valid");
    email.classList.add("invalid");
    erreur.style.display = "block";
    let li = document.createElement("li");
    li.innerText = "Insert your email adress";
    erreurList.appendChild(li);
  } else {
    email.classList.remove("invalid");
    email.classList.add("valid");
  }

  if (password.value.length < 10 || passCheck.test(password.value) == false) {
    password.classList.remove("valid");
    password.classList.add("invalid");
    erreur.style.display = "block";
    let li = document.createElement("li");
    li.innerText =
      "Password must contains at least 10 characters, including lowercase, uppercase, numbers and special characterss";
    erreurList.appendChild(li);
  } else {
    password.classList.remove("invalid");
    password.classList.add("valid");
  }

  if (password.value != passwordCheck.value) {
    passwordCheck.classList.remove("valid");
    passwordCheck.classList.add("invalid");
    erreur.style.display = "block";
    let li = document.createElement("li");
    li.innerText = "Double check password isn't the same as original password";
    erreurList.appendChild(li);
  } else {
    passwordCheck.classList.remove("invalid");
    passwordCheck.classList.add("valid");
  }

  if (document.querySelectorAll(".messageError ul li").length == 0) {
    succes.style.display = "block";
    // formulaire.reset();
  }
});
