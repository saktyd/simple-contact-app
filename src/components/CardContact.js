import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {boxShadowDefault, colors, fontSizes} from '../styles';
import {useNavigation} from '@react-navigation/native';
import Button from './Button';
import Photo from './Photo';
import {fetchContactDetail} from '../config/redux/actions';
import {useDispatch} from 'react-redux';

const CardContact = ({item}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onPress = () => {
    dispatch(fetchContactDetail(item));
    navigation.navigate('Contact Detail');
  };

  const ripple = {
    color: colors.greyDark,
    borderless: false,
    radius: -5,
  };

  return (
    <Button {...{onPress, ripple, styleContainer: styles.container}}>
      <Photo urlPhoto={item?.photo} />
      <View style={styles.containerInfo}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode={'tail'}>
          {item?.firstName} {item?.lastName}
        </Text>
        <Text style={styles.age}>{item?.age}</Text>
      </View>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    overflow: 'hidden',
    ...boxShadowDefault,
    borderRadius: 5,
  },
  containerInfo: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  name: {
    fontSize: fontSizes.medium,
    fontWeight: 'bold',
    color: colors.purple,
  },
  age: {
    color: '#8C8C94',
    fontSize: fontSizes.medium,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});

export default CardContact;
