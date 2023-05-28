import { db } from "./firebase.config";

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    getCountFromServer
} from "firebase/firestore";


//users

export const getAllUsers = async () => {
    // console.log('getAllUsers Called');
    const coll = collection(db, 'users');
    const querySnapshot = await getDocs(coll);

    const users = querySnapshot.docs.map((doc) => doc.data());
    return users;
};

export const addUser = async () => {

}

//surveys

export const getAllSurveys = async () => {
    const coll = collection(db, 'surveys');
    const querySnapshot = await getDocs(coll);

    const surveys = querySnapshot.docs.map((doc) => {
        const surveyData= doc.data()
        const surveyId= doc.id
        return {id: surveyId, ...surveyData}
    });
    return surveys;
}

export const getSingleSurvey = async () => {

}

export const createSurvey = async (newSurvey) => {
    const coll = collection(db, 'surveys');
    return await addDoc(coll, newSurvey);
}

export const deleteSurvey = async () => {

}

//questions

export const getAllQuestions = async () => {
    const coll = collection(db, 'questions');
    const querySnapshot = await getDocs(coll);

    const questions = querySnapshot.docs.map((doc) => {
        const questionData = doc.data();
        const questionId = doc.id;
        return { id: questionId, ...questionData };
    })
    return questions;
}

export const getSingleQuestion = async () => {

}

export const createQuestion = async () => {

}

export const deleteQuestion = async () => {

}