import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate } from 'react-native-webrtc';

let peerConnection: RTCPeerConnection | null = null;

export function setupPeerConnection() {
  peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  });

  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      // Senden Sie den ICE-Kandidaten über den WebSocket an den anderen Peer
      sendSignalingMessage({ type: 'ice-candidate', candidate: event.candidate });
    }
  };

  peerConnection.onconnectionstatechange = (event) => {
    console.log('Connection state change:', peerConnection?.connectionState);
  };

  return peerConnection;
}

export async function createOffer() {
  if (!peerConnection) {
    peerConnection = setupPeerConnection();
  }
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  return offer;
}

export async function handleAnswer(answer: RTCSessionDescription) {
  if (!peerConnection) {
    console.error('PeerConnection not initialized');
    return;
  }
  await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
}

export async function handleIceCandidate(candidate: RTCIceCandidate) {
  if (!peerConnection) {
    console.error('PeerConnection not initialized');
    return;
  }
  await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
}
