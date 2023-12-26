// UTILITIES ******************************************************************************************
const just = (selector) => document.querySelector(selector); //punto para clases, # para id
const all = (selector) => document.querySelectorAll(selector);

const randomId = () => self.crypto.randomUUID();

const showElement = (selector) => just(selector).classList.remove("hidden") // MUESTRA LA VENTANA
const hideElement = (selector) => just(selector).classList.add("hidden") // OCULTA LA VENTANA
const clear = (selector) => just(selector).innerText = "" // LIMPIA EL CONTENEDOR

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
  just(".tbody-info-loaded").innerHTML = ""

  if (!(arrOperations.length > 0)) {
    just(".view-no-operations").classList.remove("hidden");
    just(".div-table-container").classList.add("hidden");
  }

  const categoryName = (idCategoria) => {
    for (const category of getInfo("categories")) {
      if (idCategoria === category.id) {
        return (category.category)
      }
    }
  }

  for (const operation of arrOperations) {
    //por cda operacion(me trae cda hilera) del array operations

    just(".tbody-info-loaded").innerHTML +=
      //crear los td (casilleros) para cada una de mis columnas dentro de la tabla q llamamos
      `
    <tr>
    <td class="text-center border-r-6 p-3 border-transparent max-w-[150px] whitespace-normal break-words">${operation.descripcion}</td>
    <td class="text-center border-r-6 p-3 border-transparent"><p class="bg-[#ebfffc] text-emerald-500 text-center rounded-md">${categoryName(operation.categoria)
      }</p></td>
    <td class="text-center border-r-6 p-3 border-transparent">${operation.fecha}</td>
    <td class="text-center border-r-6 p-3 border-transparent break-all" id="num-amount">${operation.monto}</td>
    <td class="p-3 flex flex-col">
    <button class="bg-[#ebfffc] text-emerald-500 text-center mb-1 border-r-6 border-transparent rounded-md" onclick="ejecutionOfNewOp('${operation.id}')">Editar</button>
    <button class="bg-[#ebfffc] text-emerald-500 text-center border-r-6 border-transparent rounded-md" onclick="ejecutionDeleteBtn('${operation.id}', '${operation.descripcion}')">Eliminar</button>
    </td>
    </tr>
    <tr class="m-28 border-[1vh] border-[#ffffff92]"></tr> 
    `
  } //el btn eliminar coloca como parametros de nuestra funcion ejecutionDeleteBtn (al id y la descripcion que esta entrando como info)
}








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
    window.location.reload();
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
  just("#op-input-date").value = choosenOperation.fecha; //
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
    fecha: just("#op-input-date").value,
  };
};


// LOCAL STORAGE **************************************************************************************************
//?TOTALOperations FUNCIONA BIEN - muestra un arr vacio al principio y luego si recargo me muestra si cargue o no algo al arr
//TOTALOperations VALE LO Q LA KEY TENGA O SINO UN ARR VACIO
const totalOperations = getInfo("Operations") || []; //totalOperations va a guardar primero la info que hay bajo el nombre de operations O si no hay info, entonces un array vacio

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



// VALIDACION DE FORMULARIO
const validateForm = (e) => {
  const description = just("#input-description-text").value.trim() //el trim lo que hace es q el usuario hace 3 espacios, escribe y luego otros 10 espacios, el trim te saca los espacios al peo y te devuelve el valor como tal
  const amount = just("#input-amount-numb").value
  const type = just("#select-type").value
  const category = just("#select-category").value
  const date = just("#op-input-date").value
  // const submitAvaible = description !== "" && description !== "" && description !== "" && description !== "" && description !== "" 


  if(description === ""){
    just(".warning-message-description").classList.remove("hidden")
    just(".warning-border-description").classList.add("border-red-500")
  }else{
    just(".warning-message-description").classList.add("hidden")
    just(".warning-border-description").classList.remove("border-red-500")
  }
  
  if(amount === ""){
    just(".warning-message-amount").classList.remove("hidden")
    just(".warning-border-amount").classList.add("border-red-500")
  }else{
    just(".warning-message-amount").classList.add("hidden")
    just(".warning-border-amount").classList.remove("border-red-500")
  }
  
  if(type === ""){
    just(".warning-message-type").classList.remove("hidden")
    just(".warning-border-type").classList.add("border-red-500")
  }else{
    just(".warning-message-type").classList.add("hidden")
    just(".warning-border-type").classList.remove("border-red-500")
  }
  
  if(category === ""){
    just(".warning-message-category").classList.remove("hidden")
    just(".warning-border-category").classList.add("border-red-500")
  }else{
    just(".warning-message-category").classList.add("hidden")
    just(".warning-border-category").classList.remove("border-red-500")
  }
  
  if(date === ""){
    just(".warning-message-date").classList.remove("hidden")
    just(".warning-border-date").classList.add("border-red-500")
  }else{
    just(".warning-message-date").classList.add("hidden")
    just(".warning-border-date").classList.remove("border-red-500")
  }

if(description !== "" && description !== "" && description !== "" && description !== "" && description !== "" ){
  console.log("sd;flkajdsf;lk")
  runBtnAddNewOp(e)
}
}//!PORQUE ME FUNCIONA SOLO SI CARGO DE ABAJO PARA ARRIBA PERO SI COMPLETO DE ARRIBA PARA ABAJO, ME LO CARGA IGUAL SIN IMPORTAR LOS FILTROS?







// FUNCIONALIDAD DE BALANCE *****************************************************************************************
// CALCULOGANANCIAS

const getEarningsBalance = () => {
  let totalEarnings = 0
  if (getInfo("Operations")) {
    for (const operacion of getInfo("Operations")) {
      if (operacion.tipo === "ganancia") {
        totalEarnings += Number(operacion.monto)
        just(".full-earnings").innerHTML = `${totalEarnings}`
      }
    }
    return totalEarnings
  }
}


const getExpensesBalance = () => {
  let totalExpenses = 0
  if (getInfo("Operations")) {
    for (const operacion of getInfo("Operations")) {
      if (operacion.tipo === "gasto") {
        totalExpenses += Number(operacion.monto)
        just(".full-expenses").innerHTML = `${totalExpenses}`
      }
    }
    return totalExpenses
  }
}

const getNetBalance = () => {
  const totalBalance = getEarningsBalance() - getExpensesBalance()
  just(".full-balance-num").innerHTML = `${totalBalance}`
  if (totalBalance < 0) {
    just(".full-balance").classList.add("text-red-600")
  } else if (totalBalance > 0) {
    just(".full-balance").classList.add("text-lime-500")
  }
}
getNetBalance()


// FUNCIONALIDAD DE FILTROS *****************************************************************************************
// OCULTAR-MOSTRAR FILTROS
just("#btn-hide-show-filters").addEventListener("click", () => hideFilters())
const hideFilters = () => {
  if (!just(".form-filters").classList.contains('hidden')) {
    just(".form-filters").classList.add("hidden")
    just("#btn-hide-show-filters").textContent = 'Mostrar filtros'
  } else {
    just(".form-filters").classList.remove("hidden")
    just("#btn-hide-show-filters").textContent = 'Ocultar filtros'
  }
}

// FILTRAR POR TIPO GANANCIA - GASTO
const showSelectedType = (e) => {
  const loadedOperation = getInfo("Operations")
  for (const operation of getInfo("Operations")) {
    if (operation.tipo === e.target.value) {
      showOperations(loadedOperation.filter(op => op.tipo === e.target.value))
    } else if (e.target.value === "todos") {
      showOperations(totalOperations)
    }
  }
}



//FILTRAR POR CATEGORIA 
const showSelectedCategory = (e) => {

  const categoryFound = getInfo("Operations").some(operation => operation.categoria === e.target.value) //hago un filtro para saber si al menos una categoria coincide con la categoria que entra por el btn
  if (categoryFound) { //si hay al menos una coincidencia entonces
    just(".view-no-operations").classList.add("hidden") //saco el letrero de que no hay operaciones cargadas
    showOperations(getInfo("Operations").filter(op => op.categoria === e.target.value)) //y muestro todas las operaciones q tengan esa categoria seleccionada
  } else if (e.target.value === "todos") { //si es q se selecciono a todos
    showOperations(totalOperations); //muestro todo mi LS
  } else {//si no coincide con nada
    just(".view-no-operations").classList.remove("hidden") //mostrar letrero que no hay operaciones con esa categoria
  }
};




// FILTRAR POR FECHA //a partir de la fecha seleccionada para atras hay que mostrar
const showSelectedDate = (e) => {
  const choosenDate = new Date(e.target.value)
  const selectedMonth = choosenDate.getMonth() + 1 //me trae el mes SELECCIONADO
  const selectedYear = choosenDate.getFullYear() //el anio SELECCIONADO

  const loadedOperation = getInfo("Operations")

  const filterOperations = loadedOperation.filter(op => selectedYear >= op.fecha.split("-")[0] && selectedMonth >= op.fecha.split("-")[1])
  showOperations(filterOperations)
}
//!si le doy clear, se me rompe el codigou


// FILTRAR POR MAYOR-RECIENTE O ABC
const showSelectedOrder = (e) => {
  const operationsCopy = [...getInfo("Operations")]; //se hace una copia superficil del array con obj del LS

  
  if(e.target.value === "masReciente"){ 
    operationsCopy.sort((a, b) => {
      const dateA = new Date(a.fecha)
      const dateB = new Date(b.fecha)
      return dateB - dateA
    })
    showOperations(operationsCopy)

  } else if (e.target.value === "menosReciente") {
    operationsCopy.sort((a, b) => {
      const dateA = new Date(a.fecha)
      const dateB = new Date(b.fecha)
      return dateA - dateB
    })
    showOperations(operationsCopy)

  } else if (e.target.value === "menorMonto") {
    operationsCopy.sort((a, b) => a.monto - b.monto);
    showOperations(operationsCopy)

  } else if (e.target.value === "mayorMonto") {
    operationsCopy.sort((a, b) => b.monto - a.monto);
    showOperations(operationsCopy)

  } else if (e.target.value === "AZ") {
    operationsCopy.sort((a, b) => {
      const descripcionA = a.descripcion.toLowerCase();
      const descripcionB = b.descripcion.toLowerCase();
      return descripcionA.localeCompare(descripcionB);
    });
    showOperations(operationsCopy)

  } else if (e.target.value === "ZA") {
    operationsCopy.sort((a, b) => {
      const descripcionA = a.descripcion.toLowerCase();
      const descripcionB = b.descripcion.toLowerCase();
      return descripcionB.localeCompare(descripcionA);
    });
    showOperations(operationsCopy)

  }
}

// UTIBILIDAD BOTON RESET
const resetearFormulario = () => {
  just(".form-select-type").value = "todos"
  just(".form-select-category").value = "todos"

  const fechaFormateada = new Date().toISOString().split('T')[0] //new date y toisostring devuelve YYYY-MM-DDTHH:mm:ss.sssZ con split dividimos donde aparece la T y pasan a ser dos arr ahora, el cual tiene posiciones, y con [0] estamos llamando al primer arr el cual contendria anio, mes y dia, dejando afuera la hora, min y segundos.~
  just("#form-input-date").value = fechaFormateada

  just("#form-select-order").value = "masReciente"
}





//*************************************************************************************************** */
//*************************************************************************************************** */
//*************************************************************************************************** */
//*************************************************************************************************** */

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

const allCategories = getInfo("categories") || category //TRAIGO INFO DEL LOCAL Y SI NO TIENE LO BUSCA EN EL ARRAY DE CATEGORIAS QUE TENGO

//------------------------------------ RENDER  CATEGORY------------------------------------------------

const renderCategory = (arrayCategorys) => {   // PINTO LA LISTA CON LAS CATEGORIAS

  clear("#container-category")
  for (const categorie of arrayCategorys) {
    just("#container-category").innerHTML += `<li class=" flex  justify-between mb-[1rem]">
    <p
        class=" w-[4rem] bg-[#ebfffc] pt-[3px] rounded-[0.3rem] text-[0.8rem]  text-center text-emerald-500">
        ${categorie.category}</p>
    <div class="flex">
        <button class="edit  w-[4rem] pt-[4px] text-[0.8rem] text-cente text-[#3273df]"onclick="editCategory('${categorie.id}')" >Editar</button>
        <button  class="btn-remove w-[4rem] pt-[4px]  text-[0.8rem] text-cente text-[#3273df]" onclick="viewChangeRemove('${categorie.id}'  , '${categorie.category}')">Eliminar</button>
    </div> `

    just("#form-select-category").innerHTML += `<option value="${categorie.id}">${categorie.category}</option>`
    just("#select-category").innerHTML += `<option value="${categorie.id}">${categorie.category}</option>`
  }
}







const saveAddcategory = (idCategori) => {   //GUARDO EL VALOR DE MI IMPUT CATEGORIA  Y AGREGO ID
  return {
      
    id: idCategori ? idCategori : randomId(),
    category: just("#input-add").value,
  };
};

const saveEditCategory = () => {  //GUARDO EL VALOR DE MI IMPUT EDIT 
  return {
    id: randomId(),
    category: just("#input-edit").value,

  }

}
// PASE POR PARAMETRO EL ID DE MI OBJETO
const editCategory = (categoryId) => {  // CAMBIO LA VISTA CATEGORIA A EDITAR CATEGORIA

  showElement(".section-edit-category")
  hideElement(".section-category")
  just("#btn-edit-categorie").setAttribute("id-categori", categoryId) //AGREGA EL ATRIBUTO Y PASA POR PARAMETRO ID
  const datoActual = getInfo("categories").find(categories => categories.id === categoryId) // OBTENGO  INFORMACION ACTUAL DEL LOCAL Y LUEGO ME FIJO CON EL METODO FIND SI LOS ID COINCIDEN
  just("#input-edit").value = datoActual.category // LLAMO A MI IMPUT Y LO FORZO A QUE TOME EL DATO QUE COICIDA CON EL ID


}

const addCategory = () => {
  const datoActual = getInfo("categories")      // ME TRAIGO LA INFO QUE TIENE EL LOCAL
  datoActual.push(saveAddcategory())  // MODIFICO  EL DATO 
  setInfo("categories", datoActual)
  renderCategory(datoActual)  // ENVIOO LA INFO AL LOCAL STORE  

}

const editBtnCategory = () => {
  const dataId = just("#btn-edit-categorie").getAttribute("id-categori") //
  const datoActual = getInfo("categories").map(categorie => {
    if (categorie.id === dataId) {
      return saveEditCategory(dataId)
    }
    return categorie
  })
  setInfo("categories", datoActual);
  renderCategory(datoActual)
}

const viewChangeRemove = (categoryId, categori) => {
  showElement(".container-eliminar");
  hideElement(".section-category")
  just("#name").innerText = `${categori}`
  just("#btn-remove-categories").setAttribute("id-categori", categoryId)
  just("#btn-remove-categories").addEventListener("click", () => {
    const IdCategoria = just("#btn-remove-categories").getAttribute("id-categori")
    deleteCategory(IdCategoria);
    deleteOperationWCategoryDeleted(IdCategoria)
    window.location.reload()

  })

}
const deleteCategory = (categoryId) => {
  const datoActual = getInfo("categories").filter(category => categoryId !== category.id)
  setInfo("categories", datoActual)
}

const deleteOperationWCategoryDeleted = (categoriaId) => {
  const currentOperations = getInfo("Operations").filter(operacion => operacion.categoria !== categoriaId);
  setInfo("Operations", currentOperations);
  console.log(currentOperations)
}





// FUNCION PARA BORRAR OPERACIONES QUE LA CETEGORIA FUE ELIMINADA --no funcion aun--
// const opWithoutCategory = () => {
// console.log(getInfo('Operations')) //arranco con arr de 6 

// for(const operation of getInfo('Operations')){
//   console.log(operation.categoria)
//   for(const category of getInfo("categories")){
//     console.log(category.category)
//     const OpActual = getInfo("Operations").filter(operation => operation.categoria !== category.category);
//     console.log(OpActual)
//   }
// }
// }


// ------------------------------REPORTES FILTRADOS ---------------------------------------------------------------



const renderReporte = (arrayOpertation) => {
  clear("#reportes")
  const clase = "value"
  if (arrayOpertation.length >= 3) {

    hideElement("#section-reports")
    showElement("#section-edit-reports");
     for (const operation of arrayOpertation) {
    
      just("#reportes").innerHTML = `<tbody>
        <tr class="mb-[1rem] h-[20%] w-[50%]">
          <th class="w-[50%] mb-[1rem] ml-[1rem] text-[#4A4A4A] text-left">Categoría con mayor ganancia</th>
           <td></td>
          <td ></td>
        </tr>
        <tr>
          <th class="text-[#4A4A4A] text-left">Categoría con mayor gasto</th>
          <td></td>
          <td class="valor"></td>
        </tr>
        <tr>
          <th class="text-[#4A4A4A] text-left">Categoría con mayor balance</th>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th class="text-[#4A4A4A] text-left">Mes con mayor ganancia</th>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <th class="text-[#4A4A4A] text-left">Mes con mayor gasto</th>
          <td></td>
          <td></td>
        </tr>
      </tbody>`;
    }
  } else {
    console.log("else");
    showElement("#section-reports");
  }
};


const calcularCategoriaMayorGanancia = (arrayOperation) => {
  let categoriaGananciaMaxima = "";
  let montoMaximo = 0;

  for (const operation of arrayOperation) {
    if (operation.monto > montoMaximo) {
      montoMaximo = operation.monto;
      categoriaGananciaMaxima = operation.categoria;
    }
  }

 console.log(categoriaGananciaMaxima); 
};

calcularCategoriaMayorGanancia(totalOperations)

const renderTotalCategory = (arrayCategorys) => {

  for (const category of arrayCategorys) {
    just("#totalCategory").innerHTML = `<tr>
    <th class="w-[30%] text-[#4A4A4A] text-left">Categoria</th>
    <th class="text-[#4A4A4A] text-left">Ganancias</th>
    <th class="text-[#4A4A4A] text-left">Gastos</th>
    <th class="text-[#4A4A4A] text-left">Balance</th>
</tr>
<tr>
    <td class="text-left">hola</td>
    <td>hola</td>
    <td></td>
    <td></td>
</tr>`
  }

}


const rendertotalMonth = (arrayCategorys) => {
  for (const category of arrayCategorys) {
    just("#totalMonth").innerHTML = ` <tr>
    <th class="w-[30%] text-[#4A4A4A] text-left">Mes</th>
    <th class="w-[30%] text-[#4A4A4A] text-left">Ganancias</th>
    <th class="w-[30%] text-[#4A4A4A] text-left">Gastos</th>
    <th class="w-[30%] text-[#4A4A4A] text-left">Balance</th>
</tr>
<tr>
    <td>Enero</td>
    <td></td>
    <td></td>
    <td></td>
</tr> `
  }
}





// const highestEarninCategory = () => {
//   const categoriafiltrada = getInfo("Operations").filter(operation => operation.tipo === "ganancia");

//   let acc = 0;

//   for (const categoria of categoriafiltrada) {
//     acc += Number(categoria.monto);
//   }
//   console.log(acc);

// };

// highestEarninCategory();



// -----------------------------------EVENTS---------------------------------------------------

const inicializeApp = () => {
  setInfo("categories", allCategories)  // ENVIO INFORMACION AL LOCAL STORAGE
  renderCategory(allCategories) // LLAMO A LA FUNCION QUE ME PINTA LAS CATEGORIA Y LE PASO LA INFO DEL LOCAL


  just("#btn-add-categories").addEventListener("click", (e) => {
    addCategory()

  })

  just("#btn-edit-categorie").addEventListener("click", (e) => {
    e.preventDefault()
    hideElement(".section-edit-category")
    showElement(".section-category")
    editBtnCategory()
    window.location.reload()
  })


  //?setInfo funciona bien
  setInfo("Operations", totalOperations) //creamos una key llamada Operations y el array va a ser lo que guarde totalOperations ya sea un array c info o arr vacio

  //?showOperations funciona bien
  showOperations(totalOperations)

  //BTNS DEL NAVBAR //?funcionan bien *****************************************************************************************
  just("#btn-balance-navb").addEventListener("click", () =>
    showViews("main-page")
  ); //escucha el click sobre btn de balance y esconde todas las vistas excepto la de balance
  just("#btn-category-navb").addEventListener("click", () =>
    showViews("section-category")
  ); //escucha el click sobre btn de categorias y esconde todas las vistas excepto la de categorias
  just("#btn-reports-navb").addEventListener("click", () => {
    showViews("section-reports")
    renderReporte(totalOperations)
    renderTotalCategory(totalOperations)
  }

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
  just("#btn-add-newOp").addEventListener("click", (e) => {
    validateForm(e)
    // runBtnAddNewOp(e)
    }); //cuando se le de click al btn agregar, ejecuta la funcion la cual transforma el obj de info del form a un arr y lo pasa al LS

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

  just(".form-select-type").addEventListener("input", (e) => showSelectedType(e))
  just("#form-select-category").addEventListener("input", (e) => showSelectedCategory(e))
  just("#form-input-date").addEventListener("input", (e) => showSelectedDate(e))
  just("#form-select-order").addEventListener("input", (e) => showSelectedOrder(e))


}




window.addEventListener("load", inicializeApp)