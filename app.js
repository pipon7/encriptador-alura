let cuadroEncriptar = document.getElementById("encriptar");
let cuadroEncriptado = document.getElementById("encriptado");
let textoOriginal = '';
let oculto = false;
let fondoOriginalEncriptar;
let fondoOriginalEncriptado;

function ojoOcultar() {
  const textoEncriptado = document.getElementById('encriptado');
  if (!oculto) {
    textoOriginal = textoEncriptado.value;
    textoEncriptado.value = '*'.repeat(textoOriginal.length);
    oculto = true;
  } else {
    textoEncriptado.value = textoOriginal;
    oculto = false;
  }
}


function verificarFondo() {
  if (cuadroEncriptar.value !== "") {
    cuadroEncriptar.style.backgroundImage = 'none';
  } else {
    resetearFondo(cuadroEncriptar);
  }
  if (cuadroEncriptado.value !== '') {
    cuadroEncriptado.style.backgroundImage = 'none';
  } else {
    resetearFondo(cuadroEncriptado);
  }
}

document.getElementById('encriptar').addEventListener('input', verificarFondo);
document.getElementById('encriptado').addEventListener('input', verificarFondo);

function botonEncriptar() {
  let textoEncriptar = cuadroEncriptar.value.toLowerCase();
  textoEncriptar = textoEncriptar.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Ignorar tildes 
  textoEncriptar = textoEncriptar.replace(/[^a-z0-9\s]/gi, ""); // Ignorar caracteres especiales
  let textoEncriptado = textoEncriptar    .replace(/e/g, 'enter')
                                          .replace(/i/g, 'imes')
                                          .replace(/a/g, 'ai')
                                          .replace(/o/g, 'ober')
                                          .replace(/u/g, 'ufat');
  cuadroEncriptado.value = textoEncriptado;
  verificarFondo();
  desabilitarBoton();
}

function botonDesencriptar() {
  let textoDesencriptar = cuadroEncriptar.value.toLowerCase();
  textoDesencriptar = textoDesencriptar.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // Ignorar tildes
  textoDesencriptar = textoDesencriptar.replace(/[^a-z0-9\s]/gi, ""); // Ignorar caracteres especiales
  let textoDesencriptado = textoDesencriptar      .replace(/enter/g, 'e')
                                                  .replace(/imes/g, 'i')
                                                  .replace(/ai/g, 'a')
                                                  .replace(/ober/g, 'o')
                                                  .replace(/ufat/g, 'u');
  cuadroEncriptado.value = textoDesencriptado;
  verificarFondo();
  desabilitarBoton();
}

function botonCopiar() {
  cuadroEncriptado.select();
  navigator.clipboard.writeText(cuadroEncriptado.value);
  desabilitarBoton();
}

function botonBorrar() {
  cuadroEncriptar.value = '';
  cuadroEncriptado.value = '';
  resetearFondo(cuadroEncriptar);
  resetearFondo(cuadroEncriptado);
  verificarFondo();
  desabilitarBoton();
}

document.getElementById('encriptar').addEventListener('input', verificarFondo);
document.getElementById('encriptado').addEventListener('input', verificarFondo);

function desabilitarBoton() {
  const textareaEnc = document.getElementById("encriptar");
  const textareaDes = document.getElementById("encriptado");
  const botonEncriptar = document.getElementById("boton_encriptar");
  const botonDesencriptar = document.getElementById("boton_desencriptar");
  const botonCopiar = document.getElementById("boton_copiar");
  const botonBorrar = document.getElementById("boton_borrar");

  if (textareaEnc.value.trim() === "") {
    botonEncriptar.disabled = true;
    botonDesencriptar.disabled = true;
  } else {
    botonEncriptar.disabled = false;
    botonDesencriptar.disabled = false;
  }

  if (textareaDes.value.trim() === "") {
    botonCopiar.disabled = true;
    botonBorrar.disabled = true;
  } else {
    botonCopiar.disabled = false;
    botonBorrar.disabled = false;
  }
}

function resetearFondo(textarea) {
  if (textarea === cuadroEncriptar) {
    textarea.style.backgroundImage = fondoOriginalEncriptar;
  } else if (textarea === cuadroEncriptado) {
    textarea.style.backgroundImage = fondoOriginalEncriptado;
  }
  textarea.style.backgroundRepeat = 'none';
  textarea.style.backgroundSize = '40%'; // o '50%' para cuadroEncriptado
  textarea.style.backgroundPosition = 'center';
}
fondoOriginalEncriptar = cuadroEncriptar.style.backgroundImage;
fondoOriginalEncriptado = cuadroEncriptado.style.backgroundImage;



