import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const Results = ({ searchInput }) => {
  const ANIME_SEARCH = gql`
    query ($search: String) {
      Page(page: 1, perPage: 10) {
        pageInfo {
          total
          perPage
        }
        media(search: $search, type: ANIME, sort: POPULARITY_DESC) {
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

  const { loading, error, data } = useQuery(ANIME_SEARCH, {
    variables: { search: searchInput },
  });

  if (loading)
    return (
      <p
        style={{ flex: 1, textAlign: "center", marginTop: 180 }}
        className="display-1"
      >
        Loading...
      </p>
    );
  if (error) return <p>{error.message}</p>;

  return (
    <div className="mt-4">
      {data.Page.media.length === 0 ? (
        <p
          className="display-1"
          style={{ flex: 1, textAlign: "center", marginTop: 180 }}
        >
          No Results
        </p>
      ) : (
        <div className="container">
          <p>{data.Page.media.length} Results found</p>
          <div className="result-container">
            {data.Page.media.map((item, index) => {
              return (
                <Link key={index} to={`/anime/${item.id}`} className="link">
                  <div className="anime-card">
                    <img
                      className="anime-card-image"
                      src={item.coverImage.large}
                      alt="First"
                    ></img>
                    <p className="result-title">{item.title.userPreferred}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
