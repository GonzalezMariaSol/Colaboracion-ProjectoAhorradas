// UTILITIES ******************************************************************************************
const just = (selector) => document.querySelector(selector); //punto para clases, # para id
const all = (selector) => document.querySelectorAll(selector);
const randomId = () => self.crypto.randomUUID();

const showView = (view) => {
  //hago una funcion que muestre y oculte las vistas
  all(".view").forEach((view) => {
    //primero digo que por cda clase que tenga en su nombre view (todas)
    view.classList.add("hidden"); //entonces me agregue la clase hidden
  });
  just(`.${view}`).classList.remove("hidden"); //y luego le decimos che, pero a esta en especifico, sacale ese hidden y mostramela
};






















// FUNCIONALIDAD DEL NAVBAR *****************************************************************************************

just("#btn-balance-navb").addEventListener("click", () => showView("main-page")) //escucha el click sobre btn de balance y esconde todas las vistas excepto la de balance

just("#btn-category-navb").addEventListener("click", () => showView("section-category")) //escucha el click sobre btn de categorias y esconde todas las vistas excepto la de categorias

just("#btn-reports-navb").addEventListener("click", () => showView("section-reports")) //escucha el click sobre btn de reportes y esconde todas las vistas excepto la de reportes



















// FUNCIONALIDAD DE BALANCE *****************************************************************************************




























// FUNCIONALIDAD DE FILTROS *****************************************************************************************



























// FUNCIONALIDAD DE OPERACIONES *****************************************************************************************

//esto se tiene que borrar luego
// const operationPlaceholder = [
//   {
//     id: 1,
//     descripcion: "super jumbo",
//     categoria: "gasto",
//     monto: 4,
//     fecha: new Date(),
//   },
//   {
//     id: 2,
//     descripcion: "chinos",
//     categoria: "ganancia",
//     monto: 5,
//     fecha: new Date('2023-01-10'),
//   },
//   {
//     id: 3,
//     descripcion: "cosmetica",
//     categoria: "gasto",
//     monto: 6,
//     fecha: new Date('2023-01-31'),
//   },
// ];

// const shapeDate = (objOperation) => {//hago una funcion la cual va a estar dando la forma de dd/mm/aa a la fecha
//     const day = objOperation.fecha.getDate() //capturo el numero del dia
//     const month = objOperation.fecha.getMonth() + 1; //capturo el numero del mes +1 porque los meses van de 0 a 11
//     const year = objOperation.fecha.getFullYear();// capturo el numero de anio
//     return `${day}/${month}/${year}` //y retorno la fecha en el orden que yo quiera mostrar
// }

// const renderOperations = (arrOperations) => {//arrOperations va a ser el del local storage
//   for (const operation of arrOperations) {//por cda operacion(me trae cda hilera) del array operations
//     just(".table-userOperation").innerHTML +=//crear los td para cada una de mis columnas dentro de la tabla q llamamos
//     `
//         <tr>
//             <td class="text-center">${operation.descripcion}</td>
//             <td class="text-center">${operation.categoria}</td>
//             <td class="text-center">${shapeDate(operation)}</td>
//             <td class="text-center">${operation.monto}</td>
//             <td class="flex flex-col">
//                 <button class="text-center">Eliminar</button>
//                 <button class="text-center">Editar</button>
//             </td> 
//         </tr>
//     `
//   }
// };
// renderOperations(operationPlaceholder); //aca tengo que pasarle el arr de info q tengo en el LS





















// FUNCIONALIDAD DE NUEVA OPERACION *****************************************************************************************
//------------BOTON +NUEVA OPERACION
just("#btn-newOp").addEventListener("click", () => showView("section-newOperation")) //escucha el click sobre btn de nueva operacion y esconde todas las vistas excepto la de nueva operacion

// -----------BOTONES CANCELAR Y AGREGAR
just("#btn-cancel-newOp").addEventListener("click", () => showView("main-page")) //escucha el click sobre btn cancelar en nueva op y devuelve solo la vista principal






















