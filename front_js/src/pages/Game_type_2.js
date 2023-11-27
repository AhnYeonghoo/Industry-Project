import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Webcam from 'react-webcam'
import { useState } from 'react';
import '../styles/Game_page_2.css';


function Game_type_2() {
    let navigate = useNavigate()
    let [quizvid, quizchange] = useState( {quiznum: 2, quizword : '나무' }  )
    return(
        <div className='container_page'>
            <div className='game_howto'>다음 단어를 수화로 표현해보세요!</div>

            <div className='quiz_word'> {quizvid.quizword} </div>

            <div className='camera_container'> 
              <Webcam className='camera'></Webcam> 
            </div>

            <div className='start_btn' onClick={()=>{ navigate('/Game_result_page')}}>시작</div>
            
          
        </div>


    )
  }

  export default Game_type_2;
  