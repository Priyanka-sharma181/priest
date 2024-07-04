// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator,
// } from "react-native";
// import axios from "axios";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { Card } from "react-native-paper";
// import {
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
// } from "react-native-popup-menu";

// const BookingCard = ({
//   time,
//   type,
//   title,
//   description,
//   startTime,
//   endTime,
//   videoUrl,
// }) => (
//   <Card style={styles.card}>
//     <Card.Content>
//       <View style={styles.cardHeader}>
//         <Text style={styles.cardTime}>{time}</Text>
//       </View>
//       <Text style={styles.cardTitle}>{title}</Text>
//       <Text style={styles.cardSubtitle}>{description}</Text>
//       <Text style={styles.cardTimeRange}>
//         {startTime} - {endTime}
//       </Text>
//       <View style={styles.buttonRow}>
//         <TouchableOpacity
//           style={styles.joinButton}
//           onPress={() => console.log("Joining Zoom meeting:", videoUrl)}
//         >
//           <Text style={styles.buttonText}>Join Now</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.pdfButton}>
//           <Text style={styles.buttonText}>PDF</Text>
//         </TouchableOpacity>
//       </View>
//     </Card.Content>
//   </Card>
// );

// const HomeScreen = ({ navigation }) => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const fetchUserId = async () => {
//       const storedUserId = await AsyncStorage.getItem("userId");
//       if (storedUserId) {
//         setUserId(storedUserId);
//         fetchBookings(storedUserId);
//       }
//     };

//     fetchUserId();
//   }, []);

//   const fetchBookings = async (userId) => {
//     try {
//       const response = await axios.get(
//         `http://3.111.220.23:5000/api/priest/getPriestbookings?userId=${userId}`
//       );
//       console.log(response.data);

//       const sortedBookings = response.data.sort((a, b) =>
//         new Date(a.startDate) - new Date(b.startDate)
//       );

//       setBookings(sortedBookings);
//     } catch (error) {
//       console.error("Error fetching bookings:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = async () => {
//     await AsyncStorage.removeItem("userId");
//     navigation.navigate("Login");
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#0000ff" />;
//   }

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>Mallikarjuna Swamy, Srisailam</Text>
//         <Menu>
//           <MenuTrigger text="•••" />
//           <MenuOptions>
//             <MenuOption onSelect={handleLogout} text="LOGOUT" />
//             <MenuOption onSelect={handleLogout} text="ABOUT US" />
//             <MenuOption onSelect={handleLogout} text="FAQ's" />
//           </MenuOptions>
//         </Menu>
//       </View>
//       <View style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>
//           Upcoming Bookings ({bookings.length})
//         </Text>
//         <Text style={styles.sectionDate}>
//           {new Date().toLocaleDateString()}
//         </Text>
//       </View>
//       {bookings.map((booking, index) => {
//         const startTime = new Date(booking.startDate).toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });
//         const endTime = new Date(booking.endDate).toLocaleTimeString([], {
//           hour: "2-digit",
//           minute: "2-digit",
//         });
//         return (
//           <BookingCard
//             key={index}
//             time="120 Sec"
//             type={booking.type}
//             title={booking.title}
//             description={booking.description}
//             startTime={startTime}
//             endTime={endTime}
//             videoUrl={booking.videoUrl}
//           />
//         );
//       })}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//     padding: 10,
//   },
//   header: {
//     backgroundColor: "#FFFFFF",
//     padding: 15,
//     borderRadius: 5,
//     marginBottom: 10,
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   headerText: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   sectionDate: {
//     fontSize: 14,
//     color: "#888888",
//   },
//   card: {
//     marginBottom: 10,
//     borderRadius: 10,
//     backgroundColor: "#FFFFFF",
//     elevation: 2,
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   cardTime: {
//     fontSize: 12,
//     color: "#888888",
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginTop: 10,
//   },
//   cardSubtitle: {
//     fontSize: 14,
//     color: "#888888",
//     marginVertical: 5,
//   },
//   cardTimeRange: {
//     fontSize: 14,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   joinButton: {
//     backgroundColor: "#000000",
//     padding: 10,
//     borderRadius: 5,
//   },
//   pdfButton: {
//     backgroundColor: "#cccccc",
//     padding: 10,
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: "#FFFFFF",
//     fontWeight: "bold",
//   },
// });

// export default HomeScreen;


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "react-native-paper";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from "react-native-popup-menu";
import { MaterialIcons } from '@expo/vector-icons'; // Import the icon library

const BookingCard = ({
  date,
  time,
  type,
  title,
  description,
  startTime,
  endTime,
  videoUrl,
}) => (
  <Card style={styles.card}>
    <Card.Content>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTime}>{time}</Text>
        <View style={styles.dateContainer}>
          <MaterialIcons name="event" size={24} color="black" />
          <Text style={styles.cardDate}>{date}</Text>
        </View>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{description}</Text>
      <Text style={styles.cardTimeRange}>
        {startTime} - {endTime}
      </Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={() => console.log("Joining Zoom meeting:", videoUrl)}
        >
          <Text style={styles.buttonText}>Join Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pdfButton}>
          <Text style={styles.buttonText}>PDF</Text>
        </TouchableOpacity>
      </View>
    </Card.Content>
  </Card>
);

const HomeScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      if (storedUserId) {
        setUserId(storedUserId);
        fetchBookings(storedUserId);
      }
    };

    fetchUserId();
  }, []);

  const fetchBookings = async (userId) => {
    try {
      const response = await axios.get(
        `http://3.111.220.23:5000/api/priest/getPriestbookings?userId=${userId}`
      );
      console.log(response.data);

      const sortedBookings = response.data.sort((a, b) =>
        new Date(a.startDate) - new Date(b.startDate)
      );

      setBookings(sortedBookings);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userId");
    navigation.navigate("Login");
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mallikarjuna Swamy, Srisailam</Text>
        <Menu>
          <MenuTrigger text="•••" />
          <MenuOptions>
            <MenuOption onSelect={handleLogout} text="LOGOUT" />
            <MenuOption onSelect={() => console.log("ABOUT US")} text="ABOUT US" />
            <MenuOption onSelect={() => console.log("FAQ's")} text="FAQ's" />
          </MenuOptions>
        </Menu>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Upcoming Bookings ({bookings.length})
        </Text>
        <Text style={styles.sectionDate}>
          {new Date().toLocaleDateString()}
        </Text>
      </View>
      {bookings.map((booking, index) => {
        const eventDate = new Date(booking.startDate).toLocaleDateString();
        const startTime = new Date(booking.startDate).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        const endTime = new Date(booking.endDate).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        return (
          <BookingCard
            key={index}
            date={eventDate}
            time="120 Sec"
            type={booking.type}
            title={booking.title}
            description={booking.description}
            startTime={startTime}
            endTime={endTime}
            videoUrl={booking.videoUrl}
          />
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  sectionDate: {
    fontSize: 14,
    color: "#888888",
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardDate: {
    fontSize: 14,
    color: "#000000",
    fontWeight: "bold",
    marginLeft: 5,
  },
  cardTime: {
    fontSize: 12,
    color: "#888888",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#888888",
    marginVertical: 5,
  },
  cardTimeRange: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  joinButton: {
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 5,
  },
  pdfButton: {
    backgroundColor: "#cccccc",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default HomeScreen;
