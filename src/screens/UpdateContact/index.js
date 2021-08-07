/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {View, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import {Button, Input, Photo, ScreenContainer} from '../../components';
import {debounce} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import {createContact, editContact} from '../../config/redux/actions';

export default ({route}) => {
  const {type} = route.params;
  const dispatch = useDispatch();
  const errorCreate = useSelector(({contact}) => contact.errorCreate);
  const isLoadingCreate = useSelector(({contact}) => contact.isLoadingCreate);
  const contactDetail = useSelector(({contact}) => contact.contactDetail);
  const errorEdit = useSelector(({contact}) => contact.errorEdit);
  const isLoadingEdit = useSelector(({contact}) => contact.isLoadingEdit);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    age: '',
    photo: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    age: '',
    photo: '',
  });

  const onInputChange = (value, varName) => {
    setForm({...form, [varName]: value});
    if (varName === 'age') {
      onEndEditingAge(value);
    } else if (varName === 'photo') {
      onEndEditingPhoto(value);
    } else {
      onEndEditingName(value, varName);
    }
  };

  const isNotValid = useMemo(() => {
    let isError = false;
    let isEmptyForm = false;
    Object.values(form).forEach(item => {
      if (!item) {
        isEmptyForm = true;
      }
    });
    Object.values(errors).forEach(item => {
      if (item) {
        isError = true;
      }
    });
    return isError || isEmptyForm;
  }, [form, errors]);

  const onEndEditingName = (value, varName) => {
    var letterNumber = /^[0-9a-zA-Z]+$/;
    if (value.length >= 3) {
      if (!value.match(letterNumber)) {
        setErrors({
          ...errors,
          [varName]: 'must only contain alpha-numeric characters.',
        });
      } else if (errors[varName]) {
        setErrors({...errors, [varName]: ''});
      }
    } else {
      setErrors({...errors, [varName]: 'minimum 3 characters.'});
    }
  };

  const onEndEditingAge = value => {
    if (value && parseInt(value) >= 1 && parseInt(value) <= 100) {
      if (errors.age) {
        setErrors({...errors, age: ''});
      }
    } else if (value && parseInt(value) > 100) {
      setErrors({...errors, age: 'must be less than or equal to 100.'});
    } else {
      setErrors({...errors, age: 'must be larger than or equal to 1.'});
    }
  };

  const onEndEditingPhoto = value => {
    if (value) {
      if (errors.photo) {
        setErrors({...errors, photo: ''});
      }
    } else {
      setErrors({...errors, age: 'not allowed to be empty.'});
    }
  };

  const onPress = () => {
    if (type === 'create') {
      const payload = {...form, age: parseInt(form.age)};
      dispatch(createContact(payload));
    } else {
      const payload = {...form, age: parseInt(form.age)};
      dispatch(editContact(payload, contactDetail?.id));
    }
  };

  const debouceInputChange = useCallback(debounce(onInputChange, 800), [
    onInputChange,
  ]);

  useEffect(() => {
    if (errorCreate || errorEdit) {
      const {errorKeys, errorMessage} =
        type === 'create' ? errorCreate : errorEdit;
      setErrors({...errors, [errorKeys]: errorMessage});
    }
  }, [errorCreate, errorEdit]);

  useEffect(() => {
    if (type === 'edit' && contactDetail) {
      const {age, id, ...rest} = contactDetail;
      setForm({
        ...form,
        ...rest,
        age: age.toString(),
      });
    }
  }, [contactDetail]);

  return (
    <ScreenContainer
      loading={isLoadingCreate || isLoadingEdit}
      bgColor={'white'}
      edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.photoContainer}>
          <Photo urlPhoto={form.photo} />
          <View style={{flex: 1, marginLeft: 10}}>
            <Input
              label={'Photo'}
              required={true}
              error={errors.photo}
              defaultValue={form.photo}
              containerStyle={{marginBottom: 0}}
              onChangeText={value => debouceInputChange(value, 'photo')}
              placeholder={'https://******'}
            />
          </View>
        </View>
        <Input
          label={'First Name'}
          required={true}
          error={errors.firstName}
          defaultValue={form.firstName}
          maxLength={30}
          onChangeText={value => debouceInputChange(value, 'firstName')}
          placeholder={'Ex: Jhon'}
        />
        <Input
          label={'Last Name'}
          required={true}
          error={errors.lastName}
          maxLength={30}
          defaultValue={form.lastName}
          onChangeText={value => debouceInputChange(value, 'lastName')}
          placeholder={'Ex: Doe'}
        />
        <Input
          label={'Age'}
          required={true}
          error={errors.age}
          defaultValue={form.age}
          keyboardType={'number-pad'}
          maxLength={3}
          onChangeText={value =>
            debouceInputChange(value.replace(/[^0-9]/g, ''), 'age')
          }
          placeholder={'Ex: 25'}
        />
        <Button
          {...{onPress}}
          disabled={isNotValid}
          styleContainer={styles.createButton}
          title={type === 'create' ? 'Create' : 'Update'}
          styleText={styles.createText}
        />
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  photoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  createButton: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 30,
    marginBottom: 30,
  },
});
