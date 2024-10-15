import './Chat.css';
import { useState, useEffect, KeyboardEvent } from 'react'
import { useLocation } from 'react-router';
import queryString from 'query-string'
import io, { Socket } from 'socket.io-client'
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import { MessageInterface } from '../../interface/message';
import TextContainer from '../TextContainer/TextContainer';
let socket: Socket;

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState<{ name: string }[]>([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<MessageInterface[]>([]);
  const ENDPOINT = 'localhost:4000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT, { transports: ['websocket'] });
    setName(name as string || '');
    setRoom(room as string || '');

    socket.emit('join', { name, room }, (error: any) => {
      if (error) {
        console.log('error', error);
        alert(error);
      }  
    });
  }, [location.search, ENDPOINT]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => {
        return [...prevMessages, message]
      });
    });

    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });
  
    return () => {
      socket.off('message');
      socket.off('roomData');
    };
  }, []);

  const sendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e) {
      e.preventDefault();
    }
  
    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''))
    }
  }

  return (
    <div className="outerContainer">
      <div className="innerContainer">
        <InfoBar room={room} />
        <Messages name={name} messages={messages} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users}/>
      {/* Chat component content goes here */}
    </div>
  );
};

export default Chat;