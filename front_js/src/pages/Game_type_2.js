import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Webcam from 'react-webcam'
import { useState, useRef, useCallback, useEffect } from 'react';
import '../styles/Game_page_2.css';
import { useSelector , useDispatch} from "react-redux"
import { correct, wrong} from '../store';


// Part of the code for retrieving video file is taken from https://www.npmjs.com/package/react-webcam#capturing-video

function Game_type_2() {
  let webcamRef = useRef(null)
  let mediaRecorderRef = useRef(null)
  let game_state = useSelector((state) => { return state.game_state } )
  let navigate = useNavigate()
  let dispatch = useDispatch()
  let [quizword, quizchange] = useState('개' )
  let recordedChunksRef = useRef([])

  const handleDataAvailable = useCallback(
    ({ data }) => {
      console.log("data available")
      if (data.size > 0) {
        recordedChunksRef.current.push(data)
      }
    },
    [recordedChunksRef]
  );

  const startRecording = useCallback(() => {
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    })
    mediaRecorderRef.current.addEventListener("dataavailable", handleDataAvailable)
    mediaRecorderRef.current.start();
  }, [webcamRef, mediaRecorderRef, handleDataAvailable])

  const onRecordingStop = useCallback(async () => {
    console.log("Record stopped, sending request...")
    set_cameraContainer_op(0)
    setstarttime(false)
    set_loading_op(0) 
    let formData = new FormData();
    formData.append("file", new Blob(recordedChunksRef.current, {type: "video/webm"}))
    let response = await fetch("http://127.0.0.1:8000/predict/", {
      method: "POST",
      body: formData,
      mode: "cors"
    })
    if (!response.ok) {
      return;
    }
    let responseJson = await response.json();
    console.log("Response received: %o", responseJson);
    set_cameraContainer_op(1) 
    set_loading_op(1) 
    
    if (responseJson.predicted === quizword) {
      // The answer is correct.
      // TODO: Add visual feedback.
      console.log("The answer is correct")
      dispatch(correct())
      quizchange(quizword = '동전')
      console.log(quizword)
      set_Qstate(false)
      setresult(true)
      setTimeout( ()=>{set_Qstate(true)}, 1000)
      //navigate('/Game_result_page')
    }
    else {
      console.log("The answer is wrong")
      dispatch(wrong())
      quizchange(quizword = '동전')
      console.log(quizword)
      set_Qstate(false)
      setresult(false)
      setTimeout( ()=>{set_Qstate(true)}, 1000)
      // The answer is not correct.
      // TODO: Add visual feedback.
    }

    recordedChunksRef.current = []
  }, [recordedChunksRef, navigate, quizword])

  const endRecording = useCallback(() => {
    console.log("Stopping the recording")
    clearInterval()
    // The data is not immediately available when stop() is called.
    // Instead, we need to wait until the onstop event fires (as dataavailable will be called at least once before onstop is called).
    mediaRecorderRef.current.addEventListener("stop", onRecordingStop)
    mediaRecorderRef.current.stop();
    console.log("Stop requested")
  }, [mediaRecorderRef, onRecordingStop])

  let [camera_op,set_camera_op] = useState(0.85)
  let [cameraContainer_op,set_cameraContainer_op] = useState(1)
  let [loading_op,set_loading_op] = useState(1)

  let [Qstate, set_Qstate] = useState(true)
  let [result, setresult] = useState(true)




  //const [count, setCount] = useState(4);
  let [starttime,setstarttime] = useState(false)
  const [filled, setFilled] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      //setCount((count) => count - 1)
      setFilled((filled) => filled + (100/38))
    }, 100);
    return () => clearInterval(id)
  }, [filled]);


  return (
      <div className='container_game'>
          <div className='game_howto'>다음 단어를 수화로 표현해보세요!</div>

          {
            Qstate == true  
            ? <div className='quiz_word'> {quizword} </div>
            : (result == true 
              ? <div className='quiz_word' style={{  color: "#7cd3ff",
                                                      fontweight: "800"}}> 정답입니다 </div>
              : <div className='quiz_word' style={{  color: "#ff8484",
                                                      fontweight: "800"}}> 틀렸습니다 </div>
              )
          }
          
          <div className='vidtimebar'>
            {
              starttime == true 
              ? <div className='time' style={{
                width: `${filled}%`,
                height: "10px",
                backgroundcolor: "#ff5f8a;",
                borderradius: "10px",
                transition: "width 1s"
                }}>
                </div>
              : null

            }

          </div>
          <div className='loading'>
            <div className='startwindow' style={{
                opacity: `${loading_op}`,
                transition: "opacity 0.5s"
              }}> 
              <div className='camera_container' style={{
                opacity: `${cameraContainer_op}`,
                transition: "opacity 0.5s"
              }}> 
                <Webcam className='camera' audio={false} ref={webcamRef} style={{
                    opacity: `${camera_op}`,
                    borderradius: "20px",
                    transform: "rotateY(180deg)",
                    transition: "opacity 0.5s"
              }}></Webcam>
              </div>
            </div>
          </div>


          <div className='start_btn' onClick={  ()=>{ 
            // Start recording. Set a timer that runs for 10 seconds (that ends the recording when done).
            // TODO: Animate the time remaining bar to show progress?
            console.log("Start recording")
            startRecording()
            setFilled(0)
            setstarttime(true)
            set_cameraContainer_op(0) 
            console.log(cameraContainer_op)
            setTimeout( ()=> { set_cameraContainer_op(1) }, 1000)
            setTimeout(endRecording, 5000)
          }}>시작</div>        
      </div>
  )
}

export default Game_type_2;
