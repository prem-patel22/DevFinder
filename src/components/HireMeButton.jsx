import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCreditCard, FaPaypal, FaGooglePay, FaTimes, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

function HireMeButton() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState('plan'); // plan, payment, success
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
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
    setStep('payment');
  };

  const handlePayment = () => {
    if (!paymentMethod) {
      toast.error('Please select a payment method');
      return;
    }
    
    // Simulate payment processing
    toast.loading('Processing payment...', { duration: 2000 });
    
    setTimeout(() => {
      toast.dismiss();
      toast.success('Payment successful! Check your email for confirmation.');
      setStep('success');
      
      // Save to localStorage
      const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      bookings.push({
        id: Date.now(),
        plan: selectedPlan,
        method: paymentMethod,
        date: new Date().toISOString(),
        user: user?.email || 'guest'
      });
      localStorage.setItem('bookings', JSON.stringify(bookings));
    }, 2000);
  };

  const resetModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setStep('plan');
      setSelectedPlan(null);
      setPaymentMethod(null);
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
                  {step === 'payment' && 'Payment Details'}
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

              {step === 'payment' && selectedPlan && (
                <div>
                  <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '10px', marginBottom: '20px' }}>
                    <h4>Selected Plan: {selectedPlan.name}</h4>
                    <p>Amount: <strong>${selectedPlan.price}</strong></p>
                  </div>

                  <h4>Select Payment Method</h4>
                  <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                    <button
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
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}
                  >
                    Pay ${selectedPlan.price}
                  </button>
                </div>
              )}

              {step === 'success' && (
                <div style={{ textAlign: 'center' }}>
                  <FaCheckCircle size={60} color="#10b981" />
                  <h3>Thank you for your booking!</h3>
                  <p>You will receive a confirmation email shortly with meeting details.</p>
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