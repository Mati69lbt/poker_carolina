// cspell: ignore boton, Swal

document
  .getElementById("boton-verRespuestasCPU")
  .addEventListener("click", () => {
    const manoCPU = evaluarMano(cartasCPU);
    console.log(manoCPU.tipo);
    console.log(valorApuesta);

    // sacar boton ver respuesta cpu

    if (manoCPU.tipo == "Carta Alta") {
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
      actualizarPozo(pozo);
    }

    if (
      manoCPU.tipo === "Par" ||
      manoCPU.tipo === "Doble Par" ||
      manoCPU.tipo === "Pierna"
    ) {
      document.getElementById("boton-verRespuestasCPU").style.display = "none";
      Swal.fire("La computadora pagó tu apuesta");
      let valorApuestaCPU = valorApuesta;
      pozo += valorApuestaCPU;
      actualizarPozo();
    }
  });
