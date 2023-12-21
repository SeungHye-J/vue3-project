import { createStore } from 'vuex';

//vuex state는 vue.js 앱 안에 있는 어떤 컴포넌트에서든지 접근이 가능하다.
export default createStore({
    state: {
         toastMessage: '',
         toastAlertType: '',
         showToast: false,
         timeout: null
    }
})