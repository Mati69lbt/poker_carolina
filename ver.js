// cspell: ignore boton, Swal, Póker, span_seleccionCartas, seleccionHabilitada

document
  .getElementById("boton-ver-sin-apostar")
  .addEventListener("click", () => {
    document.getElementById("boton-NuevaApuesta").style.display = "none";
    document.getElementById("boton-Respuesta_CPU").style.display = "none";
    document.getElementById("boton-verRespuestasCPU").style.display = "none";
    formularioUsado = false;

    const manoCPU = evaluarMano(cartasCPU);

    if (manoCPU.tipo === "Carta Alta" || manoCPU.tipo === "Par") {
      Swal.fire("La IA tampoco aumenta la apuesta").then(() => {
        document.getElementById("boton-ver-sin-apostar").style.display = "none";
        document.getElementById("boton-NuevaApuesta").style.display = "none";
        document.getElementById("boton-ganador").style.display = "inline-block";
      });
    } else if (manoCPU.tipo === "Doble Par" || manoCPU.tipo === "Pierna") {
      const apuestaCPU = Math.floor(Math.random() * (6 - 2 + 1)) + 2;
      Swal.fire({
        title: `La IA quiere aumentar la apuesta a ${apuestaCPU}`,
        text: "¿Aceptas la nueva apuesta?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Rechazar",
      }).then((result) => {
        if (result.isConfirmed) {
          DineroJugador -= apuestaCPU;
          actualizarDineroJugador();
          pozo += apuestaCPU + apuestaCPU;
          actualizarPozo();

          document.getElementById("boton-ganador").style.display =
            "inline-block";
        } else {
          mostrarCartas(cartasCPU, "cartas-cpu");
          document.getElementById("titulo-cpu").style.display = "inline-block";
          document.getElementById("nuevaMano").style.display = "inline-block";
          document.getElementById("cartas-cpu").style.display = "flex";
          document.getElementById("boton-apostar").style.display = "none";
          document.getElementById("boton-ver-sin-apostar").style.display =
            "none";
          document.getElementById("boton-verRespuestasCPU").style.display =
            "none";
          document.getElementById("boton-pasar").style.display = "none";
          document.getElementById("boton-irse").style.display = "none";
          document.getElementById("tituloPozoJuego").style.display = "none";

          pozo = 0;

          DineroJugador -= valorApuesta;

          actualizarDineroJugador();
          formularioUsado = false;
        }
      });
    } else if (
      (manoCPU.tipo === "Full" ||
        manoCPU.tipo === "Escalera" ||
        manoCPU.tipo === "Póker" ||
        manoCPU.tipo === "Escalera Real") &&
      valorApuesta < 7
    ) {
      const apuestaInicialJugador = valorApuesta;
      const apuestaCPU = Math.floor(Math.random() * (10 - 6 + 1)) + 6;
      Swal.fire({
        title: `La IA quiere aumentar la apuesta a ${apuestaCPU}`,
        text: "¿Aceptas la nueva apuesta?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Rechazar",
      }).then((result) => {
        if (result.isConfirmed) {
          DineroJugador += apuestaInicialJugador;
          DineroJugador -= apuestaCPU;
          actualizarDineroJugador();
          pozo = 0;
          pozo += apuestaCPU + apuestaCPU;
          actualizarPozo();

          document.getElementById("boton-ganador").style.display =
            "inline-block";
        } else {
          mostrarCartas(cartasCPU, "cartas-cpu");
          document.getElementById("titulo-cpu").style.display = "inline-block";
          document.getElementById("nuevaMano").style.display = "inline-block";
          document.getElementById("cartas-cpu").style.display = "flex";
          document.getElementById("boton-apostar").style.display = "none";
          document.getElementById("boton-ver-sin-apostar").style.display =
            "none";
          document.getElementById("boton-verRespuestasCPU").style.display =
            "none";
          document.getElementById("boton-pasar").style.display = "none";
          document.getElementById("boton-irse").style.display = "none";
          document.getElementById("tituloPozoJuego").style.display = "none";

          pozo = 0;

          DineroJugador -= valorApuesta;

          actualizarDineroJugador();
          formularioUsado = false;
        }
      });
    }
  });
