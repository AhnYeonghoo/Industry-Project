import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import loginimg from '../img/loginimg.png';
import logo from '../img/logo_g.png';
import '../styles/Signup_page.css';

function Signup_page() {
    let navigate = useNavigate()
    return(
      <div className='container_signup_page'>
        <img className='logo' src={logo} onClick={()=>{ navigate('/App') }} ></img>
        <div className='container_signup_loginimg'>


          <img className='loginimg' src={loginimg} onClick={()=>{ navigate('/App') }} ></img> 

          <div className='container_signup'>
            <div className='signup_title'>회원가입</div>
            <div className='container_signup_input'>
              <div className='signup_text'>이름</div>
              <input className='signup_input' placeholder='Enter Name'></input>
            </div>
            <div className='container_signup_input'>
              <div className='signup_text'>Email</div>
              <input className='signup_input' placeholder='example@email.com'></input>
            </div>
            <div className='container_login_input'>
              <div className='signup_text'>ID</div>
              <input className='signup_input' placeholder='Enter ID'></input>
            </div>
            <div className='container_login_input'>
              <div className='signup_text'>PW</div>
              <input className='signup_input' placeholder='Enter Password'></input>
            </div>

            <div className='container_signup_btn'>
              <button className='signup_btn' onClick={()=>{ navigate('/App') }}>  가입하기 </button>
            </div>
          </div>

        </div>


      </div>
    )
  }

  export default Signup_page;
  