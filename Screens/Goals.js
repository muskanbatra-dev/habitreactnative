import React, { useEffect, useState } from "react";
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
import Ionicons from "@expo/vector-icons/Ionicons";
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
import { Toast } from "react-native-toast-message/lib/src/Toast";
const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Goals = ({ route, navigation }) => {
  const [goals, setGoals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reminder, setReminder] = useState(false);
  const [min_timeline, setmin_Timeline] = useState(new Date());
  const [max_timeline, setmax_Timeline] = useState(new Date());
  const [userTimeline, setuserTimeline] = useState({
    start_date: new Date(),
    end_date: new Date(),
  });
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
  const Id = route.params;
  const userId = Id.userId;
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

        {
          userId: "665019c92156c48f8abadb0e",
          title: "Learn JavaScript",
          description: "Complete the JavaScript course and build projects.",
          minTimeline: "2024-06-01T00:00:00Z",
          maxTimeline: "2024-12-01T00:00:00Z",
          userTimeline: {
            start_date: "2024-06-15T00:00:00Z",
            end_date: "2024-11-15T00:00:00Z",
          },
          tasks: [
            {
              name: "Watch Lectures",
              description: "Watch the course lectures on JavaScript basics.",
              quantity: 30,
              frequency: {
                type: "daily",
                times_per_day: 1,
              },
              reminders: {
                enabled: true,
                times: ["09:00"],
                auto_suggestions: ["08:00"],
              },
            },
            {
              name: "Complete Exercises",
              description:
                "Complete coding exercises at the end of each lecture.",
              quantity: 30,
              frequency: {
                type: "daily",
                times_per_day: 1,
              },
              reminders: {
                enabled: true,
                times: ["10:00"],
                auto_suggestions: ["09:30"],
              },
            },
            {
              name: "Build Projects",
              description: "Work on JavaScript projects to reinforce learning.",
              quantity: 5,
              frequency: {
                type: "weekly",
                days_per_week: 1,
              },
              reminders: {
                enabled: true,
                times: ["14:00"],
                auto_suggestions: ["13:00"],
              },
            },
          ],
        },
        header
      );
      if (data.error) {
        Toast.show({
          type: "error",
          text1: data?.error,
        });
      } else {
        Toast.show({
          type: "success",
          text1: `Hello bjbjb`,
          text2: "Log in sucessful",
        });
        console.log(data, "ggdata");
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
      const { data } = await axios.get(`http://10.0.2.2:3000/goals/:${userId}`);
      if (data.error) {
        Toast.show({
          type: "error",
          text1: data?.error,
        });
      } else {
        Toast.show({
          type: "success",
          text1: `Hello bjbjb`,
          text2: "Log in sucessful",
        });
        console.log(data, "gvgv");
      }
    } catch (error) {
      console.log("going to catch");
      console.log(error);
    }
  };
  useEffect(() => {
    getGoals();
  }, []);
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
          <Text>add taska</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setTasks({ ...tasks, name: text })}
            value={tasks?.name}
            placeholder="name"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setTasks({ ...tasks, description: text })}
            value={tasks?.description}
            placeholder="description"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => setTasks({ ...tasks, quantity: text })}
            value={tasks?.quantity}
            placeholder="quantity"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              setTasks({
                ...tasks?.frequency,
                days_of_week: text,
              })
            }
            value={tasks?.frequency.days_of_week}
            placeholder="frequency"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) =>
              setTasks({
                ...tasks?.frequency,
                times_per_day: text,
              })
            }
            value={tasks?.frequency?.times_per_day}
            placeholder="frequency_times_per_day"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => ({ ...tasks, type: text })}
            value={tasks?.frequency?.type}
            placeholder="frequencytype"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => ({
              ...tasks?.reminders,
              auto_suggestions: text,
            })}
            value={tasks?.reminders?.auto_suggestions}
            placeholder="remindersauto_suggestions"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => ({ ...tasks?.reminders, enabled: text })}
            value={tasks?.reminders?.enabled}
            placeholder="remindersenabled"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => ({ ...tasks?.reminders, times: text })}
            value={tasks?.reminders?.times}
            placeholder="reminders"
          />

          {/* <Checkbox
            style={styles.checkbox}
            value={tasks?.quantity}
            onValueChange={setReminder}
          /> */}
          <Text>Reminder</Text>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
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
        style={styles.addbtn}
      >
        <Ionicons name="add-circle" size={32} color="blue" />
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
  addbtn: {
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
