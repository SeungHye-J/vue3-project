import { createRouter,createWebHistory } from 'vue-router';
import Home from '../pages/index.vue';
import Todos from '../pages/todos/index.vue';
import Todo from '../pages/todos/_id.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', //url
            name: 'Home',
            component: Home
        },//하나의 객체가 하나의 라우트
        {
            path: '/todos',
            name: 'Todos',
            component: Todos
        },
        {
            path: '/todos/:id',
            name: 'Todo',
            component: Todo
        }
    ] //url 정보가 들어가게됨
});

//1. /home , 2. /todos , 3. /todos/create , 4. /todos/:id
export default router;