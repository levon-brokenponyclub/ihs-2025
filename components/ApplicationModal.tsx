
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
            <div className="absolute inset-0 bg-brand-primary/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-slideUp">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-brand-primary text-white">
                    <div>
                        <span className="text-brand-gold text-[10px] font-bold uppercase tracking-[2px] mb-1 block">Application</span>
                        <h3 className="font-serif font-bold text-xl">{courseTitle || 'Start Your Journey'}</h3>
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
                            <h3 className="text-3xl font-serif text-brand-primary mb-4 font-bold">Application Received!</h3>
                            <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                                Thank you for applying. Our admissions team has received your details and will contact you via email/phone within 24 hours.
                            </p>
                            <Button variant="outline" onClick={onClose} className="w-full py-4">
                                Close Window
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
