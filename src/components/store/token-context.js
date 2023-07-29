import React from "react";

const TokenContext = React.createContext({
    token:'',
    isLoggedIn: false,
    login:(token)=>{},
    logout:()=>{}
})

export default TokenContext;