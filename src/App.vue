<template>
  <input 
    type="text" 
    :value="name"
    @input="updateName"
  >
  <button 
    class="btn btn-primary"
    @click="onSubmit"
  >
    Click
  </button> 
</template>

<script>
import { ref } from 'vue';

export default {
  
  setup() {
   
    const name = ref('무럭나무'); 

    const updateName = (e) => { //e -> 이벤트객체
     console.log(e.target.value);
     name.value = e.target.value;
     console.log("name = > "+ name.value);
    }

    const onSubmit = () => {
     console.log(name.value);
    }

    return {
       name,
       onSubmit,
       updateName
    };
  }

}
</script>

<style>
 .name {
  color : red;
 }
</style>