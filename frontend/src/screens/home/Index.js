import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import swal from "sweetalert";
import "./index.css";

import useHome from "./useHome";

const Home = () => {
  const [newState, setState] = useState({
    open: false,
  });
  const [newTittle, setNewTittle] = useState({
    tittle: "",
  });

  const [edicionMode, setEdicionMode] = useState(false);
  const [selectedID, setSelectedID] = useState();

  const openModal = () => {
    setState({ open: !newState.open });
  };

  const openNew = () => {
    setEdicionMode(false);
    setNewTittle({ tittle: "Nuevo" });
    reset();
    openModal();
  };

  const editNew = () => {
    setNewTittle({ tittle: "Editar" });
    openModal();
  };

  const { dataInicial, isLoading, loadHome } = useHome();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm();

  //POST
  const addAnimal = (data) => {
    if (edicionMode) {
      if (data) {
        fetch("http://localhost:4000/api/animals/" + selectedID, {
          method: "PUT",
          body: JSON.stringify(data),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            loadHome();
          })
          .catch((err) => console.error(err));
        setState({ open: !newState.open });
        swal("Buen Trabajo!", "Se editó el animal con exito", "success");
      }
    } else {
      if (data) {
        fetch("http://localhost:4000/api/animals", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
            loadHome();
          })
          .catch((err) => console.error(err));
        setState({ open: !newState.open });
        swal("Buen Trabajo!", "Se guardo el nuevo animal con exito", "success");
      }
    }
  };

  //GET BY ID
  const editAnimal = (item) => {
    setSelectedID(item._id);
    setValue("id", item.id);
    setValue("typeAnimal", item.typeAnimal);
    setValue("weight", item.weight);
    setValue("paddock", item.paddock);
    setValue("typeDevice", item.typeDevice);
    setValue("numberDevice", item.numberDevice);
    setEdicionMode(true);
    editNew();
  };

  //DELETE
  const deleteAnimal = (id) => {
    swal({
      title: "Esta seguro quer desea eliminar?",
      text: "Una vez borrado no podra recuperar los datos",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch("http://localhost:4000/api/animals/" + id, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json)
          .then(() => loadHome())
          .catch((err) => console.error(err));
        swal("Eliminación exitosa", {
          icon: "success",
        });
      } else {
        swal("Se canceló la eliminación");
      }
    });
  };

  return (
    <>
      <div className="home">
        <div className="container">
          <h5 className="p-2">Admin / Establecimiento</h5>
          <h2 className="p-2">Establecimiento Ganadero</h2>
          <div className="p-2">
            <Button color="success" onClick={openNew}>
              Crear nuevo dispositivo
            </Button>
          </div>

          <br></br>
          <br></br>

          <h4 className="p-3">Lista de animales</h4>
          {isLoading ? (
            <div className="d-flex spinner" width="100%">
              <Spinner></Spinner>
            </div>
          ) : (
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">ID Senasa</th>
                  <th scope="col">Tipo Animal</th>
                  <th scope="col">Peso</th>
                  <th scope="col">Nombre Potrero</th>
                  <th scope="col">Tipo Dispositivo</th>
                  <th scope="col">Número Dispositivo</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {dataInicial &&
                  dataInicial.map((item) => (
                    <tr key={item._id}>
                      <td>{item.id}</td>
                      <td>{item.typeAnimal}</td>
                      <td>{item.weight}</td>
                      <td>{item.paddock}</td>
                      <td>{item.typeDevice}</td>
                      <td>{item.numberDevice}</td>
                      <td>
                        <button
                          className="btn btn-success btn-sm m-1"
                          onClick={() => editAnimal(item)}
                        >
                          <span className="material-symbols-outlined">
                            edit
                          </span>
                        </button>
                        <button
                          className="btn btn-danger btn-sm m-1"
                          onClick={() => deleteAnimal(item._id)}
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <Modal isOpen={newState.open}>
        <ModalHeader>{newTittle.tittle} Animal</ModalHeader>
        <div className="container">
          <form onSubmit={handleSubmit(addAnimal)}>
            <ModalBody>
              <div className="row">
                <div className="col">
                  <div className="input-field mb-3">
                    <label htmlFor="id" className="form-label">
                      ID Senasa
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      aria-label="default input example"
                      id="id"
                      placeholder="Ingrese un ID"
                      autoFocus
                      maxLength="16"
                      {...register("id", { required: true })}
                    />
                    {errors.id?.type === "required" && (
                      <small className="errorInput">
                        El campo es requerido
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="input-field mb-3">
                    <label htmlFor="name" className="form-label">
                      Tipo de animal
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      {...register("typeAnimal", { required: true })}
                    >
                      <option selected>Novillo</option>
                      <option>Toro</option>
                      <option>Vaquillona</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="input-field mb-3">
                    <label htmlFor="weight" className="form-label">
                      Peso KG
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      aria-label="default input example"
                      id="weight"
                      placeholder="Ingrese un Peso"
                      {...register("weight", { required: true })}
                    />
                    {errors.weight?.type === "required" && (
                      <small className="errorInput">
                        El campo es requerido
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="input-field mb-3">
                    <label htmlFor="paddock" className="form-label">
                      Nombre del Potrero
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      aria-label="default input example"
                      id="paddock"
                      placeholder="Ingrese un potrero"
                      maxLength="200"
                      {...register("paddock", { required: true })}
                    />
                    {errors.paddock?.type === "required" && (
                      <small className="errorInput">
                        El campo es requerido
                      </small>
                    )}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="input-field mb-3">
                    <label htmlFor="device" className="form-label">
                      Tipo de dispositivo
                    </label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      {...register("typeDevice", { required: true })}
                    >
                      <option selected>Collar</option>
                      <option>Caravana</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="input-field mb-3">
                    <label htmlFor="numberDevice" className="form-label">
                      Número de dispositivo
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      aria-label="default input example"
                      id="numberDevice"
                      placeholder="Ingrese el número de dispositivo"
                      maxLength="8"
                      {...register("numberDevice", { required: true })}
                    />
                    {errors.deviceNumber?.type === "required" && (
                      <small className="errorInput">
                        El campo es requerido
                      </small>
                    )}
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                {newTittle.tittle}
              </Button>
              <Button color="secondary" onClick={openModal}>
                Cancelar
              </Button>
            </ModalFooter>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default Home;
