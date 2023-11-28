import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Webcam from 'react-webcam'
import { useState, useRef, useCallback } from 'react';
import '../styles/Game_page_2.css';

// Part of the code for retrieving video file is taken from https://www.npmjs.com/package/react-webcam#capturing-video

function Game_type_2() {
  let webcamRef = useRef(null)
  let mediaRecorderRef = useRef(null)
  let navigate = useNavigate()
  let [quizvid, quizchange] = useState( {quiznum: 2, quizword : '가렵다' }  )
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
    if (responseJson.predicted === quizvid.quizword) {
      // The answer is correct.
      // TODO: Add visual feedback.
      console.log("The answer is correct")
      navigate('/Game_result_page')
    }
    else {
      // The answer is not correct.
      // TODO: Add visual feedback.
    }

    recordedChunksRef.current = []
  }, [recordedChunksRef, navigate, quizvid])

  const endRecording = useCallback(() => {
    console.log("Stopping the recording")
    clearInterval()
    // The data is not immediately available when stop() is called.
    // Instead, we need to wait until the onstop event fires (as dataavailable will be called at least once before onstop is called).
    mediaRecorderRef.current.addEventListener("stop", onRecordingStop)
    mediaRecorderRef.current.stop();
    console.log("Stop requested")
  }, [mediaRecorderRef, onRecordingStop])

  return (
      <div className='container_page'>
          <div className='game_howto'>다음 단어를 수화로 표현해보세요!</div>

          <div className='quiz_word'> {quizvid.quizword} </div>

          <div className='camera_container'> 
            <Webcam className='camera' audio={false} ref={webcamRef}></Webcam>
          </div>

          <div className='start_btn' onClick={()=>{ 
            // Start recording. Set a timer that runs for 10 seconds (that ends the recording when done).
            // TODO: Animate the time remaining bar to show progress?
            console.log("Start recording")
            startRecording()
            setTimeout(endRecording, 1000)
          }}>시작</div>
        
      </div>
  )
}

export default Game_type_2;
