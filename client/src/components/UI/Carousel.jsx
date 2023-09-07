import { Carousel } from "@material-tailwind/react";
import React from 'react'


const Carousele = () => {
  return (
    <Carousel autoplay loop className="rounded-xl w-1/2 border">
      <div className="relative flex justify-center items-center">
        <img src="assets/girl-pic.png" alt="img 1" className="h-full w-full object-cover" />
        <div className="absolute bottom-10 bg-[#EDBA2B]/25 flex flex-col justify-center items-center p-2 mx-2">
          <h1 className="font-bold text-lg">Video Chat with Friends</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, cupiditate.</p>
        </div>
      </div>

      <div className="relative flex justify-center items-center">
        <img src="assets/boy-pic.png" alt="img 1" className="h-full w-full object-cover" />
        <div className="absolute bottom-10 bg-[#EDBA2B]/25 flex flex-col justify-center items-center p-2 mx-2">
          <h1 className="font-bold text-lg">Find new Friends</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, cupiditate.</p>
        </div>
      </div>

      <div className="relative flex justify-center items-center">
        <img src="assets/girl2-pic.png" alt="img 1" className="h-full w-full object-cover" />
        <div className="absolute bottom-10 bg-[#EDBA2B]/25 flex flex-col justify-center items-center p-2 mx-2">
          <h1 className="font-bold text-lg">Connect to random</h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat, cupiditate.</p>
        </div>
      </div>
    </Carousel>
  );
}

export default Carousele