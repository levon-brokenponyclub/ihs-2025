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
        const isEcommerce = item.id === '19';

        if (isEcommerce) {
            addToCart(item);
            setIsCompareOpen(false);
        } else {
            navigate(`/course/${item.id}`);
            setIsCompareOpen(false);
        }
    };

    const getAccreditationSrc = (acc: string) => {
        if (acc === 'IHS' || acc === 'International Hotel School') return '/components/assets/logos/ihs-logo-dark.png';
        if (acc === 'AHLEI' || acc.includes('American Hotel')) return '/components/assets/logos/american-hotel-lodging-educational-institute-r6djf1a4jfs1u9sokoij74ckub80bbe63d3o4wvozc.png';
        if (/^https?:\/\//.test(acc) || /\.(svg|png|jpe?g|webp)$/i.test(acc)) return acc;
        return null;
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCompareOpen(false)} />

            <div className="relative bg-white w-full max-w-6xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-brand-primary text-white">
                    <h2 className="font-serif font-bold text-xl">Compare Programmes</h2>
                    <button onClick={() => setIsCompareOpen(false)} className="text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full">
                        <X size={24} />
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