import React from "react";
import { StyleSheet, TextInput } from "react-native";
import colours from "./colours";

export function PinkTextInput({
  placeholder,
  onChangeText,
  value,
  maxLength,
  secureTextEntry,
}) {
  return (
    <>
      <TextInput
        style={styles.pinkTextInput}
        onChangeText={onChangeText}
        placeholder={placeholder}
        value={value}
        autoCapitalize="none"
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
      />
    </>
  );
}

const styles = StyleSheet.create({
  pinkTextInput: {
    color: colours.cameoPink,
  },
});
