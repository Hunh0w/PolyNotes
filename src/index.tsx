import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import WelcomePage from "./pages/welcome";
import ErrorPage from "./pages/errors";
import LoginPage from './pages/authentication/login';
import RegisterPage from './pages/authentication/register';
import PrimarySearchAppBar from './components/header';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={"/"}
      errorElement={<ErrorPage />}
    >
      <Route index={true} element={<WelcomePage />} />
      <Route path={"login"} element={<LoginPage />} />
      <Route path={"register"} element={<RegisterPage />} />
    </Route>
  )
)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
