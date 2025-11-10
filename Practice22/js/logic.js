let personas = [];
const KEY_LISTA_PERSONAS = 'listaPersonas';

function esEmailValido(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}

function iniciarApp() {
  const data = localStorage.getItem(KEY_LISTA_PERSONAS);
  if (data) {
    personas = JSON.parse(data);
  }
  renderizarLista();
}

function guardarEnLocalStorage() {
  localStorage.setItem(KEY_LISTA_PERSONAS, JSON.stringify(personas));
}


function renderizarLista() {
  const tbody = document.getElementById('lista-nombres');
  tbody.innerHTML = ''; 

  if (personas.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4">No hay nombres registrados</td></tr>`;
  } else {
    personas.forEach((persona, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><button class="btn-delete" onclick="eliminarPersona(${index})">Eliminar</button></td>
        <td>${persona.nombre}</td>
        <td>${persona.edad}</td>
        <td>${persona.email}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}


function agregarPersona() {
  const inputNombre = document.getElementById('input-nombre');
  const inputEdad = document.getElementById('input-edad');
  const inputEmail = document.getElementById('input-email');

  const msgNombre = document.getElementById('msg-error-nombre');
  const msgEdad = document.getElementById('msg-error-edad');
  const msgEmail = document.getElementById('msg-error-email');

  const nombre = inputNombre.value.trim();
  const edad = inputEdad.value.trim();
  const email = inputEmail.value.trim();


  msgNombre.innerHTML = '';
  msgEdad.innerHTML = '';
  msgEmail.innerHTML = '';

  let esValido = true;

  if (nombre === '') {
    msgNombre.innerHTML = 'Debe ingresar un nombre';
    esValido = false;
  }

  if (edad === '') {
    msgEdad.innerHTML = 'Debe ingresar una edad';
    esValido = false;
  }

  if (email === '') {
    msgEmail.innerHTML = 'Debe ingresar un email';
    esValido = false;
  } else if (!esEmailValido(email)) {
    msgEmail.innerHTML = 'Debe ingresar un email válido';
    esValido = false;
  }

  if (esValido) {
    const nuevaPersona = {
      nombre: nombre,
      edad: edad,
      email: email,
    };

    personas.push(nuevaPersona); 
    guardarEnLocalStorage(); 
    renderizarLista(); 

    inputNombre.value = '';
    inputEdad.value = '';
    inputEmail.value = '';
  }
}

function eliminarPersona(index) {
  if (confirm(`¿Está seguro de que desea eliminar a ${personas[index].nombre}?`)) {
    personas.splice(index, 1); // Eliminar del array
    guardarEnLocalStorage(); // Actualizar localStorage
    renderizarLista(); // Actualizar la tabla
  }
}