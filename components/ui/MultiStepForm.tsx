
import React, { useState } from 'react';
import { Button } from './Button';
import { Check, ArrowRight, ArrowLeft } from 'lucide-react';

interface MultiStepFormProps {
    onComplete: () => void;
    submitLabel?: string;
    showSteps?: boolean;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
    onComplete,
    submitLabel = "Submit Application",
    showSteps = true
}) => {
    const [step, setStep] = useState(1);

    // Step 1: Contact
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [email, setEmail] = useState('');

    // Step 2: Personal Details
    const [idNumber, setIdNumber] = useState('');
    const [gender, setGender] = useState('');
    const [street1, setStreet1] = useState('');
    const [street2, setStreet2] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [school, setSchool] = useState('');
    const [qualification, setQualification] = useState('');

    // Step 3: Sponsor & Consent
    const [sponsorFirst, setSponsorFirst] = useState('');
    const [sponsorLast, setSponsorLast] = useState('');
    const [sponsorId, setSponsorId] = useState('');
    const [sponsorEmail, setSponsorEmail] = useState('');
    const [sponsorMobile, setSponsorMobile] = useState('');
    const [sponsorPhone, setSponsorPhone] = useState('');
    const [consentPrivacy, setConsentPrivacy] = useState(false);
    const [consentTerms, setConsentTerms] = useState(false);
    const [consentAge, setConsentAge] = useState(false);
    const [consentCost, setConsentCost] = useState(false);

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(prev => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrev = () => {
        setStep(prev => prev - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onComplete();
    };

    const InputGroup = ({ label, required = false, type = "text", value, onChange, placeholder = "" }: any) => (
        <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-gray-400 mb-2">
                {label} {required && '*'}
            </label>
            <input
                type={type}
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-sm p-3 text-brand-primary focus:border-brand-gold outline-none transition-colors placeholder:text-gray-400 text-sm"
                placeholder={placeholder}
            />
        </div>
    );

    const PhoneInput = ({ label, required = false, value, onChange, placeholder = "" }: any) => (
        <div>
            <label className="block text-[10px] font-bold uppercase tracking-[2px] text-gray-400 mb-2">
                {label} {required && '*'}
            </label>
            <div className="flex bg-white border border-gray-200 rounded-sm overflow-hidden focus-within:border-brand-gold transition-colors">
                <div className="bg-gray-50 px-3 flex items-center justify-center border-r border-gray-200 gap-1 min-w-[70px]">
                    <span className="text-lg">🇿🇦</span>
                    <span className="text-gray-400 text-xs font-bold uppercase">+27</span>
                </div>
                <input
                    type="tel"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="flex-1 bg-transparent p-3 text-brand-primary outline-none placeholder:text-gray-400 text-sm"
                    placeholder={placeholder}
                />
            </div>
        </div>
    );

    return (
        <div>
            {showSteps && (
                <div className="flex items-center justify-between mb-8 text-[10px] font-bold uppercase tracking-[2px]">
                    <span className={`${step === 1 ? 'text-brand-gold' : 'text-gray-300'}`}>01 Contact</span>
                    <div className="h-px bg-gray-100 flex-1 mx-4"></div>
                    <span className={`${step === 2 ? 'text-brand-gold' : 'text-gray-300'}`}>02 Details</span>
                    <div className="h-px bg-gray-100 flex-1 mx-4"></div>
                    <span className={`${step === 3 ? 'text-brand-gold' : 'text-gray-300'}`}>03 Payment</span>
                </div>
            )}

            <form onSubmit={step === 3 ? handleSubmit : handleNext} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                {step === 1 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup label="First Name" required value={firstName} onChange={setFirstName} />
                            <InputGroup label="Surname" required value={surname} onChange={setSurname} />
                        </div>
                        <PhoneInput label="Contact Number" required value={phone} onChange={setPhone} />
                        <PhoneInput label="WhatsApp Number" value={whatsapp} onChange={setWhatsapp} placeholder="Please complete if different" />
                        <InputGroup label="Email Address" required type="email" value={email} onChange={setEmail} />
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <InputGroup label="ID Number / Passport Number" required value={idNumber} onChange={setIdNumber} />
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[2px] text-gray-400 mb-2">Gender *</label>
                                <select
                                    className="w-full bg-white border border-gray-200 rounded-sm p-3 text-brand-primary focus:border-brand-gold outline-none text-sm"
                                    value={gender}
                                    onChange={e => setGender(e.target.value)}
                                >
                                    <option value="" className="text-gray-500">Select...</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <InputGroup label="Street Address" required value={street1} onChange={setStreet1} />
                        <InputGroup label="Street Address 2" value={street2} onChange={setStreet2} />
                        <div className="grid grid-cols-2 gap-6">
                            <InputGroup label="City" required value={city} onChange={setCity} />
                            <InputGroup label="Province" required value={province} onChange={setProvince} />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <InputGroup label="Postal Code" required value={postalCode} onChange={setPostalCode} />
                            <div>
                                <label className="block text-[10px] font-bold uppercase tracking-[2px] text-gray-400 mb-2">Country *</label>
                                <div className="w-full bg-gray-50 border border-gray-200 rounded-sm p-3 text-brand-primary opacity-75 cursor-not-allowed text-sm">
                                    South Africa
                                </div>
                            </div>
                        </div>
                        <InputGroup label="Last School Attended" required value={school} onChange={setSchool} />
                        <InputGroup label="Highest Qualification" required value={qualification} onChange={setQualification} />
                    </>
                )}

                {step === 3 && (
                    <>
                        <div className="bg-gray-50 p-6 rounded-sm border border-gray-200 mb-2 shadow-sm">
                            <h4 className="text-brand-primary font-serif font-bold mb-6 border-b border-gray-200 pb-3 text-lg">Person Responsible for Payment</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputGroup label="Sponsor First Name" required value={sponsorFirst} onChange={setSponsorFirst} />
                                <InputGroup label="Sponsor Last Name" required value={sponsorLast} onChange={setSponsorLast} />
                            </div>
                            <div className="mt-4">
                                <InputGroup label="Sponsor ID Number" required value={sponsorId} onChange={setSponsorId} />
                            </div>
                            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputGroup label="Sponsor Email" required type="email" value={sponsorEmail} onChange={setSponsorEmail} />
                                <PhoneInput label="Sponsor Mobile" required value={sponsorMobile} onChange={setSponsorMobile} />
                            </div>
                            <div className="mt-4">
                                <PhoneInput label="Sponsor Phone (Other)" value={sponsorPhone} onChange={setSponsorPhone} />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input type="checkbox" checked={consentPrivacy} onChange={e => setConsentPrivacy(e.target.checked)} className="mt-1 w-4 h-4 rounded border-gray-300 bg-white text-brand-primary focus:ring-brand-gold" />
                                <span className="text-xs text-gray-500 group-hover:text-gray-700 leading-relaxed">
                                    By ticking this box you agree to our <a href="#" className="text-brand-gold font-bold hover:underline">Privacy Policy</a> and our usage of your personal data and further you give us permission to send you information and marketing material about our company and courses.
                                </span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input type="checkbox" checked={consentTerms} onChange={e => setConsentTerms(e.target.checked)} className="mt-1 w-4 h-4 rounded border-gray-300 bg-white text-brand-primary focus:ring-brand-gold" />
                                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider group-hover:text-gray-700">
                                    I Accept the Terms and Conditions*
                                </span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input type="checkbox" checked={consentAge} onChange={e => setConsentAge(e.target.checked)} className="mt-1 w-4 h-4 rounded border-gray-300 bg-white text-brand-primary focus:ring-brand-gold" />
                                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider group-hover:text-gray-700">
                                    I’m older than 16 years old
                                </span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input type="checkbox" checked={consentCost} onChange={e => setConsentCost(e.target.checked)} className="mt-1 w-4 h-4 rounded border-gray-300 bg-white text-brand-primary focus:ring-brand-gold" />
                                <span className="text-xs text-gray-500 font-bold uppercase tracking-wider group-hover:text-gray-700">
                                    Aware this is not a free programme
                                </span>
                            </label>
                        </div>
                    </>
                )}

                <div className="flex justify-between pt-6 border-t border-gray-100 mt-8">
                    {step > 1 ? (
                        <Button type="button" variant="outline" onClick={handlePrev} icon={<ArrowLeft size={16} />}>
                            Previous
                        </Button>
                    ) : <div></div>}

                    <Button type="submit" variant="primary" icon={<ArrowRight size={16} />}>
                        {step === 3 ? submitLabel : 'Next Step'}
                    </Button>
                </div>

                <div className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-300 mt-6">
                    Step {step} of 3
                </div>
            </form>
        </div>
    );
};
