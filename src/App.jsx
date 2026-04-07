import { Route, Routes } from 'react-router-dom';
import Home from "./pages/home/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './style/StyleComponent'; // Fayl yo'lini tekshirib ol
// import Header from './components/header/Header';
// import { Button } from './style/StyleComponent';
// import { Title } from './style/StyleComponent';


function App() {

  return (
    <div className="App">
      <ToastContainer />
    
      
      

     

      {/* ? router */}
      <Routes>
        {/* Odatda asosiy sahifa uchun path='/' bo'ladi */}
        <Route path='/' element={<Home />} />
        <Route path='home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;