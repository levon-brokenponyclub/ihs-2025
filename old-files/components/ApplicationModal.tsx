
import React from 'react';
import { X, Check } from 'lucide-react';
import { MultiStepForm } from './ui/MultiStepForm';
import { Button } from './ui/Button';

interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    courseTitle?: string;
}

export const ApplicationModal: React.FC<ApplicationModalProps> = ({ isOpen, onClose, courseTitle }) => {
    const [isSuccess, setIsSuccess] = React.useState(false);

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

    return (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
            
            <div className="relative bg-[#0d1424] w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden border border-white/10 flex flex-col max-h-[90vh]">
                
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#162036]">
                    <div>
                        <span className="text-brand-gold text-xs font-bold uppercase tracking-widest">Application</span>
                        <h3 className="text-white font-serif font-bold">{courseTitle || 'Start Your Journey'}</h3>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 md:p-8 overflow-y-auto">
                    {isSuccess ? (
                         <div className="text-center py-12">
                            <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                                <Check size={40} />
                            </div>
                            <h3 className="text-3xl font-serif text-white mb-4">Application Received!</h3>
                            <p className="text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
                                Thank you for applying. Our admissions team has received your details and will contact you via email/phone within 24 hours.
                            </p>
                            <Button variant="outline" onClick={onClose} className="w-full">
                                Close
                            </Button>
                        </div>
                    ) : (
                        <MultiStepForm onComplete={() => setIsSuccess(true)} />
                    )}
                </div>
            </div>
        </div>
    );
};
