const just = (selector) => document.querySelector(selector);  //punto para clases, # para id
const all = (selector) => document.querySelectorAll(selector);
const randomId = () => self.crypto.randomUUID();



// FUNCIONES PARA EL NAVBAR
console.log(just("#btn-category-navb"))

just("#btn-category-navb").addEventListener("click", () => hideShowView("section-category"))

const hideShowView = (showView) => { //hago una funcion que muestre y oculte las vistas
    all(".view").forEach((view) => { //primero digo que por cda clase que tenga en su nombre view (todas)
      view.classList.add("hidden"); //entonces me agregue la clase hidden
    });
    just(`.${showView}`).classList.remove("hidden"); //y luego le decimos che, pero a esta en especifico, sacale ese hidden
  };
