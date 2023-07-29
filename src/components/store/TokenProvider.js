import React, { useState } from "react";

import TokenContext from "./token-context";

const TokenProvider = (props)=>{
const [token,setToken] = useState(null);
const userIsLoggedIn = !!token;
const loginHandler =(tokenId)=>{
    setToken(tokenId);
}
const logoutHandler =()=>{
    setToken(null);
};
const tokenContext={
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
};
console.log(tokenContext.token);
return (
    <TokenContext.Provider value={tokenContext}>
        {props.children}
    </TokenContext.Provider>
);
};

export default TokenProvider;