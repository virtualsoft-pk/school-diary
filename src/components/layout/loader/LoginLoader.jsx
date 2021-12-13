import React from 'react'

const LoginLoader = () => {
    return (
       <div style={{ 
            position: "fixed",
            width: "500px",
            height: "200px",
            top: "50%",
            left:" 50%",
            marginTop: "-100px",
            marginLeft: "-250px"}} 
            className="loader-box">
        <div className="loader-7"></div>
        </div>
    )
}

export default LoginLoader
