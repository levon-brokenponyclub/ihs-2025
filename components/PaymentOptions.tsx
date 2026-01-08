
import React from 'react';
import { Button } from './ui/Button';
import { CreditCard, GraduationCap, Banknote, Phone, ArrowRight } from 'lucide-react';

export const PaymentOptions: React.FC = () => {
    return (
        <div className="bg-[#f8fafc] min-h-screen pt-32 pb-20">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
                <h1 className="font-serif text-4xl md:text-5xl text-[#002B4E] mb-6">Payment <span className="text-[#C2B067] italic">Options</span></h1>
                <div className="w-24 h-1 bg-[#C2B067] mx-auto rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    
                    {/* Option 1 */}
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-shadow duration-300">
                        <div className="mb-6">
                            <h2 className="text-2xl font-serif text-[#002B4E] font-bold">Option 1: Payment Plan</h2>
                            <p className="text-[#C2B067] text-xs font-bold uppercase tracking-widest mt-2">*for Full-time and Online Learning students</p>
                        </div>
                        <div className="space-y-4 text-gray-600 text-sm leading-relaxed flex-1 mb-8">
                            <p>There are a wide range of personalised payment plans available, which make studying at International Hotel School very affordable.</p>
                            <p>All payment plans are interest free. An enrolment deposit is payable upon acceptance, followed by a monthly payment plan. A debit order needs to be signed and a credit check will apply.</p>
                            <p className="font-bold text-[#002B4E]">Payment options can be discussed with your Consultant.</p>
                        </div>
                        <Button variant="primary" className="w-full justify-center" icon={<Phone size={16} />}>
                            CONTACT US
                        </Button>
                    </div>

                    {/* Option 2 */}
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-shadow duration-300">
                        <div className="mb-6">
                            <h2 className="text-2xl font-serif text-[#002B4E] font-bold">Option 2: Student Loans</h2>
                            <p className="text-[#C2B067] text-xs font-bold uppercase tracking-widest mt-2">*for Full-time and Online Learning students</p>
                        </div>
                        <div className="space-y-4 text-gray-600 text-sm leading-relaxed flex-1 mb-8">
                            <p>We have partnered with Student Hero to make your student loan application quick and easy.</p>
                            <p>We understand how confusing it can be when applying for a student loan on your own. Student Hero help you apply for your student loan and ensure that you have the best possible chance of securing a student loan. The GREAT NEWS is – they help you for FREE.</p>
                            <p>Student Hero can help you apply to all the major credit providers (the Banks) in South Africa and make sure your application process is professional, quick and as easy as possible.</p>
                            <p className="text-xs italic text-gray-400">To apply for a Student Loan you need to have submitted your application for enrolment with the International Hotel School.</p>
                        </div>
                        <Button variant="gold" className="w-full justify-center" icon={<ArrowRight size={16} />}>
                            APPLY NOW
                        </Button>
                    </div>

                    {/* Option 3 */}
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 flex flex-col hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
                        {/* Featured Badge */}
                        <div className="absolute top-0 right-0 bg-[#C2B067] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                            Popular
                        </div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-serif text-[#002B4E] font-bold">Option 3: Short Course Finance</h2>
                            <p className="text-[#C2B067] text-xs font-bold uppercase tracking-widest mt-2">*for Online Learning students</p>
                        </div>
                        <div className="space-y-4 text-gray-600 text-sm leading-relaxed flex-1 mb-8">
                            <p className="font-bold text-[#002B4E]">Pay for your short course over 12 months</p>
                            <p>FeverTree's application process is quick & simple. Follow the quick and easy steps below.</p>
                            
                            <div className="bg-gray-50 p-4 rounded-sm border border-gray-100 my-4">
                                <p className="font-bold text-[#002B4E] mb-2">Pre-qualify in seconds!</p>
                                <p className="text-xs mb-1">SMS your <span className="font-mono bg-white px-1">SA ID Number*Gross Monthly Income</span> to <span className="font-bold text-[#002B4E]">48061</span></p>
                                <p className="text-xs text-gray-400 italic">e.g. 8212225222085*5000</p>
                            </div>

                            <p>After submitting your required documents, expect a quick turnaround time to find out if you’ve been successful with your application. Once you’ve been approved you can join the soonest course.</p>
                            
                            <div className="text-xs text-gray-400 border-t border-gray-100 pt-4 mt-4">
                                <p>Terms & Conditions apply. Operated by FeverTree Finance (Pty) Ltd, a registered credit provider (NCRCP6072). SA citizens only.</p>
                            </div>
                        </div>
                        <Button variant="gold" className="w-full justify-center" icon={<ArrowRight size={16} />}>
                            APPLY NOW
                        </Button>
                    </div>
                </div>

                {/* Banking Details */}
                <div className="bg-[#002B4E] text-white p-8 md:p-12 rounded-sm relative overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#C2B067] opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 className="text-3xl font-serif font-bold mb-4">Banking Details</h2>
                            <p className="text-white/70 mb-6 max-w-md">Please use these details for direct bank transfers. Always use your student number or full name as reference.</p>
                            <div className="flex items-center gap-2 text-[#C2B067] text-sm font-bold uppercase tracking-widest">
                                <Banknote size={18} />
                                <span>Secure Payments</span>
                            </div>
                        </div>
                        
                        <div className="bg-white/10 p-6 rounded-sm border border-white/10 backdrop-blur-sm">
                            <div className="space-y-3 font-mono text-sm">
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-gray-400">Bank</span>
                                    <span className="font-bold">Standard Bank</span>
                                </div>
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-gray-400">Branch/Code</span>
                                    <span className="font-bold">Kingsmead – 040026</span>
                                </div>
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-gray-400">Account No</span>
                                    <span className="font-bold text-[#C2B067]">331727242</span>
                                </div>
                                <div className="flex justify-between border-b border-white/10 pb-2">
                                    <span className="text-gray-400">Swift Code</span>
                                    <span className="font-bold">SBZAZAJJ</span>
                                </div>
                                <div className="flex justify-between pt-1">
                                    <span className="text-gray-400">Reference</span>
                                    <span className="font-bold">Student Number / Name</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
