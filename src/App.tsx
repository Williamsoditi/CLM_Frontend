import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Roster from './pages/Roster'
import Schedule from './pages/Schedule'
import NotFound from './pages/NotFound'
import News from './pages/News'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/roster" element={<Roster />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/news" element={<News />} />
      <Route path="/contact" element={<Contact />} />
      {/* Wildcard route for 404 Not Found pages */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App
