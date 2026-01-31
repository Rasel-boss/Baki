import React from 'react';
import { Plus } from 'lucide-react';

interface Props {
  onClick: () => void;
}

const FloatingButton: React.FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-20 right-4 bg-primary text-white p-4 rounded-full shadow-lg hover:bg-teal-700 active:scale-95 transition-all duration-200 flex items-center justify-center z-30"
    >
      <Plus size={28} />
    </button>
  );
};

export default FloatingButton;