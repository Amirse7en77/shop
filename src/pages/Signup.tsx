import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { FC } from "react";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

interface IProps {}

const Signup: FC<IProps> = (props) => {
  
  const formSchema = z.object({
    username: z
      .string()
      .min(6, "Name must be at least 6 characters")
      .max(50, "Name must be less than 50 characters"),
    email: z.string().email("Invalid email address"),
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
  const onSubmit = () => {
    
  
    reset()

  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-center items-center h-[600px]"
      >
        <div className="p-4 border-2 rounded-2xl w-[400px] h-[500px]">
          <h1>Sign Up</h1>
          <div className="text-left  mt-4">
            <p>
              <label>Name</label>
              <Input {...register("username")} placeholder="Name" />
            </p>
            {/* Changed condition to only check for errors.name */}
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div className="text-left mt-4">
            <label>Email</label>
            <Input {...register("email")} placeholder="Email" />
             {/* Changed condition to only check for errors.email */}
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="text-left mt-4">
            <label>Password</label>
            <Input {...register("password")} type="password" placeholder="Password" />
             {/* Changed condition to only check for errors.password */}
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex justify-between mt-10">
          <Button type="submit" >
            {isSubmitting ? "Submitting..." : "Sign Up"}
          </Button>
          <Link  to={'/signin'}>Allready SignUp?</Link>
          </div>
        </div>
      </form>
    </>
  );
};

export default Signup;