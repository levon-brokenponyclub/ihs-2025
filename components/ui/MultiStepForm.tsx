
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
            <label className="block text-xs uppercase tracking-wider text-brand-muted mb-2">
                {label} {required && '*'}
            </label>
            <input 
                type={type}
                // required={required} // Disabled for testing
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-sm p-3 text-white focus:border-brand-gold outline-none transition-colors placeholder:text-gray-700"
                placeholder={placeholder}
            />
        </div>
    );

    const PhoneInput = ({ label, required = false, value, onChange, placeholder = "" }: any) => (
        <div>
             <label className="block text-xs uppercase tracking-wider text-brand-muted mb-2">
                {label} {required && '*'}
            </label>
            <div className="flex bg-black/20 border border-white/10 rounded-sm overflow-hidden focus-within:border-brand-gold transition-colors">
                <div className="bg-white/5 px-3 flex items-center justify-center border-r border-white/10 gap-1 min-w-[70px]">
                    <span className="text-lg">🇿🇦</span>
                    <span className="text-gray-400 text-sm">+27</span>
                </div>
                <input 
                    type="tel"
                    // required={required} // Disabled for testing
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="flex-1 bg-transparent p-3 text-white outline-none placeholder:text-gray-700"
                    placeholder={placeholder}
                />
            </div>
        </div>
    );

    return (
        <div>
            {showSteps && (
                <div className="flex items-center justify-between mb-8 text-sm">
                    <span className={`font-bold uppercase tracking-widest ${step === 1 ? 'text-brand-gold' : 'text-gray-500'}`}>01 Contact</span>
                    <div className="h-px bg-white/10 flex-1 mx-4"></div>
                    <span className={`font-bold uppercase tracking-widest ${step === 2 ? 'text-brand-gold' : 'text-gray-500'}`}>02 Details</span>
                    <div className="h-px bg-white/10 flex-1 mx-4"></div>
                    <span className={`font-bold uppercase tracking-widest ${step === 3 ? 'text-brand-gold' : 'text-gray-500'}`}>03 Payment</span>
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
                                <label className="block text-xs uppercase tracking-wider text-brand-muted mb-2">Gender *</label>
                                <select 
                                    className="w-full bg-black/20 border border-white/10 rounded-sm p-3 text-white focus:border-brand-gold outline-none"
                                    value={gender}
                                    onChange={e => setGender(e.target.value)}
                                    // required // Disabled for testing
                                >
                                    <option value="" className="text-gray-500">Select...</option>
                                    <option value="Male" className="text-black">Male</option>
                                    <option value="Female" className="text-black">Female</option>
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
                                <label className="block text-xs uppercase tracking-wider text-brand-muted mb-2">Country *</label>
                                <div className="w-full bg-black/20 border border-white/10 rounded-sm p-3 text-white opacity-75 cursor-not-allowed">
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
                        <div className="bg-white/5 p-4 rounded-sm border border-white/10 mb-2">
                             <h4 className="text-white font-bold mb-4 border-b border-white/10 pb-2">Person Responsible for Payment</h4>
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
                                <input type="checkbox" checked={consentPrivacy} onChange={e => setConsentPrivacy(e.target.checked)} className="mt-1 w-4 h-4 rounded border-white/20 bg-black/20 text-brand-gold focus:ring-brand-gold" />
                                <span className="text-xs text-gray-400 group-hover:text-gray-300">
                                    By ticking this box you agree to our <a href="#" className="text-brand-gold hover:underline">Privacy Policy</a> and our usage of your personal data and further you give us permission to send you information and marketing material about our company and courses.
                                </span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input type="checkbox" checked={consentTerms} onChange={e => setConsentTerms(e.target.checked)} className="mt-1 w-4 h-4 rounded border-white/20 bg-black/20 text-brand-gold focus:ring-brand-gold" />
                                <span className="text-xs text-gray-400 group-hover:text-gray-300">
                                    I Accept the Terms and Conditions*
                                </span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input type="checkbox" checked={consentAge} onChange={e => setConsentAge(e.target.checked)} className="mt-1 w-4 h-4 rounded border-white/20 bg-black/20 text-brand-gold focus:ring-brand-gold" />
                                <span className="text-xs text-gray-400 group-hover:text-gray-300">
                                    I’m older than 16 years old
                                </span>
                            </label>
                            <label className="flex items-start gap-3 cursor-pointer group">
                                <input type="checkbox" checked={consentCost} onChange={e => setConsentCost(e.target.checked)} className="mt-1 w-4 h-4 rounded border-white/20 bg-black/20 text-brand-gold focus:ring-brand-gold" />
                                <span className="text-xs text-gray-400 group-hover:text-gray-300">
                                    Aware this is not a free programme
                                </span>
                            </label>
                        </div>
                    </>
                )}

                <div className="flex justify-between pt-4 border-t border-white/10 mt-8">
                    {step > 1 ? (
                        <Button type="button" variant="secondary" onClick={handlePrev} icon={<ArrowLeft size={16} />}>
                            Previous
                        </Button>
                    ) : <div></div>}
                    
                    <Button type="submit" variant="primary" icon={<ArrowRight size={16} />}>
                        {step === 3 ? submitLabel : 'Next'}
                    </Button>
                </div>
                
                <div className="text-center text-xs text-gray-600 mt-2">
                    Step {step}/3
                </div>
            </form>
        </div>
    );
};
