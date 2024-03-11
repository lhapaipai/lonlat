export type EasingKeys = keyof typeof easingFunctions;

export const easingFunctions = {
  // start slow and gradually increase speed
  easeInCubic(t: number) {
    return t * t * t;
  },
  // start fast with a long, slow wind-down
  easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
  },
  // slow start and finish with fast middle
  easeInOutCirc(t: number) {
    return t < 0.5
      ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
      : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
  },
  // fast start with a "bounce" at the end
  easeOutBounce(t: number) {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (t < 1 / d1) {
      return n1 * t * t;
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75;
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375;
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
  },
};
