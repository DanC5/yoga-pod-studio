import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import { PropCard } from '../components/PropCard';
import { useThemeContext } from '../context/ThemeContext';

import type { NavigationProp } from '../Navigator';

export const InputScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { classes, classProps, defaultClass, theme } = useThemeContext();

  const [classStyle, setClassStyle] = useState(defaultClass);
  const [error, setError] = useState(false);
  const [props, setProps] = useState<string[]>([]);
  const [teacher, setTeacher] = useState('');
  const [unselectAll, setUnselectAll] = useState(true);

  useEffect(() => {
    if (error && teacher) {
      setError(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teacher]);

  const clearFields = () => {
    setClassStyle(defaultClass);
    setError(false);
    setProps([]);
    setTeacher('');
    setUnselectAll(true);
  };

  const handleSubmit = () => {
    if (!teacher) {
      return setError(true);
    }

    navigation.navigate('Display', {
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
              returnKeyType={'next'}
              selectionColor="#00aeef"
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
                if (index < (theme === 'gnv' ? 4 : 5)) {
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
                if (index >= (theme === 'gnv' ? 4 : 5)) {
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
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  inputContainer: {
    alignItems: 'center',
    width: '100%',
  },
  inputWrap: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  inputLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingRight: 24,
  },
  input: {
    borderColor: 'gray',
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 24,
    height: 48,
    paddingLeft: 8,
    width: '33%',
  },
  error: {
    color: 'firebrick',
    fontSize: 20,
    marginTop: 8,
  },
  pickerWrap: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  picker: {
    width: 300,
  },
  propsWrap: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  propsCol: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  propsRow: {
    flexDirection: 'row',
  },
  buttonWrap: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  clearBtn: {
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    marginRight: 20,
    padding: 16,
  },
  clearText: {
    color: 'salmon',
    fontSize: 24,
    fontWeight: 'bold',
  },
  setBtn: {
    backgroundColor: '#143980',
    borderRadius: 8,
    marginLeft: 20,
    padding: 16,
  },
  setText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
