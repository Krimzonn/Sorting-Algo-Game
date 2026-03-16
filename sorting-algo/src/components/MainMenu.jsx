import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MainMenu()
{
  const navigate = useNavigate();

  const [screen, setScreen] = useState("main");

  let content;



  if (screen === 'main')
  {
    content = <div className="h-screen flex flex-col items-center justify-center bg-zinc-950">
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
    content = <div className="h-screen flex flex-col items-center justify-center bg-zinc-950">
                <h1 className="text-3xl font-bold text-fuchsia-500 mb-10">Select An Algorithm</h1>

                <div className="flex flex-row gap-6 mt-10">
                    <div className="bg-zinc-800 border border-fuchsia-500 rounded-xl p-6 w-36 text-center text-white">
                        <p className="font-bold">Bubble Sort</p>
                        <p className="text-xs text-zinc-400 mt-2">Compare Neighbors</p>
                    </div>
                </div>

                <button type="button" onClick={() => setScreen('difficulty')}>GOTO difficulty</button>
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