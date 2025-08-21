import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { signIn } from 'next-auth/react';
import { FaGithub, FaGoogle } from "react-icons/fa";
import { LogIn } from 'lucide-react';

const Login = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <LogIn size={16} />
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl">Welcome Back</DialogTitle>
          <DialogDescription>
            Sign in to access your account and continue your journey
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <Card className="border-0 bg-muted/50">
            <CardContent className="p-6">
              <div className="grid gap-4">
                <Button
                  variant="outline"
                  className="w-full h-12 text-base"
                  onClick={() => signIn("github", { callbackUrl: "next-portfolio-delta-ebon.vercel.app" })}
                >
                  <FaGithub className="mr-3 h-5 w-5" />
                  Continue with GitHub
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full h-12 text-base"
                  onClick={() => signIn("google", { callbackUrl: "next-portfolio-delta-ebon.vercel.app" })}
                >
                  <FaGoogle className="mr-3 h-5 w-5" />
                  Continue with Google
                </Button>
              </div>
              
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default Login;