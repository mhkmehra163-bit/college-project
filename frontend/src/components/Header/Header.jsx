import './Header.css'
import  vnr_log from  '../assets/VNRVJIETLogo - Copy.png'

const Header = () => {
    return (
        <div className="header">
            
            <img className='vnr-logo' src={vnr_log} alt="" />
        <h2 className='vnr'>VNR VJIET - Circular Repository</h2>
        </div>
    );
};

export default Header;
