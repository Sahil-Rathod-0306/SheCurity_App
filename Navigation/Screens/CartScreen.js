import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Image } from "react-native";
import { Card, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native"; // Import navigation hook

export default function CartScreen({ route }) {
  const [loading, setLoading] = useState(false);
  const cartItems = route.params?.cartItems ?? [];
  const navigation = useNavigation(); // Initialize navigation

  const handlePlaceOrder = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("OrderDetails", { cartItems }); // Navigate to OrderDetailsScreen
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Card style={styles.card}>
                <View style={styles.cardContent}>
                  <Image source={{ uri: item.img }} style={styles.image} />
                  <View style={styles.infoContainer}>
                    <Text style={styles.itemTitle}>{item.name}</Text>
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)} x {item.quantity}</Text>
                  </View>
                </View>
              </Card>
            )}
          />
          {loading ? (
            <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
          ) : (
            <Button mode="contained" style={styles.orderButton} onPress={handlePlaceOrder}>
              Place Order
            </Button>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  card: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "#f9f9f9",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  orderButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007AFF",
    alignSelf: "center",
    width: "80%",
  },
  loader: {
    marginTop: 20,
    alignSelf: "center",
  },
});
