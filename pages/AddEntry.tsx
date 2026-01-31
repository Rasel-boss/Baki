import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { format } from 'date-fns';
import { Calculator } from 'lucide-react';

const AddEntry: React.FC = () => {
  const { shopId, entryId } = useParams<{ shopId: string; entryId?: string }>();
  const navigate = useNavigate();
  const { t, addEntry, updateEntry, entries, shops } = useStore();

  const shop = shops.find(s => s.id === shopId);
  const existingEntry = entries.find(e => e.id === entryId);

  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [morning, setMorning] = useState<string>('');
  const [noon, setNoon] = useState<string>('');
  const [night, setNight] = useState<string>('');

  useEffect(() => {
    if (existingEntry) {
      setDate(existingEntry.date);
      setMorning(existingEntry.morning.toString());
      setNoon(existingEntry.noon.toString());
      setNight(existingEntry.night.toString());
    }
  }, [existingEntry]);

  // Auto calculation
  const total = (Number(morning) || 0) + (Number(noon) || 0) + (Number(night) || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shopId) return;

    const entryData = {
      shopId,
      date,
      morning: Number(morning) || 0,
      noon: Number(noon) || 0,
      night: Number(night) || 0,
      total,
    };

    if (existingEntry) {
      updateEntry({ ...entryData, id: existingEntry.id, createdAt: existingEntry.createdAt });
    } else {
      addEntry(entryData);
    }
    navigate(-1);
  };

  if (!shop) return <div>Invalid Shop</div>;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        {existingEntry ? t.edit : t.addEntry} - <span className="text-primary">{shop.name}</span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">{t.date}</label>
          <input
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
          />
        </div>

        <div className="grid grid-cols-1 gap-4">
            <div className="relative">
                <label className="block text-sm font-medium text-blue-600 mb-1">{t.morning}</label>
                <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400 font-bold">৳</span>
                    <input
                        type="number"
                        min="0"
                        value={morning}
                        onChange={(e) => setMorning(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg p-3 pl-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="0"
                    />
                </div>
            </div>

            <div className="relative">
                <label className="block text-sm font-medium text-orange-600 mb-1">{t.noon}</label>
                <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400 font-bold">৳</span>
                    <input
                        type="number"
                        min="0"
                        value={noon}
                        onChange={(e) => setNoon(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg p-3 pl-8 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                        placeholder="0"
                    />
                </div>
            </div>

            <div className="relative">
                <label className="block text-sm font-medium text-indigo-600 mb-1">{t.night}</label>
                <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-400 font-bold">৳</span>
                    <input
                        type="number"
                        min="0"
                        value={night}
                        onChange={(e) => setNight(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg p-3 pl-8 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        placeholder="0"
                    />
                </div>
            </div>
        </div>

        {/* Total Display */}
        <div className="bg-gray-900 text-white p-4 rounded-xl flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
                <Calculator size={20} className="text-gray-400" />
                <span className="text-gray-300 font-medium">{t.total}</span>
            </div>
            <span className="text-2xl font-bold">৳ {total}</span>
        </div>

        <div className="flex gap-3 pt-4">
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 py-3.5 text-gray-600 bg-gray-100 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
                {t.cancel}
            </button>
            <button
                type="submit"
                className="flex-1 py-3.5 bg-primary text-white rounded-xl font-bold shadow-lg shadow-teal-500/30 hover:bg-teal-700 active:scale-95 transition-all"
            >
                {t.save}
            </button>
        </div>
      </form>
    </div>
  );
};

export default AddEntry;