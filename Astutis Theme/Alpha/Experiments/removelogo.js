const astPageID2 = document.querySelector("body").id;

// Removing logo from nav bar
function removeLogoPages() {
  function removeLogo() {
    const logo = document.querySelector(".navbar-brand .logo");
    logo.classList.add("d-none");
    // logo.style.display = "none";
  }
  if (astPageID2 === "page-login-signup") {
    removeLogo();
  }
}

removeLogoPages();
