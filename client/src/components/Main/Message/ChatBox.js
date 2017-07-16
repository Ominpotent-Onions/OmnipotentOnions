import React from 'react';

const ChatBox = ({message}) => (
  <p>{message.user}: {message.message}</p>
);

export default ChatBox;