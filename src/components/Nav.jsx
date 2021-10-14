import React, { useState, useEffect } from 'react';
import { NavLink, Route, Link  } from 'react-router-dom';

import { Role } from '@/_helpers';
import { accountService } from '@/_services';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import WidgetsIcon from '@material-ui/icons/Widgets';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { fetchWrapper, history } from '@/_helpers';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';

function Nav() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const subscription = accountService.user.subscribe(x => setUser(x));
        return subscription.unsubscribe;
    }, []);

    // only show nav when logged in
    if (!user) return null;

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
            <a className="navbar-brand" target="_blank" href="https://www.techmahindra.com/en-in/business-process-services/"><img src="http://52.42.196.59:4000/ReactImages/logo.png"/></a>
                {/* <a className="navbar-brand" target="_blank" href="https://www.techmahindra.com/en-in/business-process-services/"><img style={{height:"60px",width:"auto"}}src="http://52.42.196.59:4000/ReactImages/autoshubLogo2.png"/></a> */}
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                    data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                            <div className="arrow-icon-div"><HomeIcon/></div>
                        </li>
                        <li className="nav-item">
                            <Link to="/rfp/all-entries" className="nav-link">RFP</Link>
                            <div className="arrow-icon-div"><RecordVoiceOverIcon/></div>
                        </li>
                        <li className="nav-item">
                            <Link to="/training" className="nav-link">Training</Link>
                            <div className="arrow-icon-div"><MenuBookIcon/></div>
                        </li>
                        <li className="nav-item">
                            <Link to="/revenue" className="nav-link">Revenue</Link>
                            <div className="arrow-icon-div"><MenuBookIcon/></div>
                        </li>
                        {/* <li className="nav-item">
                            <div className="dropdown">
                                <a className="nav-link"  type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Modules
                                
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                {/* <NavLink to="/rfp/all-entries" className="dropdown-item">RFP</NavLink> */}
                                  {/* <a className="dropdown-item"  href="javascript:void" onClick={()=>{history.push('/rfp/all-entries')}}  >RFP</a>
                                  <a className="dropdown-item"   href="javascript:void" onClick={()=>{history.push('/training')}} >Training</a>
                                 
                                  </div>
                                </a>
                              </div>
                          
                            <div className="arrow-icon-div"><WidgetsIcon/></div>
                        </li> */}
                       
                        <li className="nav-item">
                            <Link to="/profile" className="nav-link">Profile</Link>
                            <div className="arrow-icon-div"><RecentActorsIcon/></div>
                        </li>
                        {user.role === Role.Admin && <li className="nav-item">
                            <Link to="/admin" className="nav-link">Admin</Link>
                            <div className="arrow-icon-div"><PersonIcon/></div>
                        </li>}
                        <li className="nav-item">
                            <Link className="nav-link" to="#" onClick={accountService.logout} >Logout</Link>
                            <div className="arrow-icon-div mt-1" ><ExitToAppIcon style={{marginTop:"-10px"}}/></div>
                        </li>
                
                        </ul>
                  
                      
                </div>
            </div>
            {/* <Route path="/admin" component={AdminNav} /> */}
        </nav>
            {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
                <div className="navbar-nav">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item"><NavLink exact to="/" className="nav-item nav-link">Home</NavLink></li>
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                         Modules
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown" >
                        <NavLink to="/rfp" className="dropdown-item">RFP</NavLink>
                        <NavLink to="/training" className="dropdown-item">Training</NavLink>
                        </div>
                    </li>
                    <li><NavLink to="/profile" className="nav-item nav-link">Profile</NavLink></li>
                    {user.role === Role.Admin && <li>
                        <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink>
                    </li> }
                    </ul> 

                    
                    
                    
                    <a onClick={accountService.logout} className="nav-item nav-link">Logout</a>
                </div>
            </nav> */}
            {/* <nav className="navbar navbar-expand-lg py-3 navbar-dark bg-dark shadow-sm">
          <div className="container">
            <a href="#" className="navbar-brand">
              
              <img src="https://files.techmahindra.com/static/img/logo.png" alt=""
                className="d-inline-block align-middle mr-2"/>
              
            </a>

            <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
              className="navbar-toggler"><span className="navbar-toggler-icon"></span></button>

            <div id="navbarSupportedContent" className="collapse navbar-collapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active"><NavLink exact to="/" className="nav-item nav-link">Home</NavLink></li>
                <li className="nav-item dropdown"><a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                    role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Modules</a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <NavLink to="/rfp/all-entries" className="dropdown-item">RFP</NavLink>
                      <NavLink to="/training" className="dropdown-item">Training</NavLink>
                   </div>
                </li>
                <li className="nav-item"><NavLink to="/profile" className="nav-item nav-link">Profile</NavLink></li>
                {user.role === Role.Admin && <li className="nav-item">
                        <NavLink to="/admin" className="nav-item nav-link">Admin</NavLink>
                    </li> }
                <li className="nav-item">
                    <a onClick={accountService.logout} className="nav-item nav-link">Logout</a>
                </li>    
              </ul>
              
            </div>
          </div>
        </nav>
            <Route path="/admin" component={AdminNav} />
        </div> 
        */}
        </>
    );
}

function AdminNav({ match }) {
    const { path } = match;

    return (
        <nav className="admin-nav navbar navbar-expand navbar-light">
            <div className="navbar-nav">
                <NavLink to={`${path}/users`} className="nav-item nav-link">Users</NavLink>
            </div>
        </nav>
    );
}

export { Nav }; 