import axios from "axios"
import { useEffect } from "react"
import { serverURL } from "../main"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/user.slice"

const useGetCurrentUser=()=>{
    let dispatch=useDispatch();
    // let {userData}=useSelector(state=>state.user)
    useEffect(()=>{
        const fetchUser=async ()=>{
            try {
                let result=await axios.get(`${serverURL}/api/user/current`,{withCredentials:true})
                dispatch(setUserData(result.data))
            } catch (error) {
               console.log(error)
            }
        }
            fetchUser();
        },[])
}

export default useGetCurrentUser;

