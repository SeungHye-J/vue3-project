import { createStore } from 'vuex';
import modules from './modules';
//vuex state는 vue.js 앱 안에 있는 어떤 컴포넌트에서든지 접근이 가능한 state를 관리하는 툴
export default createStore({
    //관련된 것을 폴더처럼 묶어줄 수 있음.
    modules //앞과 뒤 같으면 생략가능  modules: modules 
})