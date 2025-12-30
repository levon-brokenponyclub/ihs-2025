
import React, { useState, useEffect } from 'react';
import { X, Lock, CreditCard, ShieldCheck, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';
import { MultiStepForm } from './ui/MultiStepForm';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { total, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'payment' | 'success'>('form');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCheckoutStep('form');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleFormComplete = () => {
      setCheckoutStep('payment');
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate API delay
    setTimeout(() => {
      setIsProcessing(false);
      setCheckoutStep('success');
      clearCart();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-[#0d1424] w-full max-w-lg rounded-lg shadow-2xl overflow-hidden border border-white/10 animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#162036] shrink-0">
            <div className="flex items-center gap-2 text-white">
                <Lock size={16} className="text-brand-gold" />
                <span className="font-bold text-sm">Secure Checkout</span>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
            </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto">
            {checkoutStep === 'form' && (
                <MultiStepForm 
                    onComplete={handleFormComplete} 
                    submitLabel="Proceed to Payment" 
                    showSteps={true}
                />
            )}

            {checkoutStep === 'payment' && (
                <form onSubmit={handlePay} className="animate-in slide-in-from-right-4">
                    <div className="mb-6 bg-brand-gold/10 p-4 rounded-sm border border-brand-gold/20 text-center">
                        <p className="text-brand-gold text-xs uppercase tracking-widest mb-1">Total Due Now</p>
                        <p className="text-3xl font-serif text-white font-bold">R {total.toLocaleString()}</p>
                    </div>

                    <div className="space-y-4 mb-6">
                        <div className="border border-white/10 rounded-sm p-4 bg-white/5">
                            <label className="block text-xs uppercase tracking-wider text-gray-500 mb-3">Card Details</label>
                            <div className="flex items-center gap-3 bg-black/20 border border-white/10 rounded-sm p-3 mb-3">
                                <CreditCard size={20} className="text-gray-400" />
                                <input type="text" className="bg-transparent text-white outline-none flex-1 placeholder:text-gray-600" placeholder="Card number" required />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <input type="text" className="bg-black/20 border border-white/10 rounded-sm p-3 text-white outline-none placeholder:text-gray-600" placeholder="MM / YY" required />
                                <input type="text" className="bg-black/20 border border-white/10 rounded-sm p-3 text-white outline-none placeholder:text-gray-600" placeholder="CVC" required />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mb-6 text-xs text-green-500 justify-center">
                        <ShieldCheck size={14} />
                        <span>Payments processed securely by Stripe</span>
                    </div>

                    <Button 
                        variant="primary" 
                        className="w-full py-3" 
                        disabled={isProcessing}
                    >
                        {isProcessing ? 'Processing Payment...' : `Pay R ${total.toLocaleString()}`}
                    </Button>
                    
                    <button 
                        type="button" 
                        onClick={() => setCheckoutStep('form')}
                        className="w-full mt-4 text-xs text-gray-500 hover:text-white"
                    >
                        Back to details
                    </button>
                </form>
            )}

            {checkoutStep === 'success' && (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <Check size={32} />
                    </div>
                    <h3 className="text-2xl font-serif text-white mb-2">Payment Successful!</h3>
                    <p className="text-gray-400 mb-6">
                        Thank you for your enrollment. Check your email for access details.
                    </p>
                    <Button variant="outline" onClick={onClose} className="w-full">
                        Close
                    </Button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
