import React from 'react';
import { ACCREDITATION_LOGOS } from '../constants';
import { CheckCircle, Award, Globe, BookOpen, ShieldCheck } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-router-dom';

const LOCAL_BODIES = [
    {
        name: "Department of Higher Education and Training (DHET)",
        description: "The International Hotel School (Pty) Ltd is registered with the Department of Higher Education and Training as a private higher education institution under the Higher Education Act, 1997.",
        details: ["Registration Certificate No. 2000/HE07/005"],
        icon: ShieldCheck
    },
    {
        name: "Council on Higher Education (CHE)",
        description: "Our Higher Education programmes are accredited by the Council on Higher Education (CHE). The CHE is the independent statutory body responsible for quality assurance in higher education.",
        details: ["Quality Assurance", "Programme Accreditation"],
        icon: Award
    },
    {
        name: "CATHSSETA",
        description: "Accredited by the Culture, Art, Tourism, Hospitality, and Sport Sector Education and Training Authority (CATHSSETA) for various skills programmes and learnerships.",
        details: ["Accreditation Number: 613/P/000008/2004"],
        icon: BookOpen
    },
    {
        name: "QCTO",
        description: "Accredited by the Quality Council for Trades and Occupations (QCTO) to offer occupational qualifications.",
        details: ["Occupational Standards", "Trade Qualifications"],
        icon: CheckCircle
    }
];

const INTERNATIONAL_BODIES = [
    {
        name: "American Hotel & Lodging Educational Institute (AHLEI)",
        description: "We are the exclusive license holder for AHLEI in South Africa. AHLEI is widely recognized as the preeminent leader in hospitality certification worldwide.",
        logo: ACCREDITATION_LOGOS['AHLEI']
    },
    {
        name: "Confederation of Tourism and Hospitality (CTH)",
        description: "Our Culinary Arts programmes are endorsed by CTH (UK), ensuring our graduates meet international standards of culinary excellence.",
        logo: ACCREDITATION_LOGOS['CTH']
    },
    {
        name: "Sommet Education",
        description: "As part of Sommet Education, we are linked to Glion Institute of Higher Education and Les Roches, two of the world's top hospitality universities.",
        logo: ACCREDITATION_LOGOS['Sommet Education']
    }
];

export const RegistrationsAccreditations: React.FC = () => {
    return (
        <div className="bg-[#f8fafc] min-h-screen pt-32 pb-20">
            {/* Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="font-serif text-4xl md:text-5xl text-[#002B4E] mb-6">
                        Registrations & <span className="text-[#C2B067] italic">Accreditations</span>
                    </h1>
                    <div className="w-24 h-1 bg-[#C2B067] mx-auto rounded-full mb-8"></div>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Quality assurance is at the heart of everything we do. Our registrations and accreditations ensure that your qualification is recognised, respected, and relevant—both locally and internationally.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
                
                {/* Local Accreditation Section */}
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-full bg-[#002B4E] flex items-center justify-center text-white">
                            <ShieldCheck size={24} />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-[#002B4E]">Regulatory Status & Local Accreditation</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {LOCAL_BODIES.map((body, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-sm shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="mt-1 text-[#C2B067]">
                                        <body.icon size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#002B4E] mb-3">{body.name}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                            {body.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {body.details.map((detail, i) => (
                                                <span key={i} className="text-xs font-bold bg-gray-100 text-gray-600 px-3 py-1 rounded-full uppercase tracking-wide">
                                                    {detail}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* International Recognition Section */}
                <section>
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-12 h-12 rounded-full bg-[#002B4E] flex items-center justify-center text-white">
                            <Globe size={24} />
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-[#002B4E]">International Recognition</h2>
                    </div>

                    <div className="bg-[#002B4E] text-white p-10 md:p-16 rounded-sm relative overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#C2B067] opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
                            {INTERNATIONAL_BODIES.map((body, idx) => (
                                <div key={idx} className={`pt-8 lg:pt-0 ${idx > 0 ? 'lg:pl-12' : ''}`}>
                                    <div className="h-16 mb-6 flex items-center">
                                        <img 
                                            src={body.logo} 
                                            alt={body.name} 
                                            className="max-h-full max-w-[180px] object-contain brightness-0 invert" 
                                        />
                                    </div>
                                    <h3 className="text-xl font-serif font-bold text-[#C2B067] mb-4">{body.name}</h3>
                                    <p className="text-white/70 text-sm leading-relaxed">
                                        {body.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Assurance CTA */}
                <section className="bg-white border border-gray-200 p-10 rounded-sm text-center">
                    <h3 className="text-2xl font-serif font-bold text-[#002B4E] mb-4">Why Accreditation Matters</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                        Accreditation is your guarantee of quality. It ensures that your qualification meets national standards, is recognized by employers, and provides credits that can be transferred to other institutions.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/#offerings">
                            <Button variant="primary" className="w-full sm:w-auto">
                                View Accredited Programmes
                            </Button>
                        </Link>
                        <Link to="/contact">
                            <Button variant="outline" className="w-full sm:w-auto">
                                Contact Admissions
                            </Button>
                        </Link>
                    </div>
                </section>

            </div>
        </div>
    );
};
