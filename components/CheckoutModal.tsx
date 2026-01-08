
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
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-brand-primary/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slideUp">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-brand-primary text-white shrink-0">
                    <div className="flex flex-col">
                        <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[2px] mb-1">Payment</span>
                        <div className="flex items-center gap-2">
                            <Lock size={16} className="text-white/60" />
                            <h2 className="font-serif font-bold text-xl">Secure Checkout</h2>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-white/10 p-2 rounded-full text-white/70 hover:text-white transition-colors"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                    {checkoutStep === 'form' && (
                        <MultiStepForm
                            onComplete={handleFormComplete}
                            submitLabel="Proceed to Payment"
                            showSteps={true}
                        />
                    )}

                    {checkoutStep === 'payment' && (
                        <form onSubmit={handlePay} className="animate-in slide-in-from-right-4">
                            <div className="mb-6 bg-gray-50 p-6 rounded-sm border border-gray-200 text-center shadow-sm">
                                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-[2px] mb-2">Total Due Now</p>
                                <p className="text-4xl font-serif text-brand-primary font-bold">R {total.toLocaleString()}</p>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="bg-white border border-gray-200 rounded-sm p-5 shadow-sm">
                                    <label className="block text-[10px] font-bold uppercase tracking-[2px] text-gray-400 mb-4">Card Details</label>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-sm p-4 transition-all focus-within:border-brand-primary/30 focus-within:ring-1 focus-within:ring-brand-primary/10">
                                            <CreditCard size={20} className="text-gray-400" />
                                            <input
                                                type="text"
                                                className="bg-transparent text-brand-primary outline-none flex-1 placeholder:text-gray-400 text-sm font-medium"
                                                placeholder="Card number"
                                                required
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <input
                                                type="text"
                                                className="bg-gray-50 border border-gray-200 rounded-sm p-4 text-brand-primary outline-none placeholder:text-gray-400 text-sm font-medium transition-all focus:border-brand-primary/30 focus:ring-1 focus:ring-brand-primary/10"
                                                placeholder="MM / YY"
                                                required
                                            />
                                            <input
                                                type="text"
                                                className="bg-gray-50 border border-gray-200 rounded-sm p-4 text-brand-primary outline-none placeholder:text-gray-400 text-sm font-medium transition-all focus:border-brand-primary/30 focus:ring-1 focus:ring-brand-primary/10"
                                                placeholder="CVC"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 mb-8 text-[11px] text-green-600 justify-center font-medium">
                                <ShieldCheck size={14} />
                                <span>Protected by 256-bit SSL encryption</span>
                            </div>

                            <Button
                                variant="primary"
                                className="w-full py-4"
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing Payment...' : `Confirm Payment: R ${total.toLocaleString()}`}
                            </Button>

                            <button
                                type="button"
                                onClick={() => setCheckoutStep('form')}
                                className="w-full mt-6 text-xs text-gray-400 font-bold uppercase tracking-widest hover:text-brand-primary transition-colors"
                            >
                                Back to details
                            </button>
                        </form>
                    )}

                    {checkoutStep === 'success' && (
                        <div className="text-center py-10 animate-slideUp">
                            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Check size={36} strokeWidth={3} />
                            </div>
                            <h3 className="text-3xl font-serif text-brand-primary font-bold mb-4">Payment Successful!</h3>
                            <p className="text-gray-600 mb-10 leading-relaxed max-w-xs mx-auto">
                                Thank you for your enrollment. We've sent your access details to your email address.
                            </p>
                            <Button variant="outline" onClick={onClose} className="w-full">
                                Close Window
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
