import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Form from "react-bootstrap/Form";
import { editRecommendationService } from "../../services/backend";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { getLocationsService } from "../../services/backend";
import { getCategoriesService } from "../../services/backend";

const EditReco = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [locations, setLocations] = useState([]);
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

  const handleEdit = async (e) => {
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
    try {
      await editRecommendationService(formData, token);
      navigate("/recommendations");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <Form
        className="w-75 mx-auto mt-5 "
        onSubmit={handleEdit}>
        <Form.Group className="mb-3">
          <Form.Label className="mb-3">Edit title</Form.Label>
          <Form.Control
            type="text"
            required
            className="mb-3"
            placeholder="Enter new title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name="title"
            id="title"
          />
        </Form.Group>
        <Form.Group>
          <Form.Select
            className="mb-3"
            aria-label="Default select example"
            value={category}
            name="category"
            id="category">
            onChange={(e) => setCategory(e.target.value)}
            <option
              key={category.id}
              value={category.id}>
              {category.category}
            </option>
          </Form.Select>
          <Form.Control
            as="textarea"
            rows={3}
            className="mb-3"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            name="description"
            id="description"
          />
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
        <Form.Group className="mb-3">
          <Form.Label>Upload your favorite photos from the trip!</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </Form.Group>
        {error ? <p>{error.message}</p> : null}
        <Button
          variant="primary"
          type="submit"
          className="mt-3">
          Edit!
        </Button>
      </Form>
    </>
  );
};

export default EditReco;
