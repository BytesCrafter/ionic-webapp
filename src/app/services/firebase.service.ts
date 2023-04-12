import { Injectable } from '@angular/core';

// Firebase services + environment module
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getDatabase, ref, child, get, set, onValue } from "firebase/database";
import { getStorage, ref as refStore, deleteObject } from "firebase/storage";
import { environment } from '../../environments/environment';

const fbApp = initializeApp(environment.firebase);
const fbAnalytics = getAnalytics(fbApp);
const fbDatabase = getDatabase(fbApp);
const fbStorage = getStorage(fbApp);

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() {

  }

  /**
   * @param eventName
   * @param eventLog
   */
  _logEvent(eventName: string, eventLog: any) {
    logEvent(fbAnalytics, eventName, eventLog);
  }

  /**
   * @param path
   * @param callbackRef
   */
  _loadDatabase(path: string, callbackRef: any) {
    const objRef = ref(fbDatabase);
    get(child(objRef, path)).then((snapshot) => {
      if (snapshot.exists()) {
        callbackRef(snapshot.val());
      } else {
        callbackRef(undefined);
      }
    }).catch((error) => {
      console.error(error);
      callbackRef(undefined);
    });
  }

  _listenDatabase(path: string, callbackRef: any) {
    const objRef = ref(fbDatabase, path);
    onValue(objRef, (snapshot) => {
      const data = snapshot.val();
      callbackRef(data);
    });
  }

  /**
   *
   * @param path
   * @param objData
   */
  _saveDatabase(path: string, objData: any) {
    set(ref(fbDatabase, path), objData);
  }
}
