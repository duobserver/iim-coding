let friends = document.querySelectorAll(".friend");

friends.forEach((friend) => {
  let friendUsername = friend.querySelector("p");
  let links = friend.querySelectorAll("a");

  links.forEach((link) => {
    link.setAttribute("href", `{{ url_for('friendship',action='${link.innerText}',friendUsername='${friendUsername.innerText}') }}`);
  });
});
