import { computed, onUnmounted } from 'vue';
import {useStore } from 'vuex';
export const useToast = () => {

    const store = useStore();
    const showToast = computed(() => store.state.showToast);
    const toastMessage = computed(() => store.state.toastMessage);
    const toastAlertType = computed(() => store.state.toastAlertType);
    const timeout = computed(() => store.state.timeout);
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
    
    onUnmounted(()=> {
        clearTimeout(timeout.value);
        //페이지나가면 타임아웃 메모리 정리해주기
     });

    return {
        showToast,
        toastMessage,
        toastAlertType,
        triggerToast,
    }

}