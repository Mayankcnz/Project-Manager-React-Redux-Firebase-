const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
admin.firestore().settings({ timestampsInSnapshots: true });

function createNotification (notification) {
  return admin.firestore().collection('notifications').add(notification).then((doc)=> {
      console.log('notification added', doc);
      
  })
}

exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate((snap, context) => {

    const projectId = context.params.projectId;

    const project = snap.data();
    const notification = {
      content: 'Added a new project',
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp(),
      projectId
    }

    return createNotification(notification);

});


/** exports.newUserJoin = functions.firestore.document('users/{userID}').onCreate((snap, context) => {
  const user = snap.data();
  const displayName = `${user.firstName} ${user.lastName}`;   
   
  const notification = {
      content: 'New user join our project',
      user: displayName ,
      time: admin.firestore.FieldValue.serverTimestamp()
  }
  return createNotification(notification)
});**/