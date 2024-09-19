// cspell: ignore boton, Swal, deseleccionada, seleccionHabilitada, span_seleccionCartas, Póker

const Mazo = () => {
  const cartas = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];
  const palos = [
    { nombre: "Corazón", emoji: "♥", color: "rojo" },
    { nombre: "Trébol", emoji: "♣", color: "negro" },
    { nombre: "Pica", emoji: "♠", color: "negro" },
    { nombre: "Diamante", emoji: "♦", color: "rojo" },
  ];

  const valorCarta = (carta) => {
    if (typeof carta === "number") return carta;
    if (carta === "J") return 11;
    if (carta === "Q") return 12;
    if (carta === "K") return 13;
    if (carta === "A") return 14;
  };

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

  let cartasJugador = repartirCartas(5, mazoCompleto);
  let cartasMaquina = repartirCartas(5, mazoCompleto);
  let cartasAdicionales = repartirCartas(10, mazoCompleto);

  const ordenarCartas = (cartas) => {
    return cartas.sort((a, b) => valorCarta(b.carta) - valorCarta(a.carta));
  };

  cartasJugador = ordenarCartas(cartasJugador);
  cartasMaquina = ordenarCartas(cartasMaquina);

  return { cartasJugador, cartasMaquina, cartasAdicionales };
};

const mostrarCartas = (cartas, contenedorId) => {
  const contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";
  cartas.forEach(({ carta, palo, color }, index) => {
    const cartaElemento = document.createElement("div");
    cartaElemento.classList.add("carta");

    if (color === "rojo") {
      cartaElemento.classList.add("rojo");
    } else {
      cartaElemento.classList.remove("rojo");
    }
    cartaElemento.setAttribute("data-index", index);

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

let cartasSeleccionadas = [];
let seleccionHabilitada = true;

seleccionarCartas = () => {
  const cartas = document.querySelectorAll(".carta");

  cartas.forEach((carta) => {
    carta.addEventListener("click", function () {
      if (!seleccionHabilitada) return;
      this.classList.toggle("seleccionada");

      const index = parseInt(this.getAttribute("data-index"));

      if (this.classList.contains("seleccionada")) {
        cartasSeleccionadas.push(index);
      } else {
        cartasSeleccionadas = cartasSeleccionadas.filter((i) => i !== index);
      }
    });
  });
};

let cartasJugadorActualizadas = [];

document.getElementById("boton-cambiar").addEventListener("click", () => {
  document.getElementById("span_seleccionCartas").style.display = "none";
  if (cartasSeleccionadas.length === 0) {
    Swal.fire("No hay cartas seleccionadas");
    document.getElementById("span_seleccionCartas").style.display =
      "inline-block";
    return;
  }

  const nuevasCartas = cartasAdicionalesJyCpu.splice(
    0,
    cartasSeleccionadas.length
  );

  const contenedor = document.getElementById("cartas-jugador");
  const cartasJugadorActuales = [...contenedor.querySelectorAll(".carta")];

  cartasJugadorActuales.forEach((carta, index) => {
    if (!cartasJugadorActualizadas[index]) {
      cartasJugadorActualizadas[index] = {
        carta: carta.querySelector("div").textContent,
        palo: carta.querySelector(".palo").textContent,
        color: carta.classList.contains("rojo") ? "rojo" : "negro",
      };
    }
  });

  cartasSeleccionadas.forEach((index, i) => {
    const cartaActual = cartasJugadorActuales[index];
    const nuevaCarta = nuevasCartas[i];

    cartaActual.querySelector("div").textContent = nuevaCarta.carta;
    cartaActual.querySelector(".palo").textContent = nuevaCarta.palo;

    cartaActual.classList.remove("seleccionada");

    cartasJugadorActualizadas[index] = nuevaCarta;
  });

  cartasSeleccionadas = [];

  seleccionHabilitada = false;

  document.getElementById("boton-cambiar").style.display = "none";
  document.getElementById("boton-pasar").style.display = "none";
  document.getElementById("boton-NuevaApuesta").style.display = "inline-block";
  document.getElementById("boton-apostar").style.display = "none";
  document.getElementById("boton-ver-sin-apostar").style.display =
    "inline-block";
});

document.getElementById("boton-pasar").addEventListener("click", () => {
  seleccionHabilitada = false;
  document.getElementById("boton-cambiar").style.display = "none";
  document.getElementById("span_seleccionCartas").style.display = "none";
  document.getElementById("boton-pasar").style.display = "none";
  document.getElementById("boton-NuevaApuesta").style.display = "inline-block";
  document.getElementById("boton-apostar").style.display = "none";
  document.getElementById("boton-ver-sin-apostar").style.display =
    "inline-block";

  const manoCPU = evaluarMano(cartasCPU);

  let { tipo, conteo, cartas: mano } = manoCPU;

  let cartasQueQuedan = [];

  if (tipo.includes("Par")) {
    const pares = Object.keys(conteo).filter((valor) => conteo[valor] === 2);
    if (pares.length === 2) {
      tipo = "Doble Par";
      cartasQueQuedan = mano.filter((carta) =>
        pares.includes(carta.split(" - ")[0])
      );
    } else {
      const valorClave = pares[0];
      cartasQueQuedan = mano.filter(
        (carta) => carta.split(" - ")[0] === valorClave
      );
    }
  } else if (tipo.includes("Pierna")) {
    const valorClave = Object.keys(conteo).find((valor) => conteo[valor] === 3);
    cartasQueQuedan = mano.filter(
      (carta) => carta.split(" - ")[0] === valorClave
    );
  } else if (tipo.includes("Póker")) {
    const valorClave = Object.keys(conteo).find((valor) => conteo[valor] === 4);
    cartasQueQuedan = mano.filter(
      (carta) => carta.split(" - ")[0] === valorClave
    );
  } else if (tipo.includes("Full")) {
    const valorPierna = Object.keys(conteo).find(
      (valor) => conteo[valor] === 3
    );
    const valorPar = Object.keys(conteo).find((valor) => conteo[valor] === 2);
    cartasQueQuedan = mano.filter(
      (carta) =>
        carta.split(" - ")[0] === valorPierna ||
        carta.split(" - ")[0] === valorPar
    );
  } else if (tipo.includes("Carta Alta")) {
    cartasQueQuedan = [];
  } else {
    cartasQueQuedan = mano;
  }

  cantCartasACambiar = 5 - cartasQueQuedan.length;

  const nuevasCartas = cartasAdicionalesJyCpu.splice(0, cantCartasACambiar);

  const palos = [
    { nombre: "Corazón", emoji: "♥", color: "rojo" },
    { nombre: "Trébol", emoji: "♣", color: "negro" },
    { nombre: "Pica", emoji: "♠", color: "negro" },
    { nombre: "Diamante", emoji: "♦", color: "rojo" },
  ];

  function transformarCartas(cartas) {
    return cartas.map((carta) => {
      const [valorCarta, nombrePalo] = carta.split(" - ");

      const palo = palos.find((p) => p.nombre === nombrePalo);

      return {
        carta: valorCarta,
        palo: palo.emoji,
        color: palo.color,
      };
    });
  }

  const cartasCPU_Transformadas = transformarCartas(cartasQueQuedan);

  cartasCPU_Nuevas = cartasCPU_Transformadas.concat(nuevasCartas);
});
