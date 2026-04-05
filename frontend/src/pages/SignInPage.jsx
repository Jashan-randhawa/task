import React, { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

export default function SignInPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-orb"></div>
          <span className="auth-logo-name">TalentArch</span>
        </div>

        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to your workspace</p>

        <form onSubmit={handleLogin}>
          <div className="auth-input-group">
            <input 
              type="email" 
              className="auth-input" 
              placeholder="Email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="auth-input-group">
            <input 
              type={showPassword ? "text" : "password"} 
              className="auth-input" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
            <span className="auth-icon-right" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </span>
          </div>

          <Link to="#" className="auth-forgot">Forgot password?</Link>

          <button type="submit" className="auth-btn-primary">
            Sign In
          </button>
        </form>

        <div className="auth-switch">
          Don't have an account? <Link to="/signup">Create one</Link>
        </div>

        <div className="auth-divider">or continue with</div>

        <button type="button" className="auth-social-btn auth-google">
          <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <button type="button" className="auth-social-btn auth-facebook">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#4a6da7" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.675 0H1.325C0.593 0 0 0.593 0 1.325v21.351C0 23.407 0.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
          </svg>
          Continue with Facebook
        </button>
      </div>
    </div>
  );
}
