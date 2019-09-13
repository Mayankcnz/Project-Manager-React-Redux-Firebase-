export const getAllTasks = () =>{

        return(dispatch, getState, {getFirestore}) =>{
    
            const arr = []
            const firestore = getFirestore();
            firestore.collection("projects").doc("tFLcawA0NnuAxpXMZ5BH").collection("tasks").get()
                 .then(function(querySnapshot) {
                  querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                const info = doc.data();
                const data = {
                    id: doc.id,
                    heading: info.heading,
                    tasks: info.tasks
                }
                arr.push(data)
        });

        dispatch({type: 'ADD_TASK', arr});

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    }

}


export const getTasks = (id) =>{

    return (dispatch, getState, {getFirestore}) =>{

        //get tasks related to only single tasklist and its task and update redux store accordingly
        const firestore = getFirestore();

        firestore.collection('projects').doc('tFLcawA0NnuAxpXMZ5BH').collection('tasks').doc(id).get()
        .then(function(doc){
            const info = doc.data();
            console.log(info, "GINDO");
            const tasks = info.tasks;

            dispatch({type: 'UPDATE_TASKLIST', id, tasks})
        });
    }
}

export const addTaskToDatabase = (id, data) =>{

    return(dispatch, getState, {getFirestore}) =>{

        const firestore = getFirestore();

        firestore.collection('projects').doc(id).collection('tasks').add({
            heading: data.heading, 
            tasks: data.tasks
        }).then(function(docRef){

            console.log(docRef, "ref"); // i think whole problem is been solved

        }).catch(function(error) {
            console.log("Error adding document", error);
        });

    }
}

export const addTaskComponentToDatabase = (id, taskName) =>{

    return (dispatch, getState, {getFirestore}) =>{
        
        const firestore = getFirestore();
       var updateTo =  firestore.collection('projects').doc('tFLcawA0NnuAxpXMZ5BH').collection('tasks').doc(id);
        updateTo.update({
            tasks: firestore.FieldValue.arrayUnion(taskName)
        }).catch(function(error){
            console.log("Error adding task component to tasklist", error);
        });
    }
}

export const deleteTaskFromDatabase = (id) =>{

    return (dispatch, getState, {getFirestore}) =>{
        const firestore = getFirestore();

        firestore.collection("projects").doc('tFLcawA0NnuAxpXMZ5BH').collection('tasks').doc(id).delete().then(function() {
            console.log("Document successfully deleted!");
            dispatch({type: 'DELETE_TASK', id});
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
    }
}

export const deleteTaskComponentToDatabase = (id, taskName) =>{

    console.log("DELETING", taskName);
    return (dispatch, getState, {getFirestore}) =>{
        
        const firestore = getFirestore();
       var updateTo =  firestore.collection('projects').doc('tFLcawA0NnuAxpXMZ5BH').collection('tasks').doc(id);
        updateTo.update({'tasks' : firestore.FieldValue.arrayRemove(taskName)})
        .then(() =>{
           // dispatch({type: 'DELETE_FROM_TASK', id, taskName});
        }).catch(function(error){
            console.log("Error removing task component from the List", error);
        });
        
}
}

