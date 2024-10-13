import { useState, useEffect, KeyboardEvent } from 'react'
import { useLocation } from 'react-router';
import queryString from 'query-string'
import io, { Socket } from 'socket.io-client'


let socket: Socket;

const Chat = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
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
    return () => {
      // socket.emit('disconnect');
      // socket.off();
    }
  }, []);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => {
        return [...prevMessages, message]
      });
    });

    return () => {
      socket.off('message');
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
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' ? sendMessage(e) : null}
        />
      </div>
      {/* Chat component content goes here */}
    </div>
  );
};

export default Chat;