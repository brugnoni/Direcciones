import { StyleSheet, Text, View, Button, Image, Alert } from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { COLORS } from "../constants";

const ImageSelector = (props) => {
  const [pickedUri, setpickedUri] = useState();
  const verifyPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permisos insuficientes, necesitamos permisos de la Cámara", [
        { text: "Ok" },
      ]);
      return false;
    }
    return true;
  };
  const handlerTakeImage = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) return;

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    setpickedUri(image.assets[0].uri);
    props.onImage(image.assets[0].uri);
  };
  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {!pickedUri ? (
          <Text>No has seleccionado una imagen...</Text>
        ) : (
          <Image style={styles.image} source={{ uri: pickedUri }} />
        )}
      </View>
      <Button
        title="Tomar Foto"
        color={COLORS.LIGTH_PINK}
        onPress={handlerTakeImage}
      />
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  preview: {
    width: "100%",
    height: 200,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderColor: COLORS.PEACH_PUFF,
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
