import { ChevronUp } from "lucide-react";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const ModelData = () => {

  const [isDataVisible, setIsDataVisible] = useState(false);

  return (
    <div className={`px-4 [@media(min-width:1700px)]:px-8 [@media(max-width:1100px)]:pb-30 py-6 [@media(min-width:1700px)]:py-9 text-white w-full h-fit max-h-[80dvh] transition-all overflow-y-auto overflow-x-hidden [@media(max-width:1100px)]:backdrop-blur-[7.5px] bg-[rgba(0,0,0,0.7)] rounded-xl pointer-events-auto  ${isDataVisible ? "[@media(max-width:1100px)]:max-h-[60dvh] [@media(max-width:1100px)]:overflow-y-auto" : "[@media(max-width:610px)]:max-h-62.5 [@media(max-width:1100px)]:max-h-85 [@media(max-width:1100px)]:overflow-y-hidden"}`}>
      <div className="[@media(min-width:1201px)]:hidden flex justify-center">
        <ChevronUp className={`text-[#8C8C8C] w-5 md:w-8 h-auto font-bold ${isDataVisible ? "rotate-180" : ""}`} onClick={() => setIsDataVisible(!isDataVisible)} />
      </div>
      <Outlet />
    </div>
  );
};

export default ModelData;