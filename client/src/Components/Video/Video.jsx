import React from 'react';
import style from './Video.module.css';
// import LazyLoad from 'react-lazyload';


const VideoPlayer = () => {
  return (
    <div className={style.container}>
        {/* <LazyLoad>
            <video className={style.player} 
            // src={video}
             alt='' autoPlay muted />
            </LazyLoad>
       */}
      <div className={style.overlay}>
        <div className={style.overlayContent}>
          <h2>La experiencia de<br></br> Nombre te revitaliza!</h2>
          <h3>¡Descubre la belleza y la tranquilidad de la montaña en<br></br> nuestro hotel único!
          <br></br>
Imagina despertar cada mañana con vistas panorámicas de<br></br> majestuosas montañas, respirar el aire fresco y puro mientras <br></br>te relajas en nuestro entorno natural y disfrutar de actividades<br></br>  emocionantes al aire libre.</h3>
          <button>Conózcanos</button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
