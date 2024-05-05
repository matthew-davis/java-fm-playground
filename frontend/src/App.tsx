import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Chat from './pages/Chat';
import Home from './pages/Home';
import Images from './pages/Images';
import Model from './pages/Model';
import Models from './pages/Models';
import Text from './pages/Text';

function App() {
  return (
    <div className="flex h-screen bg-gray-200">
        <Navigation />
        <div className="overflow-x-scroll w-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/models" element={<Models />} />
            <Route path="/models/:modelId" element={<Model />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/text" element={<Text />} />
            <Route path="/images" element={<Images />} />
          </Routes>
        </div>
    </div>
  )
}

export default App
