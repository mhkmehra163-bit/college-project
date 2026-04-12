import { useForm } from 'react-hook-form';
import './AddUser.css'
import axios from 'axios';
const AddUser = () => {

    let { register, handleSubmit } = useForm();
  

  function onRegisterFormSubmit(userCrdentialsObject) {
    if (!userCrdentialsObject.password) {
      alert("Password cannot be empty!");
    } else if (userCrdentialsObject.password.length < 8) {
      alert("Password should be at least 8 characters long!");
    } else {
    
    
       axios.post('http://localhost:4001/userapi/new-user',userCrdentialsObject,{
          headers: {
              'Content-Type': "application/json"
          }
      })
      .then(res=>{
        if(res.status===200)
          alert("User already exists")
        else if(res.status === 201)
          alert("New User created")
      })
 } 
  }
    return (
        <div className='container'>
      <h1 className="heading ">User Register form</h1>
      <form
        action=""
        className="form"
        onSubmit={handleSubmit(onRegisterFormSubmit)}
      >
        
        {/* username */}
          
          <input placeholder='Username'
           className="input"
            type="text"
            {...register("username")}
            id="username"
          />
        {/* name */}
             <input
          className="input" placeholder='Name'
            type="text"
            {...register("name")}
            id="name"
          />

        {/* password */}
        
          <input
            type="password" placeholder='Password'
            {...register("password")}
            id="password"
            className="input"          />
        
      <div className='radio-container'>
       <div className='admin-radio'>
       <p>Admin</p>
        <input
          type="radio"
          value="admin"
          {...register("role")}
        />
       </div>

       <div className='staff-radio'>
       <p>Staff</p>
         <input
          type="radio"
          value="staff"
          {...register("role")}
        />
       </div>
       </div>

        <br />
        
        <button
          type="submit"
          className="login-button"
        >
          Register
        </button>
      </form>
    </div>
  );
    
};

export default AddUser;
