import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import logo from '../img/logo_g.png';
import profile_img from '../img/profile_img.png';
import profile_img_g from '../img/profile_img_g.png';
import ranking from '../img/ranking.png';
import '../styles/Main_page.css';
import { useSelector } from "react-redux"


function Main_page() {
    let navigate = useNavigate()
    let user = useSelector((state) => { return state.user_info } )
    return(
      <div className='container_mainpage'>
        <div className='navbar'>
          <img className='logo' src={logo} ></img> <span className='divider'></span>
          <div className='navtext'> 안녕하세요 {user.name}님 </div>
          <img className='profile_img' src={profile_img} onClick={()=>{ navigate('/App') }} ></img>
        </div>
        <div className='container_page_main'>
          <div className='container_content_main'>
              <div className='container_content_left'>
                <div className='container_title_main'>
                <img className='ranking_img' src={ranking} ></img>
                  <div className='main_title'>실시간 랭킹</div>
                  
                </div>
                <div className='ranking_box_main'>
                  <div className='ranking_list'> 
                    <div className='ranking_num'> 1 </div>
                    <img className='ranking_profile' src={profile_img_g} ></img>
                    <div className='ranking_name'> 카리나 </div>
                    <span className='divider'></span>
                    <div className='ranking_point'> 100점 </div>
                  </div>
                  <div className='ranking_list'> 
                    <div className='ranking_num'> 2 </div>
                    <img className='ranking_profile' src={profile_img_g} ></img>
                    <div className='ranking_name'> 윈터 </div>
                    <span className='divider'></span>
                    <div className='ranking_point'> 90점 </div>
                  </div>
                  <div className='ranking_list'> 
                    <div className='ranking_num'> 3 </div>
                    <img className='ranking_profile' src={profile_img_g} ></img>
                    <div className='ranking_name'> 하니 </div>
                    <span className='divider'></span>
                    <div className='ranking_point'> 85점 </div>
                  </div>
                  <div className='ranking_list'> 
                    <div className='ranking_num'> 4 </div>
                    <img className='ranking_profile' src={profile_img_g} ></img>
                    <div className='ranking_name'> 민지 </div>
                    <span className='divider'></span>
                    <div className='ranking_point'> 75점 </div>
                  </div>
                  <div className='ranking_list'> 
                    <div className='ranking_num'> 5 </div>
                    <img className='ranking_profile' src={profile_img_g} ></img>
                    <div className='ranking_name'> 예지 </div>
                    <span className='divider'></span>
                    <div className='ranking_point'> 70점 </div>
                  </div>
                </div>
              </div>
              <div className='container_content_right'>
                <div className='my_info_main'> 
                  <div className='my_score_main'>
                    <div className='my_score_title_main'> 내 점수 </div>
                    <div className='my_score_num_main'> {user.score}점 </div>
                  </div>
                  <span className='divider_green'></span>
                  <div className='my_ranking'>
                    <div className='my_ranking_title'> 랭킹 </div>
                    <div className='my_ranking_num'> {user.rank}위 </div>
                  </div>
                </div>
                <div className='learn_btn' onClick={()=>{ navigate('/Learn_category_page')}}> 학습하기 </div>
                <div className='revision_btn' onClick={()=>{ navigate('/Revision_page')}}> 오답노트 </div>
                <div className='game_btn' onClick={()=>{ navigate('/Game_page') }}> 게임하기 </div>
              </div>
            </div>
          
        </div>

      </div>
    )
  }

  export default Main_page;
  