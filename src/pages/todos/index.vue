<template>
  <div>
    <div class="d-flex justify-content-between mb-3">
      <h2>To-Do List</h2>
      <button 
        class="btn btn-primary"
        @click="moveToCreatePage"
      >
        Create Todo
      </button>
    </div>
    
    <input 
      class= "form-control"
      type="text" 
      v-model="searchText"
      placeholder="Serch"
      @keyup.enter="searchTodo"
    >
    <hr/>
    
    <div v-if="!todos.length">
      There is nothing to display
    </div>
    <TodoList 
      :todos="todos" 
      @toggle-todo="toggleTodo"
      @delete-todo="deleteTodo"
    />
    
    <hr />
    <Pagination 
      v-if="todos.length"
      :numberOfPages = "numberOfPages"
      :currentPage = "currentPage"
      @click="getTodos"
    />
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import TodoList from '@/components/TodoList.vue'
import axios from '@/axios';
import { useToast } from '@/composables/toast';
import { useRouter } from 'vue-router';
import Pagination from '@/components/Pagination.vue';

export default {
  components:{
    TodoList,
    Pagination
  },
  setup() {
   
    const router = useRouter();
    const todos = ref([]);
    const error = ref('');
    const numberOfTodos = ref(0);
    let limit =5;
    const currentPage = ref(1);
    const searchText = ref('');

    const numberOfPages = computed(() => {
      return Math.ceil(numberOfTodos.value/limit); // 올림으로 계산
    });
    
    const {
      showToast,
      toastMessage,
      toastAlertType,
      triggerToast
    } = useToast();


    const getTodos = async(page = currentPage.value ) => {
      currentPage.value = page;
      try{
        //모든 todos데이터 호출
        const res = await axios.get(
          `todos?_sort=id&_order=desc&subject_like=${searchText.value}&_page=${page}&_limit=${limit}`
          );
        numberOfTodos.value = res.headers['x-total-count'];
        todos.value = res.data;
      }catch(err){
        console.log(err);
        triggerToast('Something went wrong' ,'danger');
      }
      
    };

    getTodos();

    const addTodo = async (todo) => {
      error.value = '';
      //데이터베이스에 todo를 저장한 후 Array추가하기
      try{
        await axios.post('todos',{
          subject: todo.subject,
          completed: todo.completed
          //id는 자동으로 생성해줌
        });

        getTodos(1);
      }catch(err){
        console.log(err);
        triggerToast('Something went wrong' ,'danger');
      }
     
    }

    
    const deleteTodo = async (id) => {
      error.value = '';
      
      try{
        await axios.delete('todos/' + id);
       
       getTodos(1);
        
      }catch(err){
        console.log(err);
       triggerToast('Something went wrong' ,'danger');
      }

    };

    const toggleTodo = async (index , checked) => {
      console.log(checked);
      error.value = '';
      const id = todos.value[index].id;
      try{
         await axios.patch('todos/' + id, {
          completed:checked
         });
        
        todos.value[index].completed = checked;
      }catch(err){
        console.log(err);
        triggerToast('Something went wrong' ,'danger');
      }
      
    };

    let timeout = null;
    const searchTodo = () => {
      clearTimeout(timeout);
      getTodos(1); 
    };

    // 검색 변화 생길때마다 모든todos에서 검색하여 불러오기 위해 watch속성사용
    watch(searchText, () => {
      clearTimeout(timeout); //기존에 timeout이 걸려있던 것을 취소해준 후
      //2000 - >2초 후에 코드 실행/ 검색창에 한글자씩 칠 때마다 돌기 때문에timeout걸어줬음
      timeout = setTimeout(() => {
        getTodos(1); // 항상 1페이지로 보내주기
      }, 2000);
     
    });

    const moveToCreatePage = () => {
      router.push({
        name: 'TodoCreate',
      })
    };


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
       searchTodo,
       showToast, 
       toastMessage, 
       toastAlertType, 
       moveToCreatePage,
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