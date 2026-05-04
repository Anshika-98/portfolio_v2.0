import { useState, useEffect, useRef } from "react";

const data = {
  name: "Anshika Jain",
  title: "Data Engineer & ML Specialist",
  email: "anshika174@gmail.com",
  phone: "934-899-1088",
  linkedin: "linkedin.com/in/anshikajain04/",
  about:
    "I build the invisible infrastructure that makes data useful — ETL pipelines, ML systems, and AI-powered tools that scale. From migrating 2TB databases to deploying GPT-4 with RAG, I turn messy data into decisions.",
  education: [
    {
      school: "New York University",
      location: "New York City, NY",
      degree: "M.S. Computer Engineering",
      date: "May 2023",
      courses: ["Machine Learning", "Deep Learning", "Data Science for Business"],
    },
    {
      school: "DayalBagh Educational Institute",
      location: "Agra, IN",
      degree: "B.Tech Computer Science and Mechanical Engineering",
      date: "Aug 2021",
    },
  ],
  experience: [
    {
      company: "Huntington Learning Center",
      location: "Naperville, IL",
      roles: [
        {
          title: "Backend Data Engineer",
          type: "Part Time",
          period: "Nov 2025 – Present",
          bullets: [
            "Migrated 2TB legacy student database to AWS RDS PostgreSQL via custom ETL pipelines, improving data retrieval by 30%.",
            "Built FastAPIs for real-time student performance analytics across multiple centers.",
          ],
        },
        {
          title: "Data Science Mentor",
          type: "Part Time",
          period: "Jul 2024 – Oct 2025",
          bullets: ["Guided students in building ML models, improving model accuracy by 15% on average."],
        },
      ],
    },
    {
      company: "Simplify Reality Inc",
      location: "Los Angeles, CA",
      roles: [
        {
          title: "Data Engineer",
          period: "Jun 2023 – Aug 2024",
          bullets: [
            "Built ETL pipelines for nested JSONs and time-series data with Snowflake, Airflow, and Spark, reducing transformation time by 15%.",
            "Deployed OpenAI GPT-4 with RAG using vector databases and prompt engineering, reducing manual review by 40%.",
            "Developed a GPT-4-powered chatbot using Flask for real-time data query assistance, boosting team productivity by 30%.",
            "Optimized AWS Glue pipelines, improving system performance by 10%.",
          ],
        },
      ],
    },
    {
      company: "Choreograph, WPP",
      location: "New York City, NY",
      roles: [
        {
          title: "Data Engineering Intern",
          period: "May 2022 – Aug 2022",
          bullets: [
            "Developed scalable ETL pipelines with Apache Beam and Airflow, reducing data landing times by 20%.",
            "Implemented CI/CD pipelines using Docker, Kubernetes, and Google Cloud Build, improving scalability by 35%.",
            "Designed Python-based solutions for large-scale ad performance metrics, enhancing system performance by 30%.",
          ],
        },
      ],
    },
    {
      company: "At Once Health",
      location: "Remote",
      roles: [
        {
          title: "Data Engineer",
          period: "May 2020 – Jul 2021",
          bullets: [
            "Led data architecture design using Python, Azure, PostgreSQL and MongoDB for EHR systems.",
            "Built an AI-powered medication recommendation system using LSTM and NER with 84% accuracy.",
            "Optimized MongoDB and PostgreSQL queries, improving data retrieval speeds by 25%.",
          ],
        },
      ],
    },
    {
      company: "DETE",
      location: "Agra, IN",
      roles: [
        {
          title: "Co-Founder",
          period: "Jan 2020 – Aug 2020",
          bullets: [
            "Attracted 200+ new clients through improved product performance and targeted digital campaigns.",
            "Led a cross-functional team of 8 designers and 2 developers, securing 30% additional investment.",
          ],
        },
      ],
    },
  ],
  skills: {
    "Languages & Tools": ["Python", "SQL", "Java", "JavaScript", "Linux", "Docker", "Kubernetes", "AWS", "GCP", "Jenkins", "Excel"],
    "Data Platforms": ["Airflow", "Snowflake", "Databricks", "Hadoop", "BigQuery", "Apache Beam", "MongoDB", "PostgreSQL", "Dremio", "Pandas", "Scikit-learn", "NumPy"],
    "Soft Skills": ["Problem Solving", "Collaboration", "Project Management", "Agile", "Tableau", "Power BI", "Data Storytelling"],
  },
  projects: [
    {
      name: "FinGPT",
      stack: ["React.js", "MongoDB", "Python Flask", "GPT-3.5"],
      description:
        "Full-stack educational finance app with AI-driven investment analysis; integrated MongoDB and Flask for real-time personalized recommendations.",
    },
    {
      name: "AwesomeInc",
      stack: ["AWS S3", "Git", "MySQL", "Oracle Data Modeler"],
      description:
        "Designed OLTP and data warehouse databases; optimized ETL/CDC with AWS and Spark, improving query performance by 10% with anomaly detection.",
    },
  ],
};

const NAV_ITEMS = ["About", "Experience", "Skills", "Projects", "Education", "Contact"];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Section({ id, children, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`section ${inView ? "visible" : ""} ${className}`}
    >
      {children}
    </section>
  );
}

function SectionTitle({ label, title }) {
  return (
    <div className="section-title">
      <span className="label">{label}</span>
      <h2>{title}</h2>
      <div className="title-line" />
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_ITEMS.map((n) => document.getElementById(n.toLowerCase()));
      const current = sections.findLast((s) => s && s.getBoundingClientRect().top < 160);
      if (current) setActiveNav(current.id.charAt(0).toUpperCase() + current.id.slice(1));
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={scrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <div className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            AJ<span className="dot">.</span>
          </div>
          <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <button
                  className={activeNav === item ? "active" : ""}
                  onClick={() => scrollTo(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="hero-bg">
          {[...Array(18)].map((_, i) => (
            <div key={i} className="hero-dot" style={{ "--i": i }} />
          ))}
          <div className="hero-grid" />
        </div>
        <div className="hero-content">
          <p className="hero-greeting">Hello, I'm</p>
          <h1 className="hero-name">
            {data.name.split("").map((c, i) => (
              <span key={i} style={{ "--d": `${i * 0.04}s` }}>{c === " " ? "\u00A0" : c}</span>
            ))}
          </h1>
          <p className="hero-title">{data.title}</p>
          <p className="hero-tagline">{data.about}</p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={() => scrollTo("Experience")}>View My Work</button>
            <button className="btn-outline" onClick={() => scrollTo("Contact")}>Get In Touch</button>
          </div>
        </div>
        <div className="hero-scroll">
          <span>scroll</span>
          <div className="scroll-line" />
        </div>
      </header>

      <main>
        {/* ABOUT */}
        <Section id="about">
          <SectionTitle label="01 / About" title="Who I Am" />
          <div className="about-grid">
            <div className="about-avatar">
              <div className="avatar-ring">
                <div className="avatar-initials">AJ</div>
              </div>
            </div>
            <div className="about-text">
              <p>{data.about}</p>
              <p>
                Currently at <strong>Huntington Learning Center</strong> in Naperville, IL as a Backend Data Engineer, I specialize in designing data systems that are robust, fast, and intelligent — combining traditional data engineering with modern AI capabilities.
              </p>
              <div className="about-stats">
                {[
                  { n: "5+", l: "Years Experience" },
                  { n: "10+", l: "Technologies" },
                  { n: "30%", l: "Avg. Performance Gain" },
                  { n: "2TB", l: "Data Migrated" },
                ].map((s) => (
                  <div className="stat" key={s.l}>
                    <span className="stat-n">{s.n}</span>
                    <span className="stat-l">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" className="dark-section">
          <SectionTitle label="02 / Experience" title="Where I've Worked" />
          <div className="timeline">
            {data.experience.map((exp, ei) => (
              <div className="timeline-company" key={ei}>
                <div className="company-header">
                  <h3>{exp.company}</h3>
                  <span className="company-loc">{exp.location}</span>
                </div>
                {exp.roles.map((role, ri) => (
                  <div className="role" key={ri}>
                    <div className="role-meta">
                      <span className="role-title">{role.title}</span>
                      {role.type && <span className="role-type">{role.type}</span>}
                      <span className="role-period">{role.period}</span>
                    </div>
                    <ul className="role-bullets">
                      {role.bullets.map((b, bi) => (
                        <li key={bi}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills">
          <SectionTitle label="03 / Skills" title="What I Know" />
          <div className="skills-grid">
            {Object.entries(data.skills).map(([cat, items]) => (
              <div className="skill-group" key={cat}>
                <h4>{cat}</h4>
                <div className="skill-tags">
                  {items.map((s) => (
                    <span className="skill-tag" key={s}>{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" className="dark-section">
          <SectionTitle label="04 / Projects" title="What I've Built" />
          <div className="projects-grid">
            {data.projects.map((p, i) => (
              <div className="project-card" key={i}>
                <div className="project-num">0{i + 1}</div>
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="project-stack">
                  {p.stack.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education">
          <SectionTitle label="05 / Education" title="Where I Studied" />
          <div className="edu-grid">
            {data.education.map((e, i) => (
              <div className="edu-card" key={i}>
                <div className="edu-date">{e.date}</div>
                <h3>{e.school}</h3>
                <p className="edu-location">{e.location}</p>
                <p className="edu-degree">{e.degree}</p>
                {e.courses && (
                  <div className="edu-courses">
                    {e.courses.map((c) => <span key={c}>{c}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" className="dark-section">
          <SectionTitle label="06 / Contact" title="Let's Connect" />
          <div className="contact-inner">
            <p className="contact-intro">
              Open to exciting data engineering and ML opportunities. Let's build something meaningful together.
            </p>
            <div className="contact-links">
              <a href={`mailto:${data.email}`} className="contact-link">
                <span className="contact-icon">✉</span>
                <span>{data.email}</span>
              </a>
              <a href={`https://${data.linkedin}`} target="_blank" rel="noreferrer" className="contact-link">
                <span className="contact-icon">in</span>
                <span>{data.linkedin}</span>
              </a>
              <a href={`tel:${data.phone}`} className="contact-link">
                <span className="contact-icon">✆</span>
                <span>{data.phone}</span>
              </a>
            </div>
          </div>
        </Section>
      </main>

      <footer>
        <p>© 2025 Anshika Jain — Designed & Built with React</p>
      </footer>
    </>
  );
}

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --ink: #0e0e10;
    --paper: #f5f3ee;
    --cream: #ede9e0;
    --dark: #12111a;
    --dark2: #1c1b27;
    --accent: #e8572a;
    --accent2: #f0a500;
    --text: #2a2833;
    --muted: #7a7688;
    --border: rgba(0,0,0,0.1);
    --border-dark: rgba(255,255,255,0.08);
    --font-display: 'Playfair Display', serif;
    --font-mono: 'DM Mono', monospace;
    --font-body: 'DM Sans', sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--font-body);
    background: var(--paper);
    color: var(--text);
    overflow-x: hidden;
  }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 1.5rem 3rem;
    transition: all 0.3s ease;
  }
  nav.scrolled {
    background: rgba(14,14,16,0.92);
    backdrop-filter: blur(16px);
    padding: 1rem 3rem;
    border-bottom: 1px solid var(--border-dark);
  }
  .nav-inner { display: flex; align-items: center; justify-content: space-between; max-width: 1200px; margin: 0 auto; }
  .nav-logo {
    font-family: var(--font-display);
    font-size: 1.6rem;
    color: var(--paper);
    cursor: pointer;
    letter-spacing: -1px;
  }
  .nav-logo .dot { color: var(--accent); }
  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links button {
    background: none; border: none; cursor: pointer;
    font-family: var(--font-mono); font-size: 0.78rem;
    letter-spacing: 0.08em; text-transform: uppercase;
    color: rgba(245,243,238,0.55);
    transition: color 0.2s;
    padding: 0.2rem 0;
    position: relative;
  }
  .nav-links button::after {
    content: ''; position: absolute; bottom: -2px; left: 0; right: 100%;
    height: 1px; background: var(--accent);
    transition: right 0.25s ease;
  }
  .nav-links button:hover, .nav-links button.active { color: var(--paper); }
  .nav-links button.active::after, .nav-links button:hover::after { right: 0; }
  .hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; cursor: pointer; }
  .hamburger span { display: block; width: 24px; height: 1.5px; background: var(--paper); transition: all 0.3s; }

  /* HERO */
  .hero {
    min-height: 100vh;
    background: var(--dark);
    display: flex; align-items: center;
    position: relative; overflow: hidden;
  }
  .hero-bg { position: absolute; inset: 0; pointer-events: none; }
  .hero-grid {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(rgba(232,87,42,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(232,87,42,0.04) 1px, transparent 1px);
    background-size: 60px 60px;
  }
  .hero-dot {
    position: absolute;
    width: 3px; height: 3px;
    border-radius: 50%;
    background: var(--accent);
    opacity: 0;
    animation: floatDot 8s ease-in-out infinite;
    animation-delay: calc(var(--i) * 0.4s);
    left: calc(5% + var(--i) * 5.5%);
    top: calc(20% + (var(--i) % 5) * 15%);
  }
  @keyframes floatDot {
    0%,100% { opacity: 0; transform: translateY(0); }
    30%,70% { opacity: 0.7; transform: translateY(-20px); }
  }
  .hero-content {
    position: relative; z-index: 2;
    max-width: 1200px; margin: 0 auto;
    padding: 0 3rem; padding-top: 6rem;
  }
  .hero-greeting {
    font-family: var(--font-mono); font-size: 0.85rem;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1rem;
    opacity: 0; animation: fadeUp 0.6s ease forwards 0.3s;
  }
  .hero-name {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 9vw, 8rem);
    line-height: 0.95;
    color: var(--paper);
    letter-spacing: -2px;
    margin-bottom: 1.2rem;
  }
  .hero-name span {
    display: inline-block;
    opacity: 0;
    transform: translateY(40px);
    animation: letterIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
    animation-delay: calc(0.5s + var(--d));
  }
  @keyframes letterIn {
    to { opacity: 1; transform: translateY(0); }
  }
  .hero-title {
    font-family: var(--font-mono); font-size: 1rem;
    color: var(--accent2); letter-spacing: 0.05em;
    margin-bottom: 1.5rem;
    opacity: 0; animation: fadeUp 0.6s ease forwards 1.3s;
  }
  .hero-tagline {
    max-width: 560px;
    font-size: 1.1rem; line-height: 1.7;
    color: rgba(245,243,238,0.6);
    margin-bottom: 2.5rem;
    opacity: 0; animation: fadeUp 0.6s ease forwards 1.5s;
  }
  .hero-cta {
    display: flex; gap: 1rem; flex-wrap: wrap;
    opacity: 0; animation: fadeUp 0.6s ease forwards 1.7s;
  }
  .btn-primary, .btn-outline {
    padding: 0.8rem 2rem;
    font-family: var(--font-mono); font-size: 0.8rem;
    letter-spacing: 0.1em; text-transform: uppercase;
    cursor: pointer; border: none;
    transition: all 0.25s;
  }
  .btn-primary { background: var(--accent); color: white; }
  .btn-primary:hover { background: #d44420; transform: translateY(-2px); }
  .btn-outline { background: transparent; color: var(--paper); border: 1px solid rgba(245,243,238,0.3); }
  .btn-outline:hover { border-color: var(--paper); transform: translateY(-2px); }
  .hero-scroll {
    position: absolute; bottom: 2.5rem; left: 50%; transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    color: rgba(245,243,238,0.3); font-family: var(--font-mono); font-size: 0.65rem;
    letter-spacing: 0.15em; text-transform: uppercase;
    opacity: 0; animation: fadeUp 0.6s ease forwards 2.2s;
  }
  .scroll-line {
    width: 1px; height: 50px;
    background: linear-gradient(var(--accent), transparent);
    animation: scrollPulse 2s ease-in-out infinite;
  }
  @keyframes scrollPulse { 0%,100%{opacity:0.3} 50%{opacity:1} }

  /* SECTIONS */
  main { }
  .section {
    max-width: 1200px; margin: 0 auto;
    padding: 7rem 3rem;
    opacity: 0; transform: translateY(40px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .section.visible { opacity: 1; transform: translateY(0); }
  .dark-section { max-width: 100%; background: var(--dark); padding: 0; }
  .dark-section > * { max-width: 1200px; margin: 0 auto; padding: 7rem 3rem; }
  .dark-section .section-title { color: var(--paper); }
  .dark-section .section-title .label { color: var(--accent); }
  .dark-section .title-line { background: var(--accent); }

  .section-title { margin-bottom: 4rem; }
  .section-title .label {
    font-family: var(--font-mono); font-size: 0.75rem;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: var(--accent); display: block; margin-bottom: 0.5rem;
  }
  .section-title h2 {
    font-family: var(--font-display); font-size: clamp(2.2rem, 5vw, 3.5rem);
    line-height: 1.1; letter-spacing: -1px; margin-bottom: 1rem;
  }
  .title-line { width: 40px; height: 3px; background: var(--ink); }

  /* ABOUT */
  .about-grid { display: grid; grid-template-columns: auto 1fr; gap: 4rem; align-items: start; }
  .about-avatar { display: flex; justify-content: center; }
  .avatar-ring {
    width: 160px; height: 160px; border-radius: 50%;
    border: 2px solid var(--accent);
    display: flex; align-items: center; justify-content: center;
    position: relative;
  }
  .avatar-ring::before {
    content: ''; position: absolute; inset: 8px; border-radius: 50%;
    border: 1px dashed rgba(232,87,42,0.3);
    animation: spin 12s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }
  .avatar-initials {
    font-family: var(--font-display); font-size: 2.8rem;
    color: var(--accent); letter-spacing: -1px;
  }
  .about-text p { font-size: 1.05rem; line-height: 1.75; color: var(--text); margin-bottom: 1.2rem; }
  .about-text strong { color: var(--accent); font-weight: 600; }
  .about-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; margin-top: 2.5rem; }
  .stat { text-align: center; padding: 1.2rem; background: var(--cream); }
  .stat-n { display: block; font-family: var(--font-display); font-size: 2rem; color: var(--accent); }
  .stat-l { font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }

  /* EXPERIENCE */
  .timeline { position: relative; }
  .timeline-company {
    border-left: 1px solid var(--border-dark);
    padding-left: 2rem; margin-bottom: 3rem;
    position: relative;
  }
  .timeline-company::before {
    content: ''; position: absolute; left: -4px; top: 6px;
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--accent);
  }
  .company-header { display: flex; align-items: baseline; gap: 1rem; margin-bottom: 1.2rem; }
  .company-header h3 { font-family: var(--font-display); font-size: 1.5rem; color: var(--paper); }
  .company-loc { font-family: var(--font-mono); font-size: 0.7rem; color: var(--muted); letter-spacing: 0.05em; }
  .role { margin-bottom: 1.5rem; }
  .role-meta { display: flex; align-items: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 0.7rem; }
  .role-title { font-weight: 600; color: var(--paper); font-size: 0.95rem; }
  .role-type {
    font-family: var(--font-mono); font-size: 0.65rem;
    background: rgba(232,87,42,0.15); color: var(--accent);
    padding: 0.2rem 0.6rem; border-radius: 2px; letter-spacing: 0.05em;
  }
  .role-period { font-family: var(--font-mono); font-size: 0.7rem; color: var(--muted); margin-left: auto; }
  .role-bullets { list-style: none; }
  .role-bullets li {
    font-size: 0.9rem; color: rgba(245,243,238,0.6); line-height: 1.65;
    padding: 0.35rem 0; padding-left: 1rem; position: relative;
  }
  .role-bullets li::before { content: '→'; position: absolute; left: 0; color: var(--accent); font-size: 0.75rem; top: 0.45rem; }

  /* SKILLS */
  .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem; }
  .skill-group { background: var(--cream); padding: 2rem; }
  .skill-group h4 { font-family: var(--font-mono); font-size: 0.75rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 1.2rem; }
  .skill-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .skill-tag {
    font-family: var(--font-mono); font-size: 0.75rem;
    padding: 0.35rem 0.75rem;
    border: 1px solid rgba(0,0,0,0.12); color: var(--text);
    transition: all 0.2s;
    cursor: default;
  }
  .skill-tag:hover { background: var(--accent); color: white; border-color: var(--accent); }

  /* PROJECTS */
  .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
  .project-card {
    background: var(--dark2); padding: 2.5rem;
    border: 1px solid var(--border-dark);
    position: relative; transition: transform 0.25s, border-color 0.25s;
  }
  .project-card:hover { transform: translateY(-4px); border-color: var(--accent); }
  .project-num {
    font-family: var(--font-display); font-size: 4rem;
    color: rgba(232,87,42,0.12); position: absolute; top: 1rem; right: 1.5rem;
    line-height: 1; pointer-events: none;
  }
  .project-card h3 { font-family: var(--font-display); font-size: 1.6rem; color: var(--paper); margin-bottom: 1rem; }
  .project-card p { font-size: 0.9rem; line-height: 1.65; color: rgba(245,243,238,0.55); margin-bottom: 1.5rem; }
  .project-stack { display: flex; flex-wrap: wrap; gap: 0.4rem; }
  .project-stack span {
    font-family: var(--font-mono); font-size: 0.68rem;
    padding: 0.25rem 0.6rem; letter-spacing: 0.05em;
    background: rgba(232,87,42,0.1); color: var(--accent);
    border: 1px solid rgba(232,87,42,0.2);
  }

  /* EDUCATION */
  .edu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
  .edu-card {
    padding: 2.5rem; border: 1px solid var(--border);
    position: relative; overflow: hidden;
  }
  .edu-card::after {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: var(--accent);
  }
  .edu-date { font-family: var(--font-mono); font-size: 0.7rem; color: var(--muted); letter-spacing: 0.1em; margin-bottom: 0.8rem; }
  .edu-card h3 { font-family: var(--font-display); font-size: 1.4rem; margin-bottom: 0.3rem; }
  .edu-location { font-family: var(--font-mono); font-size: 0.72rem; color: var(--muted); margin-bottom: 0.5rem; }
  .edu-degree { font-size: 0.9rem; color: var(--text); font-weight: 500; margin-bottom: 1rem; }
  .edu-courses { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .edu-courses span {
    font-family: var(--font-mono); font-size: 0.7rem;
    padding: 0.25rem 0.6rem;
    background: var(--cream); color: var(--muted);
  }

  /* CONTACT */
  .contact-inner { max-width: 680px; }
  .contact-intro { font-size: 1.15rem; line-height: 1.7; color: rgba(245,243,238,0.65); margin-bottom: 3rem; }
  .contact-links { display: flex; flex-direction: column; gap: 1rem; }
  .contact-link {
    display: flex; align-items: center; gap: 1.2rem;
    padding: 1.2rem 1.5rem;
    border: 1px solid var(--border-dark);
    color: var(--paper); text-decoration: none;
    font-size: 0.95rem;
    transition: all 0.25s;
  }
  .contact-link:hover { border-color: var(--accent); background: rgba(232,87,42,0.05); }
  .contact-icon {
    width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
    border: 1px solid var(--accent); color: var(--accent);
    font-family: var(--font-mono); font-size: 0.8rem; flex-shrink: 0;
  }

  /* FOOTER */
  footer {
    background: var(--ink); padding: 2rem 3rem; text-align: center;
    font-family: var(--font-mono); font-size: 0.72rem;
    color: rgba(245,243,238,0.25); letter-spacing: 0.08em;
  }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

  /* RESPONSIVE */
  @media (max-width: 768px) {
    nav { padding: 1.2rem 1.5rem; }
    nav.scrolled { padding: 0.8rem 1.5rem; }
    .nav-links {
      display: none; position: fixed; inset: 0; background: var(--dark);
      flex-direction: column; align-items: center; justify-content: center;
      gap: 2.5rem;
    }
    .nav-links.open { display: flex; }
    .nav-links button { font-size: 1rem; }
    .hamburger { display: flex; }
    .hero-content { padding: 0 1.5rem; padding-top: 7rem; }
    .section { padding: 5rem 1.5rem; }
    .dark-section > * { padding: 5rem 1.5rem; }
    .about-grid { grid-template-columns: 1fr; gap: 2rem; }
    .about-stats { grid-template-columns: repeat(2, 1fr); }
    .role-period { margin-left: 0; }
  }
`;
