import { useState } from 'react';
import { User, Phone, MapPin, CreditCard, MessageSquare, CheckCircle, ArrowLeft, Send } from 'lucide-react';
import { useCarrito } from '../context/CarritoContext';

const FormularioCliente = ({ isOpen, onClose, onVolver }) => {
  const { carrito, enviarPedidoWhatsApp, limpiarCarrito } = useCarrito();
  
  // Estados del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    celular: '',
    tipoEntrega: '', // 'retiro' o 'delivery'
    sucursal: '',
    direccion: '',
    barrio: '',
    metodoPago: '', // 'efectivo' o 'transferencia'
    comentarios: ''
  });

  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  if (!isOpen) return null;

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo al empezar a escribir
    if (errores[name]) {
      setErrores(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validar formulario
  const validarFormulario = () => {
    const nuevosErrores = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      nuevosErrores.nombre = 'El nombre es obligatorio';
    } else if (formData.nombre.trim().length < 2) {
      nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres';
    }

    // Validar celular
    if (!formData.celular.trim()) {
      nuevosErrores.celular = 'El número de celular es obligatorio';
    } else if (!/^\d{10,}$/.test(formData.celular.replace(/\s/g, ''))) {
      nuevosErrores.celular = 'Ingresá un número de celular válido (10 dígitos mínimo)';
    }

    // Validar tipo de entrega
    if (!formData.tipoEntrega) {
      nuevosErrores.tipoEntrega = 'Seleccioná un tipo de entrega';
    }

    // Validar sucursal si es retiro
    if (formData.tipoEntrega === 'retiro' && !formData.sucursal) {
      nuevosErrores.sucursal = 'Seleccioná una sucursal para el retiro';
    }

    // Validar dirección si es delivery
    if (formData.tipoEntrega === 'delivery') {
      if (!formData.direccion.trim()) {
        nuevosErrores.direccion = 'La dirección es obligatoria para delivery';
      }
      if (!formData.barrio.trim()) {
        nuevosErrores.barrio = 'El barrio es obligatorio para delivery';
      }
    }

    // Validar método de pago
    if (!formData.metodoPago) {
      nuevosErrores.metodoPago = 'Seleccioná un método de pago';
    }

    return nuevosErrores;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const nuevosErrores = validarFormulario();
    
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    setEnviando(true);

    try {
      // Preparar datos para WhatsApp
      const datosParaWhatsApp = {
        ...formData,
        direccion: formData.tipoEntrega === 'delivery' 
          ? `${formData.direccion}, ${formData.barrio}` 
          : undefined
      };

      // Enviar a WhatsApp
      const resultado = enviarPedidoWhatsApp(datosParaWhatsApp);
      
      if (resultado.exito) {
        setPedidoEnviado(true);
        
        // Limpiar carrito después de 3 segundos
        setTimeout(() => {
          limpiarCarrito();
          onClose();
          setPedidoEnviado(false);
          setFormData({
            nombre: '',
            celular: '',
            tipoEntrega: '',
            sucursal: '',
            direccion: '',
            barrio: '',
            metodoPago: '',
            comentarios: ''
          });
        }, 3000);
      }
    } catch (error) {
      console.error('Error al enviar pedido:', error);
      alert('Hubo un error al enviar el pedido. Por favor intentá nuevamente.');
    } finally {
      setEnviando(false);
    }
  };

  // Si el pedido fue enviado, mostrar confirmación
  if (pedidoEnviado) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center animate-scale-in">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-neutral-dark mb-4">¡Pedido Enviado!</h3>
          <p className="text-gray-600 mb-6">
            Tu pedido está listo para enviarse por WhatsApp. En un momento serás redirigido automáticamente.
          </p>
          <div className="bg-neutral-cream rounded-xl p-4">
            <p className="text-sm text-gray-600">
              📱 Revisá tu WhatsApp para confirmar el pedido con nosotros
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-neutral-cream">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={onVolver}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-xl font-bold text-neutral-dark">Datos del Pedido</h2>
                <p className="text-sm text-gray-600">Completá tus datos para finalizar</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          {/* Datos personales */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-dark mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-primary-red" />
              Datos Personales
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Tu nombre completo"
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-primary-red focus:border-transparent ${
                    errores.nombre ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errores.nombre && (
                  <p className="text-red-500 text-sm mt-1">{errores.nombre}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número de Celular *
                </label>
                <input
                  type="tel"
                  name="celular"
                  value={formData.celular}
                  onChange={handleInputChange}
                  placeholder="2804123456"
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-primary-red focus:border-transparent ${
                    errores.celular ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errores.celular && (
                  <p className="text-red-500 text-sm mt-1">{errores.celular}</p>
                )}
              </div>
            </div>
          </div>

          {/* Tipo de entrega */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-dark mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary-red" />
              Tipo de Entrega
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                formData.tipoEntrega === 'retiro'
                  ? 'border-primary-red bg-primary-red bg-opacity-10'
                  : 'border-gray-200 hover:border-primary-red'
              }`}>
                <input
                  type="radio"
                  name="tipoEntrega"
                  value="retiro"
                  checked={formData.tipoEntrega === 'retiro'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-2xl mb-2">🏪</div>
                  <h4 className="font-semibold">Retiro en Local</h4>
                  <p className="text-sm text-gray-600">Gratis • Listo en 30 min</p>
                </div>
              </label>

              <label className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                formData.tipoEntrega === 'delivery'
                  ? 'border-primary-red bg-primary-red bg-opacity-10'
                  : 'border-gray-200 hover:border-primary-red'
              }`}>
                <input
                  type="radio"
                  name="tipoEntrega"
                  value="delivery"
                  checked={formData.tipoEntrega === 'delivery'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-2xl mb-2">🚚</div>
                  <h4 className="font-semibold">Delivery</h4>
                  <p className="text-sm text-gray-600">Gratis +$15.000 • 45-60 min</p>
                </div>
              </label>
            </div>
            
            {errores.tipoEntrega && (
              <p className="text-red-500 text-sm mt-2">{errores.tipoEntrega}</p>
            )}
          </div>

          {/* Sucursal (solo si es retiro) */}
          {formData.tipoEntrega === 'retiro' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sucursal para Retiro *
              </label>
              <div className="space-y-2">
                <label className={`p-3 border-2 rounded-xl cursor-pointer flex items-center transition-all ${
                  formData.sucursal === 'Av. Yrigoyen 923'
                    ? 'border-primary-red bg-primary-red bg-opacity-10'
                    : 'border-gray-200 hover:border-primary-red'
                }`}>
                  <input
                    type="radio"
                    name="sucursal"
                    value="Av. Yrigoyen 923"
                    checked={formData.sucursal === 'Av. Yrigoyen 923'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span>📍 Av. Yrigoyen 923, Trelew</span>
                </label>
                
                <label className={`p-3 border-2 rounded-xl cursor-pointer flex items-center transition-all ${
                  formData.sucursal === 'Musters 1938'
                    ? 'border-primary-red bg-primary-red bg-opacity-10'
                    : 'border-gray-200 hover:border-primary-red'
                }`}>
                  <input
                    type="radio"
                    name="sucursal"
                    value="Musters 1938"
                    checked={formData.sucursal === 'Musters 1938'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <span>📍 Musters 1938, Trelew</span>
                </label>
              </div>
              {errores.sucursal && (
                <p className="text-red-500 text-sm mt-2">{errores.sucursal}</p>
              )}
            </div>
          )}

          {/* Dirección (solo si es delivery) */}
          {formData.tipoEntrega === 'delivery' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección Completa *
                </label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  placeholder="Calle, número y referencias"
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-primary-red focus:border-transparent ${
                    errores.direccion ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errores.direccion && (
                  <p className="text-red-500 text-sm mt-1">{errores.direccion}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Barrio o Zona *
                </label>
                <input
                  type="text"
                  name="barrio"
                  value={formData.barrio}
                  onChange={handleInputChange}
                  placeholder="Tu barrio"
                  className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-primary-red focus:border-transparent ${
                    errores.barrio ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errores.barrio && (
                  <p className="text-red-500 text-sm mt-1">{errores.barrio}</p>
                )}
              </div>
            </div>
          )}

          {/* Método de pago */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-dark mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-primary-red" />
              Método de Pago
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                formData.metodoPago === 'efectivo'
                  ? 'border-primary-red bg-primary-red bg-opacity-10'
                  : 'border-gray-200 hover:border-primary-red'
              }`}>
                <input
                  type="radio"
                  name="metodoPago"
                  value="efectivo"
                  checked={formData.metodoPago === 'efectivo'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-2xl mb-2">💵</div>
                  <h4 className="font-semibold">Efectivo</h4>
                  <p className="text-sm text-gray-600">Pagás al recibir</p>
                </div>
              </label>

              <label className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                formData.metodoPago === 'transferencia'
                  ? 'border-primary-red bg-primary-red bg-opacity-10'
                  : 'border-gray-200 hover:border-primary-red'
              }`}>
                <input
                  type="radio"
                  name="metodoPago"
                  value="transferencia"
                  checked={formData.metodoPago === 'transferencia'}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <div className="text-center">
                  <div className="text-2xl mb-2">💳</div>
                  <h4 className="font-semibold">Transferencia</h4>
                  <p className="text-sm text-gray-600">Te pasamos los datos</p>
                </div>
              </label>
            </div>
            
            {errores.metodoPago && (
              <p className="text-red-500 text-sm mt-2">{errores.metodoPago}</p>
            )}
          </div>

          {/* Comentarios adicionales */}
          <div>
            <h3 className="text-lg font-semibold text-neutral-dark mb-4 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-primary-red" />
              Comentarios Adicionales
            </h3>
            
            <textarea
              name="comentarios"
              value={formData.comentarios}
              onChange={handleInputChange}
              placeholder="Aclaraciones sobre tu pedido, preferencias de horario, etc. (opcional)"
              rows="3"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-red focus:border-transparent"
            />
          </div>

          {/* Resumen del pedido */}
          <div className="bg-neutral-cream rounded-xl p-4">
            <h4 className="font-semibold text-neutral-dark mb-2">Resumen del Pedido:</h4>
            <div className="flex justify-between items-center text-lg font-bold text-primary-red">
              <span>Total: ${carrito.total.toLocaleString()}</span>
              <span>{carrito.cantidadItems} productos</span>
            </div>
          </div>

          {/* Botones */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={onVolver}
              className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Volver al Carrito
            </button>
            
            <button
              type="submit"
              disabled={enviando}
              className="flex-1 bg-primary-red hover:bg-primary-orange-red text-white font-bold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {enviando ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Finalizar Pedido</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioCliente;