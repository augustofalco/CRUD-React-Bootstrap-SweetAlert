return (
  <div>
    <br />
    <div className="container">
      <div className="card text-center">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col text-center bg-red-500">
              <span className="input-group-text" id="basic-addon1">
                Cantidad de Pollos:
              </span>
              <input
                type="number"
                onChange={(event) => setCantidadPollos(event.target.value)}
                className="form-control text-center"
                value={cantidadPollos}
                placeholder="Ingrese la cantidad de pollos"
                aria-label="Cantidad de Pollos"
                aria-describedby="basic-addon1"
              />
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
        <div>
          <div className="card text-center">
            <h3 className="card-header">REGISTRO de PEDIDOS</h3>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-4">
                  <h5>Pedido</h5>
                </div>
                <div className="col-md-4">
                  <h5>Detalle Pedido</h5>
                </div>
                <div className="col-md-4">
                  <h5>Envío</h5>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Nombre Cliente:
                    </span>
                    <input
                      type="text"
                      onChange={(event) => setNombre(event.target.value)}
                      className="form-control"
                      value={edad}
                      placeholder="Ingrese el Nombre"
                      aria-label="Nombre Cliente"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Estado:
                    </span>
                    <select
                      onChange={(event) => setEstado(event.target.value)}
                      className="form-control"
                      value={estado}
                    >
                      <option value="">Seleccione el Estado</option>
                      <option value="Pedido">Pedido</option>
                      <option value="Preparacion">En preparación</option>
                      <option value="Enviado">Enviado</option>
                      <option value="Entregado">Entregado</option>
                      <option value="Rechazado">Rechazado</option>
                      <option value="Demorado">Demorado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Altura:
                    </span>
                    <input
                      type="number"
                      onChange={(event) => setAltura(event.target.value)}
                      className="form-control"
                      value={altura}
                      placeholder="Ingrese la altura"
                      aria-label="Altura"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      País:
                    </span>
                    <input
                      type="text"
                      onChange={(event) => setPais(event.target.value)}
                      className="form-control"
                      value={pais}
                      placeholder="Ingrese el país"
                      aria-label="País"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Observación:
                    </span>
                    <input
                      type="text"
                      onChange={(event) => setObservacion(event.target.value)}
                      className="form-control"
                      value={observacion}
                      placeholder="Ingrese observación"
                      aria-label="Observación"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Piso:
                    </span>
                    <input
                      type="text"
                      onChange={(event) => setPiso(event.target.value)}
                      className="form-control"
                      value={piso}
                      placeholder="Ingrese el piso"
                      aria-label="Piso"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Cargo:
                    </span>
                    <input
                      type="text"
                      onChange={(event) => setCargo(event.target.value)}
                      className="form-control"
                      value={cargo}
                      placeholder="Ingrese el cargo"
                      aria-label="Cargo"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Detalle de Pedido:
                    </span>
                    <input
                      type="text"
                      onChange={(event) => setObservacion(event.target.value)}
                      className="form-control"
                      value={observacion}
                      placeholder="Ingrese detalle de pedido"
                      aria-label="Detalle de Pedido"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Departamento:
                    </span>
                    <input
                      type="text"
                      onChange={(event) => setDepartamento(event.target.value)}
                      className="form-control"
                      value={departamento}
                      placeholder="Ingrese el departamento"
                      aria-label="Departamento"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Años:
                    </span>
                    <input
                      type="number"
                      onChange={(event) => setAnios(event.target.value)}
                      className="form-control"
                      value={anios}
                      placeholder="Ingrese los años"
                      aria-label="Años"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Localidad:
                    </span>
                    <input
                      type="text"
                      onChange={(event) => setLocalidad(event.target.value)}
                      className="form-control"
                      value={localidad}
                      placeholder="Ingrese la localidad"
                      aria-label="Localidad"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Teléfono:
                    </span>
                    <input
                      type="text"
                      onChange={(event) => setTelefono(event.target.value)}
                      className="form-control"
                      value={telefono}
                      placeholder="Ingrese el teléfono"
                      aria-label="Teléfono"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4"></div>
                <div className="col-md-4"></div>
                <div className="col-md-4">
                  <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">
                      Observación de Envío:
                    </span>
                    <input
                      type="text"
                      onChange={(event) =>
                        setObservacionEnvio(event.target.value)
                      }
                      className="form-control"
                      value={observacionEnvio}
                      placeholder="Ingrese observación de envío"
                      aria-label="Observación de Envío"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col text-center">
                  <button
                    className="btn btn-success"
                    onClick={editar ? update : add}
                  >
                    {editar ? "Actualizar" : "Registrar"}
                  </button>
                </div>
                <div className="col text-center">
                  <button className="btn btn-secondary" onClick={limpiarCampos}>
                    Limpiar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="container">
            <div className="card text-center">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <h3>LISTA de EMPLEADOS</h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <table className="table table-bordered">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Edad</th>
                          <th>País</th>
                          <th>Cargo</th>
                          <th>Años</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {empleadosList.map((val) => (
                          <tr key={val.id}>
                            <td>{val.nombre}</td>
                            <td>{val.edad}</td>
                            <td>{val.pais}</td>
                            <td>{val.cargo}</td>
                            <td>{val.anios}</td>
                            <td>
                              <button
                                className="btn btn-warning me-2"
                                onClick={() => ()}
                              >
                                Editar
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() => ()}
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      </div>
    </div>
  </div>
);
