import SearchBar from "../../components/SearchBar/SearchBar";
import Category from "../../components/Category/Category";
import "./Home.css";
function Home() {
  return (
    <>
      <div className="fondo  ">
        <div className="container mt-5 mb-5 d-flex justify-content-center ">
          <section>
            <h2 className="text-center mt-5 mb-5 text-primary">
              Discover new destinations and experiences!
            </h2>
            <SearchBar />
            <Category />
          </section>
        </div>
      </div>
    </>
  );
}

export default Home;
