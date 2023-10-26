import React from "react";

const Button = ({ index, handlePage, currentPage }) => {
  return (
    <div>
      <button
        className={index + 1 == currentPage ? "current" : ""}
        onClick={(e) => {
          handlePage(e);
        }}
      >
        {index + 1}
      </button>
    </div>
  );
};

export default Button;
