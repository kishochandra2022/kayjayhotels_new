
import * as React from 'react';
import { Hotel, Room } from '../types';

declare global {
  interface Window {
    emailjs: {
      send: (serviceID: string, templateID: string, templateParams: Record<string, unknown>, publicKey: string) => Promise<any>;
    };
  }
}

interface EmailInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  hotel: Hotel;
  room: Room;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  mealPlan: string;
  isCustom: boolean;
}

const EmailInquiryModal: React.FC<EmailInquiryModalProps> = ({
  isOpen,
  onClose,
  hotel,
  room,
  checkIn,
  checkOut,
  adults,
  children,
  mealPlan,
  isCustom,
}) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
  });

  const [formStatus, setFormStatus] = React.useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = React.useState('');
  const [errors, setErrors] = React.useState<Partial<typeof formData>>({});

  // Reset form when modal is reopened
  React.useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', email: '', phone: '' });
      setFormStatus('idle');
      setStatusMessage('');
      setErrors({});
    }
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: Partial<typeof formData> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setFormStatus('submitting');
    setStatusMessage('Sending your inquiry...');
    setErrors({});

    // IMPORTANT: Replace with your actual EmailJS credentials
    const serviceID = 'YOUR_SERVICE_ID';
    const templateID = 'YOUR_INQUIRY_TEMPLATE_ID';
    const publicKey = 'YOUR_PUBLIC_KEY';

    const templateParams = {
      ...formData,
      hotelName: hotel.name,
      roomName: room.name,
      checkIn: checkIn || 'Not specified',
      checkOut: checkOut || 'Not specified',
      adults: adults.toString(),
      children: children.toString(),
      mealPlan: mealPlan.toUpperCase(),
      custom_inquiry_note: isCustom ? 'This is a custom inquiry as the number of guests exceeds the standard room capacity.' : 'N/A'
    };

    const submissionPromise = new Promise((resolve, reject) => {
        if (serviceID === 'YOUR_SERVICE_ID' || !serviceID || !templateID || !publicKey) {
            console.warn("EmailJS is not configured for the modal. Simulating a successful submission.");
            setTimeout(() => {
                resolve({ status: 200, text: 'OK (Simulated)' });
            }, 1000);
        } else {
            window.emailjs.send(serviceID, templateID, templateParams, publicKey)
                .then(resolve, reject);
        }
    });

    submissionPromise
      .then((response) => {
        console.log('SUCCESS!', (response as any).status, (response as any).text);
        setFormStatus('success');
        setStatusMessage('Thank you for your inquiry! Our team will get back to you shortly.');
      }, (error) => {
        console.error('EmailJS submission failed:', error);
        setFormStatus('error');
        setStatusMessage('Sorry, something went wrong. Please try sending your inquiry again or contact us directly.');
      });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
    >
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-transform duration-300 scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 md:p-10">
            <div className="flex justify-between items-start mb-6">
                 <h1 id="inquiry-modal-title" className="text-3xl font-serif font-bold text-brand-dark">Email Inquiry</h1>
                 <button onClick={onClose} className="text-gray-400 hover:text-gray-600" aria-label="Close modal">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
            </div>
            <p className="text-gray-600 mb-8">Please confirm your details below to send your inquiry to our reservations team.</p>
              
            <div className="bg-brand-gray/50 p-6 rounded-xl mb-8 border border-brand-gray">
                <h2 className="text-2xl font-serif font-bold text-brand-dark mb-4">Inquiry Summary</h2>
                {isCustom && (
                    <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 rounded-xl">
                        <p className="font-bold">This is a Custom Inquiry</p>
                        <p className="text-sm">Your guest selection exceeds the standard room capacity. Our team will review your request for special arrangements.</p>
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-gray-800">
                    <p><strong>Hotel:</strong> {hotel.name}</p>
                    <p><strong>Room:</strong> {room.name}</p>
                    <p><strong>Check-in:</strong> {checkIn || 'Not specified'}</p>
                    <p><strong>Check-out:</strong> {checkOut || 'Not specified'}</p>
                    <p><strong>Guests:</strong> {adults} Adults, {children} Children</p>
                    <p><strong>Meal Plan:</strong> {mealPlan.toUpperCase()}</p>
                </div>
            </div>

            {formStatus === 'success' ? (
                <div className="text-center p-6 bg-green-50 border-l-4 border-green-500 rounded-xl">
                    <h3 className="text-xl font-semibold text-green-800">Inquiry Sent Successfully!</h3>
                    <p className="mt-2 text-green-700">{statusMessage}</p>
                    <button onClick={onClose} className="mt-4 bg-brand-primary text-white font-bold py-2 px-6 rounded-xl hover:bg-brand-secondary transition-all duration-300">
                        Close
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} noValidate>
                    <h2 className="text-2xl font-serif font-bold text-brand-dark mb-4">Your Contact Information</h2>
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input type="text" id="modal-name" name="name" value={formData.name} onChange={handleChange} className={`w-full text-base px-4 py-3 border rounded-xl focus:ring-brand-primary focus:border-brand-primary ${errors.name ? 'border-red-500' : 'border-gray-300'}`} required aria-required="true" />
                            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input type="email" id="modal-email" name="email" value={formData.email} onChange={handleChange} className={`w-full text-base px-4 py-3 border rounded-xl focus:ring-brand-primary focus:border-brand-primary ${errors.email ? 'border-red-500' : 'border-gray-300'}`} required aria-required="true" />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="modal-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number (Optional)</label>
                            <input type="tel" id="modal-phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full text-base px-4 py-3 border border-gray-300 rounded-xl focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col sm:flex-row-reverse items-center gap-4">
                        <button type="submit" disabled={formStatus === 'submitting'} className="w-full sm:w-auto bg-brand-primary text-white font-bold py-3 px-6 rounded-xl hover:bg-brand-secondary transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed">
                            {formStatus === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                        </button>
                        <button type="button" onClick={onClose} className="w-full sm:w-auto bg-brand-gray text-text-dark font-bold py-3 px-6 rounded-xl hover:bg-brand-light transition-all duration-300">
                            Cancel
                        </button>
                    </div>
                    {formStatus === 'error' && <p className="text-red-500 text-sm mt-4 text-center sm:text-left w-full" role="alert">{statusMessage}</p>}
                    <p className="text-xs text-gray-500 mt-4 text-center">By clicking, you agree to send your inquiry details to the Kayjay Hotels reservations team.</p>
                </form>
            )}
        </div>
      </div>
    </div>
  );
};

export default EmailInquiryModal;