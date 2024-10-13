import React, { useState } from 'react';
import { View, Text, Switch, TextInput } from 'react-native';

export default function SettingsScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [username, setUsername] = useState('');

  return (
    <View>
      <Text>Einstellungen</Text>
      <View>
        <Text>Immer sichtbar sein</Text>
        <Switch value={isVisible} onValueChange={setIsVisible} />
      </View>
      <View>
        <Text>Benutzername</Text>
        <TextInput value={username} onChangeText={setUsername} />
      </View>
    </View>
  );
}
