import { w3cwebsocket as W3CWebSocket } from 'websocket';

let socket: W3CWebSocket | null = null;

export function setupWebSocket() {
  socket = new W3CWebSocket('ws://your-server-url:8080');

  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onmessage = (message) => {
    const data = JSON.parse(message.data as string);
    handleSignalingMessage(data);
  };

  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };
}

export function sendSignalingMessage(message: any) {
  if (socket && socket.readyState === socket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket is not open');
  }
}

function handleSignalingMessage(message: any) {
  switch (message.type) {
    case 'offer':
      handleOffer(message.offer);
      break;
    case 'answer':
      handleAnswer(message.answer);
      break;
    case 'ice-candidate':
      handleIceCandidate(message.candidate);
      break;
    default:
      console.log('Unknown message type:', message.type);
  }
}
