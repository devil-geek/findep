import React, { Component } from "react";
import Modal from "../modal";
import { navigate } from "gatsby";
import moment from "moment";
import Axios from "axios";
import { FaMapMarkedAlt, FaAddressCard } from "react-icons/fa";
import req from "./request.json";
import Terms from "../terms";
import Privacy from "../privacy";

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
      ageModal: "",
      rfcModal: "",
      privacy: false,
      terms: false,
      street: "",
      noe: "",
      noi: "",
      col: "",
      nac: "",
      noCoverModal: "",
      del: "",
      city: "",
      errorDate: "",
      termsApoyo: false
    };

    this.request = req;
  }

  componentDidMount() {
    if (!this.props.location) {
      navigate("/");
      return;
    }
  }

  handleInputChange = async event => {
    const target = event.target;
    const value =
      target.type === "checkbox" ? target.checked : target.value.toUpperCase();
    const iname = target.name;

    if (target.validity.patternMismatch) {
      return;
    }

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
      this.validateDate();
      this.getRFC();
    }
    if (iname === "cp") {
      this.setState({
        col: "",
        city: "",
        del: ""
      });
      this.getCover();
    }

    if (iname === "col") {
      const col = this.state.cover.find(item => item.asentamiento === value);
      this.setState({
        col: col.asentamiento,
        city: col.estado,
        del: col.municipio
      });
    }
  };

  handleSubmit = async e => {
    await this.makeRequest();
    console.log("Request", this.request);
    const { callMe } = this.props.location;
    if (callMe) {
      navigate("/gracias");
    }
    navigate("/preguntas_de_verificacion", {
      state: {
        ...this.state,
        amount: this.props.location.amount,
        pay: this.props.location.pay,
        request: this.request
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

  validateDate = () => {
    const { dd, mm, yy } = this.state;
    let errorDate = "";

    if (dd && mm && yy && yy.length === 4) {
      const date = moment(`${dd}-${mm}-${yy}`, "DD-MM-YYYY");
      if (!date.isValid()) {
        errorDate = "Ingrese una fecha válida";
      }
      const diff = moment().diff(date, "milliseconds");
      const duration = moment.duration(diff);

      if (duration.years() < 21) {
        errorDate =
          "La edad mínima para solicitar un préstamo con nosotros es de 21 años";
      }

      if (duration.years() >= 69) {
        errorDate =
          "La edad máxima para solicitar un préstamo con nosotros es hasta 68 años 11 meses";
      }
    }

    if (errorDate !== "") {
      this.setState({
        errorDate,
        rfc: "",
        ageModal: " is-active"
      });
    } else {
      this.setState({
        errorDate
      });
    }
  };

  getRFC = async () => {
    const { name, sname, lastp, lastm, dd, mm, yy, errorDate } = this.state;
    let url = process.env.GATSBY_CAlCULATOR_RFC;

    if (
      name &&
      lastm &&
      lastp &&
      dd &&
      mm &&
      yy &&
      yy.length === 4 &&
      errorDate === ""
    ) {
      const rfcResponse = await Axios.post(url, {
        nombre: name,
        segundoNombre: sname,
        apellidoPaterno: lastp,
        apellidoMaterno: lastm,
        fechaNacimiento: `${dd}/${mm}/${yy}`
      });

      if (rfcResponse.data.rfc === "REGISTRADO") {
        this.openModal("rfc");
      } else {
        this.setState({ rfc: rfcResponse.data.rfc });
      }
    }
  };

  getCover = async e => {
    const colUrl = process.env.GATSBY_COL;
    const coverUrl = process.env.GATSBY_FISA_COVER;
    const { cp } = this.state;

    if (cp.length === 5) {
      const res = await Axios.get(coverUrl + `?cp=${cp}`);
      if (res && res.data && res.data.payload.length > 0) {
        const cols = await Axios.get(colUrl + `?cp=${cp}`);

        this.setState({
          cover: cols.data,
          sucursales: res.data.payload
        });
      } else {
        this.openModal("noCover");
      }
    }
  };

  makeRequest = async toAef => {
    const { monto, occupation, period, plazo, callMe } = this.props.location;
    const {
      name,
      sname,
      lastp,
      lastm,
      email,
      dd,
      yy,
      mm,
      gen,
      rfc,
      col,
      street,
      noe,
      noi,
      tel,
      cp,
      city,
      del
    } = this.state;
    this.request = {
      ...this.request,
      datosCredito: {
        ...this.request.datosCredito,
        monto,
        periodo: period,
        plazo: plazo,
        dedicacion: occupation
      },
      nombre: name.toUpperCase(),
      segundoNombre: sname.toUpperCase(),
      apellidoPaterno: lastp.toUpperCase(),
      apellidoMaterno: lastm.toUpperCase(),
      correoElectronico: email.toUpperCase(),
      fechaNacimiento: moment(new Date(`${mm} ${dd} ${yy}`)).format(
        "DD/MM/YYYY"
      ),
      genero: gen.toUpperCase(),
      rfc: rfc.toUpperCase(),
      domicilio: [
        {
          calle: street.toUpperCase(),
          colonia: col.toUpperCase(),
          cp: cp,
          numeroExterior: noe,
          numeroInterior: noi,
          estado: city.toUpperCase(),
          municipio: del.toUpperCase()
        }
      ],
      telefono: [
        {
          numeroTelefono: tel,
          tipoTelefono: "M"
        }
      ],
      datosBuro: null,
      url: this.props.url
    };

    let url = process.env.GATSBY_FISA_ENDPOINT;

    if (callMe) {
      url += "?paso=uno";
    } else {
      url += "?paso=dos";
    }

    if (toAef) {
      url = process.env.GATSBY_AEF_ENDPOINT;
      this.request = {
        ...this.request,
        datosCredito: {
          ...this.request.datosCredito,
          condicionesAef: true,
          condicionesFisa: false,
          idEmpresa: "19"
        }
      };
    }

    try {
      const res = await Axios.post(url, this.request);
      if (res.data.status !== undefined) {
        console.log(res.data);
        this.request = JSON.parse(res.data.solicitud.json);
      }
    } catch (e) {
      console.error(e);
    }
  };

  getDays = () => {
    let days = [];
    for (let i = 1; i <= 31; i++) {
      let d = i;
      if (d < 10) {
        d = "0" + i;
      }
      days.push(
        <option key={d} value={d}>
          {d}
        </option>
      );
    }

    return days;
  };

  getMonths = () => {
    let months = [];
    for (let i = 1; i <= 12; i++) {
      let m = i;
      if (m < 10) {
        m = "0" + i;
      }
      months.push(
        <option key={m} value={m}>
          {m}
        </option>
      );
    }

    return months;
  };

  getYears = () => {
    let years = [];
    const minY = moment()
      .subtract(69, "years")
      .year();
    const maxY = moment()
      .subtract(21, "years")
      .year();

    for (let i = minY; i <= maxY; i++) {
      years.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }

    return years;
  };

  sendToAef = async () => {
    await this.makeRequest("toAef");
    navigate("/");
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
      noCoverModal,
      terms,
      privacy,
      errorDate,
      del,
      city,
      cover,
      gen,
      ageModal,
      termsApoyo,
      rfcModal
    } = this.state;

    return (
      <div className="columns">
        <div className="column">
          <div className="card-content form">
            <h2 className="has-text-success is-size-6 subtitle is-marginless os">
              Datos personales
            </h2>
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
                      pattern="([A-Za-z ]*)?"
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
                      pattern="([A-Za-z ]*)?"
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
                      pattern="([A-Za-z ]*)?"
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
                      pattern="([A-Za-z ]*)?"
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
                    <div className="column is-narrow is-pl-right is-pl-bottom">
                      <div className="control is-expanded">
                        <div className="select is-fullwidth">
                          <select
                            name="dd"
                            id="dd"
                            required
                            onChange={this.handleInputChange}
                            value={dd}
                            disabled={!lastm}
                            onBlur={this.validateDate}
                          >
                            <option value="">Día</option>
                            {this.getDays()}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="column is-narrow is-pl-right is-pl-bottom">
                      <div className="control is-expanded">
                        <div className="select is-fullwidth">
                          <select
                            name="mm"
                            id="mm"
                            required
                            onChange={this.handleInputChange}
                            value={mm}
                            disabled={!lastm}
                            onBlur={this.validateDate}
                          >
                            <option value="">Mes</option>
                            {this.getMonths()}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="column is-narrow is-pl-right is-pl-bottom">
                      <div className="control is-expanded">
                        <div className="select is-fullwidth">
                          <select
                            name="yy"
                            id="yy"
                            required
                            onChange={this.handleInputChange}
                            value={yy}
                            disabled={!lastm}
                            onBlur={this.validateDate}
                          >
                            <option value="">Año</option>
                            {this.getYears()}
                          </select>
                        </div>
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
                          value="M"
                          required
                          onChange={this.handleInputChange}
                          disabled={!dd || !mm || !yy || errorDate !== ""}
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
                          value="F"
                          required
                          onChange={this.handleInputChange}
                          disabled={!dd || !mm || !yy || errorDate !== ""}
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
                      disabled={!gen}
                      maxLength={10}
                      pattern="([0-9]*)?"
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
                      disabled={!tel || tel.length < 10}
                      pattern="/^(([^<>()\[\]\\.,;:\s@&quot;]+(\.[^<>()\[\]\\.,;:\s@&quot;]+)*)|(&quot;.+&quot;))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/"
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

            <h2 className="has-text-success is-size-6 subtitle is-marginless os has-mt-big">
              Datos de domicilio
            </h2>
            <p className="is-size-7 has-text-grey-light">
              Cuéntanos dónde vives para poder ayudarte a encontrar una oficina
              cercana.
            </p>
            <br />

            <div className="columns is-multiline">
              <div className="column is-3 is-12-mobile">
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
                      maxLength="5"
                      placeholder="Escribe aquí el código de 5 dígitos"
                      required
                      onChange={this.handleInputChange}
                      value={cp}
                      disabled={!nac}
                      pattern="([0-9]*)?"
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
                        disabled={!cp || !cover}
                      >
                        <option value="">Selecciona una colonia</option>
                        {cover &&
                          cover.map(item => {
                            return (
                              <option
                                key={item.asentamiento + item.oficina}
                                value={item.asentamiento}
                              >
                                {item.asentamiento}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                  <p className="help is-hidden-tablet">
                    ¿No encuentras tu colonia?
                    <button
                      className="button is-text has-text-link is-size-7 is-paddingless help"
                      onClick={() => this.openModal("noCover")}
                    >
                      Descubre por qué
                    </button>{" "}
                  </p>
                </div>
              </div>
              <div className="column is-3 is-hidden-mobile">
                <p className="help has-mt-medium">
                  ¿No encuentras tu colonia?
                  <button
                    className="button is-text has-text-link is-size-7 is-paddingless"
                    onClick={() => this.openModal("noCover")}
                  >
                    Descubre por qué
                  </button>{" "}
                </p>
              </div>
              <div className="column is-4 is-12-mobile">
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
                      value={del}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="column is-4 is-12-mobile">
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
                      value={city}
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div className="column is-5 is-12-mobile">
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
                      pattern="([A-Za-z0-9 ]*)?"
                    />
                  </div>
                </div>
              </div>
              <div className="column is-4 is-12-mobile">
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
                      pattern="([A-Za-z0-9 ]*)?"
                    />
                  </div>
                </div>
              </div>
              <div className="column is-3 is-12-mobile">
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
                      placeholder="Número interior"
                      onChange={this.handleInputChange}
                      value={noi}
                      disabled={!street}
                      pattern="([A-Za-z0-9 ]*)?"
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
            <div className="columns">
              <div className="column is-6">
                <div className="has-text-centered">
                  <button
                    id="solicitud-online-1"
                    disabled={!privacy || !terms}
                    onClick={this.handleSubmit}
                    className="button is-success btn-block has-text-weight-bold"
                  >
                    {this.props.location && this.props.location.callMe
                      ? "Enviar y terminar"
                      : "Guardar y continuar"}
                  </button>
                </div>
              </div>
            </div>
            <Modal
              modal={termsModal}
              close={() => this.closeModal("termsModal")}
              title="Términos y condiciones de uso y privacidad"
              accept={() => this.accept("terms")}
            >
              <Terms />
            </Modal>
            <Modal
              modal={privacyModal}
              close={() => this.closeModal("privacyModal")}
              title="Aviso de privacidad"
              accept={() => this.accept("privacy")}
            >
              <Privacy />
            </Modal>
            <Modal
              modal={countryModal}
              close={() => {
                navigate("/");
              }}
              title="¡LO SENTIMOS!"
              accept={() => {
                navigate("/");
              }}
              acceptText="Cerrar y cancelar la solicitud"
              idBtn="boton-cerrar-extranjero"
            >
              <div className="has-text-centered">
                <div className="has-text-primary">
                  <FaMapMarkedAlt size="4em" />
                </div>
                <br />
                Para poder obtener un préstamo con nosotros es indispensable ser
                mexicano.
                <br />
                <br />
                <strong>De antemano, agradecemos tu preferencia.</strong>
              </div>
            </Modal>

            <Modal
              modal={noCoverModal}
              close={() => {
                return;
              }}
              title="¡LO SENTIMOS!"
              accept={() => this.sendToAef()}
              acceptText="Enviar datos a Apoyo Económico"
              disabled={!termsApoyo}
              cancel={() => {
                navigate("/");
              }}
              cancelText="Cerrar y cancelar la solicitud"
              idBtnCancel="boton-cerrar-cobertura"
            >
              <div className="has-text-centered">
                <div className="has-text-primary">
                  <FaMapMarkedAlt size="4em" />
                </div>
                <br />
                Por el momento{" "}
                <strong>no contamos con cobertura en tu residencia.</strong>
                <br />
                <br />
                Sin importar dónde estés y porque eres importante para nosotros,
                el dinero que necesites te lo damos en nuestra empresa hermana
                <strong className="has-text-warning"> Apoyo Económico</strong>.
                <br />
                <br />
                <div className="columns is-centered">
                  <div className="column is-6 has-text-left">
                    <div className="field">
                      <label className="check-container">
                        Acepto{" "}
                        <a
                          href="https://www.apoyoeconomico.com.mx/uso-privacidad-sitio.html"
                          target="_blank"
                          className="has-text-underlined is-inline is-paddingless has-text-primary"
                          rel="noopener noreferrer"
                        >
                          Términos y Condiciones
                        </a>{" "}
                        del{" "}
                        <a
                          href="https://www.apoyoeconomico.com.mx/aviso-privacidad.html"
                          target="_blank"
                          className="has-text-underlined is-inline is-paddingless has-text-primary"
                          rel="noopener noreferrer"
                        >
                          {" "}
                          Aviso de Privacidad{" "}
                        </a>{" "}
                        de Apoyo Económico Familiar., S.A. de C.V., SOFOM,
                        E.N.R.
                        <br />
                        <input
                          type="checkbox"
                          name="termsApoyo"
                          required
                          checked={termsApoyo}
                          onChange={this.handleInputChange}
                        />
                        <span className="checkmark checkbox" />
                      </label>
                    </div>
                  </div>
                </div>
                <strong>De antemano, agradecemos tu preferencia.</strong>
              </div>
            </Modal>

            <Modal
              modal={ageModal}
              close={() => {
                return;
              }}
              title="¡LO SENTIMOS!"
              accept={() => {
                navigate("/");
              }}
              acceptText="Cerrar y cancelar la solicitud"
              cancel={() => this.closeModal("ageModal")}
              cancelText="¿Te equivocaste? da click aquí"
            >
              <div className="has-text-centered">
                <div className="has-text-primary">
                  <FaAddressCard size="4em" />
                </div>
                <br />
                {errorDate}
                <br />
                <br />
                <strong>De antemano, agradecemos tu preferencia.</strong>
              </div>
            </Modal>

            <Modal
              modal={rfcModal}
              close={() => {
                navigate("/");
              }}
              title="¡LO SENTIMOS!"
              accept={() => {
                navigate("/");
              }}
              acceptText="Cerrar y cancelar la solicitud"
            >
              <div className="has-text-centered">
                <div className="has-text-primary">
                  <FaAddressCard size="4em" />
                </div>
                <br />
                Tu RFC ya aparece registrado en nuestro sistema y por el momento
                no podemos continuar con el proceso. De antemano, agradecemos tu
                preferencia.
                <br />
                <br />
                <strong>De antemano, agradecemos tu preferencia.</strong>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default Form1;
