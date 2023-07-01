import { FlatList, StyleSheet } from "react-native";
import { loadAddress } from "../store/places.actions";
import PlaceItem from "../components/PlaceItem";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

const PlaceListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const places = useSelector((state) => state.places.places);

  useEffect(() => {
    dispatch(loadAddress());
  }, []);

  const renderItem = ({ item }) => (
    <PlaceItem
      title={item.title}
      image={item.image}
      address={item.address}
      onSelect={() => navigation.navigate("Detalle", { placeId: item.id })}
    />
  );

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PlaceListScreen;
