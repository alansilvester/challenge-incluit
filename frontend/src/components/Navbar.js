import React from "react";

const navbar = ({ logo, bell, closed }) => {
  return (
    <nav className="navbar navbar-light">
      <img src={logo} width="100" height="50" alt="logo" className="m-2"/>
      <div className="form-inline">
        <img src={bell} width="20" height="20" alt="bell" className="m-2" />
        <img src={closed} width="20" height="20" alt="closed" className="m-2"/>
      </div>
    </nav>
  );
};

export default navbar;
