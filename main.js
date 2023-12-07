// UTILITIES ******************************************************************************************
const just = (selector) => document.querySelector(selector); //punto para clases, # para id
const all = (selector) => document.querySelectorAll(selector);
const randomId = () => self.crypto.randomUUID();

const showView = (view) => {//hago una funcion que muestre y oculte las vistas
  all(".view").forEach((view) => {//primero digo que por cda clase que tenga en su nombre view (todas)
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
const operationPlaceholder = []

const shapeDate = (objOperation) => {//hago una funcion la cual va a estar dando la forma de dd/mm/aa a la fecha
    const day = objOperation.fecha.getDate() //capturo el numero del dia
    const month = objOperation.fecha.getMonth() + 1; //capturo el numero del mes +1 porque los meses van de 0 a 11
    const year = objOperation.fecha.getFullYear()// capturo el numero de anio
    return `${day}/${month}/${year}` //y retorno la fecha en el orden que yo quiera mostrar
}

const renderOperations = (arrOperations) => {//arrOperations va a ser el del local storage
  for (const operation of arrOperations) {//por cda operacion(me trae cda hilera) del array operations
    just(".table-userOperation").innerHTML +=//crear los td para cada una de mis columnas dentro de la tabla q llamamos
    `
        <tr>
            <td class="text-center">${operation.descripcion}</td>
            <td class="text-center">${operation.categoria}</td>
            <td class="text-center">${shapeDate(operation)}</td>
            <td class="text-center">${operation.monto}</td>
            <td class="flex flex-col">
                <button class="text-center">Eliminar</button>
                <button class="text-center">Editar</button>
            </td> 
        </tr>
    `
  }
};
renderOperations(operationPlaceholder) //aca tengo que pasarle el arr de info q tengo en el LS


















// FUNCIONALIDAD DE NUEVA OPERACION *****************************************************************************************


const saveUserOperation = () =>{//transformamos los datos que entran por el formulario en un obj
    return {
        id: randomId(),
        descripcion:just("#input-description-text").value,
        monto:just("#input-amount-numb").value,
        tipo:just("#select-type").value,
        categoria:just("#select-category").value,
        fecha:just("#input-date").value,
    }
}
console.log(saveUserOperation())









//------------BOTON + NUEVA OPERACION
const initializeApp = () => {
    just("#btn-newOp").addEventListener("click", () => showView("section-newOperation")) //escucha el click sobre btn de nueva operacion y esconde todas las vistas excepto la de nueva operacion

    just("#btn-add-newOp").addEventListener("click", (e) => pushObjToArr(e))
}
window.addEventListener("load", initializeApp) // esto va a esperar a que toda la página se cargue antes de ejecutar el evento clic


const pushObjToArr = (e) => { //pusheamos el obj capturado al array que luego va a crear las filas de nuestro table
    e.preventDefault() //evita que se recargue la pagina mientras carguen datos
    const newOperation = saveUserOperation() //guardamos en una variable el objeto que obtenemos de la funcion saveUserOperation
    operationPlaceholder.push(newOperation) //lo pusheamos al arr vacio 
    console.log(operationPlaceholder)
}







// -----------BOTON CANCELAR
just("#btn-cancel-newOp").addEventListener("click", () => showView("main-page")) //escucha el click sobre btn cancelar en nueva op y devuelve solo la vista principal
// -----------BOTON AGREGAR























