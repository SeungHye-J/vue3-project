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
    <div v-if="!todos.length">
      There is nothing to display
    </div>
    <TodoList 
      :todos="todos" 
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    <!--부트스트랩에서 가져온 pagination-->
    <hr />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li v-if="currentPage !==1" class="page-item">
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage - 1)">Previous</a>
        </li>
        <li 
          v-for="page in numberOfPages"
          :key ="page"
          class="page-item"
          :class = "currentPage === page ? 'active' : ''"
        >
          <a style="cursor: pointer" class="page-link" @click="getTodos(page)">{{page}}</a>
        </li> 
        <li v-if="numberOfPages !== currentPage" class="page-item">
          <a style="cursor: pointer" class="page-link" @click="getTodos(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
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
    const numberOfTodos = ref(0);
    let limit =5;
    const currentPage = ref(1);
    const searchText = ref('');

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value/limit); // 올림으로 계산
    });
    

    const getTodos = async(page = currentPage.value ) => {
      currentPage.value = page;
      try{
        //모든 todos데이터 호출
        const res = await axios.get(
          `http://localhost:3000/todos?subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
          );
        numberOfTodos.value = res.headers['x-total-count'];
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

    const toggleTodo = async (index) => {
      error.value = '';
      const id = todos.value[index].id;
      try{
         await axios.patch('http://localhost:3000/todos/' + id, {
          completed:!todos.value[index].completed
         });
        
        todos.value[index].completed = !todos.value[index].completed;
      }catch(err){
        console.log(err);
        error.value = 'Somthing went wrong.';
      }
      
    };


    // 검색 변화 생길때마다 모든todos에서 검색하여 불러오기 위해 watch속성사용
    watch(searchText, () => {
      getTodos(1); // 항상 1페이지로 보내주기
    });

    // const filteredTodos = computed(()=>{
    //   //검색되어진게 있을 경우
    //   if(searchText.value){
    //     return todos.value.filter(todo=>{
    //       return todo.subject.includes(searchText.value);
    //     });
    //   }
    //   //검색되어진게 없을 경우 모든todos 리턴
    //   return todos.value;
    // });

    return {
       todos,
       addTodo,
       deleteTodo,
       toggleTodo,
       searchText,
      //  filteredTodos,
       error,
       numberOfPages,
       currentPage,
       getTodos,
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