import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { getLibrary, reset } from "../features/library/librarySlice";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { Link, useNavigate } from "react-router-dom";
import "../styles/library.css";

const Library = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { email } = user;
  const { animeList, isSucess, isLoading, isError, message } = useSelector(
    (state) => state.library
  );
  const [lib, setLib] = useState(animeList);

  useEffect(() => {
    if (isSucess) {
      dispatch(reset());
    }
    if (isError) toast.error(message);
    dispatch(getLibrary({ email: email }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, navigate, email, isError, isSucess, message]);

  const GET_LIBRARY = gql`
    query ($list: [Int]) {
      Page(page: 1, perPage: 10) {
        media(id_in: $list, type: ANIME) {
          id
          title {
            userPreferred
          }
          coverImage {
            large
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_LIBRARY, {
    variables: { list: lib },
  });
  if (error) return <p>{error.message}</p>;
  if (isLoading || loading) return <Spinner />;

  const handleClick = (id) => {
    navigate(`/anime/${id}`);
  };

  return (
    <div className="container">
      <h1 className="display-4 library-title">Library</h1>
      {data.Page.media.length > 0 ? (
        <div className="library-container">
          {data.Page.media.map((element, index) => {
            return (
              // <Link
              //   key={index}
              //   to={`/anime/${element.id}`}
              //   className="library-link"
              // >
              <div
                key={index}
                className="library-img-p bg-dark"
                onClick={() => handleClick(element.id)}
              >
                <img
                  className="library-img"
                  src={element.coverImage.large}
                  alt=""
                />
                <div className="library-p">
                  <p>{element.title.userPreferred}</p>
                </div>
              </div>
              // </Link>
            );
          })}
        </div>
      ) : (
        <div className="">
          <p>Nothing</p>
        </div>
      )}
    </div>
  );
};

export default Library;
