const monto = {
  FORMAL: {
    min: 3000,
    max: 35000
  },
  MICRONEGOCIO: {
    min: 2500,
    max: 15000
  }
};

const plazo = {
  S: {
    short: {
      min: 2500,
      max: 3500,
      plazos: [26, 40, 52]
    },
    long: {
      min: 3501,
      max: 15000,
      plazos: [26, 40, 52, 65, 78]
    }
  },
  Q: {
    short: {
      min: 3000,
      max: 3500,
      plazos: [12, 24]
    },
    long: {
      min: 3501,
      max: 35000,
      plazos: [12, 24, 36, 48]
    }
  }
};

export default { monto, plazo };
