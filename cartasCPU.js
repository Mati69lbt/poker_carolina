//cspell: ignore boton, Póker, póker,  span_seleccionCartas

let cartasCPU_Nuevas = [];

document.getElementById("boton-cambiar").addEventListener("click", () => {
  const manoCPU = evaluarMano(cartasCPU);

  let { tipo, conteo, cartas: mano } = manoCPU;

  let cartasQueQuedan = [];

  if (tipo.includes("Par")) {
    const pares = Object.keys(conteo).filter((valor) => conteo[valor] === 2);
    if (pares.length === 2) {
      tipo = "Doble Par";
      cartasQueQuedan = mano.filter((carta) =>
        pares.includes(carta.split(" - ")[0])
      );
    } else {
      const valorClave = pares[0];
      cartasQueQuedan = mano.filter(
        (carta) => carta.split(" - ")[0] === valorClave
      );
    }
  } else if (tipo.includes("Pierna")) {
    const valorClave = Object.keys(conteo).find((valor) => conteo[valor] === 3);
    cartasQueQuedan = mano.filter(
      (carta) => carta.split(" - ")[0] === valorClave
    );
  } else if (tipo.includes("Póker")) {
    const valorClave = Object.keys(conteo).find((valor) => conteo[valor] === 4);
    cartasQueQuedan = mano.filter(
      (carta) => carta.split(" - ")[0] === valorClave
    );
  } else if (tipo.includes("Full")) {
    const valorPierna = Object.keys(conteo).find(
      (valor) => conteo[valor] === 3
    );
    const valorPar = Object.keys(conteo).find((valor) => conteo[valor] === 2);
    cartasQueQuedan = mano.filter(
      (carta) =>
        carta.split(" - ")[0] === valorPierna ||
        carta.split(" - ")[0] === valorPar
    );
  } else if (tipo.includes("Carta Alta")) {
    cartasQueQuedan = [];
  } else {
    cartasQueQuedan = mano;
  }

  cantCartasACambiar = 5 - cartasQueQuedan.length;

  const nuevasCartas = cartasAdicionalesJyCpu.splice(0, cantCartasACambiar);

  const palos = [
    { nombre: "Corazón", emoji: "♥", color: "rojo" },
    { nombre: "Trébol", emoji: "♣", color: "negro" },
    { nombre: "Pica", emoji: "♠", color: "negro" },
    { nombre: "Diamante", emoji: "♦", color: "rojo" },
  ];

  function transformarCartas(cartas) {
    return cartas.map((carta) => {
      const [valorCarta, nombrePalo] = carta.split(" - ");

      const palo = palos.find((p) => p.nombre === nombrePalo);

      return {
        carta: valorCarta,
        palo: palo.emoji,
        color: palo.color,
      };
    });
  }

  const cartasCPU_Transformadas = transformarCartas(cartasQueQuedan);

  cartasCPU_Nuevas = cartasCPU_Transformadas.concat(nuevasCartas);
});
