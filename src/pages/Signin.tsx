import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signinApi } from "@/services/authServices";
import { getUser } from "@/slice/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

interface IProps {};

const Signin: FC<IProps> = (props) => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
      const formSchema = z.object({
        username: z
          .string()
          .min(6, "Name must be at least 6 characters")
          .max(50, "Name must be less than 50 characters"),
        
        password: z
          .string()
          .min(8, "Password must be at least 8 characters")
         
      });
     const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }, // Removed touchedFields here
      } = useForm({
        resolver: zodResolver(formSchema),
        mode:"onTouched"
      });
    const handleLogin=async ({username,password})=>{
        try {
            const response = await fetch('https://dummyjson.com/user/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                username: username,
                password: password,
                expiresInMins: 30,
              }),
            });
        
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
        
            const data = await response.json();
            dispatch(getUser(data))
            navigate('/')
            console.log(data);

          
          } catch (error) {
            console.error('Error:', error);
          }
          
        }
        


    
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <form onSubmit={handleSubmit(handleLogin)} className="flex justify-center items-center h-[500px]">
            <div className="p-4 border-2 rounded-2xl w-[400px] h-[300px]">
                <h1 className="text-xl font-bold mb-6">Sign In</h1>
                
                <div className="text-left mt-4">
                    <label className="block mb-2 text-sm font-medium">Email</label>
                    <Input {...register('username')} placeholder="UserName" />
                    {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
                </div>
                
                <div className="text-left mt-4 relative">
                    <label className="block mb-2 text-sm font-medium">Password</label>
                    <div className="relative">
                        <Input 
                        {...register('password')}
                            placeholder="Password" 
                            type={isVisible ? 'text' : 'password'}
                            className="pr-10" // Add right padding for the button
                        />
                        <Button 
                            type="button"
                            onClick={toggleVisibility}
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-2 hover:bg-transparent"
                        >
                            {isVisible ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M10 14l2 2m0 0l2-2m-2 2V10m0 4.828L9.172 14M4 4l3 3m13-3l-3 3m0 0l-3-3m3 3v3m0 0l3 3"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                    />
                                </svg>
                            )}
                        </Button>
                        {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
                    </div>
                </div>

                <div className="flex justify-between mt-10 items-center">
                    <Button type="submit" className="px-8">Log In</Button>
                    <Link 
                        to="/signup" 
                        className="text-sm text-primary hover:underline"
                    >
                        Don't have an account?
                    </Link>
                </div>
            </div>
        </form>
    );
};

export default Signin;