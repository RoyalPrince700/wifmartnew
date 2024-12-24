import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import {MdModeEdit} from "react-icons/md"
import ChangeUserRole from '../components/ChangeUserRole'

//after changing the input to either general or admin you need to make it change immideately you close the popup page so you need to call the API again

const AllUsers = () => {

    const [allUser,setAllUser] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)  //use the setOpenUpdate to set the ChangeUserRole to onclose 
    const [updateUserDetails, setUpdateUserDetails] = useState({
      email : "",
      name : "",
      role : "",
      _id : ""
    })


    const fetchAllUsers = async() => {
            const fetchData = await fetch(SummaryApi.allUser.url,{
                method : SummaryApi.allUser.method,
                credentials : 'include'
            })

            const dataResponse = await fetchData.json()

            if(dataResponse.success){
                setAllUser(dataResponse.data)
            }
            if(dataResponse.eror){
              toast.error(dataResponse.message)
            }

           
       
        }

    useEffect(()=>{
        fetchAllUsers()
    },[])

  return (
    <div className='pb-4 bg-white mt-[110px]'>
      <table className='w-full userTable'>
        <thead>
          <tr className='bg-black text-white'>
            <th>Sr.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Location</th>
          <th>Hostel</th>
          <th>Area</th>
          <th>Created Date</th>
          <th>Action</th>

          </tr>
        </thead>
        <tbody >
        {
            allUser.map((el, index) => {
                  return(
                    <tr>
                      <td>{index+1}</td>
                      <td>{el?.name}</td>
                      <td>{el?.email}</td>
                      <td>{el?.role}</td>
                      <td>{el?.location}</td>
                      <td>{el?.hostel}</td>
                      <td>{el?.area}</td>
                      <td>{moment(el?.createdAt).format('ll')}</td>
                      <td>
                        <button className='bg-red-100 p-2 rounded-full
                        cursor-pointer hover:bg-red-500 hover:text-white'
                        onClick={() => {
                          setUpdateUserDetails(el)
                          setOpenUpdateRole(true)

                        }}
                        >
                        <MdModeEdit/></button> 
                      </td>
                    
                    </tr>
                  )
            })
            }
        </tbody>
      </table>
              {
                openUpdateRole && (
                    <ChangeUserRole onClose={()=>setOpenUpdateRole(false)}
                  name={updateUserDetails.name}
                  email={updateUserDetails.email}
                  role={updateUserDetails.role}
                  userId ={updateUserDetails._id} 
                  callFunc={fetchAllUsers}  //this line is to rerun the api so the changes will reflect immediately
                  />
                )
              }

     
    </div>
  )
}

export default AllUsers