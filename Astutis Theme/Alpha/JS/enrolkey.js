const enrolIDField = document.getElementById("id_profile_field_enroltest");
const submitBtn = document.getElementById("id_submitbutton");
const form = document.querySelector(".mform.full-width-labels");

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  let enrolID = enrolIDField.value;
  console.log(enrolID);

  if (enrolID === "yes") {
    console.log("hurray!");
  } else if (enrolID === "no") {
    console.log("nooooooo");
    form.submit();
  }
});

const test = document.querySelector(".section-summary");
console.log(test);

// This handler will be executed every time the cursor
// is moved over a different list item
test.addEventListener(
  "mouseover",
  function (event) {
    // highlight the mouseover target
    event.target.style.background = "orange";

    // reset the color after a short delay
    setTimeout(function () {
      event.target.style.background = "green";
    }, 500);
  },
  false
);
