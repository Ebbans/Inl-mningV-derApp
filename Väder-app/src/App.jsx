import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Väder/Home.jsx';
import Details from './Väder/Details.jsx';



const App = () => {
  return (
    <Router>

    <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/Details" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;
