import React, { useState } from "react";
import axios from "axios";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import * as SecureStore from "expo-secure-store";

const Login = ({ navigation }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const loginUser = async () => {
    const { email, password } = data;
    try {
      const header = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        " http://10.0.2.2:3000/login",
        {
          email,
          password,
        },
        header
      );
      if (data.error) {
        Toast.show({
          type: "error",
          text1: data?.error,
        });
      } else {
        setData({});
        SecureStore.setItemAsync("deviceToken", data?.data?.token);
        Toast.show({
          type: "success",
          text1: `Hello ${data?.name}`,
          text2: "Log in sucessful",
        });
        console.log(data, "ggdata");
        console.log(data?._doc?._id, "userID");
        navigation.navigate("Goals", { userId: data?._doc?._id });
      }
    } catch (error) {
      console.log("going to catch");
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={(text) => setData({ ...data, email: text })}
        value={data?.email}
        placeholder="email"
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setData({ ...data, password: text })}
        value={data?.password}
        placeholder="password"
      />
      <TouchableOpacity onPress={loginUser} style={styles.loginBtn}>
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    marginTop: 20,
    alignSelf: "center",
    paddingLeft: 20,
    borderRadius: 10,
  },
  loginBtn: {
    width: "80%",
    height: 50,
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  loginBtnText: {
    color: "white",
    fontSize: 18,
  },
});
export default Login;
