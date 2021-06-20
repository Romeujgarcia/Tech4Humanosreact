import React, { useState, useEffect } from "react";
import "./Weader.css";
import axios from "axios";


function Weader() {
  const [city, setCity] = useState( );
  const [search, setSearch] = useState("itajuba");
  
  
  useEffect(() => {
    async function getData() {
      const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=b14d34b29decb3a8a377a3444a4093b6`);

     // console.log(res.data);
      setCity(res.data);
      const json = await JSON.stringify({cidade: res.data.name});
       await axios.post('http://localhost:8000/buscar', json, {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          'Content-Type': 'application/json'
        }
      });
    }
  
      getData();
      
  }, [search]);





  return (
    <div className="card">
      <div className="search-form">
        <i id="icon-search" className="fas fa-search"></i>

        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar"

        />

      </div>
      
      
      {!city ? (
        <> </>
      ) : (
        <div className="main-container">
          <div className="weather-icon">
            <img
              src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`}
              alt="imgicon"
            />
            <h1>{city.weather[0].main}</h1>
          </div>
          <div className="location">
            <h3> 
              {" "}
              Cidade | País
              <i className="fa fa-street-view"></i>
              {city.name} | {city.sys.country}
            </h3>
          </div>
          <div className="temprature">
            <h1> Temperatura: {city.main.temp}&deg;C</h1>
          </div>
          <div className="temprature-range">
            <h6> Umidade: {city.main.humidity}%</h6>
          </div>
        </div>
      )}
    </div>
  );
}
export default Weader;
