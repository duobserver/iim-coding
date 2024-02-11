// fichier javascript dédié au contôle du formulaire de connexion au site (login ou signup)

// ciblage des éléments
let errors = document.querySelector("#connectionFormErrors ul");

let logIn = document.querySelector(".logIn");
let signUp = document.querySelector(".signUp");

let inputs = document.querySelectorAll(".signUp input");
let password = document.querySelector("#passwordSignUp");
let passwordCheck = document.querySelector("#passwordCheck");

// sélection du mode de connexion (login ou signup)
let formTitle = document.querySelectorAll(".formTitle");
let mode = document.querySelectorAll(".mode");
let forms = document.querySelectorAll(".formsDiv form");

mode.forEach(function (item) {
  item.addEventListener("click", function () {
    formTitle.forEach(function (item) {
      item.classList.remove("activeForm");
    });
    mode.forEach(function (item) {
      item.classList.remove("activeMode");
    });
    forms.forEach(function (item) {
      item.classList.remove("activeForm");
    });
    item.classList.toggle("activeMode");
    document.querySelectorAll("." + item.id).forEach((item) => {
      item.classList.add("activeForm");
    });
  });
});

// ensemble de caractères autorisés pour le nom d'utilisateur
let nameCheck = /^[a-zA-Z0-9]*$/;

// ensemble de caractères obligatoires pour le mot de passe
let passCheck = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$");

// verrouillage du bouton de validation si les conditions d'utilisation et l'avertissement ne sont pas acceptés
let tos = document.querySelector("#tos");
let permanent = document.querySelector("#permanent");
let button = document.querySelector("#signUpButton");
function userCheck() {
  if (tos.checked && permanent.checked) {
    console.log("checked");
    button.disabled = false;
  } else {
    button.disabled = true;
  }
}

usernameLogIn.addEventListener("input", function () {
  localStorage.setItem("username", usernameLogIn.value);
});

// contrôle du formulaire d'inscription
signUp.addEventListener("submit", function (event) {
  // sauvegarde des champs après envoi
  event.preventDefault();
  // console.log("formulaire envoyé");

  // purge de la liste des erreurs et des styles de validité
  document.querySelectorAll("#connexionFormErrors li").forEach(function (item) {
    item.remove();
  });

  inputs.forEach(function (item) {
    item.classList.remove("valid");
    item.classList.remove("invalid");
  });

  // vérification de la longueur et des caractères dans le nom d'utilisateur
  let usernameSignup = document.querySelector("#usernameSignUp");
  if (usernameSignup.value.length < 2 || nameCheck.test(usernameSignup.value) == false) {
    usernameSignup.classList.add("invalid");
    let li = document.createElement("li");
    li.innerText = "Votre prénom doit contenir au moins 2 caractères autorisés (a-z, A-Z, 0-9)";
    errors.appendChild(li);
  } else {
    usernameSignup.classList.add("valid");
  }

  // vérification de l'age
  let age = document.querySelector("#age");
  if (age.value.length < 12) {
    age.classList.add("invalid");
    let li = document.createElement("li");
    li.innerText = "Vous devez avoir au moins 12 ans";
    errors.appendChild(li);
  } else {
    age.classList.add("valid");
  }

  // vérification de l'email
  let email = document.querySelector("#email");
  if (email.value == "" || email.value.includes("@") == false) {
    email.classList.add("invalid");
    let li = document.createElement("li");
    li.innerText = 'Votre email doit contenir un caractère "@"';
    errors.appendChild(li);
  } else {
    email.classList.add("valid");
  }

  // vérification de la longueur et des caractères obligatoires dans le mot de passe
  if (password.value.length < 6 || passCheck.test(password.value) == false) {
    password.classList.add("invalid");
    let li = document.createElement("li");
    li.innerText = "Votre mot de passe doit contenir au moins 6 caractères dont des minuscules (a-z), des majuscules (A-Z) et des chiffres (0-9)";
    errors.appendChild(li);
  } else {
    password.classList.add("valid");
  }

  // double vérification du mot de passe
  if (password.value != passwordCheck.value) {
    passwordCheck.classList.add("invalid");
    let li = document.createElement("li");
    li.innerText = "Veuillez ressaisir votre mot de passe correctement";
    errors.appendChild(li);
  } else {
    passwordCheck.classList.add("valid");
  }

  // affichage du résultat final (succès ou erreur)
  if (document.querySelectorAll("#connectionFormErrors ul li").length > 0) {
    document.querySelector("#connectionFormErrors").style.display = "block";
  } else {
    signUp.submit();
  }
});

userCheck();
