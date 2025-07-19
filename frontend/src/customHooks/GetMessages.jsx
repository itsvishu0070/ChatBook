import axios from "axios"
import { useEffect } from "react"
import { serverURL } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers, setUserData } from "../redux/user.slice"
import { setMessages } from "../redux/messages.slice"

const useGetMessages=()=>{
    let dispatch=useDispatch();
    let {userData,selectedUser}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchMessages=async ()=>{
            if (!selectedUser?._id) return; 
            try {
                let result=await axios.get(`${serverURL}/api/message/get/${selectedUser._id}`,{withCredentials:true})
                dispatch(setMessages(result.data))
            } catch (error) {
               console.log(error)
            }
        }
            fetchMessages();
        },[selectedUser?._id,dispatch])
}

export default useGetMessages;

