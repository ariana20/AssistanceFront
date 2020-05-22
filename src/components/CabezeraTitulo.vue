<template>
  <div class="CabezeraTitulo jumbotron">
    <div class="wrap"  style="height:300px;"> 
        <h1 class="text_over_image">{{msg}}</h1>
        <img :src="imagePath"  style="max-height:100%;width:100%">



        
        <!--<div class="">
            <table>
            <tbody>
                <tr style="height:30px"></tr>
                <tr>
                    <td style="width:50px"></td>
                    <td><h1>{{msg}}</h1></td>
                    <td style="width:50px"></td>
                </tr>
                <tr style="height:30px"></tr>
            </tbody></table>
        </div>-->
    </div>
  </div>
</template>
<script>
export default {
  name: 'CabezeraTitulo',
  props: {
    msg: String,
    imagePath: String,
  },
}
</script>
<style>
    .jumbotron {
      height: 300px;
      padding: 0em;
      margin: 0em;
      font-family: "Brandon Bold";
    }

    /* Centered text */
    /*.caption {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255,255,255,0.5);
    height: 100px;
    }*/
    .wrap {
      height:auto;
      margin: auto;
      text-align:center;
      position:relative;
    }
    .text_over_image {
      position: absolute;
      margin: auto;
      top: 0;
      left:0;
      right:0;
      bottom:0;
      width: 30%;
      height:120px;
      padding-top: 20px;
      background-color: rgba(255,255,255,0.8);
    }
</style>