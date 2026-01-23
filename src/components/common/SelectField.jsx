import React from "react";
import { ChevronDown } from "lucide-react";

const SelectField = ({ options, onChange, placeholder }) => {
  return (
    <div className="relative md:w-[50%]">
      <select
        onChange={onChange}
        className="bg-(--black-75) text-white text-[12px] md:text-[14px]
        [@media(min-width:1700px)]:text-[16px] font-medium outline-none border-none
        py-2 pl-4 pr-8 rounded-[8px] appearance-none w-full truncate"
        defaultValue=""
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options?.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute w-4 h-4 right-2 top-1/2 -translate-y-1/2 text-[#8C8C8C]" />
    </div>
  );
};

export default SelectField;
