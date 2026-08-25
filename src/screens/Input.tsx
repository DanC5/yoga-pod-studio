import React, { useCallback, useEffect, useState } from 'react';
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
  const { classes, classProps, defaultClass } = useThemeContext();

  const [classStyle, setClassStyle] = useState(defaultClass);
  const [error, setError] = useState(false);
  const [props, setProps] = useState<string[]>([]);
  const [teacher, setTeacher] = useState('');

  useEffect(() => {
    if (error && teacher) {
      setError(false);
    }
  }, [error, teacher]);

  // If the selected class was deleted in Edit Lists while this screen was
  // mounted, snap back to a valid one instead of submitting a ghost.
  useEffect(() => {
    if (classStyle && !classes.includes(classStyle)) {
      setClassStyle(defaultClass);
    }
  }, [classes, classStyle, defaultClass]);

  // Same for props: never carry a deleted prop through to the display.
  useEffect(() => {
    setProps((prev) => {
      const pruned = prev.filter((p) => classProps.includes(p));
      return pruned.length === prev.length ? prev : pruned;
    });
  }, [classProps]);

  const toggleProp = useCallback((prop: string) => {
    setProps((prev) => (prev.includes(prop) ? prev.filter((p) => p !== prop) : [...prev, prop]));
  }, []);

  const clearFields = () => {
    setClassStyle(defaultClass);
    setError(false);
    setProps([]);
    setTeacher('');
  };

  const handleSubmit = () => {
    if (!teacher.trim()) {
      return setError(true);
    }

    navigation.navigate('Display', {
      classStyle,
      props,
      teacher: teacher.trim(),
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.container}
        keyboardVerticalOffset={-250}
      >
        <View style={styles.titleRow}>
          <Text style={styles.title}>Set Up Your Class:</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('ManageLists')}
            style={styles.editListsBtn}
          >
            <Text style={styles.editListsText}>Edit Lists</Text>
          </TouchableOpacity>
        </View>

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
            {classes.map((cl) => (
              <Picker.Item key={cl} label={cl} value={cl} />
            ))}
          </Picker>
        </View>

        <View style={styles.propsWrap}>
          <Text style={styles.inputLabel}>Class Props:</Text>
          {/* Wraps instead of the old hard-coded 4-or-5-per-row split, so
              teachers can add props without breaking the layout. */}
          <View style={styles.propsGrid}>
            {classProps.map((prop) => (
              <PropCard
                key={prop}
                onToggle={toggleProp}
                prop={prop}
                selected={props.includes(prop)}
              />
            ))}
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
  titleRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  editListsBtn: {
    borderColor: '#143980',
    borderRadius: 8,
    borderWidth: 1,
    marginLeft: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  editListsText: {
    color: '#143980',
    fontSize: 18,
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
    paddingHorizontal: 24,
  },
  propsGrid: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
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
