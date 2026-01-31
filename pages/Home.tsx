import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ChevronRight, Pencil } from 'lucide-react';
import FloatingButton from '../components/FloatingButton';
import { Shop } from '../types';

const Home: React.FC = () => {
  const { shops, t, addShop, updateShop, deleteShop, entries } = useStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShop, setEditingShop] = useState<Shop | null>(null);
  
  // Form State
  const [shopName, setShopName] = useState('');
  const [shopType, setShopType] = useState('');

  const openAddModal = () => {
    setEditingShop(null);
    setShopName('');
    setShopType('');
    setIsModalOpen(true);
  };

  const openEditModal = (shop: Shop, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingShop(shop);
    setShopName(shop.name);
    setShopType(shop.type);
    setIsModalOpen(true);
  };

  const handleDeleteShop = (shop: Shop, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`${t.confirmDelete} (${shop.name})`)) {
      deleteShop(shop.id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (shopName.trim()) {
      if (editingShop) {
        updateShop(editingShop.id, shopName, shopType);
      } else {
        addShop(shopName, shopType);
      }
      setIsModalOpen(false);
    }
  };

  // Helper to calculate total due for a shop
  const getShopTotal = (shopId: string) => {
    return entries
      .filter(e => e.shopId === shopId)
      .reduce((sum, e) => sum + e.total, 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-700">{t.shops}</h2>
        <span className="text-sm bg-gray-200 text-gray-700 px-2 py-1 rounded-full">{shops.length}</span>
      </div>

      {shops.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white rounded-lg shadow-sm p-6 text-center border border-dashed border-gray-300">
          <ShoppingBag size={48} className="mb-3 opacity-50" />
          <p>{t.noShops}</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {shops.map((shop) => (
            <div
              key={shop.id}
              onClick={() => navigate(`/shop/${shop.id}`)}
              className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 relative group hover:shadow-md transition-shadow cursor-pointer active:bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="bg-teal-50 p-3 rounded-full text-primary">
                      <ShoppingBag size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg">{shop.name}</h3>
                    <p className="text-xs text-gray-500">{shop.type || 'General Shop'}</p>
                  </div>
                </div>
                
                <div className="text-right">
                   <p className="text-xs text-gray-400">{t.totalDue}</p>
                   <p className="font-bold text-secondary text-lg">৳{getShopTotal(shop.id)}</p>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex justify-end items-center gap-2 mt-4 pt-3 border-t border-gray-100">
                <button 
                  onClick={(e) => openEditModal(shop, e)}
                  className="p-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 active:scale-95 transition-all flex items-center gap-1 text-sm font-medium"
                >
                  <Pencil size={16} />
                  {t.edit}
                </button>
                <button 
                  onClick={(e) => handleDeleteShop(shop, e)}
                  className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 active:scale-95 transition-all flex items-center gap-1 text-sm font-medium"
                >
                  <Trash2 size={16} />
                  {t.delete}
                </button>
                <div className="w-px h-4 bg-gray-200 mx-1"></div>
                <div className="text-primary flex items-center gap-1 text-sm font-medium">
                  Open <ChevronRight size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <FloatingButton onClick={openAddModal} />

      {/* Add/Edit Shop Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-4">
              {editingShop ? t.edit : t.addShop}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.shopName}</label>
                  <input
                    type="text"
                    required
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder={t.shopName}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.shopType}</label>
                  <input
                    type="text"
                    value={shopType}
                    onChange={(e) => setShopType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder={t.shopTypePlaceholder}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 text-gray-600 bg-gray-100 rounded-lg font-medium hover:bg-gray-200"
                  >
                    {t.cancel}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 bg-primary text-white rounded-lg font-medium hover:bg-teal-700"
                  >
                    {editingShop ? t.update : t.create}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;