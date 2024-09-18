// cspell: ignore boton, Swal, deseleccionada, seleccionHabilitada

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
  contenedor.innerHTML = ""; // Limpiar cualquier contenido previo
  cartas.forEach(({ carta, palo, color }, index) => {
    const cartaElemento = document.createElement("div");
    cartaElemento.classList.add("carta");

    cartaElemento.setAttribute("data-index", index);

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

let cartasSeleccionadas = [];
let seleccionHabilitada = true;

seleccionarCartas = () => {
  const cartas = document.querySelectorAll(".carta");

  cartas.forEach((carta) => {
    carta.addEventListener("click", function () {
      if (!seleccionHabilitada) return;
      this.classList.toggle("seleccionada");

      // Actualizar la lista de cartas seleccionadas
      const index = parseInt(this.getAttribute("data-index"));

      if (this.classList.contains("seleccionada")) {
        cartasSeleccionadas.push(index); // Añadir la carta seleccionada (guardar índice)
      } else {
        // Remover la carta si es deseleccionada (remover índice)
        cartasSeleccionadas = cartasSeleccionadas.filter((i) => i !== index);
      }
    });
  });
};

let cartasJugadorActualizadas = []; // Variable para guardar las cartas actualizadas del jugador

document.getElementById("boton-cambiar").addEventListener("click", () => {
  if (cartasSeleccionadas.length === 0) {
    Swal.fire("No hay cartas seleccionadas");
    return; // Salir si no hay cartas seleccionadas
  }

  console.log(cartasAdicionalesJyCpu);

  console.log(cartasAdicionalesJyCpu.length);

  const nuevasCartas = cartasAdicionalesJyCpu.splice(
    5,
    cartasSeleccionadas.length
  );

  console.log(cartasAdicionalesJyCpu.length);

  const contenedor = document.getElementById("cartas-jugador");
  const cartasJugadorActuales = [...contenedor.querySelectorAll(".carta")];

  // Inicializar cartasJugadorActualizadas con las cartas actuales (no seleccionadas)
  cartasJugadorActuales.forEach((carta, index) => {
    if (!cartasJugadorActualizadas[index]) {
      cartasJugadorActualizadas[index] = {
        carta: carta.querySelector("div").textContent,
        palo: carta.querySelector(".palo").textContent,
        color: carta.classList.contains("rojo") ? "rojo" : "negro",
      };
    }
  });

  // Reemplazar las cartas seleccionadas por las nuevas
  cartasSeleccionadas.forEach((index, i) => {
    const cartaActual = cartasJugadorActuales[index];
    const nuevaCarta = nuevasCartas[i];

    // Actualizar visualmente la carta
    cartaActual.querySelector("div").textContent = nuevaCarta.carta;
    cartaActual.querySelector(".palo").textContent = nuevaCarta.palo;

    // Remover la clase seleccionada de la carta
    cartaActual.classList.remove("seleccionada");

    // Actualizar la carta en la variable global `cartasJugadorActualizadas`
    cartasJugadorActualizadas[index] = nuevaCarta;
  });

  // Limpiar las cartas seleccionadas
  cartasSeleccionadas = [];

  seleccionHabilitada = false;

  // Ocultar el botón "Cambiar" después de la acción
  document.getElementById("boton-cambiar").style.display = "none";

  document.getElementById("boton-NuevaApuesta").style.display = "inline-block";
  document.getElementById("boton-apostar").style.display = "none";
  document.getElementById("boton-ver-sin-apostar").style.display =
    "inline-block";

  // Aquí ya tienes actualizadas todas las cartas del jugador (tanto las seleccionadas como las no seleccionadas)
  console.log(cartasJugadorActualizadas);
  const a = evaluarMano(cartasJugadorActualizadas);
  console.log(a);
});
