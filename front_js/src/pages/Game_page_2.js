import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Webcam from 'react-webcam'
import { useState } from 'react';
import logo from '../img/logo_g.png';
import profile_img from '../img/profile_img.png';
import heart_img from '../img/heart.png';
import '../styles/Game_page_2.css';


function Game_page_2() {
    let navigate = useNavigate()
    let [quizvid, quizchange] = useState( {quiznum: 2, quizword : '나무' }  )
    return(
      <div className='container_game_page_1'>
        <div className='navbar'>
          <img className='logo' src={logo} onClick={()=>{ navigate('/Main_page') }} ></img> <span className='divider'></span>
          <div className='navtext'> 안녕하세요 000님 </div>
          <img className='profile_img' src={profile_img} onClick={()=>{ navigate('/App') }} ></img>
        </div>
        <div className='container_page'>
          <div className='container_game_info'>
            <div className='now_score'>
              <div className='now_score_title'> 현재 점수 </div>
              <div className='now_score_num'> 45 </div>
            </div>
            <div className='timebar'>
              <div className='time'> </div>
            </div>
            <div className='heart_box'>
              <img className='heart_no' src={heart_img} ></img>
              <img className='heart' src={heart_img} ></img>
              <img className='heart' src={heart_img} ></img>
            </div>
          </div>
          <div className='container_game_2'>
            <div className='game_howto'>다음 단어를 수화로 표현해보세요!</div>

            <div className='quiz_word'> {quizvid.quizword} </div>

            <div className='camera_container'> 
              <Webcam className='camera'></Webcam>
            </div>

            <div className='start_btn' onClick={()=>{ navigate('/Game_result_page')}}>시작</div>
            
           
          </div>
        </div>

      </div>
    )
  }

  export default Game_page_2;
  