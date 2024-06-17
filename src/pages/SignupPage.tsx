import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { signupUserAsync } from "@/features/auth/authSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from '../store/store';
const schema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9]+$/, {
    message: "Username can only include letters and numbers. Please remove any special characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  fullName: z.string().regex(/^[a-zA-Z\s]+$/, {
    message: "Full name must contain only alphabetic characters and spaces",
  }),
  password: z.string().regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\S+$).{8,20}$/, {
    message: "Password must be 8-20 characters long and include at least one lowercase letter, one uppercase letter, one numeric digit, and one special character. It must not contain any spaces.",
  }),
});
type FormData = z.infer<typeof schema>;
const SignupPage :  React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { status, error,signup } = useSelector((state: RootState) => state.auth);


  const onSubmit = (data: FormData) => {
    dispatch(signupUserAsync(data));
  };
  useEffect(() => {
    
    if (signup) {
      console.log("signup")
      navigate("/login");
      toast.success("signup successfull")
    }
  }, [dispatch,signup]);
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card className="w-full max-w-md w-[500px]">
            <CardHeader>
              <CardTitle className="text-2xl">Sign Up</CardTitle>
              <CardDescription>Create your account to get started.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="John Doe" {...register("fullName")} />
                {errors.fullName && <span className="text-[13px] text-red-500">{errors.fullName.message}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" placeholder="Username" {...register("username")} />
                {errors.username && <span className="text-[13px] text-red-500">{errors.username.message}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="example@gmail.com" {...register("email")} />
                {errors.email && <span className="text-[13px] text-red-500">{errors.email.message}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="password" {...register("password")} />
                {errors.password && <span className="text-[13px] text-red-500">{errors.password.message}</span>}
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-3">
              {status === "loading" ? (
                <Button disabled className="w-full">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="w-full">Sign Up</Button>
              )}
              {status === 'failed' && <p>{error}</p>}
            </CardFooter>
            <div className="py-3 flex justify-center">
              <p>
                Already have an account ?{" "}
                <Link to={"/login"} className="text-blue-500">
                  Login
                </Link>
              </p>
            </div>
          </Card>
        </form>
      </div>
    </>
  );
};

export default SignupPage;
