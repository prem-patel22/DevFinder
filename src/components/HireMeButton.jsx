import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaPaypal, FaGooglePay, FaTimes, FaCheckCircle, FaUser, FaCalendar } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import OTPVerification from './OTPVerification';

function HireMeButton() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState('plan'); // plan, details, payment, otp, success
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [verificationData, setVerificationData] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    clientName: '',
    bookingDate: '',
    bookingTime: '',
    specialRequests: ''
  });
  const { user } = useAuth();

  const plans = [
    {
      id: 'basic',
      name: 'Basic Consultation',
      price: 49,
      features: ['30-min video call', 'Project review', 'Career advice'],
      icon: '💬'
    },
    {
      id: 'standard',
      name: 'Standard Package',
      price: 199,
      features: ['2-hour consultation', 'Code review', 'Resume review', 'Project planning'],
      icon: '🚀',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium Package',
      price: 499,
      features: ['Full-day mentorship', 'Portfolio review', 'Mock interviews', 'Reference letter'],
      icon: '👑'
    }
  ];

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setStep('details');
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    if (!bookingDetails.clientName) {
      toast.error('Please enter your name');
      return;
    }
    if (!bookingDetails.bookingDate) {
      toast.error('Please select a date');
      return;
    }
    if (!bookingDetails.bookingTime) {
      toast.error('Please select a time');
      return;
    }
    setStep('payment');
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }
    setStep('otp');
  };

  const handleOTPVerification = (verification) => {
    setVerificationData(verification);
    
    // Create booking with all data
    const newBooking = {
      id: Date.now(),
      bookingId: `DEV${Date.now()}`,
      plan: selectedPlan,
      paymentMethod: paymentMethod,
      amount: selectedPlan.price,
      user: {
        name: bookingDetails.clientName || user?.name || 'Guest User',
        email: user?.email || (verification.method === 'email' ? verification.contact : null),
        userId: user?.id || null
      },
      bookingDetails: {
        clientName: bookingDetails.clientName,
        bookingDate: bookingDetails.bookingDate,
        bookingTime: bookingDetails.bookingTime,
        specialRequests: bookingDetails.specialRequests
      },
      verificationMethod: verification.method,
      verificationContact: verification.contact,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messageSent: false
    };
    
    // Save to localStorage
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(newBooking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    
    setBookingId(newBooking.bookingId);
    setStep('success');
    
    // Send confirmation message (Demo)
    setTimeout(() => {
      const message = `🎉 DevFinder: Booking Confirmed! Booking ID: ${newBooking.bookingId}. Date: ${bookingDetails.bookingDate} at ${bookingDetails.bookingTime}. Amount: $${selectedPlan.price}. Status: Pending Admin Confirmation.`;
      
      if (verification.method === 'email') {
        toast.success(`📧 Demo confirmation sent to ${verification.contact}`);
        console.log(`[DEMO] Email to ${verification.contact}: ${message}`);
      } else {
        toast.success(`📱 Demo SMS sent to ${verification.contact}`);
        console.log(`[DEMO] SMS to ${verification.contact}: ${message}`);
      }
    }, 1000);
  };

  const resetModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setStep('plan');
      setSelectedPlan(null);
      setPaymentMethod(null);
      setVerificationData(null);
      setBookingDetails({
        clientName: '',
        bookingDate: '',
        bookingTime: '',
        specialRequests: ''
      });
    }, 300);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowModal(true)}
        style={{
          padding: '12px 30px',
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          fontWeight: 'bold',
          fontSize: '16px',
          marginTop: '20px'
        }}
      >
        💼 Hire Me
      </motion.button>

      <AnimatePresence>
        {showModal && (
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
              zIndex: 2000,
              backdropFilter: 'blur(5px)'
            }}
            onClick={resetModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                width: '90%',
                maxWidth: '500px',
                maxHeight: '80vh',
                overflowY: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ margin: 0 }}>
                  {step === 'plan' && 'Select a Plan'}
                  {step === 'details' && 'Booking Details'}
                  {step === 'payment' && 'Payment Details'}
                  {step === 'otp' && 'Verify Identity'}
                  {step === 'success' && 'Booking Confirmed!'}
                </h2>
                <button onClick={resetModal} style={{ background: 'transparent', border: 'none', fontSize: '24px', cursor: 'pointer' }}>
                  <FaTimes />
                </button>
              </div>

              {step === 'plan' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {plans.map(plan => (
                    <motion.div
                      key={plan.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handlePlanSelect(plan)}
                      style={{
                        border: `2px solid ${plan.popular ? '#f59e0b' : '#e0e0e0'}`,
                        borderRadius: '15px',
                        padding: '20px',
                        cursor: 'pointer',
                        position: 'relative',
                        background: plan.popular ? '#fef3c7' : 'white'
                      }}
                    >
                      {plan.popular && (
                        <span style={{
                          position: 'absolute',
                          top: '-10px',
                          right: '20px',
                          background: '#f59e0b',
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '12px'
                        }}>
                          Popular
                        </span>
                      )}
                      <div style={{ fontSize: '40px', marginBottom: '10px' }}>{plan.icon}</div>
                      <h3 style={{ margin: 0 }}>{plan.name}</h3>
                      <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#667eea', margin: '10px 0' }}>
                        ${plan.price}
                      </p>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {plan.features.map((feature, i) => (
                          <li key={i} style={{ margin: '5px 0' }}>{feature}</li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              )}

              {step === 'details' && (
                <form onSubmit={handleDetailsSubmit}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 'bold' }}>
                      <FaUser style={{ marginRight: '8px', color: '#667eea' }} /> Client Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={bookingDetails.clientName}
                      onChange={(e) => setBookingDetails({ ...bookingDetails, clientName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 'bold' }}>
                      <FaCalendar style={{ marginRight: '8px', color: '#667eea' }} /> Booking Date *
                    </label>
                    <input
                      type="date"
                      value={bookingDetails.bookingDate}
                      onChange={(e) => setBookingDetails({ ...bookingDetails, bookingDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                      required
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 'bold' }}>
                      <FaCalendar style={{ marginRight: '8px', color: '#667eea' }} /> Booking Time *
                    </label>
                    <select
                      value={bookingDetails.bookingTime}
                      onChange={(e) => setBookingDetails({ ...bookingDetails, bookingTime: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '16px'
                      }}
                      required
                    >
                      <option value="">Select a time slot</option>
                      <option value="09:00 AM">09:00 AM</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: 'bold' }}>
                      Special Requests (Optional)
                    </label>
                    <textarea
                      placeholder="Any specific requirements or questions..."
                      value={bookingDetails.specialRequests}
                      onChange={(e) => setBookingDetails({ ...bookingDetails, specialRequests: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '14px',
                        minHeight: '80px',
                        resize: 'vertical'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: 'bold',
                      fontSize: '16px'
                    }}
                  >
                    Continue to Payment
                  </button>
                </form>
              )}

              {step === 'payment' && selectedPlan && (
                <div>
                  <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
                    <h4>Booking Summary</h4>
                    <p><strong>Plan:</strong> {selectedPlan.name}</p>
                    <p><strong>Amount:</strong> ${selectedPlan.price}</p>
                    <p><strong>Date:</strong> {bookingDetails.bookingDate}</p>
                    <p><strong>Time:</strong> {bookingDetails.bookingTime}</p>
                  </div>

                  <h4>Select Payment Method</h4>
                  <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      style={{
                        flex: 1,
                        padding: '15px',
                        background: paymentMethod === 'card' ? '#667eea' : '#f8f9fa',
                        color: paymentMethod === 'card' ? 'white' : '#333',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                      }}
                    >
                      <FaCreditCard /> Credit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      style={{
                        flex: 1,
                        padding: '15px',
                        background: paymentMethod === 'paypal' ? '#667eea' : '#f8f9fa',
                        color: paymentMethod === 'paypal' ? 'white' : '#333',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                      }}
                    >
                      <FaPaypal /> PayPal
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('googlepay')}
                      style={{
                        flex: 1,
                        padding: '15px',
                        background: paymentMethod === 'googlepay' ? '#667eea' : '#f8f9fa',
                        color: paymentMethod === 'googlepay' ? 'white' : '#333',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px'
                      }}
                    >
                      <FaGooglePay /> Google Pay
                    </button>
                  </div>

                  {paymentMethod === 'card' && (
                    <div style={{ marginBottom: '20px' }}>
                      <input type="text" placeholder="Card Number" style={{ width: '100%', padding: '12px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px' }} />
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <input type="text" placeholder="MM/YY" style={{ flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                        <input type="text" placeholder="CVC" style={{ flex: 1, padding: '12px', border: '1px solid #ddd', borderRadius: '8px' }} />
                      </div>
                    </div>
                  )}

                  <button
                    onClick={handlePayment}
                    style={{
                      width: '100%',
                      padding: '15px',
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Proceed to Verification
                  </button>
                </div>
              )}

              {step === 'otp' && (
                <OTPVerification
                  userDetails={user}
                  onVerify={handleOTPVerification}
                  onBack={() => setStep('payment')}
                />
              )}

              {step === 'success' && (
                <div style={{ textAlign: 'center' }}>
                  <FaCheckCircle size={60} color="#10b981" />
                  <h3>Booking Confirmed!</h3>
                  <p>Your booking ID: <strong>{bookingId}</strong></p>
                  <p style={{ marginTop: '10px', color: '#666' }}>
                    Date: {bookingDetails.bookingDate} at {bookingDetails.bookingTime}
                  </p>
                  <p style={{ color: '#f59e0b', marginTop: '10px', fontSize: '14px' }}>
                    ⏳ Pending admin confirmation. You'll receive another notification once confirmed.
                  </p>
                  <button
                    onClick={resetModal}
                    style={{
                      padding: '12px 30px',
                      background: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '25px',
                      cursor: 'pointer',
                      marginTop: '20px'
                    }}
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default HireMeButton;