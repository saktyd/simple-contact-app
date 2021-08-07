import React from 'react';

export const navigationRef = React.createRef();

export const goBack = () => {
  if (navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.goBack();
  }
};
