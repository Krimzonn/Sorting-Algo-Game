import { Routes, Route } from 'react-router-dom'
import LeaderBoard from './components/LeaderBoard';
import MainMenu from './components/MainMenu';
import Game from './components/Game';

function App()
{
  return (
    <Routes>
      <Route path='/' element={<MainMenu/>}/>
      <Route path='/game' element={<Game/>}/>
      <Route path='/leaderboard' element={<LeaderBoard/>}/>
    </Routes>
  )
}

export default App;