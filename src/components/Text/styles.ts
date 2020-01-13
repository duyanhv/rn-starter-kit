import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
  default: {
    textTransform: 'none',
  },
  bold: {
    fontWeight: 'bold',
  },
  h1: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  h4: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  h5: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  h6: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  s1: {
    fontSize: 16,
  },
  s2: {
    fontSize: 14,
  },
  success: {
    color: colors.green,
  },
  info: {
    color: colors.blue,
  },
  warning: {
    color: colors.orange,
  },
  danger: {
    color: colors.red,
  },
});
