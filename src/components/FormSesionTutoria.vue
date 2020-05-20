<template>
    <div class= "formSesionTutoria container">
        <div class="top-titulo">
            <h4 class="col-sm-4 tutoria-title">Tipo de Tutoría: </h4>
            <select class="col-sm-4 form-control" style="left:-40px;top:26px;">
                <option selected disabled value="">Selecciona Tipo de Tutoría</option>
                <option 
                    v-for="(tipoTutoria, index) in tiposTutoria" 
                    :key="index" 
                    :value="tipoTutoria.id_tipo_tutoria">
                    {{ tipoTutoria.nombre }}
                </option>
            </select>
            <div class="botones">
            <button type="button" class="btn btn-info">Guardar</button>
            <button type="button" class="btn btn-info" style="border-color:gray;background-color:gray;">Cancelar</button>
            </div>
        </div>
        <hr>
        <div class="row grid-divider">
            <div class="izq col-lg-6 col-xm-2 col-md-12">
                <div class="font-weight-bolder text-left">Alumno</div>
                <div class="row">
                    <div class="col-md-4 col-sm-4">
                        <div class="col-sm-6"><label for="formGroupExampleInput">Código</label></div>
                        <hr style="width:335%;">
                        <input type="text" class="form-control bg-gray-300" placeholder="Código">
                    </div>
                    <div class="col">
                        <div class="col-sm-12 col-md-12" style="text-align:left;padding-bottom:30px;">
                            <label for="formGroupExampleInput" style="margin-right:50px">Nombre y Apellidos</label>
                            <ion-icon name="add" style="bottom:-10px;font-size:20px;"/>
                        </div>
                        <input type="text" class="form-control" placeholder="Nombre">
                    </div>
                    
                </div>

            </div>
            <div class="der col-lg-6 col-xm col-md-12">
                <div class="font-weight-bolder text-left">Resultado</div>
                 <div class="top-titulo" style="margin-bottom:20px;">
                    <div class="col-sm-4 motivo-dropdown-title">Motivo: </div>
                    <select class="col-sm-4 form-control" style="left:-40px;top:5px;">
                        <option value="+47">Cachimbo</option>
                        <option value="+46">Tercera Matriula</option>
                        <option value="+45">Cuarta Matriula</option>
                    </select>
                    <div class="botones">
                    <button type="button" class="btn btn-info" style="border-color:gray;background-color:gray;">Seleccionar</button>
                    </div>
                </div>
                <div class="left-content" >
                    <h5 style="color:black;font-weight:900;text-align:left;">Motivos Seleccionados</h5>
                    <hr>
                    <div class="overflow-wrap">
                    <div class="motivos-seleccionados" style="text-align:left;">No tiene motivos seleccionados</div><!--<ion-icon name="remove" style="margin-left : 20px;float:left;"/>-->
                    </div>
                    <hr>
                    <div class="form-group" style="text-align:left;margin-bottom:20px;">
                        <label for="descripcion">Descripción:</label>
                        <textarea class="form-control" id="descripcion-motivo" rows="7"></textarea>
                    </div>
                    <div class="top-titulo" style="text-align:left;">
                    <div class="col-sm-4 derivar-dropdown-title">Derivar: </div>
                    <select class="col-sm form-control" style="left:-40px;">
                        <option value="+47">Unidad</option>
                        <option value="+46">de</option>
                        <option value="+45">Apoyo</option>
                    </select>
                    </div>
                </div>
                
            </div>
        </div>
        <hr>
    </div>
</template>

<script>
import axios from 'axios';


//import axios from 'axios'
export default {
    name: 'formSesionTutoria',
    data () {
        return {
            selectedTipoTutoria: '',
            tiposTutoria: []
        }
    },
    mounted(){
    axios.post('TipoTutoria/listarTodo/4')
        .then( response => {
            this.tiposTutoria = response.data;
            console.log(response);
        })
        .catch(e => {
          console.log(e.response);
        });
    },
}
</script>

<style lang="scss" scoped>
@import url(https://cdn.syncfusion.com/ej2/material.css);
.izq {
    //background-color: cornflowerblue;
    padding: 20px;
}
.der {
    //background-color: darkgreen;
    padding: 20px;
}
.tutoria-title{
    margin-top: 30px;
    margin-bottom: 20px;
}
.grid-divider {
  overflow-x: hidden; //quickfix to hide divider on left side
  position: relative;
}

.grid-divider > [class*="col-"]:nth-child(n + 2):after {
  content: "";
  background-color: gray;
  position: absolute;
  top: 0;
  bottom: 0;

  @media (max-width: 767px) {
    width: 100%;
    height: 1px;
    left: 0;
    top: -4px; // quickfix to center line between columns
  }
  @media (min-width: 768px) {
    width: 1px;
    height: auto;
    left: -1px; // quickfix to hide divider on left side
  }
}
.font-weight-bolder {
    color: black;
    font-size: 24px;
    font-family: "Brandon Bold",Helvetica,Arial,sans-serif !important;
}
.botones {
    margin:auto;
}
.btn {
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    margin: 5px;
}
.top-titulo {
    display: flex;
    justify-content: space-between;
}
.text-left {
    margin-bottom: 20px;
}
.motivo-dropdown-title {
    top: 10px;
}
.form-control {
  border-radius: 1.25rem;  
  border: 2px solid #757575;
}
</style>