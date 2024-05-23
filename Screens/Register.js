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

const Register = ({ navigation }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const header = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        " http://10.0.2.2:3000/register ",
        {
          name,
          email,
          password,
        },
        header
      );
      if (data.error) {
        Toast.show({
          type: "error",
          text1: `Hello ${data.name}`,
          text1: data.error,
        });
      } else {
        setData({});

        Toast.show({
          type: "success",
          text1: `Hello ${data.name}`,
          text2: "Register Sucessful, Please Login!",
        });
        console.log(data.email, data.password);
        navigation.navigate("Login");
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
        onChangeText={(text) => setData({ ...data, name: text })}
        value={data?.name}
        placeholder="name"
      />
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
      <TouchableOpacity onPress={registerUser}>
        <Text>Register</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Register;
