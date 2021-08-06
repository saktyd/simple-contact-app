import {combineReducers} from 'redux';

const initialState = {
  contacts: [],
  isLoadingGetContacts: false,
  errorGetContacts: false,
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CONTACTS_BEGIN': {
      return {
        ...state,
        isLoadingGetContacts: true,
        errorGetContacts: false,
        contacts: [],
      };
    }

    case 'FETCH_CONTACTS_SUCCESS': {
      return {
        ...state,
        isLoadingGetContacts: false,
        contacts: action.payload.data,
      };
    }

    case 'FETCH_CONTACTS_ERROR': {
      return {
        ...state,
        isLoadingGetContacts: false,
        errorGetContacts: action.payload.error,
      };
    }

    default: {
      return state;
    }
  }
};

export default combineReducers({
  contact: contactReducer,
});
