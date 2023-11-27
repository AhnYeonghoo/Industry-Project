import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import logo from '../img/logo_g.png';
import profile_img from '../img/profile_img.png';
import video from '../img/sign.mov';
import '../styles/Learn_page.css';
import { useSelector } from "react-redux"


function Learn_page() {
    let navigate = useNavigate()
    let user = useSelector((state) => { return state.user_info } )
    return(
      <div className='container_learn_page'>
        <div className='navbar'>
          <img className='logo' src={logo} onClick={()=>{ navigate('/Main_page') }}></img> <span className='divider'></span>
          <div className='navtext'> 안녕하세요 {user.name}님 </div>
          <img className='profile_img' src={profile_img} onClick={()=>{ navigate('/App') }} ></img>
        </div>
        <div className='container_page_learn'>
          <div className='learn_video_word'>
            <div className='learn_word'> 나무 </div>
            <div className='learn_video_container'> 
              <video className='learn_video' src={video} controls autoPlay muted loop> </video>
            </div>
          </div>
          <div className='learn_next_btn'>다음</div>
          
        </div>

      </div>
    )
  }

  export default Learn_page;
  