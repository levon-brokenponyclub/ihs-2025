
import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, MapPin, Phone, Mail, Terminal } from 'lucide-react';
import { useTransition } from '../context/TransitionContext';

export const Footer: React.FC = () => {
    const { toggleDebug, debugMode } = useTransition();

    return (
        <footer className="bg-brand-dark border-t border-white/5 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex flex-col">
                                <img src="./components/assets/img/ihs-logo.png" alt="International Hotel School" className="h-12 w-auto" />
                            </div>
                        </div>
                        <p className="text-white text-sm leading-relaxed mb-8">
                            Africa's leading hospitality management and culinary school. Part of Sommet Education - World Leader in Hospitality Education.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 rounded-full bg-brand-dark/20 border border-white/5 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-dark transition-all duration-300">
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Programmes */}
                    <div>
                        <h4 className="text-brand-gold font-bold mb-6 font-serif">Programmes</h4>
                        <ul className="space-y-3 text-white/40 text-sm">
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Hospitality Management</li>
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Culinary Arts</li>
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Online Learning</li>
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Short Courses</li>
                        </ul>
                    </div>

                    {/* Column 3: Admissions */}
                    <div>
                        <h4 className="text-brand-gold font-bold mb-6 font-serif">Admissions</h4>
                        <ul className="space-y-3 text-white/40 text-sm">
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">How to Apply</li>
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Entry Requirements</li>
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Fees & Funding</li>
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Open Days</li>
                        </ul>
                    </div>

                    {/* Column 4: Resources */}
                    <div>
                        <h4 className="text-brand-gold font-bold mb-6 font-serif">Resources</h4>
                        <ul className="space-y-3 text-white/40 text-sm">
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Student Portal</li>
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Beyond Grad</li>
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Downloads</li>
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">News & Events</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-brand-gold font-medium uppercase tracking-wide">
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="flex items-center gap-2">
                            <MapPin size={14} className="text-brand-gold" />
                            <span>Cape Town, South Africa</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={14} className="text-brand-gold" />
                            <span>Contact Us</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={14} className="text-brand-gold" />
                            <span>info@hotelschool.co.za</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center md:text-left flex flex-col md:flex-row justify-between text-xs text-white items-center">
                     <p>© 2026 International Hotel School. All rights reserved.</p>
                     
                     <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-brand-gold transition-colors">Cookie Policy</a>
                        
                        {/* Dev Mode Toggle */}
                        <button 
                            onClick={toggleDebug} 
                            className={`flex items-center gap-1 transition-colors px-2 py-1 rounded-sm border ${debugMode ? 'bg-brand-gold/10 border-brand-gold text-brand-gold' : 'border-transparent text-gray-700 hover:text-gray-500'}`}
                            title="Toggle Animation Debug Mode"
                        >
                            <Terminal size={10} />
                            {debugMode && <span className="font-bold">DEV</span>}
                        </button>
                     </div>
                </div>

            </div>
        </footer>
    );
};
