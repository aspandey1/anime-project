import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import "../styles/anime.css";
import { useDispatch, useSelector } from "react-redux";
import { addAnime, reset } from "../features/library/librarySlice";
import { toast } from "react-toastify";

const AddButton = () => {
  const dispatch = useDispatch();
  const { animeID } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { email } = user;
  const { animeList, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.library
  );
  useEffect(() => {
    if (isError) toast.error(message);

    return () => {
      dispatch(reset());
    };
  }, [isError, isSuccess, message]);

  if (isLoading) {
    return <Spinner />;
  }

  for (let i = 0; i < animeList.length; i++) {
    if (animeList[i] == animeID) {
      return <p className="add bg-danger">Remove Anime</p>;
    }
  }

  const add = () => {
    dispatch(addAnime({ email, animeID }));
    toast.success("Added to Library");
  };
  return (
    <>
      {isLoading ? (
        <p className="bg-dark"></p>
      ) : (
        <p onClick={add} className="add bg-dark">
          Add to Library
        </p>
      )}
    </>
  );
};

export default AddButton;
