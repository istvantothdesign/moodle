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
