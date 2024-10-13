import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const BACKGROUND_FETCH_TASK = 'background-fetch';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  // Implementieren Sie hier die Hintergrundaktualisierungslogik
  // Beispiel:
  console.log('Hintergrundaktualisierung durchgeführt');
  // Wenn Sie neue Daten erhalten haben:
  return BackgroundFetch.BackgroundFetchResult.NewData;
  // Wenn keine neuen Daten vorhanden sind:
  // return BackgroundFetch.BackgroundFetchResult.NoData;
  // Wenn ein Fehler aufgetreten ist:
  // return BackgroundFetch.BackgroundFetchResult.Failed;
});

export async function registerBackgroundFetch() {
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 60 * 15, // 15 Minuten
      stopOnTerminate: false,
      startOnBoot: true,
    });
    console.log('Hintergrund-Fetch-Task registriert');
  } catch (error) {
    console.error('Fehler bei der Registrierung des Hintergrund-Fetch-Tasks:', error);
  }
}
