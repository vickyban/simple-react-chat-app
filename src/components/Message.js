import React from 'react'

const Message = ({ message }) => (
  <div className="message">
    <div className="message-username">{message.senderId}</div>
    <div className="message-text">{message.text}</div>
  </div>
)

export default Message;
