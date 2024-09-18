// cspell: ignore boton, Swal

let contadorManos = 1;

const comenzarApuesta = () => {
  if (contadorManos % 2 !== 0) {
    // Mano impar: el jugador apuesta primero
    document.getElementById("cpuDealer").style.display = "inline-block";
    document.getElementById("dealer").style.display = "none";
  } else {
    // Mano par: la CPU apuesta primero
    document.getElementById("dealer").style.display = "inline-block";
    document.getElementById("cpuDealer").style.display = "none";
    document.getElementById("boton-apostar").style.display = "none";
    document.getElementById("boton-ver-sin-apostar").style.display = "none";
    document.getElementById("boton-verRespuestasCPU").style.display =
      "inline-block";
  }
};

let DineroJugador = 100;

const Dinero_Jugador = document.getElementById("dineroJugador");
Dinero_Jugador.innerText = DineroJugador;

let pozo = 0;

function actualizarDineroJugador() {
  Dinero_Jugador.innerText = DineroJugador;
}

function actualizarPozo() {
  document.getElementById("pozoJuego").innerText = pozo;
}

const pozo_Juego = document.getElementById("pozoJuego");
pozo_Juego.innerText = pozo;

let cartasDelJugador = [];
let cartasCPU = [];

document.getElementById("boton-jugar").addEventListener("click", () => {
  const { cartasJugador, cartasMaquina } = Mazo(5);

  cartasDelJugador = cartasJugador;
  cartasCPU = cartasMaquina;

  mostrarCartas(cartasJugador, "cartas-jugador");
  document.getElementById("tituloDineroJugador").style.display = "inline-block";
  document.getElementById("titulo-jugador").style.display = "inline-block";
  document.getElementById("boton-apostar").style.display = "inline-block";
  document.getElementById("boton-ver-sin-apostar").style.display =
    "inline-block";
  document.getElementById("boton-irse").style.display = "inline-block";
  document.getElementById("boton-jugar").style.display = "none";

  comenzarApuesta();
});

document.getElementById("boton-apostar").addEventListener("click", () => {
  document.getElementById("form-apuesta").style.display = "flex";
  document.getElementById("boton-apostar").style.display = "none";
  document.getElementById("tituloPozoJuego").style.display = "inline-block";
});

document
  .getElementById("boton-ver-sin-apostar")
  .addEventListener("click", () => {
    document.getElementById("boton-apostar").style.display = "none";
    document.getElementById("boton-verRespuestasCPU").style.display =
      "inline-block";
    document.getElementById("boton-ver-sin-apostar").style.display = "none";
  });

document.getElementById("boton-irse").addEventListener("click", () => {
  mostrarCartas(cartasCPU, "cartas-cpu");
  document.getElementById("titulo-cpu").style.display = "inline-block";
  document.getElementById("nuevaMano").style.display = "inline-block";
  document.getElementById("cartas-cpu").style.display = "flex";
  document.getElementById("boton-apostar").style.display = "none";
  document.getElementById("boton-ver-sin-apostar").style.display = "none";
  document.getElementById("boton-verRespuestasCPU").style.display = "none";
  document.getElementById("boton-irse").style.display = "none";
});

document.getElementById("nuevaMano").addEventListener("click", () => {
  const { cartasJugador, cartasMaquina } = Mazo(5);

  mostrarCartas(cartasJugador, "cartas-jugador");

  cartasDelJugador = cartasJugador;
  cartasCPU = cartasMaquina;

  document.getElementById("titulo-jugador").style.display = "inline-block";
  document.getElementById("tituloDineroJugador").style.display = "inline-block";
  document.getElementById("titulo-jugador").style.display = "inline-block";
  document.getElementById("boton-apostar").style.display = "inline-block";
  document.getElementById("boton-ver-sin-apostar").style.display =
    "inline-block";
  document.getElementById("boton-irse").style.display = "inline-block";
  document.getElementById("titulo-cpu").style.display = "none";
  document.getElementById("nuevaMano").style.display = "none";
  document.getElementById("cartas-cpu").style.display = "none";
  contadorManos++;
  console.log(contadorManos);
  comenzarApuesta();
});
