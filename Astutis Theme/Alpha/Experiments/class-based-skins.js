// Variables for skins
const skin = document.querySelector(".ast-skin").innerHTML;
const skinLower = skin.toString().toLowerCase();
const transition = document.querySelector(".transition-3");
const topic1 = document.querySelectorAll(
  ".section.course-section.main.section-summary:nth-of-type(1n)"
);
const topic2 = document.querySelectorAll(
  ".section.course-section.main.section-summary:nth-of-type(2n)"
);
const body = document.querySelector("body");

let bodyBg;
let navLogo = document.querySelector(".navbar-brand");

function brandColors() {
  switch (skinLower) {
    case "rospa":
      // Link to the logo image
      navLogo.children[0].src =
        "https://istvantothdesign.github.io/astutis/rospa-logo.png";

      // Change loading animation colour here
      transition.style.setProperty("--astloader", "#a8005f");

      // Topic colours
      for (let i = 0; i < topic1.length; i++) {
        const topic = topic1[i];

        topic.classList.add("ast-topic-1--rospa");
      }
      for (let i = 0; i < topic2.length; i++) {
        const topic = topic2[i];

        topic.classList.add("ast-topic-2--rospa");
      }
      // Backgorun image
      body.classList.add("ast-body--rospa");
      break;
  }
}
brandColors();
