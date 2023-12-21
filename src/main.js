import { createApp } from 'vue' //vue에서 createApp 함수를 가져와서
import App from './App.vue'  //최상위 컴포넌트를 App에 넣어주고
import router from './router';
import store from './store';

createApp(App).use(store).use(router).mount('#app') //최상위 컴포넌트를 id가 app인 곳에 넣어주는 것임.
//app컴포넌트 안에는 무엇이 있을까?? App.vue로 가기
