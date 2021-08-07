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
      .catch(err => {
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
      .catch(err => {
        dispatch(createContactError(err.response?.data));
      });
  };
};

// Fetch Contacts Detail Actions
export const fetchContactDetailSuccess = data => {
  return {
    type: 'FETCH_CONTACT_DETAIL_SUCCESS',
    payload: {
      data: data,
    },
  };
};

export const fetchContactDetail = value => {
  return dispatch => {
    dispatch(fetchContactDetailSuccess(value));
  };
};

// Edit Contact Actions
export const editContactBegin = () => ({
  type: 'EDIT_CONTACT_BEGIN',
});

export const editContactSuccess = data => {
  return {
    type: 'EDIT_CONTACT_SUCCESS',
    payload: {
      data: data,
    },
  };
};

export const editContactError = error => ({
  type: 'EDIT_CONTACT_ERROR',
  payload: {
    error: error,
  },
});

export const editContact = (payload, id) => {
  return async dispatch => {
    dispatch(editContactBegin());
    await request
      .put(`contact/${id}`, payload)
      .then(res => {
        dispatch(editContactSuccess(res.data));
        dispatch(fetchContactDetail(res.data.data));
        dispatch(fetchContacts());
        RootNavigation.goBack();
      })
      .catch(err => {
        dispatch(editContactError(err.response?.data));
      });
  };
};

// Delete Contact Actions
export const deleteContactBegin = () => ({
  type: 'DELETE_CONTACT_BEGIN',
});

export const deleteContactSuccess = data => {
  return {
    type: 'DELETE_CONTACT_SUCCESS',
    payload: {
      data: data,
    },
  };
};

export const deleteContactError = error => ({
  type: 'DELETE_CONTACT_ERROR',
  payload: {
    error: error,
  },
});

export const deleteContact = id => {
  return async dispatch => {
    dispatch(deleteContactBegin());
    await request
      .delete(`contact/${id}`)
      .then(res => {
        dispatch(deleteContactSuccess(res.data));
        dispatch(fetchContacts());
        RootNavigation.goBack();
      })
      .catch(err => {
        dispatch(deleteContactError(err.response?.data));
      });
  };
};
