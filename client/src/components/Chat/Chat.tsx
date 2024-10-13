import { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

interface Location {
  search: string
}

let socket;

const Chat = ({ location }: { location: Location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const ENDPOINT = 'localhost:4000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT, { transports: ['websocket'] });
    setName(name as string || '');
    setRoom(room as string || '');

    socket.emit('join', { name, room }, (error: any) => {
      if (error) {
        alert(error);
      }  
    }); 
  }, [ENDPOINT, location.search]);

  return (
    <div>Chat</div>
  )
}

export default Chat