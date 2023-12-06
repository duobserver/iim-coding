const navCheck = document.getElementById("navCheck");
const scrollTopLabel = document.getElementById("scrollTopLabel");
const sidebar = document.getElementById("sidebar");
const scroller = document.getElementById("scroller");

window.onload = function () {
  resizeDetect();
  hideNav();
  responsiveMargin();
  scrollTop();
};

window.onresize = function () {
  resizeDetect();
  hideNav();
  responsiveMargin();
  scrollTop();
};

window.onscroll = function () {
  scrollTop();
};

function resizeDetect() {
  if (window.innerWidth < 768) {
    navCheck.checked = true;
  } else {
    navCheck.checked = false;
  }
}

function hideNav() {
  if (navCheck.checked == true) {
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("openSidebar").style.display = "block";
    document.getElementById("closeSidebar").style.display = "none";
  } else {
    document.getElementById("sidebar").style.display = "block";
    document.getElementById("openSidebar").style.display = "none";
    document.getElementById("closeSidebar").style.display = "block";
  }
}

function scrollTop() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopLabel.style.display = "block";
  } else {
    scrollTopLabel.style.display = "none";
  }
}

function responsiveMargin() {
  if (navCheck.checked == false) {
    if (window.innerWidth > 768) {
      computed = window.getComputedStyle(sidebar);
      width = computed.getPropertyValue("width");
      scroller.style.marginLeft = parseFloat(width) + "px";
    }
  } else {
    scroller.style.marginLeft = "0px";
  }
}
