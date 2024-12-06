import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MyNavbar from "./components/MyNavbar";
import { Col, Container, Row } from "react-bootstrap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import MyFooter from "./components/MyFooter";

function App() {
  const [city, setCity] = useState("");

  return (
    <BrowserRouter>
      <MyNavbar /> {}
      <Container>
        <Row className="justify-content-center">
          <Col xs={12}>
            <Routes>
              <Route path="/" element={<Home setCity={setCity} />} />
              <Route path="/details" element={<Details city={city} />} />
            </Routes>
          </Col>
        </Row>
      </Container>
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;
