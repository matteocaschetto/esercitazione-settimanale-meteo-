import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const WeatherDetails = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const apiKey = "71c2de6b08cfa74cf37a9bdc51fda2c5";
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError("Errore durante il recupero dei dati meteo");
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  const getWeatherIcon = (condition) => {
    const icons = {
      Clear: "bi bi-sun",
      Rain: "bi bi-cloud-rain",
      Clouds: "bi bi-clouds",
      Snow: "bi bi-snow",
      Thunderstorm: "bi bi-cloud-lightning",
      Drizzle: "bi bi-cloud-drizzle",
      Mist: "bi bi-cloud-fog",
      Default: "bi bi-cloud"
    };
    return icons[condition] || icons["Default"];
  };

  const groupByDate = (data) => {
    const groupedData = data.reduce((acc, entry) => {
      const date = new Date(entry.dt * 1000).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = entry;
      }
      return acc;
    }, {});

    return Object.values(groupedData);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  const groupedForecast = groupByDate(weatherData.list);
  const forecast = groupedForecast.map((entry, index) => {
    const weatherCondition = entry.weather[0].main;
    const weatherIcon = getWeatherIcon(weatherCondition);

    return (
      <Col xs={12} sm={6} md={4} lg={3} key={index}>
        <Card className="text-center mb-3">
          <Card.Body>
            <Card.Title>
              {new Date(entry.dt * 1000).toLocaleDateString()}
            </Card.Title>
            <i
              className={weatherIcon}
              style={{ fontSize: "24px", marginRight: "10px" }}
            ></i>
            <p>{entry.weather[0].description}</p>
            <p>Temperature: {entry.main.temp}°C</p>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center my-5 fs-1 text-bg-primary rounded-1 p-2">
            {city}
          </h1>
          <Card className="text-center mb-5 border-5">
            <Card.Body>
              <Card.Title className="fs-2 pb-3">
                Previsioni Meteo - {city}
              </Card.Title>
              <Row className="d-flex flex-wrap">{forecast}</Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default WeatherDetails;
