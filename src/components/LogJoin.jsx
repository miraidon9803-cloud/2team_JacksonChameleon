import React from "react";
import { useLogJoinStore } from "../store/LogJoinStore";
import Login from "../pages/Login";
import Join from "../pages/Join";


const LogJoin = () => {
  const { isLogin } = useLogJoinStore();

  return (
    <div className="sub-page">
      {isLogin ? <Login /> : <Join/>}
    </div>
  );
};

export default LogJoin;
