export const addProduct = (product) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('products').add({
      ...product,
      authorFirstName: profile.firstName,
      authorLastName: profile.lastName,
      authorId: authorId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'ADD_PRODUCT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'ADD_PRODUCT_ERROR' }, err);
    });
  }
};

export const updateProductName = (productName, productId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('products').doc(productId).update({
      name: productName  
    }).then(() => {
      dispatch({ type: 'UPDATE_PRODUCT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'UPDATE_PRODUCT_ERROR' }, err);
    });
  }
};

export const updateProductPrice = (productPrice, productId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('products').doc(productId).update({
      price: productPrice
    }).then(() => {
      dispatch({ type: 'UPDATE_PRODUCT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'UPDATE_PRODUCT_ERROR' }, err);
    });
  }
};

export const updateProductQuantity = (productQuantity, productId) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('products').doc(productId).update({
      quantity: productQuantity  
    }).then(() => {
      dispatch({ type: 'UPDATE_PRODUCT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'UPDATE_PRODUCT_ERROR' }, err);
    });
  }
};

export const deleteProduct = (id) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection('products').doc(id).delete()
    .then(() => {
      dispatch({ type: 'DELETE_PRODUCT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'DELETE_PRODUCT_ERROR' }, err);
    });
  }
};