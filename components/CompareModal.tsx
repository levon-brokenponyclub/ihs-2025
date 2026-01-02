
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
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsCompareOpen(false)} />
            
            <div className="relative bg-white w-full max-w-6xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
                    <h2 className="text-[#002B4E] font-serif font-bold text-xl">Compare Programmes</h2>
                    <button onClick={() => setIsCompareOpen(false)} className="text-gray-400 hover:text-[#002B4E] transition-colors">
                        <X size={24} />
                    </button>
                </div>
                
                <div className="overflow-x-auto custom-scrollbar p-6 bg-white">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr>
                                <th className="p-4 w-48 bg-gray-50 border border-gray-100 text-gray-500 font-bold uppercase tracking-wider text-xs">Features</th>
                                {compareItems.map(item => (
                                    <th key={item.id} className="p-4 bg-white border border-gray-100 w-80 relative align-bottom">
                                        <button onClick={() => removeFromCompare(item.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 z-10">
                                            <X size={16} />
                                        </button>
                                        <div className="h-32 mb-4 rounded-sm overflow-hidden bg-gray-100">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <h3 className="text-[#002B4E] font-bold font-serif text-lg mb-2 leading-tight">{item.title}</h3>
                                        <span className="inline-block bg-[#002B4E]/5 text-[#002B4E] text-[10px] px-2 py-1 rounded-sm uppercase tracking-wider font-bold">
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
                                <td className="p-4 bg-gray-50 border border-gray-100 font-bold text-[#002B4E]">Price</td>
                                {compareItems.map(item => (
                                    <td key={item.id} className="p-4 border border-gray-100 font-bold text-[#002B4E] text-lg">
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
                                <td className="p-4 bg-gray-50 border border-gray-100 font-bold text-[#002B4E]">Accreditations</td>
                                {compareItems.map(item => (
                                    <td key={item.id} className="p-4 border border-gray-100">
                                        <div className="flex flex-wrap gap-1">
                                            {item.accreditations.map((acc, i) => (
                                                <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-sm border border-gray-200">{acc}</span>
                                            ))}
                                        </div>
                                    </td>
                                ))}
                                {compareItems.length < 3 && <td className="border border-gray-100 border-dashed"></td>}
                            </tr>
                            <tr>
                                <td className="p-4 bg-gray-50 border border-gray-100 font-bold text-[#002B4E]"></td>
                                {compareItems.map(item => (
                                    <td key={item.id} className="p-4 border border-gray-100">
                                        <Button variant="primary" className="w-full bg-[#002B4E] text-white hover:bg-[#002B4E]/90" onClick={() => handleAction(item)}>
                                            View Details
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
