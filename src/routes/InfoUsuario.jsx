import React from 'react'
import { useContext } from 'react';
import styled from 'styled-components'
import { GlobalContext } from '../components/utils/global_context';
import { IoPerson } from 'react-icons/io5'

const InfoUsuario = () => {

     const { firstname, lastname, email, userRol } = useContext(GlobalContext);

  return (
    <FormContainer>
        <h2>INFORMACIÓN PERSONAL</h2>
            <div className='divBodyInfo'>
                <div>
                    <IoPerson className='icon'/>
                </div>
                <div className='divImages'>
                    <div className='divSectionImages1'>
                        <h2>Nombre: <span>{firstname}</span></h2>
                        <h2>Apellido: <span>{lastname}</span></h2>
                    </div>
                    <div className='divSectionImages2'>
                        <h2>Correo electrónico: <span>{email}</span></h2>
                        <h2>Rol: <span>{userRol}</span></h2>
                    </div>
                </div>
            </div>
    </FormContainer>
    )
    }

export default InfoUsuario

const FormContainer = styled.div`
    border-radius:  20px;
    margin: auto;
    margin: 200px 2rem 50px 2rem;
    height: 400px;
    background-color: white;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4rem;
    font-family: 'Poppins', sans-serif;
    text-align: center; 
    .icon{
        font-size: 300px;
        padding: 30px;
        background:#3F51B5;
        background-image: linear-gradient(#7E57C2 50%, #3F51B5);
        border-radius: 100%;
    }
    .divBodyInfo{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 40px;
        padding-top: 40px;
    }
`
