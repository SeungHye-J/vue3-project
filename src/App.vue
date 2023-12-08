<template>
<!-- v-bind: => : 동일 
      v-on:  => @ 동일
-->
  <div :class="nameClass">
    {{ name }}
  </div> 
  <input :type="type" :value="name">
  <button 
    class="btn btn-primary"
    @click="updateName"
  >
    Click
  </button> 
</template>

<script>
import { ref } from 'vue';

export default {
  
  setup() {
   
    const name = ref('무럭나무'); 
    const type = ref('number');
    const nameClass = ref('');

    const updateName = () => {
      name.value = '무럭무럭나무';
      type.value = 'text';
      nameClass.value = 'name';
    }

    return {
       name,
       type,
       updateName,
       nameClass
    };
  }

}
</script>

<style>
 .name {
  color : red;
 }
</style>