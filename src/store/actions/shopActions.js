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

export const updateShop = (shop, uid) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    let { name, city, address } = shop;
    firestore.collection('shops').doc(uid).set({
      //...shop, 
      name: name,
      city: 'newCity3',
      address: address,  
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

export const deleteShop = (id) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('shops').doc(id).delete()
    .then(() => {
      dispatch({ type: 'DELETE_SHOP_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'DELETE_SHOP_ERROR' }, err);
    });
  }
};