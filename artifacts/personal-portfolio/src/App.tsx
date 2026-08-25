import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ArrowDown, ArrowUpRight, Check, Menu, X } from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <a className="wordmark" href="#top" onClick={closeMenu} data-testid="link-home">
          <span className="mark">A</span>
          <span>Alex Morgan</span>
        </a>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          <a href="#about" onClick={closeMenu} data-testid="link-about">About</a>
          <a href="#approach" onClick={closeMenu} data-testid="link-approach">Approach</a>
          <a href="#contact" onClick={closeMenu} data-testid="link-contact">Contact</a>
        </nav>
        <div className="nav-availability">
          <span className="status-dot" aria-hidden="true" />
          <span>Taking on select work</span>
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          data-testid="button-menu"
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}

function SignalArtwork() {
  return (
    <div className="hero-visual" aria-label="An abstract diagram showing ideas becoming a clear signal" role="img" data-testid="artwork-signal">
      <div className="visual-paper">
        <span className="visual-label">Field notes / 001</span>
        <span className="orbit one" />
        <span className="orbit two" />
        <span className="orbit three" />
        <span className="visual-node node-a" />
        <span className="visual-node node-b" />
        <span className="visual-node node-c" />
        <span className="visual-node node-d" />
        <span className="visual-core">clear<br />signal</span>
        <p className="visual-note"><strong>The work</strong>Find the thread. Then make it impossible to miss.</p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero-grid">
        <div>
          <div className="eyebrow hero-kicker">Independent creative developer</div>
          <h1 id="hero-title" className="serif">Make the<br /><em>complex</em><br />feel clear.</h1>
          <p className="hero-summary">I help thoughtful brands turn big, tangled ideas into digital experiences people understand — and remember.</p>
          <div className="hero-cta-row">
            <a className="button-primary" href="#contact" data-testid="link-start-conversation">
              Start a conversation <ArrowUpRight size={16} />
            </a>
            <a className="button-text" href="#about" data-testid="link-learn-more">A little about me ↓</a>
          </div>
        </div>
        <SignalArtwork />
      </div>
      <div className="scroll-cue" aria-hidden="true">Scroll to explore <ArrowDown size={13} /></div>
    </section>
  );
}

function About() {
  return (
    <>
      <section className="section about" id="about" aria-labelledby="about-title">
        <div className="container">
          <div className="section-heading reveal">
            <div className="eyebrow">A bit of context</div>
            <div>
              <h2 id="about-title" className="serif">Hi, I'm <em>Alex.</em></h2>
              <p className="section-heading-copy">Part strategist, part designer, part developer. Fully invested in making the right thing, not just making a thing.</p>
            </div>
          </div>
          <div className="about-layout">
            <div className="about-copy reveal">
              <p>I work with people who care deeply about what they’re putting into the world. Usually, they’ve got a sharp idea and a lot of moving parts. <strong>My job is to find the signal.</strong></p>
              <p>That means asking better questions, building with care, and leaving enough room for the human bit. The result is a site or product that feels obvious in the best possible way.</p>
            </div>
            <div className="about-meta reveal">
              <div className="meta-block">
                <label>Based in</label>
                <p>Brooklyn, NY<br />Working everywhere</p>
              </div>
              <div className="meta-block">
                <label>Good at</label>
                <div className="skill-list" aria-label="Areas of expertise">
                  <span className="skill">Creative direction</span><span className="skill">Interaction design</span><span className="skill">Front-end craft</span><span className="skill">Design systems</span>
                </div>
              </div>
              <div className="meta-block">
                <label>Currently</label>
                <p>Making the web feel a little more human, one thoughtful interface at a time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="work-strip" aria-label="Services">
        <div className="marquee">
          <span>Strategy that listens</span><span className="star">·</span><span>Interfaces with a point of view</span><span className="star">·</span><span>Code that holds up</span><span className="star">·</span><span>Strategy that listens</span><span className="star">·</span><span>Interfaces with a point of view</span><span className="star">·</span><span>Code that holds up</span><span className="star">·</span>
        </div>
      </div>
    </>
  );
}

function Approach() {
  return (
    <section className="section approach" id="approach" aria-labelledby="approach-title">
      <div className="container">
        <div className="section-heading reveal">
          <div className="eyebrow">How I work</div>
          <div>
            <h2 id="approach-title" className="serif">Less noise.<br /><em>More signal.</em></h2>
            <p className="section-heading-copy">A small, senior practice for work that benefits from a close eye and a steady hand.</p>
          </div>
        </div>
        <div className="approach-grid reveal">
          <article className="approach-card" data-testid="card-approach-01">
            <span className="approach-num">01 / Listen</span>
            <h3>Start with the why.</h3>
            <p>Before pixels or prototypes, we get specific about the people, the problem, and the change you want to make.</p>
          </article>
          <article className="approach-card" data-testid="card-approach-02">
            <span className="approach-num">02 / Shape</span>
            <h3>Give ideas a spine.</h3>
            <p>We turn a loose constellation of thoughts into a clear story, a useful structure, and a visual language that feels like you.</p>
          </article>
          <article className="approach-card" data-testid="card-approach-03">
            <span className="approach-num">03 / Make</span>
            <h3>Build the real thing.</h3>
            <p>Design and development happen together, so the details survive contact with the browser — and the people using it.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="contact-form form-success" role="status" data-testid="status-form-success">
        <div className="form-success-mark"><Check size={20} /></div>
        <h3 className="serif">Message received.</h3>
        <p>Thanks for reaching out. I’ll read this properly and get back to you within a couple of days.</p>
        <button className="button-text form-reset" type="button" onClick={() => setSubmitted(false)} data-testid="button-send-another">Send another message</button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={submitForm} data-testid="form-contact">
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" type="text" placeholder="What's your name?" required data-testid="input-name" />
      </div>
      <div className="field">
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" placeholder="you@somewhere.com" required data-testid="input-email" />
      </div>
      <div className="field">
        <label htmlFor="message">A little about the project</label>
        <textarea id="message" name="message" placeholder="What are you working on?" required data-testid="input-message" />
      </div>
      <button className="button-primary form-button" type="submit" data-testid="button-submit-contact">
        Send it my way <ArrowUpRight size={16} />
      </button>
    </form>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="container">
        <div className="contact-layout">
          <div className="reveal">
            <div className="eyebrow">Have a good one?</div>
            <h2 id="contact-title" className="serif">Let's make<br /><em>something</em><br />useful.</h2>
            <p className="contact-intro">Tell me what you’re thinking. A half-formed idea is more than enough to start with.</p>
            <a className="email-link" href="mailto:hello@alexmorgan.studio" data-testid="link-email">hello@alexmorgan.studio</a>
          </div>
          <div className="reveal"><ContactForm /></div>
        </div>
        <footer className="footer">
          <span>© 2024 Alex Morgan — Independent creative developer</span>
          <div className="footer-links">
            <a href="mailto:hello@alexmorgan.studio" data-testid="link-footer-email">Email</a>
            <a href="#top" data-testid="link-back-top">Back to top ↑</a>
          </div>
        </footer>
      </div>
    </section>
  );
}

function Home() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('visible'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <About />
        <Approach />
        <Contact />
      </main>
    </div>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;