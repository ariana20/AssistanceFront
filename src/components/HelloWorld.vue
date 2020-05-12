<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div class="gridwrapper" style="height:650px;">
      <div class="gridcontent" style=";border:none;width:25%;padding-top:15px;">
        <div style="border:none;width:100%;height:15%;margin-bottom:10px;"></div>
        <div style="border:none;width:100%;height:15%;margin-bottom:10px;"></div>
        <div style="border:none;width:100%;height:15%;margin-bottom:10px;"></div>
        <div style="border:none;width:100%;height:15%;"></div>
      </div>
      <div class="gridcontent" style="border:none;"></div>
      <div class="gridcontent" style="border:none;"></div>
      <div class="gridcontent" style="border:none;"></div>
      <div class="gridcontent" style="border:none;"></div>
      <div class="gridcontent" style="border:none;"></div>
      <div class="gridcontent" style="border:none;width:25%;padding-top:15px;">
          <a href="#"  class="btn btn-lg btn-google btn-block acustom">
              <strong>Ingresar</strong>
          </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
        body{
        background-image: url('../assets/mainPage.png');
        background-position: center center;
        background-attachment: fixed;
        background-color: transparent;
        background-size: cover;
        background-repeat: no-repeat;
        background-color: #B2EBF2;
        }
        .gridwrapper {
        overflow: auto;
        position: relative;
        height: 100%;
        }

        .gridcontent {
        width: 8.33%;
        margin: 0;
        border-right: 1px solid grey;
        height: 100%;
        float: left;
        background-color: transparent;
        }
        .acustom{
            margin-top: 300px;
        }
        @media only screen and (max-width: 1000px) and (min-width: 801px){
            body { 
                background-image: url('/images/mainPage.png'); 
                background-position: top;
                background-attachment: fixed;
                background-color: transparent;
                background-size: contain;
                background-repeat: no-repeat;
                background-color: #009688;
            }     
            .acustom{
                margin-top: 220px;
                font-size: 0.8em;
            }      
        }
        @media only screen and (max-width: 800px) and (min-width: 661px){
            body { 
                background-image: url('/images/mainPage.png'); 
                background-position: top;
                background-attachment: fixed;
                background-color: transparent;
                background-size: contain;
                background-repeat: no-repeat;
                background-color: #009688;
            }     
            .acustom{
                margin-top: 160px;
                font-size: 0.8em;
            }      
        }
        @media only screen and (max-width: 660px) and (min-width: 581px){
            body { 
                background-image: url('/images/mainPage.png'); 
                background-position: top;
                background-attachment: fixed;
                background-color: transparent;
                background-size: contain;
                background-repeat: no-repeat;
                background-color: #009688;
            }     
            .acustom{
                margin-top: 120px;
                font-size: 0.8em;
            }      
        }
        @media only screen and (max-width: 580px) {
            body { 
                background-image: url('/images/mainPage.png'); 
                background-position: top;
                background-attachment: fixed;
                background-color: transparent;
                background-size: contain;
                background-repeat: no-repeat;
                background-color: #009688;
            }     
            .acustom{
                margin-top: 100px;
                font-size: 0.8em;
            }      
        }
        .btn-google {
        color: white;
        background-color: #0097A7;
        margin-left: 2rem;
        }
    </style>
