import React, { useState } from "react";
import './chatWidget.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Merhaba! Yardımcı olabilir miyim?", sender: "mentor" },
    { text: "Evet, bir mentora ulaşmak istiyorum.", sender: "user" }
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <div className="chat-widget-container">
      {isOpen ? (
        <div className="chat-widget">
          {/* Header */}
          <div className="chat-widget-header">
            <div className="chat-widget-mentor-info">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="mentor"
                className="chat-widget-mentor-image"
              />
              <div>
                <h3 className="chat-widget-mentor-name">William Johnson</h3>
                <p className="chat-widget-mentor-job">Web Tasarımcı</p>
              </div>
            </div>
            <button className="chat-widget-close-button" onClick={() => setIsOpen(false)}>
              <FontAwesomeIcon icon={faArrowDown} />
            </button>
          </div>

          {/* Body */}
          <div className="chat-widget-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-widget-message ${msg.sender === "user" ? "chat-widget-user-message" : "chat-widget-mentor-message"}`}
              >
                <div className={`chat-widget-message-bubble ${msg.sender === "user" ? "chat-widget-user-bg" : "chat-widget-mentor-bg"}`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="chat-widget-input-container">
            <input
              className="chat-widget-input"
              value={newMessage}
              onChange={handleInputChange}
              placeholder="Mesajınızı yazın..."
            />
            <button className="chat-widget-send-button" onClick={handleSendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="chat-widget-open-button"
        >
          <FontAwesomeIcon icon={faCommentDots} />
        </button>
      )}
    </div>
  );
}
