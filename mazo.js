const Mazo = () => {
  const cartas = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
  const palos = [
    { nombre: "Corazón", emoji: "♥", color: "rojo" },
    { nombre: "Trébol", emoji: "♣", color: "negro" },
    { nombre: "Pica", emoji: "♠", color: "negro" },
    { nombre: "Diamante", emoji: "♦", color: "rojo" },
  ];

  const mazoCompleto = [];
  for (let carta of cartas) {
    for (let palo of palos) {
      mazoCompleto.push({ carta, palo: palo.emoji, color: palo.color });
    }
  }

  const mezclar = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  mezclar(mazoCompleto);

  const repartirCartas = (cantidad, mazo) => {
    const cartasRepartidas = [];
    for (let i = 0; i < cantidad; i++) {
      cartasRepartidas.push(mazo.pop());
    }
    return cartasRepartidas;
  };

  const cartasJugador = repartirCartas(5, mazoCompleto);
  const cartasMaquina = repartirCartas(5, mazoCompleto);

  return { cartasJugador, cartasMaquina };
};

const mostrarCartas = (cartas, contenedorId) => {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = ""; // Limpiar cualquier contenido previo
  cartas.forEach(({ carta, palo, color }) => {
    const cartaElemento = document.createElement("div");
    cartaElemento.classList.add("carta");

    if (color === "rojo") {
      cartaElemento.classList.add("roja");
    }

    const numeroElemento = document.createElement("div");
    numeroElemento.textContent = carta;
    const paloElemento = document.createElement("div");
    paloElemento.classList.add("palo");
    paloElemento.textContent = palo;

    cartaElemento.appendChild(numeroElemento);
    cartaElemento.appendChild(paloElemento);
    contenedor.appendChild(cartaElemento);
  });
};
