import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";


const Register = () => {

   const { register } =  useContext(AuthContext)

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const formHandler = async (e) => {
      e.preventDefault();

    if (password !== confirmPassword) {
        alert("Confirm password does not match");
        return;
    }

      await register(fullName, email, password)
    }
 
return (
  <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-4 py-10">
    <div className="w-full max-w-md bg-white border border-[#EAECF0] rounded-2xl shadow-sm px-5 py-8 sm:px-8">

      <div className="flex items-center justify-center gap-3 mb-8">
        <div className="h-12 w-12 shrink-0 rounded-xl bg-[#10B981] flex items-center justify-center shadow-sm">
      <TrendingUp size={26} strokeWidth={2.5} className="text-white" />
      </div>
        <div>
          <h2 className="text-2xl font-bold text-[#101828]">
            FinTrack
          </h2>
          <p className="text-[#667085] text-sm mt-0.5">
            Create your account
          </p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[#101828]">
          Create an account
        </h2>
        <p className="text-sm text-[#667085] mt-1">
          Start managing your business finances.
        </p>
      </div>

      <form className="space-y-4"
        onSubmit={(e)=> { formHandler(e); }}>
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-[#344054] mb-1.5"
          >
            Full name
          </label>
          <input
            type="text"
            placeholder="Enter your full name"
            required
            value={fullName}
            onChange={(e)=> { setFullName(e.target.value) }}
            className="w-full border border-[#D0D5DD] rounded-lg px-3.5 py-2.5 text-sm text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981]"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#344054] mb-1.5"
          >
            Email address
          </label>
          <input
            type="email"
            placeholder="you@company.com"
            required
             value={email}
            onChange={(e)=> { setEmail(e.target.value) }}
            className="w-full border border-[#D0D5DD] rounded-lg px-3.5 py-2.5 text-sm text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981]"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-[#344054] mb-1.5"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Create a password"
            required
            minLength={8}
             value={password}
            onChange={(e)=> { setPassword(e.target.value) }}
            className="w-full border border-[#D0D5DD] rounded-lg px-3.5 py-2.5 text-sm text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981]"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-[#344054] mb-1.5"
          >
            Confirm password
          </label>
          <input
            type="password"
            placeholder="Re-enter your password"
            required
             value={confirmPassword}
            onChange={(e)=> { setConfirmPassword(e.target.value) }}
            className="w-full border border-[#D0D5DD] rounded-lg px-3.5 py-2.5 text-sm text-[#101828] placeholder:text-[#98A2B3] focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981]"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg bg-[#10B981] hover:bg-[#059669] active:bg-[#047857] text-white font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:ring-offset-2"
        >
          Create account
        </button>

        <p className="text-center text-sm text-[#667085] pt-2">
          Already have an account?
         <Link  className="text-[#059669] hover:text-[#047857] font-medium ml-1" to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  </div>

  )
}

export default Register