import React from 'react';
import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {colors} from '../styles';

const LoadingContainer = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.purple} size={'large'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoadingContainer;
