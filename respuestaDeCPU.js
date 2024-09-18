// cspell: ignore boton, Swal, Póker, span_seleccionCartas

document
  .getElementById("boton-verRespuestasCPU")
  .addEventListener("click", () => { 

    const manoCPU = evaluarMano(cartasCPU);
    console.log(manoCPU);

    valorApuesta == undefined ? (valorApuesta = 0) : valorApuesta;

    if (contadorManos % 2 == 0) {
      if (
        manoCPU.tipo == "Carta Alta" ||
        manoCPU.tipo == "Par" ||
        manoCPU.tipo === "Pierna"
      ) {
        seleccionarCartas();
        Swal.fire("La computadora sigue jugando, pero no apuesta");

        document.getElementById("boton-verRespuestasCPU").style.display =
          "none";
        document.getElementById("span_seleccionCartas").style.display =
          "inline-block";
        document.getElementById("tituloPozoJuego").style.display =
          "inline-block";
        document.getElementById("boton-cambiar").style.display = "inline-block";
        document.getElementById("boton-apostar").style.display = "inline-block";
        document.getElementById("boton-ver-sin-apostar").style.display =
          "inline-block";
      }
    }

    if (
      (manoCPU.tipo == "Carta Alta" ||
        manoCPU.tipo == "Par" ||
        manoCPU.tipo === "Pierna") &&
      valorApuesta == 0 &&
      contadorManos % 2 !== 0
    ) {
      seleccionarCartas();
      Swal.fire("La computadora sigue jugando");
      document.getElementById("boton-verRespuestasCPU").style.display = "none";
      document.getElementById("boton-cambiar").style.display = "inline-block";
      document.getElementById("span_seleccionCartas").style.display =
        "inline-block";
    }

    if (manoCPU.tipo == "Carta Alta" && valorApuesta !== 0) {
      Swal.fire("La computadora se retira");
      mostrarCartas(cartasCPU, "cartas-cpu");
      document.getElementById("titulo-cpu").style.display = "inline-block";
      document.getElementById("nuevaMano").style.display = "inline-block";
      document.getElementById("cartas-cpu").style.display = "flex";
      document.getElementById("boton-apostar").style.display = "none";
      document.getElementById("boton-ver-sin-apostar").style.display = "none";
      document.getElementById("boton-verRespuestasCPU").style.display = "none";
      document.getElementById("boton-irse").style.display = "none";
      pozo = 0;

      DineroJugador += valorApuesta;

      actualizarPozo(pozo);
      actualizarDineroJugador(DineroJugador);
    }

    if (
      (manoCPU.tipo === "Par" ||
        manoCPU.tipo === "Doble Par" ||
        manoCPU.tipo === "Pierna") &&
      valorApuesta !== 0
    ) {
      seleccionarCartas();
      Swal.fire("La computadora pagó tu apuesta");
      document.getElementById("boton-verRespuestasCPU").style.display = "none";
       document.getElementById("span_seleccionCartas").style.display =
         "inline-block";
      document.getElementById("boton-cambiar").style.display = "inline-block";
      let valorApuestaCPU = valorApuesta;
      pozo += valorApuestaCPU;
      actualizarPozo();
    }
    if (manoCPU.tipo === "Escalera Real" || manoCPU.tipo === "Póker") {
      let valorApuestaCPU = 10;
      pozo += valorApuestaCPU;
      actualizarPozo();
    }
  });


