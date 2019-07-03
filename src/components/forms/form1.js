import React, { Component } from "react";
import Modal from "../modal";
import { navigate } from "gatsby";
import moment from "moment";
import Axios from "axios";
import { FaMapMarkedAlt } from "react-icons/fa";

class Form1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      sname: "",
      lastp: "",
      lastm: "",
      rfc: "",
      cp: "",
      tel: "",
      email: "",
      dd: "",
      mm: "",
      yy: "",
      privacyModal: "",
      termsModal: "",
      countryModal: "",
      privacy: false,
      terms: false,
      street: "",
      noe: "",
      noi: "",
      col: "",
      nac: ""
    };
  }

  handleInputChange = async event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const iname = target.name;

    await this.setState({
      [iname]: value
    });
    if (
      iname === "name" ||
      iname === "sname" ||
      iname === "lastp" ||
      iname === "lastm" ||
      iname === "dd" ||
      iname === "mm" ||
      iname === "yy"
    ) {
      this.getRFC();
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    navigate("/preguntas_de_verificacion", {
      state: {
        ...this.state,
        amount: this.props.location.amount,
        pay: this.props.location.pay
      }
    });
  };

  openModal = field => {
    if (this.state[field] === true) {
      this.setState({
        [field]: false
      });
      return;
    }
    field += "Modal";
    this.setState({
      [field]: " is-active"
    });
  };

  closeModal = modal => {
    this.setState({
      [modal]: ""
    });
  };

  accept = async field => {
    await this.setState({
      [field]: true
    });

    this.closeModal(field + "Modal");
  };

  validateDate = e => {
    const target = e.target;
    const value = parseInt(target.value);
    const { dd, mm, yy } = this.state;
    let errorDate = "";

    if (isNaN(value)) {
      console.log("Error format");
      errorDate = "Ingrese una fecha válida";
    }
    if (dd) {
      if (dd < 1 || dd > 31) {
        console.log("error dd");

        errorDate = "Ingrese día válido";
      }
    }

    if (mm) {
      if (mm < 1 || mm > 12) {
        console.log("error mm");
        errorDate = "Ingrese mes válido";
      }
    }

    if (yy) {
      console.log(moment().year());
      if (yy < moment().year() - 68 || yy > 1998) {
        console.log("error yy");
        errorDate = "Ingrese año válido";
      }
    }

    if (dd && mm && yy) {
      const date = moment(`${dd}-${mm}-${yy}`, "DD-MM-YYYY");
      if (!date.isValid()) {
        errorDate = "Fecha inválida";
      }
      const diff = moment().diff(date, "milliseconds");
      const duration = moment.duration(diff);

      if (duration.years() < 21) {
        errorDate = "A partir de 21 años";
      }

      if (duration.years() >= 69) {
        errorDate = "Hasta 68 años 11 meses";
      }
    }

    this.setState({
      errorDate
    });
  };

  getRFC = async () => {
    const { name, sname, lastp, lastm, dd, mm, yy } = this.state;
    let url = process.env.GATSBY_CAlCULATOR_RFC;
    if (name && lastm && lastp && dd && mm && yy) {
      const rfcResponse = await Axios.post(process.env.GATSBY_API + url, {
        nombre: name,
        segundoNombre: sname,
        apellidoPaterno: lastp,
        apellidoMaterno: lastm,
        fechaNacimiento: `${dd}/${mm}/${yy}`
      });

      if (rfcResponse.data.rfc !== "X") {
        this.setState({ rfc: rfcResponse.data.rfc });
      }
    }
  };

  render() {
    const {
      name,
      sname,
      lastp,
      lastm,
      cp,
      tel,
      email,
      dd,
      mm,
      yy,
      noe,
      noi,
      street,
      col,
      rfc,
      nac,
      privacyModal,
      termsModal,
      countryModal,
      terms,
      privacy,
      errorDate
    } = this.state;
    return (
      <div className="columns">
        <div className="column">
          <div className="card-content form">
            <h1 className="has-text-success is-size-6 subtitle is-marginless">
              Datos personales
            </h1>
            <p className="is-size-7 has-text-grey-light">
              Queremos conocerte un poco más.
            </p>
            <br />
            <div className="columns is-multiline">
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="name">
                    * Nombre
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Tu primer nombre"
                      required
                      onChange={this.handleInputChange}
                      value={name}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="sname">
                    Segundo Nombre
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="sname"
                      id="sname"
                      placeholder="Tu segundo nombre"
                      onChange={this.handleInputChange}
                      value={sname}
                    />
                  </div>
                </div>
              </div>

              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="lastp">
                    * Apellido paterno
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="lastp"
                      id="lastp"
                      placeholder="Tu apellido paterno"
                      required
                      onChange={this.handleInputChange}
                      value={lastp}
                      disabled={!name}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="lastm">
                    * Apellido materno
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="lastm"
                      id="lastm"
                      placeholder="Tu apellido materno"
                      required
                      onChange={this.handleInputChange}
                      value={lastm}
                      disabled={!lastp}
                    />
                  </div>
                </div>
              </div>

              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="dd">
                    * Fecha de nacimiento
                    <br />
                    <small>
                      (Prestamos a partir de 21 a 68 años y 11 meses)
                    </small>
                  </label>
                  <div className="columns is-mobile is-ml-bottom">
                    <div className="column is-3 is-pl-right is-pl-bottom">
                      <div className="control">
                        <input
                          className="input has-text-centered"
                          type="text"
                          pattern="([0-2]\d|3[0-1])"
                          maxLength="2"
                          name="dd"
                          id="dd"
                          placeholder="DD"
                          onChange={this.handleInputChange}
                          value={dd}
                          required
                          disabled={!lastm}
                          onBlur={this.validateDate}
                        />
                      </div>
                    </div>

                    <div className="column is-3 is-pl-right is-pl-bottom">
                      <div className="control">
                        <input
                          className="input has-text-centered"
                          type="text"
                          name="mm"
                          id="mm"
                          maxLength="2"
                          placeholder="MM"
                          pattern="(0[1-9]|1[0-2])"
                          onChange={this.handleInputChange}
                          value={mm}
                          required
                          disabled={!lastm}
                          onBlur={this.validateDate}
                        />
                      </div>
                    </div>

                    <div className="column is-3 is-pl-right is-pl-bottom">
                      <div className="control">
                        <input
                          className="input has-text-centered"
                          type="text"
                          name="yy"
                          id="yy"
                          placeholder="YYYY"
                          maxLength="4"
                          onChange={this.handleInputChange}
                          value={yy}
                          required
                          disabled={!lastm}
                          onBlur={this.validateDate}
                        />
                      </div>
                    </div>
                  </div>
                  {errorDate && <p className="help is-danger">{errorDate}</p>}
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label">*Género</label>
                  <div className="columns is-mobile is-gapless-mobile">
                    <div className="column is-pl-right is-6">
                      <label className="check-container">
                        Masculino
                        <input
                          type="radio"
                          name="gen"
                          value="masculino"
                          required
                          onChange={this.handleInputChange}
                          disabled={!dd || !mm || !yy}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="column is-pl-left is-pl-right">
                      <label className="check-container">
                        Femenino
                        <input
                          type="radio"
                          name="gen"
                          value="femenino"
                          required
                          onChange={this.handleInputChange}
                          disabled={!dd || !mm || !yy}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="rfc">
                    RFC
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="rfc"
                      id="rfc"
                      disabled
                      placeholder="RFC"
                      value={rfc}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="tel">
                    * Teléfono celular
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="tel"
                      name="tel"
                      id="tel"
                      placeholder="Tu número de celular"
                      required
                      onChange={this.handleInputChange}
                      value={tel}
                      disabled={!rfc}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="email">
                    * Email
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Escribe tu correo electrónico"
                      required
                      onChange={this.handleInputChange}
                      value={email}
                      disabled={!tel}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label">* Nacionalidad</label>
                  <div className="columns is-mobile is-gapless-mobile">
                    <div className="column is-pl-right is-6">
                      <label className="check-container">
                        Mexicana
                        <input
                          type="radio"
                          name="nac"
                          value="mexicana"
                          required
                          onChange={this.handleInputChange}
                          disabled={!email}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                    <div className="column is-pl-left is-pl-right">
                      <label className="check-container">
                        Otro
                        <input
                          type="radio"
                          name="nac"
                          value="otro"
                          required
                          onChange={() => this.openModal("country")}
                          disabled={!email}
                        />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br />

            <h1 className="has-text-success is-size-6 subtitle is-marginless">
              Datos de domicilio
            </h1>
            <p className="is-size-7 has-text-grey-light">
              Cuéntanos dónde vives para poder ayudarte a encontrar una oficina
              cercana.
            </p>
            <br />

            <div className="columns is-multiline">
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="cp">
                    * Código postal
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="cp"
                      id="cp"
                      placeholder="Escribe aquí el código de 5 dígitos"
                      required
                      onChange={this.handleInputChange}
                      value={cp}
                      disabled={!nac}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="col">
                    * Colonia
                  </label>
                  <div className="control is-expanded">
                    <div className="select is-fullwidth">
                      <select
                        name="col"
                        id="col"
                        required
                        onChange={this.handleInputChange}
                        value={col}
                        disabled={!cp}
                      >
                        <option value="">Selecciona una colonia</option>
                        <option value="12">12 Quincenas</option>
                        <option value="24">24 Quincenas</option>
                        <option value="36">36 Quincenas</option>
                      </select>
                    </div>
                  </div>
                  <p className="help">
                    ¿No encuentras tu colonia? Descubre por qué
                  </p>
                </div>
              </div>

              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="del">
                    Delegación / Municipio
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="del"
                      id="del"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="city">
                    Ciudad / Estado
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="city"
                      id="city"
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="street">
                    * Calle
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="street"
                      id="street"
                      placeholder="Escribe el nombre de tu calle"
                      required
                      onChange={this.handleInputChange}
                      value={street}
                      disabled={!col}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="noe">
                    * Número exterior
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="noe"
                      id="noe"
                      placeholder="Escribe el número exterior"
                      required
                      onChange={this.handleInputChange}
                      value={noe}
                      disabled={!street}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <div className="field">
                  <label className="label" htmlFor="noi">
                    Número interior
                  </label>
                  <div className="control">
                    <input
                      className="input"
                      type="text"
                      name="noi"
                      id="noi"
                      placeholder="Escribe el número interior"
                      onChange={this.handleInputChange}
                      value={noi}
                      disabled={!street}
                    />
                  </div>
                </div>
              </div>
              <div className="column is-6 is-12-mobile">
                <br />
                <div className="field">
                  <label className="check-container">
                    Acepto los términos y condiciones
                    <br />
                    <button
                      disabled={!noe}
                      onClick={() => this.openModal("terms")}
                      className="button is-text has-text-danger has-text-undeline is-size-7 is-pl-left"
                    >
                      Lee aquí los términos y condiciones
                    </button>
                    <input
                      type="checkbox"
                      name="terms"
                      required
                      checked={terms}
                      onChange={this.handleInputChange}
                      disabled={!noe}
                    />
                    <span className="checkmark checkbox" />
                  </label>
                </div>

                <br />
                <div className="field">
                  <label className="check-container">
                    Acepto el aviso de privacidad
                    <br />
                    <button
                      disabled={!noe}
                      onClick={() => this.openModal("privacy")}
                      className="button is-text has-text-danger has-text-undeline is-size-7 is-pl-left"
                    >
                      Lee aquí el aviso de privacidad
                    </button>
                    <input
                      type="checkbox"
                      name="privacy"
                      required
                      checked={privacy}
                      onChange={this.handleInputChange}
                      disabled={!noe}
                    />
                    <span className="checkmark checkbox" />
                  </label>
                </div>
              </div>
            </div>
            <br />
            <div className="has-text-centered">
              {this.props.location &&
                !this.props.location.callMe && (
                  <button
                    disabled={!privacy || !terms}
                    onClick={this.handleSubmit}
                    className="button is-success btn-block has-text-weight-bold"
                  >
                    Registrarme y continuar
                  </button>
                )}
              {this.props.location &&
                this.props.location.callMe && (
                  <button
                    disabled={!privacy || !terms}
                    onClick={this.handleSubmit}
                    className="button is-success btn-block has-text-weight-bold"
                  >
                    Enviar y terminar
                  </button>
                )}
            </div>
            <Modal
              modal={termsModal}
              close={() => this.closeModal("termsModal")}
              title="Términos y condiciones"
              accept={() => this.accept("terms")}
            >
              términos y condiciones
            </Modal>
            <Modal
              modal={privacyModal}
              close={() => this.closeModal("privacyModal")}
              title="Aviso de privacidad"
              accept={() => this.accept("privacy")}
            >
              aviso de privacidad
            </Modal>
            <Modal
              modal={countryModal}
              close={() => this.closeModal("countryModal")}
              title="¡LO SENTIMOS!"
              accept={() => {
                navigate("/");
              }}
              acceptText="Cerrar y cancelar la solicitud"
            >
              <div className="has-text-centered has-text-primary">
                <FaMapMarkedAlt size="3rem" />
              </div>
              <br />
              Para poder obtener un préstamo con nosotros es indispensable ser
              mexicano.
              <br />
              <br />
              <strong>De antemano, agradecemos tu preferencia.</strong>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Form1;