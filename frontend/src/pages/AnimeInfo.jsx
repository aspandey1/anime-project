import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import "../styles/anime.css";
import { useDispatch, useSelector } from "react-redux";
import AddButton from "../components/AddButton";

var percentColors = [
  { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
  { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
  { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } },
];

var getColorForPercentage = function (pct) {
  for (var i = 1; i < percentColors.length - 1; i++) {
    if (pct < percentColors[i].pct) {
      break;
    }
  }
  var lower = percentColors[i - 1];
  var upper = percentColors[i];
  var range = upper.pct - lower.pct;
  var rangePct = (pct - lower.pct) / range;
  var pctLower = 1 - rangePct;
  var pctUpper = rangePct;
  var color = {
    r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
  };
  return "rgb(" + [color.r, color.g, color.b].join(",") + ")";
};

const AnimeInfo = () => {
  const { animeID } = useParams();
  const GET_ANIMES = gql`
    query ($id: Int) {
      Media(id: $id) {
        title {
          userPreferred
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
        averageScore
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_ANIMES, {
    variables: { id: animeID },
  });
  if (loading) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  let gen = "";
  data.Media.genres.map((item) => (gen += item + " "));

  return (
    <div style={{ backgroundColor: "#A9A9A9" }}>
      <div className="container">
        <h1 className="display-1 title">{data.Media.title.userPreferred}</h1>
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
              <p className="stat">{gen}</p>
            </div>
          </div>
          <div className="right-container">
            <p className="desc-title">Rating</p>
            <div className="rating-container">
              <div className="score-container">
                {data.Media.averageScore ? (
                  <p
                    className="score"
                    style={{
                      backgroundColor: `${getColorForPercentage(
                        data.Media.averageScore / 100
                      )}`,
                    }}
                  >
                    {data.Media.averageScore / 10}
                  </p>
                ) : (
                  <p
                    className="score"
                    style={{
                      backgroundColor: "grey",
                    }}
                  >
                    N/A
                  </p>
                )}
                <div className="avg-score">
                  <p
                    style={{
                      fontWeight: "bold",
                      marginBottom: -2,
                      fontSize: 30,
                    }}
                  >
                    Average Score
                  </p>
                  <p style={{ fontSize: 14 }}>*Based on the AniList APIv2</p>
                </div>
              </div>
              <div className="add-container">
                <AddButton></AddButton>
              </div>
            </div>
            <p className="desc-title mt-2">Description</p>
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
