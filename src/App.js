import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Swal from "sweetalert2";

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);
  const [id, setId] = useState(0);

  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);

  /** FUNCIONALIDAD PARA REGISTRAR EMPLEADOS */
  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: parseInt(edad, 10),
      pais: pais,
      cargo: cargo,
      anios: parseInt(anios, 10),
    }).then(() => {
      getEmpleados();
      limpiarCampos(); // FUNCIONALIDAD PARA LIMPIAR CAMPOS
      Swal.fire({
        title: "<strong>Registro exitoso<strong/>",
        html:
          "<i>El empleado <strong>" +
          nombre +
          "</strong> fue registrado con éxito<i/>",
        icon: "success",
        timer: 3000,
      }).catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Oops ...",
          text: "No se logró registrar el empleado",
          footer: error,
        });
      });
    });
  };

  /** FUNCIONALIDAD PARA ACTUALIZAR EMPLEADOS */
  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: parseInt(edad, 10),
      pais: pais,
      cargo: cargo,
      anios: parseInt(anios, 10),
    }).then(() => {
      getEmpleados();
      setEditar(false);
      limpiarCampos(); /**FUNCIONALIDAD PARA LIMPIAR CAMPOS */
      Swal.fire({
        title: "<strong>Actualización exitoso<strong/>",
        html:
          "<i>El empleado <strong>" +
          nombre +
          "</strong> fue actualizado con éxito<i/>",
        icon: "success",
        timer: 3000,
      }).catch(function (error) {
        Swal.fire({
          icon: "error",
          title: "Oops ...",
          text: "No se logró actualizar el empleado",
          footer: error,
        });
      });
    });
  };

  /** FUNCIONALIDAD PARA ELIMINAR EMPLEADOS */
  const deleteEmpleados = (val) => {
    Swal.fire({
      title: "Confirmar eliminación?",
      html:
        "<i>¿Realmente desea eliminar a <strong>" +
        val.nombre +
        "</strong>?<i/>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`)
          .then(() => {
            getEmpleados();
            setEditar(false);
            limpiarCampos(); /**FUNCIONALIDAD PARA LIMPIAR CAMPOS */
            Swal.fire({
              icon: "success",
              title: val.nombre + " ha sido eliminado",
              showConfirmButton: false,
              timer: 2000,
            });
          })
          .catch(function (error) {
            Swal.fire({
              icon: "error",
              title: "Oops ...",
              text: "No se logró eliminar el empleado",
              footer: error,
            });
          });
      }
    });
  };

  /** FUNCIONALIDAD PARA LIMPIAR LOS CAMPOS */
  const limpiarCampos = () => {
    setId("");
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
    setEditar(false);
  };

  /** FUNCIONALIDAD PARA MODIFICAR EMPLEADOS */
  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  };

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados", {}).then((response) => {
      setEmpleados(response.data);
    });
  };

  useEffect(() => {
    getEmpleados();
  }, []);

  return (
    <div className="container">
      <div className="card text-center">
        <h3 className="card-header">GESTIÓN DE EMPLEADOS</h3>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              onChange={(event) => setNombre(event.target.value)}
              className="form-control"
              value={nombre}
              placeholder="Ingrese el Nombre"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Edad:
            </span>
            <input
              type="number"
              onChange={(event) => setEdad(event.target.value)}
              className="form-control"
              value={edad}
              placeholder="Ingrese la Edad"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              País:
            </span>
            <input
              type="text"
              onChange={(event) => setPais(event.target.value)}
              className="form-control"
              value={pais}
              placeholder="Ingrese el País"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Cargo:
            </span>
            <input
              type="text"
              onChange={(event) => setCargo(event.target.value)}
              className="form-control"
              value={cargo}
              placeholder="Ingrese el Cargo"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Años:
            </span>
            <input
              type="number"
              onChange={(event) => setAnios(event.target.value)}
              className="form-control"
              value={anios}
              placeholder="Ingrese los Años"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="card-footer text-muted">
          {editar ? (
            <div>
              <button className="btn btn-warning m-2" onClick={update}>
                Actualizar
              </button>
              <button className="btn btn-info m-2" onClick={limpiarCampos}>
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={add}>
              Registrar
            </button>
          )}
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Cargo</th>
            <th scope="col">Años</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosList.map((val) => (
            <tr key={val.id}>
              <th scope="row">{val.id}</th>
              <td>{val.nombre}</td>
              <td>{val.edad}</td>
              <td>{val.pais}</td>
              <td>{val.cargo}</td>
              <td>{val.anios}</td>
              <td>
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic example"
                >
                  <button
                    type="button"
                    onClick={() => editarEmpleado(val)}
                    className="btn btn-info"
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deleteEmpleados(val);
                    }}
                    className="btn btn-danger"
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
