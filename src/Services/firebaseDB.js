import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";
import { async } from "@firebase/util";

class FirebaseDB
 {
    constructor(){
        const firebaseConfig = {
            apiKey: "AIzaSyB4-TC4SCvgL5Z3bt2Tzr1vQR8vWiCcVXw",
            authDomain: "diabetes-ce8b9.firebaseapp.com",
            projectId: "diabetes-ce8b9",
            storageBucket: "diabetes-ce8b9.appspot.com",
            messagingSenderId: "1053913805012",
            appId: "1:1053913805012:web:369fea326a4b1f45b18b41",
            measurementId: "G-GKX4GKGXC5"
          };
          
          
          this.db = getFirestore(initializeApp(firebaseConfig));
          // this.analytics = getAnalytics(app);
    }

    async postData(collectionName, data) {
        data.timestamp =  Date.parse(data.date+"T"+data.time);
        const date = data.date;
        data.date = date.split('-').reverse().join('-');
        data.type = collectionName;
        console.log(data)
        try {
          const docRef = await addDoc(collection(this.db, collectionName), data);
          await this.getData(collectionName)
        } catch (e) {
          console.error("Error adding document: ", e);
        }
    }

    async getData(collectionName) {
        const data = await getDocs(collection(this.db, collectionName));
        const dataArray = this.collectionToArray(data);
        // console.log(dataArray)
        return dataArray
    }

    collectionToArray(collection) {
        const array = [];
        collection.forEach((doc)=> {
            array.push(doc.data());
        })
        array.sort(function(a, b) {
            var keyA = new Date(a.timestamp),
              keyB = new Date(b.timestamp);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
          });
        
        return array;
    }
}

const db = new FirebaseDB();
export default db;