import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

const PickImage = () => {
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result) {
      setImage(result.uri);
    }
    console.log(image);
  };
  return (
    <View>
      <TouchableOpacity onPress={pickImage}>
        <Text>Add an image</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} />}
    </View>
  );
};
export default PickImage;
