import React, {useEffect, useRef, useState} from 'react';
import Directory from '../../components/directory/Directory.component'
import { HomePageContainer } from '../homepage/homepage.styles';

import SpeechRecognition, { finalTranscript,useSpeechRecognition } from "react-speech-recognition";

export default function VoiceToText() {
    const [message, setMessage] = useState('');
    
    const { transcript, resetTranscript } = useSpeechRecognition({commands});
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);
  const commands = [
    {
      command: transcript,
      callback: () => setMessage(transcript)
    },
    {
      command: 'shut up',
      callback: () => setMessage('I wasn\'t talking.')
    },
    {
      command: 'Hello',
      callback: () => setMessage('Hi there!')
    },
  ]
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
   
  };
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
    console.log(transcript)

  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };
  return (
    <div className="microphone-wrapper">
      <div className="mircophone-container">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleListing}
        >
          {/* <img src={microPhoneIcon} className="microphone-icon" /> */}
        </div>
        <div className="microphone-status">
          {isListening ? "Listening........." : "Click to start Listening"}
        </div>
        {isListening && (
          <button className="microphone-stop btn" onClick={stopHandle}>
            Stop
          </button>
        )}
      </div>
      {transcript && (
        <div className="microphone-result-container">
          <div className="microphone-result-text">{transcript}</div>
          <button className="microphone-reset btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
    </div>
  );
    
}

// if ("webkitSpeechRecognition" in window) {
//     // Initialize webkitSpeechRecognition
//     let speechRecognition = new webkitSpeechRecognition();
  
//     // String for the Final Transcript
//     let final_transcript = "";
  
//     // Set the properties for the Speech Recognition object
//     speechRecognition.continuous = true;
//     speechRecognition.interimResults = true;
  
//     // Callback Function for the onStart Event
//     speechRecognition.onstart = () => {
//       // Show the Status Element
//       document.querySelector("#status").style.display = "block";
//     };
//     speechRecognition.onerror = () => {
//       // Hide the Status Element
//       document.querySelector("#status").style.display = "none";
//     };
//     speechRecognition.onend = () => {
//       // Hide the Status Element
//       document.querySelector("#status").style.display = "none";
//     };
  
//     speechRecognition.onresult = (event) => {
//       // Create the interim transcript string locally because we don't want it to persist like final transcript
//       let interim_transcript = "";
  
//       // Loop through the results from the speech recognition object.
//       for (let i = event.resultIndex; i < event.results.length; ++i) {
//         // If the result item is Final, add it to Final Transcript, Else add it to Interim transcript
//         if (event.results[i].isFinal) {
//           final_transcript += event.results[i][0].transcript;
//         } else {
//           interim_transcript += event.results[i][0].transcript;
//         }
//       }
  
//       // Set the Final transcript and Interim transcript.
//       document.querySelector("#final").innerHTML = final_transcript;
//       document.querySelector("#interim").innerHTML = interim_transcript;
//     };
  
//     // Set the onClick property of the start button
//     document.querySelector("#start").onclick = () => {
//       // Start the Speech Recognition
//       speechRecognition.start();
//     };
//     // Set the onClick property of the stop button
//     document.querySelector("#stop").onclick = () => {
//       // Stop the Speech Recognition
//       speechRecognition.stop();
//     };
//   } else {
//     console.log("Speech Recognition Not Available");
//   }