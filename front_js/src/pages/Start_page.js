import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import logo from '../img/logo_g.png';
import mainimg from '../img/mainimg.png';
import '../styles/Start_page.css';

function Start_page() {
    let navigate = useNavigate()
    return(
      <div className='container_startpage'>
        <div className='navbar_start'>
          <div className='empty'> </div>
          <img className='logo' src={logo} ></img>
          <div className='container_navbtn'>
            <a className='navtext_start' onClick={()=>{ navigate('/Login_page') }}> 로그인 </a>
            <a className='navtext_start' onClick={()=>{ navigate('/Signup_page') }}> 회원가입 </a>
          </div>
         
        </div>
        <div className='container_mainimg'>
          <img className='mainimg' src={mainimg}></img> 
        </div>

      </div>
    )
  }

  export default Start_page;
  