import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Menu, X } from "lucide-react";
import ParticleField from "./components/ParticleField";

const NAV = [
  ["about", "About"],
  ["experience", "Experience"],
  ["skills", "Skills"],
  ["projects", "Projects"],
  ["contact", "Contact"],
];

const skills = [
  "HR Operations", "Talent Acquisition", "Recruitment", "Payroll",
  "Employee Relations", "HTML", "CSS", "JavaScript", "React",
  "Tailwind CSS", "Git", "GitHub", "Python"
];

function Reveal({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Section({ id, eyebrow, title, children, reverse = false }) {
  return (
    <section id={id} className={`section ${reverse ? "section--reverse" : ""}`}>
      <div className="section__grid">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="display display--section">{title}</h2>
        </Reveal>
        <Reveal className="section__content">
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("about");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.05, 0.2, 0.5] }
    );
    NAV.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = id => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <header className="nav">
        <button className="brand" onClick={() => go("top")} aria-label="Go to top">
          <span className="brand__mark">H</span>
          <span>HODA</span>
        </button>

        <nav className={`nav__links ${menuOpen ? "nav__links--open" : ""}`}>
          {NAV.map(([id, label]) => (
            <button
              key={id}
              className={active === id ? "nav__link nav__link--active" : "nav__link"}
              onClick={() => go(id)}
            >
              {label}
            </button>
          ))}
          <a className="pill pill--nav" href="mailto:hishamhoda870@gmail.com">Let's talk</a>
        </nav>

        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>

      <main>
        <section id="top" className="hero">
          <ParticleField />
          <div className="hero__copy">
            <Reveal>
              <p className="eyebrow">HR × TECHNOLOGY</p>
              <h1 className="display display--hero">
                Where people,<br />
                <span>processes</span> & technology meet.
              </h1>
              <p className="hero__body">
                I'm Hoda Hisham — an HR professional working across operations,
                recruitment and payroll, while building modern digital experiences
                with front-end technology.
              </p>
              <div className="hero__actions">
                <a className="pill" href="#projects">View my work <ArrowUpRight size={17} /></a>
                <a className="ghost-link" href="#about">Get to know me <span>↓</span></a>
              </div>
            </Reveal>
          </div>
          <div className="hero__portrait-wrap">
            <motion.div
              className="hero__portrait"
              initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <img src="/profile.webp" alt="Hoda Hisham" />
            </motion.div>
            <span className="hero__orbit hero__orbit--one" />
            <span className="hero__orbit hero__orbit--two" />
          </div>
          <div className="hero__meta">
            <span>Cairo, Egypt</span>
            <span>Available for opportunities</span>
          </div>
        </section>

        <Section id="about" eyebrow="01 / ABOUT" title={<>People first.<br />Systems second.</>}>
          <p className="lead">
            I work at the intersection of people, processes and technology.
            My HR work covers daily operations, attendance, leave, payroll,
            recruitment and employee coordination.
          </p>
          <p>
            At the same time, I develop my technical path through front-end
            development and HR-focused software. That combination lets me
            understand a workplace from both the people side and the systems side.
          </p>
          <div className="mini-facts">
            <span>HR Operations</span>
            <span>Recruitment</span>
            <span>Payroll</span>
            <span>Front-End</span>
          </div>
        </Section>

        <Section id="experience" eyebrow="02 / EXPERIENCE" title={<>Work that<br />moves things.</>} reverse>
          <div className="experience-list">
            <div className="experience-row">
              <span className="experience-year">2026 — NOW</span>
              <div>
                <h3>HR Operations & Talent Acquisition</h3>
                <p>Operations · Attendance · Leave · Payroll · Recruitment · Interviews</p>
              </div>
            </div>
            <div className="experience-row">
              <span className="experience-year">2023 — 2026</span>
              <div>
                <h3>HR Operations & Recruitment</h3>
                <p>Employee relations · Hiring · Team coordination · Reporting</p>
              </div>
            </div>
            <div className="experience-row">
              <span className="experience-year">TECH</span>
              <div>
                <h3>Front-End Development</h3>
                <p>HTML · CSS · JavaScript · React · Tailwind · Git / GitHub</p>
              </div>
            </div>
          </div>
        </Section>

        <Section id="skills" eyebrow="03 / SKILLS" title={<>Two worlds.<br />One toolkit.</>}>
          <div className="skills-cloud">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                className={`skill skill--${i % 4}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.035, duration: 0.45 }}
                whileHover={{ y: -7, scale: 1.04 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </Section>

        <Section id="projects" eyebrow="04 / PROJECTS" title={<>Building tools<br />for real work.</>} reverse>
          <div className="projects">
            <motion.a
              className="project"
              href="https://hodahosham.github.io/HR-SYSTEM/"
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 8 }}
            >
              <div>
                <span className="project__number">01</span>
                <h3>HR System</h3>
                <p>Employee workflows, HR operations and a practical digital interface.</p>
              </div>
              <ArrowUpRight className="project__arrow" />
            </motion.a>

            <motion.div className="project" whileHover={{ x: 8 }}>
              <div>
                <span className="project__number">02</span>
                <h3>Payroll HR System</h3>
                <p>Payroll, attendance, employee records and salary-slip workflows.</p>
              </div>
              <ArrowUpRight className="project__arrow" />
            </motion.div>
          </div>
        </Section>

        <section id="contact" className="contact">
          <div className="contact__glow" />
          <Reveal>
            <p className="eyebrow">05 / CONTACT</p>
            <h2 className="display display--contact">
              Let's build something<br /><span>meaningful.</span>
            </h2>
            <a className="pill pill--large" href="mailto:hishamhoda870@gmail.com">
              Start a conversation <ArrowUpRight size={19} />
            </a>
          </Reveal>
          <div className="contact__links">
            <a href="mailto:hishamhoda870@gmail.com"><Mail size={17} /> Email</a>
            <a href="https://www.linkedin.com/in/hoda-hisham-168634274" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
            <a href="https://github.com/hodahosham" target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
            <a href="tel:+201104792322">+20 11 0479 2322</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>HODA HISHAM © 2026</span>
        <span>HR · TECHNOLOGY · PEOPLE</span>
      </footer>
    </div>
  );
}
