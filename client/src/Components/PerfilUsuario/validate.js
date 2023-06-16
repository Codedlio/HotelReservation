const validate = (object) => {
    let error = {};
    if(object.descripcion.length < 15) {error.descripcion = "Descripcion debe tener al menos 15 caracteres"};
    if (isNaN(object.puntuacion)) { error.puntuacion = "La puntuación debe ser un número."};
    if (object.puntuacion > 5 || object.puntuacion <= 0) { error.puntuacion = "La puntuación debe estar entre 1 y 5."}

return error;
};
export default validate;