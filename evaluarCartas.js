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

  const formatearCartas = (cartas) => {
    return cartas.map((carta) => carta.replace(" - ", " de ")).join(", ");
  };

  const esColor = palos.every((palo) => palo === palos[0]);
  const esEscalera =
    valores.length === 5 &&
    valores
      .map(Number)
      .sort((a, b) => a - b)
      .every((val, i, arr) => i === 0 || val === arr[i - 1] + 1);
  const esEscaleraReal =
    esEscalera && valores.sort((a, b) => a - b).join(",") === "10,11,12,13,14";

  if (esColor && esEscaleraReal)
    return { tipo: "Escalera Real", cartas: formatearCartas(cartasConNombre) };
  if (maxValor === 4)
    return { tipo: "Póker", cartas: formatearCartas(cartasConNombre) };
  if (maxValor === 3 && Object.keys(conteo).length === 2)
    return { tipo: "Full", cartas: formatearCartas(cartasConNombre) };
  if (esColor)
    return { tipo: "Color", cartas: formatearCartas(cartasConNombre) };
  if (esEscalera)
    return { tipo: "Escalera", cartas: formatearCartas(cartasConNombre) };
  if (maxValor === 3)
    return { tipo: "Pierna", cartas: formatearCartas(cartasConNombre) };
  if (maxValor === 2 && Object.keys(conteo).length === 3)
    return { tipo: "Doble Par", cartas: formatearCartas(cartasConNombre) };
  if (maxValor === 2)
    return { tipo: "Par", cartas: formatearCartas(cartasConNombre) };
  return { tipo: "Carta Alta", cartas: formatearCartas(cartasConNombre) };
};
