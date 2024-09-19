// cspell: ignore boton, Swal, Póker, span_seleccionCartas, estadisticas

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

  const valores1 = mano1.cartas.map((carta) => valorCarta(carta));
  const valores2 = mano2.cartas.map((carta) => valorCarta(carta));  

  if (mano1.tipo === "Par" || mano1.tipo === "Doble Par") {  
    const par1 = Math.max(
      ...valores1.filter((v, i, arr) => arr.filter((x) => x === v).length === 2)
    );
    const par2 = Math.max(
      ...valores2.filter((v, i, arr) => arr.filter((x) => x === v).length === 2)
    );

    if (par1 > par2) return "Jugador";
    if (par2 > par1) return "CPU";
  }

  for (let i = 0; i < valores1.length; i++) {
    if (valores1[i] > valores2[i]) return "Jugador";
    if (valores2[i] > valores1[i]) return "CPU";
  }

  if (mano1.tipo === "Pierna") {
    const pierna1 = Math.max(
      ...valores1.filter((v, i, arr) => arr.filter((x) => x === v).length === 3)
    );
    const pierna2 = Math.max(
      ...valores2.filter((v, i, arr) => arr.filter((x) => x === v).length === 3)
    );

    if (pierna1 > pierna2) return "Jugador";
    if (pierna2 > pierna1) return "CPU";
  }

   if (mano1.tipo === "Póker") {
     const poker1 = Math.max(
       ...valores1.filter(
         (v, i, arr) => arr.filter((x) => x === v).length === 4
       )
     );
     const poker2 = Math.max(
       ...valores2.filter(
         (v, i, arr) => arr.filter((x) => x === v).length === 4
       )
     );

     if (poker1 > poker2) return "Jugador";
     if (poker2 > poker1) return "CPU";
   }

    if (mano1.tipo === "Full") {
      const pierna1 = Math.max(
        ...valores1.filter(
          (v, i, arr) => arr.filter((x) => x === v).length === 3
        )
      );
      const pierna2 = Math.max(
        ...valores2.filter(
          (v, i, arr) => arr.filter((x) => x === v).length === 3
        )
      );

      if (pierna1 > pierna2) return "Jugador";
      if (pierna2 > pierna1) return "CPU";

      const par1 = Math.max(
        ...valores1.filter(
          (v, i, arr) => arr.filter((x) => x === v).length === 2
        )
      );
      const par2 = Math.max(
        ...valores2.filter(
          (v, i, arr) => arr.filter((x) => x === v).length === 2
        )
      );

      if (par1 > par2) return "Jugador";
      if (par2 > par1) return "CPU";
    }

  for (let i = 0; i < valores1.length; i++) {
    if (tipo1 > tipo2) return "Jugador";
    if (tipo2 > tipo1) return "CPU";
  }

  return "Empate";
};

let victoriasJugador = 0;
let victoriasCPU = 0;
let empates = 0;

document.getElementById("boton-ganador").addEventListener("click", () => {
  
  mostrarCartas(cartasCPU_Nuevas, "cartas-cpu");

  document.getElementById("boton-ganador").style.display = "none";
  document.getElementById("boton-irse").style.display = "none";

  let mano_JugadorFinal;

  if (cartasJugadorActualizadas.length === 0) {
    mano_JugadorFinal = evaluarMano(cartasDelJugador);
  } else {
    mano_JugadorFinal = evaluarMano(cartasJugadorActualizadas);
  }

  const mano_CPUFinal = evaluarMano(cartasCPU_Nuevas);

  const ganador = compararManos(mano_JugadorFinal, mano_CPUFinal);

  if (ganador === "Jugador") {
    DineroJugador += pozo;
    pozo = 0;
    actualizarDineroJugador();
    document.getElementById("tituloPozoJuego").style.display = "none";
    Swal.fire(
      `El ganador de esta mano es el ${ganador} con ${mano_JugadorFinal.juego}`
    );
    victoriasJugador++;
  } else if (ganador === "CPU") {
    pozo = 0;
    actualizarPozo();
    Swal.fire(`El ganador de esta mano es la IA con ${mano_CPUFinal.juego}`);
    document.getElementById("tituloPozoJuego").style.display = "none";
    victoriasCPU++;
  } else {
    DineroJugador += pozo;
    pozo = 0;
    actualizarDineroJugador();
    Swal.fire("Es un empate");
    document.getElementById("tituloPozoJuego").style.display = "none";
    empates++;
  }

  document.getElementById("nuevaMano").style.display = "inline-block";
  document.getElementById("titulo-cpu").style.display = "inline-block";
  document.getElementById("estadisticas").style.display = "inline-block";
  document.getElementById("cartas-cpu").style.display = "flex";
});

document.getElementById("estadisticas").addEventListener("click", () => {
  Swal.fire({
    title: "Resultados Hasta el Momento",
    html: `
    <div style="text-align: left;">
      <strong>🏆 Victorias Jugador:</strong> ${victoriasJugador} <br>
      <strong>🤖 Victorias IA:</strong> ${victoriasCPU} <br>
      <strong>⚖️ Empates:</strong> ${empates}
    </div>
  `,
    icon: "info",
    confirmButtonText: "OK",
    width: "400px",
    background: "#f7f7f7",
    padding: "20px",
    backdrop: `
    rgba(0,0,123,0.4)
    left top
    no-repeat
  `,
  });
});
