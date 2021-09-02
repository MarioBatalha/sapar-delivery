import { io } from 'socket.io-client';

const socket = () => {
  return io('http://192.168.1.71:8000');
};

export default socket;
