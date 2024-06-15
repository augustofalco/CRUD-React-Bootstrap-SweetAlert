import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const Pedidos = () => {
  const [cantidadPollos, setCantidadPollos] = useState("");
  const [nombreCliente, setNombreCliente] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [localidades, setLocalidades] = useState([]);
  const [selectedLocalidad, setSelectedLocalidad] = useState("");
  const [estados, setEstados] = useState([]);
  const [selectedEstado, setSelectedEstado] = useState(0);
  const [selectedHour, setSelectedHour] = useState("");
  const [selectedMinute, setSelectedMinute] = useState("");
  const [selectedMetodoPago, setSelectedMetodoPago] = useState("");
  const [comida, setComida] = useState([]);
  const [selectedComida, setSelectedComida] = useState({});
  const [precioUnitario, setPrecioUnitario] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [detallesPedido, setDetallesPedido] = useState([]);
  // const [domicilio, setDomicilio] = useState("");
  const [calle, setCalle] = useState("");
  const [altura, setAltura] = useState("");
  const [piso, setPiso] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pedidosList, setPedidosList] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [error, setError] = useState(null);
  const [domicilios, setDomicilios] = useState([]);

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const handleMinuteChange = (event) => {
    setSelectedMinute(event.target.value);
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleChangeLocalidad = (event) => {
    setSelectedLocalidad(event.target.value);
  };

  // Una vez que el usuario selecciona la comida, se autocompleta su precioUnitario
  const handleChangeComida = (event) => {
    const selectedId = event.target.value;
    const selectedComida = comida.find((c) => c.id == selectedId);
    setSelectedComida(selectedComida);
    setPrecioUnitario(
      selectedComida ? selectedComida.cambioprecio[0].precio : ""
    );
    console.log(selectedComida);
  };

  const handleCantidadChange = (event) => {
    const cantidad = event.target.value;
    setCantidad(cantidad);
    const subtotal = precioUnitario * cantidad;
    setSubtotal(subtotal);
  };

  const handleEstadoChange = (event) => {
    setSelectedEstado(event.target.value);
    console.log(event.target.value);
  };

  const handleListoClick = () => {
    const nuevoDetalle = {
      comida: selectedComida,
      cantidad: cantidad,
      subtotal: subtotal,
    };
    setDetallesPedido([...detallesPedido, nuevoDetalle]);
    handleClose();
  };

  const calcularTotalOrden = () => {
    let total = 0;
    detallesPedido.forEach((detalle) => {
      total += detalle.subtotal;
    });
    return "$" + total.toLocaleString("es");
  };

  const handleNombreChange = (event) => {
    setNombreCliente(event.target.value);
  };

  const handleCalleChange = (event) => {
    setCalle(event.target.value);
  };

  const handleAlturaChange = (event) => {
    setAltura(event.target.value);
  };

  const handlePisoChange = (event) => {
    setPiso(event.target.value);
  };

  const handleDepartamentoChange = (event) => {
    setDepartamento(event.target.value);
  };

  const handleTelefonoChange = (event) => {
    setTelefono(event.target.value);
  };

  const limpiarCampos = () => {
    setNombreCliente("");
    setSelectedEstado("");
    setSelectedHour("");
    setSelectedMinute("");
    setDetallesPedido([]);
    setCalle("");
    setAltura("");
    setPiso("");
    setDepartamento("");
    setSelectedLocalidad("");
    setTelefono("");
  };

  const handleRegistrarClick = () => {
    // Concatenación del domicilio
    const domicilioConcatenado = `${calle} ${altura}, ${
      piso ? `Piso ${piso}, ` : ""
    }${departamento ? `Dpto ${departamento}, ` : ""}${selectedLocalidad}`;

    // Creación del objeto domicilio
    const domicilioData =
      calle && altura
        ? {
            calle: calle,
            altura: +altura,
            piso: piso || null,
            departamento: departamento || null,
            idLocalidad: +selectedLocalidad || null,
            observacion: domicilioConcatenado || null,
            telefono: telefono || null,
          }
        : null;

    // Creación del objeto data para la solicitud
    const data = {
      pedido: {
        nombreCliente: nombreCliente,
        idEstado: +selectedEstado,
        horaEntrega: `${selectedHour}:${selectedMinute}`,
      },
      detalles: detallesPedido,
      domicilio: domicilioData, // Incluir domicilioData en el objeto data
    };
    console.log(data);
    // Envío de la solicitud POST al backend
    axios
      .post("http://localhost:3001/api/pedido", data)
      .then((response) => {
        console.log("Pedido registrado:", response.data);
        setPedidos([...pedidos, response.data]);
        limpiarCampos();
      })
      .catch((error) => {
        console.error("Error al registrar pedido:", error);
        setError("Error al registrar el pedido. Intente nuevamente.");
      });
  };

  const getPedidos = () => {
    axios
      .get("http://localhost:3001/api/pedido")
      .then((response) => {
        setPedidos(response.data); // Actualizar el estado con los datos obtenidos
        console.log("Datos actualizados:", response.data);
      })
      .catch((error) => {
        console.error("Error al obtener datos actualizados:", error);
        setError(
          "Error al obtener los pedidos. Por favor, intenta nuevamente más tarde."
        );
        setPedidos([]); // Establecer pedidos como un array vacío en caso de error
      });
  };

  useEffect(() => {
    getPedidos();
  }, []);

  useEffect(() => {
    // Obtener LOCALIDADES, ESTADOS, MÉTODOS DE PAGO y COMIDAS
    axios
      .all([
        axios.get("http://localhost:3001/api/localidad"),
        axios.get("http://localhost:3001/api/estado"),
        axios.get("http://localhost:3001/api/comida"),
      ])
      .then(
        axios.spread((localidadResponse, estadoResponse, comidaResponse) => {
          setLocalidades(localidadResponse.data);
          setEstados(estadoResponse.data);
          setComida(comidaResponse.data);
          // console.log(estadoResponse.data);
        })
      )
      .catch((error) => {
        console.error("Error al obtener los datos:", error);
      });
  }, []);

  return (
    <div>
      <br />
      <div className="container">
        <div className="card text-center">
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-md-3 text-center bg-red-500">
                <span className="input-group-text" id="basic-addon1">
                  Cantidad de Pollos:
                </span>
                <input
                  type="number"
                  onChange={(event) => setCantidadPollos(event.target.value)}
                  className="form-control text-center"
                  value={cantidadPollos}
                  placeholder="Ingrese la cantidad de Pollos de HOY"
                  aria-label="Cantidad de Pollos"
                  aria-describedby="basic-addon1"
                />
              </div>
              <div className="col-md-3 text-center bg-red-500">
                <span className="input-group-text" id="basic-addon1">
                  Acciones:
                </span>
                <Modal.Footer>
                  <Button variant="success" /** onClick={handleListoClick} */>
                    Guardar
                  </Button>
                  <Button variant="secondary" /** onClick={handleClose}*/>
                    Cerrar
                  </Button>
                </Modal.Footer>
              </div>
              <div className="col text-center">
                <span className="input-group-text" id="basic-addon2">
                  Pollos Disponibles:
                </span>
                <input
                  type="text"
                  className="form-control text-center"
                  value={cantidadPollos}
                  readOnly
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <br />
        <div className="container">
          <div className="card text-center">
            <h3 className="card-header">REGISTRO de PEDIDOS</h3>
            <div className="card-body">
              <div className="row mb-3">
                {/* Columna de PEDIDOS */}
                <div className="col-md-4">
                  <h5>Pedido</h5>
                  {/* Agregar campos de PEDIDO */}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon3">
                      Nombre Cliente:
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Augusto"
                      onChange={handleNombreChange}
                      aria-label="Nombre Cliente"
                      aria-describedby="basic-addon3"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon5">
                      Hora de Entrega:
                    </span>
                    <select
                      className="form-control text-center"
                      value={selectedHour}
                      onChange={handleHourChange}
                      aria-label="Hora de Entrega - Horas"
                    >
                      <option value="" disabled>
                        00
                      </option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                    </select>
                    <select
                      className="form-control text-center"
                      value={selectedMinute}
                      onChange={handleMinuteChange}
                      aria-label="Hora de Entrega - Minutos"
                    >
                      <option value="" disabled>
                        00
                      </option>
                      <option value="00">00</option>
                      <option value="15">15</option>
                      <option value="30">30</option>
                      <option value="45">45</option>
                    </select>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon6">
                      Estado:
                    </span>
                    <select
                      className="form-control text-center"
                      value={selectedEstado}
                      onChange={handleEstadoChange}
                      aria-label="Estado"
                      aria-describedby="basic-addon6"
                    >
                      <option value="" disabled>
                        Seleccione un estado
                      </option>
                      {estados.map((estado) => (
                        <option key={estado.id} value={estado.id}>
                          {estado.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon4">
                      Observación:
                    </span>
                    <textarea
                      className="form-control"
                      placeholder="PAGADO"
                      aria-label="Observación"
                      aria-describedby="basic-addon4"
                      rows="3" // altura del text area
                    ></textarea>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon7">
                      Método Pago:
                    </span>
                    <select
                      className="form-control text-center"
                      value={selectedMetodoPago}
                      onChange={(e) => setSelectedMetodoPago(e.target.value)}
                      aria-label="Método de Pago"
                      aria-describedby="basic-addon7"
                    >
                      <option value="" disabled>
                        Seleccione un Método
                      </option>
                      <option value="Efectivo">Efectivo</option>
                      <option value="Transferencia">Transferencia</option>
                      <option value="Tarjeta">Tarjeta</option>
                    </select>
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <h1
                      className="input-group-text mr-3 mb-0"
                      id="basic-addon4"
                    >
                      Total:
                    </h1>
                    <input
                      type="text"
                      className="form-control"
                      value={calcularTotalOrden()}
                      readOnly
                    />
                  </div>
                </div>

                {/* Columna de DETALLE PEDIDO */}
                <div className="col-md-4">
                  <h5>Detalle Pedido</h5>
                  {/* Aquí puedes colocar el botón para abrir el modal */}
                  <Button variant="primary" onClick={handleShow}>
                    Nuevo Detalle Pedido
                  </Button>
                  <br />
                  {detallesPedido.map((detalle, index) => (
                    <p
                      key={index}
                    >{`${detalle.cantidad}x ${detalle.comida.nombre} = $${detalle.subtotal}`}</p>
                  ))}
                </div>

                {/* Columna de ENVÍO */}
                <div className="col-md-4">
                  <h5>Envío</h5>
                  {/* Agregar campos  de ENVÍO */}
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon4">
                      Calle:
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleCalleChange}
                      placeholder="Buenos Aires"
                      aria-label="Calle"
                      aria-describedby="basic-addon4"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon4">
                      Altura:
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleAlturaChange}
                      placeholder="1514"
                      aria-label="Altura"
                      aria-describedby="basic-addon4"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon4">
                      Piso:
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handlePisoChange}
                      placeholder="4"
                      aria-label="Piso"
                      aria-describedby="basic-addon4"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon4">
                      Departamento:
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleDepartamentoChange}
                      placeholder="B"
                      aria-label="Departamento"
                      aria-describedby="basic-addon4"
                    />
                  </div>
                  <div className="d-flex align-items-center mb-3">
                    <h1
                      className="input-group-text mr-3 mb-0"
                      id="basic-addon4"
                    >
                      Localidad:
                    </h1>
                    <select
                      className="form-control text-center"
                      value={selectedLocalidad}
                      onChange={handleChangeLocalidad}
                    >
                      <option value="" disabled>
                        Seleccione una localidad
                      </option>
                      {localidades.map((localidad) => (
                        <option key={localidad.id} value={localidad.id}>
                          {localidad.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon4">
                      Teléfono:
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      onChange={handleTelefonoChange}
                      placeholder="111222333"
                      aria-label="Teléfono"
                      aria-describedby="basic-addon4"
                    />
                  </div>
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon4">
                      Observación:
                    </span>
                    <textarea
                      className="form-control"
                      placeholder="Barrio Lamadrid. No funciona el timbre"
                      aria-label="Observación"
                      aria-describedby="basic-addon4"
                      rows="3" // altura del text area
                    ></textarea>
                  </div>
                  {/* Agregar más camposs de ENVÍO*/}
                </div>

                {/** BOTON PARA REGISTRAR PEDIDO */}
                <Button
                  variant="success"
                  className="w-25"
                  onClick={handleRegistrarClick}
                >
                  Registrar Pedido
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>DETALLE DE PEDIDO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center mb-3">
            <h1 className="input-group-text mr-3 mb-0" id="basic-addon4">
              Comida:
            </h1>
            <select
              className="form-control"
              value={selectedComida.id}
              onChange={handleChangeComida}
            >
              <option value="" disabled>
                Seleccione una Comida
              </option>
              {comida.map((comida) => (
                <option key={comida.id} value={comida.id}>
                  {comida.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="d-flex align-items-center mb-3">
            <h1 className="input-group-text mr-3 mb-0" id="basic-addon4">
              Precio Unitario:
            </h1>
            <input
              type="text"
              className="form-control"
              value={precioUnitario}
              readOnly
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon4">
              Cantidad:
            </span>
            <input
              onChange={handleCantidadChange} // función que hace precioUnitario * cantidad
              type="number"
              className="form-control"
              placeholder="Ingrese la cantidad"
              aria-label="Cantidad"
              aria-describedby="basic-addon4"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon4">
              Observación:
            </span>
            <textarea
              className="form-control"
              placeholder="Papas bien doraditas"
              aria-label="Observación"
              aria-describedby="basic-addon4"
              rows="3" // altura del text area
            ></textarea>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon4">
              SubTotal:
            </span>
            <input
              type="text"
              className="form-control"
              value={subtotal}
              readOnly
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleListoClick}>
            Listo
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      <br />
      <div className="container">
        <div className="card text-center">
          <div className="card-body">
            <div className="row">
              <div className="col">
                <h3 className="card-header">LISTA de PEDIDOS</h3>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <table className="table table-bordered mt-3">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Horario</th>
                      <th>Domicilio</th>
                      <th>Estado</th>
                      <th>Pedido</th>
                      <th>Observación</th>
                      <th>Total</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pedidos;
