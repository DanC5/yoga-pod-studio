import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useThemeContext } from '../context/ThemeContext';
import {
  LOCATION_LABELS,
  MAX_CLASS_NAME_LENGTH,
  MAX_PROP_NAME_LENGTH,
} from '../constants/defaults';

type EditableListProps = {
  title: string;
  items: string[];
  maxLength: number;
  placeholder: string;
  onAdd: (name: string) => { ok: true } | { ok: false; reason: 'empty' | 'duplicate' };
  onRemove: (name: string) => void;
  onReset: () => void;
};

const EditableList: React.FC<EditableListProps> = ({
  title,
  items,
  maxLength,
  placeholder,
  onAdd,
  onRemove,
  onReset,
}) => {
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    const result = onAdd(draft);

    if (result.ok) {
      setDraft('');
      setError('');
      return;
    }

    setError(result.reason === 'duplicate' ? 'That one already exists' : 'Type a name first');
  };

  // Deleting is the only destructive action on this screen, so it asks.
  // Adding stays a single tap.
  const confirmRemove = (item: string) => {
    Alert.alert(`Remove "${item}"?`, 'It will disappear from the setup screen.', [
      { text: 'Keep', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => onRemove(item) },
    ]);
  };

  const confirmReset = () => {
    Alert.alert(`Reset ${title.toLowerCase()}?`, 'This restores the original list. Anything you added will be lost.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: onReset },
    ]);
  };

  return (
    <View style={styles.column}>
      <Text style={styles.columnTitle}>{title}</Text>

      <View style={styles.addRow}>
        <TextInput
          maxLength={maxLength}
          onChangeText={(text) => {
            setDraft(text);
            if (error) {
              setError('');
            }
          }}
          onSubmitEditing={handleAdd}
          placeholder={placeholder}
          placeholderTextColor="#9b9b9b"
          returnKeyType="done"
          selectionColor="#00aeef"
          style={styles.addInput}
          value={draft}
        />
        <TouchableOpacity onPress={handleAdd} style={styles.addBtn}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      {!!error && <Text style={styles.error}>{error}</Text>}

      <ScrollView style={styles.list} keyboardShouldPersistTaps="handled">
        {items.length === 0 && (
          <Text style={styles.empty}>Nothing here yet. Add one above, or reset to defaults.</Text>
        )}
        {items.map((item) => (
          <View key={item} style={styles.row}>
            <Text style={styles.rowText}>{item}</Text>
            <TouchableOpacity
              accessibilityLabel={`Remove ${item}`}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              onPress={() => confirmRemove(item)}
              style={styles.removeBtn}
            >
              <Text style={styles.removeBtnText}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity onPress={confirmReset} style={styles.resetBtn}>
        <Text style={styles.resetText}>Reset to Defaults</Text>
      </TouchableOpacity>
    </View>
  );
};

export const ManageListsScreen = () => {
  const {
    addClass,
    addProp,
    classes,
    classProps,
    removeClass,
    removeProp,
    resetClasses,
    resetProps,
    theme,
  } = useThemeContext();

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text style={styles.title}>Edit Lists — {LOCATION_LABELS[theme]}</Text>
      <Text style={styles.subtitle}>
        Changes save automatically and apply to every class on this iPad.
      </Text>
      <View style={styles.columns}>
        <EditableList
          items={classes}
          maxLength={MAX_CLASS_NAME_LENGTH}
          onAdd={addClass}
          onRemove={removeClass}
          onReset={resetClasses}
          placeholder="New class type"
          title="Class Types"
        />
        <EditableList
          items={classProps}
          maxLength={MAX_PROP_NAME_LENGTH}
          onAdd={addProp}
          onRemove={removeProp}
          onReset={resetProps}
          placeholder="New prop"
          title="Props"
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#6b6b6b',
    fontSize: 18,
    marginBottom: 16,
    marginTop: 4,
    textAlign: 'center',
  },
  columns: {
    flex: 1,
    flexDirection: 'row',
  },
  column: {
    flex: 1,
    paddingHorizontal: 12,
  },
  columnTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  addRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  addInput: {
    borderColor: 'gray',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    fontSize: 20,
    height: 48,
    paddingHorizontal: 12,
  },
  addBtn: {
    backgroundColor: '#143980',
    borderRadius: 8,
    marginLeft: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  error: {
    color: 'firebrick',
    fontSize: 16,
    marginTop: 6,
  },
  list: {
    borderColor: '#e6e6e6',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    marginTop: 12,
  },
  empty: {
    color: '#9b9b9b',
    fontSize: 18,
    padding: 16,
  },
  row: {
    alignItems: 'center',
    borderBottomColor: '#f0f0f0',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  rowText: {
    flex: 1,
    fontSize: 20,
  },
  removeBtn: {
    paddingHorizontal: 8,
  },
  removeBtnText: {
    color: 'salmon',
    fontSize: 22,
    fontWeight: 'bold',
  },
  resetBtn: {
    alignItems: 'center',
    backgroundColor: '#e6e6e6',
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 12,
    padding: 14,
  },
  resetText: {
    color: 'salmon',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
