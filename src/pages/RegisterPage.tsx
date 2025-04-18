import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CreditCard, Phone, Mail, User, Lock, Shield, Percent, ShoppingBag, Store } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    userType: '' as 'buyer' | 'seller' | '',
    creditCard: {
      number: '',
      expirationDate: '',
      cvv: '',
      cardholderName: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.userType) {
      setError('Please select whether you want to be a buyer or seller');
      return;
    }

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (!formData.phoneNumber.match(/^\+?[\d\s-]{10,}$/)) {
      setError('Please enter a valid phone number');
      return;
    }

    if (!formData.creditCard.number.match(/^\d{16}$/)) {
      setError('Please enter a valid credit card number');
      return;
    }

    try {
      setIsLoading(true);
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        userType: formData.userType,
        creditCard: {
          number: formData.creditCard.number,
          expirationDate: formData.creditCard.expirationDate,
          cvv: formData.creditCard.cvv,
          cardholderName: formData.creditCard.cardholderName,
        },
      });
      navigate('/verification');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-400">Join our community of buyers and sellers</p>
        </div>

        {/* Platform Fee Notice */}
        <div className="bg-gray-900/50 border border-primary-500/20 rounded-lg p-4 flex items-start space-x-3">
          <Percent className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-primary-500">Platform Fee Notice</h3>
            <p className="text-gray-400">
              By creating an account, you acknowledge that all transactions on YouList Auction are subject to a 10% platform fee. This applies to both buyers (added to final purchase price) and sellers (deducted from sale price) to support our secure marketplace services.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-gray-900 rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* User Type Selection */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">I want to be a...</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      className={`p-6 rounded-lg border-2 transition-colors ${
                        formData.userType === 'buyer'
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-gray-700 hover:border-primary-500/50'
                      }`}
                      onClick={() => setFormData({ ...formData, userType: 'buyer' })}
                    >
                      <ShoppingBag className={`w-12 h-12 mx-auto mb-3 ${
                        formData.userType === 'buyer' ? 'text-primary-500' : 'text-gray-400'
                      }`} />
                      <h3 className="text-lg font-semibold mb-2">Buyer</h3>
                      <p className="text-sm text-gray-400">
                        I want to browse and bid on items
                      </p>
                    </button>

                    <button
                      type="button"
                      className={`p-6 rounded-lg border-2 transition-colors ${
                        formData.userType === 'seller'
                          ? 'border-primary-500 bg-primary-500/10'
                          : 'border-gray-700 hover:border-primary-500/50'
                      }`}
                      onClick={() => setFormData({ ...formData, userType: 'seller' })}
                    >
                      <Store className={`w-12 h-12 mx-auto mb-3 ${
                        formData.userType === 'seller' ? 'text-primary-500' : 'text-gray-400'
                      }`} />
                      <h3 className="text-lg font-semibold mb-2">Seller</h3>
                      <p className="text-sm text-gray-400">
                        I want to list items for auction
                      </p>
                    </button>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="label">First Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          id="firstName"
                          required
                          className="input pl-10"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="lastName" className="label">Last Name</label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          id="lastName"
                          required
                          className="input pl-10"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="label">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        required
                        className="input pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="label">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        id="phoneNumber"
                        required
                        placeholder="+1 (123) 456-7890"
                        className="input pl-10"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="password" className="label">Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                          type="password"
                          id="password"
                          required
                          className="input pl-10"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="confirmPassword" className="label">Confirm Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <input
                          type="password"
                          id="confirmPassword"
                          required
                          className="input pl-10"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credit Card Information */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Credit Card Information</h2>
                  
                  <div>
                    <label htmlFor="cardholderName" className="label">Cardholder Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="cardholderName"
                        required
                        className="input pl-10"
                        value={formData.creditCard.cardholderName}
                        onChange={(e) => setFormData({
                          ...formData,
                          creditCard: { ...formData.creditCard, cardholderName: e.target.value }
                        })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cardNumber" className="label">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        id="cardNumber"
                        required
                        maxLength={16}
                        placeholder="1234 5678 9012 3456"
                        className="input pl-10"
                        value={formData.creditCard.number}
                        onChange={(e) => setFormData({
                          ...formData,
                          creditCard: { ...formData.creditCard, number: e.target.value.replace(/\D/g, '') }
                        })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expirationDate" className="label">Expiration Date</label>
                      <input
                        type="text"
                        id="expirationDate"
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        className="input"
                        value={formData.creditCard.expirationDate}
                        onChange={(e) => setFormData({
                          ...formData,
                          creditCard: { ...formData.creditCard, expirationDate: e.target.value }
                        })}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="label">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        required
                        maxLength={4}
                        placeholder="123"
                        className="input"
                        value={formData.creditCard.cvv}
                        onChange={(e) => setFormData({
                          ...formData,
                          creditCard: { ...formData.creditCard, cvv: e.target.value.replace(/\D/g, '') }
                        })}
                      />
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="text-error-500 text-sm mt-2">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full btn btn-primary py-3"
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            </div>
          </div>

          {/* Security Notice Panel */}
          <div className="bg-gray-900 rounded-lg shadow-lg p-8 h-fit">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-8 w-8 text-primary-500" />
              <h3 className="text-xl font-semibold">Security Notice</h3>
            </div>
            <div className="space-y-4 text-gray-400">
              <p>
                Your credit card information is securely encrypted and stored using industry-standard protocols.
              </p>
              <p>
                We require credit card information to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Process platform fees for buyers and sellers</li>
                <li>Protect sellers from fraudulent buyers</li>
                <li>Verify the identity of users</li>
                <li>Prevent scams and unauthorized activities</li>
                <li>Ensure secure transactions</li>
              </ul>
              <p className="text-sm border-t border-gray-700 pt-4 mt-4">
                Your financial information is never shared with other users and is only used for identity verification and payment processing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;