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
    <div>{{ error }}</div>
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

    const addTodo = (todo) => {
      error.value = '';
      //데이터베이스에 todo를 저장한 후 Array추가하기
      axios.post('http://localhost:3000/todos',{
        subject: todo.subject,
        completed: todo.completed
        //id는 자동으로 생성해줌
      }).then(res => {
        //요청을 끝내고 응답이 왔을때 실행되는 부분.
         console.log(res);
        todos.value.push(res.data);
      }).catch(err => {
        //요청이 실패했을경우
         console.log(err);
         error.value = 'Somthing went wrong.';
      });
      //자바스크립트에서 요청이 비동기적으로 일어나게됨. axios post로
      // 요청을 보내고 응답이 오기 전에 그 다음으로 넘어가게됨. 그래서
      //then 키워드를 통해서 요청이 끝났을때,응답이왔을때 실행될 수 있
      //도록 해주어야함.
     
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