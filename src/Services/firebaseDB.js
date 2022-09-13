import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";
import {collection, query, where, addDoc, getDocs, orderBy} from "firebase/firestore";
import {getAnalytics} from "firebase/analytics";
import {async} from "@firebase/util";

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

const collectionToArray = (collection) => {
    const array = [];
    collection.forEach((doc) => {
        console.log(doc.id)
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