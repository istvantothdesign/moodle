// const astFavBtn = document.getElementById("block_user_favorites_set");
const astFavSave = document.querySelector(".modal-footer .btn-primary");

astFavSave.addEventListener("click", function () {
  setTimeout(astFavFixReset, 500);
});

// const astFavBtnDelete = document.getElementById("block_user_favorites_delete");
astFavBtnDelete.addEventListener("click", astFavFixReset());

astFavBtn.addEventListener("click", function () {
  setTimeout(astFavFix, 500);
});

function astFavFixReset() {
  console.log(astFavBtn);
}

// New solution *if
// const astFavBtn = document.getElementById("block_user_favorites_set");
// const astFavBtnDelete = document.getElementById("block_user_favorites_delete");

// if (astFavBtnDelete === null) {
//   console.log("yeyyey");
//   astFavBtn.addEventListener("click", function () {
//     setTimeout(astFavFix, 500);
//   });
// } else {
//   console.log("yeydel");
//   astFavBtnDelete.addEventListener("click", function () {
//     setTimeout(astFavFix, 500);
//   });
// }

// Test
const astFavBtn = document.querySelector(".block_user_favorites-control span");

astFavBtn.addEventListener("click", function () {
  setTimeout(astFavFix, 500);
});

function astFavFix() {
  console.log("hi");
  let astFavName = document.getElementById("favorite-url");
  astFavName.setAttribute("required", "");
  astFavName.defaultValue = "";
}
