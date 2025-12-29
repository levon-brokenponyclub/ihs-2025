
import React, { useState } from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
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
            <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-brand-dark border-l border-white/10 shadow-2xl transform transition-transform duration-300 flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#162036]">
                    <h2 className="text-white font-serif font-bold text-xl flex items-center gap-2">
                        <ShoppingBag size={20} className="text-brand-gold" />
                        Your Cart ({items.length})
                    </h2>
                    <button onClick={toggleCart} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {items.length === 0 ? (
                        <div className="text-center py-12">
                            <ShoppingBag size={48} className="mx-auto text-gray-600 mb-4" />
                            <p className="text-gray-400 mb-6">Your cart is currently empty.</p>
                            <Button variant="outline" onClick={toggleCart}>
                                Browse Programmes
                            </Button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.cartId} className="flex gap-4 bg-white/5 p-4 rounded-sm border border-white/5">
                                <div className="w-20 h-20 shrink-0 bg-black/20 rounded-sm overflow-hidden">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-bold text-sm mb-1 line-clamp-2">{item.title}</h4>
                                    <p className="text-xs text-brand-gold uppercase tracking-wider mb-2">{item.qualification}</p>
                                    <p className="text-white font-bold text-sm">R {item.price?.toLocaleString()}</p>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.cartId)}
                                    className="text-gray-500 hover:text-red-500 transition-colors self-start"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="p-6 border-t border-white/10 bg-[#162036]">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-gray-400 uppercase tracking-widest text-xs font-bold">Total</span>
                            <span className="text-2xl text-white font-serif font-bold">R {total.toLocaleString()}</span>
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
