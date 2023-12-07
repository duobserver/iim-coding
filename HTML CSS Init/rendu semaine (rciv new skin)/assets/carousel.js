// Genuine javascript carousel made by HexoStone

const sponsors = document.getElementsByClassName("sponsorsCarousel");
var sponsorsCounter = sponsors[0].childElementCount;
document.getElementById("sponsorTotal").innerHTML = parseFloat(sponsorsCounter);
var counter1 = 1;

const gallery = document.getElementsByClassName("galleryCarousel");
var galleryCounter = gallery[0].childElementCount;
document.getElementById("galleryTotal").innerHTML = parseFloat(galleryCounter);
var counter2 = 1;

function carousel(type, direction) {
  if (type == "sponsors") {
    var temp = counter1;
    if (direction == "forward") {
      counter1++;
      if (counter1 > sponsorsCounter) {
        counter1 = 1;
      }
    } else {
      counter1--;
      if (counter1 < 1) {
        counter1 = sponsorsCounter;
      }
    }
    document.getElementById("logo" + parseFloat(temp)).style.display = "none";
    document.getElementById("logo" + parseFloat(counter1)).style.display =
      "initial";
    document.getElementById("sponsorNum").innerHTML = parseFloat(counter1);
  } else {
    var temp = counter2;
    if (direction == "forward") {
      counter2++;
      if (counter2 > galleryCounter) {
        counter2 = 1;
      }
    } else {
      counter2--;
      if (counter2 < 1) {
        counter2 = galleryCounter;
      }
    }
    document.getElementById("gallery" + parseFloat(temp)).style.display =
      "none";
    document.getElementById("gallery" + parseFloat(counter2)).style.display =
      "initial";
    document.getElementById("galleryNum").innerHTML = parseFloat(counter2);
  }
}
