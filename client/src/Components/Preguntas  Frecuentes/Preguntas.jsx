import React, { useState } from 'react';
import style from './Preguntas.module.css';
import Accordion from 'react-bootstrap/Accordion';


function PreguntasFrecuentes() {
  const preguntas = [
    {
        pregunta: '¿Cuál es la la mejor epoca para visitarnos?',
        respuesta:
          'Cualquier época del año es ideal para visitar nuestras termas. Más allá de disfrutar los beneficios del agua termal, podrás conectarte con la naturaleza en medio del bosque nativo, el que se viste de diferentes colores dependiendo la época del año.'
      },
      {
        pregunta: '¿Como son las Habitaciones?',
        respuesta:
          'Todas las habitaciones son amplias y con vistas exceletes. Las cabañas poseen diferentes ambientes ademas de una terraza.'
      },
      {
        pregunta: '¿Que clase de desayuno se sirve en el hotel?',
        respuesta:
          'En nuestro hotel, podrás disfrutar desayunos de tipo buffet y continental.'
      },
      {
        pregunta: '¿El hotel cuenta con estacionamiento?',
        respuesta:
          'El hotel efectivamente cuenta con estacionamiento exterior para todos sus huéspedes. Este estacionamiento no es privado'
      },
      {
        pregunta: '¿Cuentan con cunas para bebé?',
        respuesta:
          'Sí. Contamos con cunas para bebés en caso de que quieras venir a pasar tiempo junto a tus hijos en Eterno Hotel.'
      },
      {
      pregunta: '¿Cuál es la política de cancelación?',
      respuesta:
        'Nuestra política de cancelación permite cancelar sin cargo hasta 48 horas antes de la fecha de llegada. Si cancelas dentro de las 48 horas previas a la llegada, se cargará el costo de la primera noche de estadía.'
    },
    {
      pregunta: '¿Se permiten mascotas en las instalaciones?',
      respuesta: 'Lamentablemente, no permitimos mascotas en nuestras instalaciones.'
    },
    {
      pregunta: '¿Cuáles son los horarios de check-in y check-out?',
      respuesta:
        'El horario de check-in es a partir de las 15:00 horas y el horario de check-out es hasta las 12:00 horas.'
    },
    // Agrega más preguntas y respuestas según tus necesidades
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>Preguntas Frecuentes</h2>
      <Accordion>
        {preguntas.map((pregunta, index) => (
          <Accordion.Item key={index} eventKey={index.toString()}>
            <Accordion.Header className={style.pregunta} onClick={() => toggleAccordion(index)}>
              {pregunta.pregunta}
              
            </Accordion.Header>
            <Accordion.Body>
              <p className={style.respuesta}>{pregunta.respuesta}</p>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
}

export default PreguntasFrecuentes;
