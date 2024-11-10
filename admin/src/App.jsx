import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useContext } from 'react';
import { AdminContext } from './context/AdminContext';
import Login from './pages/Login';
import Dashboard from './pages/Admin/Dashboard';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import AllAppointment from './pages/Admin/AllAppointment';
import Navbar from './components/Navbar';
import { DoctoContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashbord';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorProfile from './pages/Doctor/DoctorProfile'
// Import Sidebar if it’s a custom component
// import Sidebar from './components/Sidebar';
const App =() =>  {
  const { aToken } = useContext(AdminContext);
  const {dToken} = useContext(DoctoContext)
  return (
    <BrowserRouter>
      {aToken || dToken ? (
        <div className="min-h-screen bg-[#F8F9FD]">
          <ToastContainer />
          <Navbar />
          <div>
            {/* Uncomment Sidebar if it's available */}
              {/* Admin route*/}           
            {/* <Sidebar /> */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/admin-dashboard" element={<Dashboard />} />
              <Route path="/all-appointment" element={<AllAppointment />} />
              <Route path="/add-doctor" element={<AddDoctor />} />
              <Route path="/doctor-list" element={<DoctorsList />} />
              {/*Docotr route*/}
              <Route path="/doctor-dashboard" element={<DoctorDashboard/>} />
              <Route path="/doctor-appointments" element={<DoctorAppointments/>} />
              <Route path="/doctor-profile" element={<DoctorProfile />} />

            </Routes>
          </div>
        </div>
      ) : (
        <>
        <Login/>
         
          <ToastContainer />
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
