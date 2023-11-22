import React, { useContext } from "react";
import { View, Alert } from "react-native";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import {
  HikingCard,
  HikingCardCover,
  Info,
  Section,
  HikingTitle,
  HikingPackingAvailable,
  HikingDifficultLevel,
  HikingLengthOfHike,
  HikingDate,
  HikingLocation,
  HikingDescription,
} from "./hiking-info-card.styles";

import { HikingContext } from "../../../services/hikings/hiking.context";

const images = [
  "https://images.pexels.com/photos/532803/pexels-photo-532803.jpeg?cs=srgb&dl=pexels-pixabay-532803.jpg&fm=jpg",
  "https://watermark.lovepik.com/photo/20211202/large/lovepik-mountaineering-girl-playing-with-mobile-phone-picture_501394352.jpg",
  "https://image.shutterstock.com/image-photo/two-mountaineers-male-female-trekking-260nw-2230380303.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA6bndpFPlmdq7cN2kzmn_x-6u2SMDougiE4mUxLlmVCKyQeB9D37MaGfIoi8axNJgfYs&usqp=CAU",
  "https://nguoivietnam.vn/wp-content/uploads/2023/03/jft.jpeg",
];

export const HikingInfoCard = ({onUpdate, hiking = {} }) => {
  let randomNumber = Math.floor(Math.random() * 4);

  const { deleteHiking } = useContext(HikingContext);

  const onDelete = () => {
    Alert.alert("Confirm", "Do You Want To Delete This?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => deleteHiking(hiking.id) },
    ]);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return month + "-" + day + "-" + year;
  };

  return (
    <>
      <HikingCard elevation={5}>
        <View>
          <HikingCardCover source={{ uri: images[randomNumber] }} />
        </View>
        <Info>
          <HikingTitle varient="label">{hiking.name}</HikingTitle>
          <Section>
            <HikingLocation varient="body">
              Location: {hiking.location}
            </HikingLocation>
          </Section>
          <Section>
            <HikingDate varient="body">
              Date: {formatDate(hiking.date)}
            </HikingDate>
            <HikingPackingAvailable varient="hint">
              Packing Available: {hiking.parkingAvailable ? "YES" : "NO"}
            </HikingPackingAvailable>
          </Section>
          <Section>
            <HikingLengthOfHike varient="body">
              Length Of Hike: {hiking.lengthOfHike}
            </HikingLengthOfHike>
            <HikingDifficultLevel varient="hint">
              Difficult Level: {hiking.difficultLevel}
            </HikingDifficultLevel>
          </Section>
          <Section>
            <HikingDescription varient="body">
              Description: {hiking.description}
            </HikingDescription>
          </Section>
          <View style={styles.container}>
            <TouchableOpacity onPress={()=>onUpdate(hiking)} style={styles.buttonUpdate}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onDelete} style={styles.buttonDelete}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </Info>
      </HikingCard>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Arrange children in a row
    justifyContent: "space-between", // Space evenly between children
    paddingHorizontal: 10, // Add some padding for spacing
  },
  buttonUpdate: {
    flex: 1, // Each button takes an equal share of the available space
    backgroundColor: "orange", // Change the background color as needed
    padding: 10,
    margin: 7,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonDelete: {
    flex: 1, // Each button takes an equal share of the available space
    backgroundColor: "red", // Change the background color as needed
    padding: 10,
    margin: 7,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white", // Change the text color as needed
    fontWeight: "bold",
  },
});
