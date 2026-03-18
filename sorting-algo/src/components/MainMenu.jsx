import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ParticleBackground from "./ParticleBackground";

function MainMenu()
{
  const navigate = useNavigate();

  const [screen, setScreen] = useState("main");
  const [selectAlgorithm, setSelectAlgorithm] = useState(null);
  const [selectDifficulty, setSelectDifficulty] = useState(null);
  const [gameMode, setGameMode] = useState('ai');

  useEffect(() => {
    if (screen === 'difficulty')
    {
      document.body.style.background = '#0a0a0a';
      document.body.style.backgroundImage = 'linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)';
      document.body.style.backgroundSize = '40px 40px';
    }
    else 
    {
      document.body.style.background = '#09090b';
      document.body.style.backgroundImage = 'none';
      document.body.style.backgroundSize = 'auto';
    }
  }, [screen])

  let content;



  if (screen === 'main') 
  {
    content = <div className="h-screen flex flex-col items-center justify-center">
                <ParticleBackground />
                <h1 className="text-5xl font-bold text-fuchsia-500 mb-10">Sorting Algo</h1>

                <div className="flex flex-col gap-4">
                  <button className="bg-fuchsia-500 hover:bg-purple-600 text-white text-xl font-bold px-8 py-3 rounded-xl w-55" type="button" onClick={() => setScreen('algorithm')}>PLAY</button>
                  <button className="bg-fuchsia-500 hover:bg-purple-600 text-white text-xl font-bold px-8 py-3 rounded-xl w-55" type="button" onClick={() => navigate('/leaderboard')}>LEADERBOARD</button>
                  <button className="bg-fuchsia-500 hover:bg-purple-600 text-white text-xl font-bold px-8 py-3 rounded-xl w-55" type="button" onClick={() => setScreen('settings')}>SETTINGS</button>
                </div>

              </div>
  }
  else if (screen === 'algorithm')
  {
    content = <div className="h-screen flex flex-col items-center justify-center">

                <ParticleBackground />
                <h1 className="text-4xl font-bold text-fuchsia-500 mb-10">Select An Algorithm</h1>

                <div className="flex flex-row gap-6 mt-10">
                    <div className="bg-zinc-800 border border-fuchsia-500 rounded-xl p-6 w-40 text-center text-white floating" style={{ animationDelay: '0s' }}>
                        <p className="font-bold">Bubble Sort</p>
                        <p className="text-xs text-zinc-400 mt-2">Compare Neighbors</p>
                        <button className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10" type="button" 
                          onClick={() => {
                            setScreen('difficulty') 
                            setSelectAlgorithm('bubbleSort')}}>SELECT</button>
                    </div>

                    <div className="bg-zinc-800 border border-fuchsia-500 rounded-xl p-6 w-40 text-center text-white floating" style={{ animationDelay: '0.5s' }}>
                        <p className="font-bold">Selection Sort</p>
                        <p className="text-xs text-zinc-400 mt-2">Find The Minimum</p>
                        <button className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10" type="button" 
                        onClick={() => {
                          setScreen('difficulty')
                          setSelectAlgorithm('selectionSort')}}>SELECT</button>
                    </div>

                    <div className="bg-zinc-800 border border-fuchsia-500 rounded-xl p-6 w-40 text-center text-white floating" style={{ animationDelay: '1s' }}>
                        <p className="font-bold">Insertion Sort</p>
                        <p className="text-xs text-zinc-400 mt-2">Build Sorted Left</p>
                        <button className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10" type="button" 
                        onClick={() => {
                          setScreen('difficulty')
                          setSelectAlgorithm('insertionSort')}}>SELECT</button>
                    </div>

                    <div className="bg-zinc-800 border border-fuchsia-500 rounded-xl p-6 w-40 text-center text-white floating" style={{ animationDelay: '1.5s' }}>
                        <p className="font-bold">Quick Sort</p>
                        <p className="text-xs text-zinc-400 mt-2">Pivot And Partition</p>
                        <button className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10" type="button"
                        onClick={() => {
                          setScreen('difficulty')
                          setSelectAlgorithm('quickSort')}}>SELECT</button>
                    </div>

                    <div className="bg-zinc-800 border border-fuchsia-500 rounded-xl p-6 w-40 text-center text-white floating" style={{ animationDelay: '2s' }}>
                        <p className="font-bold">Merge Sort</p>
                        <p className="text-xs text-zinc-400 mt-2">Divide And Conquer</p>
                        <button className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10" type="button" 
                        onClick={() => {
                          setScreen('difficulty')
                          setSelectAlgorithm('mergeSort')}}>SELECT</button>
                    </div>
                </div>

                <button className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-4 rounded-xl mt-12 transition-colors duration-300" onClick={() => setScreen('main')}>BACK</button>
              </div>
  }
  else if (screen === 'difficulty')
  {
    content = <div className=" h-screen flex flex-col items-center justify-center " >
                <h1 className="text-3xl font-bold text-fuchsia-500 mb-10">Choose A Difficulty</h1>

                <div className="flex flex-row gap-8 mt-10">
                  <div className="bg-zinc-800 border border-green-400 rounded-xl p-7 w-40 text-center text-white floating glowGreenEffect">
                    <p className="font-bold">🟢 EASY</p>
                    <button className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10" type="button" 
                        onClick={() => {
                          navigate('/game', {
                              state: { 
                                algorithm: selectAlgorithm,
                                difficulty: 'easy',
                                mode: gameMode
                                }
                          })
                          }}>SELECT</button>
                  </div>

                  <div className="bg-zinc-800 border border-yellow-400 rounded-xl p-7 w-40 text-center text-white floating glowYellowEffect">
                    <p className="font-bold">⚡MEDIUM</p>
                    <button className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10" type="button" 
                        onClick={() => {
                          navigate('/game', {
                              state: { 
                                algorithm: selectAlgorithm,
                                difficulty: 'medium',
                                mode: gameMode
                                }
                          })
                          }}>SELECT</button>
                  </div>

                  <div className="bg-zinc-800 border border-red-400 rounded-xl p-7 w-40 text-center text-white floating glowRedEffect">
                    <p className="font-bold">💀 HARD</p>
                    <button className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-3 rounded-xl mt-10" type="button" 
                        onClick={() => {
                          navigate('/game', {
                              state: { 
                                algorithm: selectAlgorithm,
                                difficulty: 'hard',
                                mode: gameMode
                                }
                          })
                          }}>SELECT</button>
                  </div>
                </div>

                <div className="flex flex-row gap-8 mt-10">
                  <button className="bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl"
                  onClick={() => setGameMode('ai')}>AI MODE</button>
                  <button className="bg-orange-400 text-black font-bold px-8 py-3 rounded-xl"
                  onClick={() => setGameMode('pvp')}>PvP MODE</button>
                </div>
                
                <button className="border-2 border-fuchsia-500 text-fuchsia-500 hover:bg-fuchsia-500 hover:text-white font-bold px-6 py-4 rounded-xl mt-12 transition-colors duration-300" type="button" onClick={() => setScreen('algorithm')}>BACK</button>
              </div>
  }


  return (
    <>
      {content}
    </>
  )
}

export default MainMenu;