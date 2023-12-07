const just = (selector) => document.querySelector(selector);  //punto para clases, # para id
const all = (selector) => document.querySelectorAll(selector);
const randomId = () => self.crypto.randomUUID();


const hideShowView = (showView) => { //hago una funcion que muestre y oculte las vistas
    all(".view").forEach((view) => { //primero digo que por cda clase que tenga en su nombre view (todas)
      view.classList.add("hidden"); //entonces me agregue la clase hidden
    });
    just(`.${showView}`).classList.remove("hidden"); //y luego le decimos che, pero a esta en especifico, sacale ese hidden y mostramela
  };


// FUNCIONALIDAD DEL NAVBAR
just("#btn-balance-navb").addEventListener("click", () => hideShowView("main-page"))//escucha el click sobre boton de balance y esconde todas las vistas excepto la de balance

just("#btn-newOp").addEventListener("click", () => hideShowView("section-newOperation"))//escucha el click sobre boton de nueva operacion y esconde todas las vistas excepto la de nueva operacion

just("#btn-category-navb").addEventListener("click", () => hideShowView("section-category"))//escucha el click sobre boton de categorias y esconde todas las vistas excepto la de categorias

just("#btn-reports-navb").addEventListener("click", () => hideShowView("section-reports"))//escucha el click sobre boton de reportes y esconde todas las vistas excepto la de reportes

