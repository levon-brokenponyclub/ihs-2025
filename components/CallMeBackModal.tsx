
import React from 'react';
import { X, Check, Phone, MessageSquare, Mail, User } from 'lucide-react';
import { Button } from './ui/Button';

interface CallMeBackModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CallMeBackModal: React.FC<CallMeBackModalProps> = ({ isOpen, onClose }) => {
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [formData, setFormData] = React.useState({
        firstName: '',
        surname: '',
        contactNumber: '',
        whatsappNumber: '',
        email: ''
    });

    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            setIsSuccess(false);
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically handle form submission
        setIsSuccess(true);
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-brand-primary/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[95vh] animate-slideUp">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-brand-primary text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white">
                                <MessageSquare size={20} />
                            </div>
                            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-brand-primary rounded-full animate-pulse"></span>
                        </div>
                        <div>
                            <h3 className="font-serif font-bold text-xl leading-tight">Call Me Back</h3>
                            <p className="text-brand-gold text-[10px] font-bold uppercase tracking-wider">Support Agent Online</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto">
                    {isSuccess ? (
                        <div className="text-center py-12">
                            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100">
                                <Check size={40} />
                            </div>
                            <h3 className="text-3xl font-serif text-brand-primary mb-4 font-bold">Request Sent!</h3>
                            <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                                Thank you for your interest. One of our consultants will call you back shortly.
                            </p>
                            <Button variant="outline" onClick={onClose} className="w-full py-4">
                                Close Window
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        <User size={12} className="text-brand-gold" />
                                        First Name*
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Enter your first name"
                                        className="w-full bg-white border border-gray-200 rounded-sm px-4 py-3 text-brand-primary placeholder:text-gray-400 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                        Surname*
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="Enter your surname"
                                        className="w-full bg-white border border-gray-200 rounded-sm px-4 py-3 text-brand-primary placeholder:text-gray-400 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                                        value={formData.surname}
                                        onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Phone size={12} className="text-brand-gold" />
                                    Contact Number*
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🇿🇦</span>
                                    <input
                                        required
                                        type="tel"
                                        placeholder="+27 00 000 0000"
                                        className="w-full bg-white border border-gray-200 rounded-sm pl-12 pr-4 py-3 text-brand-primary placeholder:text-gray-400 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                                        value={formData.contactNumber}
                                        onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <MessageSquare size={12} className="text-brand-gold" />
                                    WhatsApp Number
                                </label>
                                <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-1 font-medium">Please complete if different from your mobile contact number.</p>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🇿🇦</span>
                                    <input
                                        type="tel"
                                        placeholder="+27 00 000 0000"
                                        className="w-full bg-white border border-gray-200 rounded-sm pl-12 pr-4 py-3 text-brand-primary placeholder:text-gray-400 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                                        value={formData.whatsappNumber}
                                        onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Mail size={12} className="text-brand-gold" />
                                    Email Address*
                                </label>
                                <input
                                    required
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-white border border-gray-200 rounded-sm px-4 py-3 text-brand-primary placeholder:text-gray-400 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>

                            <Button variant="primary" type="submit" className="w-full py-4 mt-4">
                                Request a Call Back
                            </Button>

                            <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest font-bold">
                                IHS Admissions Team
                            </p>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
