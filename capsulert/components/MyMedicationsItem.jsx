import { StyleSheet, View, TouchableOpacity, Text, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Menu, MenuItem } from "react-native-material-menu";
import { useState, useContext } from "react";
import { MedicationsContext } from "../contexts/Medications";
import { AntDesign } from "@expo/vector-icons";

export const MyMedicationsItem = ({
  item,
  handleDelete,
  setModalOpen,
  setEditData,
  dataModalOpen,
  setDataModalOpen,
}) => {
  const [visible, setVisible] = useState(false);

  const { setMedicationData } = useContext(MedicationsContext);

  const navigation = useNavigation();

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const handleEditPress = (item) => {
    setModalOpen(true);
    setEditData(true);
    setMedicationData(item);
    hideMenu();
  };

  return (
    <View className="bg-whiteGrey p-5">
      <Modal visible={dataModalOpen} animationType="slide">
        <Text style={styles.itemText}>
          <Text className="font-bold">Name: </Text>
          {item.name}
        </Text>
        <Text style={styles.itemText}>
          <Text className="font-bold">Brand: </Text>
          {item.brand}
        </Text>
        <Text style={styles.itemText}>
          <Text className="font-bold">Start: </Text> {item.startDate}
        </Text>
        <Text style={styles.itemText}>
          <Text className="font-bold">End: </Text> {item.endDate}
        </Text>
        <Text style={styles.itemText}>
          <Text className="font-bold">Dosage: </Text>
          {item.dosage}
          {item.unit}
        </Text>
        <Text style={styles.itemText}>
          <Text className="font-bold">Medication Type: </Text>
          {item.form}
        </Text>
        <Text style={styles.itemText}>
          <Text className="font-bold">Quantity to take: </Text>
          {item.quantity}
        </Text>
        <AntDesign
          name="closesquare"
          size={30}
          className="self-center"
          // style={{ ...styles.modalToggle, ...styles.modalClose }}
          color="black"
          onPress={() => setDataModalOpen(false)}
        />
      </Modal>
      <TouchableOpacity
        // style={styles.listItem}
        className="flex flex-row justify-between"
        onPress={() => setDataModalOpen(true)}
      >
        {/* Medication details */}
        <View>
          <Text style={styles.itemText}>
            <Text className="font-bold">Name: </Text>
            {item.name}
          </Text>
          <Text style={styles.itemText}>
            <Text className="font-bold">Brand: </Text>
            {item.brand}
          </Text>
          <Text style={styles.itemText}>
            <Text className="font-bold">Start: </Text> {item.startDate}
          </Text>
          <Text style={styles.itemText}>
            <Text className="font-bold">End: </Text> {item.endDate}
          </Text>
          <Text style={styles.itemText}>
            <Text className="font-bold">Dosage: </Text>
            {item.dosage}
            {item.unit}
          </Text>
          <Text style={styles.itemText}>
            <Text className="font-bold">Medication Type: </Text>
            {item.form}
          </Text>
          <Text style={styles.itemText}>
            <Text className="font-bold">Quantity to take: </Text>
            {item.quantity}
          </Text>
          {/* <Text className="font-bold mt-3" style={styles.itemText}>
            <Text className="font-bold mt-5">click for more details</Text>
          </Text> */}
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
                navigation.navigate("AdditionalMedInfo", item.name);
              }}
            >
              More Info
            </Text>
          </TouchableOpacity>

          {/* Three dot options menu */}
          <TouchableOpacity>
            <Menu
              visible={visible}
              anchor={
                <Text onPress={showMenu}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={24}
                    color="black"
                  />
                </Text>
              }
              onRequestClose={hideMenu}
            >
              <MenuItem onPress={hideMenu}>
                {/* Edit button */}
                <TouchableOpacity>
                  <Text
                    // style={styles.options}
                    // onPress={() => {
                    //   {
                    //     /* Navigate to the Edit Medication route */
                    //   }
                    //   navigation.navigate("AddMedication", item);
                    // }}
                    onPress={() => handleEditPress(item)}
                  >
                    {" "}
                    Edit <Feather name="edit" size={24} color="black" />
                  </Text>
                </TouchableOpacity>
              </MenuItem>

              <MenuItem onPress={hideMenu}>
                {/* Delete button */}
                <TouchableOpacity>
                  <Text
                    // style={styles.options}
                    onPress={() => handleDelete(item)}
                  >
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
    </View>
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
