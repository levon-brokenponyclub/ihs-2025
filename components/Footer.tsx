import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-[#050911] border-t border-white/5 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Column 1: Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center text-brand-dark font-serif font-bold text-lg">I</div>
                            <div className="flex flex-col">
                                <span className="font-serif text-white text-sm leading-none">International</span>
                                <span className="text-brand-muted text-[10px] uppercase tracking-widest">Hotel School</span>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-8">
                            Africa's leading hospitality management and culinary school. Part of Sommet Education - World Leader in Hospitality Education.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-gold hover:text-brand-dark transition-all">
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Column 2: Programmes */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-serif">Programmes</h4>
                        <ul className="space-y-3 text-gray-500 text-sm">
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Hospitality Management</li>
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Culinary Arts</li>
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Online Learning</li>
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Short Courses</li>
                        </ul>
                    </div>

                    {/* Column 3: Admissions */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-serif">Admissions</h4>
                        <ul className="space-y-3 text-gray-500 text-sm">
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">How to Apply</li>
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Entry Requirements</li>
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Fees & Funding</li>
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Open Days</li>
                        </ul>
                    </div>

                    {/* Column 4: Resources */}
                    <div>
                        <h4 className="text-white font-bold mb-6 font-serif">Resources</h4>
                        <ul className="space-y-3 text-gray-500 text-sm">
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Student Portal</li>
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Beyond Grad</li>
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">Downloads</li>
                            <li className="hover:text-brand-gold cursor-pointer transition-colors">News & Events</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-gray-600">
                    <div className="flex flex-wrap justify-center gap-6">
                        <div className="flex items-center gap-2">
                            <MapPin size={12} />
                            <span>Cape Town, South Africa</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Phone size={12} />
                            <span>Contact Us</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Mail size={12} />
                            <span>info@hotelschool.co.za</span>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center md:text-left flex flex-col md:flex-row justify-between text-xs text-gray-700">
                     <p>© 2024 International Hotel School. All rights reserved.</p>
                     <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-gray-500">Privacy Policy</a>
                        <a href="#" className="hover:text-gray-500">Terms of Service</a>
                        <a href="#" className="hover:text-gray-500">Cookie Policy</a>
                     </div>
                </div>

            </div>
        </footer>
    );
};