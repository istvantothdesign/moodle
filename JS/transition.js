//Variables
const lottieContainer = document.querySelector(".ast-lottie__container");
const svgContainer = document.getElementById("ast-lottie__svg");
const animItem = bodymovin.loadAnimation({
  wrapper: svgContainer,
  animType: "svg",
  loop: false,
  autoplay: false,
  path: "https://assets2.lottiefiles.com/packages/lf20_fuqyzmha.json",
});

//On page load
/*v1
window.onload = function () {
  lottieContainer.classList.remove("ast-lottie__hide");
  animItem.goToAndPlay(0, true);
};
*/

$(window).load(function () {
  // Animate loader off screen
  lottieContainer.classList.remove("ast-lottie__hide");
  animItem.goToAndPlay(0, true);
  let animWrap = document.getElementById("ast-lottie__svg");
  let anim = animWrap.getElementsByTagName("svg");
  anim[0].setAttribute("preserveAspectRatio", "none");
  anim[0].style.width = "100vw";
  anim[0].style.height = "100vh";
});

//Display none after animation
animItem.addEventListener("complete", () => {
  lottieContainer.classList.add("ast-lottie__hide");
});
