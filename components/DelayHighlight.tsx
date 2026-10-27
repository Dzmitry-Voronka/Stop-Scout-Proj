import { useEffect, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { DepartureDelay } from '@/src/domain/value-objects/DepartureDelay';

const PULSE_MIN_OPACITY = 0.3;
const PULSE_STEP_MS = 600;

export interface DelayHighlightProps {
  delay: DepartureDelay;
}

// The component only displays what DepartureDelay says; it does not know the thresholds.
export default function DelayHighlight({ delay }: DelayHighlightProps) {
  const colors = Colors[useColorScheme()];
  // Lazy initializer: the Animated.Value is created once and kept for the life of the component.
  const [opacity] = useState(() => new Animated.Value(1));

  useEffect(() => {
    if (!delay.shouldPulse) {
      return;
    }
    // Opacity goes down and up again, forever, on the native thread (no JS work per frame).
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: PULSE_MIN_OPACITY,
          duration: PULSE_STEP_MS,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, { toValue: 1, duration: PULSE_STEP_MS, useNativeDriver: true }),
      ]),
    );
    pulse.start();
    // Stop the loop when the delay changes or the card leaves the screen, then reset the opacity.
    return () => {
      pulse.stop();
      opacity.setValue(1);
    };
  }, [delay.shouldPulse, opacity]);

  const color = {
    'on-time': colors.delayOnTime,
    minor: colors.delayMinor,
    major: colors.delayMajor,
  }[delay.severity];

  return (
    <Animated.Text
      style={[styles.label, { color, opacity }, delay.severity === 'major' && styles.major]}
    >
      {delay.label}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
  },
  major: {
    fontWeight: 'bold',
  },
});
