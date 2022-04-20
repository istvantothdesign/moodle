const astFavBtn = document.getElementById("block_user_favorites_set");

astFavBtn.addEventListener("click", function () {
  setTimeout(astFavFix, 500);
});

function astFavFix() {
  console.log("hi");
  let astFavName = document.getElementById("favorite-url");

  astFavName.setAttribute("required", "");
  astFavName.defaultValue = "";
}
