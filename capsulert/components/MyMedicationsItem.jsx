import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Menu, MenuItem } from "react-native-material-menu";
import { useState, useContext } from "react";
import { MedicationsContext } from "../contexts/Medications";

export const MyMedicationsItem = ({
  item,
  handleDelete,
  setModalOpen,
  setEditData,
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
      <TouchableOpacity className="flex flex-row justify-between">
        {/* Medication details */}
        <View>
          <Text className="text-xs">
            <Text className="font-bold">Name: </Text>
            {item.name}
          </Text>
          <Text className="text-xs">
            <Text className="font-bold">Brand: </Text>
            {item.brand}
          </Text>
          <Text className="text-xs">
            <Text className="font-bold">Start: </Text> {item.startDate}
          </Text>
          <Text className="text-xs">
            <Text className="font-bold">End: </Text> {item.endDate}
          </Text>
          <Text className="text-xs">
            <Text className="font-bold">Dosage: </Text>
            {item.dosage}
            {item.unit}
          </Text>
          <Text className="text-xs">
            <Text className="font-bold">Medication Type: </Text>
            {item.form}
          </Text>
          <Text className="text-xs">
            <Text className="font-bold">Quantity to take: </Text>
            {item.quantity}
          </Text>
        </View>

        <TouchableOpacity className="flex flex-row justify-between gap-4">
          {/* More info button */}
          <TouchableOpacity>
            <Text
              className="font-bold"
              onPress={() => {
                navigation.navigate("AdditionalMedInfo", item.name);
              }}
            >
              More Info
            </Text>
          </TouchableOpacity>

          {/* Three dot options menu */}
          <TouchableOpacity>
            <Menu
              className="bg-whiteGrey w-30 p-1"
              visible={visible}
              anchor={
                <Text onPress={showMenu}>
                  <Entypo name="dots-three-vertical" size={20} color="black" />
                </Text>
              }
              onRequestClose={hideMenu}
            >
              <MenuItem onPress={hideMenu}>
                {/* Edit button */}

                <TouchableOpacity
                  className="bg-whiteGrey flex flex-row gap-2"
                  onPress={() => handleEditPress(item)}
                >
                  <Text className="font-bold text-base mr-2"> Edit</Text>
                  <Feather name="edit" size={22} color="black" />
                </TouchableOpacity>
              </MenuItem>

              <MenuItem onPress={hideMenu}>
                {/* Delete button */}
                <TouchableOpacity
                  className="bg-whiteGrey flex flex-row items-center gap-2"
                  onPress={() => handleDelete(item)}
                >
                  <Text className="font-bold text-base"> Delete</Text>
                  <MaterialIcons
                    name="delete-outline"
                    size={26}
                    color="black"
                  />
                </TouchableOpacity>
              </MenuItem>
              {/* <MenuItem onPress={hideMenu}> */}
              {/* More info button */}
              {/* <TouchableOpacity
                  className="bg-whiteGrey flex flex-row items-center gap-2"
                  onPress={() => {
                    navigation.navigate("AdditionalMedInfo", item.name);
                  }}
                >
                  <Text className="font-bold text-sm">More Info</Text>
                  <Ionicons
                    name="ios-information-circle-outline"
                    size={24}
                    color="black"
                  /> */}
              {/* </TouchableOpacity> */}
              {/* </MenuItem> */}
            </Menu>
          </TouchableOpacity>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};
