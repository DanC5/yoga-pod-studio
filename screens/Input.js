import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Picker,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { classes, classProps } from "../utils/data";
import PropCard from "../utils/PropCard";

const InputScreen = ({ navigation }) => {
  const [teacher, setTeacher] = useState("");
  const [classStyle, setClassStyle] = useState("podFIT");
  const [props, setProps] = useState([]);
  const [notes, setNotes] = useState("");

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text
        style={styles.title}
        onPress={() => navigation.navigate("Display", { teacher, classStyle })}
      >
        Set Up Your Class:
      </Text>
      <View style={styles.inputWrap}>
        <Text style={styles.inputLabel}>Teacher:</Text>
        <TextInput
          style={styles.input}
          value={teacher}
          onChangeText={setTeacher}
        />
      </View>
      <View style={styles.pickerWrap}>
        <Text style={styles.inputLabel}>Class Type:</Text>
        <Picker
          selectedValue={classStyle}
          onValueChange={setClassStyle}
          style={styles.picker}
        >
          {classes.map((c, i) => {
            return <Picker.Item key={i} label={c} value={c} />;
          })}
        </Picker>
      </View>
      <View style={styles.propsWrap}>
        <Text style={styles.inputLabel}>Class Props:</Text>
        <View style={styles.propsCol}>
          <View style={styles.propsRow}>
            {classProps.map((p, i) => {
              if (i < 3) {
                return <PropCard prop={p} key={i} />;
              }
            })}
          </View>
          <View style={styles.propsRow}>
            {classProps.map((p, i) => {
              if (i >= 3) {
                return <PropCard prop={p} key={i} />;
              }
            })}
          </View>
        </View>
      </View>
      <View style={styles.inputWrap}>
        <Text style={styles.inputLabel}>Class Notes:</Text>
        <TextInput
          multiline={true}
          numberOfLines={2}
          style={styles.notesInput}
        />
      </View>
      <View style={styles.buttonWrap}>
        <TouchableOpacity style={styles.clearBtn}>
          <Text style={styles.clearText}>Clear Fields</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.setBtn}>
          <Text style={styles.setText}>Set Display</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 40,
    paddingBottom: 20
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center"
  },
  inputLabel: {
    fontSize: 30,
    paddingRight: 20
  },
  input: {
    height: 40,
    width: "30%",
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 20,
    paddingLeft: 10
  },
  pickerWrap: {
    flexDirection: "row",
    alignItems: "center"
  },
  picker: {
    width: 200,
    height: "100%"
  },
  propsWrap: {
    flexDirection: "row",
    alignItems: "center"
  },
  propsCol: {
    flexDirection: "column",
    alignItems: "center"
  },
  propsRow: {
    flexDirection: "row"
  },
  notesInput: {
    height: 80,
    width: "30%",
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 20,
    paddingLeft: 10
  },
  buttonWrap: {
    flexDirection: "row",
    margin: 10
  },
  clearBtn: {
    backgroundColor: "gray",
    margin: 10,
    padding: 10,
    borderRadius: 5
  },
  clearText: {
    color: "red",
    fontSize: 30
  },
  setBtn: {
    backgroundColor: "blue",
    margin: 10,
    padding: 10,
    borderRadius: 5
  },
  setText: {
    color: "white",
    fontSize: 30
  }
});

export default InputScreen;
