import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import gsap from "gsap";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  useEffect(() => {
    const links = document.querySelectorAll(".header ul a");
    links.forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", (e) => {
        if (window.innerWidth > 1024) {
          // Check if it's a hash link before preventing default
          const target = (e.currentTarget as HTMLAnchorElement).getAttribute("data-href");
          if (target && target.startsWith("#")) {
            e.preventDefault();
            const section = document.querySelector(target);
            section?.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });
  }, []);
  return (
    <>
      <div className="header">
        <Link to="/visualizations" className="logo-container" data-cursor="disable">
          <div className="logo-bubble"></div>
          <span className="navbar-title">Hashymhh</span>
        </Link>
        <a
          href="mailto:hashymhh15@gmail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          hashymhh15@gmail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="/#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="/#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="/#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
