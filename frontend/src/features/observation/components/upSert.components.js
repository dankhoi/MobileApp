import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Text } from "../../../components/typography/text.components";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Spacer } from "../../../components/spacer/spacer.component";
import { createObservation, updateObservation } from "../../../services/observations/observation.service";


export const UpSert = ({onClose, updateObservations, hiking, loadObservation}) => {
  let initialValue = updateObservations !== undefined ? {
    name: updateObservations.name,
    time: new Date(updateObservations.time),
    comment: updateObservations.comment,
    hikingId: hiking.id,
  } : {
    name: "",
    time: new Date(),
    comment: "",
    hikingId: hiking.id,
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
      setFormData({ ...formData, time: selectedDate });
    }
  };


  const handleSubmit = () => {
    // Perform data validation here
    const validationErrors = {};

    // Validate the name field
    if (!formData.name) {
      validationErrors.name = 'Name is required';
    }

    // Add more validation rules as needed for other fields

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      if(updateObservations === undefined){
        createObservation(formData)
        .then(()=>{
            loadObservation();
        })
      }
      else{
        updateObservation(updateObservations.id, formData)
        .then(()=>{
            loadObservation();
        })
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
      {/* Time input */}
      <TextInput
        label="Time"
        value={formData.time.toLocaleDateString()}
        onFocus={() => setShowDatePicker(true)}
        style={styles.textInput}
      />
      {showDatePicker && (
        <DateTimePicker
          value={formData.time}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      <Spacer position="bottom" size="medium" />
      {/* comment input */}
      <TextInput
        label="Comment"
        onChangeText={(text) => handleInputChange("comment", text)}
        value={formData.comment}
        error={!!errors.comment}
        style={styles.textInput}
      />
      {errors.comment && <Text variant="error">{errors.comment}</Text>}
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
