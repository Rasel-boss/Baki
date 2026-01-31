import React, { useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Globe, Download, Upload, Trash, Database, ShoppingBag } from 'lucide-react';

const Settings: React.FC = () => {
  const { t, language, setLanguage, exportData, importData, resetApp } = useStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (importData(result)) {
          alert('Data imported successfully!');
          window.location.reload();
        } else {
          alert('Invalid backup file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile/Logo Header */}
      <div className="flex flex-col items-center justify-center pt-4 pb-2">
        <div className="w-24 h-24 bg-white rounded-full shadow-md flex items-center justify-center text-primary mb-3 border-4 border-teal-50">
            <ShoppingBag size={48} />
        </div>
        <h2 className="text-xl font-bold text-gray-800">{t.settings}</h2>
      </div>

      {/* Language Section */}
      <section className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4 text-primary">
            <Globe size={24} />
            <h3 className="font-semibold">{t.language}</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setLanguage('bn')}
            className={`p-3 rounded-lg border-2 font-medium transition-all ${
              language === 'bn'
                ? 'border-primary bg-teal-50 text-primary'
                : 'border-gray-100 hover:border-gray-300 text-gray-600'
            }`}
          >
            {t.bangla}
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`p-3 rounded-lg border-2 font-medium transition-all ${
              language === 'en'
                ? 'border-primary bg-teal-50 text-primary'
                : 'border-gray-100 hover:border-gray-300 text-gray-600'
            }`}
          >
            {t.english}
          </button>
        </div>
      </section>

      {/* Data Management Section */}
      <section className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-4 text-gray-700">
            <Database size={24} />
            <h3 className="font-semibold">{t.backupRestore}</h3>
        </div>
        <p className="text-sm text-gray-500 mb-4">{t.backupNote}</p>
        
        <div className="space-y-3">
          <button
            onClick={exportData}
            className="w-full flex items-center justify-between p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <span className="font-medium">{t.exportData}</span>
            <Download size={20} />
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-between p-3 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          >
            <span className="font-medium">{t.importData}</span>
            <Upload size={20} />
          </button>
          <input
            type="file"
            accept=".json"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          <div className="border-t border-gray-100 my-2 pt-2"></div>

          <button
            onClick={resetApp}
            className="w-full flex items-center justify-between p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <span className="font-medium">{t.resetData}</span>
            <Trash size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default Settings;