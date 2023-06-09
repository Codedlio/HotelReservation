import React from 'react';
import style from './Video.module.css';
import { Link } from 'react-router-dom';

// import video from './Hotel video.mp4';


const VideoPlayer = () => {
  return (
    <div className={style.container}>
        
            {/* (<video className={style.player} src={video} alt='' autoPlay muted />) */}
            
      
      <div className={style.overlay}>
        <div className={style.overlayContent}>
          <h2>La experiencia de<br></br> Eterno te revitaliza!</h2>
          <h3>¡Descubre la belleza y la tranquilidad de la montaña en<br></br> nuestro hotel único!
          <br></br>
Imagina despertar cada mañana con vistas panorámicas de<br></br> majestuosas montañas, respirar el aire fresco y puro mientras <br></br>te relajas en nuestro entorno natural y disfrutar de actividades<br></br>  emocionantes al aire libre.</h3>
<Link  to="/historia">
<button>Conózcanos</button>
  </Link>
          
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
// import React from 'react';
// import style from './Video.module.css';
// import { Link } from 'react-router-dom';
// import video from './Hotel video.mp4';

// const VideoPlayer = () => {
//   return (
//     <div className={style.container}>
//       <video className={style.player} src={video} alt='' autoPlay muted />
//       <div className={style.overlay}>
//         <div className={style.overlayContent}>
//           <h2>La experiencia de Eterno te revitaliza!</h2>
//           <h3>
//             ¡Descubre la belleza y la tranquilidad de la montaña en nuestro hotel único!
//             <br />
//             Imagina despertar cada mañana con vistas panorámicas de majestuosas montañas, respirar el aire fresco y puro mientras te relajas en nuestro entorno natural y disfrutar de actividades emocionantes al aire libre.
//           </h3>
//           <Link to="/historia">
//             <button>Conózcanos</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoPlayer;

