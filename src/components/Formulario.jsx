import React, { useState,useEffect } from "react";
import Error from "./Error"
//Custom Hooks
import useMoneda from "../hooks/useMoneda";
import useCriptomoneda from "../hooks/useCriptomoneda";
// styled components
import styled from "@emotion/styled";
// peticiones
import axios from "axios";
import PropTypes from 'prop-types'

const Button = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({setMoneda,setCrypto}) => {

  // TODO: state del llamado a la api
  const [cryptos, setCryptos]=useState([]);
  const [error, setError] = useState(false);

  // Listado de monedas
  const monedas = [
    { code: "USD", name: "Dolar EEUU" },
    { code: "EUR", name: "Euro" },
    { code: "GBP", name: "Libra Esterlina" },
    { code: "CLP", name: "Pesos Chilenos" },
  ];

  /*states de comunicacion con los custom hooks  
          [state, interfaz]                              [state,setState]*/ 
  const [moneda, SelectMoneda] = useMoneda("Elige tu moneda", "", monedas);
  const [crypto, SelectCrypto] = useCriptomoneda("Elige tu cripto", "",cryptos);

  // ejecutar llamado api
  useEffect(() => {
    const consulta = async () => {
      const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
      const response = await axios.get(url);
      // extraemos la lista de cryptos de la api
      setCryptos(response.data.Data);
    };
    consulta();
  }, []);

  const cotizarMoneda = e => {
    e.preventDefault();
    if(moneda === '' || crypto === ''){
      setError(true);
      return;
    }
    setError(false);
    // enviar datos al componente principal app.js
    setMoneda(moneda);
    setCrypto(crypto);
  } 

  return (
    <form
    onSubmit={cotizarMoneda}
    >

    {
      error ? <Error mensaje='Los campos son obligatorios!'/> : null
    }

      <SelectMoneda />

      <SelectCrypto />

      <Button type='submit' value='calcular' />
    </form>
  );
};

Formulario.propTypes = {
  setMoneda:PropTypes.func.isRequired,
  setCrypto: PropTypes.func.isRequired
}

export default Formulario;
