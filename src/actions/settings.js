import database from '../firebase/firebase';

const defaultSettings = {
  currencySymbol: '',
  defaultAccount: '',
  monthStart: 1,
  newAfterSave: false
};

export const setSettings = settings => {
  settings = settings || defaultSettings;
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
    return database.ref(`users/${uid}/settings`).update(settings, () => {
      dispatch(saveSettings(settings));
    });
  };
};
