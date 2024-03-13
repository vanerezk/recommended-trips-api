import Recommendation from "../../components/Recommendation/Recommendation";
import useRecommendation from "../../hooks/useRecommendation";
import "./Recommendations.css";
import { Button } from "react-bootstrap";

const Recommendations = () => {
  const { recommendationsData } = useRecommendation();

  if (!recommendationsData || recommendationsData.length === 0) {
    return (
      <div className="fondo text-center ">
        <h3
          className="text-center text-primary"
          style={{
            marginTop: "150px",
            marginBottom: "10px",
            fontSize: "40px",
          }}>
          No recommendations found!
        </h3>
        <p
          className="parrafo "
          style={{
            marginTop: "10px",
            marginBottom: "50px",
            fontSize: "40px",
            textAlign: "center",
          }}>
          Sorry for the inconvenience, there are no recommendations available
          yet!
        </p>
        <Button
          variant="danger"
          style={{ marginRight: "50px" }}
          size="lg"
          href="/">
          Back to home!
        </Button>
        <Button
          variant="primary"
          size="lg"
          href="/recommendations">
          See all recommendations
        </Button>
      </div>
    );
  }

  console.log(recommendationsData);
  return (
    <>
      <section className="fondo">
        <h2
          className="text-center mt-5 mb-5 text-primary"
          style={{ fontSize: "40px" }}>
          Discover your next adventure!
        </h2>

        <div
          className="recommendation-list "
          style={{ marginTop: "-100px" }}>
          {recommendationsData.map((recommendation) => (
            <Recommendation
              recommendation={recommendation}
              key={recommendation.id}
              className="recommendation"
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Recommendations;
