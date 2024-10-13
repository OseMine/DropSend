import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { discoverPeers, sendFile } from '../services/networkService';

// Definition des Peer-Typs für bessere Typsicherheit
type Peer = {
  id: string;
  name: string;
};

export default function HomeScreen() {
  // State-Initialisierung mit dem korrekten Typ Peer[]
  const [peers, setPeers] = useState<Peer[]>([]);

  useEffect(() => {
    // Asynchrone Funktion zum Abrufen der Peers
    const fetchPeers = async () => {
      try {
        // Aufruf der discoverPeers-Funktion und Setzen des Zustands
        const discoveredPeers = await discoverPeers();
        //setPeers(discoveredPeers);
      } catch (error) {
        // Fehlerbehandlung
        console.error('Fehler beim Abrufen der Peers:', error);
      }
    };
    // Sofortiger Aufruf der fetchPeers-Funktion
    fetchPeers();
  }, []); // Leeres Dependency-Array bedeutet, dass dieser Effekt nur einmal beim Mounten ausgeführt wird

  // Funktion zum Senden einer Datei an einen bestimmten Peer
  const handleSendFile = (peerId: string) => {
    sendFile(peerId);
  };

  return (
    <View>
      <Text>Verfügbare Geräte:</Text>
      <FlatList
        data={peers}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSendFile(item.id)}>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
