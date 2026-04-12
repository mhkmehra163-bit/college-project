import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import Header from '../Header/Header';

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onLoginFormSubmit = (userCredentialsObject) => {
    fetch(`http://localhost:4000/users/${userCredentialsObject.username}`, {
      method: "GET" 
    })
    .then((res) => {
      if (!res.ok) {
        alert("Unable to fetch User Data, try again later!");
      }
      return res.json();
    })
    .then((userObjArray) => {
      if (userObjArray.payload === undefined) {
        alert("User not found");
      } else {
        const { password, role } = userObjArray.payload;

        if (password === userCredentialsObject.password) {
          if (userCredentialsObject.role === 'admin' && role === 'admin') {
            navigate(`/AdminHome/${userCredentialsObject.username}`, { state: userObjArray.payload });
          } else if (userCredentialsObject.role === 'staff' && role === 'staff') {
            navigate(`/StaffHome/${userCredentialsObject.username}`, { state: userObjArray.payload });
          } else {
            alert('Invalid Role!!');
          }
        } else {
          alert("Wrong Password");
        }
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <div>
      <Header/>
    <div className='forms'>
      <h1 className="">User Login form</h1>
      <form
        action=""
        className=""
        onSubmit={handleSubmit(onLoginFormSubmit)}
      >
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
        {/* username */}
        <div className="">
          <label htmlFor="username" className="form-label">
            Username <br />
          </label>
          <input
            type="text"
            {...register("username")}
            id="username"
            className="form-control mb-4"
          />
        </div>
        <br />
        {/* password */}
        <div className="">
          <label htmlFor="password" className="form-label">
            Password <br />
          </label>
          <input
            type="password"
            {...register("password")}
            id="password"
            className="form-control mb-4"
          />
        </div>
        <button
          type="submit"
          className="btn btn-info text-secondary d-block "
        >
          Login
        </button>
      </form>
    </div></div>
  );
}

export default Login;
