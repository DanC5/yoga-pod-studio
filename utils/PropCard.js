import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PropCard = ({ prop }) => {
  const [selected, setSelected] = useState(false);

  return (
    <TouchableOpacity
      onPress={() => setSelected(!selected)}
      style={selected ? styles.selectedCard : styles.unselectedCard}
    >
      <Text style={selected ? styles.selectedText : styles.unselectedText}>
        {prop}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  unselectedCard: {
    padding: 10,
    margin: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5
  },
  selectedCard: {
    padding: 10,
    margin: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "blue"
  },
  unselectedText: {
    fontSize: 25,
    color: "gray"
  },
  selectedText: {
    fontSize: 25,
    color: "#fff"
  }
});

export default PropCard;
