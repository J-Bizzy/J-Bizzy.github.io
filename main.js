document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  navToggle?.addEventListener("click", () => navMenu?.classList.toggle("open"));

  // Intro overlay handling: inject only on first visit
  const introKey = "jb_intro_seen";
  const introSeen =
    window.localStorage.getItem(introKey) === "true" ||
    window.sessionStorage.getItem(introKey) === "true" ||
    window.__jbIntroInjected === true;
  const isHome = !!document.querySelector(".hero");

  if (!introSeen && isHome) {
    // create overlay
    window.__jbIntroInjected = true;
    const frame = document.createElement("div");
    frame.className = "intro-frame";
    frame.id = "introFrame";
    frame.innerHTML = `
      <div class="intro-content">
        <img class="intro-signature" src="photos/signature.png" alt="Signature of Jackson Bizzell">
        <h1 class="sr-only">Student developer crafting clean, modern builds</h1>
        <p class="intro-subtext">I focus on thoughtful UI, reliable code, and fast iteration—scroll to see what I’ve been shipping.</p>
      </div>
      <button class="intro-arrow" id="introArrow" aria-label="Scroll down">↓</button>
    `;
    document.body.appendChild(frame);
    document.body.classList.add("frame-lock");

    const introArrow = frame.querySelector("#introArrow");
    let dismissed = false;

    const cleanListeners = () => {
      window.removeEventListener("wheel", onFirstScroll);
      window.removeEventListener("touchstart", onFirstScroll);
      window.removeEventListener("keydown", onFirstKey);
    };

    const dismissFrame = () => {
      if (dismissed) return;
      dismissed = true;
      try {
        window.localStorage.setItem(introKey, "true");
      } catch (e) {
        window.sessionStorage.setItem(introKey, "true");
      }
      frame.classList.add("hide");
      setTimeout(() => {
        frame.remove();
        document.body.classList.remove("frame-lock");
      }, 600);
      cleanListeners();
    };

    const onFirstScroll = () => dismissFrame();
    const onFirstKey = (e) => {
      if (["ArrowDown", "Space", "Enter"].includes(e.code) || ["ArrowDown", " "].includes(e.key)) {
        dismissFrame();
      }
    };

    introArrow?.addEventListener("click", dismissFrame);
    window.addEventListener("wheel", onFirstScroll, { passive: true });
    window.addEventListener("touchstart", onFirstScroll, { passive: true });
    window.addEventListener("keydown", onFirstKey);
  }

  // Scroll-triggered reveals
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = Array.from(document.querySelectorAll(".reveal, .reveal-up, .reveal-down, .reveal-left, .reveal-right"));

  if (prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  } else if (revealEls.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.2,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    revealEls.forEach((el) => observer.observe(el));
  }
});
