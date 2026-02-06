import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Foundation & Growth</h4>
                <h5>Sports, Leadership & Tech Basics</h5>
              </div>
              <h3>2023</h3>
            </div>
            <p>
              Focused on strengthening my technical foundation while actively
              participating in sports, leadership activities, and community
              camps, building discipline and teamwork.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Practical Engineering</h4>
                <h5>Application Development</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Transitioned deeper into practical technology development, moving
              from learning concepts to building full applications and structured
              systems.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Cybersecurity & Systems</h4>
                <h5>Advanced Development</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Shifted strongly toward cybersecurity engineering and advanced
              system development, working on intrusion detection, security
              architectures, and full-stack apps.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Advanced Security</h4>
                <h5>AI & Production Systems</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Centered on advanced cybersecurity systems, AI-integrated security
              solutions, and building production-level projects with
              security-first thinking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
