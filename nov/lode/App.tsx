import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, FlatList, Image, ScrollView } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const imgDir = FileSystem.documentDirectory + 'images/';

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

export default function App() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    await ensureDirExists();
    const files = await FileSystem.readDirectoryAsync(imgDir);
    if (files.length > 0) {
      setImages(files.map((f) => imgDir + f));
    }
    setLoading(false);
  };

  const selectImage = async (useLibrary: boolean) => {
    let result;

    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (result && !result.canceled && result.assets && result.assets.length > 0) {
      saveImage(result.assets[0].uri);
    }
  };

  const saveImage = async (uri: string) => {
    await ensureDirExists();
    const filename = new Date().getTime() + '.jpg';
    const dest = imgDir + filename;
    await FileSystem.copyAsync({ from: uri, to: dest });
    setImages([...images, dest]);
  };

  const deleteImage = async (uri: string) => {
    await FileSystem.deleteAsync(uri);
    setImages(images.filter((i) => i !== uri));
  };

  const uploadImage = async (uri: string) => {
    setLoading(true);
    await FileSystem.uploadAsync('http://192.168.1.243:3000/post', uri, {
      httpMethod: 'POST',
      uploadType: FileSystem.FileSystemUploadType.MULTIPART,
      fieldName: 'file',
    });
    setLoading(false);
  };

  const renderItem = ({ item }: { item: string }) => {
    const filename = item.split('/').pop();

    return (
      <View style={{ flex: 1, margin: 10 }}>
        <Image source={{ uri: item }} style={{ width: 100, height: 100 }} />
        <Text style={{ flex: 1 }}>{filename}</Text>
        <Ionicons.Button name="cloud-upload" onPress={() => uploadImage(item)} />
        <Ionicons.Button name="trash" onPress={() => deleteImage(item)} />
      </View>
    );
  };

  return (
     <View >
      <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
        <Button title="Photo Library" onPress={() => selectImage(true)} />
        <Button title="Capture Image" onPress={() => selectImage(false)} />
      </View>

      <ScrollView>
        {images.map((img) => (
          <Image key={img} source={{ uri: img }} style={{ width: 300, height: 300, alignSelf: 'center' }} />
        ))}
      </ScrollView>

      <FlatList data={images} renderItem={renderItem} />

      {loading && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'green',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
        >
          <StatusBar style="auto" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
