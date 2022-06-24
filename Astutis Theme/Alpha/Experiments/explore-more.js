const astExpCtn = document.querySelector(
  ".ast-card__ctnt-wrp.ast-explore .ast-card__ctnt-wrp__ctnt"
);
const astExpList = document.querySelector(".ast-list__numbered--plain");

// Removing <br> tags
const astExpBr = astExpCtn.querySelectorAll("br");
for (let index = 0; index < astExpBr.length; index++) {
  astExpBr[index].style.display = "none";
}

// Adding reminder box
let astExpAddition = document.createElement("p");
astExpAddition.append(
  "Remember: these videos give a different, more in-depth view of the topic. The information you need to pass the course is all in the text above."
);
astExpAddition.classList.add("ast-italic", "ast-explore__reminder");
astExpCtn.insertBefore(astExpAddition, astExpCtn.children[0]);

// Styling Explore more
astExpCtn.children[1].style.marginBottom = "10px";
astExpCtn.children[1].style.marginLeft = "20px";
astExpList.style.marginLeft = "50px";
