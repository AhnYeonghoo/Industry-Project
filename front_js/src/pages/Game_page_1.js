import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import logo from '../img/logo_g.png';
import { useState } from 'react';
import profile_img from '../img/profile_img.png';
import heart_img from '../img/heart.png';
import video from '../img/sign.mov';
import '../styles/Game_page_1.css';
import { useSelector } from "react-redux"



function Game_page_1() {
    let navigate = useNavigate()
    let user = useSelector((state) => { return state.user_info } )
    let [quiz, quizchange] = useState( {quiznum: 1, quizword : ['하늘', '풀', '별' ], quizanswer : '나무' }  )
    let [my_game_info, my_game_info_ch] = useState( {score : 0, heart : 3 })
    return(
      <div className='container_game_page_1'>
        <div className='navbar'>
          <img className='logo' src={logo} onClick={()=>{ navigate('/Main_page') }} ></img> <span className='divider'></span>
          <div className='navtext'> 안녕하세요 {user.name}님 </div>
          <img className='profile_img' src={profile_img} onClick={()=>{ navigate('/App') }} ></img>
        </div>
        <div className='container_page'>
          <div className='container_game_info'>
            <div className='now_score'>
              <div className='now_score_title'> 현재 점수 </div>
              <div className='now_score_num'> {my_game_info.score} </div>
            </div>
            <div className='timebar'>
              <div className='time'> </div>
            </div>
            <div className='heart_box'>
              {
                my_game_info.heart == 3 ?  <div><img className='heart' src={heart_img} ></img>
                              <img className='heart' src={heart_img} ></img>
                              <img className='heart' src={heart_img} ></img></div>
                              : null
              }
              {
                my_game_info.heart == 2 ?  <div><img className='heart_no' src={heart_img} ></img>
                                <img className='heart' src={heart_img} ></img>
                                <img className='heart' src={heart_img} ></img></div>
                                : null
              }
                            {
                my_game_info.heart == 1 ?  <div><img className='heart_no' src={heart_img} ></img>
                                <img className='heart_no' src={heart_img} ></img>
                                <img className='heart' src={heart_img} ></img></div>
                                : null
              }
              
            </div>
          </div>
          <div className='container_game'>
            <div className='game_howto'>아래 영상에서 말하는 단어를 골라주세요!</div>
            <div className='video_container'> 
              <video className='video' src={video} controls autoPlay muted loop> </video>
            </div>
            <div className='answer_container'> 
              <div className='answer_list_row'> 
                <div className='answer_btn' onClick={()=>{ navigate('/Game_page_2')}}> {quiz.quizanswer}</div>
                <div className='answer_btn' onClick={()=> { 
                  let copy_gameinfo = my_game_info;
                  copy_gameinfo.heart = copy_gameinfo.heart - 1;
                  my_game_info_ch(copy_gameinfo);
                  console.log(my_game_info)
                }}> {quiz.quizword[0]} </div>
              </div>
              <div className='answer_list_row'>
                <div className='answer_btn'> {quiz.quizword[1]} </div>
                <div className='answer_btn'> {quiz.quizword[2]} </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }

  export default Game_page_1;
  