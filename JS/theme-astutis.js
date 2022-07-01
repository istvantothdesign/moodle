// Dashboard feature
if (skin === "amazon") {
  const dashFeature = document.querySelector(".ast-embed-wrp");
  dashFeature.classList.add("d-none");
}

// Variables
const astPageID2 = document.querySelector("body").id;
const astRole = document.querySelector(".ast-role").innerHTML;
const drawerRight = document.querySelector(
  ".drawer-toggler.drawer-right-toggle"
);

// Functions
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
  } else if (window.location.href.includes("#amazon")) {
    logoImg.classList.add("amazon-logo");
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
removedrawer();
customLogin();
astActivityHover();
