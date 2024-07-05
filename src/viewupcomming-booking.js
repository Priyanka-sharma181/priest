import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  Dimensions,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Card } from "react-native-paper";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { MaterialIcons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

const BookingCard = ({
  date,
  time,
  category,
  title,
  startTime,
  endTime,
  videoUrl,
  onJoinPress,
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
      <Text style={styles.cardSubtitle}>{category}</Text>
      <Text style={styles.cardTimeRange}>
        {startTime} - {endTime}
      </Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={() => onJoinPress(videoUrl)}
        >
          <Text style={styles.buttonText}>Join Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pdfButton}>
          <MaterialIcons name="file-download" size={24} color="black" />
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
  const [modalVisible, setModalVisible] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");

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

      const sortedBookings = response.data.sort(
        (a, b) => new Date(a.startDate) - new Date(b.startDate)
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

  const handleJoinPress = (url) => {
    setVideoUrl(url);
    setModalVisible(true);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Group bookings by date
  const groupedBookings = {};
  bookings.forEach((booking) => {
    const eventDate = new Date(booking.startDate).toLocaleDateString();
    if (!groupedBookings[eventDate]) {
      groupedBookings[eventDate] = [];
    }
    groupedBookings[eventDate].push(booking);
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mallikarjuna Swamy, Srisailam</Text>
        <Menu>
          <MenuTrigger text="•••" />
          <MenuOptions>
            <MenuOption onSelect={handleLogout} text="LOGOUT" />
            <MenuOption
              onSelect={() => console.log("ABOUT US")}
              text="ABOUT US"
            />
            <MenuOption onSelect={() => console.log("FAQ's")} text="FAQ's" />
          </MenuOptions>
        </Menu>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Total Upcoming Bookings: {bookings.length}
        </Text>
        {/* <Text style={styles.sectionDate}>
          {new Date().toLocaleDateString()}
        </Text> */}
      </View>
      <View style={styles.grid}>
        {Object.keys(groupedBookings).map((date) => (
          <View key={date}>
            <Text style={styles.dateHeader}>{date}</Text>
            <ScrollView horizontal style={styles.horizontalScroll}>
              {groupedBookings[date].map((booking, index) => {
                const startTime = new Date(
                  booking.startDate
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                const endTime = new Date(booking.endDate).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                );
                return (
                  <View style={styles.gridItem} key={index}>
                    <BookingCard
                      date={date}
                      time="120 Sec"
                      category={booking.category}
                      title={booking.eventTypeTitle}
                      startTime={startTime}
                      endTime={endTime}
                      videoUrl={booking.videoUrl}
                      onJoinPress={handleJoinPress}
                      showDevoteeInfo={booking.showDevoteeInfo}
                    />
                  </View>
                );
              })}
            </ScrollView>
          </View>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <WebView
            source={{ uri: videoUrl }}
            style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height }}
          />
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  grid: {
    flexDirection: "column",
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 1,
    marginLeft: 290,
  },
  horizontalScroll: {
    flexDirection: "row",
  },
  gridItem: {
    width: 200,
    marginRight: 10,
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
    marginTop: 10, // Add some margin between the buttons and the card content
  },
  joinButton: {
    backgroundColor: "#000000",
    padding: 10,
    borderRadius: 4,
    flex: 1, // Ensure both buttons take equal space
    marginRight: 5, // Add some space between the buttons
  },
  pdfButton: {
    backgroundColor: "#cccccc",
    padding: 10,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    flex: 1, // Ensure both buttons take equal space
    marginLeft: 5, // Add some space between the buttons
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "light",
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
  },
  closeButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#000000",
  },
});

export default HomeScreen;

