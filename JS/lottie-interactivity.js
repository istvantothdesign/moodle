// Class
class Lottie {
  constructor() {
    this.ids = document.querySelectorAll("[id^='ast-lottie-play--']");
  }
  scrollSync(id) {
    LottieInteractivity.create({
      player: `#${id}`,
      mode: "scroll",
      actions: [
        {
          visibility: [0, 1.0],
          type: "seek",
          frames: [0, 300],
        },
      ],
    });
  }
  visible(id, position = 0.5) {
    LottieInteractivity.create({
      player: `#${id}`,
      mode: "scroll",
      actions: [
        {
          visibility: [position, 1.0],
          type: "play",
        },
      ],
    });
  }
  toggle(id) {
    LottieInteractivity.create({
      player: `#${id}`,
      mode: "cursor",
      actions: [
        {
          type: "toggle",
        },
      ],
    });
  }
  automate() {
    this.ids.forEach((id) => {
      console.log(id);
      if (id.classList.contains("ast-lottie--scroll")) {
        this.scrollSync(id.id);
      } else if (id.classList.contains("ast-lottie--visible")) {
        this.visible(id.id, id.dataset.visible);
      } else if (id.classList.contains("ast-lottie--toggle")) {
        this.toggle(id.id);
      } else {
        this.visible(id.id);
      }
    });
  }
}

const astLottie = new Lottie();

// Automate lottie triggers
astLottie.automate();
