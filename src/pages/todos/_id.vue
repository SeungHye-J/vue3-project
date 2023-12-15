<template>
    <h1>To-Do Page</h1>
    <div v-if="loading">
        Loading...
    </div>
    <form
        v-else
        @submit.prevent="onSave"
    >
        <div class="row  mb-2">
            <div class="col-6">
                <div calss="form-group">
                    <label>Subject</label>
                    <input 
                      v-model="todo.subject" 
                      type="text" 
                      class="form-control"
                    >
                </div>
            </div>
            <div class="col-6">
                 <div calss="form-group">
                    <label>Status</label>
                    <div>
                        <button 
                          class="btn"
                          type="button"
                          :class="todo.completed ? 'btn-success' : 'btn-danger'"
                          @click="toggleTodoStatus"
                        >
                            {{ todo.completed ? 'Completed' : 'Incomplete' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
       
        <button 
          type="submit" 
          class="btn btn-primary"
          :disabled="!todoUpdated"
        >
            Save
        </button>
        <button 
            class="btn btn-outline-dark ml-2"
            @click="moveToTodoListPage"
        >
            Cancel
        </button>
    </form>
    <Toast 
        v-if="showToast"
        :message="toastMessage"
        :type="toastAlertType"
    />
</template>

<script>
import { useRoute ,useRouter } from 'vue-router';
import axios from 'axios';
import { ref,computed, onUnmounted } from 'vue'
import _ from 'lodash';
import Toast from '@/components/Toast.vue';

export default {
    components: {
        Toast
    },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const todo = ref(null);
        const originalTodo = ref(null);
        const loading = ref(true);
        const showToast = ref(false);
        const toastMessage = ref('');
        const toastAlertType = ref('');
        const timeout = ref(null);
        const todoId = route.params.id;

        onUnmounted(()=> {
           clearTimeout(timeout.value);
           //페이지나가면 타임아웃 메모리 정리해주기
        });

        const getTodo = async () => {
            try{
                const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
                
                todo.value = {...res.data }; //새로운 객체주소로 만들어주기 그냥 res.data를 적어주면 originalTodo와 같은 주소값을 가지기때문
                originalTodo.value =  {...res.data };

                loading.value = false;

            }catch(error){
                console.log(error);
                triggerToast('Something went wrong','danger');
            }
           
        };

        const todoUpdated = computed(()=> {
            return !_.isEqual(todo.value , originalTodo.value)
        })

        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        };

        const moveToTodoListPage = () => {
            router.push({
                name: 'Todos'
            })
        }

        getTodo();

        const triggerToast = (message ,type= 'success') => {
            toastMessage.value = message;
            toastAlertType.value = type;
            showToast.value = true;
            timeout.value = setTimeout(() => { //메모리에 계속 담겨있기 때문에 페이지 나가면 없애줘야함->onUnmount
                toastMessage.value = '';
                toastAlertType.value = '';
                showToast.value = false;
            },3000)
        };

        const onSave = async () => {
            try{
                const res = await axios.put(`http://localhost:3000/todos/${todoId}` , {
                    subject : todo.value.subject,
                    completed : todo.value.completed
                });

                originalTodo.value = {...res.data};
                triggerToast('Successfully saved!');

            }catch(error){
                console.log(error);
                triggerToast('Something went wrong' ,'danger');
            }
            
        };

        return {
            todo,
            loading,
            todoUpdated,
            toggleTodoStatus,
            moveToTodoListPage,
            onSave,
            showToast,
            toastMessage,
            toastAlertType,
        }
    }
}
</script> 

<style>

</style>