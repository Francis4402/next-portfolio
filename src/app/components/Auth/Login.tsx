import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { signIn } from 'next-auth/react';
import { FaGithub, FaGoogle } from "react-icons/fa";

const Login = () => {
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant={"default"}>Login</Button>
        </DialogTrigger>
        <DialogContent>
                <DialogTitle>
                    Please Login
                </DialogTitle>

                <div className="flex justify-center items-center gap-6 my-6">
                    <button
                    className="flex items-center justify-center bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 duration-200 rounded-full p-3 transition"
                    onClick={() => signIn("github", { callbackUrl: "http://localhost:3000" })}
                    >
                        <FaGithub size={32} className="text-gray-900 dark:text-white" />
                    </button>

                    <button
                    className="flex items-center justify-center bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 duration-200 rounded-full p-3 transition"
                    onClick={() => signIn("google", { callbackUrl: "http://localhost:3000" })}
                    >
                        <FaGoogle size={32} className="text-gray-900 dark:text-white" />
                    </button>
                </div>
            </DialogContent>
    </Dialog>
  )
}

export default Login