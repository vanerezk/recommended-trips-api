import useSingleRecommendation from "../../hooks/useSingleRecommendation";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import { useNavigate } from "react-router-dom";
import {
  deleteRecommendationService,
  postImagesRecommendationService,
} from "../../services/backend";
import Comments from "../../components/Comments/Comments";
import LikeButton from "../../components/LikeButton/LikeButton";
import Carousel from "react-bootstrap/Carousel";
import "./ExpandedRecommendation.css";
import Card from "react-bootstrap/Card";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import "./ExpandedRecommendation.css";
import Modal from "react-modal";

const ExpandedRecommendation = ({ recommendationId }) => {
  const { recommendation, loading } = useSingleRecommendation(recommendationId);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState([]);
  const Navigate = useNavigate();
  const [showUpload, setShowUpload] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleUploadClick = () => {
    setShowUpload((prevShowUpload) => !prevShowUpload);
  };

  const { user, token } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { title, description, lean_in } = recommendation.recommendation;
  const nickName = recommendation.recommendation.user.nickName;
  const pais = recommendation.recommendation.location;
  const photos = recommendation.recommendation.photos;

  if (!recommendation) {
    return <div>No recommendation found</div>;
  }

  const handleDelete = async () => {
    try {
      await deleteRecommendationService(token);
    } catch (error) {
      console.log(error);
    } finally {
      Navigate("/recommendations");
    }
  };

  const addImages = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      return;
    }
    let formData = new FormData();
    formData.append("image", imageFile);
    try {
      await postImagesRecommendationService(formData, token);

      window.location.reload();
    } catch (error) {
      setError(error);
    }
  };

  const openModal = (image) => {
    setModalIsOpen(true);
    setSelectedImage(image);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage("");
  };

  return (
    <div className="fondo">
      <Card
        className="mt-5 bg-white text-center"
        style={{ width: "700px", height: "auto", margin: "auto" }}>
        <Card.Title
          className="text-center text-primary "
          style={{ fontSize: "25px", marginTop: "50px", marginBottom: "35px" }}>
          {title}
        </Card.Title>
        <div className="d-flex justify-content-center align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-pin "
            style={{ marginRight: "5px" }}
            viewBox="0 0 16 16">
            <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354m1.58 1.408-.002-.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a5 5 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a5 5 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.8 1.8 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14q.091.15.214.271a1.8 1.8 0 0 0 .37.282"></path>
          </svg>
          <i style={{ marginRight: "5px", fontSize: "16px" }}>{pais}</i>
        </div>
        <Card.Body className="text-center">
          <Carousel
            slide={false}
            style={{ width: "500px", height: "500px", margin: "auto" }}>
            {photos.map((photo) => (
              <Carousel.Item
                key={photo}
                onClick={() => openModal(photo)}>
                <img
                  src={import.meta.env.VITE_BACKEND + `/photos/${photo}`}
                  alt="Recommendation"
                  style={{
                    height: "500px",
                    width: "500px",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <Card.Text
            style={{
              fontStyle: "italic",
              width: "500px",
              fontSize: "18px",
              margin: "40px auto",
              textAlign: "justify",
            }}>
            {description}
          </Card.Text>
          <Card.Text
            className="text-center"
            style={{
              fontStyle: "italic",
              width: "500px",
              fontSize: "18px",
              margin: "40px auto",
              textAlign: "justify",
            }}>
            {lean_in}
          </Card.Text>
          <Card.Text
            className="text-center"
            style={{
              fontStyle: "italic",
              width: "500px",
              fontSize: "18px",
              margin: "40px auto",
              textAlign: "justify",
            }}>
            Posted by: {nickName}{" "}
          </Card.Text>
          <Card.Subtitle
            className="text-center d-flex justify-content-center align-items-center"
            style={{
              marginTop: "20px",
              width: "500px",
              margin: "auto",
              gap: "20px",
            }}>
            {user && user.nickName === nickName ? (
              <>
                <button
                  onClick={() => {
                    Navigate(
                      `/edit-recommendations/${recommendation.recommendation.id}`
                    );
                  }}
                  type="button"
                  className="btn btn-outline-primary justify-content-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-pencil-square"
                    viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                    <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  onClick={handleDelete}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-trash"
                    viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path>
                  </svg>
                </button>
                <Button
                  onClick={handleUploadClick}
                  variant="outline-info">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-upload"
                    viewBox="0 0 16 16">
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
                    <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z" />
                  </svg>
                </Button>
              </>
            ) : (
              <></>
            )}
            <div>
              {user && user.nickName === nickName ? (
                <>
                  <LikeButton />
                </>
              ) : (
                <LikeButton />
              )}
            </div>
          </Card.Subtitle>
          {showUpload && (
            <Form
              onSubmit={addImages}
              className="d-flex justify-content-center mt-3">
              <Form.Group className="">
                <Form.Control
                  type="file"
                  style={{ width: "400px" }}
                  onChange={(e) => setImageFile(e.target.files[0])}
                />
              </Form.Group>
              <Button
                type="submit"
                className="ml-3">
                Upload
              </Button>
            </Form>
          )}
        </Card.Body>
        <hr />

        <div>
          {user ? (
            <Comments />
          ) : (
            <p
              className="text-center mt-5 mb-5 "
              style={{ fontSize: "15px" }}>
              {" "}
              Login to view comments and share your thoughts!
            </p>
          )}
        </div>
      </Card>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        className="Modal"
        overlayClassName="Overlay">
        <img
          src={import.meta.env.VITE_BACKEND + `/photos/${selectedImage}`}
          alt="Full Size Image"
        />
        <Button
          onClick={closeModal}
          className="close-button"
          aria-label="Close Modal"
          variant="danger"
          style={{ position: "absolute", top: "10px", right: "10px" }}>
          X
        </Button>
      </Modal>
    </div>
  );
};

export default ExpandedRecommendation;
