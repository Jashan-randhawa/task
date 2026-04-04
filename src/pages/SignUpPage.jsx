import React, { useState } from 'react';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Minimal strength calculator (length, numbers, special char)
  const calculateStrength = (pwd) => {
    if (pwd.length === 0) return 0;
    let score = 0;
    if (pwd.length > 5) score += 1;
    if (pwd.length > 8) score += 1;
    if (/\d/.test(pwd)) score += 1;
    if (/[!@#$%^&*]/.test(pwd)) score += 1;
    return score;
  };

  const strength = calculateStrength(password);
  
  const getStrengthLabel = () => {
    if (strength === 0) return '';
    if (strength <= 1) return 'Weak';
    if (strength <= 2) return 'Fair';
    if (strength === 3) return 'Good';
    return 'Strong';
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Simulate signup, then navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="signup-layout animate-fade-in">
      <div className="signup-container">
        
        {/* Left Side: Elegant Illustration & Branding */}
        <div className="signup-brand">
           <div className="brand-overlay"></div>
           <div className="brand-content relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6">TalentArch</h2>
              <p className="text-blue-100 text-lg leading-relaxed max-w-sm">
                Join the elite network of B2B event professionals. Source, manage, and execute with absolute precision.
              </p>
           </div>
           {/* We use CSS gradients and an abstract placement to satisfy the "elegant illustrations" and teal/purple */}
           <div className="abstract-shapes">
             <div className="shape shape-1"></div>
             <div className="shape shape-2"></div>
           </div>
        </div>

        {/* Right Side: Clean Centered Form */}
        <div className="signup-form-wrapper">
          <div className="signup-form-inner">
            <h1 className="text-3xl font-bold text-dark mb-2">Create Your Account</h1>
            <p className="text-gray mb-8">Start managing your elite talent pipeline today.</p>

            <form onSubmit={handleSignUp} className="flex flex-col gap-5">
              
              <div className="form-group">
                <label className="input-label">Full Name</label>
                <input type="text" className="input-field mt-1" placeholder="Jane Doe" required />
              </div>

              <div className="form-group">
                <label className="input-label">Email Address</label>
                <input type="email" className="input-field mt-1" placeholder="jane@company.com" required />
              </div>

              <div className="form-group relative">
                <div className="flex justify-between">
                  <label className="input-label">Password</label>
                  <span className={`text-xs font-bold strength-${strength}`}>{getStrengthLabel()}</span>
                </div>
                <div className="relative mt-1">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="input-field w-full" 
                    placeholder="Create a strong password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                  <button type="button" className="absolute right-3 top-3 text-gray" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                {/* Strength Meter */}
                <div className="strength-meter mt-2">
                   <div className={`strength-bar ${strength >= 1 ? 'active' : ''} ${strength >= 1 && strength <= 2 ? 'weak' : strength === 3 ? 'fair' : strength === 4 ? 'strong' : ''}`}></div>
                   <div className={`strength-bar ${strength >= 2 ? 'active' : ''} ${strength <= 2 && strength >= 1 ? 'weak' : strength === 3 ? 'fair' : strength === 4 ? 'strong' : ''}`}></div>
                   <div className={`strength-bar ${strength >= 3 ? 'active' : ''} ${strength === 3 ? 'fair' : strength === 4 ? 'strong' : ''}`}></div>
                   <div className={`strength-bar ${strength >= 4 ? 'active' : ''} strong`}></div>
                </div>
              </div>

              <div className="form-group relative">
                <label className="input-label">Confirm Password</label>
                <div className="relative mt-1">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="input-field w-full" 
                    placeholder="Repeat your password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                 <label className="flex items-start gap-3 cursor-pointer mt-2">
                    <input type="checkbox" className="w-5 h-5 accent-teal-600 rounded mt-0.5" required />
                    <span className="text-sm text-gray">
                       I agree to the <a href="#" className="text-teal-600 font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-teal-600 font-bold hover:underline">Privacy Policy</a>.
                    </span>
                 </label>
              </div>

              <button type="submit" className="btn signup-btn text-white w-full py-3 mt-4 text-base font-bold shadow-lg">
                Create Account
              </button>
            </form>

            <div className="divider my-8 relative flex items-center justify-center">
               <span className="bg-white px-4 text-xs font-bold text-gray uppercase tracking-wider relative z-10">Or continue with</span>
               <div className="absolute w-full h-px bg-slate-200 top-1/2"></div>
            </div>

            <div className="flex gap-4 mb-8">
               <button type="button" className="social-btn flex-1">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
               </button>
               <button type="button" className="social-btn flex-1">
                  <img src="https://www.svgrepo.com/show/512317/github-142.svg" className="w-5 h-5" alt="GitHub" />
               </button>
               <button type="button" className="social-btn flex-1">
                  <img src="https://www.svgrepo.com/show/511330/apple-173.svg" className="w-5 h-5" alt="Apple" />
               </button>
            </div>

            <p className="text-center text-sm font-semibold text-gray">
               Already have an account? <a href="#" className="text-teal-600 hover:underline">Sign In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
