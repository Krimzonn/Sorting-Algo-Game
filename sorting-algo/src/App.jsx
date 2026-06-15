import { Routes, Route } from "react-router-dom";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";
import GameOver from "./components/GameOver";
import Guide from "./components/Guide";
import Visualizer from "./components/Visualizer";
import AlgoVisualizer from "./components/AlgoVisualizer";
import StackVisualizer from "./components/StackVisualizer";
import QueueVisualizer from "./components/QueueVisualizer";
import LinkedListVisualizer from "./components/LinkedListVisualizer";
import BinarySearchVisualizer from "./components/BinarySearchVisualizer";
import LinearSearchVisualizer from "./components/LinearSearchVisualizer";

function App() {
  // useEffect(() => {
  //   const arr = randArrGen(6);
  //   console.log("Original Array: ", arr);
  //   const steps = quickSort([...arr], 6);
  //   console.log("Steps: ", steps);
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<MainMenu />} />
      <Route path="/game" element={<Game />} />
      <Route path="/gameover" element={<GameOver />} />
      <Route path="/guide" element={<Guide />} />
      <Route path="/visualizer" element={<Visualizer />} />
      <Route path="/visualizer/stack" element={<StackVisualizer />} />
      <Route path="/visualizer/queue" element={<QueueVisualizer />} />
      <Route
        path="/visualizer/binarySearch"
        element={<BinarySearchVisualizer />}
      />
      <Route
        path="/visualizer/linearSearch"
        element={<LinearSearchVisualizer />}
      />
      <Route path="/visualizer/linkedList" element={<LinkedListVisualizer />} />
      <Route path="/visualizer/:algoId" element={<AlgoVisualizer />} />
    </Routes>
  );
}

export default App;
