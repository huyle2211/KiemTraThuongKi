import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
}

interface MovieCardProps {
  movie: Movie;
  layout?: 'row' | 'tile';
  onSelect: (id: string) => void;
}

const MovieCard = ({
  movie,
  layout = 'row',
  onSelect,
}: MovieCardProps) => {
  const isTile = layout === 'tile';

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isTile && styles.cardTile,
      ]}
      onPress={() => onSelect(movie.id)}
      activeOpacity={0.7}
    >
      {/* POSTER */}
      <View
        style={[
          styles.posterContainer,
          isTile && styles.posterContainerTile,
        ]}
      >
        <Image
          source={{ uri: movie.poster }}
          style={[
            styles.poster,
            isTile && styles.posterTile,
          ]}
        />

        {/* Rating nằm trên poster */}
        {isTile && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingBadgeText}>
              ⭐ {Number(movie.rating).toFixed(1)}
            </Text>
          </View>
        )}
      </View>

      {/* THÔNG TIN */}
      <View
        style={[
          styles.info,
          isTile && styles.infoTile,
        ]}
      >
        <Text
          style={[
            styles.title,
            isTile && styles.titleTile,
          ]}
          numberOfLines={isTile ? 1 : undefined}
        >
          {movie.title}
        </Text>

        {/* Row: hiển thị genre + year */}
        {!isTile && (
          <>
            <Text style={styles.text}>
              Thể loại: {movie.genre}
            </Text>

            <Text style={styles.text}>
              Năm: {movie.year}
            </Text>

            <Text style={styles.rating}>
              ⭐ {Number(movie.rating).toFixed(1)}
            </Text>
          </>
        )}

        {/* Trạng thái */}
        <Text style={styles.status}>
          {movie.isShowing
            ? 'Đang chiếu ✅'
            : 'Ngừng chiếu ❌'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(MovieCard);

const styles = StyleSheet.create({
  /* =========================
     ROW - 1 CỘT
     ========================= */

  card: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 10,
    marginVertical: 6,
    padding: 10,
    borderRadius: 10,
    elevation: 3,
  },

  posterContainer: {
    width: 70,
    height: 100,
    position: 'relative',
  },

  poster: {
    width: 70,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#ddd',
  },

  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#222',
  },

  text: {
    fontSize: 14,
    marginBottom: 4,
    color: '#555',
  },

  rating: {
    fontSize: 16,
    color: '#ff9800',
    fontWeight: 'bold',
    marginTop: 4,
  },

  status: {
    fontSize: 14,
    marginTop: 5,
    color: '#333',
  },

  /* =========================
     TILE - 2 CỘT
     ========================= */

  cardTile: {
    flexDirection: 'column',

    /*
      Không dùng flex: 1 ở đây.
      Mỗi item chiếm 48% chiều rộng,
      item cuối sẽ không bị kéo full.
    */
    width: '48%',

    marginHorizontal: 0,
    marginVertical: 5,
    padding: 0,

    overflow: 'hidden',
  },

  posterContainerTile: {
    width: '100%',
    aspectRatio: 2 / 3,
    position: 'relative',
  },

  posterTile: {
    width: '100%',
    height: '100%',
    borderRadius: 0,
  },

  infoTile: {
    marginLeft: 0,
    padding: 8,
  },

  titleTile: {
    fontSize: 16,
    marginBottom: 5,
  },

  /* Rating đè lên poster */
  ratingBadge: {
    position: 'absolute',
    top: 6,
    right: 6,

    backgroundColor: 'rgba(0, 0, 0, 0.75)',

    paddingHorizontal: 7,
    paddingVertical: 5,

    borderRadius: 6,
  },

  ratingBadgeText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
