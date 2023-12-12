// UTILITIES ******************************************************************************************
const just = (selector) => document.querySelector(selector); //punto para clases, # para id
const all = (selector) => document.querySelectorAll(selector);

const randomId = () => self.crypto.randomUUID();

const showElement = (selector) => just(selector).classList.remove("hidden")
const hideElement = (selector) => just(selector).classList.add("hidden")

// LOCAL STORAGE ******************************************************************************************
const getInfo = (key) => JSON.parse(localStorage.getItem(key)) //pedimos la info al LS. Se pasa una key, y la busca en el LS y con el parse la transformamos a obj asi podemos manipularla
const setInfo = (key, arrInfo) => localStorage.setItem(key, JSON.stringify(arrInfo)) //definimos la info en el LS. Se le pasa una key y un arr c info y lo que hace es crear eso en el LS 



// MUESTRA - OCULTAR SECTIONS-VISTAS
const showViews = (view) => {//hago una funcion que muestre y oculte las vistas
  all(".view").forEach((view) => {//primero digo que por cda secction q en su clase que tenga como nombre view (basicamente todas)
    view.classList.add("hidden"); //entonces a esas que contengan el "view" me agregue la clase hidden (osea esconderia todas)
  });
  just(`.${view}`).classList.remove("hidden"); //PERO luego le decimos che, pero a esta en especifico (la q estamos pasando x parametro), sacale ese hidden y mostramela
};//osea que cuando llamemos a showViews basicamente vamos a estar escondiendo a todas las vistas, excepto la q le pasemos x parametro




// FUNCIONALIDAD SECTOR DE OPERACIONES - NUEVA OPERACION - EDITAR OPERACION **************************************************
//?SHOWOPERATIONS FUNCIONA BIEN
//SHOWOPERATIONS ES QUIEN IMPRIME EN PANTALLA LAS CASILLAS CON LA INFO QUE CARGO EL USUARIO
const showOperations = (arrOperations) => {//arrOperations va a ser lo que obtengamos del local storage q ya viene con forma de arr
  for (const operation of arrOperations) {//por cda operacion(me trae cda hilera) del array operations
    just(".table-userOperation").innerHTML +=//crear los td (casilleros) para cada una de mis columnas dentro de la tabla q llamamos
    `
        <tr>
            <td class="text-center">${operation.descripcion}</td>
            <td class="text-center">${operation.categoria}</td>
            <td class="text-center">${operation.fecha}</td>
            <td class="text-center">${operation.monto}</td>
            <td class="flex flex-col">
                <button class="text-center">Eliminar</button>
                <button class="text-center" id="btn-edit-operation" onclick="ejecutionOfNewOp('${operation.id}')">EditarRRRR</button>
            </td> 
        </tr>
    `
  }
};


//?EJECUTIONOFNEWOP FUNCIONA BIEN
//EJECUTIONOFNEWOP SE ENCARGA DE OCULTAR SECTIONS, MOSTRAR EL QUE QUEREMOS + SI SE QUIERE EDITAR QUE SE CARGUE LA INFO DEL QUE SE QUIERE EDITAR
const ejecutionOfNewOp = (opId) => {//cada "nueva op" ademas de tener las "consingnas" tiene un id unico, ese id es el q pasamos x parametro para poder luego encontrar especificamente la info q este junto a ese id
  //       // CUANDO HAGA CLICK EN EL BTN VA A EJECUTARSE ESTOS CAMBIOS ↓↓↓↓
  showViews("section-editOperation") //oculte todas las vistas y muestre la seccion de editar operacion
      just("#btn-confirm-edit").classList.remove("hidden") //mas que se muestre el btn con nombre "confirmar"
      just("#editOp-tittle").classList.remove("hidden") // y se muestre el titulo correspondiente q seria "editar operacion"
      just("#btn-add-newOp").classList.add("hidden") // y se esconda el btn "agregar" (operacion)
      just("#newOp-tittle").classList.add("hidden") //y se esconda el titulo "nueva Operacion"

      //       // LO QUE HACEMOS ACA ES PINTAR LA INFO Q SE ELIGIO PARA CAMBIAR EN LOS INPUTS ↓↓↓↓
      const choosenOperation = getInfo("Operations").find(operation => operation.id === opId)

      // //obtenemos la info del LS que este bajo la key operations (q trae un arr) el cual le decimos que por cda operation q haya ahi adentro, solo traeme LA OPERACION en el que operation.id sea === al id que le estamos pasando por parametro (q es el que el usuario le hizo click) -choosenOperation entonces devuelve un obj donde estan todas las key + el id unico-
          just("#input-description-text").value = choosenOperation.descripcion //al precargar va a mostrar el value de la op que selecciono
    just("#input-amount-numb").value = choosenOperation.monto //al precargar va a mostrar el value de la op que selecciono
    just("#select-type").value = choosenOperation.tipo //al precargar va a mostrar el value de la op que selecciono
    just("#select-category").value = choosenOperation.categoria //al precargar va a mostrar el value de la op que selecciono
    just("#input-date").value = choosenOperation.fecha //
}















//?SAVEUSEROPERATION FUNCIONA BIEN
//SAVEUSEROPERATION TOMA LOS DATOS SUELTOS DEL FORM Y LOS TRANSFORMA EN UN OBJ
const saveUserOperation = () => {//transformamos los datos que entran a traves del form (que son datos sueltos) en un obj
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






// LOCAL STORAGE **************************************************************************************************
//?TOTALOperations FUNCIONA BIEN - muestra un arr vacio al principio y luego si recargo me muestra si cargue o no algo al arr
//TOTALOperations VALE LO Q LA KEY TENGA O SINO UN ARR VACIO
const totalOperations = getInfo("Operations") || [] //totalOperations va a guardar primero la info que hay bajo el nombre de operations O si no hay info, entonces un array vacio
console.log(totalOperations)





//NI BIEN ABRIMOS LA WEB QUIERO ... ***************************************************************************************
const initializeApp = () => {
  //?setInfo funciona bien
  setInfo("Operations", totalOperations) //creamos una key llamada Operations y el array va a ser lo que guarde totalOperations ya sea un array c info o arr vacio 
  
  //?showOperations funciona bien
  showOperations(totalOperations)

  //BTNS DEL NAVBAR //?funcionan bien *****************************************************************************************
  just("#btn-balance-navb").addEventListener("click", () => showViews("main-page")) //escucha el click sobre btn de balance y esconde todas las vistas excepto la de balance

  just("#btn-category-navb").addEventListener("click", () => showViews("section-category")) //escucha el click sobre btn de categorias y esconde todas las vistas excepto la de categorias

  just("#btn-reports-navb").addEventListener("click", () => showViews("section-reports")) //escucha el click sobre btn de reportes y esconde todas las vistas excepto la de reportes


  // BTN + NUEVA OPERACION //?funciona bien 
  just("#btn-newOp").addEventListener("click", () => {
    showViews("section-editOperation")
    just("#btn-confirm-edit").classList.add("hidden")
    just("#editOp-tittle").classList.add("hidden") 
    just("#btn-add-newOp").classList.remove("hidden") 
    just("#newOp-tittle").classList.remove("hidden")
  })

  // BTN AGREGAR - NUEVA OPERACION //?funciona bien 
  just("#btn-add-newOp").addEventListener("click", (e) => pushObjToArr(e)) //cuando se le de click al btn agregar, ejecuta la funcion la cual transforma el obj de info del form a un arr y lo pasa al LS



  // -----------BOTON CANCELAR OPERACION //?funciona bien 
  just("#btn-cancel-newOp").addEventListener("click", () => showViews("main-page")) //escucha el click sobre btn cancelar en nueva op y devuelve solo la vista principal
}
window.addEventListener("load", initializeApp) // esto va a esperar a que toda la página se cargue antes de ejecutar el evento clic






//?PUSHOBJTOARR FUNCIONA BIEN
//PUSHOBJTOARR SE EJECUTA DENTRO DE initializeApp, Y SE ENCARGA DE PEDIR INFO EN FORMATO OBJ, LO TRANSFORMA A ARR Y LO DEVUELVE MODIFICADO
const pushObjToArr = (e) => { //pusheamos el obj capturado al array que luego va a crear las filas de nuestro table
    e.preventDefault() //evita que se recargue la web y perder los datos
    const currentInfo = getInfo("Operations") //PIDO la info q viene en forma de ARR (porque operations q viene desde el LS es un arr) y la guardo en una variable
    console.log(currentInfo)
    currentInfo.push(saveUserOperation()) //MODIFICAMOS poruqe el saveUserOperation es un obj (con la info del form) al cual tenemos q ponerlo dentro de un arr (en este caso currentInfo) para poder luego leerlo dentro del LS
    console.log(currentInfo)
    setInfo("Operations", currentInfo)//MANDAMOS al LS bajo la key operations el arr q modificamos (currentInfo) antes para poder guardar la nueva info
    console.log("apretaste btn aceptar nueva operacion")
    window.location.reload()
  }














// FUNCIONALIDAD DE BALANCE *****************************************************************************************



// FUNCIONALIDAD DE FILTROS *****************************************************************************************























// // LOCAL STORAGE **************************************************************************************************


// const shapeDate = (objOperation) => {//hago una funcion la cual va a estar dando la forma de dd/mm/aa a la fecha
//   const separateDate = objOperation.fecha
//     const day = separateDate.getDate() //capturo el numero del dia
//     const month = separateDate.getMonth() + 1; //capturo el numero del mes +1 porque los meses van de 0 a 11
//     const year = separateDate.getFullYear()// capturo el numero de anio
//     return `${day}/${month}/${year}` //y retorno la fecha en el orden que yo quiera mostrar
// }
// console.log(shapeDate(prueba))































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
    id: randomId(),
    category: "Transporte",

  },
  {
    id: randomId(),
    category: "Trabajo",

  }
]



//------------------------------------ RENDER------------------------------------------------

const renderCategory = (arrayCategorys) => {   // PINTO LA LISTA CON LAS CATEGORIAS
  for (const item of arrayCategorys) {

    just("#container-category").innerHTML += `<li class="h-[2rem] flex  justify-between mb-[1rem]">
    <p
        class="h-[2rem] w-[4rem] bg-[#ebfffc] pt-[3px] rounded-[0.3rem] text-[0.8rem]  text-center text-emerald-500">
        ${item.category}</p>
    <div class="flex">
        <button class="edit  w-[4rem] pt-[4px] text-[0.8rem] text-cente text-[#3273df]"onclick="editCategory('${item.id}')" >Editar</button>
        <button  class=" w-[4rem] pt-[4px]  text-[0.8rem] text-cente text-[#3273df]">Eliminar</button>
    </div> `

  }
}




const savecategory = () => {   //GUARDO EL VALOR DE MI IMPUT  Y AGREGO ID
  return {
    id: randomId(),
    category: just("#input-add").value,

  }
}

const editCategory = (categoryId) => {  // CAMBIO LA VISTA CATEGORIA A EDITAR CATEGORIA
  showElement(".section-edit-category")
  hideElement("#section-category")

  // PASE POR PARAMETRO EL ID DE MI OBJETO
}







// -----------------------------------EVENTS---------------------------------------------------

const inicializeApp = () => {
  setInfo("categories", category)  // ENVIO INFORMACION AL LOCAL STORAGE
  const traigoInfo = getInfo("categories")  // TRAIGO LA INFO DEL LOCAL STORAGE
  renderCategory(traigoInfo) // LLAMO A LA FUNCION QUE ME PINTA LAS CATEGORIA Y LE PASO LA INFO DEL LOCAL

  just("#btn-add-categories").addEventListener("click", (e) => {
    e.preventDefault()
    const datoActual = getInfo("categories")      // ME TRAIGO LA INFO QUE TIENE EL LOCAL
    datoActual.push(savecategory())  // MODIFICO  EL DATO 
    just("#container-category").innerText = " " // LIMPIO LA PANTALLA  
    renderCategory(datoActual)  // CUANDO  LIMPIO ACTUALIZO CON EL DATO ACTUAL
    setInfo("categories", datoActual)  // ENVIOO LA INFO AL LOCAL STORE  



  })
}

window.addEventListener("load", inicializeApp())
