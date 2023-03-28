import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
// import {
//   Menu,
//   MenuProvider,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
// } from "react-native-popup-menu";
// import { Entypo } from "@expo/vector-icons";

export const MyMedicationsItem = ({ item, handleDelete }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.checkbox}>
        <Text>{item}</Text>
      </View>

      <TouchableOpacity>
        <Text
          style={styles.editBtn}
          onPress={() => {
            // Navigate to the AddMeds route
            navigation.navigate("AddMeds");
          }}
        >
          {" "}
          <Feather name="edit" size={24} color="black" />{" "}
        </Text>
      </TouchableOpacity>

      <Text onPress={() => handleDelete(item)}>
        <MaterialIcons name="delete-outline" size={26} color="black" />
      </Text>

      <TouchableOpacity>
        <Text
          style={styles.addMedsBtn}
          onPress={() => {
            // Navigate to the MoreInfo screens
            navigation.navigate("MoreInfo");
          }}
        >
          {" "}
          More Info{" "}
        </Text>
      </TouchableOpacity>
      {/* 
      <MenuProvider style={styles.icon}>
        <Menu>
          <MenuTrigger
            customStyles={{
              triggerWrapper: {
                top: -20,
              },
            }}
          >
            <Entypo name="dots-three-vertical" size={22} color="black" />
          </MenuTrigger>
          <MenuOptions>
            <MenuOption onSelect={() => alert(`Save`)} text="Save" />
            <MenuOption onSelect={() => alert(`Delete`)} text="Delete" />
          </MenuOptions>
        </Menu>
      </MenuProvider> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 50,
    padding: 15,
    backgroundColor: "#F2F2F2",
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  icon: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  editBtn: {},
  moreInfo: {},
});
