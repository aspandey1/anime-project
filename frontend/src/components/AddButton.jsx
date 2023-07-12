import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import "../styles/anime.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteAnime, addAnime, reset } from "../features/library/librarySlice";
import { toast } from "react-toastify";

const AddButton = () => {
  const dispatch = useDispatch();
  const { animeID } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { email } = user;
  const {
    animeList,
    isLoading,
    deleteIsError,
    addIsError,
    deleteIsSuccess,
    addIsSuccess,
    message,
  } = useSelector((state) => state.library);

  const remove = () => {
    dispatch(deleteAnime({ email, animeID }));
  };

  const add = () => {
    dispatch(addAnime({ email, animeID }));
  };

  useEffect(() => {
    if (addIsError) toast.error(message);
    if (deleteIsError) toast.error(message);
    if (addIsSuccess) toast.success("Added to Library");
    if (deleteIsSuccess) toast.success("Removed from Library");

    return () => {
      dispatch(reset());
    };
  }, [
    dispatch,
    addIsError,
    deleteIsError,
    addIsSuccess,
    deleteIsSuccess,
    message,
  ]);

  if (isLoading) {
    return <Spinner />;
  }
  const intAnimeId = parseInt(animeID);

  for (let i = 0; i < animeList.length; i++) {
    if (animeList[i] === intAnimeId) {
      return (
        <p className="add bg-danger" onClick={remove}>
          Remove Anime
        </p>
      );
    }
  }

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
