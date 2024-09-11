import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import RailNavigation from './components/RailNavigation';
import TourismNavigation from './components/TourismNavigation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/rail-navigation" element={<RailNavigation />} />
        <Route path="/tourism-navigation" element={<TourismNavigation />} />
      </Routes>
    </Router>
  );
}

export default App;
