
import React, { useState } from 'react';
import {X, Trash2, ShoppingBag, Filter} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from './ui/Button';
import { CheckoutModal } from './CheckoutModal';
import { Link } from 'react-router-dom';

export const MiniCart: React.FC = () => {
  const { items, removeFromCart, isCartOpen, toggleCart, total } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <>
        <div 
            className={`fixed inset-0 z-[100] transition-opacity duration-300 ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
            {/* Backdrop */}
            <div 
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0'}`} 
                onClick={toggleCart}
            />

            {/* Slide Panel */}
            <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white border-l border-brand-primary/10 shadow-2xl transform transition-transform duration-300 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-brand-primary text-white">
                    <h2 className="text-white font-serif font-bold text-xl flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-brand-gold flex items-center justify-center text-white">
                            <ShoppingBag size={20} className="text-white" />
                        </div>
                        Your Cart ({items.length})
                    </h2>
                    <button
                        onClick={toggleCart}
                        className="group flex flex-col items-center justify-center gap-1 transition-colors duration-200 cursor-pointer relative z-[60]"
                    >
                        <div className="w-8 h-8 relative flex items-center justify-center">
                            <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
                                <path
                                    d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                                    style={{
                                        fill: 'none',
                                        stroke: 'white',
                                        strokeWidth: 8,
                                        strokeLinecap: 'round',
                                        transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                                        strokeDasharray: isCartOpen ? '90 207' : '60 207',
                                        strokeDashoffset: isCartOpen ? -134 : 0
                                    }}
                                />
                                <path
                                    d="M 20,50 H 80"
                                    style={{
                                        fill: 'none',
                                        stroke: 'white',
                                        strokeWidth: 8,
                                        strokeLinecap: 'round',
                                        transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                                        strokeDasharray: isCartOpen ? '1 60' : '60 60',
                                        strokeDashoffset: isCartOpen ? -30 : 0
                                    }}
                                />
                                <path
                                    d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                                    style={{
                                        fill: 'none',
                                        stroke: 'white',
                                        strokeWidth: 8,
                                        strokeLinecap: 'round',
                                        transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                                        strokeDasharray: isCartOpen ? '90 207' : '60 207',
                                        strokeDashoffset: isCartOpen ? -134 : 0
                                    }}
                                />
                            </svg>
                        </div>
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {items.length === 0 ? (
                        <div className="text-center py-12">
                            <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 mb-6 font-medium">Your cart is currently empty.</p>
                            <Button variant="outline" onClick={toggleCart}>
                                Browse Programmes
                            </Button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.cartId} className="flex gap-4 bg-surface-main/50 p-4 rounded-sm border border-brand-primary/5">
                                <div className="w-20 h-20 shrink-0 bg-gray-100 rounded-sm overflow-hidden">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-brand-primary font-bold text-sm mb-1 line-clamp-2">{item.title}</h4>
                                    <p className="text-xs text-brand-gold uppercase tracking-wider mb-2 font-semibold">{item.qualification}</p>
                                    <p className="text-brand-primary font-bold text-sm">R {item.price?.toLocaleString()}</p>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.cartId)}
                                    className="text-gray-400 hover:text-red-500 transition-colors self-start"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 border-t border-brand-primary/10 bg-surface-main">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-500 uppercase tracking-widest text-xs font-bold">Total</span>
                            <span className="text-2xl text-brand-primary font-serif font-bold">R {total.toLocaleString()}</span>
                        </div>
                        <Button 
                            variant="primary" 
                            className="w-full py-4 text-base"
                            onClick={() => setIsCheckoutOpen(true)}
                        >
                            Proceed to Checkout
                        </Button>
                        <p className="text-center mt-4 text-xs text-gray-500">
                            Secure Checkout powered by Stripe
                        </p>
                    </div>
                )}
            </div>
        </div>

        <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
    </>
  );
};
