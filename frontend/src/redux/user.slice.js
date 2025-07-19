import { createSlice } from "@reduxjs/toolkit"; // ye slice create karte hai 

 const userSlice = createSlice({    // sabse pahle slice create krenge 
    name:"user",                   // ab name set krenge 
    initialState:{                 //ab usko initialise kreneg with this initialState
        userData:null,             //userData ka initial state abhi kya hai null hai
        otherUsers:null,         // proffileDatat ka v initial state abhi kya hai null hai
        selectedUser:null, // selected user ka v initial state null hai
        socket:null,
        onlineUsers:null,
        searchData:null,
        unreadMessages:{}
     
     
      }, //setUserData("nitin")
    reducers:{                // reducer kya hai ek type ka particular function hai jo data ko change krega 
       setUserData:(state,action)=>{   //ye data set krega iske andar do chize hoti hai ek state dusra action state se initial state ko access kar sakte hai
            state.userData=action.payload     //ab hme state me jo userData hai usme koi data change karna mtlb kuchh action perform karna hai to usko action ke through karte hai ab action ke andar rahta hai ek payload 
       },                                //ab jab v hme data set karna rhega jaise setUserData("nitin") ab ye jo nitin hai ye hume kaha milega action ke anadr payload me milega
       setOtherUsers:(state,action)=>{
         state.otherUsers=action.payload
       },
       setSelectedUser:(state,action)=>{
         state.selectedUser=action.payload
       },
       setSocket:(state,action)=>{
         state.socket=action.payload
       },
       setOnlineUsers:(state,action)=>{
         state.onlineUsers=action.payload
       },
        setSearchData:(state,action)=>{
          state.searchData=action.payload
        },
         incrementUnread: (state, action) => {
    const userId = action.payload;
    state.unreadMessages[userId] = (state.unreadMessages[userId] || 0) + 1;
  },
  clearUnread: (state, action) => {
    const userId = action.payload;
    delete state.unreadMessages[userId];
  },
    }
    

 })

 export const {setUserData,setOtherUsers,setSelectedUser,setSocket,setOnlineUsers,setSearchData,incrementUnread, clearUnread}=userSlice.actions
 export default userSlice.reducer

 