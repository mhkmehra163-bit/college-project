import { useState } from 'react';
import './Sidebar.css';
import AddUser from '../AddUser/AddUser';
import DeleteUser from '../DeleteUser/DeleteUser';
import CircularUpload from '../CircularUpload/CircularUpload';
import Search from '../Search/Search';
import manage from '../assets/manage.png';
import delete_img from '../assets/delete.png'
import upload from '../assets/upload.png'
import PropTypes from 'prop-types';

const Sidebar = ({state}) => {
  const [showUserManage, setShowUserManage] = useState(false);
  const [showCircularUpload, setShowCircularUpload] = useState(false);
  const [showCircularDelete, setShowCircularDelete] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div>
      <div className="sidebar-container">
        <div className="side-buttons">
          <p
            className="cta"
            onClick={() => {
              setShowCircularDelete(false);
              setShowCircularUpload(false);
              setShowUserManage(true);
            }}
          >
            <div className="sider-combo">
            <img className='sider-img' src={manage} alt="" />
           <span className="hover-underline-animation"> Manage User  </span></div>
          </p>
          {showUserManage && (
            <div className="sub-sidebar">
              <p
                className="cta"
                onClick={() => {
                  setShowAdd(true);
                  setShowDelete(false);
                }}
              >
                <span className="hover-underline-animation">Register New User </span>
              </p>
              <p
                className="cta"
                onClick={() => {
                  setShowAdd(false);
                  setShowDelete(true);
                }}
              >
              <span className="hover-underline-animation">Delete Existing User</span>
              </p>
            </div>
          )}
          <p
            className="cta"
            onClick={() => {
              setShowCircularDelete(false);
              setShowCircularUpload(true);
              setShowUserManage(false);
              setShowAdd(false);
              setShowDelete(false);
            }}
          >
            <div className="sider-combo">
            <img className='sider-img'  src={upload} alt="" />
            <span className="hover-underline-animation">  Upload Circular </span></div>
          </p>
          {showCircularUpload && <div className="sub-sidebar"></div>}
          <p
            className="cta"
            onClick={() => {
              setShowCircularDelete(true);
              setShowCircularUpload(false);
              setShowUserManage(false);
              setShowAdd(false);
              setShowDelete(false);
            }}
          >
            <div className="sider-combo">
            <img className='sider-img' src={delete_img} alt="" />
          <span className="hover-underline-animation">Delete Circular </span></div>
          </p>

          <div className="sider-bottom">
            <p className='side-state' >Name : {state.name}</p>
            <p className='side-state' >Role : {state.role}</p>
          </div>
        </div>

        <div className="side-render" >
          {showAdd && <AddUser />}
          {showDelete && <DeleteUser />}
          {showCircularUpload && <CircularUpload />}
          {showCircularDelete && <Search />}
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default Sidebar;
