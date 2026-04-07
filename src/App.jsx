import { Route, Routes } from 'react-router-dom';
import Home from "./pages/home/Home";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './style/StyleComponent'; // Fayl yo'lini tekshirib ol
import Delivery from './pages/delivery/Delivery';
import Order from './pages/order/Order';
import Reserved from './pages/reserved/Reserved';



function App() {

  return (
    <div className="App">
      <ToastContainer />


      {/* ? router */}
      <Routes>
        {/* Odatda asosiy sahifa uchun path='/' bo'ladi */}
        <Route path='/' element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path='delivery' element={<Delivery />} />
        <Route path='order' element={<Order />} />
        <Route path='reserved' element={<Reserved />} />
      </Routes>
    </div>
  );
}

export default App;