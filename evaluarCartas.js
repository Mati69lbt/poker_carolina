// cspell: ignore Póker

const valorCarta = (carta) => {
  const valor = carta.split(" - ")[0];
  if (valor === "J") return 11;
  if (valor === "Q") return 12;
  if (valor === "K") return 13;
  if (valor === "A") return 14;
  return parseInt(valor);
};

const evaluarMano = (mano) => {
  const palosArray = [
    { nombre: "Corazón", emoji: "♥" },
    { nombre: "Trébol", emoji: "♣" },
    { nombre: "Pica", emoji: "♠" },
    { nombre: "Diamante", emoji: "♦" },
  ];

  const cartasConNombre = mano.map((carta) => {
    const paloEncontrado = palosArray.find((p) => p.emoji === carta.palo);
    const nombrePalo = paloEncontrado ? paloEncontrado.nombre : carta.palo;
    return `${carta.carta} - ${nombrePalo}`;
  });

  const valores = cartasConNombre.map((carta) => carta.split(" - ")[0]);

  const palos = cartasConNombre.map((carta) => carta.split(" - ")[1]);

  const conteo = {};

  for (let carta of cartasConNombre) {
    const valor = carta.split(" - ")[0];
    conteo[valor] = (conteo[valor] || 0) + 1;
  }
  const maxValor = Math.max(...Object.values(conteo));

  const esColor = palos.every((palo) => palo === palos[0]);
  const esEscalera =
    valores.length === 5 &&
    valores
      .map(Number)
      .sort((a, b) => a - b)
      .every((val, i, arr) => i === 0 || val === arr[i - 1] + 1);
  const esEscaleraReal =
    esEscalera && valores.sort((a, b) => a - b).join(",") === "10,11,12,13,14";

  const valorJugada = Object.keys(conteo).find(
    (valor) => conteo[valor] === maxValor
  );

  if (esColor && esEscaleraReal)
    return {
      tipo: "Escalera Real",
      juego: "Escalera Real",
      cartas: cartasConNombre,
      conteo,
    };
  if (maxValor === 4)
    return {
      tipo: "Poker",
      juego: `Póker de ${valorJugada}`,
      cartas: cartasConNombre,
      conteo,
    };
  if (maxValor === 3 && Object.keys(conteo).length === 2)
    return {
      tipo: "Full",
      juego: `Full de ${valorJugada}`,
      cartas: cartasConNombre,
      conteo,
    };
  if (esColor)
    return {
      tipo: "Color",
      juego: `Color de ${palos[0]}`,
      cartas: cartasConNombre,
      conteo,
    };
  if (esEscalera)
    return {
      tipo: "Escalera",
      juego: `Escalera`,
      cartas: cartasConNombre,
      conteo,
    };
  if (maxValor === 3)
    return {
      tipo: "Pierna",
      juego: `Pierna de ${valorJugada}`,
      cartas: cartasConNombre,
      conteo,
    };
  if (maxValor === 2 && Object.keys(conteo).length === 3)
    return {
      tipo: "Doble Par",
      juego: `Doble Par de ${Object.keys(conteo)
        .filter((valor) => conteo[valor] === 2)
        .join(" y ")}`,
      cartas: cartasConNombre,
      conteo,
    };
  if (maxValor === 2)
    return {
      tipo: "Par",
      juego: `Par de ${valorJugada}`,
      cartas: cartasConNombre,
      conteo,
    };
  return {
    tipo: "Carta Alta",
    juego: "Carta Alta",
    cartas: cartasConNombre,
    conteo,
  };
};
