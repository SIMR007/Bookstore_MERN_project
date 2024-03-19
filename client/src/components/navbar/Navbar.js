import React, { useEffect, useState } from 'react'
import "./navbar.css"
import { Link } from "react-router-dom"

const Navbar = () => {
    const [userdata, setUserdata] = useState({});
    console.log("response", userdata)

    const getUser = async () => {
        try {
            const response = await fetch("http://localhost:6001/login/success", { credentials: "include" });
            const responseData = await response.json();
            console.log("-------------", responseData);
            setUserdata(responseData)
        } catch (error) {
            console.log("error", error)
        }
    }

    const logout = () => {
        window.open("http://localhost:6001/logout", "_self")
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
            <header>
                <nav>
                    <div className="left">
                        <h1>Harsh Pathak</h1>
                    </div>
                    <div className="right">
                        <ul>
                            <li>
                                <Link to="/">
                                    Home
                                </Link>
                            </li>
                            {
                                Object.keys(userdata).length > 0 && userdata.user ? (
                                    <>
                                        <li style={{ color: "black", fontWeight: "bold" }}>{userdata.user.displayname}</li>
                                        <li>
                                            <Link to="/dashboard">
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li onClick={logout}>Logout</li>
                                        <li>
                                            <img src={userdata.user.image} style={{ width: "50px", borderRadius: "50%" }} alt="" />
                                        </li>
                                    </>
                                ) : (
                                    <li>
                                        <Link to="/auth/login">
                                            Login
                                        </Link>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Navbar
