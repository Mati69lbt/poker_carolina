//cspell: ignore boton, Póker, póker,  span_seleccionCartas

let cartasCPU_Nuevas = [];

document.getElementById("boton-cambiar").addEventListener("click", () => {
  document.getElementById("span_seleccionCartas").style.display = "none";
  
  console.log(cartasCPU);

  console.log(cartasAdicionalesJyCpu);

  const manoCPU = evaluarMano(cartasCPU);

  console.log(manoCPU);

  let { tipo, conteo, cartas: mano } = manoCPU;

  console.log(tipo);

  let cartasQueQuedan = [];

  // Verificamos el tipo de juego para determinar cuántas cartas mantener
  if (tipo.includes("Par")) {
    // Buscamos el valor del par
    const valorClave = Object.keys(conteo).find((valor) => conteo[valor] === 2);
    // Nos quedamos solo con las cartas que coinciden con ese valor
    cartasQueQuedan = mano.filter(
      (carta) => carta.split(" - ")[0] === valorClave
    );
  } else if (tipo.includes("Pierna")) {
    // Buscamos el valor de la pierna
    const valorClave = Object.keys(conteo).find((valor) => conteo[valor] === 3);
    // Nos quedamos solo con las cartas que coinciden con ese valor
    cartasQueQuedan = mano.filter(
      (carta) => carta.split(" - ")[0] === valorClave
    );
  } else if (tipo.includes("Póker")) {
    // Buscamos el valor del póker
    const valorClave = Object.keys(conteo).find((valor) => conteo[valor] === 4);
    // Nos quedamos solo con las cartas que coinciden con ese valor
    cartasQueQuedan = mano.filter(
      (carta) => carta.split(" - ")[0] === valorClave
    );
  } else if (tipo.includes("Full")) {
    // Buscamos los valores del full
    const valorPierna = Object.keys(conteo).find(
      (valor) => conteo[valor] === 3
    );
    const valorPar = Object.keys(conteo).find((valor) => conteo[valor] === 2);
    // Nos quedamos con las cartas del par y la pierna
    cartasQueQuedan = mano.filter(
      (carta) =>
        carta.split(" - ")[0] === valorPierna ||
        carta.split(" - ")[0] === valorPar
    );
  } else {
    // Si no es una combinación específica, no se eliminan cartas
    cartasQueQuedan = mano;
  }
  console.log(cartasQueQuedan);

  cantCartasACambiar = 5 - cartasQueQuedan.length;

  console.log(cantCartasACambiar);

  console.log(cartasAdicionalesJyCpu.length);

  const nuevasCartas = cartasAdicionalesJyCpu.splice(0, cantCartasACambiar);

  console.log(cartasAdicionalesJyCpu.length);

  console.log("cartasQueQuedan:", cartasQueQuedan);
  console.log("nuevasCartas:", nuevasCartas);

  const palos = [
    { nombre: "Corazón", emoji: "♥", color: "rojo" },
    { nombre: "Trébol", emoji: "♣", color: "negro" },
    { nombre: "Pica", emoji: "♠", color: "negro" },
    { nombre: "Diamante", emoji: "♦", color: "rojo" },
  ];

  function transformarCartas(cartas) {
    return cartas.map((carta) => {
      const [valorCarta, nombrePalo] = carta.split(" - ");

      // Buscar el objeto del palo que coincide con el nombre del palo
      const palo = palos.find((p) => p.nombre === nombrePalo);

      return {
        carta: valorCarta,
        palo: palo.emoji, // Emoji del palo
        color: palo.color, // Color del palo
      };
    });
  }

  const cartasCPU_Transformadas = transformarCartas(cartasQueQuedan);

  console.log(cartasCPU_Transformadas);

  cartasCPU_Nuevas = cartasCPU_Transformadas.concat(nuevasCartas);

  console.log(cartasCPU_Nuevas);

  const evaluarCartasNuevas = evaluarMano(cartasCPU_Nuevas);

  console.log(evaluarCartasNuevas);
});
