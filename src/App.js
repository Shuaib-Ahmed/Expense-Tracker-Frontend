import React, {Suspense} from "react";
import { AuthWrapper, PrivateRoute, Loading } from "./pages";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const Login = React.lazy(() => import("./pages/Login"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const CreateExpense = React.lazy(() => import("./pages/CreateExpense"));
const AllExpense = React.lazy(() => import("./pages/AllExpense"));
const EditExpense = React.lazy(() => import("./pages/EditExpense"));
const Error = React.lazy(() => import("./pages/Error"));

const App = () => {
  return (
    <AuthWrapper>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loading />}>
                <Login />
              </Suspense>
            }
          />

          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          <Route
            path="/create-expense"
            element={
              <PrivateRoute>
                <CreateExpense />
              </PrivateRoute>
            }
          />

          <Route
            path="/all-expense"
            element={
              <PrivateRoute>
                <AllExpense />
              </PrivateRoute>
            }
          />

          <Route
            path="/edit-expense/:id"
            element={
              <PrivateRoute>
                <EditExpense />
              </PrivateRoute>
            }
          />

          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <Error />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthWrapper>
  );
};

export default App;
