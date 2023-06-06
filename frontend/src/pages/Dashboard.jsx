import React from "react";
import { useQuery, gql } from "@apollo/client";

const Dashboard = () => {
  const GET_ANIMES = gql`
    query ($page: Int, $perPage: Int, $search: String) {
      Page(page: $page, perPage: $perPage) {
        pageInfo {
          total
          perPage
        }
        media(search: $search, type: ANIME, sort: FAVOURITES_DESC) {
          id
          title {
            romaji
            english
            native
          }
          type
          genres
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_ANIMES, {
    variables: {
      search: "Naruto",
      page: 1,
      perPage: 3,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data);

  return (
    <div>
      <div>{data.Page.media[0].title.english}</div>
      {/* <div>{data.Media.title.english}</div>
      <img src={data.Media.coverImage.large} alt="anime" /> */}
    </div>
  );
};

export default Dashboard;
