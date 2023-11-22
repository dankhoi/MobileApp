import React, { useState, useContext, useRef } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Text } from "../../../components/typography/text.components";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { Spacer } from "../../../components/spacer/spacer.component";
import { HikingContext } from "../../../services/hikings/hiking.context";

export const UpSert = ({onClose, updateHiking}) => {
  const { createHiking, update } = useContext(HikingContext);
  let initialValue = updateHiking !== undefined ? {
    name: updateHiking.name,
    location: updateHiking.location,
    date: new Date(updateHiking.date),
    parkingAvailable: updateHiking.parkingAvailable,
    lengthOfHike: updateHiking.lengthOfHike,
    difficultLevel: updateHiking.difficultLevel,
    description: updateHiking.description,
  } : {
    name: "",
    location: "",
    date: new Date(),
    parkingAvailable: false,
    lengthOfHike: "",
    difficultLevel: "Hard",
    description: "",
  }
  const [formData, setFormData] = useState(initialValue);

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setFormData({ ...formData, date: selectedDate });
    }
  };

  // packing available picker
  const pickerPackingRef = useRef();

  function openParking() {
    pickerPackingRef.current.focus();
  }

  function closeParking() {
    pickerPackingRef.current.blur();
  }

  // packing available picker
  const pickerDifficultRef = useRef();

  function openDifficult() {
    pickerDifficultRef.current.focus();
  }

  function closeDifficult() {
    pickerDifficultRef.current.blur();
  }

  const handleSubmit = () => {
    // Perform data validation here
    const validationErrors = {};

    // Validate the name field
    if (!formData.name) {
      validationErrors.name = 'Name is required';
    }

    if (!formData.location) {
      validationErrors.location = 'Location is required';
    }

    if (typeof formData.parkingAvailable !== 'boolean') {
      validationErrors.parkingAvailable = 'Parking Available is required';
    }

    if (!formData.lengthOfHike) {
      validationErrors.lengthOfHike = 'Length Of Hike is required';
    }

    // Add more validation rules as needed for other fields

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if(updateHiking === undefined){
        createHiking(formData)
      }
      else{
        update(updateHiking.id, formData)
      }

      alert('Form submitted successfully');
      onClose();
    }
  };

  return (
    <ScrollView>
      <TextInput
        label="Name"
        value={formData.name}
        onChangeText={(text) => handleInputChange("name", text)}
        error={!!errors.name}
        style={styles.textInput}
      />
      {errors.name && <Text variant="error">{errors.name}</Text>}
      <Spacer position="bottom" size="medium" />
      <TextInput
        label="Location"
        value={formData.location}
        onChangeText={(text) => handleInputChange("location", text)}
        error={!!errors.location}
        style={styles.textInput}
      />
      {errors.location && <Text variant="error">{errors.location}</Text>}
      <Spacer position="bottom" size="medium" />
      {/* Date input */}
      <TextInput
        label="Date"
        value={formData.date.toLocaleDateString()}
        onFocus={() => setShowDatePicker(true)}
        style={styles.textInput}
      />
      {showDatePicker && (
        <DateTimePicker
          value={formData.date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Spacer position="bottom" size="medium" />
      {/* ParkingAvailable input */}
      <TextInput
        label="Parking Available "
        value={formData.parkingAvailable ? "YES" : "NO"}
        error={!!errors.parkingAvailable}
        onFocus={() => openParking()}
        onBlur={()=>closeParking()}
        style={styles.textInput}
      />
      <View style={{display: 'none'}}>
        <Picker
          ref={pickerPackingRef}
          selectedValue={formData.parkingAvailable}
          onValueChange={(itemValue, itemIndex) => setFormData({ ...formData, parkingAvailable: itemValue === 'true' })}
        >
          <Picker.Item label="Please Choose Option" value="" />
          <Picker.Item label="YES" value="true" />
          <Picker.Item label="NO" value="false" />
        </Picker>
      </View>
      
      {errors.parkingAvailable && <Text variant="error">{errors.parkingAvailable}</Text>}
      <Spacer position="bottom" size="medium" />
      {/* LengthOfHike input */}
      <TextInput
        label="Length Of Hike "
        value={formData.lengthOfHike}
        onChangeText={(text) => handleInputChange("lengthOfHike", text)}
        error={!!errors.lengthOfHike}
        style={styles.textInput}
      />
      {errors.lengthOfHike && <Text variant="error">{errors.lengthOfHike}</Text>}
      <Spacer position="bottom" size="medium" />
      {/* LengthOfHike input */}
      <TextInput
        label="Difficult Level"
        value={formData.difficultLevel}
        error={!!errors.difficultLevel}
        style={styles.textInput}
        onFocus={() => openDifficult()}
        onBlur={()=>closeDifficult()}
      />
      {errors.difficultLevel && <Text  variant="error">{errors.difficultLevel}</Text>}
      <View style={{display: 'none'}}>
        <Picker
          ref={pickerDifficultRef}
          selectedValue={formData.difficultLevel}
          onValueChange={(itemValue, itemIndex) => setFormData({ ...formData, difficultLevel: itemValue })}
        >
          <Picker.Item label="Hard" value="Hard" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="Low" value="Low" />
        </Picker>
      </View>
      <Spacer position="bottom" size="medium" />
      {/* Description input */}
      <TextInput
        label="Description"
        value={formData.description}
        onChangeText={(text) => handleInputChange("description", text)}
        error={!!errors.description}
        style={styles.textInput}
      />
      {errors.description && <Text variant="error">{errors.description}</Text>}
      <Spacer position="bottom" size="medium" />
      <Button
        style={styles.buttonSubmit}
        mode="contained"
        onPress={handleSubmit}
      >
        Submit
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "white",
  },
  buttonSubmit: {
    backgroundColor: "blue",
  },
});
