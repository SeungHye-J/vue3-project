<template>
  <div 
      v-for="(todo,index) in todos"
      :key="todo.id"
      class="card mt-2"
  >
      <div class="card-body p-2 d-flex align-items-center">
        <div class="form-check flex-grow-1">
          <input 
             class="form-check-input" 
             type="checkbox"
             v-model="todo.completed"
          >
          <label  
              class="form-check-label"
              :class ="{ todo: todo.completed }"
          >
            {{ todo.subject }}
          </label>
        </div>
        <div>
          <button 
            class="btn btn-danger btn-sm"
            @click="deleteTodo(index)"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
</template>

<script>
export default {
    //App.vue에서 보낸 todos(이름):보내는값의 이름 적어주어 사용하기
    props: {
        todos:{
            type :Array,
            required: true
        }
    }
}
</script>

<style>

</style>