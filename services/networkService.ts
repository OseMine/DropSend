import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate } from 'react-native-webrtc';
import { sendSignalingMessage } from './websocketService';

export type CustomPeer = {
  id: string;
  name: string;
};

let peerConnection: RTCPeerConnection | null = null;

export async function discoverPeers(): Promise<CustomPeer[]> {
  // Implementieren Sie hier die Peer-Discovery-Logik
  return [];
}

export async function sendFile(peerId: string): Promise<void> {
  // Implementieren Sie hier die Dateiübertragungslogik
  console.log(`Sending file to peer ${peerId}`);
}

export function setupPeerConnection() {
  peerConnection = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  });

  peerConnection.addEventListener('icecandidate', (event) => {
    if (event.candidate) {
      sendSignalingMessage({ type: 'ice-candidate', candidate: event.candidate });
    }
  });

  peerConnection.addEventListener('connectionstatechange', () => {
    console.log('Connection state change:', peerConnection?.connectionState);
  });

  return peerConnection;
}

export async function createOffer() {
  if (!peerConnection) {
    peerConnection = setupPeerConnection();
  }
  const offer = await peerConnection.createOffer({});
  await peerConnection.setLocalDescription(offer);
  return offer;
}

export async function handleOffer(offer: RTCSessionDescription) {
  if (!peerConnection) {
    peerConnection = setupPeerConnection();
  }
  await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await peerConnection.createAnswer();  // Leeres Optionsobjekt hinzugefügt
  await peerConnection.setLocalDescription(answer);
  return answer;
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
