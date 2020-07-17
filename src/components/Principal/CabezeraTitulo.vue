<template>
  <div class="CabezeraTitulo jumbotron">
    <div class="wrap"  style="height:100%"> 
        <div class="margs">
          <div style=";display: inline-block;width: 60%;background-color: rgba(255,255,255,0.8);">
            <section class="content text_over_image">
              {{msg}}
            </section>
          </div>
        </div>
        <img :src="imagePath"  style="max-height:100%;width:100%">
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
      height: 30vh;
      padding: 0em;
      margin: 0em;
      font-family: "Brandon Bold";
      margin-bottom: 2%;
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
      padding-top: 4%;
      padding-bottom: 4%;
      font-size: 4vw;
    }

    section.content {
      flex: 2;
    }

    .margs{
      position: absolute;
      margin-top:3%;
      text-align:center;
      width:100%
    }
@media screen and (max-width: 1100px){
  .margs{
    margin-top: 5%;
  }
  .jumbotron {
    height: 20vh;
  }
}

@media screen and (max-width: 759px){
  .margs{
    margin-top: 8%;
  }
  .jumbotron {
    height: 10vh;
  }
}
</style>