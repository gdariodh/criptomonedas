import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
  font-family: "Bebas Neue", cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
`;

//TODO: custom Hook                 [state,setState]
const useCriptomoneda = (label, stateInicial, ListCryptos) => {
  // state de nuestro custom
  const [state, setState] = useState(stateInicial);

  if(!ListCryptos)return;

  const SelectCripto = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select 
      value={state}
      onChange={(e) => setState(e.target.value)}
      >
        <option value=''>-Seleccione-</option>
        {ListCryptos.map((crypto) => (
          <option key={crypto.CoinInfo.Id} value={crypto.CoinInfo.Name}>
            {crypto.CoinInfo.FullName}
          </option>
        )) }

      </Select>
    </Fragment>
  );

  // return state, interfaz y fn setState
  return [state, SelectCripto, setState];
};

export default useCriptomoneda;
