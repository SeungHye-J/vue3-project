export default{
   namespaced:true,
   state: {
    toasts: [],
        // toastMessage: '',
        // toastAlertType: '',
        // showToast: false,
   },
   mutations:{//state를 변경하기 위한 곳. 동기적
    //    UPDATE_TOAST_MESSAGE (state, payload) {
    //        state.toastMessage = payload;
    //    },
    //    UPDATE_TOAST_ALERT_TYPE (state, payload) {
    //        state.toastAlertType = payload;
    //    },
    //    UPDATE_TOAST_STATUS (state, payload) {
    //        state.showToast = payload;
    //    },
       ADD_TOAST(state, payload) {
            state.toasts.push(payload);
       },
       REMOVE_TOAST(state) {
            state.toasts.shift();
       }
   },
   actions: { //함수는 actiond에서
        triggerToast({commit}, message , type= 'success') {
        //    commit('UPDATE_TOAST_MESSAGE', message)
        //    commit('UPDATE_TOAST_ALERT_TYPE', type)
        //    commit('UPDATE_TOAST_STATUS', true)

            commit('ADD_TOAST',{
                id: Date.now(),
                message,
                type,
            })
           setTimeout(() => { //메모리에 계속 담겨있기 때문에 페이지 나가면 없애줘야함->onUnmount
            //    commit('UPDATE_TOAST_MESSAGE', '')
            //    commit('UPDATE_TOAST_ALERT_TYPE', '')
            //    commit('UPDATE_TOAST_STATUS', false)
                commit('REMOVE_TOAST')
           },10000)

       }
   },
   getters: { // computed와 같은 역할
       toastMessageWithSmile (state) {
           return state.toastMessage + '^^';
       }
   }
}