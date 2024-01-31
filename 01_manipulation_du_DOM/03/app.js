// need to detect when a form is sent
// need to deactivate page reload without cache
// verify all inputs
// at leats 2 characters for pseudo
// 18 to 70 years old
// need to select a country

//// declaring variable

// selecting the form itself
let myForm = document.querySelector("#myForm");

// selecting form inputs
let firstName = document.querySelector("#name");
let secondName = document.querySelector("#second");
let pseudo = document.querySelector("#pseudo");
let age = document.querySelector("#age");
// let country = document.querySelector("#country");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let passwordCheck = document.querySelector("#passwordcheck");

// selecting result panels
let errors = document.querySelector(".messageError");
let errlist = document.querySelector(".messageError ul");
let success = document.querySelector(".messageSuccess")

// creating allowed characters registry for password
let passCheck = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
);

//// running checklist
form.addEventListener("submit", function (event) {

  // preventing suppression of inputs
  event.preventDefault();
  console.log("Form has been sent");

  // deleting error list
  document.querySelectorAll(".messageError li").forEach(function (item) {
    item.remove();
  });

  // checking first name length
  if (firstName.value.length < 2) {
    firstName.classList.remove("valid");
    firstName.classList.add("invalid");
    errors.style.display = "block";
    let li = document.createElement("li");
    li.innerText = "First name must contain at least 2 characters";
    errlist.appendChild(li);
  } else {
    firstName.classList.remove("invalid");
    firstName.classList.add("valid");
  }

  
  if (secondName.value.length < 2) {
    secondName.classList.remove("valid");
    secondName.classList.add("invalid");
    errors.style.display = "block";
    let li = document.createElement("li");
    li.innerText = "Second name name must contain at least 2 characters";
    errlist.appendChild(li);
  } else {
    secondName.classList.remove("invalid");
    secondName.classList.add("valid");
  }

  if (pseudo.value.length < 6) {
    pseudo.classList.remove("valid");
    pseudo.classList.add("invalid");
    errors.style.display = "block";
    let li = document.createElement("li");
    li.innerText = "Pseudo must contain at least 6 characters";
    errlist.appendChild(li);
  } else {
    pseudo.classList.remove("invalid");
    pseudo.classList.add("valid");
  }

  if (age.value < 18 || age.value > 70) {
    age.classList.remove("valid");
    age.classList.add("invalid");
    errors.style.display = "block";
    let li = document.createElement("li");
    li.innerText = "Must be between 18 and 70 years old";
    errlist.appendChild(li);
  } else {
    age.classList.remove("invalid");
    age.classList.add("valid");
  }

  // if (country.value == "select") {
  //   country.classList.remove("valid");
  //   country.classList.add("invalid");
  //   errors.style.display = "block";
  //   let li = document.createElement("li");
  //   li.innerText = "Select a country";
  //   errlist.appendChild(li);
  // } else {
  //   country.classList.remove("invalid");
  //   country.classList.add("valid");
  // }

  if (email.value == "") {
    email.classList.remove("valid");
    email.classList.add("invalid");
    errors.style.display = "block";
    let li = document.createElement("li");
    li.innerText = "Insert your email adress";
    errlist.appendChild(li);
  } else {
    email.classList.remove("invalid");
    email.classList.add("valid");
  }

  if (password.value.length < 10 || passCheck.test(password.value) == false) {
    password.classList.remove("valid");
    password.classList.add("invalid");
    errors.style.display = "block";
    let li = document.createElement("li");
    li.innerText =
      "Password must contains at least 10 characters, including lowercase, uppercase, numbers and special characterss";
    errlist.appendChild(li);
  } else {
    password.classList.remove("invalid");
    password.classList.add("valid");
  }

  if (password.value != passwordCheck.value) {
    passwordCheck.classList.remove("valid");
    passwordCheck.classList.add("invalid");
    errors.style.display = "block";
    let li = document.createElement("li");
    li.innerText = "Double check password isn't the same as original password";
    errlist.appendChild(li);
  } else {
    passwordCheck.classList.remove("invalid");
    passwordCheck.classList.add("valid");
  }

  if (document.querySelectorAll(".messageError ul li").length == 0) {
    document.querySelector(".messageSuccess").style.display = "block";
    // myForm.reset();
  }
});
