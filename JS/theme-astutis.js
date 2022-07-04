// Variables
const astPageID2 = document.querySelector("body").id;
const astRole = document.querySelector(".ast-role").innerHTML;
const drawerRight = document.querySelector(
  ".drawer-toggler.drawer-right-toggle"
);

// Variables for skins
const skin = document.querySelector(".ast-skin").innerHTML;
const skinLower = skin.toString().toLowerCase();
const skinWrp =
  document.querySelector(".ast-skin").parentNode.parentNode.parentNode
    .parentNode;
const astRoot = document.querySelector(":root");
const transition = document.querySelector(".transition-3");
const topic1 = document.querySelectorAll(
  ".section.course-section.main.section-summary:nth-of-type(1n)"
);
const topic2 = document.querySelectorAll(
  ".section.course-section.main.section-summary:nth-of-type(2n)"
);
const body = document.querySelector("body");
const welcomeText = document.querySelector(".ast-welcome-gradient");

let bodyBg;
let navLogo = document.querySelector(".navbar-brand");
let brandColor1 = "#A8005F";
let brandColor2 = "#A8005F";
let brandColor3 = "#A8005F";
let gradientColor1 = "#FF73BF";
let gradientColor2 = "#E45FA8";
let gradientColor3 = "#BD1E75";
let gradientColor4 = "#B90065";

// Functions
// SKINS
function brandColors() {
  switch (skinLower) {
    case "rospa":
      bodyBg = "white";

      // Set brand colours
      brandColor1 = "#A8005F";
      brandColor2 = "#A8005F";
      brandColor3 = "#A8005F";
      gradientColor1 = "#FF73BF";
      gradientColor2 = "#E45FA8";
      gradientColor3 = "#BD1E75";
      gradientColor4 = "#B90065";

      // Link to the logo image
      navLogo.children[0].src =
        "https://astutis.github.io/moodle/Images/Theme/ClientLogos/rospa-logo-skins.png";

      // You can leave these as they are OR...
      // Change loading animation colour here
      transition.style.setProperty("--astloader", brandColor1);

      // Change topic colours here
      for (let i = 0; i < topic1.length; i++) {
        const topic = topic1[i];

        topic.style.borderLeftColor = brandColor1;
      }
      for (let i = 0; i < topic2.length; i++) {
        const topic = topic2[i];

        topic.style.borderLeftColor = "#001258";
      }
      // Leave this as it is
      body.style.background = bodyBg;
      break;
    case "amazon":
      bodyBg = "white";

      // Set brand colours
      brandColor1 = "#036995";
      brandColor2 = "#0096D6";
      brandColor3 = "#30AFE5";
      gradientColor1 = "#30AFE5";
      gradientColor2 = "#0096D6";
      gradientColor3 = "#027EB3";
      gradientColor4 = "#027EB3";

      // Link to the logo image
      navLogo.children[0].src =
        "https://astutis.github.io/moodle/Images/Theme/ClientLogos/amazon-logo-skins.png";

      // You can leave these as they are OR...
      // Change loading animation colour here
      transition.style.setProperty("--astloader", brandColor1);

      // Change topic colours here
      for (let i = 0; i < topic1.length; i++) {
        const topic = topic1[i];

        topic.style.borderLeftColor = brandColor1;
      }
      for (let i = 0; i < topic2.length; i++) {
        const topic = topic2[i];

        topic.style.borderLeftColor = brandColor2;
      }
      // Leave this as it is
      body.style.background = bodyBg;
      break;
    case "":
      bodyBg = `url("https://mylearningdev4.astutis.com/theme/image.php/astutis/theme/1656920572/site/theme-astutis-bg")`;

      // Set brand colours
      brandColor1 = "#A243FF";
      brandColor2 = "#FF6F30";
      brandColor3 = "#3127A4";
      gradientColor1 = "#ff6f30";
      gradientColor2 = "#3e3eff";
      gradientColor3 = "#a243ff";
      gradientColor4 = "#3127a4";

      // Link to the logo image
      navLogo.children[0].src =
        "https://astutis.github.io/moodle/Images/Theme/ClientLogos/astutis-logo-skins.png";

      // You can leave these as they are OR...
      // Change loading animation colour here
      transition.style.setProperty("--astloader", brandColor1);

      // Change topic colours here
      for (let i = 0; i < topic1.length; i++) {
        const topic = topic1[i];

        topic.style.borderLeftColor = brandColor3;
      }
      for (let i = 0; i < topic2.length; i++) {
        const topic = topic2[i];

        topic.style.borderLeftColor = brandColor1;
      }
      // Leave this as it is
      body.style.background = bodyBg;
      break;
    default:
      bodyBg = `url("https://mylearningdev4.astutis.com/theme/image.php/astutis/theme/1656920572/site/theme-astutis-bg")`;

      // Set brand colours
      brandColor1 = "#A243FF";
      brandColor2 = "#FF6F30";
      brandColor3 = "#3127A4";
      gradientColor1 = "#ff6f30";
      gradientColor2 = "#3e3eff";
      gradientColor3 = "#a243ff";
      gradientColor4 = "#3127a4";

      // Link to the logo image
      navLogo.children[0].src =
        "https://istvantothdesign.github.io/astutis/Astutis-logo.png";

      // You can leave these as they are OR...
      // Change loading animation colour here
      transition.style.setProperty("--astloader", brandColor1);

      // Change topic colours here
      for (let i = 0; i < topic1.length; i++) {
        const topic = topic1[i];

        topic.style.borderLeftColor = brandColor3;
      }
      for (let i = 0; i < topic2.length; i++) {
        const topic = topic2[i];

        topic.style.borderLeftColor = brandColor1;
      }
      // Leave this as it is
      body.style.background = bodyBg;
      break;
  }

  astRoot.style.setProperty("--ast-brand-1", brandColor1);
  astRoot.style.setProperty("--ast-brand-2", brandColor2);
  astRoot.style.setProperty("--ast-brand-3", brandColor3);
  astRoot.style.setProperty("--ast-brand-gradient-1", gradientColor1);
  astRoot.style.setProperty("--ast-brand-gradient-2", gradientColor2);
  astRoot.style.setProperty("--ast-brand-gradient-3", gradientColor3);
  astRoot.style.setProperty("--ast-brand-gradient-4", gradientColor4);

  skinWrp.classList.add("d-none");
}

// Removing right drawer from learners
function removedrawer() {
  if (astPageID2 != "page-mod-book-view") {
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
    let pageID = document.getElementById("page");
    pageID.style.background = "white";
  } else if (window.location.href.includes("#amazon")) {
    logoImg.classList.add("amazon-logo");
    let pageID = document.getElementById("page");
    pageID.style.background = "white";
  }
}

// Activity/Topic hover
function astActivityHover() {
  if (astPageID2 === "page-course-view-topics") {
    console.log("yes");
    const topics = document.querySelectorAll(".section-summary");
    //const activities = document.querySelectorAll(".activity.activity-wrapper");
    console.log(topics);

    for (let i = 0; i < topics.length; ++i) {
      topics[i].addEventListener("click", function () {
        let link = this.childNodes[1].childNodes[1].childNodes[1].href;
        console.log(link);
        window.location.href = `${link}`;
      });

      // This handler will be executed every time the cursor
      // is moved over a different list item
      topics[i].addEventListener(
        "mouseover",
        function (event) {
          // highlight the mouseover target
          //   event.target.style.background = "orange";
          event.target.style.cursor = "pointer";

          //   // reset the color after a short delay
          //   setTimeout(function () {
          //     event.target.style.background = "green";
          //   }, 500);
        },
        false
      );
    }

    for (let i = 0; i < activities.length; ++i) {
      activities[i].addEventListener("click", function () {
        let link =
          this.childNodes[1].childNodes[1].childNodes[1].childNodes[1]
            .childNodes[1].childNodes[3].childNodes[3].childNodes[1].href;
        console.log(link);
        window.location.href = `${link}`;
      });

      // This handler will be executed every time the cursor
      // is moved over a different list item
      activities[i].addEventListener(
        "mouseover",
        function (event) {
          // highlight the mouseover target
          //   event.target.style.background = "orange";
          event.target.style.cursor = "pointer";

          //   // reset the color after a short delay
          //   setTimeout(function () {
          //     event.target.style.background = "green";
          //   }, 500);
        },
        false
      );
    }
  }
}

// Calling functions (add these to site admin->appearance->additional html-> before body)
// brandColors();
// removedrawer();
// customLogin();
// astActivityHover();
