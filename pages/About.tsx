import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, ShieldCheck, User, ShoppingBag } from 'lucide-react';

const About: React.FC = () => {
  const { t } = useStore();

  return (
    <div className="flex flex-col items-center justify-center py-10 text-center space-y-6">
      <div className="bg-white p-6 rounded-full shadow-lg mb-4">
        <div className="w-24 h-24 flex items-center justify-center text-primary bg-teal-50 rounded-full">
            <ShoppingBag size={56} />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-800">{t.appTitle}</h2>
        <p className="text-gray-500 max-w-xs mx-auto">{t.aboutDesc}</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 w-full max-w-xs overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <span className="text-gray-500 text-sm">{t.version}</span>
            <span className="font-mono font-bold text-gray-800">v1.0.0</span>
        </div>
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <span className="text-gray-500 text-sm">{t.build}</span>
            <span className="font-mono text-gray-800">2024.05.20</span>
        </div>
        <div className="p-4 bg-teal-50 flex items-center gap-3">
             <User size={20} className="text-primary" />
             <span className="font-medium text-primary">{t.createdBy}</span>
        </div>
      </div>

      <div className="text-xs text-gray-400 mt-10">
        <p className="flex items-center justify-center gap-1">
          Made with <Heart size={12} className="text-red-400 fill-red-400" /> for Small Businesses
        </p>
      </div>
    </div>
  );
};

export default About;