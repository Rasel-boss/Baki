import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import FloatingButton from '../components/FloatingButton';
import { format, parseISO } from 'date-fns';
import { Trash2, Edit2, Calendar } from 'lucide-react';

const ShopDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { shops, entries, t, deleteShop, deleteEntry } = useStore();

  const shop = shops.find((s) => s.id === id);
  
  // Filter and sort entries (newest first)
  const shopEntries = useMemo(() => {
    return entries
        .filter((e) => e.shopId === id)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [entries, id]);

  const totalDue = shopEntries.reduce((sum, e) => sum + e.total, 0);

  if (!shop) return <div className="p-4">Shop not found</div>;

  const handleDeleteShop = () => {
    if (window.confirm(`${t.confirmDelete} (${shop.name})`)) {
      deleteShop(shop.id);
      navigate('/');
    }
  };

  const handleDeleteEntry = (e: React.MouseEvent, entryId: string) => {
    e.stopPropagation();
    if(window.confirm(t.confirmDelete)) {
        deleteEntry(entryId);
    }
  }

  const handleEditEntry = (e: React.MouseEvent, entryId: string) => {
    e.stopPropagation();
    navigate(`/add-entry/${shop.id}/${entryId}`);
  }

  return (
    <div className="space-y-5">
      {/* Summary Card */}
      <div className="bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl p-5 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-1">{shop.name}</h2>
        <p className="text-teal-100 text-sm mb-4">{shop.type}</p>
        
        <div className="flex justify-between items-end">
            <div>
                <p className="text-teal-200 text-xs uppercase font-semibold">{t.totalDue}</p>
                <p className="text-3xl font-bold mt-1">৳{totalDue.toLocaleString()}</p>
            </div>
            {/* Note: Edit Shop is now available in Home screen, we keep Delete here or could move it there too. Keeping Delete here is fine. */}
            <button 
                onClick={handleDeleteShop}
                className="bg-red-500/20 hover:bg-red-500/40 p-2 rounded-lg text-red-100 transition-colors flex items-center gap-2"
            >
                <Trash2 size={20} />
                <span className="text-sm">{t.delete}</span>
            </button>
        </div>
      </div>

      {/* Entries List */}
      <div>
        <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Calendar size={18} />
            {t.entries}
        </h3>

        {shopEntries.length === 0 ? (
          <div className="text-center text-gray-400 py-10 bg-white rounded-lg border border-dashed">
            {t.noEntries}
          </div>
        ) : (
          <div className="space-y-3">
            {shopEntries.map((entry) => (
              <div
                key={entry.id}
                onClick={() => navigate(`/add-entry/${shop.id}/${entry.id}`)}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 active:bg-gray-50 transition-colors relative"
              >
                <div className="flex justify-between items-start mb-2 border-b border-gray-100 pb-2 mr-16">
                    <span className="font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded text-sm">
                        {format(parseISO(entry.date), 'dd MMM, yyyy')}
                    </span>
                    <span className="font-bold text-secondary text-lg">৳{entry.total}</span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center text-sm mr-8">
                    <div className="bg-blue-50 p-1 rounded">
                        <span className="block text-xs text-gray-500">{t.morning}</span>
                        <span className="font-semibold text-gray-800">{entry.morning}</span>
                    </div>
                    <div className="bg-orange-50 p-1 rounded">
                        <span className="block text-xs text-gray-500">{t.noon}</span>
                        <span className="font-semibold text-gray-800">{entry.noon}</span>
                    </div>
                    <div className="bg-indigo-50 p-1 rounded">
                        <span className="block text-xs text-gray-500">{t.night}</span>
                        <span className="font-semibold text-gray-800">{entry.night}</span>
                    </div>
                </div>

                {/* Visible Edit/Delete Actions */}
                <div className="absolute top-4 right-3 flex flex-col gap-2">
                    <button 
                        onClick={(e) => handleEditEntry(e, entry.id)}
                        className="p-2 text-blue-500 bg-blue-50 rounded-full hover:bg-blue-100 active:scale-90 transition-transform shadow-sm border border-blue-100"
                    >
                        <Edit2 size={16} />
                    </button>
                    <button 
                        onClick={(e) => handleDeleteEntry(e, entry.id)}
                        className="p-2 text-red-500 bg-red-50 rounded-full hover:bg-red-100 active:scale-90 transition-transform shadow-sm border border-red-100"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <FloatingButton onClick={() => navigate(`/add-entry/${shop.id}`)} />
    </div>
  );
};

export default ShopDetails;