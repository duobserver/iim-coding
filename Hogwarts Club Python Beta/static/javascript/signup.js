console.log("signup listener");

let connectionStatus = document.querySelector("#connectionStatus");
let signup = document.querySelector("#signup");

// ensemble de caractères autorisés pour le nom d'utilisateur
let nameCheck = /^[a-zA-Z0-9]*$/;

// ensemble de caractères obligatoires pour le mot de passe
let passCheck = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$");

signup.addEventListener("submit", function (event) {
  event.preventDefault();

  document.querySelectorAll("#connectionStatus li").forEach(function (item) {
    item.remove();
  });

  // remise à zéro de l'état des inputs
  let inputs = document.querySelectorAll("#signup input");
  inputs.forEach(function (item) {
    item.classList.remove("valid");
    item.classList.remove("invalid");
  });

  let usernameSignUp = document.querySelector("#usernameSignUp");
  if (usernameSignUp.value.length < 2 || nameCheck.test(usernameSignUp.value) == false) {
    usernameSignUp.classList.add("invalid");
    let li = document.createElement("li");
    li.innerText = "Your username must contain at least 2 authorized characters (a-z, A-Z, 0-9)";
    connectionStatus.appendChild(li);
  } else {
    usernameSignUp.classList.add("valid");
  }

  let displayname = document.querySelector("#displayname");
  if (displayname.value.length < 2 || nameCheck.test(displayname.value) == false) {
    displayname.classList.add("invalid");
    let li = document.createElement("li");
    li.innerText = "Your display name must contain at least 2 authorized characters (a-z, A-Z, 0-9)";
    connectionStatus.appendChild(li);
  } else {
    displayname.classList.add("valid");
  }

  // vérification de la longueur et des caractères obligatoires dans le mot de passe
  let password = document.querySelector("#passwordSignUp");
  if (password.value.length < 6 || passCheck.test(password.value) == false) {
    password.classList.add("invalid");
    let li = document.createElement("li");
    li.innerText = "Your password must contain at least 6 characters, including lowercase and uppercase letters and numbers"
    connectionStatus.appendChild(li);
  } else {
    password.classList.add("valid");
  }

  // double vérification du mot de passe
  let passwordCheck = document.querySelector("#passwordSignUpCheck");
  if (password.value != passwordCheck.value) {
    passwordCheck.classList.add("invalid");
    let li = document.createElement("li");
    li.innerText = "You must rewrite your password correctly to confirm it";
    connectionStatus.appendChild(li);
  } else {
    passwordCheck.classList.add("valid");
  }

  // affichage du résultat final (succès ou erreur)
  if (!connectionStatus.length > 0) {
    signup.submit();
  }
});
