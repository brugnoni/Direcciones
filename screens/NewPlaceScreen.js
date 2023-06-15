import React, { useState } from "react";
import { Button } from "react-native";
import { TextInput } from "react-native";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { COLORS } from "../constants";
import { addPlace } from "../store/places.actions";
import { useDispatch } from "react-redux";

const NewPlaceScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const handleTitleChange = (text) => {
    setTitle(text);
  };
  const handleSave = () => {
    dispatch(addPlace(title));
    navigation.navigate("Direcciones");
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={handleTitleChange}
        />
        <Button
          title="Guardar Dirección"
          color={COLORS.MAROON}
          onPress={handleSave}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 16,
  },
  input: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 2,
    paddingVertical: 4,
  },
});

export default NewPlaceScreen;
