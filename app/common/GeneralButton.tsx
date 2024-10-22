import React from "react";

const GeneralButton = ({ text, onclick, loaderComponent, loading }: { text: string; onclick?: () => void; loaderComponent?: React.ReactNode; loading?: boolean }) => {
  return (
    <div className="w-full">
      <button type="submit" className="bg-primary flex items-center justify-center rounded-[20px] p-4 text-white py-[10px] px-[24px] w-full font-medium" onClick={onclick}>
        {loading ? loaderComponent : text}
      </button>
    </div>
  );
};

export default GeneralButton;
