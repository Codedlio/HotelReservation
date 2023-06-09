const Pago= require('../models/Pago');
const Habitacion= require('../models/Habitacion');
require('dotenv').config()
const keyStripe = process.env.STRIPE_PRIVATE_KEY
const stripe = require('stripe')(keyStripe);


const createSession = async (req, res) => {
  const { arrIdHabitaciones, customerId } = req.body;
  try {
    const lineItems = [];
    for (const habitacionId of arrIdHabitaciones) {
      const habitacion = await Habitacion.findById(habitacionId);
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: habitacion.nombre,
            description: habitacion.descripcion
          },
          unit_amount: habitacion.precio * 100 // Asegúrate de convertir el precio a centavos si Stripe trabaja con la menor unidad monetaria
        },
        quantity: 1
      });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      customer: customerId,
      mode: 'payment',
      success_url: "http://localhost:3000/contenedor",
      cancel_url: "http://localhost:3000/ingresar",
    });

    console.log(session);
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const createCustumer= async (req, res) => {
  const { nombre, correo } = req.body;
  try {
      
    

      const customer = await stripe.customers.create({ 
          name: nombre,
          email: correo
         
      });
      const crearUsuario = new Pago({
        nombre,
        correo,
        stripeCustomerId: customer.id
      });
      //console.log(customer);
      console.log("Email",customer.email);
      await crearUsuario.save();
   
      res.send({ message: `Cliente creado exitosamente: ${customer.id}` });
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};
const paymentStatus =async (req, res) => {
  const { sessionId } = req.body;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Verificar el estado del pago y realizar acciones adicionales según sea necesario
    if (session.payment_status === 'paid') {
      // Actualizar el estado del pedido en la base de datos
      // Realizar cualquier acción adicional necesaria
      res.status(200).json({ message: 'Pago exitoso' });
    } else {
      res.status(400).json({ message: 'El pago no fue exitoso' });
    }
  } catch (error) {
    console.error('Error al procesar el pago:', error);
    res.status(500).json({ message: 'Error al procesar el pago' });
  }
};
module.exports ={createSession,createCustumer,paymentStatus};