let estado = "inicio"; 

function mover(id, direccion) {
  if (estado === "muerto") return;

  const paso = 64;
  const personaje = $('#' + id);
  const pos = personaje.position();

  let nuevaPos = { top: pos.top, left: pos.left };

  switch (direccion) {
    case 'left': nuevaPos.left -= paso; break;
    case 'right': nuevaPos.left += paso; break;
    case 'up': nuevaPos.top -= paso; break;
    case 'down': nuevaPos.top += paso; break;
  }

  personaje.animate(nuevaPos, 200, () => {
    if (estado === "inicio" && nuevaPos.left > 150) {
      avanzarAlCamino();
    } else if (estado === "camino") {
      verificarExplosion();
    }
  });
}

function avanzarAlCamino() {
  estado = "camino";
  $('#mundo').css('background-image', "url('assets/img/camino.png')");
  $('#creeper').fadeIn();
}

function explotar() {
  estado = "exploto";
  const mundo = $('#mundo');
  const creeper = $('#creeper');

  mundo.addClass('temblor');
  creeper.fadeOut(500);

  setTimeout(() => {
    mundo.css('background-image', "url('assets/img/explosion-bg.jpg')");
  }, 300);

  setTimeout(() => {
    mostrarMuerte();
  }, 2000);
}

function mostrarMuerte() {
  estado = "muerto";
  $('#mundo').removeClass('temblor');
  $('#mundo').css('background-image', "url('assets/img/muerto.png')");

  // Aquí los personajes desaparecen sin animación
  $('#steve').hide();
  $('#alex').hide();
  $('#creeper').hide();
}

function verificarExplosion() {
  const steve = $('#steve').position();
  const creeper = $('#creeper').position();

  const dx = Math.abs(steve.left - creeper.left);
  const dy = Math.abs(steve.top - creeper.top);

  if (dx <= 64 && dy <= 64 && $('#creeper').is(':visible')) {
    explotar();
  }
}

function togglePersonaje(id) {
  $('#' + id).fadeToggle(400);
}

function mostrarDialogo() {
  $('#dialogo').fadeIn(300).delay(2000).fadeOut(300);
}

$(document).keydown(function (e) {
  const key = e.key.toLowerCase();

  if (['arrowleft', 'a'].includes(key)) mover('steve', 'left');
  else if (['arrowright', 'd'].includes(key)) mover('steve', 'right');
  else if (['arrowup', 'w'].includes(key)) mover('steve', 'up');
  else if (['arrowdown', 's'].includes(key)) mover('steve', 'down');
  else if (key === 'h') mostrarDialogo();
  else if (key === 'o') togglePersonaje('alex');
});
