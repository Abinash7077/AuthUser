import logo from './logo.svg';
import './App.css';
import RegisterForm from './components/RegisterForm';
import Login from './components/Login';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/Header';
import Home from './Pages/Home';

import Delete from './components/Delete';
import UpdateProfile from './components/UpdateProfile';
import ForgotPassword from './components/ForgotPassword';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Header/>
 
  <Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/Login" element={<Login/>}/>
  
  <Route path="/Register" element={<RegisterForm/>}/>
  <Route path="/Delete" element={<Delete/>}/>
  <Route path="/UpdateProfile/:id" element={<UpdateProfile/>}/>
  <Route path="/ForgotPassword/:id/password" element={<ForgotPassword/>}/>
  </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;
