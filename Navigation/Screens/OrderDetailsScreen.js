import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function OrderDetailsScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleConfirmOrder = () => {
    if (!name || !address || !phone) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }
    Alert.alert("Order Confirmed", "Your order has been placed!", [
      {
        text: "OK",
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{ name: "Main" }], 
          });
        },
      },
    ]);
  };
  
  // Back to Home button:
  <Button mode="outlined" onPress={() => navigation.navigate("Home")}>
    Back to Home
  </Button>
  
  

  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Order Details</Text>
      </View>

      <Text style={styles.title}>Shipping Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Button mode="contained" style={styles.confirmButton} onPress={handleConfirmOrder}>
        Confirm Order
      </Button>

      <Button mode="outlined" style={styles.backButton} onPress={() => navigation.navigate("Home")}>
      Back to Home
      </Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#7b539d",
    padding: 15,
    alignItems: "center",
    marginBottom: 10,
    marginTop: 30,
    width: "100%",
  },
  headerText: { fontSize: 20, color: "white", fontWeight: "bold" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#7b539d",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  confirmButton: { marginTop: 20, padding: 10, backgroundColor: "#7b539d" },
  backButton: { marginTop: 10, padding: 10, borderColor: "#7b539d", borderWidth: 1 },
});
