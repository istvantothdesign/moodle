// Dashboard feature
if (skin === "amazon") {
  const dashFeature = document.querySelector(".ast-embed-wrp");
  dashFeature.classList.add("d-none");
}

// Roles
const astRole = document.querySelector(".ast-role").innerHTML;
console.log(astRole);

if (astRole.includes("admin") === true) {
  const astDrawer = document.querySelector(".ast-drawer");
  astDrawer.style.display = "block";
}
