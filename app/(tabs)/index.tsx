import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/Colors';
import DepartureCard from '@/components/DepartureCard';
import { useColorScheme } from '@/components/useColorScheme';
import { Departure } from '@/src/domain/entities/Departure';
import { container } from '@/src/di/container';

// Dworzec Główny, the example stop from the handout. A stop picker comes in a later stage.
const DEFAULT_STOP_ID = '2072';

const LOADING_MESSAGE = 'Ładowanie odjazdów…';
const EMPTY_MESSAGE = 'Brak odjazdów z tego przystanku.';
const ERROR_MESSAGE = 'Nie udało się pobrać odjazdów.';
const RETRY_LABEL = 'Spróbuj ponownie';

type ScreenState =
  { status: 'loading' } | { status: 'error' } | { status: 'ready'; departures: Departure[] };

export default function DeparturesScreen() {
  const colors = Colors[useColorScheme()];
  const [state, setState] = useState<ScreenState>({ status: 'loading' });

  // Changing this number runs the effect again, which is how "try again" reloads the data.
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    // If the screen closes before the answer arrives, the late answer is ignored.
    let cancelled = false;
    container.getDeparturesUseCase
      .execute(DEFAULT_STOP_ID)
      .then((departures) => {
        if (!cancelled) setState({ status: 'ready', departures });
      })
      .catch(() => {
        // Our own message is shown; the raw error text is never put on the screen.
        if (!cancelled) setState({ status: 'error' });
      });
    return () => {
      cancelled = true;
    };
  }, [attempt]);

  const retry = () => {
    setState({ status: 'loading' });
    setAttempt((current) => current + 1);
  };

  if (state.status === 'loading') {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.tint} />
        <Text style={[styles.message, { color: colors.textSecondary }]}>{LOADING_MESSAGE}</Text>
      </View>
    );
  }

  if (state.status === 'error') {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.message, { color: colors.text }]}>{ERROR_MESSAGE}</Text>
        <Pressable
          style={[styles.retry, { backgroundColor: colors.tint }]}
          onPress={retry}
          accessibilityRole="button"
          accessibilityLabel={RETRY_LABEL}
        >
          <Text style={styles.retryText}>{RETRY_LABEL}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.list}
      data={state.departures}
      keyExtractor={(departure) => departure.id}
      renderItem={({ item }) => <DepartureCard departure={item} />}
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={
        <Text style={[styles.message, { color: colors.textSecondary }]}>{EMPTY_MESSAGE}</Text>
      }
    />
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  list: {
    paddingVertical: 16,
  },
  separator: {
    height: 10,
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  },
  retry: {
    marginTop: 16,
    minHeight: 44,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  retryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
