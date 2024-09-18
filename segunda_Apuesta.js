// cspell: ignore boton, Swal, Póker, span_seleccionCartas

document.getElementById("boton-Respuesta_CPU").addEventListener("click", () => {
  console.log(valorApuesta);

  valorApuesta == undefined ? (valorApuesta = 0) : valorApuesta;

  const manoCPU_SA = evaluarMano(cartasCPU_Nuevas);
  console.log(manoCPU_SA);

  if (
    (manoCPU_SA.tipo == "Par" ||
      manoCPU_SA.tipo === "Pierna" ||
      manoCPU_SA.tipo === "Doble Par") &&
    valorApuesta > 0
  ) {
    Swal.fire("La computadora lo Paga");
    document.getElementById("boton-ganador").style.display = "inline-block";
    document.getElementById("boton-Respuesta_CPU").style.display = "none";
    pozo += valorApuesta;
    pozo_Juego.innerText = pozo;
  }
});
