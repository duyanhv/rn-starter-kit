import { StyleSheet } from 'react-native';
import { colors } from '@app/core';

export const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingTop: 10,
  },
  textInput: {
    fontSize: 15,
    borderWidth: 1,
    borderRadius: 25,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 10,
  },
  error: {
    marginLeft: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  label: {
    marginTop: 5,
    marginBottom: 5,
  },
  tooltipIcon: {
    margin: 8,
  },
  pickerText: {
    color: colors.black,
  },
  eyeIcon: {
    position: 'absolute',
    right: 5,
    bottom: 5,
  },
});
