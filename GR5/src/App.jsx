import Home from './pages/Home'
import Newsletter from './pages/Newsletter';
import Calendar from './pages/Calendar';
import Capsules from './pages/Capsules';
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import './index.css'

function App() {
  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/capsules" element={<Capsules />} />
        </Routes>
      </Router>
    </main>
  )
}

export default App
