import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {colors, fontSizes} from '../styles';

export default () => {
  return (
    <View style={styles.noDataContainer}>
      <Image
        resizeMode={'cover'}
        style={styles.nodata}
        source={require('../assets/no-data.png')}
      />
      <Text style={styles.noDataText}>No Data</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  nodata: {
    width: 200,
    height: 200,
  },
  noDataText: {
    color: colors.greyDark,
    fontWeight: 'bold',
    fontSize: fontSizes.large,
  },
});
