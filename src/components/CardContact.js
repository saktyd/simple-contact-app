import React, {useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {boxShadowDefault, colors, fontSizes} from '../styles';
import {useNavigation} from '@react-navigation/native';
import Button from './Button';

const CardContact = ({item}) => {
  const navigation = useNavigation();
  const img = item?.photo.replace('http', 'https');
  const [sourceImg, setSourceImg] = useState({
    uri: img,
  });

  const onPress = () => {
    navigation.navigate('Contact Detail');
  };

  const loadFallback = () => {
    setSourceImg(require('../assets/account.png'));
  };

  const ripple = {
    color: colors.purple,
    borderless: false,
    radius: -5,
  };

  return (
    <Button {...{onPress, ripple, styleContainer: styles.container}}>
      <Image
        style={styles.imageStyle}
        source={sourceImg}
        fadeDuration={500}
        resizeMethod={'scale'}
        onError={loadFallback}
        defaultSource={require('../assets/account.png')}
      />
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
  imageStyle: {
    width: 50,
    height: 50,
    padding: 10,
    backgroundColor: colors.greyDark,
    borderRadius: 50,
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
