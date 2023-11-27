import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { useState } from 'react';
import video from '../img/sign.mov'; 
import '../styles/Game_page_1.css';
import { useSelector , useDispatch} from "react-redux"
import { correct, wrong} from '../store';



function Game_type_1() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let user = useSelector((state) => { return state.user_info } )
    let quiz_state
    //quiznum: 1, quizword : ['하늘', '풀', '별' ], quizanswer : '나무' } 
    let [quiz, quizchange] = useState( {quiznum: 1, quizword : [ {word : '나무', answer : 1}, 
                                                                {word : '하늘', answer : 0},
                                                                {word : '풀', answer : 0},
                                                                {word : '바람', answer : 0}]}  )
    let [my_game_info, my_game_info_ch] = useState( {score : 0, heart : 3 })
    return(
          <div className='container_game'>
            <div className='game_howto'>아래 영상에서 말하는 단어를 골라주세요!</div>
            <div className='video_container'> 
              <video className='video' src={video} controls autoPlay muted loop> </video>
            </div>
            <div className='answer_container'> 
              <div className='answer_list_row'> 
                <div className='answer_btn' onClick={()=>{ 
                    quiz.quizword[0].answer == 1 ? dispatch(correct()) : dispatch(wrong())
                  }}> {quiz.quizword[0].word}</div>
                <div className='answer_btn' onClick={()=> { 
                    quiz.quizword[1].answer == 1 ? dispatch(correct()) : dispatch(wrong())
                  }}> {quiz.quizword[1].word} </div>
              </div>
              <div className='answer_list_row'>
                <div className='answer_btn' onClick={()=>{ 
                    quiz.quizword[2].answer == 1 ? dispatch(correct()) : dispatch(wrong())
                  }}> {quiz.quizword[2].word} </div>
                <div className='answer_btn' onClick={()=>{ 
                    quiz.quizword[3].answer == 1 ? dispatch(correct()) : dispatch(wrong())
                  }}> {quiz.quizword[3].word} </div>
              </div>
            </div>
          </div>

    )
  }

  export default Game_type_1;
  