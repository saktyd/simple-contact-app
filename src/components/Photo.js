import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {boxShadowDefault, colors} from '../styles';

const Photo = ({urlPhoto, imageStyle}) => {
  const [sourceImg, setSourceImg] = useState('');
  useEffect(() => {
    const url = urlPhoto ? urlPhoto.replace('http', 'https') : urlPhoto;
    if (url) {
      setSourceImg({
        uri: url,
      });
    } else {
      loadFallback();
    }
  }, [urlPhoto]);

  const loadFallback = () => {
    setSourceImg(require('../assets/account.png'));
  };
  return (
    <Image
      style={[styles.imageStyle, imageStyle]}
      source={sourceImg}
      fadeDuration={500}
      resizeMethod={'scale'}
      onError={loadFallback}
      defaultSource={require('../assets/account.png')}
    />
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 50,
    height: 50,
    padding: 10,
    backgroundColor: colors.greyDark,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors.greyNormal,
  },
});

export default Photo;
