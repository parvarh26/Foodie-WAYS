import Link from 'next/link';
import styles from './landing.module.css';

export default function LandingPage() {
  return (
    <div className={styles.landingContainer}>
      
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.logoPlaceholder}>
          {/* Logo Placeholder - Will be updated when logo is provided */}
          <div className={styles.logoIcon}>FW</div>
          <span className={styles.brandText}>Foodie-WAYS</span>
        </div>
        <Link href="/dashboard" className={styles.navAction}>
          Admin Login
        </Link>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroGlow}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.headline}>
            Hunger Meets <br/>
            <span className={styles.highlight}>Speed.</span>
          </h1>
          <p className={styles.subheadline}>
            A breathtaking, hyper-realistic, high-end photography shot of a gourmet burger and rustic fries resting on a dark slate table.
          </p>
          <div className={styles.actionGroup}>
            <Link href="/dashboard" className={styles.ctaButton}>
              Order Now
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
        <div className={styles.heroImageContainer}>
          <img src="/hero-food.png" alt="Delicious Gourmet Burger on Dark Slate" className={styles.heroImage} />
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.features}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>⏱️</div>
          <h3 className={styles.featureTitle}>Fast Delivery</h3>
          <p className={styles.featureDesc}>
            Speedy service within 20-40 mins, prioritized natively in O(log N) time guarantees.
          </p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>⭐</div>
          <h3 className={styles.featureTitle}>Premium Quality</h3>
          <p className={styles.featureDesc}>
            Gourmet ingredients and world-class chefs fulfilling our elite VIP priority systems.
          </p>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>🍽️</div>
          <h3 className={styles.featureTitle}>Diverse Menu</h3>
          <p className={styles.featureDesc}>
            100+ top restaurants immediately processed and dispatched with O(1) peek capability.
          </p>
        </div>
      </section>

      {/* Footer / Credits */}
      <footer className={styles.footer}>
        <div className={styles.creditsContainer}>
          <p><strong>Submitted by-</strong></p>
          <p>Lav Kumar Mishra (25BCS11906)</p>
          <p>Rahul Kumar (25BCS10538)</p>
          <p>Aditya Kumar Jha (25BCS12978)</p>
          <p className={styles.submittedTo}><strong>Submitted to-</strong> Nikhil Choudhary Sir</p>
        </div>
      </footer>

    </div>
  );
}
