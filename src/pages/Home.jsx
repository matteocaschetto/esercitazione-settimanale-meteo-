import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FormControl,
  Button
} from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home({ setCity }) {
  const [cityInput, setCityInput] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCityInput(e.target.value);
  };

  const handleSearch = () => {
    if (cityInput) {
      localStorage.setItem("lastSearch", cityInput);
      navigate("/details", { state: { city: cityInput } });
    } else {
      alert("Please enter a valid city name.");
    }
  };

  return (
    <div className="home-page">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="justify-content-center">
          <Col>
            <Card className="text-center rounded-3 shadow-lg p-4">
              <Card.Body>
                <Card.Title className="fs-2 mb-4 text-primary">
                  Inserisci la città per le previsioni meteo
                </Card.Title>
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="...."
                    className="me-2"
                    aria-label="Search"
                    value={cityInput}
                    onChange={handleInputChange}
                  />
                  <Button onClick={handleSearch}>Search</Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
