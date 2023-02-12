import React, { useEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import { PropCard } from "../components/PropCard";
import { classes, classProps } from "../utils/constants";

import type { NavigationProp } from "../Navigator";

export const InputScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [classStyle, setClassStyle] = useState("FLOW 2");
  const [error, setError] = useState(false);
  const [props, setProps] = useState<string[]>([]);
  const [teacher, setTeacher] = useState("");
  const [unselectAll, setUnselectAll] = useState(true);

  useEffect(() => {
    if (error && teacher) {
      setError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacher]);

  const clearFields = () => {
    setClassStyle("FLOW 2");
    setError(false);
    setProps([]);
    setTeacher("");
    setUnselectAll(true);
  };

  const handleSubmit = () => {
    if (!teacher) {
      return setError(true);
    }

    navigation.navigate("Display", {
      classStyle,
      props,
      teacher,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        keyboardVerticalOffset={-250}
      >
        <Text style={styles.title}>Set Up Your Class:</Text>
        <View style={styles.inputContainer}>
          <View style={styles.inputWrap}>
            <Text style={styles.inputLabel}>Teacher:</Text>
            <TextInput
              maxLength={20}
              onChangeText={setTeacher}
              returnKeyType={"next"}
              style={styles.input}
              value={teacher}
            />
          </View>
          {error && <Text style={styles.error}>Please enter your name</Text>}
        </View>
        <View style={styles.pickerWrap}>
          <Text style={styles.inputLabel}>Class Type:</Text>
          <Picker
            onValueChange={(value) => setClassStyle(value)}
            selectedValue={classStyle}
            style={styles.picker}
          >
            {classes.map((cl, index) => {
              return <Picker.Item key={index} label={cl} value={cl} />;
            })}
          </Picker>
        </View>
        <View style={styles.propsWrap}>
          <Text style={styles.inputLabel}>Class Props:</Text>
          <View style={styles.propsCol}>
            <View style={styles.propsRow}>
              {classProps.map((prop, index) => {
                if (index < 3) {
                  return (
                    <PropCard
                      key={index}
                      prop={prop}
                      props={props}
                      setUnselectAll={setUnselectAll}
                      unselectAll={unselectAll}
                    />
                  );
                }
              })}
            </View>
            <View style={styles.propsRow}>
              {classProps.map((prop, index) => {
                if (index >= 3) {
                  return (
                    <PropCard
                      key={index}
                      prop={prop}
                      props={props}
                      setUnselectAll={setUnselectAll}
                      unselectAll={unselectAll}
                    />
                  );
                }
              })}
            </View>
          </View>
        </View>
        <View style={styles.buttonWrap}>
          <TouchableOpacity style={styles.clearBtn} onPress={clearFields}>
            <Text style={styles.clearText}>Clear Fields</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.setBtn} onPress={handleSubmit}>
            <Text style={styles.setText}>Set Display</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "space-evenly",
  },
  title: {
    fontSize: 40,
  },
  inputContainer: {
    alignItems: "center",
    width: "100%",
  },
  inputWrap: {
    alignItems: "center",
    flexDirection: "row",
  },
  inputLabel: {
    fontSize: 30,
    paddingRight: 20,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    fontSize: 20,
    height: 40,
    paddingLeft: 10,
    width: "30%",
  },
  error: {
    color: "firebrick",
    fontSize: 20,
    marginTop: 10,
  },
  pickerWrap: {
    alignItems: "center",
    flexDirection: "row",
    margin: -20,
  },
  picker: {
    height: "100%",
    width: 200,
  },
  propsWrap: {
    alignItems: "center",
    flexDirection: "row",
  },
  propsCol: {
    alignItems: "center",
    flexDirection: "column",
  },
  propsRow: {
    flexDirection: "row",
  },
  buttonWrap: {
    flexDirection: "row",
    marginBottom: 20,
  },
  clearBtn: {
    backgroundColor: "#e6e6e6",
    borderRadius: 5,
    margin: 10,
    marginRight: 20,
    padding: 10,
  },
  clearText: {
    color: "salmon",
    fontSize: 30,
  },
  setBtn: {
    backgroundColor: "#143980",
    borderRadius: 5,
    margin: 10,
    marginLeft: 20,
    padding: 10,
  },
  setText: {
    color: "white",
    fontSize: 30,
  },
});
