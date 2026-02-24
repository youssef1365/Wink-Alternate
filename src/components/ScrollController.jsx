import { useState, useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import Header from "./Header.jsx";
import Hero from "./Hero.jsx";
import AboutUs from "./aboutsus.jsx";
import Vision from "./Vision.jsx";
import Services from "./Services.jsx";
import Packages from "./packages.jsx";
import StatsTransition from "./statstransition.jsx";
import Events from "./events.jsx";
import Footer from "./footer.jsx";

// ─── Mobile hook ────────────────────────────────────────────────────────────
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);

  return isMobile;
}

export default function ScrollController() {
  const [activeSection, setActiveSection] = useState("home");
  const isMobile = useIsMobile();
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark";
    }
    return "dark";
  });

  const velocity = useMotionValue(0);
  const direction = useMotionValue("down");
  const progressRaw = useMotionValue(0);
  const progress = useSpring(progressRaw, { stiffness: 80, damping: 20 });

  const sentinelRefs = useRef({});
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());

  // ─── Touch tracking refs ─────────────────────────────────────────────────
  const touchStartY = useRef(0);
  const touchLastY = useRef(0);
  const touchLastTime = useRef(Date.now());
  const touchInsideInternalScroll = useRef(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ─── Fix 100vh on mobile (address-bar resize) ────────────────────────────
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    };
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  // ─── Scroll + Touch velocity tracking ────────────────────────────────────
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;
          const currentTime = Date.now();
          const totalHeight =
            document.documentElement.scrollHeight - window.innerHeight;

          const timeDelta = currentTime - lastScrollTime.current;
          const posDelta = Math.abs(currentY - lastScrollY.current);
          const v = timeDelta > 0 ? posDelta / timeDelta : 0;

          const smoothed =
            velocity.get() * 0.8 + Math.min(v, 5) * 0.2;

          velocity.set(smoothed);
          direction.set(currentY > lastScrollY.current ? "down" : "up");
          progressRaw.set(totalHeight > 0 ? currentY / totalHeight : 0);

          lastScrollY.current = currentY;
          lastScrollTime.current = currentTime;
          ticking = false;
        });

        ticking = true;
      }
    };

    // Check if a touch target is inside an internally-scrollable container
    // (anything that can scroll on its own, like the AboutUs inner list)
    const isInsideInternalScroll = (target) => {
      let el = target;
      while (el && el !== document.body) {
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        const canScroll =
          (overflowY === "auto" || overflowY === "scroll") &&
          el.scrollHeight > el.clientHeight;
        if (canScroll) return true;
        el = el.parentElement;
      }
      return false;
    };

    // Touch events for mobile velocity tracking
    const handleTouchStart = (e) => {
      touchInsideInternalScroll.current = isInsideInternalScroll(e.target);
      touchStartY.current = e.touches[0].clientY;
      touchLastY.current = e.touches[0].clientY;
      touchLastTime.current = Date.now();
    };

    const handleTouchMove = (e) => {
      // Let internal scroll containers handle their own scrolling untouched
      if (touchInsideInternalScroll.current) return;

      const currentY = e.touches[0].clientY;
      const currentTime = Date.now();
      const timeDelta = currentTime - touchLastTime.current;
      const posDelta = Math.abs(currentY - touchLastY.current);
      const v = timeDelta > 0 ? posDelta / timeDelta : 0;

      const smoothed = velocity.get() * 0.8 + Math.min(v, 5) * 0.2;
      velocity.set(smoothed);
      direction.set(currentY < touchLastY.current ? "down" : "up");

      touchLastY.current = currentY;
      touchLastTime.current = currentTime;
    };

    const handleTouchEnd = () => {
      touchInsideInternalScroll.current = false;
      // Decay velocity after touch ends
      const decay = setInterval(() => {
        const current = velocity.get();
        if (current < 0.01) {
          velocity.set(0);
          clearInterval(decay);
        } else {
          velocity.set(current * 0.85);
        }
      }, 16);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.dataset.sectionId);
        }
      },
      {
        // Wider rootMargin on mobile since sections may be taller relative to viewport
        rootMargin: isMobile ? "-15% 0% -15% 0%" : "-25% 0% -25% 0%",
        threshold: [0.1, 0.25, 0.5, 0.75]
      }
    );

    Object.values(sentinelRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  const reg = (id) => (el) => {
    if (el) sentinelRefs.current[id] = el;
  };

  return (
    <>
      {/*
        Global mobile-safety styles injected once.
        These complement whatever CSS your components already have.
        Key fixes:
          - Use --vh custom property for true mobile viewport height
          - Prevent horizontal overflow
          - Smooth momentum scrolling on iOS
          - Prevent tap highlight & text-size-adjust quirks
      */}
      <style>{`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        html {
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
          scroll-behavior: smooth;
          /* Prevent horizontal scroll bleed */
          overflow-x: hidden;
        }

        body {
          overflow-x: hidden;
          /* Momentum scroll on iOS */
          -webkit-overflow-scrolling: touch;
          /* Remove tap highlight on mobile */
          -webkit-tap-highlight-color: transparent;
        }

        /* Mobile-safe full-height helper.
           Use  height: calc(var(--vh, 1vh) * 100)  in child components
           instead of  height: 100vh  to avoid address-bar issues on iOS/Android. */

        /* Prevent images / media from overflowing their containers */
        img,
        video,
        svg,
        canvas,
        iframe {
          max-width: 100%;
          height: auto;
        }

        /* Prevent long words / URLs from breaking layouts on narrow screens */
        p, li, h1, h2, h3, h4, h5, h6, span, a {
          overflow-wrap: break-word;
          word-break: break-word;
        }

        /* Minimum touch target size (WCAG 2.5.8) */
        button,
        [role="button"],
        a,
        label,
        input[type="checkbox"],
        input[type="radio"],
        select {
          min-height: 44px;
          min-width: 44px;
        }

        /* Remove 300ms tap delay on mobile */
        a,
        button,
        [role="button"] {
          touch-action: manipulation;
        }

        /* Prevent inputs from triggering iOS zoom (font-size must be ≥16px) */
        input,
        select,
        textarea {
          font-size: max(16px, 1em);
        }

        /* Section wrapper: prevent any child from punching outside */
        [data-section-id] {
          position: relative;
          overflow-x: hidden;
          width: 100%;
        }
      `}</style>

      <Header
        activeSection={activeSection}
        scrollVelocity={velocity}
        scrollDirection={direction}
        theme={theme}
        setTheme={setTheme}
        scrollProgress={progress}
        isMobile={isMobile}
      />

      <div id="home" data-section-id="home" ref={reg("home")}>
        <Hero isActive={activeSection === "home"} scrollVelocity={velocity} isMobile={isMobile} />
      </div>

      <div id="about" data-section-id="about" ref={reg("about")}>
        <AboutUs
          isActive={activeSection === "about"}
          scrollVelocity={velocity}
          isMobile={isMobile}
        />
      </div>

      <div data-section-id="vision1" ref={reg("vision1")}>
        <Vision
          isActive={activeSection === "vision1"}
          isMobile={isMobile}
          text={[
            "DEEP",
            { word: "HUMAN", color: "var(--color-one)" },
            { word: "EXPERTISE", color: "var(--color-one)" },
            "MAKES",
            { word: "SMART", color: "var(--color-one)" },
            { word: "CONNECTIONS", color: "var(--color-one)" }
          ]}
        />
      </div>

      <div id="services" data-section-id="services" ref={reg("services")}>
        <Services
          isActive={activeSection === "services"}
          scrollVelocity={velocity}
          isMobile={isMobile}
        />
      </div>

      <div data-section-id="vision2" ref={reg("vision2")}>
        <Vision
          isActive={activeSection === "vision2"}
          isMobile={isMobile}
          text={[
            "MEETINGS",
            "ARE",
            "DESIGNED",
            "TO",
            "CREATE",
            { word: "GROWTH",  color: "var(--color-one)" },
            { word: "PARTNERSHIPS",  color: "var(--color-one)" },
            "AND",
            "LONG-TERM",
            { word: "IMPACT.",  color: "var(--color-one)" }
          ]}
        />
      </div>

      <div id="packages" data-section-id="packages" ref={reg("packages")}>
        <Packages isActive={activeSection === "packages"} isMobile={isMobile} />
      </div>

      <div data-section-id="stats" ref={reg("stats")}>
        <StatsTransition isActive={activeSection === "stats"} isMobile={isMobile} />
      </div>

      <div id="events" data-section-id="events" ref={reg("events")}>
        <Events isActive={activeSection === "events"} isMobile={isMobile} />
      </div>

      <div id="engage" />
      <div id="insights" />

      <Footer isMobile={isMobile} />
    </>
  );
}