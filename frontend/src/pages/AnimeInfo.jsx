import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const AnimeInfo = () => {
  const { animeID } = useParams();

  const GET_ANIMES = gql`
    query ($id: Int) {
      Media(id: $id) {
        title {
          english
        }
        season
        seasonYear
        status
        duration
        genres
        coverImage {
          extraLarge
        }
        recommendations(page: 1, perPage: 5) {
          edges {
            node {
              id
            }
          }
        }
        description
        characters {
          nodes {
            id
          }
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_ANIMES, {
    variables: { id: animeID },
  });
  if (loading) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  return (
    <div style={{ backgroundColor: "#A9A9A9" }}>
      <div className="container">
        <h1 className="display-1 title">{data.Media.title.english}</h1>
        <div className="info-container">
          <div className="left-container">
            <div>
              <img
                className="anime-img"
                src={data.Media.coverImage.extraLarge}
                alt={data.Media.title + "picture"}
              ></img>
            </div>

            <div className="anime-stats">
              <p className="stat-title">Released: </p>
              <p className="stat">
                {data.Media.season} {data.Media.seasonYear}
              </p>
            </div>
            <div className="anime-stats">
              <p className="stat-title">Status: </p>
              <p className="stat">{data.Media.status}</p>
            </div>
            <div className="anime-stats">
              <p className="stat-title">Episodes: </p>
              <p className="stat">{data.Media.duration}</p>
            </div>
            <div className="anime-stats">
              <p className="stat-title">Genre: </p>
              {data.Media.genres.map((item, index) => (
                <p key={index} className="stat">
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div className="right-container">
            <p className="desc-title">Description</p>
            <p
              className="desc"
              dangerouslySetInnerHTML={{ __html: data.Media.description }}
            ></p>
          </div>
        </div>
        <p className="desc-title my-4">Comments</p>
        <div>
          <p>0 Comments</p>
        </div>
      </div>
    </div>
  );
};

export default AnimeInfo;
