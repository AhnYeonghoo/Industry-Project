import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import loginimg from '../img/loginimg.png';
import logo from '../img/logo_g.png';
import '../styles/Login_page.css';

function Login_page() {
    let navigate = useNavigate()
    return(
      <div className='container_login_page'>
        <img className='logo' src={logo} onClick={()=>{ navigate('/App') }} ></img>
        <div className='container_login_loginimg'>


          <img className='loginimg' src={loginimg} onClick={()=>{ navigate('/App') }} ></img> 

          <div className='container_login'>
            <div className='login_title'>로그인</div>
            <div className='container_login_input'>
              <div className='login_text'>ID</div>
              <input className='login_input' placeholder='Enter ID'></input>
            </div>
            <div className='container_login_input'>
              <div className='login_text'>Password</div>
              <input className='login_input' placeholder='Enter Password'></input>
            </div>

            <div className='container_login_btn'>
              <button className='login_btn' onClick={()=>{ navigate('/Main_page') }}> Login </button>
            </div>
          </div>

        </div>


      </div>
    )
  }

  export default Login_page;