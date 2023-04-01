import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Menu, MenuItem } from "react-native-material-menu";
import { useState } from "react";

export const DueMedicationsItem = ({ item, handleDelete }) => {
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  return (
    <TouchableOpacity style={styles.listItem}>
      {/* Notification details */}
      <View>
        <Text style={styles.itemText}>
          {item.name} {item.dosage} {item.unit}
        </Text>
        <Text style={styles.itemText}>
          take {item.quantity} {item.form}(s)
        </Text>
      </View>

      <TouchableOpacity style={styles.options}>
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
                      /* Navigate to the Push Notifications route */
                    }
                    navigation.navigate("Push Notifications");
                  }}
                >
                  <Feather name="edit" size={24} color="black" />
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
    padding: 15,
    backgroundColor: "#F2F2F2",
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 10,
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
