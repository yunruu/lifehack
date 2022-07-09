import React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
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

export function BlueButton({ text, onPress, style, textStyle}) {
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.blueButton, style]}
        onPress={onPress}
      >
        <Text style={textStyle}>{text}</Text>
      </TouchableOpacity>
    </>
  );
}

export function Footer({ onPress, text, desc }) {
  return (
    <View style={styles.footerView}>
      <Text style={styles.footerText}>
        {desc}{" "}
        <Text onPress={onPress} style={styles.footerLink}>
          {text}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pinkTextInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colours.cameoPink,
    borderRadius: 25,
    width: 320,
    height: 46,
  },
  blueButton: {
    width: 130,
    height: 40,
    borderRadius: 999,
    margin: 2,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colours.paleCerulean,
  },
  footerView: {
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "#2e2e2d",
  },
  footerLink: {
    color: "#788eec",
    fontWeight: "bold",
    fontSize: 16,
  },
});
