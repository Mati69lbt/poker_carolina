// cspell: ignore boton, Swal, Póker, span_seleccionCartas

// const valorCarta = (carta) => {
//   const valor = carta.split(" - ")[0];
//   if (valor === "J") return 11;
//   if (valor === "Q") return 12;
//   if (valor === "K") return 13;
//   if (valor === "A") return 14;
//   return parseInt(valor);
// };

const compararManos = (mano1, mano2) => {
  const valorCarta = (carta) => {
    const valor = carta.split(" - ")[0];
    if (valor === "J") return 11;
    if (valor === "Q") return 12;
    if (valor === "K") return 13;
    if (valor === "A") return 14;
    return parseInt(valor);
  };

  const tipos = [
    "Carta Alta",
    "Par",
    "Doble Par",
    "Pierna",
    "Escalera",
    "Color",
    "Full",
    "Póker",
    "Escalera Real",
  ];
  const tipo1 = tipos.indexOf(mano1.tipo);
  const tipo2 = tipos.indexOf(mano2.tipo);

  if (tipo1 > tipo2) return "Jugador";
  if (tipo2 > tipo1) return "CPU";

  const valores1 = mano1.cartas
    .split(", ")
    .map((carta) => valorCarta(carta + " - Corazón"));
  const valores2 = mano2.cartas
    .split(", ")
    .map((carta) => valorCarta(carta + " - Corazón"));

  for (let i = 0; i < valores1.length; i++) {
    if (valores1[i] > valores2[i]) return "Jugador";
    if (valores2[i] > valores1[i]) return "CPU";
  }

  return "Empate";
};

document.getElementById("boton-ganador").addEventListener("click", () => {
  console.log("Hice CLICK!");

  console.log(cartasJugadorActualizadas);

  console.log(cartasCPU_Nuevas);

  const mano_JugadorFinal = evaluarMano(cartasJugadorActualizadas);

  const mano_CPUFinal = evaluarMano(cartasCPU_Nuevas);

  const ganador = compararManos(mano_JugadorFinal, mano_CPUFinal);

  if (ganador === "Jugador") {
    Swal.fire(
      `El ganador de esta mano es el ${ganador} con ${mano_JugadorFinal.juego}`
    );
  } else if (ganador === "CPU") {
    Swal.fire(
      `El ganador de esta mano es la ${ganador} con ${mano_CPUFinal.juego}`
    );
  } else {
    Swal.fire("Es un empate");
  }

  document.getElementById("nuevaMano").style.display = "inline-block";
  document.getElementById("titulo-cpu").style.display = "inline-block";
  document.getElementById("cartas-cpu").style.display = "flex";
});
