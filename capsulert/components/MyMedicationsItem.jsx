import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Menu, MenuItem } from "react-native-material-menu";
import { useState } from "react";

export const MyMedicationsItem = ({ item, handleDelete }) => {
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  return (
    <TouchableOpacity style={styles.listItem}>
      {/* Medication details */}
      <View>
        <Text>{item.name}</Text>
        <Text>Start: {item.startDate}</Text>
        <Text>End: {item.endDate}</Text>
        <Text>Time: {item.time}</Text>
        <Text>
          {item.dosage}
          {item.unit}
        </Text>
        <Text>{item.form}</Text>
        <Text>{item.quantity}</Text>
      </View>

      <TouchableOpacity style={styles.options}>
        {/* More info button */}
        <TouchableOpacity>
          <Text
            style={styles.addMedsBtn}
            onPress={() => {
              {
                /* Navigate to the AdditionalMedInfo screen */
              }
              navigation.navigate("AdditionalMedInfo");
            }}
          >
            {" "}
            More Info{" "}
          </Text>
        </TouchableOpacity>

        {/* Three dot options menu */}
        <TouchableOpacity>
          <Menu
            visible={visible}
            anchor={
              <Text onPress={showMenu}>
                <Entypo name="dots-three-horizontal" size={24} color="black" />
              </Text>
            }
            onRequestClose={hideMenu}
          >
            <MenuItem onPress={hideMenu}>
              {/* Edit button */}
              <TouchableOpacity>
                <Text
                  style={styles.options}
                  onPress={() => {
                    {
                      /* Navigate to the AddMedication route */
                    }
                    navigation.navigate("AddMedication");
                  }}
                >
                  {" "}
                  Edit
                  <Feather name="edit" size={24} color="black" />{" "}
                </Text>
              </TouchableOpacity>
            </MenuItem>
            <MenuItem onPress={hideMenu}>
              {/* Delete button */}
              <TouchableOpacity>
                <Text style={styles.options} onPress={() => handleDelete(item)}>
                  {" "}
                  Delete
                  <MaterialIcons
                    name="delete-outline"
                    size={26}
                    color="black"
                  />
                </Text>
              </TouchableOpacity>
            </MenuItem>
          </Menu>
        </TouchableOpacity>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
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
  options: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
