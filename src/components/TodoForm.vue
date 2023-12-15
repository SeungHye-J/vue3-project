<template>
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
            <div v-if="editing" class="col-6">
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

             <div class="col-12">
                 <div calss="form-group">
                    <label>Body</label>
                    <textarea v-model="todo.body" class="form-control" cols="30" row="10">

                    </textarea>
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
import { ref,computed } from 'vue'
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';

export default {
    components: {
        Toast
    },
    props:{
        editing:{
            type: Boolean,
            default: false,
            body: ''
        }
    },
    setup(props) {
        const route = useRoute();
        const router = useRouter();
        const todo = ref({
            subject: '',
            completed: false
        });
        const originalTodo = ref(null);
        const loading = ref(false);
        const todoId = route.params.id;

        const {
            showToast,
            toastMessage,
            toastAlertType,
            triggerToast
        } = useToast();

        const getTodo = async () => {
            loading.value=true;
            try{
                const res = await axios.get(`http://localhost:3000/todos/${todoId}`);
                
                todo.value = {...res.data }; //새로운 객체주소로 만들어주기 그냥 res.data를 적어주면 originalTodo와 같은 주소값을 가지기때문
                originalTodo.value =  {...res.data };

                loading.value = false;

            }catch(error){
                loading.value = false;
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

        if(props.editing){
            getTodo();
        }
       

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