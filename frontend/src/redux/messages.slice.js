import { createSlice } from "@reduxjs/toolkit"; // ye slice create karte hai 

 const messageSlice = createSlice({    // sabse pahle slice create krenge 
    name:"message",                   // ab name set krenge 
    initialState:{                 //ab usko initialise kreneg with this initialState
       messages:[]
      }, //setUserData("nitin")
    reducers:{                // reducer kya hai ek type ka particular function hai jo data ko change krega 
       setMessages:(state,action)=>{   //ye data set krega iske andar do chize hoti hai ek state dusra action state se initial state ko access kar sakte hai
            state.messages=action.payload     //ab hme state me jo userData hai usme koi data change karna mtlb kuchh action perform karna hai to usko action ke through karte hai ab action ke andar rahta hai ek payload 
       }
    }
    

 })

 export const {setMessages}=messageSlice.actions
 export default messageSlice.reducer 

 