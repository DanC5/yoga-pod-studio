import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PropCard = ({ prop, props, unselectAll, setUnselectAll }) => {
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
    padding: 10,
    margin: 10,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5
  },
  selectedCard: {
    padding: 10,
    margin: 10,
    borderColor: "#e6e6e6",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#00aeef"
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
