import {configureStore} from "@reduxjs/toolkit"  //install @reduxjs/toolkit and react-redux
import userSlice from "./user.slice.js"     //
import messageSlice from "./messages.slice.js"
export const store=configureStore({   //configureStore jo hai ek stor create karta hai 
    reducer:{  
        user:userSlice,
        message:messageSlice
    },
    middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  }
})

// ye store me har koi yha se apne man pasand ka data jo hai wo le sakta hai
// ab isko jo hai ye store jo hai usko main.jsx ke andar kya krayenge provide krayenge kyu karayenge wahai se to sbko data pahucheega
//useDispatch() hook ki madad se reducers ko access karte hai aur slice ke andar state me change karte hai
//useSelector() hook ki help se state ko access karte hai aur data get karte hai