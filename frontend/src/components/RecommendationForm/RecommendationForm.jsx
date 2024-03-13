import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { postCreateRecommendationService } from "../../services/backend";
import { useNavigate } from "react-router-dom";
import { getLocationsService } from "../../services/backend";
import { getCategoriesService } from "../../services/backend";
import "./RecommendationForm.css";
import { Link } from "react-router-dom";

function RecommendationForm() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState([]);
  const [lean_in, setLean_in] = useState("");
  const [country, setCountry] = useState();
  const [imageFile, setImageFile] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadingLocations = async () => {
      try {
        const data = await getLocationsService();

        setLocations(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    const loadingCategories = async () => {
      try {
        const data = await getCategoriesService();
        setCategories(data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    loadingCategories();
    loadingLocations();
  }, []);

  if (!user) {
    return <div>You must be logged in</div>;
  }

  const handleForm = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      return;
    }
    let formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("country", country);
    formData.append("lean_in", lean_in);
    try {
      await postCreateRecommendationService(formData, token);
      navigate("/recommendations");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <div className="fondo">
        <h1
          className="text-center text-primary"
          style={{ marginTop: "50px" }}>
          Tell us about your experience!
        </h1>
        <Form
          className="mx-auto formCrear"
          onSubmit={handleForm}>
          <Form.Group className="mb-3">
            <Form.Label className="mb-3">Create Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new title"
              required
              minLength={8}
              maxLength={50}
              className="mb-3"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              name="title"
              id="title"
            />
            <Form.Text className="text-muted mb-3">
              Try to be as descriptive as possible.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Select
              className="mb-3"
              aria-label="Default select example"
              value={category}
              name="category"
              id="category"
              required
              onChange={(e) => setCategory(e.target.value)}>
              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}>
                  {category.category}
                </option>
              ))}
            </Form.Select>
            <Form.Control
              as="textarea"
              rows={3}
              className="mb-3"
              placeholder="Enter new description"
              required
              minLength={8}
              maxLength={750}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              name="description"
              id="description"
            />
            <Form.Label className="text-muted mb-3">
              Tell us about your trip
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label className="mb-3">Choose the country</Form.Label>
            <Form.Select
              required
              name="country"
              id="country"
              onChange={(e) => setCountry(e.target.value)}>
              {locations.map((pais) => (
                <option
                  key={pais.id}
                  value={pais.id}>
                  {pais.country}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label className="text-muted mb-3">Hashtags</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              className="mb-3"
              required
              placeholder="Enter hashtags"
              maxLength={200}
              onChange={(e) => setLean_in(e.target.value)}
              value={lean_in}
              name="lean_in"
              id="lean_in"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Upload your favorite photos from the trip!</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
          </Form.Group>
          {error ? <p>{error}</p> : null}
          <Button
            variant="primary"
            type="submit">
            Create recommendation!
          </Button>
          <Link to="/recommendations">
            <Button
              variant="danger"
              style={{ marginLeft: "20px" }}>
              Cancel
            </Button>
          </Link>
        </Form>
      </div>
    </>
  );
}

export default RecommendationForm;
