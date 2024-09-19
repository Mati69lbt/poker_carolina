// cspell: ignore boton, Swal, Póker, span_seleccionCartas, seleccionHabilitada

document
  .getElementById("boton-verRespuestasCPU")
  .addEventListener("click", () => {
    document.getElementById("boton-irse").style.display = "none";
    document.getElementById("boton-verRespuestasCPU").style.display = "none";
    seleccionHabilitada = true;
    seleccionarCartas();

    const manoCPU = evaluarMano(cartasCPU);

    if (manoCPU.tipo == "Carta Alta" && valorApuesta > 4) {
      Swal.fire("La IA se Retira").then(() => {
        mostrarCartas(cartasCPU, "cartas-cpu");
        document.getElementById("titulo-cpu").style.display = "inline-block";
        document.getElementById("nuevaMano").style.display = "inline-block";
        document.getElementById("cartas-cpu").style.display = "flex";
        document.getElementById("boton-apostar").style.display = "none";
        document.getElementById("boton-pasar").style.display = "none";
        document.getElementById("boton-ver-sin-apostar").style.display = "none";
        document.getElementById("boton-verRespuestasCPU").style.display =
          "none";
        document.getElementById("boton-irse").style.display = "none";
        document.getElementById("tituloPozoJuego").style.display = "none";

        pozo = 0;

        DineroJugador += valorApuesta;

        actualizarDineroJugador();
        actualizarPozo();
        formularioUsado = false;
      });
    } else if (manoCPU.tipo == "Carta Alta" && valorApuesta < 5) {
      Swal.fire("La IA paga tu Apuesta").then(() => {
        document.getElementById("boton-verRespuestasCPU").style.display =
          "none";
        document.getElementById("span_seleccionCartas").style.display =
          "inline-block";
        document.getElementById("tituloPozoJuego").style.display =
          "inline-block";
        document.getElementById("boton-cambiar").style.display = "inline-block";
        document.getElementById("boton-pasar").style.display = "inline-block";
        document.getElementById("boton-apostar").style.display = "none";
        document.getElementById("boton-ver-sin-apostar").style.display = "none";
        pozo += valorApuesta;
        actualizarPozo();
      });
    } else if (
      manoCPU.tipo === "Par" ||
      manoCPU.tipo === "Doble Par" ||
      manoCPU.tipo === "Pierna"
    ) {
      if (valorApuesta > 7) {
        Swal.fire("La IA se Retira").then(() => {
          mostrarCartas(cartasCPU, "cartas-cpu");
          document.getElementById("titulo-cpu").style.display = "inline-block";
          document.getElementById("nuevaMano").style.display = "inline-block";
          document.getElementById("cartas-cpu").style.display = "flex";
          document.getElementById("cartas-pasar").style.display = "flex";
          document.getElementById("boton-none").style.display = "none";
          document.getElementById("boton-apostar").style.display = "none";
          document.getElementById("boton-ver-sin-apostar").style.display =
            "none";
          document.getElementById("boton-verRespuestasCPU").style.display =
            "none";
          document.getElementById("boton-irse").style.display = "none";
          document.getElementById("tituloPozoJuego").style.display = "none";

          pozo = 0;

          DineroJugador += valorApuesta;

          actualizarDineroJugador();
          actualizarPozo();
          formularioUsado = false;
        });
      } else {
        Swal.fire("La IA paga tu Apuesta").then(() => {
          document.getElementById("boton-verRespuestasCPU").style.display =
            "none";
          document.getElementById("span_seleccionCartas").style.display =
            "inline-block";
          document.getElementById("tituloPozoJuego").style.display =
            "inline-block";
          document.getElementById("boton-cambiar").style.display =
            "inline-block";
          document.getElementById("boton-pasar").style.display = "inline-block";
          document.getElementById("boton-apostar").style.display = "none";
          document.getElementById("boton-ver-sin-apostar").style.display =
            "none";
          pozo += valorApuesta;
          actualizarPozo();
        });
      }
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

          document.getElementById("boton-verRespuestasCPU").style.display =
            "none";
          document.getElementById("span_seleccionCartas").style.display =
            "inline-block";
          document.getElementById("tituloPozoJuego").style.display =
            "inline-block";
          document.getElementById("boton-cambiar").style.display =
            "inline-block";
          document.getElementById("boton-pasar").style.display = "inline-block";
          document.getElementById("boton-apostar").style.display = "none";
          document.getElementById("boton-ver-sin-apostar").style.display =
            "none";
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

          DineroJugador += valorApuesta;

          actualizarDineroJugador();
          formularioUsado = false;
        }
      });
    } else if (
      (manoCPU.tipo === "Full" ||
        manoCPU.tipo === "Escalera" ||
        manoCPU.tipo === "Póker" ||
        manoCPU.tipo === "Escalera Real") &&
      valorApuesta > 6
    ) {
      Swal.fire("La IA paga tu Apuesta").then(() => {
        document.getElementById("boton-verRespuestasCPU").style.display =
          "none";
        document.getElementById("span_seleccionCartas").style.display =
          "inline-block";
        document.getElementById("tituloPozoJuego").style.display =
          "inline-block";
        document.getElementById("boton-cambiar").style.display = "inline-block";
        document.getElementById("boton-pasar").style.display = "inline-block";
        document.getElementById("boton-apostar").style.display = "none";
        document.getElementById("boton-ver-sin-apostar").style.display = "none";
        pozo += valorApuesta;
        actualizarPozo();
      });
    }
  });
