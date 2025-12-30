
import React, { useEffect } from 'react';
import { X, Check, Minus } from 'lucide-react';
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
         const isEcommerce = item.programmeTypes.some((type: string) => 
            ['Online Learning', 'Part Time Learning'].includes(type)
        );
        
        if (isEcommerce) {
            addToCart(item);
            setIsCompareOpen(false);
        } else {
             navigate(`/course/${item.id}`);
             setIsCompareOpen(false);
        }
    };

    return (
         <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsCompareOpen(false)} />
            
            <div className="relative bg-[#0d1424] w-full max-w-6xl rounded-lg shadow-2xl overflow-hidden border border-white/10 flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#162036]">
                    <h2 className="text-white font-serif font-bold text-xl">Compare Programmes</h2>
                    <button onClick={() => setIsCompareOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="overflow-x-auto custom-scrollbar p-6">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr>
                                <th className="p-4 w-48 bg-white/5 border border-white/10 text-gray-400 font-medium"></th>
                                {compareItems.map(item => (
                                    <th key={item.id} className="p-4 bg-black/20 border border-white/10 w-80 relative">
                                        <button onClick={() => removeFromCompare(item.id)} className="absolute top-2 right-2 text-gray-500 hover:text-red-500 z-10">
                                            <X size={16} />
                                        </button>
                                        <div className="h-32 mb-4 rounded-sm overflow-hidden">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <h3 className="text-white font-bold font-serif text-lg mb-2">{item.title}</h3>
                                        <span className="inline-block bg-brand-gold/10 text-brand-gold text-xs px-2 py-1 rounded-sm uppercase tracking-wider font-bold">
                                            {item.category}
                                        </span>
                                    </th>
                                ))}
                                {compareItems.length < 3 && (
                                    <th className="p-4 border border-white/10 border-dashed w-80 text-center text-gray-600 bg-white/[0.02]">
                                        <div className="h-full flex flex-col items-center justify-center gap-4 min-h-[200px]">
                                            <p className="text-sm">Add another to compare</p>
                                        </div>
                                    </th>
                                )}
                            </tr>
                        </thead>
                        <tbody className="text-gray-300 text-sm">
                            <tr>
                                <td className="p-4 bg-white/5 border border-white/10 font-bold text-white">Price</td>
                                {compareItems.map(item => (
                                    <td key={item.id} className="p-4 border border-white/10 font-bold text-brand-gold text-lg">
                                        R {item.price?.toLocaleString()}
                                    </td>
                                ))}
                                {compareItems.length < 3 && <td className="border border-white/10 border-dashed"></td>}
                            </tr>
                            <tr>
                                <td className="p-4 bg-white/5 border border-white/10 font-bold text-white">Duration</td>
                                {compareItems.map(item => (
                                    <td key={item.id} className="p-4 border border-white/10">
                                        {item.duration}
                                    </td>
                                ))}
                                {compareItems.length < 3 && <td className="border border-white/10 border-dashed"></td>}
                            </tr>
                            <tr>
                                <td className="p-4 bg-white/5 border border-white/10 font-bold text-white">Qualification</td>
                                {compareItems.map(item => (
                                    <td key={item.id} className="p-4 border border-white/10">
                                        {item.qualification}
                                    </td>
                                ))}
                                {compareItems.length < 3 && <td className="border border-white/10 border-dashed"></td>}
                            </tr>
                            <tr>
                                <td className="p-4 bg-white/5 border border-white/10 font-bold text-white">Start Date</td>
                                {compareItems.map(item => (
                                    <td key={item.id} className="p-4 border border-white/10">
                                        {item.startDate}
                                    </td>
                                ))}
                                {compareItems.length < 3 && <td className="border border-white/10 border-dashed"></td>}
                            </tr>
                            <tr>
                                <td className="p-4 bg-white/5 border border-white/10 font-bold text-white">Programme Type</td>
                                {compareItems.map(item => (
                                    <td key={item.id} className="p-4 border border-white/10">
                                        <ul className="list-disc list-inside">
                                            {item.programmeTypes.map((t, i) => (
                                                <li key={i}>{t}</li>
                                            ))}
                                        </ul>
                                    </td>
                                ))}
                                {compareItems.length < 3 && <td className="border border-white/10 border-dashed"></td>}
                            </tr>
                            <tr>
                                <td className="p-4 bg-white/5 border border-white/10 font-bold text-white">Accreditations</td>
                                {compareItems.map(item => (
                                    <td key={item.id} className="p-4 border border-white/10">
                                        <div className="flex flex-wrap gap-1">
                                            {item.accreditations.map((acc, i) => (
                                                <span key={i} className="text-xs bg-white/10 px-2 py-1 rounded-sm">{acc}</span>
                                            ))}
                                        </div>
                                    </td>
                                ))}
                                {compareItems.length < 3 && <td className="border border-white/10 border-dashed"></td>}
                            </tr>
                            <tr>
                                <td className="p-4 bg-white/5 border border-white/10 font-bold text-white"></td>
                                {compareItems.map(item => (
                                    <td key={item.id} className="p-4 border border-white/10">
                                        <Button variant="primary" className="w-full" onClick={() => handleAction(item)}>
                                            View Details
                                        </Button>
                                    </td>
                                ))}
                                {compareItems.length < 3 && <td className="border border-white/10 border-dashed"></td>}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
         </div>
    )
}
