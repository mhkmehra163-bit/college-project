import { useForm } from 'react-hook-form';
import './DeleteUser.css'
import axios from 'axios'
import { API_BASE_URL } from '../../api';

    const DeleteUser=()=>{
      const{register,handleSubmit}=useForm()

      function deleteUser(data) {
        try{
          axios.delete(`${API_BASE_URL}/userapi/delete-user/${data.username}`)
          .then(res=>{
              if(res.status ===200)
                alert("User Deleted !!")
              else if(res.status ===201)
                alert("User Not Found !!")


          })

        }
        catch(error)
        {
          console.log("error")
        }

       
      }

    return (
      <>
              <div className='container'>
            <h1 className="heading">Delete User</h1>

      <form action="" onSubmit={handleSubmit(deleteUser)} className="form" >
          <input type="text" placeholder='Username' {...register("username")} className="input" />
          <input type='submit' value='Delete' className="login-button"/>
      </form>
      </div>
  </>
    );
};

export default DeleteUser;
