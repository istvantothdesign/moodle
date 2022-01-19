//Loading animation V3
window.onload = function () {
  const anchors = document.querySelectorAll("a");
  const transition_el = document.querySelector(".transition");
  console.log("loaded");
  document.body.classList.add("ast-no-scroll");

  setTimeout(() => {
    transition_el.classList.remove("is-active");
  }, 500);
  setTimeout(() => {
    transition_el.classList.add("hidden");
    document.body.classList.remove("ast-no-scroll");
  }, 900);

  // for (let i = 0; i < anchors.length; i++) {
  //   const anchor = anchors[i];

  //   anchor.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     let target = e.target.href;

  //     console.log(transition_el);
  //     transition_el.classList.remove("hidden");

  //     setTimeout(() => {
  //       transition_el.classList.add("is-active");
  //     }, 100);
  //     console.log(transition_el);

  //     setTimeout(() => {
  //       window.location.href = target;
  //     }, 500);
  //   });
  // }
};
