
import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { Button } from './ui/Button';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const CompareModal: React.FC = () => {
    const { isCompareOpen, setIsCompareOpen, compareItems, removeFromCompare } = useCompare();
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        if (isCompareOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; };
    }, [isCompareOpen]);

    if (!isCompareOpen) return null;

    const handleAction = (item: any) => {
        // Only "Purchasing for Food Service Operations" (ID 19) and "Puff Pastry" are Buy Now
        const isEcommerce = ['19', 'puff-pastry'].includes(item.id);

        if (isEcommerce) {
            addToCart(item);
            setIsCompareOpen(false);
        } else {
            navigate(`/course/${item.id}`);
            setIsCompareOpen(false);
        }
    };

    const getAccreditationSrc = (acc: string) => {
        if (acc === 'IHS' || acc === 'International Hotel School') return '/assets/logos/ihs-logo-dark.png';
        if (acc === 'AHLEI' || acc.includes('American Hotel')) return '/assets/logos/american-hotel-lodging-educational-institute-r6djf1a4jfs1u9sokoij74ckub80bbe63d3o4wvozc.png';
        if (/^https?:\/\//.test(acc) || /\.(svg|png|jpe?g|webp)$/i.test(acc)) return acc;
        return null;
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCompareOpen(false)} />

            <div className="relative bg-white w-full max-w-6xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-brand-primary text-white">
                    <h2 className="font-serif font-bold text-xl">Compare Programmes</h2>
                    <button
                        onClick={() => setIsCompareOpen(false)}
                        className="text-white h-[40px] w-[40px] flex items-center justify-center hover:opacity-70 transition-opacity bg-white/10 p-2 rounded-full"
                    >
                        <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
                            <path
                                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
                                style={{
                                    fill: 'none',
                                    stroke: 'white',
                                    strokeWidth: 8,
                                    strokeLinecap: 'round',
                                    transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                                    strokeDasharray: isCompareOpen ? '90 207' : '60 207',
                                    strokeDashoffset: isCompareOpen ? -134 : 0
                                }}
                            />
                            <path
                                d="M 20,50 H 80"
                                style={{
                                    fill: 'none',
                                    stroke: 'white',
                                    strokeWidth: 8,
                                    strokeLinecap: 'round',
                                    transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                                    strokeDasharray: isCompareOpen ? '1 60' : '60 60',
                                    strokeDashoffset: isCompareOpen ? -30 : 0
                                }}
                            />
                            <path
                                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
                                style={{
                                    fill: 'none',
                                    stroke: 'white',
                                    strokeWidth: 8,
                                    strokeLinecap: 'round',
                                    transition: 'stroke-dasharray 600ms cubic-bezier(0.4, 0, 0.2, 1), stroke-dashoffset 600ms cubic-bezier(0.4, 0, 0.2, 1)',
                                    strokeDasharray: isCompareOpen ? '90 207' : '60 207',
                                    strokeDashoffset: isCompareOpen ? -134 : 0
                                }}
                            />
                        </svg>
                    </button>
                </div>

                <div className="overflow-x-auto custom-scrollbar p-6 bg-white">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr>
                                <th className="p-4 w-48 bg-gray-50 border border-gray-100 text-gray-400 font-bold uppercase tracking-[2px] text-[10px]">Programme Features</th>
                                {compareItems.map(item => (
                                    <th key={item.id} className="p-4 bg-white border border-gray-100 w-80 relative group">
                                        <button onClick={() => removeFromCompare(item.id)} className="absolute top-2 right-2 text-gray-300 hover:text-brand-gold transition-colors z-20">
                                            <X size={16} />
                                        </button>
                                        <div className="h-48 mb-4 rounded-sm overflow-hidden bg-gray-100 shadow-inner">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        </div>
                                        <h3 className="line-clamp-2 text-brand-primary font-bold font-serif text-lg mb-2 leading-tight h-12 uppercase">{item.title}</h3>
                                        <span className="inline-block bg-brand-gold/10 text-brand-gold text-[10px] px-2 py-1 rounded-sm uppercase tracking-wider font-bold">
                                            {item.category}
                                        </span>
                                    </th>
                                ))}
                                {compareItems.length < 3 && (
                                    <th className="p-4 border border-gray-100 border-dashed w-80 text-center text-gray-400 bg-gray-50/50">
                                        <div className="h-full flex flex-col items-center justify-center gap-4 min-h-[200px]">
                                            <p className="text-sm font-medium">Add another to compare</p>
                                        </div>
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                            <tr>
                                <td className="p-4 bg-gray-50 border border-gray-100 font-bold text-gray-400 text-[10px] uppercase tracking-[1px]">Tuition (From)</td>
                                {compareItems.map(item => (
                                    <td key={item.id} className="p-4 border border-gray-100 font-bold text-brand-primary text-xl font-serif">
                                        R {item.price?.toLocaleString()}
                                    </td>
                                ))}
                                {compareItems.length < 3 && <td className="border border-gray-100 border-dashed"></td>}
                            </tr>
                            <tr>
                                <td className="p-4 bg-gray-50 border border-gray-100 font-bold text-[#002B4E]">Duration</td>
                                {compareItems.map(item => (
                                    <td key={item.id} className="p-4 border border-gray-100">
                                        {item.duration}
                                    </td>
                                ))}
                                {compareItems.length < 3 && <td className="border border-gray-100 border-dashed"></td>}
                            </tr>
                            <tr>
                                <td className="p-4 bg-gray-50 border border-gray-100 font-bold text-[#002B4E]">Qualification</td>
                                {compareItems.map(item => (
                                    <td key={item.id} className="p-4 border border-gray-100">
                                        {item.qualification}
                                    </td>
                                ))}
                                {compareItems.length < 3 && <td className="border border-gray-100 border-dashed"></td>}
                            </tr>
                            <tr>
                                <td className="p-4 bg-gray-50 border border-gray-100 font-bold text-[#002B4E]">Start Date</td>
                                {compareItems.map(item => (
                                    <td key={item.id} className="p-4 border border-gray-100">
                                        {item.startDate}
                                    </td>
                                ))}
                                {compareItems.length < 3 && <td className="border border-gray-100 border-dashed"></td>}
                            </tr>
                            <tr>
                                <td className="p-4 bg-gray-50 border border-gray-100 font-bold text-[#002B4E]">Programme Type</td>
                                {compareItems.map(item => (
                                    <td key={item.id} className="p-4 border border-gray-100">
                                        <ul className="list-disc list-inside">
                                            {item.programmeTypes.map((t, i) => (
                                                <li key={i}>{t}</li>
                                            ))}
                                        </ul>
                                    </td>
                                ))}
                                {compareItems.length < 3 && <td className="border border-gray-100 border-dashed"></td>}
                            </tr>
                            <tr>
                                <td className="p-4 bg-gray-50 border border-gray-100 font-bold text-gray-400 text-[10px] uppercase tracking-[1px]">Accreditations</td>
                                {compareItems.map(item => (
                                    <td key={item.id} className="p-4 border border-gray-100">
                                        <div className="flex flex-wrap gap-3">
                                            {item.accreditations.map((acc, i) => {
                                                const src = getAccreditationSrc(acc);
                                                return src ? (
                                                    <img key={i} src={src} alt={acc} className="h-8 w-auto object-contain opacity-80" />
                                                ) : (
                                                    <span key={i} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-1 rounded-sm border border-gray-200">{acc}</span>
                                                );
                                            })}
                                        </div>
                                    </td>
                                ))}
                                {compareItems.length < 3 && <td className="border border-gray-100 border-dashed"></td>}
                            </tr>
                            <tr>
                                <td className="p-4 bg-gray-50 border border-gray-100"></td>
                                {compareItems.map(item => (
                                    <td key={item.id} className="p-4 border border-gray-100">
                                        <Button variant="gold" className="w-full py-4 tracking-[1px]" onClick={() => handleAction(item)}>
                                            View Programme
                                        </Button>
                                    </td>
                                ))}
                                {compareItems.length < 3 && <td className="border border-gray-100 border-dashed"></td>}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
