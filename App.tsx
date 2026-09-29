import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import MovieCard from './components/MovieCard';

const API_URL =
  'https://6abb54a9b2118ed7abb83eea.mockapi.io/movies';

function AppContent() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Câu 6b
  const [refreshing, setRefreshing] = useState(false);

  // GET API
  const getMovies = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      setMovies(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  // Câu 6b:
  // Khi refresh → gọi lại API GET
  const onRefresh = async () => {
    setRefreshing(true);

    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      setMovies(data);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const handleSelectMovie = (id) => {
    const movie = movies.find(
      (item) => String(item.id) === String(id)
    );

    if (!movie) return;

    Alert.alert(
      'Movie App',
      `Bạn đã chọn: ${movie.title}`
    );
  };

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>
        Movie App
      </Text>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color="red"
          />

          <Text>
            Đang tải dữ liệu...
          </Text>
        </View>
      ) : (
        <FlatList
          data={movies}

          keyExtractor={(item) =>
            String(item.id)
          }

          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              layout="row"
              onSelect={handleSelectMovie}
            />
          )}

          // Câu 6b
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      )}

    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20,
    color: 'red',
    backgroundColor: 'white',
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
