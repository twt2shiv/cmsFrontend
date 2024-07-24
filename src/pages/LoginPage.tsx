import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "@/features/auth/authSlice";
import { AppDispatch, RootState } from '../store/store';

interface FormValues {
  username: string;
  password: string;
}
const LoginPage :  React.FC= () => {

  const {
    register,
    handleSubmit,
  } = useForm<FormValues>();
  const dispatch: AppDispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.auth);
  
  const onSubmit = (data: FormValues) => {
    dispatch(loginUserAsync(data)).then((response:any)=>{
      if(response.payload?.data?.data?.accessToken){
        window.location.reload()
      }
    })
  };
 
  return (
   <>
    <div className="flex items-center justify-center min-h-screen">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Card className="max-w-sm mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Enter your email and password to login to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" type="text" placeholder="username" required {...register("username")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required {...register("password")} placeholder="password" />
              </div>
              {status === 'failed' && <p className="text-red-600">invalid credentials</p>}
              {status === "loading" ? (
                <Button disabled className="w-full">
                  <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Login
                </Button>
              )}
            </div>
          </CardContent>
         
        </Card>
      </form>
    </div>
   </>
  );
};

export default LoginPage;
