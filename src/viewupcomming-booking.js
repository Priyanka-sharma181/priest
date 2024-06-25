import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { WebView } from "react-native-webview";

const bookings = [
  {
    id: "1",
    title: "Upcoming Bookings",
    url: "http://3.111.220.23/bookings/upcoming",
  },
];

const UpcomingBookings = () => {
  const [selectedBooking, setSelectedBooking] = useState(null);

  const handleBookingPress = (booking) => {
    setSelectedBooking(booking);
  };

  const handleBackPress = () => {
    setSelectedBooking(null);
  };

  return (
    <View style={styles.container}>
      {selectedBooking ? (
        <View style={styles.webviewContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <WebView
            source={{ uri: selectedBooking.url }}
            style={styles.webview}
          />
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.bookingItem}
              onPress={() => handleBookingPress(item)}
            >
              <Text style={styles.bookingTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  bookingItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  bookingTitle: {
    fontSize: 18,
  },
  webviewContainer: {
    flex: 1,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#007BFF",
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  webview: {
    flex: 1,
  },
});

export default UpcomingBookings;
