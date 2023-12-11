// UTILITIES ******************************************************************************************
const just = (selector) => document.querySelector(selector); //punto para clases, # para id
const all = (selector) => document.querySelectorAll(selector);

const randomId = () => self.crypto.randomUUID();

const setInfo = (key, arrInfo) => localStorage.setItem(key, JSON.stringify(arrInfo)) //definimos la info en el LS. Se le pasa una key y un arr c info y lo que hace es crear eso en el LS 
const getInfo = (key) => JSON.parse(localStorage.getItem(key)) //pedimos la info al LS. Se pasa una key, y la busca en el LS y con el parse la transformamos a obj asi podemos manipularla




const showView = (view) => {//hago una funcion que muestre y oculte las vistas
  all(".view").forEach((view) => {//primero digo que por cda clase que tenga en su nombre view (todas)
    view.classList.add("hidden"); //entonces me agregue la clase hidden
  });
  just(`.${view}`).classList.remove("hidden"); //y luego le decimos che, pero a esta en especifico, sacale ese hidden y mostramela
};



const showElement = (selectors) => {
  for (const selector of selectors) {
    all(selector).classList.remove("hidden")
  }
}
const hideElement = (selectors) => {
  for (const selector of selectors) {
    all(selector).classList.add("hidden")
  }
}





















// FUNCIONALIDAD DEL NAVBAR *****************************************************************************************

just("#btn-balance-navb").addEventListener("click", () => showView("main-page")) //escucha el click sobre btn de balance y esconde todas las vistas excepto la de balance

just("#btn-category-navb").addEventListener("click", () => showView("section-category")) //escucha el click sobre btn de categorias y esconde todas las vistas excepto la de categorias

just("#btn-reports-navb").addEventListener("click", () => showView("section-reports")) //escucha el click sobre btn de reportes y esconde todas las vistas excepto la de reportes




















// // FUNCIONALIDAD DE BALANCE *****************************************************************************************




























// // FUNCIONALIDAD DE FILTROS *****************************************************************************************























// // LOCAL STORAGE **************************************************************************************************
const totalInfo = getInfo("Operations") || [] //totalInfo va a guardar primero la info que hay bajo el nombre de operations O si no hay info, entonces un array vacio




// FUNCIONALIDAD DE OPERACIONES *****************************************************************************************


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


















// FUNCIONALIDAD DE NUEVA OPERACION *****************************************************************************************


const saveUserOperation = () => {//transformamos los datos que entran por el formulario en un obj
  return {
    id: randomId(),
    descripcion: just("#input-description-text").value,
    monto: just("#input-amount-numb").value,
    tipo: just("#select-type").value,
    categoria: just("#select-category").value,
    fecha: just("#input-date").value,
  }
}
console.log(saveUserOperation())









//------------BOTON + NUEVA OPERACION 
//!NO ENTIENDO PORQUE TENEMOS Q ESPERAR A QUE LA PAGINA CARGUE, Y SIMPLEMENTE NO USAMOS EL EVENTO CLICK (para los botones, para ls si entiendo)
const initializeApp = () => {

  setInfo("Operations", totalInfo) //creamos una key llamada Operations y el array va a ser lo que guarde totalInfo

  renderOperations(totalInfo) //! no entiendo tendria que hacer un set y un estilo de totalinfo por cda key? no puedo hacer tipo const totalInfo = (key) => getInfo(key) || [] y luego hacer renderOperations(totalInfo("Operations")) ; totalInfo("Reports") y etc?

  just("#btn-newOp").addEventListener("click", () => showView("section-newOperation")) //escucha el click sobre btn de nueva operacion y esconde todas las vistas excepto la de nueva operacion

  just("#btn-add-newOp").addEventListener("click", (e) => pushObjToArr(e))


}
window.addEventListener("load", initializeApp) // esto va a esperar a que toda la página se cargue antes de ejecutar el evento clic





const pushObjToArr = (e) => { //pusheamos el obj capturado al array que luego va a crear las filas de nuestro table
  e.preventDefault() //evita que se recargue la pagina mientras carguen datos
  const currentInfo = getInfo("Operations") //PIDO la info
  currentInfo.push(saveUserOperation()) //MODIFICAMOS pusheando el objeto q nos trajimos del form al arr que esta bajo la key operations
  setInfo("Operations", currentInfo)//MANDAMOS a la key operations, el array modificado-actualizado
}







// -----------BOTON CANCELAR
just("#btn-cancel-newOp").addEventListener("click", () => showView("main-page")) //escucha el click sobre btn cancelar en nueva op y devuelve solo la vista principal
// -----------BOTON AGREGAR








// NO ME FUNCIONA MANDAR LA INFO DEL LS AL TABLE



//................................ SECCION CATEGORIA .......................................................



const category = [
  {
    id: randomId(),
    category: "Comidas",

  },

  {
    id: randomId(),
    category: "Sevicios",

  },
  {
    id: randomId(),
    category: "Salidas",

  },
  {
    id: randomId(),
    category: "Educacion",

  },
  {
    id: randomId,
    category: "Transporte",

  },
  {
    id: randomId(),
    category: "Trabajo",

  }
]
//------------------------------------ RENDER------------------------------------------------

const renderCategory = (arrayCategorys) => {
  for (const item of arrayCategorys) {

    just("#container-category").innerHTML += `<li class="h-[2rem] flex  justify-between mb-[1rem]">
    <p
        class="h-[2rem] w-[4rem] bg-[#ebfffc] pt-[3px] rounded-[0.3rem] text-[0.8rem]  text-center text-emerald-500">
        ${item.category}</p>
    <div class="flex">
        <a href=""  class="edit  w-[4rem] pt-[4px] text-[0.8rem] text-cente text-[#3273df]" onclick="editCategory()" >Editar</a>
        <a href="" class=" w-[4rem] pt-[4px]  text-[0.8rem] text-cente text-[#3273df]">Eliminar</a>
    </div> `

  }
}

renderCategory(category)


const savecategory = () => {
  return {
    id: randomId(),
    category: just("#input-add").value,

  }
}

// const editCategory = () => {
//   showElement(".section-edit-category")
//   hideElement("#section-category")
// }
const mostarShowEditCategory=()=>{
  just(".edit").addEventListener("click",()=>showView("section-edit-category"))
}





// -----------------------------------EVENTS---------------------------------------------------

const inicializeApp = () => {
  
just("#btn-add").addEventListener("click", (e) => {
    e.preventDefault()
    const newCategory = savecategory()
    category.push(newCategory)
    console.log(category);
  })
}


window.addEventListener("load", inicializeApp())
