import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
} from "react-native";
import Checkbox from "expo-checkbox";
import axios from "axios";
const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Goals = ({ route, navigation }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [min_timeline, setmin_Timeline] = useState(new Date());
  const [max_timeline, setmax_Timeline] = useState(new Date());
  const [tasks, setTasks] = useState({
    frequency: {
      type: "",
      times_per_day: 0,
      days_of_week: [],
    },
    reminders: {
      enabled: false,
      times: [""],
      auto_suggestions: [""],
    },
    task_id: "",
    name: "",
    description: "",
    quantity: 0,
  });
  const userId = route.params;
  const id = userId.userId;
  console.log("userid", userId);
  const createGoals = async () => {
    try {
      const header = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        " http://10.0.2.2:3000/goals/createdgoal",
        { id, goalTitle, goalDescription, min_timeline, max_timeline },
        header
      );
      if (data.error) {
        Toast.show({
          type: "error",
          text1: `Hello abc`,
          text1: data.error,
        });
      } else {
        setData({});

        Toast.show({
          type: "success",
          text1: `Hello abc`,
          text2: "Register Sucessful, Please Login!",
        });
        console.log(data);
      }
    } catch (error) {
      console.log("going to catch");
      console.log(error);
    }
  };
  const getGoals = async () => {
    try {
      const header = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        " http://10.0.2.2:3000/goals/createdgoal",
        { id, goalTitle, goalDescription, min_timeline, max_timeline },
        header
      );
      if (data.error) {
        Toast.show({
          type: "error",
          text1: `Hello abc`,
          text1: data.error,
        });
      } else {
        setData({});

        Toast.show({
          type: "success",
          text1: `Hello abc`,
          text2: "Register Sucessful, Please Login!",
        });
        console.log(data);
      }
    } catch (error) {
      console.log("going to catch");
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item title={item.title} />}
        keyExtractor={(item) => item.id}
      />
      <Modal
        style={styles.modalContent}
        animationType={"slide"}
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        {/*All views of Modal*/}
        {/*Animation can be slide, slide, none*/}
        <ScrollView>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setTitle(text)}
            value={title}
            placeholder="title"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setDescription(text)}
            value={description}
            placeholder="description"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setmin_Timeline(text)}
            value={min_timeline}
            placeholder="min_timeline"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setmax_Timeline(text)}
            value={max_timeline}
            placeholder="max_timeline"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setData({ ...data, name: text })}
            value={tasks?.frequency.days_of_week}
            placeholder="frequency"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setData({ ...data, name: text })}
            value={tasks?.frequency.days_of_week}
            placeholder="frequency"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setData({ ...data, name: text })}
            value={tasks?.frequency.days_of_week}
            placeholder="frequency"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setData({ ...data, name: text })}
            value={tasks?.reminders?.auto_suggestions}
            placeholder="reminders"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setData({ ...data, name: text })}
            value={tasks?.reminders?.auto_suggestions}
            placeholder="reminders"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setData({ ...data, name: text })}
            value={tasks?.reminders?.auto_suggestions}
            placeholder="reminders"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setData({ ...data, name: text })}
            value={data?.name}
            placeholder="name"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setData({ ...data, name: text })}
            value={tasks?.name}
            placeholder="description"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setData({ ...data, name: text })}
            value={tasks?.description}
            placeholder="quantity"
          />
          <Checkbox
            style={styles.checkbox}
            value={tasks?.quantity}
            onValueChange={setReminder}
          />
          <Text>bkbckackhavs</Text>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              const id = route.params;
              createGoals();
              setShowModal(!showModal);
            }}
          >
            <Text style={styles.loginBtnText}>create goal</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          setShowModal(!showModal);
        }}
      >
        <Text>create goal</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    margin: 0,
  },
  modal: {
    backgroundColor: "white",
    margin: 0, // This is the important style you need to set
    alignItems: undefined,
    justifyContent: undefined,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: "#FF033E",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  checkbox: {
    margin: 8,
  },
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

export default Goals;
