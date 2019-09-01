import React from "react";
import { Link } from "react-router-dom";

const ShowMessage = ({ success, error, loading }) => {
  const className = error ? "alert alert-danger" : "alert alert-info";
  const text = () => {
    if (error) return error;
    else if (success) {
      return `New account was create. Please ${(
        <Link to="/signin">signin</Link>
      )}.`;
    }
  };
  const content = () => {
    if ((success || error) && !loading) {
      return <div className={className}>{text()}</div>;
    } else if (loading && !success && !error) {
      return (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      );
    } else {
      return null;
    }
  };

  return content();
};

export default ShowMessage;
