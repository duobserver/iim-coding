// need to detect when a form is sent
// need to deactivate page reload without cache
// verify all inputs
// at leats 2 characters for pseudo
// 18 to 70 years old
// need to select a country

let form = document.querySelector("#myForm"); // selecting the form itself
let name = document.querySelector("#name");
let second = document.querySelector("#second");
let age = document.querySelector("#age");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let passwordcheck = document.querySelector("#passwordcheck");

let errlist = document.getElementById("errList");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  if (name.value.lenght < 2 || second.value.lenght < 2) {
    document.getElementsByClassName("messageError").style.display = "block";
    let li = document.createElement("li");
    li.appendChild(
      document.createTextNode(
        "Name or second name is too short (at least 2 characters are required"
      )
    );
    errlist.appendChild(li);
  }

  if (age.value >= 18 && age.value < 70) {
    document.getElementsByClassName("messageError").style.display = "block";
    let li = document.createElement("li");
    li.appendChild(
      document.createTextNode(
        "Age must be between 18 and 70 years old"
      )
    );
    errlist.appendChild(li);
  }

  console.log("Form has been sent");
});
