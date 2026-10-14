import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { useSelector, useDispatch } from "react-redux";

import { Chat } from "./pages/index.js";

import { fetchAuth, selectIsAuth } from './redux/slices/auth';

export default function App()
{
  //deploy Vercel

  // const isAuth = useSelector(selectIsAuth);

  // const dispatch = useDispatch();
  // React.useEffect(() =>
  // {
  //   if (true)
  //   {
  //     dispatch(fetchAuthMe());
  //   }
  // }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Chat />}></Route>
      </Routes>
    </>
  );
}
