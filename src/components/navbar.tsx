import React from "react";
import { cn } from "../utils/cn";
import { Search, Shirt, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFilterStore } from "../store/filters";

interface Props {
  className?: string;
}

export const Navbar: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();
  const search = useFilterStore((state) => state.search);
  const setSearch = useFilterStore((state) => state.setSearch);

  return (
    <div className={cn("flex items-center justify-between p-4", className)}>
      <div
        className="flex items-center justify-center gap-1 font-bold text-[2rem] cursor-pointer"
        onClick={() => navigate("/")}
      >
        <Shirt color="#FE5F00" size={48} />
        <span className="text-[#FE5F00]">Fake</span>Store
      </div>
      <div className="flex-1 mx-10 relative">
        <Search className="absolute left-2 top-1/2 translate-y-[-50%] text-gray-500" />
        <input
          className="bg-[#f6f6f6] outline-none w-full p-3 rounded-lg pl-10"
          type="search"
          placeholder="hello"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="border border-[#FE5F00] rounded-lg p-2">
          Войти
        </button>
        <button className="border border-[#FE5F00] rounded-lg p-2">
          <ShoppingCart />
        </button>
      </div>
    </div>
  );
};
