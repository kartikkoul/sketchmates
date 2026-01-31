"use client"
import { BrushIcon } from "@repo/ui/icons";
import { useState } from "react";
import { createRoom } from "@repo/api";
import { useRouter } from "next/navigation";
import { SketchButtonLoader } from "@repo/ui/components";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] =  useState(false);
  const router = useRouter();

  const createRoomHandler = async() => {
    setLoading(true);
    const data = await createRoom();

    if(data.error){
      setError(true);
      setLoading(false);
      return;
    }

    const roomId = data.roomId;
    router.push("/draw/" + roomId);
  }

  return (
    <div className="h-screen w-screen bg-gray-100 bg-[url('/background.svg')] bg-repeat">
      <main className="flex justify-center items-center h-full font-[Inter]">
        <div className="card border p-8 text-wrap bg-white rounded-2xl w-100">
          <div className="info text-center w-full">
            <h1 className="font-bold text-xl scale-y-250 tracking-wide font-[Caveat]">Heyy! Welcome to SketchMates</h1>
            <p className="pt-8">Create a room & invite your friends to sketch together in real time</p>
          </div>
          <div className="actions flex justify-center pt-8">
            <button className={"flex items-center border p-2 rounded-xl cursor-pointer hover:shadow-xl focus:shadow-xl transition-shadow duration-300"}
              onClick={createRoomHandler}
              disabled={loading}
            >
              {!loading && <>Start Sketching <BrushIcon size={20 as any}/></> }
              {loading && <SketchButtonLoader/>}
            </button>
          </div>

          <div className="disclaimer">
            <h1 className="text-center pt-4 font-semibold text-gray-400 font-[Caveat]">Created by KK</h1>
          </div>
        </div>
      </main>
    </div>
  );
}
