import { reactive, toRefs } from 'vue';

export const useCount = () => {
    const state = reactive({
        count:0  // count는 리액티브하지 않음 toRefs를사용하여 리액티브하게 만든다
    });

    return toRefs(state);
}

//export를 하여 다른곳에서 import를 하여 사용할 수있다
//함수를 export할 때 {} 중괄호로 import해야하고,
//export default userCount~~ 하면 import 시 중괄호 없이 바로 import하면 됨