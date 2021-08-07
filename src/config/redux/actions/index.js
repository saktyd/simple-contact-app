import axios from 'axios';
import * as RootNavigation from '../../navigator/rootNavigator';

const request = axios.create({
  baseURL: 'https://simple-contact-crud.herokuapp.com',
  timeout: 10000,
});

// Fetch Contacts Actions
export const fetchContactsBegin = () => ({
  type: 'FETCH_CONTACTS_BEGIN',
});

export const fetchContactsSuccess = data => {
  return {
    type: 'FETCH_CONTACTS_SUCCESS',
    payload: {
      data: data,
    },
  };
};

export const fetchContactsError = error => ({
  type: 'FETCH_CONTACTS_ERROR',
  payload: {
    error: error,
  },
});

export const fetchContacts = () => {
  return async dispatch => {
    dispatch(fetchContactsBegin());
    await request
      .get('contact')
      .then(res => {
        dispatch(fetchContactsSuccess(res.data?.data));
      })
      .catch(async err => {
        dispatch(fetchContactsError(err.response?.data));
      });
  };
};

// Create New Contact Actions
export const createContactBegin = () => ({
  type: 'CREATE_CONTACT_BEGIN',
});

export const createContactSuccess = data => {
  return {
    type: 'CREATE_CONTACT_SUCCESS',
    payload: {
      data: data,
    },
  };
};

export const createContactError = error => ({
  type: 'CREATE_CONTACT_ERROR',
  payload: {
    error: error,
  },
});

export const createContact = payload => {
  return async dispatch => {
    dispatch(createContactBegin());
    await request
      .post('contact', payload)
      .then(res => {
        dispatch(createContactSuccess(res.data));
        dispatch(fetchContacts());
        RootNavigation.goBack();
      })
      .catch(async err => {
        dispatch(createContactError(err.response?.data));
      });
  };
};
