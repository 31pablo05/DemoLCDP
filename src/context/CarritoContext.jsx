import { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from 'react';

// Crear el contexto
const CarritoContext = createContext();

// Tipos de acciones para el reducer
const ACTIONS = {
  CARGAR_CARRITO: 'CARGAR_CARRITO',
  AGREGAR_PRODUCTO: 'AGREGAR_PRODUCTO',
  ELIMINAR_PRODUCTO: 'ELIMINAR_PRODUCTO',
  ACTUALIZAR_CANTIDAD: 'ACTUALIZAR_CANTIDAD',
  LIMPIAR_CARRITO: 'LIMPIAR_CARRITO',
};

// Estado inicial del carrito
const estadoInicial = {
  productos: [],
  total: 0,
  cantidadItems: 0,
};

// Reducer para manejar las acciones del carrito
function carritoReducer(estado, accion) {
  switch (accion.type) {
    case ACTIONS.CARGAR_CARRITO:
      return accion.payload;

    case ACTIONS.AGREGAR_PRODUCTO: {
      const productoExistente = estado.productos.find(
        p => p.id === accion.payload.id && 
            p.sabor === accion.payload.sabor && 
            p.tipo === accion.payload.tipo
      );

      let nuevosProductos;
      if (productoExistente) {
        // Si el producto ya existe, actualizar cantidad
        nuevosProductos = estado.productos.map(p =>
          p.id === accion.payload.id && 
          p.sabor === accion.payload.sabor && 
          p.tipo === accion.payload.tipo
            ? {
                ...p,
                cantidad: p.cantidad + accion.payload.cantidad,
                subtotal: (p.cantidad + accion.payload.cantidad) * p.precio
              }
            : p
        );
      } else {
        // Si es un producto nuevo, agregarlo
        nuevosProductos = [...estado.productos, {
          ...accion.payload,
          subtotal: accion.payload.cantidad * accion.payload.precio
        }];
      }

      const nuevoTotal = nuevosProductos.reduce((sum, p) => sum + p.subtotal, 0);
      const nuevaCantidad = nuevosProductos.reduce((sum, p) => sum + p.cantidad, 0);

      return {
        productos: nuevosProductos,
        total: nuevoTotal,
        cantidadItems: nuevaCantidad,
      };
    }

    case ACTIONS.ELIMINAR_PRODUCTO: {
      const nuevosProductos = estado.productos.filter(
        p => !(p.id === accion.payload.id && 
               p.sabor === accion.payload.sabor && 
               p.tipo === accion.payload.tipo)
      );

      const nuevoTotal = nuevosProductos.reduce((sum, p) => sum + p.subtotal, 0);
      const nuevaCantidad = nuevosProductos.reduce((sum, p) => sum + p.cantidad, 0);

      return {
        productos: nuevosProductos,
        total: nuevoTotal,
        cantidadItems: nuevaCantidad,
      };
    }

    case ACTIONS.ACTUALIZAR_CANTIDAD: {
      if (accion.payload.cantidad <= 0) {
        // Si la cantidad es 0 o menor, eliminar el producto
        return carritoReducer(estado, {
          type: ACTIONS.ELIMINAR_PRODUCTO,
          payload: accion.payload
        });
      }

      const nuevosProductos = estado.productos.map(p =>
        p.id === accion.payload.id && 
        p.sabor === accion.payload.sabor && 
        p.tipo === accion.payload.tipo
          ? {
              ...p,
              cantidad: accion.payload.cantidad,
              subtotal: accion.payload.cantidad * p.precio
            }
          : p
      );

      const nuevoTotal = nuevosProductos.reduce((sum, p) => sum + p.subtotal, 0);
      const nuevaCantidad = nuevosProductos.reduce((sum, p) => sum + p.cantidad, 0);

      return {
        productos: nuevosProductos,
        total: nuevoTotal,
        cantidadItems: nuevaCantidad,
      };
    }

    case ACTIONS.LIMPIAR_CARRITO:
      return estadoInicial;

    default:
      return estado;
  }
}

// Provider del contexto
export function CarritoProvider({ children }) {
  const [carrito, dispatch] = useReducer(carritoReducer, estadoInicial);

  // Cargar carrito del localStorage al inicializar
  useEffect(() => {
    const carritoGuardado = localStorage.getItem('carritoLaCasaDelPollo');
    if (carritoGuardado) {
      try {
        const carritoParseado = JSON.parse(carritoGuardado);
        dispatch({ type: ACTIONS.CARGAR_CARRITO, payload: carritoParseado });
      } catch (error) {
        console.error('Error al cargar carrito del localStorage:', error);
      }
    }
  }, []);

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('carritoLaCasaDelPollo', JSON.stringify(carrito));
  }, [carrito]);

  // Funciones para interactuar con el carrito - memoizadas con useCallback
  const agregarProducto = useCallback((producto) => {
    dispatch({ type: ACTIONS.AGREGAR_PRODUCTO, payload: producto });
  }, []);

  const eliminarProducto = useCallback((producto) => {
    dispatch({ type: ACTIONS.ELIMINAR_PRODUCTO, payload: producto });
  }, []);

  const actualizarCantidad = useCallback((producto, nuevaCantidad) => {
    dispatch({ 
      type: ACTIONS.ACTUALIZAR_CANTIDAD, 
      payload: { ...producto, cantidad: nuevaCantidad } 
    });
  }, []);

  const limpiarCarrito = useCallback(() => {
    dispatch({ type: ACTIONS.LIMPIAR_CARRITO });
  }, []);

  // Función para generar el mensaje de WhatsApp
  const generarMensajeWhatsApp = useCallback((datosCliente) => {
    const { nombre, celular, tipoEntrega, direccion, sucursal, metodoPago, comentarios } = datosCliente;
    
    let mensaje = `🐔 *NUEVO PEDIDO - LA CASA DEL POLLO*\n\n`;
    mensaje += `👤 *Cliente:* ${nombre}\n`;
    mensaje += `📱 *Celular:* ${celular}\n\n`;
    mensaje += `📦 *DETALLE DEL PEDIDO:*\n`;
    mensaje += `━━━━━━━━━━━━━━━━\n`;

    carrito.productos.forEach(producto => {
      mensaje += `- ${producto.cantidad} ${producto.unidad} - ${producto.nombre}\n`;
      if (producto.sabor) {
        mensaje += `  Sabor: ${producto.sabor}\n`;
      }
      if (producto.tipo) {
        mensaje += `  Tipo: ${producto.tipo}\n`;
      }
      mensaje += `  💰 $${producto.subtotal.toFixed(2)}\n`;
    });

    mensaje += `━━━━━━━━━━━━━━━━\n`;
    mensaje += `💵 *TOTAL: $${carrito.total.toFixed(2)}*\n\n`;
    mensaje += `🚚 *TIPO DE ENTREGA:*\n`;
    
    if (tipoEntrega === 'retiro') {
      mensaje += `Retiro en local\n`;
      mensaje += `📍 Sucursal: ${sucursal}\n\n`;
    } else {
      mensaje += `Delivery\n`;
      mensaje += `📍 Dirección: ${direccion}\n\n`;
    }

    mensaje += `💳 *MÉTODO DE PAGO:*\n`;
    mensaje += `${metodoPago === 'efectivo' ? 'Efectivo' : 'Transferencia'}\n\n`;

    if (comentarios) {
      mensaje += `📝 *Comentarios:*\n`;
      mensaje += `${comentarios}\n\n`;
    }

    mensaje += `━━━━━━━━━━━━━━━━\n`;
    mensaje += `_Pedido realizado desde lacasadelpollo.com.ar_`;

    return mensaje;
  }, [carrito]);

  const enviarPedidoWhatsApp = useCallback((datosCliente, numeroWhatsApp = "5492804123456") => {
    const mensaje = generarMensajeWhatsApp(datosCliente);
    const mensajeCodificado = encodeURIComponent(mensaje);
    const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;
    
    // Abrir WhatsApp en una nueva pestaña
    window.open(urlWhatsApp, '_blank');
    
    return { exito: true, mensaje: "Tu pedido está listo para enviarse por WhatsApp" };
  }, [generarMensajeWhatsApp]);

  // Memoizar el valor del contexto para evitar re-renders innecesarios
  const valor = useMemo(() => ({
    carrito,
    agregarProducto,
    eliminarProducto,
    actualizarCantidad,
    limpiarCarrito,
    generarMensajeWhatsApp,
    enviarPedidoWhatsApp,
  }), [carrito, agregarProducto, eliminarProducto, actualizarCantidad, limpiarCarrito, generarMensajeWhatsApp, enviarPedidoWhatsApp]);

  return (
    <CarritoContext.Provider value={valor}>
      {children}
    </CarritoContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useCarrito() {
  const contexto = useContext(CarritoContext);
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
  }
  return contexto;
}