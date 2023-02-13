import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type Props = {
  prop: string;
  props: string[];
  setUnselectAll: React.Dispatch<React.SetStateAction<boolean>>;
  unselectAll: boolean;
};

export const PropCard: React.FC<Props> = ({ prop, props, setUnselectAll, unselectAll }) => {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (unselectAll) {
      setSelected(false);
    }
  }, [unselectAll]);

  const handlePress = () => {
    if (unselectAll) {
      setUnselectAll(false);
    }
    setSelected(!selected);

    if (!props.includes(prop)) {
      props.push(prop);
    } else {
      props.splice(props.indexOf(prop), 1);
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={selected && !unselectAll ? styles.selectedCard : styles.unselectedCard}
    >
      <Text style={selected && !unselectAll ? styles.selectedText : styles.unselectedText}>
        {prop}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  unselectedCard: {
    borderColor: "gray",
    borderRadius: 8,
    borderWidth: 1,
    margin: 10,
    padding: 16,
  },
  selectedCard: {
    backgroundColor: "#00aeef",
    borderColor: "#e6e6e6",
    borderRadius: 8,
    borderWidth: 1,
    margin: 10,
    padding: 16,
  },
  unselectedText: {
    color: "gray",
    fontSize: 20,
  },
  selectedText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
