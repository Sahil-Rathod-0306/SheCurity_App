
// import React, { useState, useEffect, useRef } from "react";
// import { 
//   Pressable, SafeAreaView, StyleSheet, Text, View, Switch, 
//   Alert 
// } from "react-native";
// import * as Location from "expo-location";
// import { Linking } from "react-native";
// import { Audio } from "expo-av";
// import Ionicons from "@expo/vector-icons/Ionicons";
// import MapView, { Marker } from "react-native-maps";
// import { Camera } from "expo-camera";

// export default function HomeScreen({ navigation }) {
//   const [location, setLocation] = useState(null);
//   const [region, setRegion] = useState(null);
//   const [locationName, setLocationName] = useState("Fetching location...");
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [alertMessage, setAlertMessage] = useState("");
//   const [isAlarmEnabled, setIsAlarmEnabled] = useState(true);
//   const [hasPermission, setHasPermission] = useState(null);
//   const soundRef = useRef(null);
//   const countdownRef = useRef(null); 

//   useEffect(() => {
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       setHasPermission(status === "granted");
//     })();
//   }, []);

//   useEffect(() => {
//     (async () => {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert("Permission Denied", "Allow location access to use this feature.");
//         return;
//       }
  
//       Location.watchPositionAsync(
//         { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
//         async (newLocation) => {
//           const { latitude, longitude } = newLocation.coords;
//           setLocation({ latitude, longitude });
//           setRegion({
//             latitude,
//             longitude,
//             latitudeDelta: 0.05,
//             longitudeDelta: 0.05,
//           });

//           let address = await Location.reverseGeocodeAsync({ latitude, longitude });
//           if (address.length > 0) {
//             setLocationName(`${address[0].city}, ${address[0].region}`);
//           } else {
//             setLocationName("Location not found");
//           }
//         }
//       );
//     })();
//   }, []);

//   const locationText = location ? `📍 ${locationName}` : "Fetching location...";

//   const playSosAlert = async () => {
//     if (isPlaying) return;
//     setIsPlaying(true);

//     let countdown = 10; 
//     setAlertMessage(`🚨 SOS Alert is Active! 🚨 (${countdown}s)`);

//     countdownRef.current = setInterval(() => {
//       countdown -= 1;
//       setAlertMessage(`🚨 SOS Alert is Active! 🚨 (${countdown}s)`);
  
//       if (countdown <= 0) {
//         clearInterval(countdownRef.current);
//         stopSosAlert();
//       }
//     }, 1000);

//     Alert.alert(
//       "Stop SOS Alert?",
//       "Do you want to stop the SOS alert?",
//       [
//         { text: "No", onPress: () => stopAlertNow(), style: "cancel" }, 
//         { text: "Yes", style: "default" } 
//       ]
//     );

//     if (isAlarmEnabled) {
//       try {
//         const { sound } = await Audio.Sound.createAsync(
//           require("../../assets/siren-alert-96052.mp3"),
//           { shouldPlay: true, isLooping: false }
//         );
//         soundRef.current = sound;
//         await sound.playAsync();
//       } catch (error) {
//         console.log("Error playing sound:", error);
//       }
//     }
//   };

//   const stopAlertNow = () => {
//     clearInterval(countdownRef.current);
//     stopSosAlert(); 
//   };

//   const stopSosAlert = async () => {
//     clearInterval(countdownRef.current); 
//     if (soundRef.current) {
//       await soundRef.current.stopAsync();
//       await soundRef.current.unloadAsync();
//       soundRef.current = null;
//     }
//     setIsPlaying(false);
//     setAlertMessage("SOS Alert Stopped");

//     setTimeout(() => {
//       setAlertMessage("");
//     }, 3000);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.locationContainer}>
//         <Ionicons name="location" size={20} color="#D7263D" style={styles.locationIcon} />
//         <Text style={styles.locationText}>{locationText}</Text>
//       </View>

//       {region && (
//         <MapView style={styles.map} region={region}>
//           <Marker coordinate={region} title="Your Location" />
//         </MapView>
//       )}

//       {alertMessage !== "" && (
//         <View style={styles.alertMessageContainer}>
//           <Text style={styles.alertMessage}>{alertMessage}</Text>
//         </View>
//       )}

//       <View style={styles.toggleContainer}>
//         <Text style={styles.toggleText}>Enable Alarm Sound</Text>
//         <Switch value={isAlarmEnabled} onValueChange={setIsAlarmEnabled} />
//       </View>

//       <View style={styles.buttonContainer}>
//         {!isPlaying ? (
//           <Pressable style={styles.button} onPress={playSosAlert}>
//             <Text style={styles.buttonText}>SOS</Text>
//           </Pressable>
//         ) : (
//           <Pressable style={[styles.button, { backgroundColor: "#555" }]} onPress={stopSosAlert}>
//             <Text style={styles.buttonText}>Stop SOS</Text>
//           </Pressable>
//         )}

//         <View style={styles.twoview}>
//           <Pressable style={styles.smallButton} onPress={() => Linking.openURL("tel:7208151141")}>
//             <Text style={styles.smallButtonText}>🚔 POLICE HELPLINE</Text>
//           </Pressable>

//           <Pressable style={styles.smallButton} onPress={() => Linking.openURL("tel:")}>
//             <Text style={styles.smallButtonText}>👩‍🦰 WOMEN HELPLINE</Text>
//           </Pressable>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   map: {
//     width: "90%",
//     height: 200,
//     marginTop: 10,
//     borderRadius: 10,
//   },
//   locationContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     position: "absolute",
//     top: 20,  
//     right: 20, 
//     backgroundColor: "white",
//     padding: 10,
//     borderRadius: 10,
//     elevation: 5,
//   },
//   locationText: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#333",
//     marginLeft: 5,
//   },
//   toggleContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 20,
//   },
//   toggleText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginRight: 10,
//   },
//   button: {
//     width: 150,
//     height: 150,
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 50,
//     backgroundColor: "#D7263D",
//   },
//   buttonContainer: {
//     alignItems: "center",
//     marginTop: 20,
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   twoview: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     width: "90%",
//     marginTop: 20,
//   },
//   smallButton: {
//     flex: 1,
//     backgroundColor: "#7b539d",
//     paddingVertical: 12,
//     marginHorizontal: 5,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   smallButtonText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "bold",
//   },
// });
import React, { useState, useEffect, useRef } from "react";
import { 
  Pressable, SafeAreaView, StyleSheet, Text, View, Switch, 
  Alert 
} from "react-native";
import * as Location from "expo-location";
import { Linking } from "react-native";
import { Audio } from "expo-av";
import Ionicons from "@expo/vector-icons/Ionicons";
import MapView, { Marker } from "react-native-maps";
import { Camera } from "expo-camera";

export default function HomeScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [locationName, setLocationName] = useState("Fetching location...");
  const [isPlaying, setIsPlaying] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isAlarmEnabled, setIsAlarmEnabled] = useState(true);
  const [hasPermission, setHasPermission] = useState(null);
  const soundRef = useRef(null);
  const countdownRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Allow location access to use this feature.");
        return;
      }
  
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 5000, distanceInterval: 10 },
        async (newLocation) => {
          const { latitude, longitude } = newLocation.coords;
          setLocation({ latitude, longitude });
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          });

          let address = await Location.reverseGeocodeAsync({ latitude, longitude });
          if (address.length > 0) {
            setLocationName(`${address[0].city}, ${address[0].region}`);
          } else {
            setLocationName("Location not found");
          }
        }
      );
    })();
  }, []);

  const locationText = location ? `📍 ${locationName}` : "Fetching location...";

  const playSosAlert = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    let countdown = 10;
    setAlertMessage(`🚨 SOS Alert is Active! 🚨 (${countdown}s)`);

    countdownRef.current = setInterval(() => {
      countdown -= 1;
      setAlertMessage(`🚨 SOS Alert is Active! 🚨 (${countdown}s)`);
      if (countdown <= 0) {
        clearInterval(countdownRef.current);
        stopSosAlert();
      }
    }, 1000);

    if (isAlarmEnabled) {
      try {
        const { sound } = await Audio.Sound.createAsync(
          require("../../assets/siren-alert-96052.mp3"),
          { shouldPlay: true, isLooping: false }
        );
        soundRef.current = sound;
        await sound.playAsync();
      } catch (error) {
        console.log("Error playing sound:", error);
      }
    }
  };

  const stopSosAlert = async () => {
    clearInterval(countdownRef.current);
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }
    setIsPlaying(false);
    setAlertMessage("SOS Alert Stopped");
    setTimeout(() => {
      setAlertMessage("");
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.locationContainer}>
        <Ionicons name="location" size={20} color="#D7263D" style={styles.locationIcon} />
        <Text style={styles.locationText}>{locationText}</Text>
      </View>

      {region && (
        <MapView style={styles.map} region={region}>
          <Marker coordinate={region} title="Your Location" />
        </MapView>
      )}

      {alertMessage !== "" && (
        <View style={styles.alertMessageContainer}>
          <Text style={styles.alertMessage}>{alertMessage}</Text>
        </View>
      )}

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleText}>Enable Alarm Sound</Text>
        <Switch value={isAlarmEnabled} onValueChange={setIsAlarmEnabled} />
      </View>

      <View style={styles.buttonContainer}>
        {!isPlaying ? (
          <Pressable style={styles.button} onPress={playSosAlert}>
            <Text style={styles.buttonText}>SOS</Text>
          </Pressable>
        ) : (
          <Pressable style={[styles.button, { backgroundColor: "#555" }]} onPress={stopSosAlert}>
            <Text style={styles.buttonText}>Stop SOS</Text>
          </Pressable>
        )}

        <View style={styles.twoview}>
          <Pressable style={styles.smallButton} onPress={() => Linking.openURL("tel:100")}>
            <Text style={styles.smallButtonText}>🛈 POLICE HELPLINE</Text>
          </Pressable>

          <Pressable style={styles.smallButton} onPress={() => Linking.openURL("tel:1091")}> 
            <Text style={styles.smallButtonText}>👩‍👩 WOMEN HELPLINE</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "90%",
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 20,  
    right: 20, 
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  locationText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginLeft: 5,
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#D7263D",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  twoview: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
  },
  smallButton: {
    flex: 1,
    backgroundColor: "#7b539d",
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  smallButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});  
