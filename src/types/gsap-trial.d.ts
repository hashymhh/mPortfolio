declare module "gsap-trial/SplitText" {
  import { gsap } from "gsap";

  export class SplitText {
    constructor(
      target: gsap.DOMTarget,
      vars?: Record<string, unknown>
    );
    chars: HTMLElement[];
    words: HTMLElement[];
    lines: HTMLElement[];
    revert(): void;
  }
}

declare module "gsap-trial/ScrollSmoother" {
  export class ScrollSmoother {
    static create(vars?: Record<string, unknown>): ScrollSmoother;
    paused(value: boolean): void;
  }
}
