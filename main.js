// UTILITIES ******************************************************************************************
const just = (selector) => document.querySelector(selector); //punto para clases, # para id
const all = (selector) => document.querySelectorAll(selector);

const randomId = () => self.crypto.randomUUID();

const getInfo = (key) => JSON.parse(localStorage.getItem(key)) //pedimos la info al LS. Se pasa una key, y la busca en el LS y con el parse la transformamos a obj asi podemos manipularla
const setInfo = (key, arrInfo) => localStorage.setItem(key, JSON.stringify(arrInfo)) //definimos la info en el LS. Se le pasa una key y un arr c info y lo que hace es crear eso en el LS 




const showViews = (view) => {//hago una funcion que muestre y oculte las vistas
  all(".view").forEach((view) => {//primero digo que por cda secction q en su clase que tenga como nombre view (basicamente todas)
    view.classList.add("hidden"); //entonces a esas que contengan el "view" me agregue la clase hidden (osea esconderia todas)
  });
  just(`.${view}`).classList.remove("hidden"); //PERO luego le decimos che, pero a esta en especifico (la q estamos pasando x parametro), sacale ese hidden y mostramela
};//osea que cuando llamemos a showViews basicamente vamos a estar escondiendo a todas las vistas, excepto la q le pasemos x parametro






















// FUNCIONALIDAD DEL NAVBAR *****************************************************************************************

just("#btn-balance-navb").addEventListener("click", () => showViews("main-page")) //escucha el click sobre btn de balance y esconde todas las vistas excepto la de balance

just("#btn-category-navb").addEventListener("click", () => showViews("section-category")) //escucha el click sobre btn de categorias y esconde todas las vistas excepto la de categorias

just("#btn-reports-navb").addEventListener("click", () => showViews("section-reports")) //escucha el click sobre btn de reportes y esconde todas las vistas excepto la de reportes




















// FUNCIONALIDAD DE BALANCE *****************************************************************************************




























// FUNCIONALIDAD DE FILTROS *****************************************************************************************























// FUNCIONALIDAD DE OPERACIONES *****************************************************************************************

//?SHAPEDATE FUNCIONA BIEN
const shapeDate = (objOperation) => {//hago una funcion la cual va a estar dando la forma de dd/mm/aa a la fecha
  const separateDate = objOperation.fecha
    const day = separateDate.getDate() //capturo el numero del dia
    const month = separateDate.getMonth() + 1; //capturo el numero del mes +1 porque los meses van de 0 a 11
    const year = separateDate.getFullYear()// capturo el numero de anio
    return `${day}/${month}/${year}` //y retorno la fecha en el orden que yo quiera mostrar
}

//?RENDEROPERATIONS FUNCIONA BIEN
const showOperations = (arrOperations) => {//arrOperations va a ser lo que obtengamos del local storage q ya viene con forma de arr
  for (const operation of arrOperations) {//por cda operacion(me trae cda hilera) del array operations
    just(".table-userOperation").innerHTML +=//crear los td (casilleros) para cada una de mis columnas dentro de la tabla q llamamos
    `
        <tr>
            <td class="text-center">${operation.descripcion}</td>
            <td class="text-center">${operation.categoria}</td>
            <td class="text-center">${shapeDate(operation)}</td>
            <td class="text-center">${operation.monto}</td>
            <td class="flex flex-col">
                <button class="text-center">Eliminar</button>
                <button class="text-center" id="btn-edit-operation" onclick="all("#btn-edit-operation").forEach(element => {
                  element.addEventListener("click", () => {
                      showViews("section-editOperation")
                      just("#btn-edit-newOp").classList.remove("hidden")
                      just("#editOp-tittle").classList.remove("hidden")
                      just("#btn-add-newOp").classList.add("hidden")
                      just("#newOp-tittle").classList.add("hidden")
                    })
                }) 
                ">Editar</button>
            </td> 
        </tr>
    `
  }
};



// // EXPLICACION DE LO Q ESTA EN ONCLICK DEL BTN EDIT OPERATION
// all("#btn-edit-operation").forEach(element => {
//   element.addEventListener("click", () => { //cuando clickeen en btn editar op
//       showViews("section-editOperation") //oculte todas las vistas y muestre la seccion de editar operacion
//       just("#btn-edit-newOp").classList.remove("hidden") //mas que se muestre el btn con nombre "editar"
//       just("#editOp-tittle").classList.remove("hidden") // y se muestre el titulo correspondiente q seria "editar operacion"
//       just("#btn-add-newOp").classList.add("hidden") // y se esconda el btn "agregar" (operacion)
//       just("#newOp-tittle").classList.add("hidden") // y se esconda el titulo "nueva Operacion"
//     })
// }) 












// FUNCIONALIDAD DE NUEVA OPERACION *****************************************************************************************

//?SAVEUSEROPERATION FUNCIONA BIEN
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
//?TOTALINFO FUNCIONA BIEN - muestra un arr vacio al principio y luego si recargo me muestra si cargue o no algo al arr
const totalInfo = getInfo("Operations") || [] //totalInfo va a guardar primero la info que hay bajo el nombre de operations O si no hay info, entonces un array vacio
console.log(totalInfo)




//------------BOTON + NUEVA OPERACION 
const initializeApp = () => {

    setInfo("Operations", totalInfo) //creamos una key llamada Operations y el array va a ser lo que guarde totalInfo ya sea un array c info o arr vacio 

    // showOperations(totalInfo) //!porque si descomento esto se rompe todo mi codigo?

    just("#btn-newOp").addEventListener("click", () => {
      showViews("section-newOperation")
      just("#btn-edit-newOp").classList.add("hidden")
      just("#editOp-tittle").classList.add("hidden")
      just("#btn-add-newOp").classList.remove("hidden")
      just("#newOp-tittle").classList.remove("hidden")
    })

    just("#btn-add-newOp").addEventListener("click", (e) => pushObjToArr(e)) //cuando se le de click al btn agregar, ejecuta la funcion la cual transforma el obj de info del form a un arr y lo pasa al LS

    console.log("me ejecute")
}
window.addEventListener("load", initializeApp) // esto va a esperar a que toda la página se cargue antes de ejecutar el evento clic





//?PUSHOBJTOARR FUNCIONA BIEN
const pushObjToArr = (e) => { //pusheamos el obj capturado al array que luego va a crear las filas de nuestro table
    e.preventDefault() //evita que se recargue la web y perder los datos
    const currentInfo = getInfo("Operations") //PIDO la info q viene en forma de ARR (porque operations q viene desde el LS es un arr) y la guardo en una variable
    console.log(currentInfo)
    currentInfo.push(saveUserOperation()) //MODIFICAMOS poruqe el saveUserOperation es un obj (con la info del form) al cual tenemos q ponerlo dentro de un arr (en este caso currentInfo) para poder luego leerlo dentro del LS
    console.log(currentInfo)
    setInfo("Operations", currentInfo)//MANDAMOS al LS bajo la key operations el arr q modificamos (currentInfo) antes para poder guardar la nueva info
}







// -----------BOTON CANCELAR
just("#btn-cancel-newOp").addEventListener("click", () => showViews("main-page")) //escucha el click sobre btn cancelar en nueva op y devuelve solo la vista principal







//TODO: 1) porque al principio del doc me tira que "document is not defined"?                                                    2)showOperations(totalInfo) --> no entiendo tendria que hacer un const totalInfo = getInfo("Operations") || [] pero por cda key que vaya a tener? mas luego hacer un showOperations(cdaKey) asi se imprime lo q hay en cada key? ::me imagino que no porque operations imprime la info que nosotros queremos ver, pero las otras key van a servir para otras cosas internas como filtros o reportes::    No se puede hacer una version que luego se le cambie el parametro tipo totalInfo = (key) => getInfo(key) || [] y luego hacer rederOperations(totalInfo(y la key que quieras buscar))                                               3)Los eventos click que estan dentro de initializeApp, el btn nueva operacion y btn agregar porque tiene q esperar el evento load? porque tienen que esperar a q la pag cargue y no simplemente dejarlos afuera como un simple evento de boton? entiendo el porque de los getInfo y setInfo porque de eso depende que cuando cargues la pagina se muestre o no al principio si se cargo o no info anteriormente, pero los btn no le encuentro el sentido                                                                     4)Porque mi codigo funciona, pero al momento que descomento el showOperations(totalInfo) en initializeApp se rompe todo? estoy claramente fallando en como mandar la info del LS  la tabla para que se visualice, pero no entiendo como
















