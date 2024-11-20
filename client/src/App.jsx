import './App.css'
import Navbar from './Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Rent from './Rent/Rent';
import Dashboard from './Dashboard/Dashboard';
import List from './List/List';

function App() {

  return (
    <Router className=" overflow-hidden">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/rent" element={<Rent />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/list" element={<List />} />
                
            </Routes>
        </Router>
  )
}

export default App
