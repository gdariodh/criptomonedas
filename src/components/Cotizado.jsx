import React from 'react';
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const CotizadoDiv = styled.div`
 background-color: #fff;
  margin-top: 2.5rem;
  color:#343a40;
  font-family:Arial, Helvetica, sans-serif;
  padding:20px;
  border-radius: 20px;
`;

const Info = styled.p`
 font-size: 25px;

 span{
     font-weight: bold;
     color:#fa5252;
 }
`;

const Precio = styled.p`
  font-size: 25px;

  span{
      font-weight:bold;
      color:#fa5252
  }
`;

const Titulo = styled.h2`
font-size: 25px;
text-align:center;
span{
    font-weight: bold;
       
}
`;

const Cotizado = ({cotizado,moneda}) => {

    // comprueba si cotizado tiene contenido, sino no sigue ejcutando el codigo
    if(Object.keys(cotizado).length === 0) return null;
    const simbolo = cotizado.FROMSYMBOL;

    return ( 
      <CotizadoDiv>
          <Titulo><span>{simbolo}</span> TO {moneda}</Titulo>
          <Precio>precio: <span>{cotizado.PRICE}</span></Precio>
          <Info>precio mas alto: <span>{cotizado.HIGHDAY}</span></Info>
          <Info>precio mas bajo: <span>{cotizado.LOWDAY}</span></Info>
          <Info>Variacion ultimas 24hrs: <span>{cotizado.CHANGEPCT24HOUR}</span></Info>
          <Info>Ultima actualizacion: <span>{cotizado.LASTUPDATE}</span></Info>
      </CotizadoDiv>
     );
}

Cotizado.propTypes = { 
 cotizado: PropTypes.object.isRequired,
 moneda:PropTypes.string.isRequired,
}
 
export default Cotizado;