import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";
import {collection, query, where, addDoc, getDocs, orderBy, deleteDoc, doc } from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";
import {async} from "@firebase/util";
import moment from 'moment';
import { createAsyncThunk } from '@reduxjs/toolkit'

const firebaseConfig = {
    apiKey: "AIzaSyB4-TC4SCvgL5Z3bt2Tzr1vQR8vWiCcVXw",
    authDomain: "diabetes-ce8b9.firebaseapp.com",
    projectId: "diabetes-ce8b9",
    storageBucket: "diabetes-ce8b9.appspot.com",
    messagingSenderId: "1053913805012",
    appId: "1:1053913805012:web:369fea326a4b1f45b18b41",
    measurementId: "G-GKX4GKGXC5"
};

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

export const postData  = async (collectionName, data, user) => {
    data.timestamp = Date.parse(data.date + "T" + data.time);
    const date = data.date;
    data.date = date
        .split('-')
        .reverse()
        .join('-');
    data.type = collectionName;
    data.user = user;
    try {
        const docRef = await addDoc(collection(db, collectionName), data);
        await getData(collectionName, user);
        // await onSuccess();
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
        // await onFailed()
    }
}
export const getData = async (collectionName, user) => {
    const q = query(collection(db, collectionName), where("user", "==", user),orderBy("timestamp"));
    // const querySnapshot = await getDocs(q);
    try {
        const data = await getDocs(q);
        const dataArray = collectionToArray(data);
        const arrayByDate = sortByDate(dataArray)
        return arrayByDate
    } catch (e) {
        console.log(e)
    }

}
export const deleteDocument = async (collection, docId) => {
    try {
        await deleteDoc(doc(db, collection, docId));
    } catch (e) {
        console.error(e);
    }
   
}
export const sortCombined = (meals, tests) => {
    const combined = {};
    Object
        .keys(meals)
        .map((key) => {
            if (combined.hasOwnProperty(key)) {
                combined[key] = [
                    ...combined[key],
                    ...meals[key]
                ];
            } else {
                combined[key] = meals[key];
            }
        })
    Object
        .keys(tests)
        .map((key) => {
            if (combined.hasOwnProperty(key)) {
                combined[key] = [
                    ...combined[key],
                    ...tests[key]
                ];
            } else {
                combined[key] = tests[key];
            }
        });

    const orderedDates = {};
    Object
        .keys(combined)
        .sort(function (a, b) {
            return moment(a, 'DD/MM/YYYY').toDate() - moment(b, 'DD/MM/YYYY').toDate();
        })
        .forEach(function (key) {
            orderedDates[key] = combined[key];
        });
    Object
        .values(orderedDates)
        .forEach((value) => {
            value
                .sort(function (a, b) {
                    var keyA = new Date(a.timestamp),
                        keyB = new Date(b.timestamp);
                    // Compare the 2 dates
                    if (keyA < keyB) 
                        return -1;
                    if (keyA > keyB) 
                        return 1;
                    return 0;
                });
        })

    return orderedDates
}
export const getAllData =  async (user) => {
    const meals = await getData('meals', user);
    const tests = await getData('tests', user);
    const combined = sortCombined(meals, tests);
    return {
        meals,
        tests,
        combined
    };
}
const collectionToArray = (collection) => {
    const array = [];
    collection.forEach((doc) => {
        // console.log(doc.id)
        const data = doc.data();
        data.id = doc.id;
        array.push(data);
    })
    // array.sort(function (a, b) {
    //     var keyA = new Date(a.timestamp),
    //         keyB = new Date(b.timestamp);
    //     // Compare the 2 dates
    //     if (keyA < keyB) 
    //         return -1;
    //     if (keyA > keyB) 
    //         return 1;
    //     return 0;
    // });

    return array;
}
const sortByDate = (dataArray) => {
    const data = {};
    dataArray.forEach((item) => {
        if (data[item.date]) {
            data[item.date].push(item)
        } else {
            data[item.date] = [];
            data[item.date].push(item)
        }
    })
    return data;
}

// export const getAllData = createAsyncThunk(
//     'data/getAll',
//     async (user) => {
//         const meals = await getData('meals', user);
//         const tests = await getData('tests', user);
//         const combined = sortCombined(meals, tests);
//         return {
//             meals,
//             tests,
//             combined
//         };
//     }
//   )

// class FirebaseDB
// {
//     constructor(user) {
//         const firebaseConfig = {
//             apiKey: "AIzaSyB4-TC4SCvgL5Z3bt2Tzr1vQR8vWiCcVXw",
//             authDomain: "diabetes-ce8b9.firebaseapp.com",
//             projectId: "diabetes-ce8b9",
//             storageBucket: "diabetes-ce8b9.appspot.com",
//             messagingSenderId: "1053913805012",
//             appId: "1:1053913805012:web:369fea326a4b1f45b18b41",
//             measurementId: "G-GKX4GKGXC5"
//         };
//         this.user = user;
//         this.db = getFirestore(initializeApp(firebaseConfig));
//         this.auth = getAuth(initializeApp(firebaseConfig));
        
//         // this.analytics = getAnalytics(app);
//     }

//     async postData(collectionName, data, user) {
//         data.timestamp = Date.parse(data.date + "T" + data.time);
//         const date = data.date;
//         data.date = date
//             .split('-')
//             .reverse()
//             .join('-');
//         data.type = collectionName;
//         data.user = user;
//         try {
//             const docRef = await addDoc(collection(this.db, collectionName), data);
//             await this.getData(collectionName, user);
//             // await onSuccess();
//             return true;
//         } catch (e) {
//             console.error("Error adding document: ", e);
//             return false;
//             // await onFailed()
//         }
//     }

//     async getData(collectionName, user) {
//         const q = query(collection(this.db, collectionName), where("user", "==", user));
//         // const querySnapshot = await getDocs(q);
//         try {
//             const data = await getDocs(q);
//             const dataArray = this.collectionToArray(data);
//             const arrayByDate = this.sortByDate(dataArray)
//             return arrayByDate
//         } catch (e) {
//             console.log(e)
//         }

//     }

//     collectionToArray(collection) {
//         const array = [];
//         collection.forEach((doc) => {
//             array.push(doc.data());
//         })
//         array.sort(function (a, b) {
//             var keyA = new Date(a.timestamp),
//                 keyB = new Date(b.timestamp);
//             // Compare the 2 dates
//             if (keyA < keyB) 
//                 return -1;
//             if (keyA > keyB) 
//                 return 1;
//             return 0;
//         });

//         return array;
//     }
//     sortByDate = (dataArray) => {
//         const data = {};
//         dataArray.forEach((item) => {
//             if (data[item.date]) {
//                 data[item.date].push(item)
//             } else {
//                 data[item.date] = [];
//                 data[item.date].push(item)
//             }
//         })
//         return data;
//     }
// }

// const db = new FirebaseDB();
// export default db;