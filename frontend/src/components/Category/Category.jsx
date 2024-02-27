import { useEffect, useState } from "react";
import { getCategoriesService } from "../../services/backend";
import Card from "react-bootstrap/Card";
import Carousel from "react-bootstrap/Carousel";
import "./Category.css";
import { getRecommendationsByCategoryService } from "../../services/backend";
import { useNavigate } from "react-router-dom";

function Category() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const loadingCategories = async () => {
      try {
        const data = await getCategoriesService();
        setCategories(data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    loadingCategories();
  }, []);

  const handleSearch = async (e) => {
    if (e) {
      e.preventDefault();
    }
    try {
      const data = await getRecommendationsByCategoryService(category);
      navigate(`/recommendations/?category=${category}`);
    } catch (error) {
      console.log(error);
    }
  };

  if (!categories) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recommendation-list d-flex justify-content-center">
      <div className="d-none d-md-block">
        <div className="categories-list">
          {categories.slice(1).map((category) => (
            <div
              key={category.id}
              className="category-item">
              <div className="category-image">
                <img
                  src={
                    import.meta.env.VITE_BACKEND +
                    `/photos/categories/${category.category}.svg`
                  }
                  alt={category.category}
                />
              </div>
              <div className="category-details">
                <h3
                  className="text-primary"
                  onClick={() => handleSearch(category.id)}>
                  {category.category}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="d-md-none my-5 d-flex justify-content-center"
        style={{ width: "100%", margin: "0 auto" }}>
        <Carousel
          variant="dark"
          slide={false}>
          {categories.slice(1).map((category) => (
            <Carousel.Item key={category.id}>
              <Card id="categorycarousel">
                <Card.Img
                  src={
                    import.meta.env.VITE_BACKEND +
                    `/photos/categories/${category.category}.svg`
                  }
                  alt={category.category}
                  className="card-img"
                />
                <Card.Body className="text-center ">
                  <Card.Title
                    className="text-primary"
                    id="category"
                    key={category.id}
                    value={category.id}
                    onMouseUp={() => setCategory(category.id)}
                    onClick={handleSearch}>
                    {category.category}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Category;
