import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PropCard = ({ prop, props, setUnselectAll, unselectAll }) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (unselectAll) setSelected(false);
  }, [unselectAll]);

  const handlePress = () => {
    if (unselectAll) setUnselectAll(false);
    setSelected(!selected);

    if (!props.includes(prop)) {
      props.push(prop);
    } else {
      props.splice(props.indexOf(prop), 1);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handlePress()}
      style={
        selected && !unselectAll ? styles.selectedCard : styles.unselectedCard
      }
    >
      <Text
        style={
          selected && !unselectAll ? styles.selectedText : styles.unselectedText
        }
      >
        {prop}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  unselectedCard: {
    borderColor: "gray",
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    padding: 10
  },
  selectedCard: {
    backgroundColor: "#00aeef",
    borderColor: "#e6e6e6",
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    padding: 10
  },
  unselectedText: {
    color: "gray",
    fontSize: 25
  },
  selectedText: {
    color: "#fff",
    fontSize: 25
  }
});

export default PropCard;
