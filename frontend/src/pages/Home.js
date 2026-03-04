import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>🏥 Welcome to Healthcare Management System</h1>
        <p>Your trusted platform for scheduling doctor appointments and managing your health</p>
        <div className="hero-buttons">
          <Link to="/doctors" className="btn btn-primary">Browse Doctors</Link>
          <Link to="/register" className="btn btn-secondary">Create Account</Link>
        </div>
      </div>

      <div className="features">
        <h2>Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👨‍⚕️</div>
            <h3>Expert Doctors</h3>
            <p>Browse and book appointments with qualified healthcare professionals</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Easy Scheduling</h3>
            <p>Schedule appointments at your convenience with just a few clicks</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your health information is protected with enterprise-grade security</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>24/7 Access</h3>
            <p>Access your appointments and health records anytime, anywhere</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of patients who trust us with their healthcare</p>
        <Link to="/register" className="btn btn-primary btn-lg">Sign Up Now</Link>
      </div>
    </div>
  );
}

export default Home;
