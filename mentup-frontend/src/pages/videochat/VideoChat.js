import React, { useRef, useState, useEffect } from 'react';
import './VideoChat.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMicrophone,
  faMicrophoneSlash,
  faVideo,
  faVideoSlash,
  faPhoneSlash,
  faComment,
  faCommentSlash,
  faPhone,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

const VideoChat = () => {
  const [isCalling, setIsCalling] = useState(false);
  const [peerConnection, setPeerConnection] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isChatOff, setIsChatOff] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  const getMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStreamRef.current = stream;
      localVideoRef.current.srcObject = stream;
      return stream;
    } catch (err) {
      console.error("Kamera ve mikrofon hatası:", err);
    }
  };

  const startCall = async () => {
    const stream = await getMediaStream();
    const pc = new RTCPeerConnection();

    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream);
    });

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("ICE Candidate:", event.candidate);
      }
    };

    pc.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    setPeerConnection(pc);
    setIsCalling(true);
  };

  const toggleMute = () => {
    const track = localStreamRef.current.getTracks().find((track) => track.kind === 'audio');
    track.enabled = !track.enabled;
    setIsMuted(!isMuted);
  };

  const toggleCamera = () => {
    const track = localStreamRef.current.getTracks().find((track) => track.kind === 'video');
    track.enabled = !track.enabled;
    setIsCameraOff(!isCameraOff);
  };

  const endCall = () => {
    peerConnection.close();
    setIsCalling(false);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
    setIsChatOff(!isChatOff);
  };

  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;

    setMessages([...messages, messageInput]);
    setMessageInput('');
  };

  useEffect(() => {
    if (isCalling) {
      // Signaling server'dan offer alınıp bağlantı kurulabilir
    }
  }, [isCalling]);

  return (
    <div className="video-chat-container">
      <div className="video-chat">
        <div className="video-container">
          <video ref={localVideoRef} autoPlay muted />
          <p>Mentee</p>
        </div>
        <div className="video-container">
          <video ref={remoteVideoRef} autoPlay />
          <p>Mentor</p>
        </div>
      </div>

      <div className="video-controls">
        <button onClick={toggleMute}>
          <FontAwesomeIcon icon={isMuted ? faMicrophoneSlash : faMicrophone} />
          {isMuted ? 'Mikrofonu Aç' : 'Mikrofonu Kapat'}
        </button>
        <button onClick={toggleCamera}>
          <FontAwesomeIcon icon={isCameraOff ? faVideoSlash : faVideo} />
          {isCameraOff ? 'Kamerayı Aç' : 'Kamerayı Kapat'}
        </button>
        <button onClick={toggleChat}>
          <FontAwesomeIcon icon={isChatOff ? faComment : faCommentSlash} />
          {isChatOff ? 'Chat Ekranını Aç' : 'Chat Ekranını Kapa'}
        </button>
      </div>

      {showChat && (
        <div className="chat-container">
          <div className="chat-header">
            <h3>Sohbet</h3>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div key={index} className="chat-message">
                {msg}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              placeholder="Mesajınızı yazın..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <button onClick={handleSendMessage}>
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </div>
      )}
      <div className="call-buttons">
        <button
        className={`call-button ${isCalling ? 'end' : ''}`}
        onClick={isCalling ? endCall : startCall}
        >
        <FontAwesomeIcon icon={isCalling ? faPhoneSlash : faPhone} />
        {isCalling ? ' Görüşmeyi Sonlandır' : ' Görüşmeyi Başlat'}
        </button>
      </div>

    </div>
  );
};

export default VideoChat;
