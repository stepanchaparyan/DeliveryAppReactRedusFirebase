const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = ((notification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then(doc => console.log('notification added', doc));
});

exports.shopCreated = functions.firestore
  .document('shops/{shopId}')
  .onCreate(doc => {
    const shop = doc.data();
    const notification = {
      content: `added a new shop`,
      shop: `${shop.name}`,
      user: `${shop.authorFirstName} ${shop.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification);
});

exports.userJoined = functions.auth.user()
  .onCreate(user => {    
    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {
        const newUser = doc.data();
        const notification = {
          content: 'joined or team',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        };
        return createNotification(notification);
      });
});

exports.shopDeleted = functions.firestore
  .document('shops/{shopId}')
  .onDelete(doc => {
    const shop = doc.data();
    const notification = {
      content: `deleted a shop`,
      shop: `${shop.name}`,
      user: `${shop.authorFirstName} ${shop.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification);
});