console.log("Hello World");

//
// MANIPULER LE DOM
//

// DOM => DOCUMENT OBJECT MODEL
// => OBJET QUI CONTIENT TOUTES LES BALISES DE VOTRE PAGE
// ON LE MANIPULE POUR POUVOIR MANIPULER LES BALISES ET CRÉER DE L'INTÉRACTION
// =>

// PAR SON ID

let h2 = document.getElementById("premier-h2"); // h2
console.log(h2);
h2.style.color = "red";
h2.innerHTML = "Souleymane a un super bonnet";

// PAR SA CLASSE

let listP = document.getElementsByClassName("ma-classe"); // liste de noeuds html
console.log(listP);

// premier paragraphe
listP[0].style.color = "brown";
listP[2].style.color = "pink";

// PAR SON TYPE

let listLi = document.getElementsByTagName("li");

// j'aimerai bien mettre tous les li en majuscule

let x = "twitter";
x.toUpperCase(); // retourner une nouvelle string avec la donnée en majuscule

for (let i = 0; i < listLi.length; i++) {
  const li = listLi[i];
  li.innerText = li.innerText.toUpperCase(); // me retourne la valeur du LI en majuscule
}

///
/// QUERYSELECTOR (RÉCUPÉRER LA PREMIÈRE OCCURENCE SUR LA PAGE) => OBJET HTML
///

let span = document.querySelector("section.titi div#toto p span");

///
/// QUERYSELECTORALL (RÉCUPÈRE TOUTES LES OCCURENCES) => LISTE OBJET HTML
///

let listLinks = document.querySelectorAll("section.titi a");

//
// CAPTER LES ÉVÉNEMENTS
//

h2.addEventListener("click", function () {
  // alert("hooo click!");

  for (let i = 0; i < listLi.length; i++) {
    const li = listLi[i];
    li.innerText = li.innerText.toLowerCase(); // me retourne la valeur du LI en majuscule
  }
});

//
// OPÉRATEUR THIS
//

// FAIRE DISPARAITRE LES LIENS AU SURVOL

// variabiliser tous mes liens
let listeLiens = document.querySelectorAll("a");

// j'ai parcouru tous mes liens
for (let i = 0; i < listeLiens.length; i++) {
  let a = listeLiens[i];

  // j'ai capté l'événement de survol pour chaque lien
  a.addEventListener("mouseover", function () {
    // j'ai fait disparaitre au click chaque lien
    this.style.display = "none"; // fait référence au lien qu'on est en train de survoler
  });

  // j'ai capté l'événement de unfocus pour chaque lien
  a.addEventListener("mouseout", function () {
    // j'ai fait disparaitre au click chaque lien
    this.style.display = "inline-block"; // fait référence au lien qu'on ne survole plus
  });
}

//
// CRÉER DE L'INTERACTION ET DES ANIMATIONS
//
