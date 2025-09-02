/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { signOut } from "next-auth/react"
import Login from "./Auth/Login"
import { Button } from "@/components/ui/button"
import { File, LayoutDashboard, LogOut, User } from "lucide-react"
import { Separator } from "@/components/ui/separator"




const Navbar = () => {

    const {data: session} = useSession();

    const PDFFileURL = 'https://next-portfolio-delta-ebon.vercel.app/functionalsample.pdf'

    
    const handeDownload = (url: any) => {
        const filename = url.split('/').pop();
          const aTag = document.createElement('a')
          aTag.href = url
          aTag.setAttribute('download', filename)
        document.body.appendChild(aTag)
        aTag.click()
        aTag.remove();
    }
    

  return (
    <div className="justify-center flex text-white">
        <div className="container">
            <div className="justify-between flex items-center md:text-lg text-white text-base md:py-10 py-6 md:px-0 px-5">
                <Link href={'/'} className="flex items-center gap-2">
                    <Image src={'/icons/logo.svg'} alt="logo" width={50} height={50} />
                    <p className='text-white text-[18px] font-bold cursor-pointer flex'>
                        Francis &nbsp;
                        <span className='sm:block hidden'>| Portfolio</span>
                    </p>
                </Link>

                <div className='flex justify-center items-center text-center md:gap-10 gap-4 capitalize list-none'>
                    <div className="md:flex gap-5 hidden">
                        <Link href={'/projects'} className="flex items-center gap-2">Projects</Link>
                        <Link href={'/blogs'} className="flex items-center gap-2">Blogs</Link>
                        {session ? (<Button onClick={() => handeDownload(PDFFileURL)} variant={"default"} className="bg-orange-600 text-white"><File /> Download CV</Button>) : ""}
                    </div>
                    <div className="flex gap-2 md:hidden">
                        <Link href={'/projects'} className="flex items-center gap-2">Projects</Link>
                        <Link href={'/blog'} className="flex items-center gap-2">Blogs</Link>
                    </div>
                    {
                        session ? (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Avatar>
                                            <AvatarImage src={session?.user.image || ""} alt="i" width={50} height={50} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </DropdownMenuTrigger>

                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            <User />
                                            {session?.user?.name}
                                        </DropdownMenuItem>
                                        <Separator/>
                                        <DropdownMenuItem>
                                            {
                                                session?.user?.role === "Admin" && (
                                                    <>
                                                        <LayoutDashboard />
                                                        <Link href={"/dashboard"}>
                                                            Dashboard
                                                        </Link>
                                                    </>
                                                )
                                            }
                                        </DropdownMenuItem>

                                        <DropdownMenuItem  onClick={() => handeDownload(PDFFileURL)}>
                                            <File />
                                            Download CV
                                        </DropdownMenuItem>
                                            
                                        
                                        {
                                            session ? (
                                                <DropdownMenuItem onClick={() => signOut()}>
                                                    <LogOut />
                                                    Logout
                                                </DropdownMenuItem>
                                            ) : <Login />
                                        }
                                        
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                            ) : <Login />
                    }
                
                </div>
            </div>

        </div>
    </div>
  )
}

export default Navbar