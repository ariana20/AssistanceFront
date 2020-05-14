<template>
  <div class="ViewTiposTutoria">
    <TiposTutoria/>
  </div>
</template>

<script>
// @ is an alias to /src
import TiposTutoria from '@/components/TiposTutoria.vue'
// Solo llamo al componente, pero es personalizable aquí
export default {
  name: 'ViewTiposTutoria',
  components: {
    TiposTutoria
  }
}
</script>
