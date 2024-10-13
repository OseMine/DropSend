import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export async function shareFile(fileUri: string) {
  if (!(await Sharing.isAvailableAsync())) {
    alert('Sharing is not available on this device');
    return;
  }

  await Sharing.shareAsync(fileUri);
}
