import database from '../firebase/firebase';

export const setSettings = settings => {
  return {
    type: 'SET_SETTINGS',
    settings
  };
};

export const startSetSettings = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    return database.ref(`users/${uid}/settings`).once('value', snap => {
      dispatch(setSettings(snap.val()));
    });
  };
};

export const saveSettings = settings => {
  return {
    type: 'SAVE_SETTINGS',
    settings
  };
};

export const startSaveSettings = settings => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    console.log(settings);
    return database.ref(`users/${uid}/settings`).update(settings, () => {
      dispatch(saveSettings(settings));
    });
  };
};
