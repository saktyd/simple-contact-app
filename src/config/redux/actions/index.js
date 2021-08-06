import axios from 'axios';

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

// Fetch Contacts Actions
