// Class
class Lottie {
  constructor() {
    this.ids = document.querySelectorAll("[id^='ast-lottie-play--']");
  }
  scrollSync(
    id,
    positionStart = 0,
    positionEnd = 1.0,
    frameStart = 0,
    frameEnd = 300
  ) {
    LottieInteractivity.create({
      player: `#${id}`,
      mode: "scroll",
      actions: [
        {
          visibility: [positionStart, positionEnd],
          type: "seek",
          frames: [frameStart, frameEnd],
        },
      ],
    });
  }
  visible(id, positionStart = 0.5, positionEnd = 1.0) {
    LottieInteractivity.create({
      player: `#${id}`,
      mode: "scroll",
      actions: [
        {
          visibility: [positionStart, positionEnd],
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
  hover(id) {
    LottieInteractivity.create({
      player: `#${id}`,
      mode: "cursor",
      actions: [
        {
          type: "hover",
          forceFlag: false,
        },
      ],
    });
  }
  automate() {
    this.ids.forEach((id) => {
      console.log(id);
      if (id.classList.contains("ast-lottie--scroll")) {
        this.scrollSync(
          id.id,
          id.dataset.visiblestart,
          id.dataset.visibleend,
          id.dataset.framestart,
          id.dataset.frameend
        );
      } else if (id.classList.contains("ast-lottie--visible")) {
        this.visible(id.id, id.dataset.visiblestart, id.dataset.visibleend);
      } else if (id.classList.contains("ast-lottie--toggle")) {
        this.toggle(id.id);
      } else if (id.classList.contains("ast-lottie--hover")) {
        this.hover(id.id);
      } else {
        this.visible(id.id);
      }
    });
  }
}

const astLottie = new Lottie();

// Automate lottie triggers
astLottie.automate();
