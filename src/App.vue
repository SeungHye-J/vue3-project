<template>
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
        <div class="form-check">
          <input 
             class="form-check-input" 
             type="checkbox"
             v-model="todo.completed"
          >
          <label  
              class="form-check-label" 
          >
            {{ todo.subject }}
          </label>
        </div>
       
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
    const todos = ref([]);

    const hasError = ref(false);

    const onSubmit = () => {
   //   e.preventDefault();//리로딩방지

      if(todo.value == ''){
          hasError.value = true;
      }else{
        todos.value.push({
          id: Date.now(),
          subject: todo.value,
          completed: true,
        });
        hasError.value = false;
        todo.value='';
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