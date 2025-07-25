import axios from "axios"
import { useEffect } from "react"
import { serverURL } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setOtherUsers, setUserData } from "../redux/user.slice"

const useGetOtherUsers=()=>{
    let dispatch=useDispatch();
    let {userData}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser=async ()=>{
            try {
                let result=await axios.get(`${serverURL}/api/user/others`,{withCredentials:true})
                dispatch(setOtherUsers(result.data))
            } catch (error) {
               console.log(error)
            }
        }
            if (userData) {
    fetchUser(); 
  }
        },[userData])
}

export default useGetOtherUsers;

