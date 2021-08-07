import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  Button,
  Photo,
  ScreenContainer,
  ModalDeleteContact,
} from '../../components';
import {deleteContact, fetchContactDetail} from '../../config/redux/actions';
import {boxShadowDefault, colors} from '../../styles';

export default ({navigation}) => {
  const dispatch = useDispatch();
  const [showModalDelete, setShowModalDelete] = useState(false);
  const contactDetail = useSelector(({contact}) => contact.contactDetail);
  const isLoadingDeleteContact = useSelector(
    ({contact}) => contact.isLoadingDeleteContact,
  );

  const onPessEdit = () => {
    navigation.push('UpdateContact', {
      type: 'edit',
    });
  };

  useEffect(() => {
    return () => {
      dispatch(fetchContactDetail(null));
    };
  }, [dispatch]);

  const modalAction = item => {
    if (item === 'delete') {
      dispatch(deleteContact(contactDetail.id));
    }
    setShowModalDelete(false);
  };

  return (
    <ScreenContainer
      bgColor={'white'}
      loading={isLoadingDeleteContact}
      edges={['bottom']}>
      <ModalDeleteContact
        modalVisible={showModalDelete}
        onPress={modalAction}
      />
      <Photo urlPhoto={contactDetail?.photo} imageStyle={styles.imageStyle} />
      <View style={styles.nameContainer}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode={'tail'}>
          {contactDetail?.firstName} {contactDetail?.lastName}{' '}
        </Text>
        <Text style={styles.age}>{contactDetail?.age}</Text>
      </View>
      <ImageBackground
        resizeMode={'contain'}
        style={styles.imageContainer}
        imageStyle={{opacity: 0.8}}
        source={require('../../assets/profile-detail.png')}>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={onPessEdit}
            styleContainer={styles.editButton}
            title={'Edit'}
            styleText={styles.createText}
          />
          <Button
            onPress={() => setShowModalDelete(true)}
            styleContainer={styles.deleteButton}
            title={'Delete'}
            styleText={styles.createText}
          />
        </View>
      </ImageBackground>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: '100%',
    height: '30%',
    borderRadius: 0,
    borderWidth: 0,
  },
  nameContainer: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  imageContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
    flex: 1,
  },
  name: {
    fontSize: 25,
    textAlign: 'left',
    fontWeight: 'bold',
    color: colors.purple,
  },
  age: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginTop: 5,
    color: colors.dark,
    fontStyle: 'italic',
  },
  buttonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 30,
    right: 0,
    paddingHorizontal: 30,
  },
  editButton: {
    paddingVertical: 10,
    paddingHorizontal: 23,
    ...boxShadowDefault,
    borderRadius: 20,
    backgroundColor: colors.purple,
  },
  deleteButton: {
    marginLeft: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    ...boxShadowDefault,
    borderRadius: 20,
    backgroundColor: colors.red,
  },
});
