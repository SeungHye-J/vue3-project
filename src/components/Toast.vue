<template>
    <div class="toast-box">
        <transition-group name="slide">
            <div 
                v-for="toast in toasts"
                :key="toast.id"
                class="alert" 
                :class="`alert-${toast.type}`"
                role="alert"
            >
            {{toast.message}}
            </div>
        </transition-group>
    </div> 
</template>

<script>
import { useToast } from '@/composables/toast';
export default {
   setup(){
        const { toasts } = useToast();

        return {
            toasts
        }
   }
}
</script>

<style scoped>
    .toast-box {
        position: fixed;
        top: 10px;
        right: 10px;
    }

    .slide-enter-active,
    .slide-leave-active{
        transition: all 0.5s ease; /*투명도 0.5간 점차 진해지면서 살며시*/
    }

    .slide-enter-from,
    .slide-leave-to{
        opacity: 0; /*시작상태 0 끝날때 0 */
        transform: translateY(-30px); /* 30px 위에서 시작*/
    }

    .slide-enter-to,
    .slide-leave-from{ /*0에서 시작후 1로됨 끝날때 1->0 */
        opacity: 1;
        transform: translateY(0px); /*제자리로 */
    }
</style>