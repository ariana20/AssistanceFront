<template>
  <div class="FormListarUsuario contenedor"  >
    <!-- para que lo vea bien un tutor y un alumno -->
   <div  >  
        <!-- Cabeceras  -->
        <div class="row"  >
                <h5  class="col-12 col-sm-4 col-md-2"  style="text-align:left;margin-top:5px" >Tipo de cita:</h5>   
                <div class="col-11 col-sm-8 col-md-3" style="text-align:left;padding:0px" >
                    <select v-model="tipoCitaSeleccionada" class="col-12 col-sm-10 col-md-10 form-control" style="cursor:pointer;margin-left:15px;margin-right:15px"  @change="listarCitas()" >
                      <option value="no" hidden selected  >Seleccionar</option>
                      <option class="col-12 col-sm-10 col-md-10"    v-for="(tipoU,index) in tipoCita" :value="tipoU.value" v-bind:key="index" style="cursos:pointer;" >
                      {{ tipoU.text}}
                      </option>
                    </select>
                </div>
               
                 <h5 class="col-12 col-sm-4 col-md-2" style="text-align:left;margin-top:5px;" >Fecha:</h5>   
                 <div  class="col-12 col-sm-8 col-md-3" >
                  <date-picker style="left:0px" class="wide-date-example"
                      v-model="periodo" 
                      v-on:change="listarCitas()"
                      width="20" :lang="lang" 
                      format="DD/MM/YYYY"
                      range 
                      placeholder="Selecciona Rango de Fechas"
                      
                      @input="handlePeriodChange"
                      input-class="form-control">
                  </date-picker>
                </div>  
        </div>        <!-- fin de cabeceras -->

         <!-- Para alumno -->
         <div v-if="esAlumno==true">
            <h5 style="text-align:left;margin-top:5px;" ><strong  >  Citas con tutores </strong></h5>
            <div style="overflow: auto;" v-if="this.citasAlumno.length>=1">
                  <table responsive class="table" style="text-align:left" >
                      <thead>
                          <tr>
                              <th scope="col" style="width:200px">Tutor</th>
                              <th scope="col" style="width:120px">Fecha</th>
                              <th scope="col" style="width:120px">Hora</th>
                              <th scope="col" style="width:120px">Tipo de Cita</th>
                              <!-- <th scope="col">Detalle</th> -->
                          </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item, index) in citasAlumno"  :key="index">
                            <td >{{item.nombre +' ' + item.apellidos}}</td>                            
                            <td >{{item.fecha}}</td>
                            <td >{{item.hora_inicio}}</td>
                            <td >{{item.tipo_de_cita}}</td>

                        </tr>
                      </tbody>
                  </table>
            </div> 
            <div v-else >{{"No hay citas del tipo "+this.tipoCitaSeleccionada+ " en el rango de fechas seleccionado."}} </div>
           
         </div>    
         <!-- Fin de lista de citas de alumno   -->

         <!-- Para tutor-->
         <div v-if="esTutor==true">
            <h5 style="text-align:left;margin-top:5px;" ><strong  > Citas con alumnos</strong></h5>
            <div style="overflow: auto;" v-if="this.citasTutor.length>=1">
                  <table responsive class="table" style="text-align:left" >
                      <thead>
                          <tr> 
                              <th scope="col" style="width:50px">Fecha</th>
                              <th scope="col" style="width:50px">Hora</th>
                              <th scope="col" style="width:50px">Tipo de Cita</th>
                              <th scope="col" style="width:100px;text-align:left">Alumno(s)</th>
                              <th scope="col" style="width:50px;text-align:left">Detalle</th>
                              <!-- <th scope="col">Detalle</th> -->
                          </tr>
                      </thead>
                      <tbody >
                          <tr  v-for="(item, index) in citasTutor"  :key="index">
                                                        
                                <td >{{item.fecha}}</td>
                                <td >{{item.hora_inicio}}</td>
                                <td >{{item.tipo_de_cita}}</td>
                                <td style="width:40%">
                                  <div class="row">
                                    <div v-for="(item2, index2) in item.cita_x_usuarios"  :key="index2">
                                        <div v-if="index2!=item.cita_x_usuarios.length -1">{{item2.nombre +' ' + item2.apellidos+', '}}</div>
                                        <div v-else>{{item2.nombre +' ' + item2.apellidos}}</div>
                                    </div>
                                  </div>
                                </td>
                              <td  style=";font-size:30px;text-align:left;
                                  padding-top: 0px;
                                  padding-bottom: 0px;
                                  margin-top: 0px;
                                  margin-bottom: 0px;
                                ">
                                  <!-- <b-icon v-if="item.estado == 'act'" icon="caret-right-square" style="color:green"/> -->
                                  <!-- <b-icon v-if="item.estado == 'act'" icon="caret-right-square" style="color:green"/> -->
                                  <!-- <b-icon icon="caret-right-square" style="color:#009878;width:25px; height:25px;"/> -->
                                  <!-- <b-icon  icon="card-text" style="color:#009878;width:25px; height:25px;"/> -->
                                 
                                   <h6 v-if="item.tipo_de_cita=='Cancelada'"  style="text-align:left;padding-top: 12px;">
                                     Cancelada
                                    </h6>
                                    <!-- No asistió -->
                                    <!-- {{item.cita_x_usuarios[0].pivot.asistencia}} -->
                                   <h6 v-else-if="item.cita_x_usuarios.length==1 && item.cita_x_usuarios[0].pivot.asistencia=='noa'"  style="text-align:left;padding-top: 12px;">
                                     No asistió
                                      
                                    </h6> 
                                     <div v-else-if="item.tipo_de_cita!='Cancelada'">
                                      <b-icon  icon="card-checklist" style="color:#009878;width:25px; height:25px;cursor:pointer" @click="detalle(index)"/>
                                     </div>

                              </td>
                            </tr>
                     
                        <!-- <tr v-else>No hay datos </tr> -->
                      </tbody>
                    
                  </table>
            </div>    
           <div v-else >{{"No hay citas del tipo "+this.tipoCitaSeleccionada+ " en el rango de fechas seleccionado."}} </div>
         </div>             <!-- Fin de lista de citas detutor   -->


    </div>     <!-- fin del contenedor -->
    <nav aria-label="Page navigation example">
				<ul class="pagination justify-content-center">
					<li class="page-item" v-if="paginate.current_page > 1">
						<a class="page-link" href="#" tabindex="-1" @click.prevent="changePage(paginate.current_page - 1)" style="color:rgb(0, 152, 146)">
							<span>Anterior</span>
						</a>
					</li>
					<li class="page-item" v-for="page in pagesNumber" :key="page">
							<a class="page-link" href="#" @click.prevent="changePage(page)" style="color:rgb(0, 152, 146)">
								<span class="sr-only">(current_page)</span>
								{{ page }}
						</a>
					</li>
					<li class="page-item" v-if="paginate.current_page < paginate.last_page">
						<a class="page-link" href="#" @click.prevent="changePage(paginate.current_page + 1)" 
            style="color:rgb(0, 152, 146)">
							<span>Siguiente</span>
						</a>
					</li>
				</ul>
			</nav>
      <!-- MODAL CARGANDO  -->
      <b-modal ref="my-modal" style="margin-left:20%;" size="md" centered hide-header hide-footer no-close-on-backdrop no-close-on-esc hideHeaderClose>
      <div style="font-size:20px;padding-top:25px;color:#0097A7;text-align:center;height:150px" class="text-center">
        <b-spinner style="width: 3rem; height: 3rem;"/>
        <br >Cargando... 
      </div>
      </b-modal>

  </div>
</template>

<script>

import axios from 'axios'
import Swal from 'sweetalert2'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import moment from 'moment';
export default {
   components:{
        DatePicker,
    },
  data(){
    return{
      keeps:[],
			paginate:{
				'total': 0,
				'current_page': 0,
				'per_page': 0,
				'last_page': 0,
				'from': 0,
				'to': 0
      },
      
			offset: 3, 
      miUsuario:this.$store.state.usuario, //Para sacar el id usuario
      miProg:this.$store.state.programaActual, //Para sacar el id del programa
      mispermisos:null,
      //Lista de citas del tutor
      citasTutor:[],
      esTutor:false,
      alumnosxcita:[],
      tutoriaTutor:null,
      //Lista de citas del alumno
      citasAlumno:[],
      esAlumno:false,
      //Cbx's
      tipoCitaSeleccionada:"no",
      tipoCita:null,
      //fechas
     
      periodo:'',
      lang: {
                formatLocale: {
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    // MMM
                    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
                    // dddd
                    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
                    // ddd
                    weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
                    // dd
                    weekdaysMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
                    firstDayOfWeek: 1,
                },
                monthBeforeYear: true,
      },
       //datepicker
      inicio: new Date(new Date().getTime() - 30 * 24 * 3600 * 1000),
      fin: new Date(),


    }
  },
 
  computed:{
        isActived: function(){
          return this.paginate.current_page;
        },
        pagesNumber: function(){
          if(!this.paginate.to){
            return [];
          }
          var from = this.paginate.current_page - 2;
          if(from<1){//debe ser un numero positivo
            from=1;
          }
          var to=from+(2 * 2);//TO DO
          if(to >= this.paginate.last_page){
            to=this.paginate.last_page;
          }
          //calculo de la numeracion exacta
          var pagesArray=[];
          while(from<=to){
            pagesArray.push(from);
            from++;
          }
          return pagesArray;
        },
        nombre:{
          get(){
              return this.$store.state.filtro.query;
          },
          set(val){
              this.$store.commit('SET_QUERY',val);
          }
        },

 
  },
  created(){
      this.periodo = [this.inicio,this.fin];
  },
  mounted(){
      
    if(this.$store.state.usuario==null) this.$router.push('/login'); 
   
    
    // this.tipoCita=["Realizada","Cancelada","Pendiente"];
    this.tipoCita=[
        {value: 'Realizada',text: "Realizada"}, //guardo el value
        {value: 'Cancelada',text: "Cancelada"},
        {value: 'Futura',text: "Futura"},
        {value: '',text: "Todos"},
      ];
    document.querySelector("#container > div > div.FormListarUsuario.contenedor > div > div > div > div > div > input").style.borderRadius = "1.25rem"; 
    document.querySelector("#container > div > div.FormListarUsuario.contenedor > div > div > div > div > div > input").style.border= "0.5px solid #757575";    
    document.querySelector("#container > div > div.FormListarUsuario.contenedor > div > div > div > div > div > input").style.fontWeight = "400";
    document.querySelector("#container > div > div.FormListarUsuario.contenedor > div > div > div > div > div > input").style.fontSize = "1rem";
    document.querySelector("#container > div > div.FormListarUsuario.contenedor > div > div > div > div > div > input").style.height = "2.4em";
    this.listarTUsuarios(1);
    
    //this.listarCitas(1); 




  },
  methods:{
		changePage: function(page){
      this.paginate.current_page=page;
      this.listarTUsuarios(page);
      //this.listarCitas(page);//trae un nuevo listadp      /////paginado
      event.preventDefault();
      
		},

    listarCitas(page) { /////paginado
    // if(this.esTutor==false && this.esAlumno==false) {this.listarTUsuarios();}
    // page=1;
      

      //  var url='/programa/usuarioPrograma/'+this.$store.state.programaActual.id_programa+'?page='+page;
      if(this.tipoCitaSeleccionada=="no") this.tipoCitaSeleccionada="";
      if(this.periodo[0]==null && this.periodo[1]==null ){
                Swal.fire({
                    text:"Seleccione una fecha para actualizar el listado de citas",
                    icon:"warning",
                    confirmButtonText: 'OK',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
               })
               this.hideModal();
      }
      else{
        this.showModal();
          let params ={
          id_usuario:this.miUsuario.id_usuario,
          //  fecha_ini:"2020-06-12",
          //  fecha_fin:"2020-08-12",
          fecha_ini:moment(this.periodo[0]).format('YYYY-MM-DD'),
          fecha_fin:moment(this.periodo[1]).format('YYYY-MM-DD'),
          tipo:this.tipoCitaSeleccionada,
          id_programa:this.miProg.id_programa,
        }  
        //  console.log(this.esTutor);
        //  console.log(this.esAlumno);
      
        if (this.esTutor ==true) {//Para tutor 
          // console.log('Es tutor');
          let url='/citas/listCitaTutor'+'?page='+page;  
          axios.post(url,params) 
          .then(res =>{        
            //ordenado this.mispermisos
            // console.log(res);
          if(res.data!="") {
              let par=res.data.tasks.data; 
              // console.log(par);
              //para ordenar
              this.citasTutor=par;
              
              this.esTutor=true;
              this.paginate=res.data.paginate;/////paginado
              //  console.log('Pivot:',   this.citasTutor[6].cita_x_usuarios[0].pivot);
          }
          else{
              this.citasTutor="";
              this.paginate='';
          }
            this.hideModal();//console.log(2);
                    
          })
          .catch(e => {
            console.log('catch listar',e);
              this.hideModal();//console.log(3);
            //Swal de problema
            Swal.fire({
                      text:"Estamos teniendo problemas al listar las citas. Vuelve a intentar en unos minutos.",
                      icon:"warning",
                      confirmButtonText: 'Sí',
                      confirmButtonColor:'#0097A7',
                      showConfirmButton: true,
            });

          })
        }
        if (this.esAlumno==true) {//Para alumno
          // console.log('Es alumno');
          let url='/citas/listCitaAlu'+'?page='+page;  
          // let url='/citas/listCitaAlu';  
          axios.post(url,params) 
          .then(res =>{        
            //ordenado 
            // console.log(res);        
              if(res.data!="") {
                  
                let par=res.data.tasks.data; 
                // console.log(par);
                this.citasAlumno=par;
                this.esAlumno=true;
                //Preguntar si es null y si es tutor,luego paginar
                this.paginate=res.data.paginate;/////paginado
              }
              else {
                this.citasAlumno="";
                this.paginate='';
              }
            this.hideModal();//console.log(4);
                    
          })
          .catch(e => {
            console.log('catch listar',e);
              this.hideModal();//console.log(5);
            //Swal de problema
            Swal.fire({
                      text:"Estamos teniendo problemas al listar las citas. Vuelve a intentar en unos minutos.",
                      icon:"warning",
                      confirmButtonText: 'Sí',
                      confirmButtonColor:'#0097A7',
                      showConfirmButton: true,
            });

          })


        }
        this.hideModal();




      }
      
      //Si es ambos(JP), ambas listas le van a aparecer
      //Cada lista tendrá un encabezado por si sucede ese caso jeje
      //Creo que mato al paginado con dos listas 
     
     
      
       
    },
    buscarUsuario(page){
      // this.showModal();
      let paramsB;

      paramsB={
        criterio:this.criterio,
        tipo_usuario:this.tiposUsuariosselect,
      }
      
      var url='/programa/usuarioPrograma/'+this.$store.state.programaActual.id_programa+'?page='+page;
      
       if(this.$store.state.tipoActual.nombre!="Admin"){ //Para coordinador   
       
        axios.post(url,paramsB) //Por ahora dsp será x program
        .then(res =>{  
          //ordenado por estado
          
           if(res.data==""){
            //  this.hideModal();
             //No encontró al usuario
             if(this.tiposUsuariosselect==0)
                Swal.fire({
                    text:"No se ha encontrado ningún usuario "+this.criterio+". Intente nuevamente",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                });
              else{
                let nomTU= this.tiposUsuarios.find( tipo_usuario =>  tipo_usuario.id_tipo_usuario==this.tiposUsuariosselect )
                Swal.fire({
                    text:"No se ha encontrado ningún usuario "+this.criterio+" con el tipo de usuario "+ nomTU.nombre +". Intente nuevamente",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
                });
              }
           }
           else{
              let par=res.data.tasks.data;
               this.usuarios=par.sort((a, b) => { return a.nombre.localeCompare(b.nombre);});   
              this.paginate=res.data.paginate; /////paginado
        
          }
                   
        })
        .catch(e => {
          console.log('catc buscar',e);
            // this.hideModal();
          //Swal de problema
           Swal.fire({
                    text:"Estamos teniendo problemas al buscar los usuarios. Vuelve a intentar en unos minutos.",
                    icon:"warning",
                    confirmButtonText: 'Sí',
                    confirmButtonColor:'#0097A7',
                    showConfirmButton: true,
           });

        })
      }
      else{
          //Mensaje informativo de que esta pantalla no es para admin
        //  this.hideModal();
      }


    
    },


    listarTUsuarios(page){
      let obj = {
        usuario: this.$store.state.usuario,
        programa: this.$store.state.programaActual.nombre
      }
      if(this.$store.state.permisosUsuario==null){
        this.axios.post('/usuarios/permisos',obj)
        .then(res=>{
          //Ordenadito
          let par=res.data;     
          this.tiposUsuarios=par.sort((a, b) => { return a.localeCompare(b);});
          this.mispermisos= this.tiposUsuarios;
          // console.log(this.mispermisos);
          if(  this.mispermisos.includes('Tutores') ) this.esAlumno=true;
          if(  this.mispermisos.includes('Sesión de Tutoría') ) this.esTutor =true;
          this.listarCitas(page);
        })
        .catch(e=>{
          console.log('catch Permisos: ',e);           
        });
      }
      else{
          this.mispermisos= this.$store.state.permisosUsuario;
          // console.log(this.mispermisos);
          if(  this.mispermisos.includes('Tutores') ) this.esAlumno=true;
          if(  this.mispermisos.includes('Sesión de Tutoría') ) this.esTutor =true;
          this.listarCitas(page);
      }
      // if(this.esTutor==true || this.esAlumno==true) this.listarCitas();
    },



    showModal() {
      this.$refs['my-modal'].show()
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    handlePeriodChange(periodo) {
            this.periodo = periodo;
        },
    disabledAfterToday(date){
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date > today;
    },
    detalle(indice){
      //Tengo que pasarle cosas
         let cita;
       if(this.esTutor==true){
        cita=this.citasTutor[indice]; 
         this.$store.state.curSesion=null;    
         /*
          cita_x_usuarios: Array(x)
          fecha: (...)
          hora_inicio: (...)
          id_cita: (...)
          id_disponibilidad: 119
          tipo_de_cita: ""
         */
        axios.post('disponibilidades/mostrarCita2', {idDisponibilidad:cita.id_disponibilidad})
            .then((response) => {
                 this.$store.state.curSesion=  response.data;        
           
            }).catch(e => {
                console.log('catch: ',e);
            
            });
          
        
            this.$store.state.citaDatos={
                        props:cita.id_cita,
                        id_disponibilidad:cita.id_disponibilidad,
                        fechaIni:cita.fecha,
                        fechaFin:cita.hora_inicio,
                        id_tutor: this.$store.state.usuario.id_usuario,
                        tttutorSel:null,
                        isGray:false,
                        alumnos:cita.cita_x_usuarios,///////////agregar allow 
                        pantalla:'listado',

            };   
            if(cita.cita_x_usuarios.length>1){ 
              indice=null;
              this.$router.push('/listadocitas/cita-agendada-alumnos');
              // console.log('CitaDatos:', this.$store.state.citaDatos);
              
            }       
            else if(cita.cita_x_usuarios.length==1){ 
              this.$router.push('/listadocitas/cita-agendada');
              
            }       
       }

    }
  }
}
</script>


<style lang="scss" scoped>
@import '../../assets/styles/material.css';

.wide-date-example {
    width: 100% !important;
    outline: none;box-shadow: none;
}

.formUsuario { 
  font-size: 20px;
}

  body{
    background-image: null;
    background-color: #B2EBF2;
  }
  .grid-divider {
  overflow-x: hidden; //quickfix to hide divider on left side
  position: relative;
}
.grid-divider > [class*="col-"]:nth-child(n + 2):after {
  content: "";
  background-color: #BABABA;
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
.button{
    top:0%;
    position:relative
}
.font-weight-bolder {
    color: black;
    font-size: 24px;
    font-family: "Brandon Bold",Helvetica,Arial,sans-serif !important;
}
.botones {
    margin:auto;
    top:0%;
    position:relative
}
.btn {
    padding-left: 20px;
    padding-right: 20px;
    border-radius: 10px;
    margin: 5px;
    top:0%;
    position:relative
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
    text-align: left;
}

.form-control {
    border-radius: 1.25rem;  
    border: 0.5px solid #757575;
    margin-bottom: 10px;
    outline: none;box-shadow: none;
}
.btn:focus {
    outline:none;
    box-shadow: none;
    border: 2.3px solid transparent;
}
select:focus {
    outline:none;
    box-shadow: none;
}
.btn-derecha{
   margin-top: 5px;
}  

.btn:focus {outline: none;box-shadow: none;border:2.3px solid transparent;}
select:focus {outline: none;box-shadow: none;}
input:focus {outline: none;box-shadow: none;}

.contenedor{
    margin-left:40px;
    margin-right:40px;
}
@media screen and (max-width: 600px) {
    
    .contenedor{
        margin-left:20px;
        margin-right:20px;
    }

  }
</style>
