// cspell: ignore boton, Swal, estadisticas

let DineroJugador = 100;

const Dinero_Jugador = document.getElementById("dineroJugador");
Dinero_Jugador.innerText = DineroJugador;

let pozo = 0;

function actualizarDineroJugador() {
  Dinero_Jugador.innerText = DineroJugador;
}

const pozo_Juego = document.getElementById("pozoJuego");
pozo_Juego.innerText = pozo;

function actualizarPozo() {
  document.getElementById("pozoJuego").innerText = pozo;
}

let cartasDelJugador = [];
let cartasCPU = [];
let cartasAdicionalesJyCpu = [];

document.getElementById("boton-jugar").addEventListener("click", () => {

  const { cartasJugador, cartasMaquina, cartasAdicionales } = Mazo();

  cartasDelJugador = cartasJugador;
  cartasCPU = cartasMaquina;
  cartasAdicionalesJyCpu = cartasAdicionales;

  mostrarCartas(cartasJugador, "cartas-jugador");
  document.getElementById("tituloDineroJugador").style.display = "inline-block";
  document.getElementById("titulo-jugador").style.display = "inline-block";
  document.getElementById("boton-apostar").style.display = "inline-block";
  document.getElementById("boton-irse").style.display = "inline-block";
  document.getElementById("boton-jugar").style.display = "none";  
});

document.getElementById("boton-apostar").addEventListener("click", () => {
  document.getElementById("form-apuesta").style.display = "flex";
  document.getElementById("boton-apostar").style.display = "none";
  document.getElementById("boton-irse").style.display = "inline-block";
  document.getElementById("tituloPozoJuego").style.display = "inline-block";
  pozo = 0;
  actualizarPozo();
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
  document.getElementById("form-apuesta").style.display = "none";
  document.getElementById("titulo-cpu").style.display = "inline-block";
  document.getElementById("nuevaMano").style.display = "inline-block";
  document.getElementById("cartas-cpu").style.display = "flex";
  document.getElementById("boton-apostar").style.display = "none";
  document.getElementById("boton-ver-sin-apostar").style.display = "none";
  document.getElementById("boton-verRespuestasCPU").style.display = "none";
  document.getElementById("boton-irse").style.display = "none";
});

document.getElementById("nuevaMano").addEventListener("click", () => {
  const { cartasJugador, cartasMaquina, cartasAdicionales } = Mazo();

  mostrarCartas(cartasJugador, "cartas-jugador");

  cartasDelJugador = cartasJugador;
  cartasCPU = cartasMaquina;
  cartasAdicionalesJyCpu = cartasAdicionales;  

  document.getElementById("titulo-cpu").style.display = "none";
  document.getElementById("nuevaMano").style.display = "none";
  document.getElementById("cartas-cpu").style.display = "none";
  document.getElementById("tituloDineroJugador").style.display = "inline-block";
  document.getElementById("titulo-jugador").style.display = "inline-block";
  document.getElementById("boton-apostar").style.display = "inline-block";
  document.getElementById("boton-irse").style.display = "inline-block";
  document.getElementById("boton-jugar").style.display = "none";
  document.getElementById("estadisticas").style.display = "none";
});

document.getElementById("boton-NuevaApuesta").addEventListener("click", () => {
  document.getElementById("form-apuesta").style.display = "flex";
  document.getElementById("boton-NuevaApuesta").style.display = "none";
  document.getElementById("boton-verRespuestasCPU").style.display = "none";
  document.getElementById("boton-ver-sin-apostar").style.display = "none";
});
