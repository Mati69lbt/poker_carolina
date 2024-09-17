// cspell: ignore boton, Swal, Póker

document
  .getElementById("boton-verRespuestasCPU")
  .addEventListener("click", () => {
    console.log(cartasCPU);

    const manoCPU = evaluarMano(cartasCPU);

    valorApuesta == undefined ? (valorApuesta = 0) : valorApuesta;

    console.log(manoCPU);

    console.log(manoCPU.tipo);
    console.log(valorApuesta);
    console.log(DineroJugador);
    console.log(contadorManos);

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

// el Dealer es la cpu
// 1ra apuesta: Jugador, apostar o ver sin apostar
// respuesta del CPU: subir apuesta, pagar o retirarse
// cambio de cartas
// 2da apuesta: Jugador, apostar o ver sin apostar
// respuesta del CPU: subir apuesta, pagar o retirarse
// comprobar quien ganó
// mostrar resultado
// guardar resultados para ver quien gano mas
