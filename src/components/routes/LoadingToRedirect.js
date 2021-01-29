import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
const LoadingToRedirect = () => {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => --count);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="container p-5 text-center">
      {count === 0 ? (
        <Redirect to="/login"></Redirect>
      ) : (
        <Spin size="large"></Spin>
      )}
    </div>
  );
};

export default LoadingToRedirect;
