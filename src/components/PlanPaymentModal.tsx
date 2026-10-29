import React, { useState } from 'react';
import { UserProfile } from '../types';

interface PlanPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  onPaymentSuccess: () => void;
}

export const PlanPaymentModal: React.FC<PlanPaymentModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onPaymentSuccess,
}) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'razorpay'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  // Base pricing based on duration
  const basePrices: Record<number, number> = {
    1: 1999,
    2: 3499,
    6: 7999,
  };

  const basePrice = basePrices[userProfile.duration] || 3499;
  const discountAmount = Math.round((basePrice * userProfile.discountPercent) / 100);
  const finalPrice = basePrice - discountAmount;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-[#111111] border border-orange-500/40 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl shadow-orange-500/10 animate-fade-in-up">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 text-xs font-semibold uppercase tracking-wider">
              <span>💳 Step 5 of 6</span> • Select Plan & Checkout
            </div>
            <h3 className="text-xl font-black text-white mt-1">
              Enrollment Plan & Access Unlock
            </h3>
            <p className="text-xs text-neutral-400">
              {userProfile.modality === 'group' ? 'Squad Plan (covers up to 5 members)' : 'Individual Mentorship Plan'}
            </p>
          </div>
          <button onClick={onClose} className="text-neutral-400 hover:text-white text-xl">
            &times;
          </button>
        </div>

        {/* Pricing Summary Card */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-[#16120e] to-[#121212] border border-orange-500/30 space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-neutral-300 font-medium">{userProfile.duration} Month {userProfile.designation}</span>
            <span className="text-neutral-400 font-mono line-through">₹{basePrice}</span>
          </div>

          <div className="flex justify-between items-center text-xs text-green-400">
            <span>Assessment Scholarship ({userProfile.discountPercent}%)</span>
            <span>- ₹{discountAmount}</span>
          </div>

          <div className="pt-3 border-t border-neutral-800 flex justify-between items-center">
            <span className="text-sm font-bold text-white">Total Amount Payable</span>
            <div className="text-2xl font-black text-orange-400">
              ₹{finalPrice}
            </div>
          </div>
        </div>

        {/* Payment Options */}
        <form onSubmit={handlePay} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-400 mb-2">Select Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'card' as const, label: 'Credit/Debit Card' },
                { id: 'upi' as const, label: 'UPI / GPay / PhonePe' },
                { id: 'razorpay' as const, label: 'NetBanking' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition ${
                    paymentMethod === m.id
                      ? 'border-orange-500 bg-orange-500/15 text-orange-300'
                      : 'border-neutral-800 bg-[#141414] text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {paymentMethod === 'card' && (
            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-[11px] text-neutral-400 mb-1">Card Number</label>
                <input
                  type="text"
                  required
                  defaultValue="4532 •••• •••• 8821"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Expiry</label>
                  <input
                    type="text"
                    required
                    defaultValue="08/28"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">CVV</label>
                  <input
                    type="password"
                    required
                    defaultValue="492"
                    maxLength={3}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div>
              <label className="block text-[11px] text-neutral-400 mb-1">UPI VPA ID</label>
              <input
                type="text"
                required
                defaultValue="aarav@okhdfcbank"
                className="w-full px-3 py-2 text-xs rounded-xl bg-neutral-900 border border-neutral-800 text-white font-mono"
              />
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-extrabold text-sm transition shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Payment...</span>
                </>
              ) : (
                <>
                  <span>Pay ₹{finalPrice} & Unlock Task 1</span>
                  <span>🔒</span>
                </>
              )}
            </button>
            <p className="text-[10px] text-center text-neutral-500 mt-2">
              256-bit SSL encrypted • Instant access to GitHub repository & Task delivery
            </p>
          </div>
        </form>

      </div>
    </div>
  );
};

