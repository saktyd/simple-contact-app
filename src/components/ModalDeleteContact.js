import React from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import {boxShadowDefault, colors, fontSizes} from '../styles';
import Button from './Button';

export default ({modalVisible, onPress}) => {
  return (
    <Modal animationType="fade" visible={modalVisible} transparent>
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Delete this contact ?</Text>
          <Text style={styles.text}>
            This contact will be removed permanently.
          </Text>
          <View style={styles.buttonsContainer}>
            <Button
              onPress={() => onPress('cancel')}
              styleContainer={styles.cancelButton}
              title={'Cancel'}
              styleText={styles.buttonText(colors.greyDark)}
            />
            <Button
              onPress={() => onPress('delete')}
              styleContainer={styles.cancelButton}
              title={'Delete'}
              styleText={styles.buttonText(colors.red)}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    maxWidth: '80%',
    padding: 20,
    ...boxShadowDefault,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: fontSizes.medium,
    color: colors.purple,
  },
  text: {
    fontSize: fontSizes.small,
    color: colors.dark,
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelButton: {
    backgroundColor: 'transparent',
    marginLeft: 20,
    borderRadius: 0,
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  buttonText: color => ({
    padding: 5,
    color: color,
  }),
});
