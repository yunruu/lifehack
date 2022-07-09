import React, { useState } from "react";
import { PinkTextInput } from "../config/reusable";

function logIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View>
      <PinkTextInput
        onChangeText={(val) => setEmail(val)}
        placeholder={"email"}
      />
      <PinkTextInput
        onChangeText={(val) => setPassword(val)}
        placeholder={"password"}
      />
    </View>
  );
}

export default logIn;
