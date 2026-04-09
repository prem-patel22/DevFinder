import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OTPInput from 'react-otp-input';
import { FaEnvelope, FaPhone, FaCheckCircle, FaCopy, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import emailjs from 'emailjs-com';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  PUBLIC_KEY: '4EaPqowFQS9zKufBP',
  SERVICE_ID: 'service_9vgep29',
  TEMPLATE_ID: 'template_9vgep29'
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

function OTPVerification({ userDetails, onVerify, onBack }) {
  const [method, setMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('input');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const [popupOtp, setPopupOtp] = useState('');
  const [popupPhone, setPopupPhone] = useState('');

  useEffect(() => {
    let interval;
    if (step === 'verify' && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Send OTP via Email using EmailJS
  const sendEmailOTP = async (emailAddress, otpCode, userName) => {
    try {
      const templateParams = {
        to_email: emailAddress,
        otp: otpCode,
        name: userName || 'User',
        from_name: 'DevFinder',
        message: `Your DevFinder verification OTP is: ${otpCode}. This OTP is valid for 5 minutes.`
      };
      
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      
      return response.status === 200;
    } catch (error) {
      console.error('Email sending failed:', error);
      toast.error(`Email error: ${error.text || 'Please check EmailJS configuration'}`);
      return false;
    }
  };

  // Send OTP via SMS - Shows beautiful popup with OTP
  const sendSMSOTPHandler = async (phoneNumber, otpCode) => {
    // Show beautiful popup with OTP
    setPopupPhone(phoneNumber);
    setPopupOtp(otpCode);
    setShowOtpPopup(true);
    
    // Also log to console
    console.log(`[SMS OTP] For ${phoneNumber}: ${otpCode}`);
    
    // Return true to indicate "sent" (demo mode)
    return true;
  };

  const sendOTP = async () => {
    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);
    setIsSending(true);
    
    let success = false;
    
    if (method === 'email') {
      if (!email) {
        toast.error('Please enter email address');
        setIsSending(false);
        return;
      }
      success = await sendEmailOTP(email, newOtp, userDetails?.name || 'DevFinder User');
      if (success) {
        toast.success(`📧 OTP sent to ${email}`);
        console.log(`[EMAIL OTP] For ${email}: ${newOtp}`);
      } else {
        toast.error('Failed to send OTP. Please check email address and try again.');
        setIsSending(false);
        return;
      }
    } else {
      if (!phone) {
        toast.error('Please enter phone number');
        setIsSending(false);
        return;
      }
      success = await sendSMSOTPHandler(phone, newOtp);
      if (success) {
        toast.success(`📱 OTP sent to ${phone}`);
      } else {
        toast.error('Failed to send OTP. Please try again.');
        setIsSending(false);
        return;
      }
    }
    
    setIsSending(false);
    setStep('verify');
    setTimer(60);
    setCanResend(false);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    await sendOTP();
  };

  const handleVerifyOTP = () => {
    if (otp === generatedOtp) {
      setStep('success');
      setTimeout(() => {
        onVerify({
          method,
          contact: method === 'email' ? email : phone,
          verified: true
        });
      }, 1500);
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  const resendOTP = async () => {
    const newOtp = generateOTP();
    setGeneratedOtp(newOtp);
    setTimer(60);
    setCanResend(false);
    
    if (method === 'email') {
      await sendEmailOTP(email, newOtp, userDetails?.name || 'DevFinder User');
      toast.success(`New OTP sent to ${email}`);
      console.log(`[EMAIL OTP Resend] For ${email}: ${newOtp}`);
    } else {
      await sendSMSOTPHandler(phone, newOtp);
      toast.success(`New OTP sent to ${phone}`);
      console.log(`[SMS OTP Resend] For ${phone}: ${newOtp}`);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('OTP copied to clipboard!');
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          padding: '20px'
        }}
      >
        {step === 'input' && (
          <div>
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Verify Your Identity</h3>
            <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
              Please choose a method to receive verification code from <strong>DevFinder</strong>
            </p>
            
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
              <button
                type="button"
                onClick={() => setMethod('email')}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: method === 'email' ? '#667eea' : '#f0f0f0',
                  color: method === 'email' ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <FaEnvelope /> Email
              </button>
              <button
                type="button"
                onClick={() => setMethod('phone')}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: method === 'phone' ? '#667eea' : '#f0f0f0',
                  color: method === 'phone' ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <FaPhone /> Phone
              </button>
            </div>

            <form onSubmit={handleSendOTP}>
              {method === 'email' ? (
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    fontSize: '16px'
                  }}
                  required
                />
              ) : (
                <input
                  type="tel"
                  placeholder="Enter your phone number (e.g., +918320504292)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    fontSize: '16px'
                  }}
                  required
                />
              )}
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  disabled={isSending}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: isSending ? '#ccc' : '#667eea',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: isSending ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  {isSending ? 'Sending...' : 'Send OTP'}
                </button>
                <button
                  type="button"
                  onClick={onBack}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold'
                  }}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 'verify' && (
          <div>
            <h3 style={{ marginBottom: '20px', color: '#333' }}>Enter Verification Code</h3>
            <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
              <strong>DevFinder</strong> has sent a 6-digit code to your {method === 'email' ? email : phone}
            </p>
            
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderSeparator={<span style={{ width: '8px' }}></span>}
              renderInput={(props) => <input {...props} style={{
                width: '45px',
                height: '45px',
                margin: '0 5px',
                fontSize: '20px',
                textAlign: 'center',
                border: '1px solid #ddd',
                borderRadius: '8px'
              }} />}
              containerStyle={{ justifyContent: 'center', marginBottom: '20px' }}
            />
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              {!canResend ? (
                <span style={{ color: '#999', fontSize: '14px' }}>
                  Resend code in {timer} seconds
                </span>
              ) : (
                <button
                  type="button"
                  onClick={resendOTP}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#667eea',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Resend Code
                </button>
              )}
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={handleVerifyOTP}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Verify & Complete Booking
              </button>
              <button
                type="button"
                onClick={() => setStep('input')}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Back
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div style={{ textAlign: 'center' }}>
            <FaCheckCircle size={60} color="#10b981" />
            <h3 style={{ marginTop: '20px', color: '#333' }}>Verification Successful!</h3>
            <p style={{ color: '#666', marginTop: '10px' }}>
              Redirecting to confirmation...
            </p>
          </div>
        )}
      </motion.div>

      {/* Beautiful OTP Popup Modal for SMS Demo */}
      <AnimatePresence>
        {showOtpPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3000,
              backdropFilter: 'blur(5px)'
            }}
            onClick={() => setShowOtpPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                width: '90%',
                maxWidth: '400px',
                textAlign: 'center',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowOtpPopup(false)}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'transparent',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#999'
                }}
              >
                <FaTimes />
              </button>
              
              <div style={{ fontSize: '50px', marginBottom: '15px' }}>📱</div>
              <h2 style={{ color: '#333', marginBottom: '10px' }}>SMS OTP Demo</h2>
              <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
                In production, this OTP would be sent to:<br />
                <strong>{popupPhone}</strong>
              </p>
              
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                padding: '20px',
                borderRadius: '15px',
                marginBottom: '20px'
              }}>
                <p style={{ color: 'white', marginBottom: '10px', fontSize: '12px' }}>Your OTP Code</p>
                <div style={{
                  fontSize: '36px',
                  fontWeight: 'bold',
                  letterSpacing: '8px',
                  color: 'white',
                  fontFamily: 'monospace',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '15px'
                }}>
                  <span>{popupOtp}</span>
                  <button
                    onClick={() => copyToClipboard(popupOtp)}
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      border: 'none',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      color: 'white',
                      fontSize: '14px'
                    }}
                  >
                    <FaCopy /> Copy
                  </button>
                </div>
              </div>
              
              <p style={{ color: '#999', fontSize: '12px', marginBottom: '20px' }}>
                ⚡ This is a demo. In production, the OTP would be sent via SMS gateway.
              </p>
              
              <button
                onClick={() => setShowOtpPopup(false)}
                style={{
                  padding: '10px 20px',
                  background: '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '25px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  width: '100%'
                }}
              >
                I Understand, Continue
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default OTPVerification;