import React, { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const SearchBar = () => {
  const [sentences, setSentences] = useState([]);
  const [listeningDuration, setListeningDuration] = useState(10); // duration for auto stop in seconds
  const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

  useEffect(() => {
    console.log("Transcript Updated:", transcript); // Log transcript data
    if (transcript) {
      setSentences((prevSentences) => [...prevSentences, transcript]); // Add new transcript to sentences
    }
  }, [transcript]);

  // Stop listening function after a duration
  const startListening = () => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true, language: 'en-US' });
      console.log("Started listening...");
      setTimeout(() => {
        stopListening(); // Automatically stop after listeningDuration
      }, listeningDuration * 1000); // Convert to milliseconds
    } else {
      console.log("Browser does not support speech recognition.");
    }
  };

  // Stop listening function
  const stopListening = () => {
    SpeechRecognition.stopListening();
    console.log("Stopped listening...");
  };

  // Reset function
  const resetAll = () => {
    resetTranscript();
    setSentences([]);
    console.log("Reset all data...");
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Browser Not Supported</h2>
        <p>Your browser does not support speech recognition. Please try a different browser.</p>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Voice Recognition with Real-Time Sentence Display</h2>
      <p>Click on the mic, speak, and your sentences will appear below in real-time:</p>
      <div>
        <button onClick={startListening} style={{ marginRight: '10px' }}>🎤 Start Listening</button>
        {listening && (
          <>
            {/* Show this section only when listening is active */}
            <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '50%', margin: '20px auto', background: '#f9f9f9' }}>
              <strong>Listening:</strong> {listening ? "Yes" : "No"}
            </div>
          </>
        )}
      </div>
      <div style={{ marginTop: '20px', fontSize: '18px', color: '#333' }}>
        <strong>Current Transcript:</strong>
        <p>{transcript || "Start speaking to see your speech here..."}</p>
      </div>
      <div style={{ marginTop: '30px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', width: '60%', margin: '20px auto', background: '#e8f4fa' }}>
        <h3>Real-Time Spoken Sentences:</h3>
        <p>{sentences.join(' ')}</p>
      </div>
    </div>
  );
};

export default SearchBar;
