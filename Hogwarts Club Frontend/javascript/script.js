// fichier javascript à usage global

// crétion de la navbar
class MyNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <nav id="nav">
      <p class="main-title nav-title">HOGWARTS CLUB</p>
      <ul class="main-menu">
        <li class="category">
          <p class="nav-title">Cartes</p>
          <ul class="sub-menu">
            <li><a class="nav-link" href="collection.html">Collection</a></li>
            <li><a class="nav-link" href="#">Favoris</a></li>
            <li><a class="nav-link" href="#">Échanger</a></li>
            <li><a class="nav-link" href="#">Cadeaux</a></li>
            <li><a class="nav-link" href="#">Boutique</a></li>
          </ul>
        </li>
        <li class="category">
          <p class="nav-title">Explorer</p>
          <ul class="sub-menu">
            <li><a class="nav-link" href="#">Catalogue</a></li>
            <li><a class="nav-link" href="#">Membres</a></li>
          </ul>
        </li>
        <li class="category">
          <p class="nav-title">Utilisateur</p>
          <ul class="sub-menu">
            <li><a class="nav-link" href="connection.html">Connexion</a></li>
            <li><a class="nav-link" href="#">Profil</a></li>
            <li><a class="nav-link" href="#">Paramètres</a></li>
          </ul>
        </li>
      </ul>
    </nav>`;
  }
}

customElements.define("custom-navbar", MyNav);

// ouverture et fermeture des menus burger dans la navbar
let titles = document.querySelectorAll(".nav-title");

titles.forEach(function (item) {
  item.addEventListener("click", function () {
    if (item.classList.contains("full") == false) {
      if (item.classList == "main-title" && item.classList.contains("open-title")) {
        console.log("close everything");
        titles.forEach(function (item) {
          item.classList.remove("open-title");
          item.nextElementSibling.classList.remove("open-menu");
        });
      } else {
        item.classList.toggle("open-title");
        item.nextElementSibling.classList.toggle("open-menu");
      }
    }
  });
});

// appel automatique des fonctions au chargement ou redimmensionnement de la page
window.onload = function () {
  navMode();
  navHeight();
  userCheck();
};

window.onresize = function () {
  navMode();
  navHeight();
};

// verrouilage du menu burger principal si taille écran > 960px
function navMode() {
  if (window.innerWidth > 960) {
    // grand écran
    document.querySelector(".main-title").classList.add("full");
  } else {
    // smartphone
    document.querySelector(".main-title").classList.remove("full");
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
  main.style.paddingTop = parseFloat(nav.offsetHeight * 2) + "px";
  main.style.paddingBottom = parseFloat(nav.offsetHeight) + "px";
  main.style.paddingLeft = parseFloat(nav.offsetHeight) + "px";
  main.style.paddingRight = parseFloat(nav.offsetHeight) + "px";
}
