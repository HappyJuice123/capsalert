import { useState, useContext } from "react";
import { MedicationsContext } from "../contexts/Medications";
import { useNavigation } from "@react-navigation/native";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Menu, MenuItem } from "react-native-material-menu";

export const MyMedicationsItem = ({
  item,
  handleDelete,
  setModalOpen,
  setEditData,
  setDetailsModal,
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
        <TouchableOpacity
          onPress={() => {
            setDetailsModal(true);
            setMedicationData(item);
          }}
        >
          <View className="px-4 pt-5 pb-5 w-25">
            <Text className="font-semibold text-lg bg-whiteGrey rounded-md mb-3 py-1 px-12">
              {item.name}
            </Text>
            <Text className="text-xs mb-1">
              <Text className="font-bold">Brand: </Text>
              {item.brand}
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
            <Text className="text-xs mb-1">
              <Text className="font-bold">Start Date: </Text> {item.startDate}
            </Text>
            <Text className="text-xs mb-1">
              <Text className="font-bold">End Date: </Text> {item.endDate}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity className="flex flex-row justify-between gap-2 mt-3 mr-3">
          {/* Three dot options menu */}
          <TouchableOpacity>
            <Menu
              className="mt-8 mr-30 w-25 bg-white rounded-md shadow-md shadow-slate-600"
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
                  className="flex flex-row my-2"
                  onPress={() => handleEditPress(item)}
                >
                  <Feather name="edit" size={16} color="black" />
                  <Text className="ml-2"> Edit</Text>
                </TouchableOpacity>
              </MenuItem>

              <MenuItem onPress={hideMenu}>
                {/* Delete button */}
                <TouchableOpacity
                  className="flex flex-row my-2"
                  onPress={() => handleDelete(item)}
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={22}
                    color="black"
                  />
                  <Text> Delete</Text>
                </TouchableOpacity>
              </MenuItem>
              <MenuItem onPress={hideMenu}>
                {/* More info button */}
                <TouchableOpacity
                  className="flex flex-row my-2"
                  onPress={() => {
                    navigation.navigate("AdditionalMedInfo", item.name);
                  }}
                >
                  <Entypo name="info" size={18} color="black" />
                  <Text className="ml-2 ">More Info</Text>
                </TouchableOpacity>
              </MenuItem>
            </Menu>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};
