import { Outlet } from "react-router-dom";

const ModelData = () => {
  return (
    <div className="px-8 py-9 text-white w-full h-fit max-h-[80dvh] overflow-y-auto overflow-x-hidden bg-[rgba(0,0,0,0.7)] rounded-xl pointer-events-auto">
      <Outlet />
    </div>
  );
};

export default ModelData;