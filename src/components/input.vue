<template>
    <div calss="form-group">
        <label> {{ label }} </label>
        <input 
            :value="subject" 
            @input="onInput"
            type="text" 
            class="form-control"
        >
        <div
            v-if="error"
            class="text-red"
        >
            {{ error }}
        </div>
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue'
export default {
    props: {
        label:{
            type: String,
            required: true
        },
        error:{
            type: String,
            required: true
        },
        subject:{
            type: String,
            required: true
        }
    },
    setup() {
        const { emit } = getCurrentInstance();
        const onInput = (e) => {
            //emit을 통해 부모 컴포넌트로 보내주기
            //v-model 시 한개일 경우,이름 안적어줄 경우 modelValue 라고 이름 적어주기props도
            emit('update:subject' ,e.target.value );
        }

        return {
            onInput
        }
    }

}
</script>

<style scoped>
    .text-red {
        color:red;
    }

</style>