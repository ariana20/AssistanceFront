<template>
  <div class="CabezeraTitulo">
    <div class="container">
        <img src="../assets/coffee.jpg" height="200px" width="1325px" >
        <div class="centered">
            <table>
            <tbody>
                <tr style="height:30px"></tr>
                <tr>
                    <td style="width:50px"></td>
                    <td><h1>{{msg}}</h1></td>
                    <td style="width:50px"></td>
                </tr>
                <tr style="height:30px"></tr>
            </tbody></table></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CabezeraTitulo',
  props: {
    msg: String
  },
}
</script>
<style>
    .container {
    position: relative;
    text-align: center;
    color: black;
    }

    /* Centered text */
    .centered {
    position: absolute;
    top: 50%;
    left: 60%;
    transform: translate(-50%, -50%);
    background-color: rgba(255,255,255,0.5);
    }
</style>