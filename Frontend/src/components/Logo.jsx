import { TrendingUp } from "lucide-react"

const Logo = ({ textColor = "text-[#101828]" }) => {
  return ( 
    <div className="flex gap-2 px-3 items-center py-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#10B981] shadow-sm">
            <TrendingUp
              size={24}
              strokeWidth={2.5}
              className="text-white"
            />
          </div>

          <h2 className={`text-lg font-semibold ${textColor} sm:text-xl`}>
            FinTrack
          </h2>
          </div>
  )
}

export default Logo