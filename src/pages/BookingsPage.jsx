import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendar, FaUser, FaDollarSign, FaCheckCircle, FaClock, FaSpinner, FaEnvelope, FaPhone, FaEye, FaTimes, FaWhatsapp, FaPaperPlane, FaCalendarAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import emailjs from 'emailjs-com';

// EmailJS Configuration
const EMAILJS_CONFIG = {
  PUBLIC_KEY: '4EaPqowFQS9zKufBP',
  SERVICE_ID: 'service_9vgep29',
  CONFIRMATION_TEMPLATE_ID: 'template_booking_confirmation'
};

// Initialize EmailJS
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

function BookingsPage() {
  const { isAdmin } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToConfirm, setBookingToConfirm] = useState(null);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    try {
      const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      setBookings(savedBookings);
    } catch (error) {
      console.error('Error loading bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Send CONFIRMATION email - MATCHING YOUR TEMPLATE VARIABLES
  const sendConfirmationEmail = async (booking) => {
    try {
      // IMPORTANT: Your EmailJS template uses {{email}} not {{to_email}}
      // So we send 'email' instead of 'to_email'
      const templateParams = {
        email: booking.user?.email || booking.verificationContact,  // Changed from 'to_email' to 'email'
        name: booking.bookingDetails?.clientName || booking.user?.name || 'Valued Customer',
        booking_id: booking.bookingId,
        plan_name: booking.plan?.name,
        amount: booking.amount,
        payment_method: booking.paymentMethod,
        date: booking.bookingDetails?.bookingDate || new Date(booking.createdAt).toLocaleDateString(),
        time: booking.bookingDetails?.bookingTime || 'To be confirmed',
        message: `Your booking has been confirmed! We're excited to work with you. Our team will contact you shortly.`
      };
      
      console.log('Sending email with params:', templateParams);
      
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.CONFIRMATION_TEMPLATE_ID,
        templateParams,
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      
      console.log('EmailJS Response:', response);
      return response.status === 200;
    } catch (error) {
      console.error('Confirmation email sending failed:', error);
      return false;
    }
  };

  const openConfirmModal = (booking) => {
    setBookingToConfirm(booking);
    setShowConfirmModal(true);
  };

  const openCancelModal = (booking) => {
    setBookingToCancel(booking);
    setCancelReason('');
    setShowCancelModal(true);
  };

  const confirmBooking = async () => {
    if (!bookingToConfirm) return;
    
    setIsSendingEmail(true);
    
    // Send confirmation email
    let emailSent = false;
    const customerEmail = bookingToConfirm.user?.email || bookingToConfirm.verificationContact;
    
    if ((bookingToConfirm.verificationMethod === 'email' || bookingToConfirm.user?.email) && customerEmail) {
      toast.loading('Sending confirmation email...', { id: 'email-send' });
      emailSent = await sendConfirmationEmail(bookingToConfirm);
      toast.dismiss('email-send');
      
      if (emailSent) {
        toast.success(`✅ Confirmation email sent to ${customerEmail}`);
      } else {
        toast.error(`❌ Failed to send email to ${customerEmail}. Check console for details.`);
      }
    } else {
      toast.warning('No email address found. Skipping email notification.');
    }
    
    // Update booking status
    const updatedBookings = bookings.map(b => {
      if (b.id === bookingToConfirm.id) {
        const updated = { 
          ...b, 
          status: 'confirmed', 
          updatedAt: new Date().toISOString(),
          emailSent: emailSent
        };
        
        if (bookingToConfirm.verificationMethod === 'phone') {
          console.log(`[SMS Demo] Confirmation sent to ${bookingToConfirm.verificationContact}`);
        }
        
        return updated;
      }
      return b;
    });
    
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    
    setIsSendingEmail(false);
    setShowConfirmModal(false);
    
    toast.success(`Booking ${bookingToConfirm.bookingId} confirmed!`);
    setBookingToConfirm(null);
  };

  const cancelBooking = () => {
    if (!bookingToCancel) return;
    
    const updatedBookings = bookings.map(b => {
      if (b.id === bookingToCancel.id) {
        return { 
          ...b, 
          status: 'cancelled', 
          updatedAt: new Date().toISOString(),
          cancellationReason: cancelReason
        };
      }
      return b;
    });
    
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    
    setShowCancelModal(false);
    toast.success(`Booking ${bookingToCancel.bookingId} cancelled!`);
    
    setBookingToCancel(null);
    setCancelReason('');
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'confirmed':
        return { color: '#10b981', icon: <FaCheckCircle />, text: 'Confirmed' };
      case 'pending':
        return { color: '#f59e0b', icon: <FaSpinner />, text: 'Pending' };
      case 'cancelled':
        return { color: '#ef4444', icon: <FaTimes />, text: 'Cancelled' };
      default:
        return { color: '#6c757d', icon: <FaClock />, text: 'Unknown' };
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter);

  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length
  };

  if (!isAdmin()) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          maxWidth: '400px'
        }}>
          <h2 style={{ color: '#e74c3c', marginBottom: '15px' }}>Access Denied</h2>
          <p>Only administrators can access this page.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }} />
          <p style={{ color: 'white' }}>Loading bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '60px 20px'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'white',
            borderRadius: '30px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}
        >
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '30px',
            color: 'white'
          }}>
            <h1 style={{ fontSize: '2rem' }}>📅 Booking Management</h1>
            <p>Manage all client bookings and confirmations from DevFinder</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            padding: '30px',
            background: '#f8f9fa'
          }}>
            <div style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', color: '#667eea' }}>{stats.total}</h3>
              <p>Total Bookings</p>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', color: '#f59e0b' }}>{stats.pending}</h3>
              <p>Pending</p>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', color: '#10b981' }}>{stats.confirmed}</h3>
              <p>Confirmed</p>
            </div>
            <div style={{ background: 'white', padding: '20px', borderRadius: '15px', textAlign: 'center' }}>
              <h3 style={{ fontSize: '2rem', color: '#ef4444' }}>{stats.cancelled}</h3>
              <p>Cancelled</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', padding: '0 30px', borderBottom: '2px solid #eee', flexWrap: 'wrap' }}>
            <button onClick={() => setFilter('all')} style={{ padding: '12px 24px', background: filter === 'all' ? '#667eea' : 'transparent', color: filter === 'all' ? 'white' : '#333', border: 'none', borderRadius: '10px 10px 0 0', cursor: 'pointer', fontWeight: 'bold' }}>All ({stats.total})</button>
            <button onClick={() => setFilter('pending')} style={{ padding: '12px 24px', background: filter === 'pending' ? '#667eea' : 'transparent', color: filter === 'pending' ? 'white' : '#333', border: 'none', borderRadius: '10px 10px 0 0', cursor: 'pointer', fontWeight: 'bold' }}>Pending ({stats.pending})</button>
            <button onClick={() => setFilter('confirmed')} style={{ padding: '12px 24px', background: filter === 'confirmed' ? '#667eea' : 'transparent', color: filter === 'confirmed' ? 'white' : '#333', border: 'none', borderRadius: '10px 10px 0 0', cursor: 'pointer', fontWeight: 'bold' }}>Confirmed ({stats.confirmed})</button>
            <button onClick={() => setFilter('cancelled')} style={{ padding: '12px 24px', background: filter === 'cancelled' ? '#667eea' : 'transparent', color: filter === 'cancelled' ? 'white' : '#333', border: 'none', borderRadius: '10px 10px 0 0', cursor: 'pointer', fontWeight: 'bold' }}>Cancelled ({stats.cancelled})</button>
          </div>

          <div style={{ padding: '30px' }}>
            {filteredBookings.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>No bookings found</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {filteredBookings.map(booking => {
                  const statusBadge = getStatusBadge(booking.status);
                  return (
                    <motion.div key={booking.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ background: '#f8f9fa', borderRadius: '15px', padding: '20px', border: `2px solid ${statusBadge.color}20`, borderLeft: `4px solid ${statusBadge.color}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '15px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                            <h3 style={{ margin: 0 }}>{booking.bookingId}</h3>
                            <span style={{ background: statusBadge.color, color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>{statusBadge.icon} {statusBadge.text}</span>
                          </div>
                          
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px', marginTop: '10px' }}>
                            <div>
                              <p><strong>📋 Plan:</strong> {booking.plan?.name}</p>
                              <p><strong>💰 Amount:</strong> ${booking.amount}</p>
                              <p><strong>💳 Payment:</strong> {booking.paymentMethod}</p>
                            </div>
                            <div>
                              <p><strong>👤 Client:</strong> {booking.bookingDetails?.clientName || booking.user?.name || 'Guest'}</p>
                              <p><strong>📧 Email:</strong> {booking.user?.email || booking.verificationContact || 'Not provided'}</p>
                              <p>{booking.verificationMethod === 'email' ? <FaEnvelope /> : <FaPhone />} <strong>{booking.verificationMethod === 'email' ? 'Verified Email:' : 'Verified Phone:'}</strong> {booking.verificationContact}</p>
                            </div>
                            <div>
                              <p><FaCalendarAlt /> <strong>Booking:</strong> {booking.bookingDetails?.bookingDate || 'TBD'} at {booking.bookingDetails?.bookingTime || 'TBD'}</p>
                              <p><FaCalendar /> Booked on: {new Date(booking.createdAt).toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          {booking.status === 'pending' && (
                            <>
                              <button onClick={() => openConfirmModal(booking)} style={{ padding: '10px 20px', background: '#10b981', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}><FaCheckCircle /> Confirm</button>
                              <button onClick={() => openCancelModal(booking)} style={{ padding: '10px 20px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>Cancel</button>
                            </>
                          )}
                          <button onClick={() => setSelectedBooking(booking)} style={{ padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}><FaEye /> Details</button>
                          {booking.verificationMethod === 'phone' && booking.verificationContact && (
                            <a href={`https://wa.me/${booking.verificationContact.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ padding: '10px 20px', background: '#25D366', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', textDecoration: 'none' }}><FaWhatsapp /> WhatsApp</a>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000 }} onClick={() => setSelectedBooking(null)}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '20px', width: '90%', maxWidth: '550px', maxHeight: '80vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            <h2>Booking Details</h2>
            <div style={{ marginTop: '20px' }}>
              <p><strong>Booking ID:</strong> {selectedBooking.bookingId}</p>
              <p><strong>Plan:</strong> {selectedBooking.plan?.name}</p>
              <p><strong>Amount:</strong> ${selectedBooking.amount}</p>
              <p><strong>Payment Method:</strong> {selectedBooking.paymentMethod}</p>
              <p><strong>Client Name:</strong> {selectedBooking.bookingDetails?.clientName || selectedBooking.user?.name || 'Guest'}</p>
              <p><strong>Client Email:</strong> {selectedBooking.user?.email || 'Not provided'}</p>
              <p><strong>Booking Date:</strong> {selectedBooking.bookingDetails?.bookingDate || 'TBD'}</p>
              <p><strong>Booking Time:</strong> {selectedBooking.bookingDetails?.bookingTime || 'TBD'}</p>
              {selectedBooking.bookingDetails?.specialRequests && <p><strong>Special Requests:</strong> {selectedBooking.bookingDetails.specialRequests}</p>}
              <p><strong>Verification Method:</strong> {selectedBooking.verificationMethod}</p>
              <p><strong>Verified Contact:</strong> {selectedBooking.verificationContact}</p>
              <p><strong>Status:</strong> {selectedBooking.status}</p>
              <p><strong>Booked On:</strong> {new Date(selectedBooking.createdAt).toLocaleString()}</p>
            </div>
            <button onClick={() => setSelectedBooking(null)} style={{ marginTop: '20px', padding: '10px 20px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%' }}>Close</button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && bookingToConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, backdropFilter: 'blur(5px)' }} onClick={() => setShowConfirmModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} style={{ background: 'white', borderRadius: '20px', padding: '30px', width: '90%', maxWidth: '450px', position: 'relative', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg, #10b981, #34d399, #10b981)' }} />
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ width: '70px', height: '70px', background: '#d1fae5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}><FaCheckCircle size={40} color="#10b981" /></div>
                <h2>Confirm Booking</h2>
                <p>Are you sure you want to confirm this booking?</p>
              </div>
              <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '15px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}><span>Booking ID</span><span><strong>{bookingToConfirm.bookingId}</strong></span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}><span>Client</span><span><strong>{bookingToConfirm.bookingDetails?.clientName || bookingToConfirm.user?.name || 'Guest'}</strong></span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}><span>Plan</span><span><strong>{bookingToConfirm.plan?.name}</strong></span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}><span>Date & Time</span><span><strong>{bookingToConfirm.bookingDetails?.bookingDate} at {bookingToConfirm.bookingDetails?.bookingTime}</strong></span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Amount</span><span><strong>${bookingToConfirm.amount}</strong></span></div>
              </div>
              {(bookingToConfirm.verificationMethod === 'email' || bookingToConfirm.user?.email) && (
                <div style={{ background: '#eff6ff', borderRadius: '10px', padding: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaEnvelope style={{ color: '#3b82f6' }} />
                  <div><p><strong>Confirmation email will be sent to:</strong></p><p>{bookingToConfirm.user?.email || bookingToConfirm.verificationContact}</p></div>
                </div>
              )}
              <div style={{ display: 'flex', gap: '15px' }}>
                <button onClick={confirmBooking} disabled={isSendingEmail} style={{ flex: 1, padding: '12px', background: isSendingEmail ? '#ccc' : '#10b981', color: 'white', border: 'none', borderRadius: '10px', cursor: isSendingEmail ? 'not-allowed' : 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  {isSendingEmail ? <><div style={{ width: '16px', height: '16px', border: '2px solid white', borderTop: '2px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /> Sending...</> : <><FaPaperPlane /> Confirm & Send Email</>}
                </button>
                <button onClick={() => setShowConfirmModal(false)} style={{ flex: 1, padding: '12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cancel Confirmation Modal */}
      <AnimatePresence>
        {showCancelModal && bookingToCancel && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, backdropFilter: 'blur(5px)' }} onClick={() => setShowCancelModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} style={{ background: 'white', borderRadius: '20px', padding: '30px', width: '90%', maxWidth: '450px', position: 'relative', overflow: 'hidden' }} onClick={(e) => e.stopPropagation()}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '5px', background: 'linear-gradient(90deg, #ef4444, #f87171, #ef4444)' }} />
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <div style={{ width: '70px', height: '70px', background: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px' }}><FaTimes size={40} color="#ef4444" /></div>
                <h2>Cancel Booking</h2>
                <p>Are you sure you want to cancel this booking?</p>
              </div>
              <div style={{ background: '#f8f9fa', borderRadius: '12px', padding: '15px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}><span>Booking ID</span><span><strong>{bookingToCancel.bookingId}</strong></span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}><span>Client</span><span><strong>{bookingToCancel.bookingDetails?.clientName || bookingToCancel.user?.name || 'Guest'}</strong></span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Amount</span><span><strong>${bookingToCancel.amount}</strong></span></div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label>Reason for Cancellation (Optional)</label>
                <textarea value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} placeholder="Enter reason for cancellation..." style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', minHeight: '80px', resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <button onClick={cancelBooking} style={{ flex: 1, padding: '12px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}><FaTimes /> Confirm Cancellation</button>
                <button onClick={() => setShowCancelModal(false)} style={{ flex: 1, padding: '12px', background: '#6c757d', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Go Back</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default BookingsPage;