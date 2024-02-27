import useRecommendation from "../../hooks/useRecommendation";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Recommendation = ({ recommendation }) => {
  const navigate = useNavigate();
  const { error, loading } = useRecommendation();
  const user = recommendation.user.nickName;
  const photos = recommendation.photo;

  if (loading) {
    return <p>Loading recommendations...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const goToRecommendation = () => {
    navigate(`/recommendations/${recommendation.id}`);
  };

  return (
    <Container
      className="my-5 d-flex justify-content-center align-items-center h-100 w-100"
      fluid>
      <Row className="justify-content-center">
        <Col className="d-flex justify-content-center">
          <Card>
            <Carousel
              fade
              interval={null}
              variant="dark"
              style={{
                width: "auto",
                height: "250px",
                objectPosition: "center",
                objectFit: "cover",
                overflow: "hidden",
              }}>
              {photos.length > 0 ? (
                photos.map((photo) => (
                  <Carousel.Item key={photo}>
                    <img
                      className="d-block w-100"
                      style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        height: "250px",
                      }}
                      src={import.meta.env.VITE_BACKEND + `/photos/${photo}`}
                      alt="Reco1"
                    />
                  </Carousel.Item>
                ))
              ) : (
                <Carousel.Item>
                  <img
                    className="d-block w-100 img-thumbnail "
                    src="https://via.placeholder.com/300"
                    style={{ objectFit: "cover", objectPosition: "center" }}
                    alt="Default"
                  />
                </Carousel.Item>
              )}
            </Carousel>
            <Card.Body className="text-center">
              <Card.Text className="mb-1 h5">{user}</Card.Text>
              <Button
                onClick={goToRecommendation}
                variant="primary"
                className="w-50 mt-3 mb-3">
                Ver
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

Recommendation.propTypes = {
  recommendation: PropTypes.object,
};

export default Recommendation;
