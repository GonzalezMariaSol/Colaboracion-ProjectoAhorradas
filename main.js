// UTILITIES ******************************************************************************************
const just = (selector) => document.querySelector(selector); //punto para clases, # para id
const all = (selector) => document.querySelectorAll(selector);

const randomId = () => self.crypto.randomUUID();

const showElement = (selector) => just(selector).classList.remove("hidden");
const hideElement = (selector) => just(selector).classList.add("hidden");

// LOCAL STORAGE ******************************************************************************************
const getInfo = (key) => JSON.parse(localStorage.getItem(key)); //pedimos la info al LS. Se pasa una key, y la busca en el LS y con el parse la transformamos a obj asi podemos manipularla
const setInfo = (key, arrInfo) =>
  localStorage.setItem(key, JSON.stringify(arrInfo)); //definimos la info en el LS. Se le pasa una key y un arr c info y lo que hace es crear eso en el LS

// MUESTRA - OCULTAR SECTIONS-VISTAS
const showViews = (view) => {
  //hago una funcion que muestre y oculte las vistas
  all(".view").forEach((view) => {
    //primero digo que por cda secction q en su clase que tenga como nombre view (basicamente todas)
    view.classList.add("hidden"); //entonces a esas que contengan el "view" me agregue la clase hidden (osea esconderia todas)
  });
  just(`.${view}`).classList.remove("hidden"); //PERO luego le decimos che, pero a esta en especifico (la q estamos pasando x parametro), sacale ese hidden y mostramela
}; //osea que cuando llamemos a showViews basicamente vamos a estar escondiendo a todas las vistas, excepto la q le pasemos x parametro

// FUNCIONALIDAD SECTOR DE OPERACIONES - NUEVA OPERACION - EDITAR OPERACION **************************************************
//?SHOWOPERATIONS FUNCIONA BIEN
//SHOWOPERATIONS ES QUIEN IMPRIME EN PANTALLA LAS CASILLAS CON LA INFO QUE CARGO EL USUARIO
const showOperations = (arrOperations) => {
  //arrOperations va a ser lo que obtengamos del local storage q ya viene con forma de arr
  for (const operation of arrOperations) {
    //por cda operacion(me trae cda hilera) del array operations
    just(".table-userOperation").innerHTML +=
      //crear los td (casilleros) para cada una de mis columnas dentro de la tabla q llamamos
      `
      <tr>
        <td class="text-center border-r-6 p-3 border-transparent max-w-[150px] whitespace-normal break-words">${operation.descripcion}</td>
        <td class="text-center border-r-6 p-3 border-transparent">${operation.categoria}</td>
        <td class="text-center border-r-6 p-3 border-transparent">${operation.fecha}</td>
        <td class="text-center border-r-6 p-3 border-transparent break-all">${operation.monto}</td>
        <td class="p-3 flex flex-col">
            <button class="bg-[#ebfffc] text-emerald-500 text-center mb-1 border-r-6 border-transparent rounded-md" onclick="ejecutionOfNewOp('${operation.id}')">Editar</button>
            <button class="bg-[#ebfffc] text-emerald-500 text-center border-r-6 border-transparent rounded-md" onclick="ejecutionDeleteBtn('${operation.id}', '${operation.descripcion}')">Eliminar</button>
        </td>
      </tr>
      <tr class="m-28 border-[1vh] border-[#ffffff92] rounded-full"></tr>
      `;
  } //el btn eliminar coloca como parametros de nuestra funcion ejecutionDeleteBtn (al id y la descripcion que esta entrando como info)
};

//?ejecutionDeleteBtn FUNCIONA BIEN
//SE OCUPA DE HACER EL CAMBIO DE PANTALLAS MAS TAMBIEN GUARDAR LA INFO DE EL ID DE CUAL DE TODAS LAS OP SE QUIERE ELIMINAR
const ejecutionDeleteBtn = (opId, opDescription) => {
  //entra el id y descripcion q se manipula
  //NO QUIERO Q SE MUESTRE EL HEADER TMPOCO
  just(".header").classList.add("hidden");
  //ESCONDEMOS TODO EL DOC EXCEPTO EL ALERTA DE QUERER BORRAR
  showViews("section-confirm-delete");
  // LE PASO EL ID DE LA OP Q SE QUIERE ELIMINAR AL BOTON EN EL HTML Q CONFIRMARIA EL ELIMINAR (el q dice "ELIMINAR") por esto es q luego podemos hacer la accion de eliminar
  just(".btn-confirm-delete").setAttribute("id", opId);
  just(".operation-description").innerText = `'' ${opDescription} ''?`; //le agregamos al texto de "estas seguro q querer eliminar y le ponemos la descripcion que se puso asi se asegura que estamos borrando el que queremos borrar "
  //CUANDO ESCUCHE EL CLIK EL BTN ELIMINAR
  just(".btn-confirm-delete").addEventListener("click", () => {
    const userId = just(".btn-confirm-delete").getAttribute("id"); //NOS GUARDAMOS EL ID CORRESPONDIENTE QUE TRAE EL BTN
    runBtnConfirmDelete(userId); //Y SE LO PASAMOS A NUESTRA FUNCION
    window.location.reload(); //!porque luego del reload se me rompe la estructura del table?
  });
};
// NUNCA MEZCLAR LA FUNCION Q MANIPULA EL DOM ↑↑ CON LA FUNCION Q MANIPULA EL LS ↓↓ PORQUE DE ESTA MANERA SE PUEDEN REUTILIZAR
const runBtnConfirmDelete = (opId) => {
  //NUESTRA FUNCION RECIBE 1 SOLO ID
  const currentOperations = getInfo("Operations").filter((op) => op.id != opId); //Y LE DECIMOS Q NOS DEVUELVA TODAS LAS OPERACIONES PERO NO LA QUE TENGA EL MISMO ID AL QUE LE PASAMOS
  setInfo("Operations", currentOperations); //Y DEVOLVEMOS TODAS LAS OPERACIONES Q NO COINCIDIA CON EL ID
}; //!hicimos esto y no el localStorage.removeItem('miDato') porque si uso el remove estaria borrando TODO el array con los obj dentros? no hay manera de filtrar y decirle removeItem ESTE?

//?EJECUTIONOFNEWOP FUNCIONA BIEN
//EJECUTIONOFNEWOP SE ENCARGA DE HACER EL CAMBIO DE PANTALLAS, MOSTRAR EL QUE QUEREMOS + SI SE QUIERE EDITAR QUE SE CARGUE LA INFO DEL QUE SE QUIERE EDITAR
const ejecutionOfNewOp = (opId) => {
  //cada "nueva op" ademas de tener las "consingnas" tiene un id unico, ese id es el q pasamos x parametro para poder luego encontrar especificamente la info q este junto a ese id
  // CUANDO HAGA CLICK EN EL BTN VA A EJECUTARSE ESTOS CAMBIOS ↓↓↓↓
  showViews("section-editOperation"); //oculte todas las vistas y muestre la seccion de editar operacion
  just(".btn-confirm-edit").classList.remove("hidden"); //mas que se muestre el btn con nombre "confirmar"
  just("#editOp-tittle").classList.remove("hidden"); // y se muestre el titulo correspondiente q seria "editar operacion"
  just("#btn-add-newOp").classList.add("hidden"); // y se esconda el btn "agregar" (operacion)
  just("#newOp-tittle").classList.add("hidden"); //y se esconda el titulo "nueva Operacion"

  // LE PASAMOS EL ID DE LA OP ELEGIDA AL BOTON DEL FORM (el q dice "confirmar") a raiz de aca es que luego podemos hacer la edicion
  just(".btn-confirm-edit").setAttribute("id", opId);
  // PEDIMOS LAS OPERACIONES Y ENCONTRAMOS ESPECIFICAMENTE AL QUE LE DIMOS CLICK↓↓↓↓
  const choosenOperation = getInfo("Operations").find(
    (operation) => operation.id === opId
  );

  //obtenemos en -choosenOperation q devuelve un obj donde estan todas las key + el id unico- que nos precargue la info q se eligio editar
  just("#input-description-text").value = choosenOperation.descripcion; //al precargar va a mostrar el value de la op que selecciono
  just("#input-amount-numb").value = choosenOperation.monto; //al precargar va a mostrar el value de la op que selecciono
  just("#select-type").value = choosenOperation.tipo; //al precargar va a mostrar el value de la op que selecciono
  just("#select-category").value = choosenOperation.categoria; //al precargar va a mostrar el value de la op que selecciono
  just("#input-date").value = choosenOperation.fecha; //
};

//?SAVEUSEROPERATION FUNCIONA BIEN
//SAVEUSEROPERATION TOMA LOS DATOS SUELTOS DEL FORM Y LOS TRANSFORMA EN UN OBJ
const saveUserOperation = (opId) => {
  //necesitamos recibir un parametro para luego poder decidir si le asignamos uno o si ya tiene, se lo conservamos
  //transformamos los datos que entran a traves del form (que son datos sueltos) en un obj
  return {
    id: opId ? opId : randomId(), //tengo operacion con id? entonces guardame ESE id de esa operacion : SINO generame uno con el randomId
    descripcion: just("#input-description-text").value,
    monto: just("#input-amount-numb").value,
    tipo: just("#select-type").value,
    categoria: just("#select-category").value,
    fecha: just("#input-date").value,
  };
};
console.log(saveUserOperation());

// LOCAL STORAGE **************************************************************************************************
//?TOTALOperations FUNCIONA BIEN - muestra un arr vacio al principio y luego si recargo me muestra si cargue o no algo al arr
//TOTALOperations VALE LO Q LA KEY TENGA O SINO UN ARR VACIO
const totalOperations = getInfo("Operations") || []; //totalOperations va a guardar primero la info que hay bajo el nombre de operations O si no hay info, entonces un array vacio

//NI BIEN ABRIMOS LA WEB QUIERO ... ***************************************************************************************
const initializeApp = () => {
  const operationsInfo = getInfo("Operations");
  if (!(operationsInfo && operationsInfo.length > 0)) {
    just(".view-no-operations").classList.remove("hidden");
    just(".div-table-container").classList.add("hidden");
  }

  //?setInfo funciona bien
  setInfo("Operations", totalOperations); //creamos una key llamada Operations y el array va a ser lo que guarde totalOperations ya sea un array c info o arr vacio

  //?showOperations funciona bien
  showOperations(totalOperations);

  //BTNS DEL NAVBAR //?funcionan bien *****************************************************************************************
  just("#btn-balance-navb").addEventListener("click", () =>
    showViews("main-page")
  ); //escucha el click sobre btn de balance y esconde todas las vistas excepto la de balance
  just("#btn-category-navb").addEventListener("click", () =>
    showViews("section-category")
  ); //escucha el click sobre btn de categorias y esconde todas las vistas excepto la de categorias
  just("#btn-reports-navb").addEventListener("click", () =>
    showViews("section-reports")
  ); //escucha el click sobre btn de reportes y esconde todas las vistas excepto la de reportes

  // BTN + NUEVA OPERACION //?funciona bien
  just("#btn-newOp").addEventListener("click", () => {
    showViews("section-editOperation");
    just(".btn-confirm-edit").classList.add("hidden");
    just("#editOp-tittle").classList.add("hidden");
    just("#btn-add-newOp").classList.remove("hidden");
    just("#newOp-tittle").classList.remove("hidden");
  });

  // BTN AGREGAR - NUEVA OPERACION //?funciona bien
  just("#btn-add-newOp").addEventListener("click", (e) => runBtnAddNewOp(e)); //cuando se le de click al btn agregar, ejecuta la funcion la cual transforma el obj de info del form a un arr y lo pasa al LS

  // -----------BOTON CANCELAR OPERACION //?funciona bien
  just("#btn-cancel-newOp").addEventListener("click", () => {
    //escucha el click sobre btn cancelar en nueva op y devuelve solo la vista principal
    showViews("main-page");
    window.location.reload();
  });

  just(".btn-confirm-edit").addEventListener("click", (e) => runBtnConfirm(e)); //che btn confirmar cuando escuches un click ejecuta la funcion runBtnConfirm

  just(".btn-cancel-delete").addEventListener("click", () => {
    //escucha el click sobre btn cancelar en eliminar y  te devuelve la vista principal
    showViews("main-page");
    window.location.reload();
  });
};
window.addEventListener("load", initializeApp); // esto va a esperar a que toda la página se cargue antes de ejecutar el evento clic

//?runBtnAddNewOp FUNCIONA BIEN
//runBtnAddNewOp SE EJECUTA DENTRO DE initializeApp, Y SE ENCARGA DE PEDIR INFO EN FORMATO OBJ, LO TRANSFORMA A ARR Y LO DEVUELVE MODIFICADO
const runBtnAddNewOp = (e) => {
  //pusheamos el obj capturado al array que luego va a crear las filas de nuestro table
  e.preventDefault(); //evita que se recargue la web y perder los datos
  const currentInfo = getInfo("Operations"); //PIDO las operaciones q viene en forma de ARR (porque operations q viene desde el LS es un arr) y la guardo en una variable
  currentInfo.push(saveUserOperation()); //MODIFICAMOS poruqe el saveUserOperation es un obj (con la info del form) al cual tenemos q ponerlo dentro de un arr (en este caso currentInfo) para poder luego leerlo dentro del LS. en este caso saveUserOperation no le pasamos parametro porque al ser una NUEVA OPERACION no va a tener id, por lo que va a ser falso la primer condicion y va a pasar un randomId
  setInfo("Operations", currentInfo); //MANDAMOS al LS bajo la key operations el arr q modificamos (currentInfo) antes para poder guardar la nueva info
  //TODO: aca deberia poner una funcion para cambiar el orden de la fecha?????
  window.location.reload();
};

const runBtnConfirm = (e) => {
  e.preventDefault(); //primero q nada no te me refresques porque i need you
  const opId = just(".btn-confirm-edit").getAttribute("id"); //en una variable PIDO el id que esta guardando el btn confirmar en editar operacion (q seria el id unico de ESA operacion elegida)
  const currentOperations = getInfo("Operations").map((op) => {
    //getInfo  un array de operaciones,y usamos map para crear un nuevo array (currentOperations) donde se han aplicado ciertas transformaciones (lo q edito el usuario)
    if (op.id === opId) {
      //si el id de la operacion que estoy recorriendo coincide con el id de la operacion que se eligió
      return saveUserOperation(opId); //tonce devolveme el obj con la info que cambio el usuario, aca si le pasamos parametro a savaUserOperation porque la operacion ya fue creada y asignada con un ID y nosotros deberiamos respetar ese id en vez de cambiarlo por uno nuevo
    }
    return op; //sino se modifico nada entonces devolveme la misma operacion con la q ingreso
  });
  setInfo("Operations", currentOperations);
  window.location.reload();
};

// GENERAR CATEGORIAS EN LA TABLA Y EN FILTROS

const printCategoriasInSelectOpt = () => {
  for (const categoria of getInfo("categories")) {
    just(".form-select-category").innerHTML += `
<option>${categoria.category}</option>`;
    just("#select-category").innerHTML += `
<option>${categoria.category}</option>`;
  }
};
printCategoriasInSelectOpt();

// PARA ACTUALIZAR LA LISTA DE CATEGORIAS EN MIS INPUTS NECESITO Q TAMARA HAGA FUNCIONAL SU BOTON DE "EDITAR" EN LA VISTA DE EDITAR CATEGORIA, UNA VEZ QUE ELLA TENGA ESA FUNCION, YO TENDRIA QUE AGREGAR EL PASO DE QUE SE ACTUALICEN MIS INPUTS... COMO? NIDEA

// FUNCIONALIDAD DE BALANCE *****************************************************************************************

// FUNCIONALIDAD DE FILTROS *****************************************************************************************
//me tendria que traer lo que hay en el LS de categorias y meter cda categoria dentro de un option-select

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
  },
];

//------------------------------------ RENDER------------------------------------------------

const renderCategory = (arrayCategorys) => {
  // PINTO LA LISTA CON LAS CATEGORIAS
  for (const item of arrayCategorys) {
    just(
      "#container-category"
    ).innerHTML += `<li class="h-[2rem] flex  justify-between mb-[1rem]">
    <p
        class="h-[2rem] w-[4rem] bg-[#ebfffc] pt-[3px] rounded-[0.3rem] text-[0.8rem]  text-center text-emerald-500">
        ${item.category}</p>
    <div class="flex">
        <button class="edit  w-[4rem] pt-[4px] text-[0.8rem] text-cente text-[#3273df]"onclick="editCategory('${item.id}')" >Editar</button>
        <button  class=" w-[4rem] pt-[4px]  text-[0.8rem] text-cente text-[#3273df]">Eliminar</button>
    </div> `;
  }
};

const savecategory = () => {
  //GUARDO EL VALOR DE MI IMPUT  Y AGREGO ID
  return {
    id: randomId(),
    category: just("#input-add").value,
  };
};

const editCategory = (categoryId) => {
  // CAMBIO LA VISTA CATEGORIA A EDITAR CATEGORIA
  showElement(".section-edit-category");
  hideElement("#section-category");

  // PASE POR PARAMETRO EL ID DE MI OBJETO
};

// -----------------------------------EVENTS---------------------------------------------------

const inicializeApp = () => {
  setInfo("categories", category); // ENVIO INFORMACION AL LOCAL STORAGE
  const traigoInfo = getInfo("categories"); // TRAIGO LA INFO DEL LOCAL STORAGE
  renderCategory(traigoInfo); // LLAMO A LA FUNCION QUE ME PINTA LAS CATEGORIA Y LE PASO LA INFO DEL LOCAL

  just("#btn-add-categories").addEventListener("click", (e) => {
    e.preventDefault();
    const datoActual = getInfo("categories"); // ME TRAIGO LA INFO QUE TIENE EL LOCAL
    datoActual.push(savecategory()); // MODIFICO  EL DATO
    just("#container-category").innerText = " "; // LIMPIO LA PANTALLA
    renderCategory(datoActual); // CUANDO  LIMPIO ACTUALIZO CON EL DATO ACTUAL
    setInfo("categories", datoActual); // ENVIOO LA INFO AL LOCAL STORE
  });
};

window.addEventListener("load", inicializeApp());
