import { getLibrary, reset } from "../features/library/librarySlice";
import React, { useEffect, useState } from "react";
import AnimeCarousel from "../components/AnimeCarousel";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { firstName, email } = user;

  const dispatch = useDispatch();
  const { animeList, isLoading, isError, message } = useSelector(
    (state) => state.library
  );

  useEffect(() => {
    if (isError) toast.error(message);
    dispatch(getLibrary({ email: email }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, email, isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div style={{ marginTop: -10, backgroundColor: "#A9A9A9" }}>
      <div className="container">
        <h1 className="py-5 display-1">Welcome back {firstName},</h1>
        {<AnimeCarousel listName="Popular Anime" sortType="POPULARITY_DESC" />}
        {<AnimeCarousel listName="Trending Anime" sortType="TRENDING_DESC" />}
      </div>
    </div>
  );
};

export default Dashboard;
