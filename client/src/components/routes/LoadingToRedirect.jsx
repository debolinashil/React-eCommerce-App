import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    //redirect once count is 0
    count === 0 && navigate("/");

    //cleanup
    return () => clearInterval(interval);
  }, [count, navigate]);
  return (
    <div className="container p-5 text-center">
      <h2>Redirecting you in {count} seconds</h2>
    </div>
  );
};

export default LoadingToRedirect;
