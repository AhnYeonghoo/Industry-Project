import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Webcam from 'react-webcam'
import { useState , useEffect } from 'react';
import logo from '../img/logo_g.png';
import profile_img from '../img/profile_img.png';
import heart_img from '../img/heart.png';
import '../styles/Game_page_2.css';
import Game_type_1 from './Game_type_1';
import Game_type_2 from './Game_type_2';
import { useSelector , useDispatch } from "react-redux"
import { changetype1, fullheart , zeroscore, changetype2, reset} from '../store';



function Game_page_2() {
    let navigate = useNavigate()
    let user = useSelector((state) => { return state.user_info } )
    let game_state = useSelector((state) => { return state.game_state } )
    let dispatch = useDispatch()
    let [quizvid, quizchange] = useState( {quiznum: 2, quizword : '나무' }  )

    //처음 초기화
    useEffect( ()=> {
      dispatch(changetype1())
      console.log('reset')
      console.log(game_state)
      dispatch(reset())
    },[])


    //하트 다 잃으면 리셋
    useEffect( ()=>{
      if(game_state.heart == 0){
        navigate('/Game_result_page')
        console.log('over')
        dispatch(reset())
      }
    },[game_state.heart])


    //게임 스테이지 변경 타입1 4번, 타입2 2번
    useEffect( ()=>{
      if(game_state.num <= 2 && game_state.num > 0){
        dispatch(changetype2())
      }
      if(game_state.num == 0){
        navigate('/Game_result_page')
        console.log('over')
        dispatch(reset())
      }
      
    },[game_state.num])
    
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
              <div className='now_score_num'> {game_state.score} </div>
            </div>
            <div className='timebar'>
              <div className='time'> </div>
            </div>
            <div className='heart_box'>
              {
                game_state.heart == 3 ?  <div><img className='heart' src={heart_img} ></img>
                              <img className='heart' src={heart_img} ></img>
                              <img className='heart' src={heart_img} ></img></div>
                              : null
              }
              {
                game_state.heart == 2 ?  <div><img className='heart_no' src={heart_img} ></img>
                                <img className='heart' src={heart_img} ></img>
                                <img className='heart' src={heart_img} ></img></div>
                                : null
              }
                            {
                game_state.heart == 1 ?  <div><img className='heart_no' src={heart_img} ></img>
                                <img className='heart_no' src={heart_img} ></img>
                                <img className='heart' src={heart_img} ></img></div>
                                : null
              }
              
            </div>
          </div>
          {
            game_state.gametype == 1 ? <Game_type_1></Game_type_1> : <Game_type_2></Game_type_2>
          }
        </div>

      </div>
    )
  }

  export default Game_page_2;
  