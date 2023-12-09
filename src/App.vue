<template>
  <div class="container">
    <h1>To-Do List</h1>
    <TodoSimpleForm @add-todo="addTodo"/>
    
    <div v-if="!todos.length">
      추가된 Todo가 없습니다.
    </div>
    <!--자식으로 값(todos) 보내주기-->
    <TodoList :todos="todos" @toggle-todo="toggleTodo" />
    
    
  </div>
</template>

<script>
import { ref } from 'vue';
import TodoSimpleForm from './components/TodoSimpleForm.vue';
import TodoList from './components/TodoList.vue'

export default {
  components:{
    TodoSimpleForm,
    TodoList,
  },
  setup() {
   
    const todos = ref([]);

    const addTodo = (todo) => {
     
      todos.value.push(todo);
     
    }

    const toggleTodo = (index) => {
      console.log(todos.value[index])
      todos.value[index].completed = !todos.value[index].completed;
      console.log(+todos.value[index])
    }

    const deleteTodo = (index) => {
      todos.value.splice(index,1);
    }

    return {
       todos,
       addTodo,
       deleteTodo,
       toggleTodo,
    };
  }

}
</script>

<style>
 .todo {
  color : gray;
  text-decoration: line-through;
 }
</style>