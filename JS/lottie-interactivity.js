// Class
class Lottie {
  constructor() {}
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
}

const astLottie = new Lottie();

// Lotties
astLottie.scrollSync("firstLottie");
astLottie.visible("secondLottie", 0.3);
astLottie.toggle("thirdLottie");
astLottie.visible("fourthLottie", 0.2);
