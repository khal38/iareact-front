import React from "react";

const Navigation = ({onRouteChange}) => {
  return (
    <nav
      className="pa3 pw4"
      style={{ display: "flex", justifyContent: "flex-end" }}
    >
      
      <p
        onClick={() => onRouteChange("signin")}
        className=" backpoint f3 link dim black underline pa3 pw4 ma4pointer br3 shadow-5"
      >
        Sign Out
      </p>
    </nav>
  );
};

export default Navigation;
