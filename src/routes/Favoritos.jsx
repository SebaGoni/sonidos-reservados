import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../components/utils/global_context';
import { Link } from 'react-router-dom';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import styled from 'styled-components';

const Favoritos = () => {

    const { productosFavoritos, eliminarProductoFavorito, agregarProductoFavorito, token } = useContext(GlobalContext);

    const [ratings, setRatings] = useState({});

    useEffect(() => {
      productosFavoritos.forEach(product => {
        obtenerValoraciones(product.id);
      });
    }, [productosFavoritos]);
  
    const obtenerValoraciones = (productId) => {
      fetch(`http://ec2-54-198-119-206.compute-1.amazonaws.com:8080/valoraciones/producto/${productId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && data.length > 0) {
            const ratingsCopy = { ...ratings };
            const average = calcularPromedio(data);
            ratingsCopy[productId] = average;
            setRatings(ratingsCopy);
          }
        })
        .catch((error) => {
          console.error('Error al obtener las valoraciones', error);
        });
    };
  
    const calcularPromedio = (ratings) => {
      const sum = ratings.reduce((accumulator, currentValue) => accumulator + currentValue.rating, 0);
      return sum / ratings.length;
    };
  
    const renderStars = (averageRating) => {
      const starIcons = [];
      for (let i = 1; i <= 5; i++) {
        if (i <= Math.round(averageRating)) {
          starIcons.push(<AiFillStar key={i} className='star' />);
        } else {
          starIcons.push(<AiOutlineStar key={i} className='star' />);
        }
      }
      return (
        <div className='stars'>
          {starIcons}
        </div>
      );
    };
  
    const estaEnFavoritos = (productId) => {
      return productosFavoritos.some(producto => producto.id === productId);
    };

    const handleEliminarFavorito = (idProducto) => {
      eliminarProductoFavorito(idProducto);
    };
  
    const handleAgregarFavorito = (producto) => {
      agregarProductoFavorito(producto);
    };

  return (
    <Recomendaciones>
      <div className='productos'>
          <TitleContainer>
              <h2>PRODUCTOS FAVORITOS</h2>
          </TitleContainer>
        <div className='container-items'>
          {productosFavoritos.map(product => (
            <div className='item' key={product.id}>
            <figure>
              <img src={product.image} alt={product.title} className='cardImage' />
            </figure>
            <div className='info-product'>
              <Link className='link' to={`/details/${product.id}`} key={product.id}>
                <h3>{product.title}</h3>
              </Link> 
            </div>
            {ratings[product.id] && renderStars(ratings[product.id])}
            {token && (
              <>
                {estaEnFavoritos(product.id) ? (
                  <FaHeart className='heartIconFilled' onClick={() => handleEliminarFavorito(product.id)} />
                ) : (
                  <FaRegHeart className='heartIconFilled' onClick={() => handleAgregarFavorito(product)} />
                )}
              </>
            )}
          </div>
          ))}
        </div>
      </div>
  </Recomendaciones>
  )
}

export default Favoritos

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: solid black;
  margin: 2rem;
  padding: 1rem 1rem 0 1rem;
  h2{
    color: black;
    font-family: 'Poppins', sans-serif;
    @media(min-width: 1000px){
      font-size:2rem;
    }
    @media(max-width: 1000px){
      font-size:1.8rem;
      text-align: center;
      
    }
  }
  .pages{
    @media(max-width: 700px){
      display: none;
    }
  }
  .iconArrow{
    margin-right: 2rem;
    font-size: 2.5rem;
    color: black;
    cursor: pointer;
  }
`

const Recomendaciones = styled.div`
    margin: 25vh 2rem 2rem 2rem;
    padding: 1rem;
    background-color: white;
    border-radius:  20px;
    display: block;
    .link {
      color: #000000;
      border-bottom: 1px solid transparent; 
    }
    .star {
      color: #3F51B5;
    }
    .heartIconFilled{
      position: absolute;
      top: 40px;
      right: 40px;
      color: #3F51B5;
      font-size: 40px;
      cursor: pointer;
    }
    .container-items{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .item{
        position: relative;
        border-radius: 20px;
        justify-content: center;
        align-items: center;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
        flex: 0 0 calc(50% - 50px);
        text-align: center;
        height: 400px;
        width: 300px;
        @media(min-width: 1000px){
          width: 40vw; 
          margin:1rem;
        }
        @media(max-width: 1000px){
          width: 70vw;
          margin:auto;
        }
    }
    h3{
        margin: 2rem;
        padding: 1rem;
        color:black;
        font-family: 'Poppins', sans-serif;
        @media(min-width: 1000px){
          font-size:1.5rem;
        }
        @media(max-width: 1000px){
          font-size:1.3rem;
        }
    }

    .cardImage{
      height: 200px;
      width: 200px;
      object-fit: cover;
      @media(min-width: 1000px){
        
        }
      @media(max-width: 1000px){
        width: 50vw;  
        }
    }

    .linkProducts{
      text-decoration: none;
    }

    .titleProducts{
      text-align: center;
      border-radius: 20px;
      color: white;
      background-color: black;
      transition: background-color 300ms ease-in-out;
      padding: 20px;
    }

    .titleProducts:hover{
      background-color: #000000ec;
    }
    
`