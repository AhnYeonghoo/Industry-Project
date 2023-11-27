import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import logo from '../img/logo_g.png';
import profile_img from '../img/profile_img.png';
import '../styles/Learn_category_page.css';
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
        <div className='container_page_learn_category'>
          <div className='learn_title'>학습하기</div>
          <div className='container_content_learn'>
             <div className='learn_category_btn' onClick={()=>{navigate('/Learn_page')}}> 장소 </div>
             <div className='learn_category_btn'> 사물 </div>
             <div className='learn_category_btn'> 날씨 </div>
             <div className='learn_category_btn'> 일상 </div>
             <div className='learn_category_btn'> 음식 </div>
             <div className='learn_category_btn'> 지문자 </div>
          </div>
          
        </div>

      </div>
    )
  }

  export default Learn_page;
  