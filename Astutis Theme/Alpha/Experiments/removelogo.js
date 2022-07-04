const astPageID2 = document.querySelector("body").id;

function removeLogo() {
  const logo = document.querySelector(".navbar-brand .logo");
  logo.classList.add("d-none");
}

function removeLogoPages() {
  if (astPageID2 === "page-login-signup") {
    removeLogo();
  }
}

removeLogoPages();
