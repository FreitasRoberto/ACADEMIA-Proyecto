// Variables
const cesta = document.querySelector('#cesta');
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCesta = document.querySelector('#lista-cesta tbody');
const vaciarCestaBtn = document.querySelector('#vaciar-cesta'); 
let articulosCesta = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     
     listaCursos.addEventListener('click', agregarCurso);

     
     cesta.addEventListener('click', eliminarCurso);

     vaciarCestaBtn.addEventListener('click', vaciarCesta);

}




// Funciones
function agregarCurso(e) {
     e.preventDefault();
     
     if(e.target.classList.contains('agregar-cesta')) {
          const curso = e.target.parentElement.parentElement;
          leerDatosCurso(curso);
     }
}

// Lee los datos del curso
function leerDatosCurso(curso) {
     const infoCurso = {
          imagen: curso.querySelector('img').src,
          titulo: curso.querySelector('h4').textContent,
          precio: curso.querySelector('.precio span').textContent,
          id: curso.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCesta.some( curso => curso.id === infoCurso.id ) ) { 
          const cursos = articulosCesta.map( curso => {
               if( curso.id === infoCurso.id ) {
                    curso.cantidad++;
                     return curso;
                } else {
                     return curso;
             }
          })
          articulosCesta = [...cursos];
     }  else {
          articulosCesta = [...articulosCesta, infoCurso];
     }

     
     cestaHTML();
}

// Elimina el curso de la cesta en el DOM
function eliminarCurso(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {

          const cursoId = e.target.getAttribute('data-id')
          
          articulosCesta = articulosCesta.filter(curso => curso.id !== cursoId);

          cestaHTML();
     }
}


// Muestra el curso seleccionado en la Cesta
function cestaHTML() {

     vaciarCesta();

     articulosCesta.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          contenedorCesta.appendChild(row);
     });

}

// Elimina los cursos de la cesta en el DOM
function vaciarCesta() {
    
     while(contenedorCesta.firstChild) {
          contenedorCesta.removeChild(contenedorCesta.firstChild);
      }
}
