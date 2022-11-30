import React, { Suspense,useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { Sidebar } from "./components/index";
import routes from "../routes";
import useApi from "../api/useApi";
import { useDispatch } from "react-redux";
import * as Actions from "./../store/actions/authAction";

function Layout(){
  const dispatch = useDispatch();
  const { 
    get_user_info
  } = useApi();

  useEffect(() => {
    get_user_info()
    .then((res) =>{
      dispatch(Actions.setAuthenticatedUserData(res));
    });
  }, []);

  return (
      <div className="main">
        <Sidebar />
        <Suspense>
          <Routes>
            {routes.map((route, idx) => {
              return (
                route.element && (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    name={route.name}
                    element={<route.element />}
                  />
                )
              );
            })}
            <Route path="/" element={<Navigate to="patients" replace />} />
          </Routes>
        </Suspense>
      </div>
  );
};

export default Layout;
