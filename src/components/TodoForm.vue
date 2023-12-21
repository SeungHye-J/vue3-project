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
                <!-- <div calss="form-group">
                    <label>Subject</label>
                    <input 
                      v-model="todo.subject" 
                      type="text" 
                      class="form-control"
                    >
                    <div
                       v-if="subjectError"
                       class="text-red"
                    >
                        {{subjectError}}
                    </div>
                </div> -->
                <Input 
                    label="Subject"
                    v-model:subject="todo.subject"
                    :error="subjectError"
                />
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
            {{ editing ? 'Update' : 'Create' }}
        </button>
        <button 
            class="btn btn-outline-dark ml-2"
            @click="moveToTodoListPage"
        >
            Cancel
        </button>
    </form>
    <transition name="fade">
    <Toast 
        v-if="showToast"
        :message="toastMessage"
        :type="toastAlertType"
    />
    </transition>
</template>

<script>
import { useRoute ,useRouter } from 'vue-router';
import axios from '@/axios';
import { ref,computed } from 'vue'
import _ from 'lodash';
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';
import Input from '@/components/input.vue';

export default {
    components: {
        Toast,
        Input
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
       
        const subjectError = ref('');
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
                const res = await axios.get(`todos/${todoId}`);
                
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
            subjectError.value = '';
            if(!todo.value.subject){
                subjectError.value= 'subject is required';
                return;
            }

            try{
                 let res;
                 const data = {
                     subject : todo.value.subject,
                     completed : todo.value.completed,
                     body: todo.value.body
                 }
                 if(props.editing){ // 수정일때 put으로 보냄
                     res = await axios.put(`todos/${todoId}`, data );
                     originalTodo.value = {...res.data};//DB의 subject

                 }else { // Create 일 경우 post 로 생성 RESTAPI에서 생성
                     res = await axios.post('todos', data );
                     todo.value.subject = '';
                     todo.value.body = '';
                 }

                
                const message = 'Successfully ' + (props.editing ? 'Updated!' : 'Created!');
                triggerToast(message);

                if(!props.editing){
                    router.push({
                        name:'Todos'
                    })
                }

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
            subjectError,
        }
    }
}
</script>

<style scoped> /*scoped - 현재 컴포넌트에만 적용*/ 
   
    .fade-enter-active,
    .fade-leave-active{
        transition: all 0.5s ease; /*투명도 0.5간 점차 진해지면서 살며시*/
    }

    .fade-enter-from,
    .fade-leave-to{
        opacity: 0; /*시작상태 0 끝날때 0 */
        transform: translateY(-30px); /* 30px 위에서 시작*/
    }

    .fade-enter-to,
    .fade-leave-from{ /*0에서 시작후 1로됨 끝날때 1->0 */
        opacity: 1;
        transform: translateY(0px); /*제자리로 */
    }
</style>
<style> /* 글로벌하게 적용 가능 */

</style>