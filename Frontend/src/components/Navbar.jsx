import {
  TrendingUp,
  Menu,
  Search,
  Bell,
  CircleUserRound,
} from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Logo from "./logo.jsx";

const Navbar = () => {

   const [sidebar, setSidebar] = useState(false);


  return (
    <nav className="w-full bg-white border-b border-[#EAECF0]">

      <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-5 lg:px-7">

        <div className="flex items-center gap-2 sm:gap-3">

          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition hover:bg-gray-100 active:scale-95 cursor-pointer"
            aria-label="Open menu"
            onClick={() =>{ setSidebar(!sidebar)
            }}
          >
            <Menu size={23} strokeWidth={2} />
          </button>

          <Logo />
            
        </div>

        <div className="relative hidden w-full max-w-sm flex-1 md:block md:mx-4 lg:mx-8">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]"
          />

          <input
            type="text"
            placeholder="Search transactions"
            className="w-full rounded-lg border border-[#D0D5DD] bg-white py-2.5 pl-10 pr-3 text-sm text-[#101828] placeholder:text-[#98A2B3] outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
          />
        </div>

        <div className="flex shrink-0 items-center gap-1 sm:gap-3">

          <button
            type="button"
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg transition hover:bg-gray-100 active:scale-95"
          >
            <Bell size={22} strokeWidth={2} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#10B981]" />
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-gray-100 sm:px-2"
          >
            <CircleUserRound
              size={28}
              strokeWidth={1.5}
              className="shrink-0 text-[#667085]"
            />

            <div className="hidden text-left sm:block">
              <h3 className="text-sm font-medium text-[#101828]">
                Username
              </h3>
              <p className="text-xs text-[#667085]">
                Role
              </p>
            </div>
          </button>

        </div>
      </div>

      <div className="px-4 pb-3 md:hidden">
        <div className="relative w-full">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#98A2B3]"
          />

          <input
            type="text"
            placeholder="Search transactions"
            className="w-full rounded-lg border border-[#D0D5DD] bg-white py-2.5 pl-10 pr-3 text-sm text-[#101828] placeholder:text-[#98A2B3] outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/20"
          />
        </div>
      </div>
      {sidebar && <Sidebar setSidebar={setSidebar} /> }
    </nav>
  );
};

export default Navbar;

