import { db } from "./firebase.config";

import {
    collection,
    getDocs,
    writeBatch,
    getDoc,
    addDoc,
    deleteDoc,
    doc,
    setDoc,
    getCountFromServer,
    serverTimestamp
} from "firebase/firestore";

import {
    getAuth,
    createUserWithEmailAndPassword
} from 'firebase/auth'


//users

export const getAllUsers = async () => {
    const coll = collection(db, 'users');
    const querySnapshot = await getDocs(coll);

    const users = querySnapshot.docs.map((doc) => doc.data());
    return users;
};

export const getUser = async (id) => {
    const coll = doc(db, "users", id);
    return (await getDoc(coll)).data();
}

export const addUser = async (userData) => {
    try {
        const auth = getAuth()
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            userData.email,
            userData.password
        )
        const user = userCredential.user
        const created_at = await serverTimestamp()

        const data = { name: userData.name, email: userData.email, role: userData.role, created_at }

        await setDoc(doc(db, 'users', user.uid), data)
        return data
    } catch (error) {
        console.log(error);
        alert('User Creation Failed')
    }

}

//surveys

export const getAllSurveys = async () => {
    const coll = collection(db, 'surveys');
    const querySnapshot = await getDocs(coll);

    const surveys = querySnapshot.docs.map((doc) => {
        const surveyData = doc.data()
        const surveyId = doc.id
        return { id: surveyId, ...surveyData }
    });
    return surveys;
}

export const getSingleSurvey = async () => {

}

export const createSurvey = async (newSurvey) => {
    const coll = collection(db, 'surveys');
    return await addDoc(coll, newSurvey);
}

export const deleteSurvey = async (id) => {
    const coll = doc(db, "surveys", id);
    return await deleteDoc(coll);
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

export const createQuestions = async (data) => {
    try {
        const coll = collection(db, 'questions')
        const batch = writeBatch(db)
        const createdQuestionRefs = []
        for (const question of data) {
            const docRef = doc(coll)
            batch.set(docRef, question)
            createdQuestionRefs.push(docRef)
        }
        await batch.commit()

        return true
    }catch(error){
        console.log(error)
        return false
    }
}

export const deleteQuestion = async () => {

}

//Evaluations
export const getEvaluationsNumber = async () => {
    const coll = collection(db, 'evaluations');
    const querySnapshot = await getDocs(coll);

    const evaluations = querySnapshot.docs.map((doc) => {
        const evaluationData = doc.data()
        const date = new Date(evaluationData.created_at.seconds * 1000);
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const evaluationId = doc.id
        return { id: evaluationId, ...evaluationData, month,year }
    });
    return evaluations;
}
