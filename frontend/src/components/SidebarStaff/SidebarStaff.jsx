import {useState} from 'react';
import LatestUpdates from '../LatestUpdates/LatestUpdates';
import './SidebarStaff.css'
import SearchStaff from '../SearchStaff/SearchStaff';
import PropTypes from 'prop-types';


const SidebarStaff = ({state}) => {

    const [showSearch, setShowSearch] = useState(false);
    const [showLatest, setShowLatest] = useState(true);
    return (
        <>
    
            <div className="sidebar-container">
            <div className='side-buttons'>
            <p className="cta" onClick={() => { setShowSearch(true); setShowLatest(false); }}>
            <span className="hover-underline-animation2">  Search </span>
         </p>
      <p className="cta" onClick={() => { setShowLatest(true); setShowSearch(false); }}>
         <span className="hover-underline-animation2">  Latest </span>
           </p>
           <div className="sider-bottom">
            <p className='side-state' >Name : {state.name}</p>
            <p className='side-state' >Role : {state.role}</p>
          </div>
        <div className="side-render" >
        {showSearch && <SearchStaff />}
      {showLatest && <LatestUpdates />} 
      </div>
            </div>
            </div>
        </>
    );
};

SidebarStaff.propTypes = {
  state: PropTypes.shape({
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }).isRequired,
};

export default SidebarStaff;
