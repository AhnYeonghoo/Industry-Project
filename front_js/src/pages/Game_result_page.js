import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import logo from '../img/logo_g.png';
import profile_img from '../img/profile_img.png';
import '../styles/Game_result_page.css';
import {  reset} from '../store';
import { useSelector , useDispatch } from "react-redux"


function Game_result_page() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let user = useSelector((state) => { return state.user_info } )
    let game_state = useSelector((state) => { return state.game_state } )
    return(
      <div className='container_game_result'>
        <div className='navbar'>
          <img className='logo' src={logo} onClick={()=>{ navigate('/Main_page') }} ></img> <span className='divider'></span>
          <div className='navtext'> 안녕하세요 000님 </div>
          <img className='profile_img' src={profile_img} onClick={()=>{ navigate('/App') }} ></img>
        </div>
        <div className='container_page'>
          <div className='result_box'>
            <div className='result_title'> 게임 결과</div>
            <div className='result_circle_container'> 
              <div className='my_point_circle'>
                <div className='my_point_title'>내 점수</div>
                <div className='my_point_num'> {game_state.score} </div>
              </div>
              <img className='my_profile_img' src={profile_img} ></img>
              <div className='my_ranking_circle'>
                <div className='my_ranking_title_result'>랭킹</div>
                <div className='my_ranking_num_result'> {user.rank} </div>
              </div>
            </div>
            


          </div>
          <div className='result_btn_container'>
            <div className='retry_btn' onClick={()=>( navigate('/Game_page') , dispatch(reset()))}> 다시하기 </div>
            <div className='tohome_btn' onClick={()=>( navigate('/Main_page'), dispatch(reset()))}> 홈으로 </div>
          </div>

         
        </div>

      </div>
    )
  }

  export default Game_result_page;
  