import React from 'react';

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  primary?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick, primary = false }) => {
  const baseClasses = "w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300";
  const primaryClasses = "bg-accent text-navy-dark hover:bg-accent-light hover:shadow-lg backdrop-blur-sm";
  const secondaryClasses = "bg-navy/50 text-white hover:bg-navy-light/50 border border-white/10 hover:border-accent/30 backdrop-blur-sm";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses}`}
    >
      {label}
    </button>
  );
};

export default ActionButton;