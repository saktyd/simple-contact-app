import {combineReducers} from 'redux';

const initialState = {
  contacts: [],
  isLoadingGetContacts: false,
  errorGetContacts: false,
  createdContact: null,
  isLoadingCreate: false,
  errorCreate: false,
  contactDetail: null,
  editedContact: null,
  isLoadingEdit: false,
  errorEdit: false,
  deletedContact: null,
  isLoadingDeleteContact: false,
  errorDeleteContact: false,
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
      let errorCreate = false;
      const payload = action.payload.error;
      if (payload?.message && payload?.validation) {
        const {message, validation} = payload;

        const errorKeys = validation.keys[0];
        const errorMessage = message
          .split(`["${errorKeys}" `)[1]
          .replace(']', '');

        errorCreate = {
          errorKeys,
          errorMessage,
        };
      }

      return {
        ...state,
        isLoadingCreate: false,
        errorCreate: errorCreate,
      };
    }

    case 'FETCH_CONTACT_DETAIL_SUCCESS': {
      return {
        ...state,
        contactDetail: action.payload.data,
      };
    }

    case 'EDIT_CONTACT_BEGIN': {
      return {
        ...state,
        isLoadingEdit: true,
        errorEdit: false,
        editedContact: null,
      };
    }

    case 'EDIT_CONTACT_SUCCESS': {
      return {
        ...state,
        isLoadingEdit: false,
        editedContact: action.payload.data,
      };
    }

    case 'EDIT_CONTACT_ERROR': {
      let errorEdit = false;
      const payload = action.payload.error;
      if (payload?.message && payload?.validation) {
        const {message, validation} = payload;

        const errorKeys = validation.keys[0];
        const errorMessage = message
          .split(`["${errorKeys}" `)[1]
          .replace(']', '');

        errorEdit = {
          errorKeys,
          errorMessage,
        };
      }

      return {
        ...state,
        isLoadingEdit: false,
        errorEdit: errorEdit,
      };
    }

    case 'DELETE_CONTACT_BEGIN': {
      return {
        ...state,
        isLoadingDeleteContact: true,
        errorDeleteContact: false,
        deletedContact: null,
      };
    }

    case 'DELETE_CONTACT_SUCCESS': {
      return {
        ...state,
        isLoadingDeleteContact: false,
        deletedContact: action.payload.data,
      };
    }

    case 'DELETE_CONTACT_ERROR': {
      return {
        ...state,
        isLoadingDeleteContact: false,
        errorDeleteContact: action.payload.error,
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
