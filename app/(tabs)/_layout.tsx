import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RootLayout() {
  const [permission, requestPermission] = useCameraPermissions();
  const [monitoring, setMonitoring] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleMonitoring() {
    setMonitoring(prev => !prev);
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={'front'}>
         
        <View style={styles.buttonContainer}>
        <Text style={styles.monitoringText}>{monitoring ? '📷 Monitoreando' : 'Pausado'}</Text>
          <TouchableOpacity onPress={toggleMonitoring}>
            <Text style={styles.text}>{monitoring ? 'Pausar' : 'Reanudar'}</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  monitoringText: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
   borderRadius: 10,
   borderColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
  },
  text: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    padding: 10,
    borderRadius: 10,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 1,
  },
});
