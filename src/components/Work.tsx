import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  const projects = [
    {
      title: "Supply Chain Attack Detection System",
      category: "Cybersecurity",
      tools: "Python, CI/CD, Security Research",
      description:
        "A cybersecurity-focused system designed to detect and analyze threats within modern software supply chains. The project focuses on identifying malicious dependencies, abnormal package behavior, and potential compromise within build or deployment pipelines.",
    },
    {
      title: "FedNIDS",
      category: "Network Security",
      tools: "Federated Learning, Python, AI",
      description:
        "A distributed intrusion detection system built using federated learning principles to enable collaborative threat detection without sharing raw sensitive data. Focuses on privacy-preserving model training and non-IID data handling.",
    },
    {
      title: "STEM 3D Science",
      category: "Educational Desktop App",
      tools: "Electron, Manim, 3D Viz",
      description:
        "An interactive educational desktop application designed to simplify complex STEM concepts using dynamic animations and structured learning modules. Integrates Manim-generated visualizations with a desktop GUI.",
    },
    {
      title: "CMS Portal",
      category: "Full Stack Web App",
      tools: "React, Node.js, SQL",
      description:
        "A full-stack web application demonstrating backend architecture design, secure authentication, structured database management, and API-driven content handling. Designed with scalability and modularity in mind.",
    },
    {
      title: "Bus Management System",
      category: "Management System",
      tools: "Structured Data, Access Control",
      description:
        "A management platform designed to streamline transportation operations, including route handling and scheduling. Focuses on structured data flow, user access management, and operational efficiency.",
    },
    {
      title: "Inventory Management System",
      category: "Management System",
      tools: "Database Design, CRUD",
      description:
        "A system built to manage product tracking, stock monitoring, and operational data handling. The project demonstrates database structuring and real-time data management concepts.",
    },
    {
      title: "Research Papers",
      category: "Technical Research",
      tools: "Security Architecture, Logic",
      description:
        "Research work focusing on the intersection of cybersecurity, system design, and applied computing. Includes digital logic applications, security architectures, and advanced system-level problem solving.",
    },
    {
      title: "Other Technical Work",
      category: "R&D Experiments",
      tools: "AI, Secure Systems",
      description:
        "Experimentation with AI-assisted applications, secure desktop systems, and intelligent automation concepts, focusing on building complete working systems rather than isolated prototypes.",
    },
  ];

  useGSAP(() => {
    let translateX: number = 0;

    function setTranslateX() {
      const box = document.getElementsByClassName("work-box");
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      let padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      translateX =
        rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    setTranslateX();

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: `+=${translateX}`, // Use actual scroll width
        scrub: true,
        pin: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: -translateX,
      ease: "none",
    });

    // Clean up (optional, good practice)
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <div style={{ marginTop: "1rem", fontSize: "0.9em", opacity: 0.8 }}>
                  <p>{project.description}</p>
                </div>
              </div>
              <WorkImage image="/images/placeholder.webp" alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
