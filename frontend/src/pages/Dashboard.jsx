import AnimeCarousel from "../components/AnimeCarousel";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { firstName } = user;

  return (
    <div style={{ marginTop: -10, backgroundColor: "#A9A9A9 " }}>
      <div className="container">
        <h1 className="py-5 display-1">Welcome back {firstName},</h1>
        {<AnimeCarousel listName="Popular Anime" sortType="POPULARITY_DESC" />}
        {<AnimeCarousel listName="Trending Anime" sortType="TRENDING_DESC" />}
      </div>
    </div>
  );
};

export default Dashboard;
