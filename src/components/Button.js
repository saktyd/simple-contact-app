import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Pressable,
} from 'react-native';
import {colors} from '../styles';

const ButtonText = ({styleText, disabled, title}) => {
  return (
    <>
      <Text
        style={[
          styles.text,
          styleText,
          disabled ? {color: colors.greyDark} : '',
        ]}>
        {title}
      </Text>
    </>
  );
};

const ButtonChildren = ({children, ...props}) => {
  return children || <ButtonText {...props} />;
};

const Button = ({styleContainer, ripple, disabled, onPress, ...props}) => {
  const ButtonProps = {
    style: [styles.container({disabled}), styleContainer],
    onPress: !disabled ? onPress : null,
  };
  const android_ripple = {
    color: 'white',
    borderless: false,
    radius: -10,
  };

  return Platform.OS === 'ios' ? (
    <TouchableOpacity activeOpacity={0.8} {...ButtonProps}>
      <ButtonChildren {...{disabled, ...props}} />
    </TouchableOpacity>
  ) : (
    <Pressable android_ripple={ripple || android_ripple} {...ButtonProps}>
      <ButtonChildren {...{disabled, ...props}} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: disabled => ({
    backgroundColor: disabled ? colors.greyNormal : '',
  }),
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Button;
