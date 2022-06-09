//VARIABLES
const navLogo = document.querySelector(".navbar-brand");
const sectionImgColor = document.querySelectorAll(
  ".featureimage-inner.sl-bg-img-cover.bg-primary"
);
const astCourseCard = document.querySelectorAll(
  ".detail-inner.border.d-flex.flex-column.sl-hover-bg-darken.sl-hover-lift.w-100.flex-grow-1.position-relative.shadow.overflow-hidden"
);
const skin = document.querySelector(".ast-skin").innerHTML;

const circles3 = document.querySelectorAll(
  ".learningitem-wrap:nth-of-type(3n) .detail-inner"
);
const circles2 = document.querySelectorAll(
  ".learningitem-wrap:nth-of-type(2n) .detail-inner"
);
const circles1 = document.querySelectorAll(
  ".learningitem-wrap:nth-of-type(1n) .detail-inner"
);

const skinLower = skin.toString().toLowerCase();

//FUNCTIONS
//Loader bg color
//Change color
function loaderColor() {
  const transition = document.querySelector(".transition-3");
  switch (skinLower) {
    case "meta":
      transition.style.setProperty("--astloader", "#3385ff");
      break;
    case "rospa":
      transition.style.setProperty("--astloader", "#ab0161");
      break;
    case "twitter":
      transition.style.setProperty("--astloader", "#3385ff");
      break;
    default:
      transition.style.setProperty("--astloader", "#9243FF");
  }
}

//Course card ROSPA
function courseCardRospa() {
  for (let i = 0; i < circles3.length; i++) {
    const circle = circles3[i];
    // 2. Modify its custom css properties
    circle.style.setProperty("--ast-small-circle-3", "#FF0A8D");
  }
  for (let i = 0; i < circles2.length; i++) {
    const circle = circles2[i];
    // 2. Modify its custom css properties
    circle.style.setProperty("--ast-small-circle-2", "#B80062");
  }
  for (let i = 0; i < circles1.length; i++) {
    const circle = circles1[i];
    // 2. Modify its custom css properties
    circle.style.setProperty("--ast-small-circle-1", "#D0006F");
  }
}

//Course card META
function courseCardMeta() {
  for (let i = 0; i < circles3.length; i++) {
    const circle = circles3[i];
    // 2. Modify its custom css properties
    circle.style.setProperty("--ast-small-circle-3", "#0044CC");
  }
  for (let i = 0; i < circles2.length; i++) {
    const circle = circles2[i];
    // 2. Modify its custom css properties
    circle.style.setProperty("--ast-small-circle-2", "#1F69FF");
  }
  for (let i = 0; i < circles1.length; i++) {
    const circle = circles1[i];
    // 2. Modify its custom css properties
    circle.style.setProperty("--ast-small-circle-1", "#0054F7");
  }
}

//Course card Twitter
function courseCardTwitter() {
  for (let i = 0; i < circles3.length; i++) {
    const circle = circles3[i];
    // 2. Modify its custom css properties
    circle.style.setProperty("--ast-small-circle-3", "#0D94E7");
  }
  for (let i = 0; i < circles2.length; i++) {
    const circle = circles2[i];
    // 2. Modify its custom css properties
    circle.style.setProperty("--ast-small-circle-2", "#51B6F5");
  }
  for (let i = 0; i < circles1.length; i++) {
    const circle = circles1[i];
    // 2. Modify its custom css properties
    circle.style.setProperty("--ast-small-circle-1", "#1DA1F2");
  }
}

//Course card ASTUTIS
function courseCardAstutis() {
  for (let i = 0; i < circles3.length; i++) {
    const circle = circles3[i];
    // 2. Modify its custom css properties
    circle.style.setProperty(
      "--ast-small-circle-3",
      "linear-gradient(181.64deg,#a9a4d9 0%,#3127a4 100%)"
    );
  }
  for (let i = 0; i < circles2.length; i++) {
    const circle = circles2[i];
    // 2. Modify its custom css properties
    circle.style.setProperty(
      "--ast-small-circle-2",
      "linear-gradient(180deg,#ffb99a 0%,#ff6f30 100%)"
    );
  }
  for (let i = 0; i < circles1.length; i++) {
    const circle = circles1[i];
    // 2. Modify its custom css properties
    circle.style.setProperty(
      "--ast-small-circle-1",
      "linear-gradient(181.64deg,#e1bdfe 0%,#a243ff 100%)"
    );
  }
}
//courseCardRospa();

///GOLDEN 1.2
function changeCards() {
  console.log("start");
  switch (skinLower) {
    case "rospa":
      courseCardRospa();
      for (i = 0; i < sectionImgColor.length; ++i) {
        sectionImgColor[i].classList.add("change-rospa");
      }
      navLogo.children[0].src =
        "https://istvantothdesign.github.io/astutis/rospa-logo.png";

      break;
    case "meta":
      courseCardMeta();
      for (i = 0; i < sectionImgColor.length; ++i) {
        sectionImgColor[i].classList.add("change-meta");
      }
      navLogo.children[0].src =
        "https://istvantothdesign.github.io/astutis/meta-logo.png";

      break;
    case "twitter":
      courseCardTwitter();
      for (i = 0; i < sectionImgColor.length; ++i) {
        sectionImgColor[i].classList.add("change-twitter");
      }
      navLogo.children[0].src =
        "https://istvantothdesign.github.io/astutis/twitter-logo.png";

      break;
    case "astutis":
      courseCardAstutis();
      for (i = 0; i < sectionImgColor.length; ++i) {
        sectionImgColor[i].classList.add("change-astutis");
      }
      navLogo.children[0].src =
        "https://istvantothdesign.github.io/astutis/Astutis-logo.png";

      break;
    default:
      courseCardAstutis();
      for (i = 0; i < sectionImgColor.length; ++i) {
        sectionImgColor[i].classList.add("change-astutis");
      }
      navLogo.children[0].src =
        "https://istvantothdesign.github.io/astutis/Astutis-logo.png";

      break;
  }
  console.log("finish");
}

/*ENVOKE THESE
//WELCOME TEXT
if (window.location.href.indexOf("http://mylearningdev.astutis.com/my/") != -1) {
  // do stuff for reserve.php page here
  function changeWelcomeTxt(company) {
    const astWelcomeTxt = document.querySelector(
      ".display-4.font-weight-semibold"
    );
    console.log("Switc start");
    switch (company) {
      case "astutis":
        astWelcomeTxt.firstElementChild.classList.remove("primarygradient");
        astWelcomeTxt.firstElementChild.classList.add(
          "ast-welcome-txt--astutis"
        );
        break;
      case "rospa":
        astWelcomeTxt.firstElementChild.classList.remove("primarygradient");
        astWelcomeTxt.firstElementChild.classList.add("ast-welcome-txt--rospa");
        break;
      case "meta":
        astWelcomeTxt.firstElementChild.classList.remove("primarygradient");
        astWelcomeTxt.firstElementChild.classList.add("ast-welcome-txt--meta");
        break;
      case "twitter":
        astWelcomeTxt.firstElementChild.classList.remove("primarygradient");
        astWelcomeTxt.firstElementChild.classList.add(
          "ast-welcome-txt--twitter"
        );
        break;
    }
    console.log("Switc ends");
  }
  changeWelcomeTxt(skinLower);
}

changeCards();
*/
