import { getLocationsService } from "../../services/backend";
import { useEffect, useState } from "react";
import { searchRecommendationsByCountryService } from "../../services/backend";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./SearchBar.css";
function SearchBar() {
  const [locations, setLocations] = useState([]);
  const [country, setCountry] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const loadingLocations = async () => {
      try {
        const data = await getLocationsService();

        setLocations(data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    loadingLocations();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const data = await searchRecommendationsByCountryService(country);
      navigate(`/recommendations/?location=${country}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="d-none d-md-block ">
        <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
          {[
            "North America",
            "South America",
            "Europe",
            "Africa",
            "Asia",
            "Oceania",
            "Antarctica",
          ].map((continent) => (
            <Dropdown key={continent}>
              <Dropdown.Toggle
                variant="primary"
                id={`dropdown-${continent}`}>
                {continent}
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{ maxHeight: "200px", overflowY: "scroll" }}>
                {locations
                  .filter((location) => location.continent === continent)
                  .map((country) => (
                    <Dropdown.Item
                      key={country.id}
                      value={country.id}
                      id={country.id}
                      name={country.country}
                      onMouseUp={(e) => setCountry(e.target.id)}
                      onClick={handleSearch}>
                      {country.country}
                    </Dropdown.Item>
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          ))}
        </div>
      </div>

      <div className="d-md-none">
        <Form onSubmit={handleSearch}>
          <InputGroup className=" mb-3 mx-auto">
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
            <Button
              variant="outline-primary"
              id="button-addon2"
              type="submit">
              Search
            </Button>
          </InputGroup>
        </Form>
      </div>
    </>
  );
}

export default SearchBar;
