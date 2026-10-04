import { Button } from "@base-ui/react/button";
import { useState } from "react";
import {X,Menu} from "lucide-react"

function Home() {
  const [openMenu,setopenMenu]=useState(false);
  const [modelOpen,setModelOpen]=useState(false);
  return (
    <div className="min-h-screen w-full bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          
          <div className="flex items-center gap-2">
            <img  className="h-6 w-6 rounded-sm" src="/assets/logo.png" alt="Logo" />
            <span className="text-lg font-semibold tracking-tight ">My Website</span>
          </div>
          <div className="hidden items-center gap-3 md:flex">
           <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-lg px-5 py-2.5 text-white">
           SingIn
           </Button>
          </div>
          <button className="md:hidden" onClick={()=>setopenMenu(!openMenu)}>
          {openMenu ? <X className="h-6 w-6"/>:<Menu/>}
          </button>
        </div>
        {openMenu && (
          <div className="flex flex-col gap-4 border-t border-slate-100 px-4 py-4 sm:px-6 md:hidden ">
          <button onClick={()=>setModelOpen(!modelOpen)}className="w-full bg-indigo-600 hover:bg-indigo-900">
            SiginIn
          </button>
          </div>
        )}
      </header>
    </div>
  );
}

export default Home;