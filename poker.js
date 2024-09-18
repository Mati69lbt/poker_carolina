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
let cartasAdicionalesJyCpu = [];

document.getElementById("boton-jugar").addEventListener("click", () => {
  const { cartasJugador, cartasMaquina, cartasAdicionales } = Mazo();

  const manoCPU = evaluarMano(cartasMaquina);
  console.log(manoCPU);

  cartasDelJugador = cartasJugador;
  cartasCPU = cartasMaquina;
  cartasAdicionalesJyCpu = cartasAdicionales;

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
  mostrarCartas(cartasCPU_Nuevas, "cartas-cpu");
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

document.getElementById("boton-NuevaApuesta").addEventListener("click", () => {
  document.getElementById("form-apuesta").style.display = "flex";
  document.getElementById("boton-NuevaApuesta").style.display = "none";
  document.getElementById("boton-verRespuestasCPU").style.display = "none";

  const botonApostar = document.querySelector(".boton-apostar-formulario");

  // Cambiar el texto
  botonApostar.innerText = "Ultima Apuesta";

  // Cambiar el id
  botonApostar.setAttribute("id", "ultima-apuesta");

  document.getElementById("ultima-apuesta").addEventListener("click", () => {
    document.getElementById("boton-Respuesta_CPU").style.display =
      "inline-block";
    document.getElementById("boton-verRespuestasCPU").style.display = "none";

    const botonApostar = document.getElementById("ultima-apuesta");

    console.log(botonApostar.id);

    botonApostar.setAttribute("id", "boton-apostar-formulario");
    console.log(botonApostar.id);
  });
  
});
