import React, { Fragment, useState } from "react";
import styled from "@emotion/styled";

const Label = styled.label`
font-family:'Bebas Neue', cursive;
color: #fff;
text-transform: uppercase;
font-weight:bold;
font-size: 2.4rem;
margin-top:2rem;
display: block;
`;

const Select = styled.select`
width:100%;
padding: 1rem;
/*TODO:-webkit-appearance para que el select tome los estilos*/
-webkit-appearance:none;
border-radius: 10px;
border: none;
font-size:1.2rem;
`;

//TODO: custom Hook          [state,setState]
const useMoneda = (label,stateInicial,ListMonedas) => {
  // state de nuestro custom
  const [state, setState] = useState(stateInicial);

  const SelectMoneda = () => (
    <Fragment>
      <Label>{label}</Label>
      <Select
      value={state}
      onChange={e => setState(e.target.value)}
      >
        <option value=''>-Seleccione-</option>
        {
          ListMonedas.map(moneda => 
            (<option key={moneda.code} value={moneda.code}>{moneda.name}</option>)
                )
        }
      </Select>
    </Fragment>
  );

  // return state, interfaz y fn setState
  return [state, SelectMoneda, setState];
};

export default useMoneda;
