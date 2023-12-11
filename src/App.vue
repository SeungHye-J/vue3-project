<template>
  <div class="container">
    <h4>count: {{ count }}</h4>
    <!--computed는 캐시되어지기 때문에 콘솔에 한번만 찍힘-->
    <h4>double count computed: {{ doubleCountComputed }}</h4>
    <h4>double count computed: {{ doubleCountComputed }}</h4>
     <!--method는 갯수만큼 함수를 돌리기때문에 2번 콘솔에 찍힘-->
    <h4>double count method: {{ doubleCountMethod() }}</h4>
    <h4>double count method: {{ doubleCountMethod() }}</h4>
    <button @click="count++">Add One</button>
    <h1>To-Do List</h1>
    <TodoSimpleForm @add-todo="addTodo"/>
    
    <div v-if="!todos.length">
      추가된 Todo가 없습니다.
    </div>
    <!--자식으로 값(todos) 보내주기-->
    <TodoList 
      :todos="todos" 
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

    const count = ref(1);
    const doubleCountComputed = computed(() => {
      console.log('computed');
      return count.value * 2;
    });

    const doubleCountMethod = () => {
       console.log('method');
      return count.value * 2;
    };

    return {
       todos,
       addTodo,
       deleteTodo,
       toggleTodo,
       count,
       doubleCountComputed,
       doubleCountMethod,
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