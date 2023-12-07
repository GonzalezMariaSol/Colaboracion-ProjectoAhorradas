const just = (selector) => document.querySelector(selector);  //punto para clases, # para id
const all = (selector) => document.querySelectorAll(selector);
const randomId = () => self.crypto.randomUUID();


const showView = (view) => { //hago una funcion que muestre y oculte las vistas
    all(".view").forEach((view) => { //primero digo que por cda clase que tenga en su nombre view (todas)
      view.classList.add("hidden"); //entonces me agregue la clase hidden
    });
    just(`.${view}`).classList.remove("hidden"); //y luego le decimos che, pero a esta en especifico, sacale ese hidden y mostramela
  };


// FUNCIONALIDAD DEL NAVBAR *****************************************************************************************
just("#btn-balance-navb").addEventListener("click", () => showView("main-page"))//escucha el click sobre btn de balance y esconde todas las vistas excepto la de balance

just("#btn-newOp").addEventListener("click", () => showView("section-newOperation"))//escucha el click sobre btn de nueva operacion y esconde todas las vistas excepto la de nueva operacion

just("#btn-category-navb").addEventListener("click", () => showView("section-category"))//escucha el click sobre btn de categorias y esconde todas las vistas excepto la de categorias

just("#btn-reports-navb").addEventListener("click", () => showView("section-reports"))//escucha el click sobre btn de reportes y esconde todas las vistas excepto la de reportes

// FUNCIONALIDAD DE BALANCE *****************************************************************************************

// FUNCIONALIDAD DE FILTROS *****************************************************************************************

// FUNCIONALIDAD DE OPERACIONES *****************************************************************************************

// FUNCIONALIDAD DE NUEVA OPERACION *****************************************************************************************
// -----------BOTONES CANCELAR Y AGREGAR 
just("#btn-cancel-newOp").addEventListener("click", () => showView("main-page")) //escucha el click sobre btn cancelar en nueva op y devuelve solo la vista principal
