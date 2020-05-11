<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-sm-9 col-md-7 col-lg-10 mx-auto">
                <div class="card card-signin my-5">
                    <div class="card-header card-title text-center">Sistema de Tutorias</div>

                    <div class="card-body">
                        <div class="row">
                            <div class="col-sm">
                                <form class="form-signin"><!--  -->
            
                                    <div class="form-label-group">
                                            <input v-model="fields.email" id="email" type="email" style ='background-color: #B2EBF2' placeholder="Email address" class="form-control" name="email" required autocomplete="email" autofocus>
                                            <label for="email">Email</label>
                                            <span v-if="sub!==null && email===null" class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                    </div>
            
                                    <div class="form-label-group">
                                            <input v-model="fields.password" id="password" placeholder="Password" style ='background-color: #B2EBF2' type="password" class="form-control" name="password" required autocomplete="current-password">
                                            <label for="password">Contraseña</label>
                                            <span v-if="sub!==null && password===null" class="invalid-feedback" role="alert">
                                                <strong>{{ $message }}</strong>
                                            </span>
                                    </div>
            
                                    <button v-on:click="login()" style="margin-bottom: 20px;background-color: #009688" class="btn btn-lg btn-primary btn-block text-uppercase">
                                        Ingresar
                                    </button>
                                    <hr class="mx-6">
                                    <a href="http://127.0.0.1:8000/auth/google" style="margin-top: 20px;" class="btn btn-lg btn-google btn-block">
                                        <strong>Ingresar con Google</strong>
                                    </a>
            
                                    <div class="form-group row mb-3">
                                        <div class="col-md-8 offset-md-2">
                                            <a class="btn btn-link" href="#">
                                                Olvido su contraseña?
                                            </a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div class="seperator"></div>
                            <div class="col-sm">
                                <form class="margin-r form-signin ">
                                    <h4>Todavía no esta registrado?</h4>
                                    <br>
                                    El sistema de tutorías esta más que feliz de poder aceptar a todos los estudiantes. Crea tu cuenta para poder acceder a todos los servicios.
                                    <a href="#" style="margin-top: 20px;background-color: #009688" class="btn btn-lg btn-primary btn-block text-uppercase">
                                        Registrarse
                                    </a>
                                </form>
                            </div>
                        </div>                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return{
            email: null,
            password: null,
            sub: null,
            fields:{},
            user:null
        }
    },
    methods: {
        login(){
        axios
            .post('http://127.0.0.1:8000/login',this.fields)
            .catch( e=>console.log(e))
        },
        usuario(){
            axios
                .get('http://127.0.0.1:8000/api/auth')
                .then( response=>{
                    this.user = response.data
                })
                .catch( e=>console.log(e))
        }
    }
}
</script>

<style>
        :root {
        --input-padding-x: 1.5rem;
        --input-padding-y: .75rem;
        }
        .seperator {
        height: 70%;
        width: 1px;
        background: black;
        top: 20%;
        bottom: 10%;
        position: absolute;
        left: 50%;
        }

        .border-custom {
        border-left-style: solid;
        border-left-color: #757575;
        text-align: center;
        }

        body {
        background: #FFFFFF;
        }

        .card-signin {
        background: #B2EBF2;    
        border: 0;
        border-radius: 1rem;
        box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
        }

        .card-signin .card-title {
        margin-bottom: 2rem;
        font-weight: 300;
        font-size: 1.5rem;
        }

        .card-signin .card-body {
        padding: 2rem;
        }

        .form-signin {
        width: 90%;
        }

        .margin-r {
            margin-left: 2rem;
        }


        .form-signin .btn {
        font-size: 80%;
        border-radius: 5rem;
        letter-spacing: .1rem;
        font-weight: bold;
        padding: 1rem;
        transition: all 0.2s;
        }

        .form-label-group {
        position: relative;
        margin-bottom: 1rem;
        }

        .form-label-group input {
        height: auto;
        border-radius: 2rem;
        background: #B2EBF2; 
        border-color: #757575;
        }

        .form-label-group>input,
        .form-label-group>label {
        padding: var(--input-padding-y) var(--input-padding-x);
        }

        .form-label-group>label {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        margin-bottom: 0;
        /* Override default `<label>` margin */
        line-height: 1.5;
        color: #495057;
        border: 1px solid transparent;
        border-radius: .25rem;
        transition: all .1s ease-in-out;
        }

        .form-label-group input::-webkit-input-placeholder {
        color: transparent;
        }

        .form-label-group input:-ms-input-placeholder {
        color: transparent;
        }

        .form-label-group input::-ms-input-placeholder {
        color: transparent;
        }

        .form-label-group input::-moz-placeholder {
        color: transparent;
        }

        .form-label-group input::placeholder {
        color: transparent;
        }

        .form-label-group input:not(:placeholder-shown) {
        padding-top: calc(var(--input-padding-y) + var(--input-padding-y) * (2 / 3));
        padding-bottom: calc(var(--input-padding-y) / 3);
        }

        .form-label-group input:not(:placeholder-shown)~label {
        padding-top: calc(var(--input-padding-y) / 3);
        padding-bottom: calc(var(--input-padding-y) / 3);
        font-size: 12px;
        color: #777;
        }

        .btn-google {
        color: white;
        background-color: #009688;
        }


        /* Fallback for Edge
        -------------------------------------------------- */

        @supports (-ms-ime-align: auto) {
        .form-label-group>label {
            display: none;
        }
        .form-label-group input::-ms-input-placeholder {
            color: #777;
        }
        }

        /* Fallback for IE
        -------------------------------------------------- */

        @media all and (-ms-high-contrast: none),
            (-ms-high-contrast: active) {
            .form-label-group>label {
                display: none;
            }
            .form-label-group input:-ms-input-placeholder {
                color: #777;
            }
        }
        
        @media only screen and (max-width: 800px) {
            .seperator {
            margin-top: 10px;
            margin-bottom: 10px;
            height: 1px;
            width: 80%;
            background: black;
            top: 65%;
            bottom: 10%;
            position: absolute;
            left: 10%;
            }
            .form-signin .btn {
                margin-top: 20px;
            }  
        }
    </style>