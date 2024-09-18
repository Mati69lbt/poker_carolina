// cspell: ignore boton, Swal, opcion

let valorApuesta;
let formularioUsado = false;

document.getElementById("form-apuesta").addEventListener("submit", (event) => {
  event.preventDefault(); // Evitar que se recargue la página

  if (!formularioUsado) {
    // Obtener la opción seleccionada
    const apuestaSeleccionada = document.querySelector(
      'input[name="option"]:checked'
    );

    if (!apuestaSeleccionada) {
      // Si no se seleccionó ninguna opción, mostrar un mensaje de alerta
      Swal.fire("Debes seleccionar una cantidad para apostar.");
      return;
    }

    valorApuesta = parseInt(apuestaSeleccionada.value);

    // Verificar si el jugador tiene suficiente dinero
    if (DineroJugador < valorApuesta) {
      Swal.fire("No tienes suficiente dinero para hacer esa apuesta.");
      return;
    }

    // Restar el valor de la apuesta al dinero del jugador
    DineroJugador -= valorApuesta;
    // Sumar el valor de la apuesta al pozo del juego
    pozo += valorApuesta;

    // Actualizar el dinero y el pozo en la interfaz
    Dinero_Jugador.innerText = DineroJugador;
    pozo_Juego.innerText = pozo;

    // Ocultar el formulario de apuestas y mostrar el botón "Apostar" nuevamente
    document.getElementById("form-apuesta").style.display = "none";
    document.getElementById("boton-ver-sin-apostar").style.display = "none";
    document.getElementById("boton-verRespuestasCPU").style.display =
      "inline-block";
    formularioUsado = true;
  } else {
    document.querySelector(".boton-apostar-formulario").innerText =
      "Ultima Apuesta";

    const opciones = document.querySelectorAll('input[name="option"]');
    opciones.forEach((opcion) => {
      opcion.checked = false;
    });

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
    document.getElementById("boton-verRespuestasCPU").style.display =
      "inline-block";
  }
});

document
  .getElementById("boton-ver-sin-apostar")
  .addEventListener("click", () => {
    valorApuesta = 0;
    document.getElementById("form-apuesta").style.display = "none";
  });
