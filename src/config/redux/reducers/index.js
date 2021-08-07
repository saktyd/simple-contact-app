import {combineReducers} from 'redux';

const initialState = {
  contacts: [],
  isLoadingGetContacts: false,
  errorGetContacts: false,
  createdContact: null,
  isLoadingCreate: false,
  errorCreate: false,
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

    case 'CREATE_CONTACT_BEGIN': {
      return {
        ...state,
        isLoadingCreate: true,
        errorCreate: false,
        createdContact: null,
      };
    }

    case 'CREATE_CONTACT_SUCCESS': {
      return {
        ...state,
        isLoadingCreate: false,
        createdContact: action.payload.data,
      };
    }

    case 'CREATE_CONTACT_ERROR': {
      const {message, validation} = action.payload.error;

      const errorKeys = validation.keys[0];
      const errorMessage = message
        .split(`["${errorKeys}" `)[1]
        .replace(']', '');

      return {
        ...state,
        isLoadingCreate: false,
        errorCreate: {
          errorKeys,
          errorMessage,
        },
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
