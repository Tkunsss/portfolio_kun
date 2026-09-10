import { useState } from 'react';
import './index.css';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Backend', href: '#backend' },
  { label: 'Projects', href: '#projects' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

const projectCards = [
  {
    title: 'NEMDS',
    tag: 'Flagship system',
    description:
      'National Centralized Emergency Medical Dispatch System built around API-driven emergency workflows, role-based dispatch logic, and relational data models.',
    stack: ['ASP.NET Core', 'React', 'MySQL', 'REST API'],
  },
  {
    title: 'Local Service Finder',
    tag: 'Team project',
    description:
      'A service-discovery app helping users find local providers in Cambodia, with a frontend-first experience and collaborative Git workflow.',
    stack: ['React', 'JavaScript', 'GitHub', 'UI Design'],
  },
  {
    title: 'Movie Booking System',
    tag: 'OOP + DAO',
    description:
      'A Java application designed around object-oriented modeling and database interactions with DAO patterns and structured SQL access.',
    stack: ['Java', 'MySQL', 'Maven', 'OOP'],
  },
];

const stackGroups = [
  {
    title: 'Backend Engineering',
    items: ['Java', 'C# / ASP.NET Core', 'REST APIs', 'Node.js'],
    tone: 'cyan',
  },
  {
    title: 'Database Systems',
    items: ['MySQL', 'SQL Schema', 'PostgreSQL', 'Normalization'],
    tone: 'green',
  },
  {
    title: 'Frontend & UI',
    items: ['React', 'HTML', 'CSS', 'JavaScript'],
    tone: 'blue',
  },
  {
    title: 'Tools & Workflow',
    items: ['Git & GitHub', 'VS Code', 'Maven', 'MySQL Workbench'],
    tone: 'amber',
  },
];

const initialForm = {
  name: '',
  email: '',
  message: '',
};

export default function App() {
  const [formData, setFormData] = useState(initialForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'loading', message: 'Sending your message...' });

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send message.');
      }

      setFormData(initialForm);
      setStatus({ type: 'success', message: 'Your message has been sent successfully.' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="container nav-wrap">
          <a href="#home" className="brand" aria-label="Sotikun home">
            <span className="brand-mark">&gt;_</span>
            <span>
              <strong>sotikun.chhayny()</strong>
              <small>cad:t / yr-2 / backend</small>
            </span>
          </a>

          <nav className="main-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <span className="status-pill">
              <i className="dot" /> Open for Internships
            </span>
            <a href="#contact" className="primary-btn small">
              Connect
            </a>
          </div>
        </div>
      </header>

      <main id="home" className="container main-content">
        <section className="hero section-spacing">
          <div className="hero-copy">
            <div className="eyebrow">BACKEND SOFTWARE ENGINEER</div>
            <h1>
              Building the systems behind the interface.
            </h1>
            <p className="lead">
              I’m <strong>Sotikun Chhayny</strong>, a software engineering student focused on backend
              development, APIs, databases, and real-world software systems.
            </p>

            <div className="note-box">
              Targeting software engineering and backend developer internships. I learn by building
              practical systems that solve real problems.
            </div>

            <div className="hero-actions">
              <a href="#projects" className="primary-btn">
                View Projects
              </a>
              <a href="https://github.com/Tkunsss" target="_blank" rel="noreferrer" className="ghost-btn">
                GitHub
              </a>
            </div>
          </div>

          <div className="terminal-panel" aria-label="Developer profile terminal">
            <div className="terminal-bar">
              <span className="red" />
              <span className="yellow" />
              <span className="green" />
              <span className="terminal-title">engineer@sotikun-node: ~</span>
            </div>
            <div className="terminal-body">
              <div>
                <span className="prompt">sotikun@cadt</span>:~$ whoami
                <p>sotikun chhayny</p>
              </div>
              <div>
                <span className="prompt">sotikun@cadt</span>:~$ cat /etc/role
                <p>backend engineer (in training)</p>
              </div>
              <div>
                <span className="prompt">sotikun@cadt</span>:~$ fetch-focus --active
                <p>APIs + relational databases + distributed workflows</p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section-spacing">
          <div className="section-heading">
            <span>01.</span>
            <h2>About Me</h2>
          </div>

          <div className="about-grid">
            <div className="about-copy">
              <p>
                I am a second-year student pursuing a <strong>Bachelor of Software Engineering</strong>{' '}
                at the <span className="highlight">Cambodia Academy of Digital Technology (CADT)</span>.
                My primary technical interest lies in backend engineering — designing robust data
                layers, request routing, and business logic that power modern applications.
              </p>
              <p>
                I enjoy understanding how software components communicate: controllers with service
                logic, database schemas with relational integrity, and RESTful APIs with structured
                payloads.
              </p>
              <div className="mini-card">
                <span className="mini-label">Engineering Principle</span>
                <strong>Understand the problem. Design the system. Build it. Test it. Improve it.</strong>
              </div>
            </div>

            <aside className="info-panel">
              <h3>Working Style</h3>
              <ul>
                <li>Practical and problem-driven</li>
                <li>Keen on system internals and architecture</li>
                <li>Willing to learn unfamiliar stacks</li>
                <li>Honest about what is built versus planned</li>
              </ul>
            </aside>
          </div>
        </section>

        <section id="backend" className="section-spacing">
          <div className="section-heading">
            <span>02.</span>
            <h2>Backend is where I want to go deeper.</h2>
          </div>

          <div className="architecture-flow">
            {[
              ['Client', 'Browser / Mobile App / Postman'],
              ['REST API', 'Routing, DTO validation, CORS'],
              ['Controller', 'Request orchestration and status handling'],
              ['Service', 'Business logic and validation'],
              ['Database', 'Relational storage and integrity'],
            ].map(([title, text], index) => (
              <div key={title} className="flow-item">
                <small>0{index + 1} // {title}</small>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>

          <div className="feature-grid">
            {[
              ['APIs', 'RESTful design, CRUD flows, and structured payloads'],
              ['Databases', 'Normalization, joins, keys, and relational modeling'],
              ['Architecture', 'Controller, service, and repository separation'],
              ['Workflow', 'Git, debugging, testing, and iterative delivery'],
            ].map(([title, text], index) => (
              <article key={title} className="feature-card">
                <span className="feature-number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section-spacing">
          <div className="section-heading">
            <span>03.</span>
            <h2>Engineering Projects</h2>
          </div>

          <div className="project-list">
            {projectCards.map((project) => (
              <article key={project.title} className="project-card">
                <div className="project-header">
                  <div>
                    <span className="project-tag">{project.tag}</span>
                    <h3>{project.title}</h3>
                  </div>
                </div>
                <p>{project.description}</p>
                <div className="chip-row">
                  {project.stack.map((chip) => (
                    <span key={chip} className="chip">
                      {chip}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="stack" className="section-spacing">
          <div className="section-heading">
            <span>04.</span>
            <h2>Technologies & Tools</h2>
          </div>

          <div className="stack-grid">
            {stackGroups.map((group) => (
              <div key={group.title} className={`stack-card ${group.tone}`}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section-spacing contact-section">
          <div className="section-heading">
            <span>05.</span>
            <h2>Let’s build something useful.</h2>
          </div>

          <div className="contact-grid">
            <div className="contact-copy">
              <p>
                I’m open to software engineering opportunities, internships, collaborative projects,
                and opportunities to learn from experienced developers.
              </p>
              <ul className="contact-list">
                <li>GitHub: github.com/Tkunsss</li>
                <li>LinkedIn: Sotikun Chhayny</li>
                <li>Email: sotikun.chhayny@student.cadt.edu.kh</li>
              </ul>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="input-row">
                <label>
                  Your Name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Recruiter / Team Lead"
                    required
                  />
                </label>
                <label>
                  Email Address
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com"
                    required
                  />
                </label>
              </div>
              <label>
                Message
                <textarea
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share details about the role or project..."
                  required
                />
              </label>

              {status.message ? (
                <p className={`form-status ${status.type}`}>{status.message}</p>
              ) : null}

              <button type="submit" className="primary-btn" disabled={status.type === 'loading'}>
                {status.type === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <span>Sotikun Chhayny</span>
          <span>Backend Software Engineer</span>
          <span>© 2026</span>
        </div>
      </footer>
    </div>
  );
}
