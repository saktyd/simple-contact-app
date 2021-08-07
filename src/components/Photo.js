import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {boxShadowDefault, colors} from '../styles';

const Photo = ({urlPhoto}) => {
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
    <View style={{...boxShadowDefault, borderRadius: 50}}>
      <Image
        style={styles.imageStyle}
        source={sourceImg}
        fadeDuration={500}
        resizeMethod={'scale'}
        onError={loadFallback}
        defaultSource={require('../assets/account.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 50,
    height: 50,
    padding: 10,
    backgroundColor: colors.greyDark,
    borderRadius: 50,
  },
});

export default Photo;
