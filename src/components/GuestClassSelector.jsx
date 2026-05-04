import React from 'react';

const GuestClassSelector = ({ guestData, onChange, onClose }) => {
  const updateCount = (type, value) => {
    onChange({ ...guestData, [type]: value });
  };

  const updateClass = (className) => {
    onChange({ ...guestData, cabinClass: className });
  };

  const adultOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const childrenOptions = [0, 1, 2, 3, 4, 5, 6];
  const infantOptions = [0, 1, 2, 3, 4, 5, 6];

  const travelClasses = ['Economy/Premium Economy', 'Premium Economy', 'Business', 'First Class'];

  return (
    <div className="p-6 md:p-8 w-full animate-in fade-in zoom-in duration-300 bg-white">
      
      {/* Adults */}
      <div className="mb-6">
        <h4 className="font-bold text-gray-700 text-[13px] tracking-wide mb-1">ADULTS (12y +)</h4>
        <p className="text-[12px] text-gray-400 mb-3">on the day of travel</p>
        <div className="flex items-center flex-wrap gap-y-2">
          <div className="flex border border-gray-200 rounded-[4px] overflow-hidden">
            {adultOptions.map((num) => (
              <button
                key={num}
                onClick={() => updateCount('adults', num)}
                className={`w-[38px] h-[38px] flex items-center justify-center text-[14px] font-bold border-r border-gray-200 last:border-r-0 transition-colors
                  ${guestData.adults === num ? 'bg-[#008cff] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            onClick={() => updateCount('adults', 10)}
            className={`w-[38px] h-[38px] ml-2 border border-gray-200 rounded-[4px] flex items-center justify-center text-[14px] font-bold transition-colors
              ${guestData.adults > 9 ? 'bg-[#008cff] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            &gt;9
          </button>
        </div>
      </div>

      {/* Children & Infants Row */}
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Children */}
        <div>
          <h4 className="font-bold text-gray-700 text-[13px] tracking-wide mb-1">CHILDREN (2y - 12y )</h4>
          <p className="text-[12px] text-gray-400 mb-3">on the day of travel</p>
          <div className="flex items-center flex-wrap gap-y-2">
            <div className="flex border border-gray-200 rounded-[4px] overflow-hidden">
              {childrenOptions.map((num) => (
                <button
                  key={num}
                  onClick={() => updateCount('children', num)}
                  className={`w-[38px] h-[38px] flex items-center justify-center text-[14px] font-bold border-r border-gray-200 last:border-r-0 transition-colors
                    ${guestData.children === num ? 'bg-[#008cff] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  {num}
                </button>
              ))}
            </div>
            <button
              onClick={() => updateCount('children', 7)}
              className={`w-[38px] h-[38px] ml-2 border border-gray-200 rounded-[4px] flex items-center justify-center text-[14px] font-bold transition-colors
                ${guestData.children > 6 ? 'bg-[#008cff] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              &gt;6
            </button>
          </div>
        </div>

        {/* Infants */}
        <div>
          <h4 className="font-bold text-gray-700 text-[13px] tracking-wide mb-1">INFANTS (below 2y)</h4>
          <p className="text-[12px] text-gray-400 mb-3">on the day of travel</p>
          <div className="flex items-center flex-wrap gap-y-2">
            <div className="flex border border-gray-200 rounded-[4px] overflow-hidden">
              {infantOptions.map((num) => (
                <button
                  key={num}
                  onClick={() => updateCount('infants', num)}
                  className={`w-[38px] h-[38px] flex items-center justify-center text-[14px] font-bold border-r border-gray-200 last:border-r-0 transition-colors
                    ${guestData.infants === num ? 'bg-[#008cff] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  {num}
                </button>
              ))}
            </div>
            <button
              onClick={() => updateCount('infants', 7)}
              className={`w-[38px] h-[38px] ml-2 border border-gray-200 rounded-[4px] flex items-center justify-center text-[14px] font-bold transition-colors
                ${guestData.infants > 6 ? 'bg-[#008cff] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              &gt;6
            </button>
          </div>
        </div>
      </div>

      {/* Travel Class */}
      <div className="mb-10">
        <h4 className="font-bold text-gray-700 text-[13px] tracking-wide mb-3">CHOOSE TRAVEL CLASS</h4>
        <div className="flex flex-wrap border border-gray-200 rounded-[4px] overflow-hidden w-fit">
          {travelClasses.map((cls) => {
            const isSelected = guestData.cabinClass === cls || (guestData.cabinClass === 'Economy' && cls === 'Economy/Premium Economy');
            return (
              <button
                key={cls}
                onClick={() => updateClass(cls)}
                className={`px-4 py-2.5 text-[13px] font-medium border-r border-gray-200 last:border-r-0 transition-colors
                  ${isSelected ? 'bg-[#008cff] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                {cls}
              </button>
            );
          })}
        </div>
      </div>

      {/* Apply Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={onClose}
          className="bg-[#008cff] hover:bg-blue-600 text-white px-10 py-2.5 rounded-full font-bold text-[14px] tracking-wide transition-colors shadow-md active:scale-95"
        >
          APPLY
        </button>
      </div>
    </div>
  );
};

export default GuestClassSelector;
