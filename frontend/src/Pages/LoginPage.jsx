import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { MessageSquare , Eye, Loader2 ,Mail, EyeOff , User} from 'lucide-react';
import {Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from 'react-hot-toast';
const LoginPage = () => {
  const {isloggingIn , login} = useAuthStore();
   
  const [showPassword , setShowPassword] = useState(false);
  const [forme , setForme] = useState({
    email : "",
    password : ""
  })
  const validationForme = () => {
    if(!forme.email.trim()) return toast.error("Email is required");
    if(!forme.password.trim()) return toast.error("Password is required");
    if (!/\S+@\S+\.\S+/.test(forme.email)) return toast.error("Invalid email forme");
    if (forme.password.length < 6) return toast.error("Password must at least 6 characters");
    return true;
  }

  const handleSubmit  = (e) => {
    e.preventDefault();
    const succesCase  = validationForme();
    if(succesCase === true){
      login(forme);
    }
  }
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/*leftSide*/}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>

        <div className='w-full max-w-md space-y-8 '>
          <div className='text-center mb-8'>
            <div className='flex flex-col items-center gap-2 group'>
              <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center 
                group-hover:bg-primary/20 transition-colors'>

                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className='text-2xl font-bold mt-2'>Welcome Back</h1>
              <p className='text-base-content/50'>Sign in to your account</p>

            </div>


          </div>
          <form onSubmit={(e) => { handleSubmit(e) }} className='space-y-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-meduim'>Email</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10'>
                  <User className="size-5 text-base-content/40  " />
                </div>
                <input type="text"
                  className={'input input-bordered w-full pl-10'}
                  placeholder='Yasser@email.com'
                  value={forme.email}
                  onChange={(e) => setForme({ ...forme, email: e.target.value })} />
              </div>
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-meduim'>Password</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-20'>
                  <Mail className="size-5 text-base-content/40  " />
                </div>
                <input type={showPassword ? "password" : "text"}
                  className={'input input-bordered w-full pl-10'}
                  placeholder='Yasser Gombra'
                  value={forme.password}
                  onChange={(e) => setForme({ ...forme, password: e.target.value })} />
                <button type='button' className='right-0  absolute items-center inset-y-0 pr-3 z-30' onClick={() => { setShowPassword(!showPassword) }}>
                  {showPassword ? <Eye className='size-5 text-base-content/40' /> : <EyeOff className="size-5 text-base-content/40" />}
                </button>

              </div>
            </div>
            <button type='submit' className='btn btn-primary w-full' disabled={isloggingIn}>
              {isloggingIn ? (
                <>
                  <Loader2 className='size-5 animate-spin' />
                  Loading ...
                </>
              ) : (
                "Sign in"
              )
              }
            </button>
          </form>
          <div className='text-center'>
            <p className='text-base-content/60'>
              Dont have a account ? {" "}
              <Link to="/signup" className='link link-primary'>Log in </Link>

            </p>
          </div>
        </div>
      </div>
      {/*RightSide*/}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />


    </div>
  )
}

export default LoginPage