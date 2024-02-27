import Recommendation from "../../components/Recommendation/Recommendation";
import useRecommendation from "../../hooks/useRecommendation";
import "./Recommendations.css";
import { Button } from "react-bootstrap";

const Recommendations = () => {
  const { recommendationsData } = useRecommendation();

  if (!recommendationsData || recommendationsData.length === 0) {
    return (
      <div className="fondo text-center ">
        <h3 className="text-center text-primary mt-5">
          No recommendations found!
        </h3>
        <p className="parrafo">
          Sorry for the inconvenience, there are no recommendations available
          yet!
        </p>
        <Button
          variant="danger"
          style={{ marginRight: "10px" }}
          size="sm"
          href="/">
          Back to home!
        </Button>
        <Button
          variant="primary"
          size="sm"
          href="/recommendations">
          See all recommendations
        </Button>
      </div>
    );
  }
  return (
    <>
      <section className="fondo">
        <h2 className="text-center mt-5 mb-5 text-primary">Recommendations</h2>
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
