const topics = document.querySelectorAll(".section-summary");
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
