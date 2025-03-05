"use client";

import { icons } from "@/_lib/icons";

export const SliderControls = ({ handleNext, handlePrev }) => {
  return (
    <div className={`flex items-center gap-2 max-md:mr-auto`}>
      <button
        onClick={handlePrev}
        className={`p-1 rounded-full border border-black hover:bg-boa-dark hover:text-white cursor-pointer focus:outline-0 focus:border-white focus:ring-2 focus:ring-boa-dark`}
      >
        {icons?.chevron_left}
      </button>
      <button
        onClick={handleNext}
        className={`p-1 rounded-full border border-black hover:bg-boa-dark hover:text-white cursor-pointer focus:outline-0 focus:border-white focus:ring-2 focus:ring-boa-dark`}
      >
        {icons?.chevron_right}
      </button>
    </div>
  );
};
