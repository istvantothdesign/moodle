// Dashboard feature
if (skin === "amazon") {
  const dashFeature = document.querySelector(".ast-embed-wrp");
  dashFeature.classList.add("d-none");
}

// Removing right drawer from learners
const astPageID2 = document.querySelector("body").id;
const astRole = document.querySelector(".ast-role").innerHTML;
const drawerRight = document.querySelector(
  ".drawer-toggler.drawer-right-toggle"
);

function removedrawer() {
  if (
    astPageID2 === "page-course-view-topics" ||
    astPageID2 === "page-my-index" ||
    astPageID2 === "page-user-profile"
  ) {
    drawerRight.classList.add("d-none");
  }

  if (
    astRole.includes("admin") === true ||
    astRole.includes("clientadmin") === true
  ) {
    drawerRight.classList.remove("d-none");
  }
}

// Custom login
function customLogin() {
  const logoImg = document.getElementById("logoimage");

  if (window.location.href.includes("#rospa")) {
    logoImg.classList.add("rospa-logo");
  } else if (window.location.href.includes("#amazon")) {
    logoImg.classList.add("amazon-logo");
  }
}

removedrawer();
customLogin();
