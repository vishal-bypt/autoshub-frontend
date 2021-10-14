import React from 'react';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';

function NotFound({match}) {
  const { path } = match;
  
    return (
    //   <div>
    //   <h1>404 - Not Found!</h1>
    //   <Link to="/">
    //     Go Home
    //   </Link>
    // </div>
    <div className="web-form">
    <div className="tile-div">
        <div >
            <h1 className="profile-text" style={{textAlign:"center"}}>404 Page NotFound</h1>
           
            <img src={`http://52.42.196.59:4000/ReactImages/notFound.png`} width="400px" height="400px"/>
            <div style={{display:"flex",justifyContent:"center"}}>

           <Link className="del-button mt-3" to={`/`}><HomeIcon/>&nbsp;Back To Home</Link>
            </div>
        </div>

    </div>
</div>
    );
}

export { NotFound }; 