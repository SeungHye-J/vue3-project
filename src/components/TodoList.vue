<template>
  <!-- <div 
      v-for="(todo,index) in todos"
      :key="todo.id"
      class="card mt-2"
  > -->
  <List
    :items="todos"
  >
    <template #default="{ item,index }">
      <div 
        class="card-body p-2 d-flex align-items-center"
        style="cursor: pointer"
        @click="moveToPage(item.id)"
      >
        <div class="flex-grow-1">
          <input 
             class="ml-2 mr-2"
             type="checkbox"
             :checked="item.completed"
             @change="toggleTodo(index, $event)"
             @click.stop
          >
          <span :class ="{ todo: item.completed }">
            {{ item.subject }}
          </span>
        </div>
        <div>
          <button 
            class="btn btn-danger btn-sm"
            @click.stop="openModal(item.id)"
          >
            Delete
          </button>
        </div>
      </div>
    </template>
  </List>
    <!-- </div> -->
    <teleport to="#modal">
      <Modal 
        v-if="showModal"
        @close="closeModal"
        @delete="deleteTodo"
      />
    </teleport>
    
</template>

<script>
import { useRouter } from 'vue-router';
import Modal from '@/components/DeleteModal.vue';
import { ref } from 'vue';
import List from '@/components/List.vue';
import { getCurrentInstance } from 'vue';
export default {
  components:{
    Modal,
    List
  },
    //App.vue에서 보낸 todos(이름):보내는값의 이름 적어주어 사용하기
    props: {
        todos:{
            type :Array,
            required: true
        }
    },
    emits: ['toggle-todo','delete-todo'], //emit명 배열에 담아서 보내주면 경고사라짐
    setup() { //context - > {emit}
        const { emit } = getCurrentInstance();
        const router = useRouter();
        const showModal = ref(false);
        const todoDeleteId = ref(null);
        const toggleTodo = (index , event) => {
            emit('toggle-todo' , index, event.target.checked);
        }

        //삭제버튼 클릭시 모달창띄우기
        const openModal = (id) => {
            todoDeleteId.value = id;
            showModal.value = true;
        }

        //모달창 닫기
         const closeModal = () => {
            todoDeleteId.value = null;
            showModal.value = false;
        }

        const deleteTodo = () => {
            emit('delete-todo',todoDeleteId.value);

            showModal.value= false;
            todoDeleteId.value = null;
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
            moveToPage,
            showModal,
            openModal,
            closeModal,
        }

    }

}
</script>

<style>

</style>