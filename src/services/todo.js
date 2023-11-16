/* eslint-disable prettier/prettier */
import firestore from '@react-native-firebase/firestore';
const collectionName = 'todo';
// Create operation
const createTodo = async data => {
  try {
    const docRef = await firestore().collection(collectionName).add(data);
    return `Success Add Data (ID ${docRef.id})`;
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};

// Read operation
const getTodo = async () => {
  try {
    const snapshot = await firestore().collection(collectionName).get();
    console.log('Data', snapshot.docs);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error getting todo:', error);
    throw error;
  }
};

// Update operation
const updateTodo = async (data) => {
  try {
    let docId = data.id;
    let params = {
      title: data.title,
      description: data.description,
      location: data.location,
      date: data.date,
      dateEnd : data.dateEnd,
    };
    console.log('Params Service', params);
    await firestore()
      .collection(collectionName)
      .doc(docId)
      .update(params);
    console.log('Todo successfully updated!');
    return 'Success update data';
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
};

  // Delete operation
const deleteTodo = async docId => {
  try {
    await firestore().collection(collectionName).doc(docId).delete();
    console.log('Todo successfully deleted!');
    return 'Success delete data';
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

const TodoServices = {createTodo, getTodo, updateTodo, deleteTodo};

export default TodoServices;
