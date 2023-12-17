<template>
  <div 
      v-for="(todo,index) in todos"
      :key="todo.id"
      class="card mt-2"
  >
      <div 
        class="card-body p-2 d-flex align-items-center"
        style="cursor: pointer"
        @click="moveToPage(todo.id)"
      >
        <div class="flex-grow-1">
          <input 
             class="ml-2 mr-2"
             type="checkbox"
             :checked="todo.completed"
             @change="toggleTodo(index, $event)"
             @click.stop
          >
          <span :class ="{ todo: todo.completed }">
            {{ todo.subject }}
          </span>
        </div>
        <div>
          <button 
            class="btn btn-danger btn-sm"
            @click.stop="deleteTodo(index)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
    //App.vue에서 보낸 todos(이름):보내는값의 이름 적어주어 사용하기
    props: {
        todos:{
            type :Array,
            required: true
        }
    },
    emits: ['toggle-todo','delete-todo'], //emit명 배열에 담아서 보내주면 경고사라짐
    setup(props,{emit}) { //context - > {emit}
        const router = useRouter();
        const toggleTodo = (index , event) => {
            emit('toggle-todo' , index, event.target.checked);
        }

        const deleteTodo = (index) => {
            emit('delete-todo',index);
        }

        const moveToPage = (todoId) => {
          console.log(todoId);
          //페이지이동방법1
          // router.push('/todos/' +todoId); // 원하는페이지로 보내줌
          //페이지이동방법2
          router.push({
            name: 'Todo',
            params: {
              id: todoId
            }
          })
        }

        return {
            toggleTodo,
            deleteTodo,
            moveToPage
        }

    }

}
</script>

<style>

</style>