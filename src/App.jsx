import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './style/StyleComponent'; 
import { routes } from './routes';
import AdminQR from './pages/admin/AdminQR'; // Yangi faylni import qildik

function App() {
  return (
    <div className="App">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        {/* Asosiy routelar */}
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        ))}

        {/* Maxsus QR generator yo'li */}
        <Route path="/admin-qr-generator" element={<AdminQR />} />
      </Routes>
    </div>
  );
}

export default App;