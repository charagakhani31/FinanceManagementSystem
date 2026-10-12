import React from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { AuthContext } from '../context/AuthContext';


const Login = () => {


       const { Login } = useContext(AuthContext)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const formHandler = async (e) => {
     e.preventDefault();

       await Login(email, password)
       
    }
  return (
  <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 bg-[#F8FAFC]">

    <div className="w-full max-w-[440px] bg-white rounded-2xl border border-[#EAECF0] shadow-sm px-6 py-8 sm:px-8 sm:py-10">
        
        <div className="flex flex-col items-center text-center mb-8">
            <div className="h-12 w-12 rounded-xl bg-[#101828] flex items-center justify-center text-white font-bold text-xl mb-3 shadow-sm">
                FT
            </div>
            <h2 className="text-black font-bold text-2xl">FinTrack</h2>
            <p className="text-[#667085] text-sm mt-1">Smart finance management for your business</p>
        </div>

        <div className="w-full">
            <div className="mb-6">
                <h2 className="text-[#101828] font-semibold text-xl tracking-tight">Welcome back</h2>
                <p className="text-[#667085] text-sm mt-0.5">Sign in to manage your business finances</p>
            </div>

            <form className="space-y-4" 
            onSubmit={(e) => { formHandler(e) }}>
                <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#667085] mb-1.5">Email address</label>
                    <input 
                        type="email" 
                        value={email}
                        onChange={(e)=> { setEmail(e.target.value) }}
                        placeholder="you@company.com"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#EAECF0] rounded-xl text-[#101828] text-sm placeholder-[#667085]/60 focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all"
                    /> 
                </div>

                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-[#667085]">Password</label>
                    </div>
                    <input 
                        type="password" 
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        placeholder="Enter your password"
                        className="w-full px-3.5 py-2.5 bg-white border border-[#EAECF0] rounded-xl text-[#101828] text-sm placeholder-[#667085]/60 focus:outline-none focus:ring-2 focus:ring-[#10B981]/20 focus:border-[#10B981] transition-all"
                    />
                </div>

                <div className="flex items-center justify-between text-sm py-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input type="checkbox" className="w-4 h-4 rounded border-[#EAECF0] text-[#10B981] focus:ring-[#10B981]/20 accent-[#10B981]" />
                        <span className="text-[#667085]">Remember me</span>
                    </label>
                    <a href="#" className="text-[#10B981] hover:text-[#059669] font-medium transition-colors text-xs sm:text-sm">Forgot password?</a> 
                </div>

                <button 
                    type="submit"
                   
                    className="w-full mt-2 py-3 px-4 bg-[#10B981] hover:bg-[#059669] active:bg-[#047857] text-white font-medium text-sm rounded-xl shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-[#10B981]/20"
                >
                    Sign in
                </button>

                <p className="text-center text-sm text-[#667085] pt-2">
                    Don't have an account? 
                    <a href="#" className="text-[#10B981] hover:text-[#059669] font-medium transition-colors ml-1">Create an account</a>
                </p>
            </form>
        </div>
    </div>
</div>
  )
}

export default Login