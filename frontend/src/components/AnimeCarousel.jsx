import { useQuery, gql } from "@apollo/client";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 820 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 820, min: 480 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 480, min: 0 },
    items: 3,
  },
};

const Popular = ({ sortType, listName }) => {
  const GET_ANIMES = gql`
    query ($search: String, $sort: [MediaSort]) {
      Page(page: 1, perPage: 20) {
        media(search: $search, type: ANIME, sort: $sort) {
          id
          title {
            english
          }
          coverImage {
            large
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_ANIMES, {
    variables: { sort: sortType },
  });

  if (loading) return <Spinner />;
  if (error) return <p>{error.message}</p>;

  return (
    <div className="popular">
      {data != null ? (
        <div>
          <div className="popular-container">
            <p className="popular-title">{listName}</p>
          </div>
          <Carousel
            removeArrowOnDeviceType={["tablet", "mobile"]}
            infinite={true}
            responsive={responsive}
            draggable={false}
          >
            {data.Page.media.map((item, index) => (
              <Link
                key={index}
                to={`/anime/${item.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <div className="head-title">
                  <img
                    className="slider-image"
                    src={item.coverImage.large}
                    alt="First"
                  ></img>
                  <p className="anime-title">{item.title.english}</p>
                </div>
              </Link>
            ))}
          </Carousel>
        </div>
      ) : (
        <p>Nothing</p>
      )}
    </div>
  );
};

export default Popular;
