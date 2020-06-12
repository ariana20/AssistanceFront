<template>
  <div class="CabezeraTitulo jumbotron">
    <div class="wrap"  style="height:100%"> 
        <div style="position: absolute;margin-top:3%;text-align:center;width:100%">
          <div style=";display: inline-block;width: 60%;background-color: rgba(255,255,255,0.8);">
            <section class="content text_over_image">
              {{msg}}
            </section>
          </div>
        </div>
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
      height:100%;
      width: 100%;
      padding-top: 20px;
      padding-bottom: 20px;
      font-size: 4vw;
    }

    section.content {
      flex: 2;
    }
</style>