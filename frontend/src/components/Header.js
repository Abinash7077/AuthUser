import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../Context/AuthContext";


const Header = () => {
  const{authUser,setAuthUser,isLoggedIn,setIsLoggedIn}=useAuth()
  
  const logout=()=>{
    setIsLoggedIn(false)
    window.location.reload()
  }
  return (
    <div>
       <nav className="navbar header navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <NavLink to="/" className="navbar-brand" href="#">User List</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
        
      <ul className="navbar-nav ms-auto mb-2  mb-lg-0">
        {
          !isLoggedIn?<>
            <li className="nav-item">
          <NavLink to="/Register" className="nav-link active" aria-current="page" href="#">Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/Login" className="nav-link" href="#">Sign In</NavLink>
        </li>
          </>:<>
          <div className="logOut"> <li className='nav-item mx-2' >User: <span className='auth-user'>{authUser}</span></li>
          <li className='nav-item logout' onClick={logout}>Logout</li></div>
         
        
          </>
        }
      
      
       
      
      </ul>
     
    </div>
  </div>
</nav>
    </div>
  );
}

export default Header;
