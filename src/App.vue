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
    <div style="color:red">{{ error }}</div>
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
import axios from 'axios';

export default {
  components:{
    TodoSimpleForm,
    TodoList,
  },
  setup() {
   
    const todos = ref([]);
    const error = ref('');

    const getTodos = async() => {
      try{
        const res = await axios.get('http://localhost:3000/todos');//모든 todos데이터 호출
        todos.value = res.data;
      }catch(err){
        console.log(err);
      }
      
    };

    getTodos();

    const addTodo = async (todo) => {
      error.value = '';
      //데이터베이스에 todo를 저장한 후 Array추가하기
      try{
        const res = await axios.post('http://localhost:3000/todos',{
          subject: todo.subject,
          completed: todo.completed
          //id는 자동으로 생성해줌
        });
        todos.value.push(res.data);
      }catch(err){
        console.log(err);
        error.value = 'Somthing went wrong.';
      }
     
    }

    const toggleTodo = (index) => {
      
      todos.value[index].completed = !todos.value[index].completed;
      
    }

    const deleteTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try{
        await axios.delete('http://localhost:3000/todos/' + id);
        
        todos.value.splice(index,1);
      }catch(err){
        console.log(err);
        error.value = 'Somthing went wrong.';
      }

    };

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
       error,
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