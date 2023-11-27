import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { useState } from 'react';
import logo from '../img/logo_g.png';
import profile_img from '../img/profile_img.png';
import video from '../img/sign.mov';
import '../styles/Revision_page.css';
import { useSelector } from "react-redux"


function Revision_page() {
    let navigate = useNavigate()
    let user = useSelector((state) => { return state.user_info } )
    let [revision_word_now, revision_word_now_change] = useState('나무');
    let [revision_word_list, revision_word_list_change] = useState(['달','바람','하늘','학교','책','가방','핸드폰']); 
    return(
      <div className='container_revision_page'>
        <div className='navbar'>
          <img className='logo' src={logo} onClick={()=>{ navigate('/Main_page') }}></img> <span className='divider'></span>
          <div className='navtext'> 안녕하세요 {user.name}님 </div>
          <img className='profile_img' src={profile_img} onClick={()=>{ navigate('/App') }} ></img>
        </div>
        <div className='container_page_revision'>
          <div className='revision_title'>오답노트</div>
          <div className='container_content_revision'>
              <div className='container_content_left_revision'>
                <div className='revision_video_word'>
                  <div className='revision_word_now'> {revision_word_now} </div>
                  <div className='_revision_video_container'> 
                    <video className='revision_video' src={video} controls autoPlay muted loop> </video>
                  </div>
                </div>
              </div>
              <div className='container_content_right_revision'>
                {
                  revision_word_list.map(function(word,i){
                    return(
                      <div className='revision_word' onClick={
                        ()=>{
                          let copy_now = revision_word_now;
                          let copy_list = [...revision_word_list];
                          copy_now = word;
                          copy_list[i] = revision_word_now;
                          revision_word_list_change = copy_list;
                          revision_word_now_change = copy_now;
                        }
                      }> {word} </div>
                    )
                  })
                }
              </div>
            </div>
          
        </div>

      </div>
    )
  }

  export default Revision_page;
  