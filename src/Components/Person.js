import axios from "axios";
import React from "react";
import "./Person.css";

export default class Person extends React.Component {
  state = {
    persons: [],
    ultima:[],
  };
  componentDidMount() {
    axios.get(`http://localhost:8000/consultar`).then((res) => {
      //console.log(res);
      this.setState({ persons: res.data[0] });
      this.setState({ ultima: res.data[1] });
      //console.log(res.data[0])
    });
  }

  render() {
    return (
      <div className="cidades">
        <div className="tipo-cidade">
          <h1>Top 5 cidades mais buscadas</h1>
          {this.state.persons.map((person) => (
            <ul><li>{person.cidade}</li></ul>
          ))}
          </div>
        
           <div className="tipo-cidade">
           <hr></hr>

            <h1 >Últimas cidades buscadas</h1>
            {this.state.ultima.map((person) => (
            <ul><li>{person.cidade}</li></ul>
          ))}
            
            </div>
          
          
      </div>
    );
  }
}
