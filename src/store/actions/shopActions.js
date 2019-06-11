export const addShop = (shop) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('shops').add({
      ...shop,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'ADD_SHOP_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'ADD_SHOP_ERROR' }, err);
    });
  }
};