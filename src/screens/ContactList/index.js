import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchContacts} from '../../config/redux/actions';
import {LoadingContainer, CardContact, Button} from '../../components';
import {boxShadowDefault, colors} from '../../styles';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

export default ({navigation}) => {
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const contacts = useSelector(({contact}) => contact.contacts);
  const isLoading = useSelector(({contact}) => contact.isLoadingGetContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onPessCreate = () => {
    navigation.push('UpdateContact', {
      type: 'create',
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      {isLoading ? (
        <LoadingContainer />
      ) : (
        <FlatList
          data={contacts}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlistContainer}
          renderItem={({item}) => <CardContact {...{item}} />}
          refreshControl={
            <RefreshControl
              refreshing={false}
              colors={[colors.purple]}
              onRefresh={() => dispatch(fetchContacts())}
            />
          }
          ItemSeparatorComponent={() => <View style={{height: 8}} />}
        />
      )}
      <Button
        onPress={onPessCreate}
        styleContainer={styles.createButton(insets.bottom)}
        title={'Create new contact'}
        styleText={styles.createText}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flatlistContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  createButton: insetsBottom => ({
    paddingVertical: 10,
    paddingHorizontal: 15,
    ...boxShadowDefault,
    borderRadius: 20,
    position: 'absolute',
    bottom: insetsBottom + 30,
    right: 20,
    backgroundColor: colors.pink,
  }),
  createText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
