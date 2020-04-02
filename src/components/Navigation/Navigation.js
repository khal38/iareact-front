import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav className="pa3 pw4"style={{ display: "flex", justifyContent: "flex-end" }}>
      <p onClick={() => onRouteChange("signin")} className=" backpoint f3 link dim black underline pa3 pw4 ma4pointer br3 shadow-5"> Sign out</p>
    </nav>
    );
  } else {
    return (
      <nav className=" pa3 pw4"style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick={() => onRouteChange("signin")} className=" backpoint f3 link dim black underline pa3 pw4 ma4pointer br3 shadow-5"> Sign in </p>
        <p onClick={() => onRouteChange("register")} className=" spaceButton backpoint f3 link dim black underline pa3 pw4 ma4pointer br3 shadow-5"> Register </p>
      </nav>

    );
  };
}
  export default Navigation;
