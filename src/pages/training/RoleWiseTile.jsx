/* eslint-disable react/style-prop-object */
import React from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { accountService } from "../../services";
import { Container } from "reactstrap";
import { setCurrentUserRole, Role } from "../../helpers";
//import "./test.css"
const RoleWiseTile = () => {
    const userDetails = accountService.userValue;
    console.log("userDetails == ",userDetails.userRoleArray);   
    return (
        <>
        <div className="page-content">
            <Container className="mt-5">                
                <div className="web-form">
                    {userDetails.userRoleArray.includes("Executive" && "Admin" && "Manager" && "User") ? (
                        <>
                        <div className="tile-div">
                            <Link to={`/executive`} className="mb-2">
                                <img src="http://52.42.196.59:4000/ReactImages/tile1.jpeg" />
                            </Link>
                            <Link to={`/training/list`} className="mb-2 mr-5" onClick={() => {
                                setCurrentUserRole(Role.Admin)
                                }}>
                                <img src="http://52.42.196.59:4000/ReactImages/tile2.jpeg" />
                            </Link>
                        </div>
                        <div>&nbsp;</div>
                        <div className="tile-div">
                            <Link to={`/training/list`} className="mb-2" onClick={() => {
                                setCurrentUserRole(Role.Manager)}}>
                                <img src="http://52.42.196.59:4000/ReactImages/tile2.jpeg" />
                            </Link>
                            <Link to={`/training/list`} className="mb-2" onClick={() => {
                                setCurrentUserRole(Role.User)}}>
                                <img src="http://52.42.196.59:4000/ReactImages/tile2.jpeg" />
                            </Link>
                        </div>
                        </>
                        ): 
                        <div>
                            {userDetails.userRoleArray.includes("Executive" && "Admin" && "Manager" ) ? (
                                <>
                                <div className="tile-div">
                                    <Link to={`/executive`} className="mb-2">
                                        <img src="http://52.42.196.59:4000/ReactImages/tile1.jpeg" />
                                    </Link>
                                    <Link to={`/training/list`} className="mb-2 mr-5" onClick={() => {
                                        setCurrentUserRole(Role.Admin)
                                        }}>
                                        <img src="http://52.42.196.59:4000/ReactImages/tile2.jpeg" />
                                    </Link>
                                </div>
                                <div>&nbsp;</div>
                                <div className="tile-div">
                                    <Link to={`/training/list`} className="mb-2" onClick={() => {
                                        setCurrentUserRole(Role.Manager)
                                        }}>
                                        <img src="http://52.42.196.59:4000/ReactImages/tile2.jpeg" />
                                    </Link>                                    
                                </div>
                                </>
                            ):
                            <div>
                                {userDetails.userRoleArray.includes("Executive" && "Admin" && "User" ) ? (
                                    <>
                                        <div className="tile-div">
                                            <Link to={`/executive`} className="mb-2">
                                                <img src="http://52.42.196.59:4000/ReactImages/tile1.jpeg" />
                                            </Link>
                                            <Link to={`/training/list`} className="mb-2 mr-5" onClick={() => {
                                                setCurrentUserRole(Role.Admin)
                                                }}>
                                                <img src="http://52.42.196.59:4000/ReactImages/tile2.jpeg" />
                                            </Link>
                                        </div>
                                        <div>&nbsp;</div>
                                        <div className="tile-div">
                                            <Link to={`/training/list`} className="mb-2" onClick={() => {
                                                setCurrentUserRole(Role.Manager)
                                                }}>
                                                <img src="http://52.42.196.59:4000/ReactImages/tile2.jpeg" />
                                            </Link>                                    
                                        </div>
                                    </>
                                ):
                                <div>
                                    {userDetails.userRoleArray.includes("Executive"  && "Manager" && "User" ) ? (
                                        <>
                                        <div className="tile-div">
                                            <Link to={`/executive`} className="mb-2">
                                                <img src="http://52.42.196.59:4000/ReactImages/tile1.jpeg" />
                                            </Link>
                                            <Link to={`/training/list`} className="mb-2 mr-5" onClick={() => {
                                                setCurrentUserRole(Role.Manager)
                                                }}>
                                                <img src="http://52.42.196.59:4000/ReactImages/tile2.jpeg" />
                                            </Link>                                            
                                        </div>
                                        <div>&nbsp;</div>
                                        <div className="tile-div">
                                            <Link to={`/training/list`} className="mb-2" nClick={() => {
                                                setCurrentUserRole(Role.User)
                                                }}>
                                                <img src="http://52.42.196.59:4000/ReactImages/tile2.jpeg" />
                                            </Link>                                    
                                        </div>
                                    </>
                                    ):
                                    <div>
                                        {userDetails.userRoleArray.includes("Executive" && "Admin") ? (
                                            <>
                                                <div className="tile-div">
                                                    <Link to={`/executive`} className="mb-2">
                                                        <img src="http://52.42.196.59:4000/ReactImages/tile1.jpeg" />
                                                    </Link>
                                                    <Link to={`/training/list`} className="mb-2 mr-5" nClick={() => {
                                                        setCurrentUserRole(Role.Admin)
                                                        }}>
                                                        <img src="http://52.42.196.59:4000/ReactImages/tile2.jpeg" />
                                                    </Link>
                                                </div>
                                                <div>&nbsp;</div>
                                            </>
                                        ):  <div>
                                                 {userDetails.userRoleArray.includes("Executive" && "Manager") ? (
                                                    <>
                                                        <div className="tile-div">
                                                            <Link to={`/executive`} className="mb-2">
                                                                <img src="http://52.42.196.59:4000/ReactImages/tile1.jpeg" />
                                                            </Link>
                                                            <Link to={`training/list`} className="mb-2 mr-5" nClick={() => {
                                                                setCurrentUserRole(Role.Manager)
                                                                }}>
                                                                <img src="http://52.42.196.59:4000/ReactImages/tile2.jpeg" />
                                                            </Link>
                                                        </div>
                                                        <div>&nbsp;</div>
                                                    </>
                                                ):
                                                <div>
                                                    {userDetails.userRoleArray.includes("Executive" && "User") ? (
                                                    <>
                                                        <div className="tile-div">
                                                            <Link to={`/executive`} className="mb-2">
                                                                <img src="http://52.42.196.59:4000/ReactImages/tile1.jpeg" />
                                                            </Link>
                                                            <Link to={`training/list`} className="mb-2 mr-5" nClick={() => {
                                                                setCurrentUserRole(Role.User)
                                                                }}>
                                                                <img src="http://52.42.196.59:4000/ReactImages/tile2.jpeg" />
                                                            </Link>
                                                        </div>
                                                        <div>&nbsp;</div>
                                                    </>
                                                    ):<div>
                                                        {userDetails.userRoleArray.includes("Executive" ) ? (
                                                        <>
                                                            <div className="tile-div">
                                                                <Link to={`/executive`} className="mb-2">
                                                                    <img src="http://52.42.196.59:4000/ReactImages/tile1.jpeg" />
                                                                </Link>                                                                
                                                            </div>
                                                            <div>&nbsp;</div>
                                                        </>
                                                        ):<div>
                                                            {userDetails.userRoleArray.includes("Admin" && "Manager" && "User" ) ? (
                                                                <>
                                                                    <div className="tile-div">
                                                                        <Link to={`/training/list`} className="mb-2" nClick={() => {
                                                                            setCurrentUserRole(Role.Admin)
                                                                            }}>
                                                                            <img src="http://52.42.196.59:4000/ReactImages/tile1.jpeg" />
                                                                        </Link>
                                                                        <Link to={`training/list`} className="mb-2 mr-5" nClick={() => {
                                                                            setCurrentUserRole(Role.Manager)
                                                                            }}>
                                                                            <img src="http://52.42.196.59:4000/ReactImages/tile2.jpeg" />
                                                                        </Link>
                                                                    </div>
                                                                    <div>&nbsp;</div>
                                                                    <div className="tile-div">
                                                                        <Link to={`training/list`} className="mb-2" nClick={() => {
                                                                            setCurrentUserRole(Role.User)
                                                                            }}>
                                                                            <img src="http://52.42.196.59:4000/ReactImages/tile2.jpeg" />
                                                                        </Link>                                    
                                                                    </div>
                                                                </>
                                                            ):<div>
                                                                {userDetails.userRoleArray.includes("Admin" && "Manager") ? (
                                                                    <>
                                                                        <div className="tile-div">
                                                                            <Link to={`/training/list`} className="mb-2" nClick={() => {
                                                                                setCurrentUserRole(Role.Admin)
                                                                                }}>
                                                                                <img src="http://52.42.196.59:4000/ReactImages/tile1.jpeg" />
                                                                            </Link>
                                                                            <Link to={`training/list`} className="mb-2 mr-5" nClick={() => {
                                                                                setCurrentUserRole(Role.Manager)
                                                                                }}>
                                                                                <img src="http://52.42.196.59:4000/ReactImages/tile2.jpeg" />
                                                                            </Link>
                                                                        </div>
                                                                        <div>&nbsp;</div>
                                                                    </>
                                                                ):<div>
                                                                    {userDetails.userRoleArray.includes("Admin" && "User") ? ( 
                                                                        <>
                                                                            <div className="tile-div">
                                                                                <Link to={`/training/list`} className="mb-2" nClick={() => {
                                                                                    setCurrentUserRole(Role.Admin)
                                                                                    }}>
                                                                                    <img src="http://52.42.196.59:4000/ReactImages/tile1.jpeg" />
                                                                                </Link>
                                                                                <Link to={`training/list`} className="mb-2 mr-5" nClick={() => {
                                                                                    setCurrentUserRole(Role.User)
                                                                                    }}>
                                                                                    <img src="http://52.42.196.59:4000/ReactImages/tile2.jpeg" />
                                                                                </Link>
                                                                            </div>
                                                                            <div>&nbsp;</div>
                                                                        </>
                                                                    ):<div>
                                                                        {userDetails.userRoleArray.includes("Admin") ? ( 
                                                                            <>
                                                                                <div className="tile-div">
                                                                                    <Link to={`/training/list`} className="mb-2" nClick={() => {
                                                                                        setCurrentUserRole(Role.Admin)
                                                                                        }}>
                                                                                        <img src="http://52.42.196.59:4000/ReactImages/tile1.jpeg" />
                                                                                    </Link>                                                                                   
                                                                                </div>
                                                                                <div>&nbsp;</div>
                                                                            </>
                                                                        ):<div>
                                                                            {userDetails.userRoleArray.includes("Manager" && "User") ? ( 
                                                                                <>
                                                                                    <div className="tile-div">
                                                                                        <Link to={`/training/list`} className="mb-2" nClick={() => {
                                                                                            setCurrentUserRole(Role.Manager)
                                                                                            }}>
                                                                                            <img src="http://52.42.196.59:4000/ReactImages/tile1.jpeg" />
                                                                                        </Link>     
                                                                                        <Link to={`/training/list`} className="mb-2" nClick={() => {
                                                                                            setCurrentUserRole(Role.User)
                                                                                            }}>
                                                                                            <img src="http://52.42.196.59:4000/ReactImages/tile1.jpeg" />
                                                                                        </Link>                                                                              
                                                                                    </div>
                                                                                    <div>&nbsp;</div>
                                                                                </>
                                                                            ):<div>
                                                                                {userDetails.userRoleArray.includes("Manager") ? ( 
                                                                                    <>
                                                                                        <div className="tile-div">
                                                                                            <Link to={`/training`} className="mb-2" nClick={() => {
                                                                                                setCurrentUserRole(Role.Manager)
                                                                                                }}>
                                                                                                <img src="http://52.42.196.59:4000/ReactImages/tile1.jpeg" />
                                                                                            </Link>                                                                    
                                                                                        </div>
                                                                                        <div>&nbsp;</div>
                                                                                    </>
                                                                                ):<div>
                                                                                    {userDetails.userRoleArray.includes("User") ? ( 
                                                                                    <>
                                                                                        <div className="tile-div">
                                                                                            <Link to={`/training`} className="mb-2" nClick={() => {
                                                                                                setCurrentUserRole(Role.User)
                                                                                                }}>
                                                                                                <img src="http://52.42.196.59:4000/ReactImages/tile1.jpeg" />
                                                                                            </Link>                                                                    
                                                                                        </div>
                                                                                        <div>&nbsp;</div>
                                                                                    </>
                                                                                    ):<div>
                                                                                        <h1>You Dont have access</h1>    
                                                                                    </div>}  
                                                                                </div>}
                                                                            </div>}
                                                                        </div>}
                                                                    </div>}
                                                                </div>}
                                                            </div>
                                                            }
                                                        </div>
                                                        }
                                                    </div>
                                                    }
                                                </div>
                                                }
                                            </div>
                                            }
                                        </div>
                                        }
                                    </div>
                                    }
                                </div>
                                }
                            </div>
                            }
                        </div>                   
            </Container>
        
        </div>
        </>
    );
};

export { RoleWiseTile };
