import { StyleSheet, Text, View } from 'react-native';

import Colors from '@/constants/Colors';
import DelayHighlight from '@/components/DelayHighlight';
import { useColorScheme } from '@/components/useColorScheme';
import { Departure } from '@/src/domain/entities/Departure';

export interface DepartureCardProps {
  departure: Departure;
}

// Local time as HH:mm (the Date holds the exact moment, the phone's time zone is used to show it).
function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

export default function DepartureCard({ departure }: DepartureCardProps) {
  const colors = Colors[useColorScheme()];
  const time = formatTime(departure.departureTime);

  return (
    <View
      style={[styles.card, { backgroundColor: colors.card }]}
      accessible
      accessibilityLabel={`Linia ${departure.routeNumber.value}, kierunek ${departure.headsign}, odjazd ${time}, ${departure.delay.label}`}
    >
      <View style={[styles.route, { backgroundColor: colors.tint }]}>
        <Text style={styles.routeText}>{departure.routeNumber.value}</Text>
      </View>
      <View style={styles.details}>
        <Text style={[styles.headsign, { color: colors.text }]} numberOfLines={1}>
          {departure.headsign}
        </Text>
        <DelayHighlight delay={departure.delay} />
      </View>
      <Text style={[styles.time, { color: colors.text }]}>{time}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    // Row on purpose: React Native lays children out in a column by default.
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
  },
  route: {
    minWidth: 52,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  routeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    flex: 1,
    marginHorizontal: 12,
  },
  headsign: {
    fontSize: 16,
    fontWeight: '600',
  },
  time: {
    fontSize: 20,
    fontWeight: '600',
  },
});
