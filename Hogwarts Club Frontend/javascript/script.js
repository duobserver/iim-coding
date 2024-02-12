// fichier javascript à usage global

// ajout automatique de la navbar
class MyNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <div id="overlay"></div>
    <nav id="nav">
      <p class="main-title nav-title">HOGWARTS CLUB
      <span class="material-symbols-rounded" id="open-menu-span">
        menu
      </span>
      <span class="material-symbols-rounded" id="close-menu-span">
        close
      </span>
      </p>
      <ul class="main-menu">
        <li class="category">
          <p class="nav-title">
            <span class="material-symbols-rounded">
              grid_view
            </span>Cartes</p>

          <ul class="sub-menu">
            <li><a class="nav-link" href="collection.html" title="Afficher toutes mes cartes">
              <span class="material-symbols-rounded">
                square
              </span>Collection</a></li>

            <li><a class="nav-link" href="favorites.html" title="Afficher mes cartes favorites">
              <span class="material-symbols-rounded">
                favorite
              </span>Favorites</a></li>

            <li><a class="nav-link" href="boosters.html" title="Afficher le prochain booster disponibles">
              <span class="material-symbols-rounded">
                bolt
              </span>Boosters</a></li>

            <li><a class="nav-link" href="catalogue.html" title="Afficher toutes les cartes disponibles">
              <span class="material-symbols-rounded">
                book
              </span>Catalogue</a></li>
          </ul>
        </li>

        <li class="category">
          <p class="nav-title">
            <span class="material-symbols-rounded">
            person
            </span>Membre</p>

          <ul class="sub-menu">
            <li><a class="nav-link" href="connection.html">
              <span class="material-symbols-rounded">
                login
              </span>Connexion</a></li>

            <li><a class="nav-link" href="disconnection.html">
              <span class="material-symbols-rounded">
                logout
              </span>Déonnexion</a></li>

            <li><a class="nav-link" href="#">
              <span class="material-symbols-rounded">
                settings
              </span>Paramètres</a></li>
          </ul>
        </li>
      </ul>
    </nav>
    
    <div id="send-overlay"></div>

    <input type="checkbox" id="send-dialogue" onclick="sendDial()" />
    <label for="send-dialogue" class="send-dialogue-label">
      <span class="material-symbols-rounded">mail</span>
    </label>

    <div class="send-screen">
      <div class="formsDiv sendForm">
      <form action="" class="send activeForm">
      <h1>Envoyer une carte</h1>
      <p>Faites plaisir à un autre membre du Club en lui envoyant une de vos cartes</p>
        <div class="formElement">
          <label for="targetUser">Nom du destinataire</label>
          <input type="text" name="username" id="targetUser" />
        </div>

        <div class="formElement">
          <label for="card">Carte à envoyer</label>
          <select name="card" id="card">
            <option value="select">Sélectionner</option>
            <option>Harry Potter</option>
            <option>Hermione Granger</option>
            <option>Ron Weasley</option>
            <option>Albus Dumbledore</option>
            <option>Lord Voldemort</option>
            <option>Gellert Grindelwald</option>
          </select>
        </div>

        <div class="formElement">
          <label for="passwordSend">Mot de Passe</label>
          <input type="password" name="password" id="passwordSend" />
        </div>

        <div class="inline formElement">
          <button type="submit" id="sendButton"><p>Envoyer ma carte</p></button>
        </div>
      </form>
    </div>
    </div>`;
  }
}

customElements.define("custom-navbar", MyNav);

// ouverture et fermeture des menus burger dans la navbar
let titles = document.querySelectorAll(".nav-title");
console.log(typeof titles);

titles.forEach(function (item) {
  item.addEventListener("click", function () {
    if (!item.classList.contains("full")) {
      if (item.classList.contains("main-title") && item.classList.contains("open-main-title")) {
        console.log("close everything");
        titles.forEach(function (item) {
          item.classList.remove("open-main-title");
          item.classList.remove("open-title");
          item.nextElementSibling.classList.remove("open-main-menu");
          item.nextElementSibling.classList.remove("open-menu");
          document.querySelector("#open-menu-span").style.display = "block";
          document.querySelector("#close-menu-span").style.display = "none";
        });
      } else {
        if (item.classList.contains("main-title")) {
          item.classList.toggle("open-main-title");
          item.nextElementSibling.classList.toggle("open-main-menu");
          document.querySelector("#open-menu-span").style.display = "none";
          document.querySelector("#close-menu-span").style.display = "block";
        } else {
          let a = document.querySelector(".open-title");
          let b = document.querySelector(".open-menu");
          if (a && a != item) {
            a.classList.remove("open-title");
            b.classList.remove("open-menu");
          }

          item.classList.toggle("open-title");
          item.nextElementSibling.classList.toggle("open-menu");
        }
      }
      a = document.querySelector(".open-title");
      b = document.querySelector(".open-main-title");
      if (a || b) {
        document.querySelector("#overlay").style.opacity = "100%";
        document.querySelector("#overlay").style.visibility = "visible";
      } else {
        document.querySelector("#overlay").style.opacity = "";
        document.querySelector("#overlay").style.visibility = "";
      }
    }
  });
});

// chargement automatique des icônes google et lancement des fonctions pour adapter les éléments à l'écran
document.head.innerHTML += '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">';
document.head.innerHTML += '<link rel="stylesheet" href="../css/forms.css">';
document.head.innerHTML += '<link rel="icon" href="../bolt.svg">';

let usernameLogIn = document.querySelector("#usernameLogIn");
if (usernameLogIn) {
  if (localStorage.getItem("username")) {
    usernameLogIn.value = localStorage.getItem("username");
  }
}
navMode();
navHeight();
sendDial();

window.onresize = function () {
  navMode();
  navHeight();
};

// verrouilage du menu burger principal si taille écran > 960px
function navMode() {
  if (window.innerWidth > 960) {
    // grand écran
    let main = document.querySelector(".main-title");
    main.classList.add("full");
    main.classList.remove("open-main-title");
    main.nextElementSibling.classList.remove("open-main-menu");
    document.querySelector("#open-menu-span").style.display = "none";
    document.querySelector("#close-menu-span").style.display = "none";
  } else {
    // smartphone
    document.querySelector(".main-title").classList.remove("full");
    document.querySelector("#open-menu-span").style.display = "block";
    document.querySelector("#close-menu-span").style.display = "none";
  }

  // fermeture de tous les menus burgers
  titles.forEach(function (item) {
    item.classList.remove("open-title");
    item.nextElementSibling.classList.remove("open-menu");
  });
}

// décalage de la zone principale sous la navbar
function navHeight() {
  let nav = document.getElementById("nav");
  let main = document.getElementById("main");
  main.style.paddingTop = parseFloat(nav.offsetHeight * 1.5) + "px";
  main.style.paddingBottom = parseFloat(nav.offsetHeight) + "px";
  main.style.paddingLeft = parseFloat(nav.offsetHeight) + "px";
  main.style.paddingRight = parseFloat(nav.offsetHeight) + "px";
}

function sendDial() {
  console.log("sendDial");
  let sendOverlay = document.querySelector("#send-overlay");
  let sendDialogue = document.querySelector("#send-dialogue");
  let sendDialogueLabel = document.querySelector(".send-dialogue-label");
  let sendScreen = document.querySelector(".send-screen");
  console.log(sendScreen);
  if (sendDialogue.checked) {
    sendScreen.style.visibility = "visible";
    sendScreen.style.opacity = "100%";
    sendOverlay.style.visibility = "visible";
    sendOverlay.style.opacity = "100%";
    sendDialogueLabel.classList.add("open");
  } else {
    sendScreen.style.visibility = "hidden";
    sendScreen.style.opacity = "0%";
    sendOverlay.style.visibility = "hidden";
    sendOverlay.style.opacity = "0%";
    sendDialogueLabel.classList.remove("open");
  }
}
