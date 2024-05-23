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

const Goals = () => {
  const [showModal, setShowModal] = useState(false);
  const [goalTitle, setgoalTitle] = useState("");
  const [goalDescription, setgoalDescription] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [frequecyType, setFrequencyType] = useState("");
  const [reminder, setReminder] = useState(false);
  const [min_timeline, setmin_Timeline] = useState(new Date());
  const [max_timeline, setmax_Timeline] = useState(new Date());
  const createGoals = async () => {
    const { userId } = data;
    try {
      const header = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        " http://10.0.2.2:3000/register ",
        {
          userId,
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
        console.log(data);
        navigation.navigate("Login");
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
            onChangeText={(text) => setgoalTitle(text)}
            value={goalTitle}
            placeholder="title"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setgoalDescription(text)}
            value={goalDescription}
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
            onChangeText={(text) => setTaskTitle(text)}
            value={taskTitle}
            placeholder="task_title"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setTaskDescription(text)}
            value={taskDescription}
            placeholder="task_description"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setQuantity(text)}
            value={quantity}
            placeholder="task_quantity"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setFrequency(text)}
            value={frequency}
            placeholder="task_frequency"
          />
          <Checkbox
            style={styles.checkbox}
            value={reminder}
            onValueChange={setReminder}
          />
          <Text>bkbckackhavs</Text>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
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
