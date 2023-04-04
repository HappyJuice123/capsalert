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
    <View className="bg-whiteGrey p-1">
      <View className="flex flex-row justify-between bg-zinc-50 mx-8 my-4 rounded-md shadow-md shadow-slate-600">
        {/* Medication details */}
        <View className="text-xs px-5 pt-5 pb-5">
          <Text className="mb-3 text-lg font-semibold bg-whiteGrey rounded-md py-1 px-12">
            {item.name}
          </Text>
          <Text className="text-xs mb-1">
            <Text className="font-bold">Brand: </Text>
            {item.brand}
          </Text>
          <Text className="text-xs mb-1">
            <Text className="font-bold">Start: </Text> {item.startDate}
          </Text>
          <Text className="text-xs mb-1">
            <Text className="font-bold">End: </Text> {item.endDate}
          </Text>
          <Text className="text-xs mb-1">
            <Text className="font-bold">Dosage: </Text>
            {item.dosage}
            {item.unit}
          </Text>
          <Text className="text-xs mb-1">
            <Text className="font-bold">Medication Type: </Text>
            {item.form}
          </Text>
          <Text className="text-xs mb-1">
            <Text className="font-bold">Quantity to take: </Text>
            {item.quantity}
          </Text>
          <TouchableOpacity className="border-2 border-whiteGrey rounded-md mt-3">
            <Text
              className="font-semibold text-base text-center"
              onPress={() => {
                navigation.navigate("AdditionalMedInfo", item.name);
              }}
            >
              More Info
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity className="flex flex-row justify-between gap-4 mt-1 mr-3">
          {/* More info button */}
          {/* <TouchableOpacity>
            <Text
              className="font-semibold"
              onPress={() => {
                navigation.navigate("AdditionalMedInfo", item.name);
              }}
            >
              More Info
            </Text>
          </TouchableOpacity> */}

          {/* Three dot options menu */}
          <TouchableOpacity>
            <Menu
              className="mt-8 w-25 bg-none rounded-md shadow-md shadow-slate-600"
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
                  className="flex flex-row gap-2"
                  onPress={() => handleEditPress(item)}
                >
                  <Text className="font-bold text-sm mr-2"> Edit</Text>
                  <Feather name="edit" size={22} color="black" />
                </TouchableOpacity>
              </MenuItem>

              <MenuItem onPress={hideMenu}>
                {/* Delete button */}
                <TouchableOpacity
                  className="flex flex-row items-center gap-2 mb-5"
                  onPress={() => handleDelete(item)}
                >
                  <Text className="font-bold text-sm"> Delete</Text>
                  <MaterialIcons
                    name="delete-outline"
                    size={26}
                    color="black"
                  />
                </TouchableOpacity>
              </MenuItem>
            </Menu>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};
