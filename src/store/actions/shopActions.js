export const addShop2 = (shop) => {
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

export const addShop = (shop) => {
  return (dispatch) => {
      dispatch({ type: 'ADD_SHOP_SUCCESS', data: shop });
  }
};

export const getShops = () => {
  return (dispatch, getState) => {
    const shops = getState().firestore.ordered.shops;
    console.log('getState ', getState());
    console.log('getSateFirestore.data.shops ', shops);
    //firestore.collection('shops').add({})
    //.then(() => {
      dispatch({ type: 'GET_SHOPS_SUCCESS', data: shops });
    //});
  }
};

export const updateShopName = (shopName, shopId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('shops').doc(shopId).update({
      name: shopName  
    }).then(() => {
      dispatch({ type: 'UPDATE_SHOP_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'UPDATE_SHOP_ERROR' }, err);
    });
  }
};

export const updateShopCity = (shopCity, shopId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('shops').doc(shopId).update({
      city: shopCity
    }).then(() => {
      dispatch({ type: 'UPDATE_SHOP_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'UPDATE_SHOP_ERROR' }, err);
    });
  }
};

export const updateShopAddress = (shopAddress, shopId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('shops').doc(shopId).update({
      address: shopAddress
    }).then(() => {
      dispatch({ type: 'UPDATE_SHOP_SUCCESS',  });
    }).catch(err => {
      dispatch({ type: 'UPDATE_SHOP_ERROR' }, err);
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