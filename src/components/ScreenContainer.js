/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Platform,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../styles';
import {useHeaderHeight} from '@react-navigation/elements';

export default props => {
  const headerHeight = useHeaderHeight();
  return (
    <SafeAreaView
      style={styles.container(props?.bgColor)}
      edges={Platform.OS === 'ios' ? props?.edges : []}>
      <StatusBar
        translucent
        backgroundColor={colors.purple}
        barStyle="light-content"
      />
      {props.loading && (
        <Modal
          animationType="fade"
          transparent
          statusBarTranslucent={false}
          visible={true}>
          <View style={styles.loadingContainer(headerHeight)}>
            <View style={styles.loadingContainerBackground} />
            <View style={{position: 'absolute'}}>
              <ActivityIndicator size={'large'} color={colors.red} />
            </View>
          </View>
        </Modal>
      )}
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: bgColor => ({
    flex: 1,
    backgroundColor: bgColor || colors.background,
  }),
  loadingContainer: headerHeight => ({
    flex: 1,
    paddingTop: headerHeight,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 5,
  }),
  loadingContainerBackground: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
    opacity: 0.5,
  },
});
