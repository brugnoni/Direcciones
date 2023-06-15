import { StyleSheet, Text, View, Alert, Button } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants";
import * as Location from "expo-location";

const LocationSelector = ({ onLocation }) => {
  const navigation = useNavigation();
  const [pickedLocation, setPickedLocation] = useState();

  const handleGetLocation = async () => {
    const isLocationOk = await verifyPermissions();
    if (!isLocationOk) return;

    const location = await Location.getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
    onLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  };
  const verifyPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permisos insuficientes, porfavor acepte los permisos", [
        { text: "Ok" },
      ]);
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {pickedLocation ? (
          <Text>
            {pickedLocation.lat}, {pickedLocation.lng}
          </Text>
        ) : (
          <Text>Esperando Ubicación...</Text>
        )}
      </View>
      <Button
        title="Obtener Ubicación"
        color={COLORS.PEACH_PUFF}
        onPress={handleGetLocation}
      />
    </View>
  );
};

export default LocationSelector;

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
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
