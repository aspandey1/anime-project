import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { GrDocumentMissing } from "react-icons/gr";
import "../styles/library.css";

const Library = () => {
  const { animeList } = useSelector((state) => state.library);
  const lib = animeList;

  const GET_LIBRARY = gql`
    query ($list: [Int]) {
      Page(page: 1, perPage: 100) {
        media(id_in: $list, type: ANIME, sort: TITLE_ROMAJI) {
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
  if (loading) return <Spinner />;

  return (
    <div className="container">
      <h1 className="display-4 library-title">LIBRARY</h1>
      {data.Page.media.length > 0 ? (
        <div className="library-container">
          {data.Page.media.map((element, index) => {
            return (
              <Link
                key={index}
                to={`/anime/${element.id}`}
                className="library-link"
              >
                <div key={index} className="library-img-p bg-dark">
                  <img
                    className="library-img"
                    src={element.coverImage.large}
                    alt=""
                  />
                  <div className="library-p">
                    <p>{element.title.userPreferred}</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="library-nothing">
          <GrDocumentMissing
            className="center-svg"
            size={90}
          ></GrDocumentMissing>
          <p
            style={{
              fontWeight: "bold",
              fontSize: 30,
              letterSpacing: 2,
              textAlign: "center",
              marginTop: 28,
            }}
            className="center"
          >
            Nothing in Library
          </p>
        </div>
      )}
    </div>
  );
};

export default Library;
