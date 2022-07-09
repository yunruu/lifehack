import React from "react";

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const handleSignUp = () => {
    if (email == "" || password == "") {
      alert("Enter details to sign up!");
    } else {
      // Create new account for user
      auth
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((res) => {
          // Add in user details in firestore
          db.collection("users").doc(res.user.uid).set({
            name: this.state.firstName,
            email: this.state.email,
            budgetValue: 0.0,
            dateTo: new Date(),
            dateFrom: new Date(),
            timeUserWants: "This Month",
            customExpenseArr: [],
          });

          db.collection("userLookup").doc(this.state.email).set({
            uid: res.user.uid,
          });

          // Update details in firebase authentication
          res.user.updateProfile({
            displayName: this.state.firstName,
            photoURL: this.state.imageSource,
          });

          // Alerts user to log in with new account
          alert("Log in with your new account");

          // Reset state on sign up page
          this.setState({
            isLoading: false,
            username: "",
            email: "",
            password: "",
          });

          // Navigates to login page for user to log in with new account
          this.props.navigation.navigate("Login");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            alert("That email address is already in use!");
          } else if (error.code === "auth/invalid-email") {
            alert("Invalid email");
          } else {
            alert(error.message);
          }
          this.setState({ isLoading: false });
          this.props.navigation.navigate("Login");
        });
    }
  };

  return (
    <View>
      <PinkTextInput
        onChangeText={(val) => setEmail(val)}
        placeholder={"email"}
      />
      <PinkTextInput
        onChangeText={(val) => setName(val)}
        placeholder={"name"}
      />
      <PinkTextInput
        onChangeText={(val) => setPassword(val)}
        placeholder={"password"}
      />
      <BlueButton text={"Login"} onPress={() => handleLogin} />
      <Footer
        desc={"Don't have an account yet?"}
        text={"Sign up"}
        onPress={this.onFooterLinkPress}
      />
    </View>
  );
}

export default SignUp;
