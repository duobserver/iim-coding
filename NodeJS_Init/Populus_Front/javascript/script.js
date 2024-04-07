// GENERAL PURPOSE SCRIPT

// automatically add css stylesheet
let stylesheet = document.createElement("link");
stylesheet.rel = "stylesheet";
stylesheet.href = "../css/style.css";
document.head.appendChild(stylesheet);

// automatically add google stylesheet
stylesheet = document.createElement("link");
stylesheet.rel = "stylesheet";
stylesheet.href = "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,100..700,0..1,0";
document.head.appendChild(stylesheet);

// automatically add nav items
document.querySelector("nav").innerHTML = `
<a href="index.html"><h1>Populus</h1></a>
<div>
    <a href="people.html"><span class="material-symbols-rounded">groups</span>People</a>
    <a href="login.html"><span class="material-symbols-rounded">login</span>Login</a>
    <a href="signup.html"><span class="material-symbols-rounded">start</span>Signup</a>
    <a href="user.html?id=0"><span class="material-symbols-rounded">account_circle</span>Me</a>
    <a href="settings.html"><span class="material-symbols-rounded">settings</span>Settings</a>
</div>
`;

let notice = document.querySelector("#notice");
function noticeUpdate() {
    notice.className = "";
    let noticeContent = localStorage.getItem("notice");

    if (noticeContent) {
        noticeContent = noticeContent.split("-");

        if (noticeContent[0] == "0") {
            notice.classList.add("error");
            notice.innerHTML = "<span class='material-symbols-rounded'>error</span>";
        } else {
            notice.classList.add("done");
            notice.innerHTML = "<span class='material-symbols-rounded'>check_circle</span>";
        }

        notice.innerHTML += `<p>${noticeContent[1]}</p>`;
        notice.style.display = "";
    } else {
        notice.innerHTML = "";
        notice.style.display = "none";
    }
}

noticeUpdate();
