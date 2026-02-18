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

export default function ScrollController() {
  const [activeSection, setActiveSection] = useState("home");
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

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

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

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
        rootMargin: "-25% 0% -25% 0%",
        threshold: [0.1, 0.25, 0.5, 0.75]
      }
    );

    Object.values(sentinelRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const reg = (id) => (el) => {
    if (el) sentinelRefs.current[id] = el;
  };

  return (
    <>
      <Header
        activeSection={activeSection}
        scrollVelocity={velocity}
        scrollDirection={direction}
        theme={theme}
        setTheme={setTheme}
        scrollProgress={progress}
      />

      <div id="home" data-section-id="home" ref={reg("home")}>
        <Hero isActive={activeSection === "home"} scrollVelocity={velocity} />
      </div>

      <div id="about" data-section-id="about" ref={reg("about")}>
        <AboutUs
          isActive={activeSection === "about"}
          scrollVelocity={velocity}
        />
      </div>

      <div data-section-id="vision1" ref={reg("vision1")}>
        <Vision
          isActive={activeSection === "vision1"}
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
        />
      </div>

      <div data-section-id="vision2" ref={reg("vision2")}>
        <Vision
          isActive={activeSection === "vision2"}
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
        <Packages isActive={activeSection === "packages"} />
      </div>

      <div data-section-id="stats" ref={reg("stats")}>
        <StatsTransition isActive={activeSection === "stats"} />
      </div>

      <div id="events" data-section-id="events" ref={reg("events")}>
        <Events isActive={activeSection === "events"} />
      </div>

      <div id="engage" />
      <div id="insights" />

      <Footer />
    </>
  );
}
