import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Cotizado from "./components/Cotizado";
import Spinner from "./spinner/Spinner"
import styled from "@emotion/styled";
import imagen from "./criptomonedas.png";
import axios from "axios";

const DivPrincipal = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-align: left;
  font-weight: 620;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;
  &::after {
    content: "";
    width: 100px;
    height: 6px;
    background-color: #66a2fe;
    display: block;
  }
`;

function App() {
  // state para sacar los datos de moneda y criptomoneda de formulario
  const [moneda, setMoneda] = useState("");
  const [crypto, setCrypto] = useState("");
  const [cotizado, setCotizado] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cotizarCrypto = async () => {
      // controlamos que no se ejecute el codigo si no esta cargado los datos en el state de moneda o crypto!
      if (moneda === "" || crypto === "") return;
      // otra consulta a la api para hacer la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${moneda}`;
      const response = await axios.get(url);
      //mostrar spinner
      setLoading(true);
      //ocultar spinner y mostrar cotizado
      setTimeout(()=>{
        setLoading(false);
        //guardar cotizado
        setCotizado(response.data.DISPLAY[crypto][moneda]);
      },3000)
      
    };
    cotizarCrypto();
  }, [moneda, crypto]);

  // Mostrar spinner o resultado - component condicionado
  const component = (loading)?(<Spinner/>):(<Cotizado cotizado={cotizado} moneda={moneda}/>);

  return (
    <DivPrincipal>
      <div>
        <Imagen 
        src={imagen} 
        alt='imagen cripto'
         />
      </div>

      <div>
        <Heading>Cotizador de criptomonedas</Heading>

        <Formulario 
        setMoneda={setMoneda} 
        setCrypto={setCrypto} 

        />

        {
          component
        }
      </div>
    </DivPrincipal>
  );
}

export default App;
