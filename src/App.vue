<template>
  <div class="container">
    <h1>To-Do List</h1>
    <input 
      class= "form-control"
      type="text" 
      v-model="searchText"
      placeholder="Serch"
    >
    <hr/>
    <TodoSimpleForm @add-todo="addTodo"/>
    
    <div v-if="!filteredTodos.length">
      There is nothing to display
    </div>
    <TodoList 
      :todos="filteredTodos" 
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    
    
  </div>
</template>

<script>
import { ref, computed } from 'vue';
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
      
      todos.value[index].completed = !todos.value[index].completed;
      
    }

    const deleteTodo = (index) => {
      todos.value.splice(index,1);
    }

    const searchText = ref('');
    const filteredTodos = computed(()=>{
      //검색되어진게 있을 경우
      if(searchText.value){
        return todos.value.filter(todo=>{
          return todo.subject.includes(searchText.value);
        });
      }
      //검색되어진게 없을 경우 모든todos 리턴
      return todos.value;
    });

    return {
       todos,
       addTodo,
       deleteTodo,
       toggleTodo,
       searchText,
       filteredTodos,
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