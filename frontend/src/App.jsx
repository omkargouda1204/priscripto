import { Route, Routes} from 'react-router-dom'
import Home from "./pages/Home"; // Make sure the path to Home is correct
import Doctors from './pages/Doctors';
import Login from './pages/Login';
import About from './pages/About';
import Contact from './pages/Contact';
import Myprofile from './pages/Myprofile';
import MyAppointments from './pages/MyAppointments';
import Appointmen from './pages/Appointmen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/doctors' element={<Doctors/>}/>
        <Route path='/doctors/:speciality' element={<Doctors/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/my-profile' element={<Myprofile/>}/>
        <Route path='/my-appointments' element={<MyAppointments/>}/>
        <Route path='/appointment/:docId' element={<Appointmen/>}/>
        
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
