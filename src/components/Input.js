import React from 'react';
import {memo} from 'react';
import {Text, TextInput, StyleSheet, View} from 'react-native';
import {colors, fontSizes} from '../styles';

const Input = ({containerStyle, label, required, error, ...rest}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>
        {label}{' '}
        {required ? (
          <Text style={styles.star}>*</Text>
        ) : (
          <Text>(Optional)</Text>
        )}
      </Text>
      <TextInput
        {...rest}
        style={styles.textInput}
        placeholderTextColor={colors.greyNormal}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : <></>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: fontSizes.small,
    color: colors.dark,
  },
  star: {
    color: colors.red,
  },
  textInput: {
    marginTop: 2,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 10,
    paddingLeft: 0,
    borderBottomColor: colors.greyNormal,
    borderBottomWidth: 1,
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    color: colors.greyDark,
  },
  errorText: {
    fontSize: fontSizes.xsmall,
    color: colors.red,
    paddingVertical: 5,
  },
});

export default memo(Input);
