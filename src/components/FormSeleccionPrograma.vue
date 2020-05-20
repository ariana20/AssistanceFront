<template>
    <div name="Seleccion" style="margin-top: 120px">
        <div id="app" class="container">
            <card data-image="https://i.pinimg.com/originals/a8/04/d4/a804d4a2a97e4322d9a3d4bee8599731.jpg">
                <h1 slot="header">Quimica</h1>
                <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </card>
            <card data-image="https://i.pinimg.com/originals/06/55/80/065580938b36e4c049ec033745248216.jpg">
                <h1 slot="header">Industrial</h1>
                <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </card>
            <card data-image="https://image.winudf.com/v2/image1/Y29tLm1vdmluZy53YWxscGFwZXJzLmdyZWVuLmxpdmUud2FsbHBhcGVyX3NjcmVlbl8xMl8xNTU3NzQ3Njg2XzA5MA/screen-12.jpg?fakeurl=1&type=.jpg">
                <h1 slot="header">Informatica</h1>
                <p slot="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            </card>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import card from '@/components/Card.vue'
// Solo llamo al componente, pero es personalizable aquí
export default {
  name: 'FormSeleccionPrograma',
  components: {
    card
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../assets/styles/seleccion.scss';
</style>