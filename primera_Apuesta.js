// cspell: ignore boton, Swal, opcion

let valorApuesta;
let formularioUsado = false;

document.getElementById("form-apuesta").addEventListener("submit", (event) => {
  event.preventDefault(); 

  if (!formularioUsado) {
       const apuestaSeleccionada = document.querySelector(
      'input[name="option"]:checked'
    );

    if (!apuestaSeleccionada) {    
      Swal.fire("Debes seleccionar una cantidad para apostar.");
      return;
    }

    valorApuesta = parseInt(apuestaSeleccionada.value);

    
    if (DineroJugador < valorApuesta) {
      Swal.fire("No tienes suficiente dinero para hacer esa apuesta.");
      return;
    }

       DineroJugador -= valorApuesta;
       pozo += valorApuesta;

       Dinero_Jugador.innerText = DineroJugador;
    pozo_Juego.innerText = pozo;

       document.getElementById("form-apuesta").style.display = "none";
    document.getElementById("boton-irse").style.display = "none";
    document.getElementById("boton-ver-sin-apostar").style.display = "none";
    document.getElementById("boton-verRespuestasCPU").style.display =
      "inline-block";
    formularioUsado = true;    
  } else {
    const apuestaSeleccionada = document.querySelector(
      'input[name="option"]:checked'
    );

    if (!apuestaSeleccionada) {
      Swal.fire("Debes seleccionar una cantidad para apostar.");
      return;
    }

    valorApuesta = parseInt(apuestaSeleccionada.value);

    if (DineroJugador < valorApuesta) {
      Swal.fire("No tienes suficiente dinero para hacer esa apuesta.");
      return;
    }

    DineroJugador -= valorApuesta;
    pozo += valorApuesta;
    Dinero_Jugador.innerText = DineroJugador;
    pozo_Juego.innerText = pozo;

    document.getElementById("form-apuesta").style.display = "none";
    document.getElementById("boton-ver-sin-apostar").style.display = "none";
    document.getElementById("boton-irse").style.display = "none";
    document.getElementById("boton-verRespuestasCPU").style.display = "none";
    document.getElementById("boton-Respuesta_CPU").style.display =
      "inline-block";
    formularioUsado = false;
  }
});

document
  .getElementById("boton-ver-sin-apostar")
  .addEventListener("click", () => {
    valorApuesta = 0;
    document.getElementById("form-apuesta").style.display = "none";
  });
