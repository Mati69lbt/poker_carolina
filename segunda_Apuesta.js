// cspell: ignore boton, Swal, Póker, span_seleccionCartas

document.getElementById("boton-Respuesta_CPU").addEventListener("click", () => {
  
  const manoCPU_SA = evaluarMano(cartasCPU_Nuevas);
  
  if (manoCPU_SA.tipo === "Carta Alta") {
    Swal.fire("La IA se Retira").then(() => {
      mostrarCartas(cartasCPU, "cartas-cpu");
      document.getElementById("titulo-cpu").style.display = "inline-block";
      document.getElementById("nuevaMano").style.display = "inline-block";
      document.getElementById("cartas-cpu").style.display = "flex";
      document.getElementById("boton-apostar").style.display = "none";
      document.getElementById("boton-pasar").style.display = "none";
      document.getElementById("boton-ver-sin-apostar").style.display = "none";
      document.getElementById("boton-verRespuestasCPU").style.display = "none";
      document.getElementById("boton-Respuesta_CPU").style.display = "none";
      document.getElementById("boton-irse").style.display = "none";
      document.getElementById("tituloPozoJuego").style.display = "none";

      pozo = 0;

      DineroJugador += valorApuesta;

      actualizarDineroJugador();
      actualizarPozo();
    });
  } else if (
    (manoCPU_SA.tipo == "Par" ||
      manoCPU_SA.tipo == "Pierna" ||
      manoCPU_SA.tipo == "Doble Par") &&
    valorApuesta < 8
  ) {
    Swal.fire("La IA lo Paga").then(() => {
      document.getElementById("boton-ganador").style.display = "inline-block";
      document.getElementById("boton-Respuesta_CPU").style.display = "none";
      pozo += valorApuesta;
      pozo_Juego.innerText = pozo;
    });
  } else if (
    (manoCPU_SA.tipo === "Par" ||
      manoCPU_SA.tipo === "Pierna" ||
      manoCPU_SA.tipo === "Doble Par") &&
    valorApuesta > 7
  ) {
    Swal.fire("La IA se Retira").then(() => {
      mostrarCartas(cartasCPU, "cartas-cpu");
      document.getElementById("titulo-cpu").style.display = "inline-block";
      document.getElementById("nuevaMano").style.display = "inline-block";
      document.getElementById("cartas-cpu").style.display = "flex";
      document.getElementById("boton-apostar").style.display = "none";
      document.getElementById("boton-ver-sin-apostar").style.display = "none";
      document.getElementById("boton-verRespuestasCPU").style.display = "none";
      document.getElementById("boton-Respuesta_CPU").style.display = "none";
      document.getElementById("boton-irse").style.display = "none";
      document.getElementById("tituloPozoJuego").style.display = "none";

      pozo = 0;

      DineroJugador += valorApuesta;

      actualizarDineroJugador();
      actualizarPozo();
    });
  } else if (
    (manoCPU_SA.tipo === "Full" ||
      manoCPU_SA.tipo === "Escalera" ||
      manoCPU_SA.tipo === "Póker" ||
      manoCPU_SA.tipo === "Escalera Real") &&
    valorApuesta < 7
  ) {
    const segundaApuesta = valorApuesta;
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
       
        DineroJugador += segundaApuesta;
        DineroJugador -= apuestaCPU;
        actualizarDineroJugador();
        pozo += apuestaCPU + apuestaCPU;
        actualizarPozo();

        document.getElementById("boton-ganador").style.display = "inline-block";
        document.getElementById("boton-Respuesta_CPU").style.display = "none";

        pozo_Juego.innerText = pozo;
      } else {
       
        mostrarCartas(cartasCPU, "cartas-cpu");
        document.getElementById("titulo-cpu").style.display = "inline-block";
        document.getElementById("nuevaMano").style.display = "inline-block";
        document.getElementById("cartas-cpu").style.display = "flex";
        document.getElementById("boton-apostar").style.display = "none";
        document.getElementById("boton-ver-sin-apostar").style.display = "none";
        document.getElementById("boton-verRespuestasCPU").style.display =
          "none";
        document.getElementById("boton-Respuesta_CPU").style.display = "none";
        document.getElementById("boton-irse").style.display = "none";
        document.getElementById("tituloPozoJuego").style.display = "none";

        pozo = 0;

        DineroJugador += valorApuesta;
        actualizarDineroJugador();
      }
    });
  } else if (
    (manoCPU_SA.tipo === "Full" ||
      manoCPU_SA.tipo === "Escalera" ||
      manoCPU_SA.tipo === "Póker" ||
      manoCPU_SA.tipo === "Escalera Real") &&
    valorApuesta > 6
  ) {
    Swal.fire("La IA lo Paga").then(() => {
      document.getElementById("boton-ganador").style.display = "inline-block";
      document.getElementById("boton-Respuesta_CPU").style.display = "none";
      pozo += valorApuesta;
      pozo_Juego.innerText = pozo;
    });
  }
  formularioUsado = false;  
});
