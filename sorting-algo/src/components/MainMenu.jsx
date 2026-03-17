import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ParticleBackground from "./ParticleBackground";

function MainMenu()
{
  const navigate = useNavigate();

  const [screen, setScreen] = useState("main");
  const [selectAlgorithm, setSelectAlgorithm] = useState(null);

  let content;



  if (screen === 'main')
  {
    content = <div className="h-screen flex flex-col items-center justify-center">
                <ParticleBackground />
                <h1 className="text-5xl font-bold text-fuchsia-500 mb-10">Sorting Algo</h1>

                <div className="flex flex-col gap-4">
                  <button className="bg-fuchsia-500 hover:bg-purple-600 text-white font-bold px-8 py-3 rounded-xl w-48" type="button" onClick={() => setScreen('algorithm')}>PLAY</button>
                  <button className="bg-fuchsia-500 hover:bg-purple-600 text-white font-bold px-8 py-3 rounded-xl w-48" type="button" onClick={() => navigate('/leaderboard')}>LEADERBOARD</button>
                  <button className="bg-fuchsia-500 hover:bg-purple-600 text-white font-bold px-8 py-3 rounded-xl w-48" type="button" onClick={() => setScreen('settings')}>SETTINGS</button>
                </div>

              </div>
  }
  else if (screen === 'algorithm')
  {
    content = <div className="h-screen flex flex-col items-center justify-center">

                <ParticleBackground />
                <h1 className="text-3xl font-bold text-fuchsia-500 mb-10">Select An Algorithm</h1>

                <div className="flex flex-row gap-6 mt-10">
                    <div className="bg-zinc-800 border border-fuchsia-500 rounded-xl p-6 w-40 text-center text-white floating" style={{ animationDelay: '0s' }}>
                        <p className="font-bold">Bubble Sort</p>
                        <p className="text-xs text-zinc-400 mt-2">Compare Neighbors</p>
                        <button className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10" type="button" onClick={() => setScreen('difficulty')}>SELECT</button>
                    </div>

                    <div className="bg-zinc-800 border border-fuchsia-500 rounded-xl p-6 w-40 text-center text-white floating" style={{ animationDelay: '0.5s' }}>
                        <p className="font-bold">Selection Sort</p>
                        <p className="text-xs text-zinc-400 mt-2">Find The Minimum</p>
                        <button className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10" type="button" onClick={() => setScreen('difficulty')}>SELECT</button>
                    </div>

                    <div className="bg-zinc-800 border border-fuchsia-500 rounded-xl p-6 w-40 text-center text-white floating" style={{ animationDelay: '1s' }}>
                        <p className="font-bold">Insertion Sort</p>
                        <p className="text-xs text-zinc-400 mt-2">Build Sorted Left</p>
                        <button className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10" type="button" onClick={() => setScreen('difficulty')}>SELECT</button>
                    </div>

                    <div className="bg-zinc-800 border border-fuchsia-500 rounded-xl p-6 w-40 text-center text-white floating" style={{ animationDelay: '1.5s' }}>
                        <p className="font-bold">Quick Sort</p>
                        <p className="text-xs text-zinc-400 mt-2">Pivot And Partition</p>
                        <button className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10" type="button" onClick={() => setScreen('difficulty')}>SELECT</button>
                    </div>

                    <div className="bg-zinc-800 border border-fuchsia-500 rounded-xl p-6 w-40 text-center text-white floating" style={{ animationDelay: '2s' }}>
                        <p className="font-bold">Merge Sort</p>
                        <p className="text-xs text-zinc-400 mt-2">Divide And Conquer</p>
                        <button className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10" type="button" onClick={() => setScreen('difficulty')}>SELECT</button>
                    </div>
                </div>

                <button className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-4 rounded-xl mt-12 transition-colors duration-300" onClick={() => setScreen('main')}>BACK</button>
              </div>
  }
  else if (screen === 'difficulty')
  {
    content = <div>
                This is the difficulty selection page
                <button type="button" onClick={() => setScreen('main')}>GOTO main</button>
              </div>
  }


  return (
    <>
      {content}
    </>
  )
}

export default MainMenu;