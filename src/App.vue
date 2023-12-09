<template>
  <!-- 
    <div v-if="toggle">true</div>
    <div v-else>false</div>
    <div v-show="toggle">true</div>
    <div v-show="!toggle">false</div> 
  -->
  <button @click="onToggle">Toggle</button>
  <div class="container">
    <h1>To-Do List</h1>
    <form @submit.prevent="onSubmit">
      <div class ="d-flex">
        <div class="flex-grow-1 mr-2">
          <input 
            class= "form-control"
            type="text" 
            v-model="todo"
            placeholder="Type new to-do"
          >
        </div>
        <div>
          <button 
            class="btn btn-primary"
            type="submit"
          >
            Add
          </button> 
        </div>
      </div>
      <div v-show="hasError" style="color: red">
        This field cannot be empty
      </div>
    </form>
    <!--v-for 반복문 돌려줌. v-for: " 아무거나 in 반복할Array " :key: 유니크키 (필수임) -->
    <div 
      v-for="todo in todos"
      :key="todo.id"
      class="card mt-2"
    >
      <div class="card-body p-2">
        {{ todo.subject }}
      </div>
    </div>
    
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  
  setup() {
   
    const toggle = ref(false);
    const todo = ref('');
    const todos = ref([
      {id: 1 , subject: '휴대폰 사기'},
      {id: 2 , subject: '장보기'}
    ]);

    const hasError = ref(false);

    const onSubmit = () => {
   //   e.preventDefault();//리로딩방지

      if(todo.value == ''){
          hasError.value = true;
      }else{
        todos.value.push({
          id: Date.now(),
          subject: todo.value
        });
        hasError.value = false;
      }
     
    }

    const onToggle =() =>{
      toggle.value = !toggle.value;
    }

    return {
       todo,
       todos,
       onSubmit,
       toggle,
       onToggle,
       hasError,
    };
  }

}
</script>

<style>
 .name {
  color : red;
 }
</style>