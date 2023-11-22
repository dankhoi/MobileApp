import React, { useContext, useState, useEffect } from "react";
import { Spacer } from "../../../components/spacer/spacer.component";
import { SafeArea } from "../../../components/utility/safe-area.component";
import { FlatList } from "react-native";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Modal } from "react-native-paper";
import { ObservationInfoCard } from "../components/observation-info-card.components";
import { getObservation } from "../../../services/observations/observation.service";
import { UpSert } from "../components/upSert.components";

const ObservationScreen = ({ route }) => {
  const { hiking } = route.params;
  const [observations, setObservations] = useState([]);
  const [visible, setVisible] = useState(false);
  const [updateObservation, setUpdateObservation] = useState(undefined);

  useEffect(() => {
    loadObservation();
  }, []);

  const loadObservation = ()=>{
    getObservation(hiking.id).then((res)=>{
      setObservations(res.data)
  });
  }

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onUpdate = (observation) => {
    setUpdateObservation(observation);
    showModal();
  };

  const onCreate = () => {
    setUpdateObservation(undefined);
    showModal();
  };
  return (
    <SafeArea>
      <Text style={{textAlign:'center', fontSize: 30, fontWeight: 30, color: 'green'}}>{hiking.name}</Text>
      <Spacer position="bottom" size="large"></Spacer>
      
      {observations.length > 0 ? (
        <FlatList
          data={observations}
          renderItem={({ item }) => (
            <Spacer position="bottom" size="medium">
              <ObservationInfoCard onUpdate={onUpdate} loadObservation={loadObservation} observation={item} />
            </Spacer>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={{textAlign:'center'}}>No Observation</Text>
      )}

      <TouchableOpacity onPress={onCreate} style={styles.createButton}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <Modal
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
      >
        <UpSert 
          loadObservation={loadObservation} 
          updateObservations={updateObservation} 
          hiking={hiking} 
          onClose={()=>setVisible(false)}/>
      </Modal>
    </SafeArea>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    width: 300,
  },
  createButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "green",
    borderRadius: 50,
    width: 65,
    height: 65,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
    margin: 20,
  },
});

export default ObservationScreen;