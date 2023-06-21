import React, { Component } from 'react'
import ChatBot from 'react-simple-chatbot'
import { ThemeProvider } from 'styled-components'
import style from './Contenido.module.css'
import { Link } from 'react-router-dom';


const theme = {
    background: '#f5f8fb',
    headerBgColor: '#eb3449',
    headerFontColor: '#fff',
    headerFontSize: '20px',
    botBubbleColor: '#eb3449',
    botFontColor: '#fff',
    userBubbleColor: '#0cb3c9',
    userFontColor: '#fff',
}

export default class Contenido extends Component {
    render() {
        return (
            <div className={style.container}>
                 <Link className={style.linke}  to="/">
                    <button className={style.closeButton}>X</button>
                  </Link>
            <ThemeProvider  theme={theme}> 
                <ChatBot className={style.chat}
                    steps={[
                        { 
                        id: '1',
                        message: 'Hola! Soy el Chatbot del hotel Eterno. ¿Cuál es tu nombre?',
                        trigger: '2',
                      },
                      {
                        id: '2',
                        user: true,
                        validator: (value) => {
                          if (/^[A-Za-z]{1}[a-z]{1,15}$/.test(value)) {
                            return true;
                          } else {
                            return 'Please enter a valid name.';
                          }
                        },
                        trigger: '3',
                      },
                      {
                        id: '3',
                        message: 'Hola {previousValue}, ¡Gusto en conocerte!',
                        trigger: '4',
                      },
                      {
                        id: '4',
                        message: '¿Puedo ayudarte en algo?',
                        trigger: '5',
                      },
                      {
                        id: '5',
                        options: [
                          { value: 's', label: 'Sí', trigger: '6A' },
                          { value: 'n', label: 'No', trigger: '6B' },
                        ],
                      },
                      {
                        id: '6A',
                        message: 'Genial! Cuéntame qué estás buscando...',
                        trigger: 'seleccion',
                      },
                      {
                        id: '6B',
                        message: 'Perdón si no puedo ser de ayuda para ti, ¡nos vemos luego!',
                        end: true,
                      },
                      {
                        id: 'seleccion',
                        options: [
                          { value: 'f', label: 'Habitaciones', trigger: '7A' },
                          { value: 'b', label: 'Paquetes', trigger: '7B' },
                        ],
                      },
                      {
                        id: '7A',
                        message: 'Veo que elegiste Habitaciones. ¿Qué te interesa sobre ellas?',
                        trigger: 'seleccionHabitaciones',
                      },
                      {
                        id: '7B',
                        message: 'Veo que elegiste Paquetes. ¿Qué te interesa sobre ellos?',
                        trigger: 'seleccionPaquetes',
                      },
                      {
                        id: 'seleccionHabitaciones',
                        options: [
                            { label: 'Capacidad', trigger: 'capacidad' },
                          { label: 'Precio', trigger: 'precio' },
                          
                          { label: 'Disponibilidad', trigger: 'disponibilidad' },
                        ],
                      },
                        {
                            id: "seleccionPaquetes",
                            options: [
                                { label: "Paquetes", trigger: "9D"},
                                {label: "Precios", trigger: "9E"},
                                {label: "Dias", trigger: "9F"},
                            ]
                        },
                        {
                            id: 'capacidad',
                            message: 'La capacidad de nuestras habitaciones es de 2 a 7 personas',
                            trigger: 'preguntaVuelta',
                          },
                          {
                            id: 'disponibilidad',
                            message: 'Puedes consultar la disponibilidad de las mismas ingresando a la opción RESERVAR',
                            trigger: 'preguntaVuelta',
                          },
                        {
                            id: 'precio',
                            message: 'Nuestras habitaciones tienen un precio desde $200 a $700 la noche dependiendo de la capacidad',
                            trigger: 'preguntaVuelta',
                          },
                          {
                            id: 'capacidad',
                            message: 'La capacidad de nuestras habitaciones es de 2 a 7 personas',
                            trigger: 'preguntaVuelta',
                          },
                          {
                            id: 'disponibilidad',
                            message: 'Puedes consultar la disponibilidad de las mismas ingresando a la opción RESERVAR',
                            trigger: 'preguntaVuelta',
                          },
                        {
                            id: "9D",
                            message: "Para conocer nuestros paquetes puedes ingresar en nuesta pagina de inicia a la opcion Paquetes",
                            trigger: "preguntaVuelta",
                        },
                        {
                            id: "9E",
                            message: "Los precios de nuestros paquetes son de $370 a $580 dependiendo de la cantidad de dias",
                            trigger: "preguntaVuelta",
                        
                        },
                        {
                            id: "9F",
                            message: "El paquete mas chico es de 3 dias y 2 noches y el mas grande es de 6 dias y 5 noches",
                            trigger: "preguntaVuelta",
                            
                        },
                        {
                            id: "preguntaVuelta",
                            message: "Necesitas algo mas?",
                            trigger: "respuestaVuelta",
                        }, 
                        {
                            id: "respuestaVuelta",
                            options: [
                                {value: "s", label: "Si", trigger: "6A"},
                                {value: "n", label: "No", trigger: "6B"},
                            ],
                        }
                    ]}
                />
            </ThemeProvider>
            </div>
        )
    }
}
