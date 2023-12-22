<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!--리로딩 없이 하기위해 a,href -> router-link,to 를 사용함 -->
    <router-link class="navbar-brand" :to="{ name: 'Home' }">
      무럭무럭 나무
    </router-link>

    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" :to="{ name:'Todos'}">
          Todos
        </router-link>
      </li>
    </ul>
  </nav>
  <div class="container">
    <router-view/>
  </div>
  <transition name="slide">
  <Toast 
    v-if="showToast"
    :message="toastMessage"
    :type="toastAlertType"
  />
  </transition>
</template>

<script>
import Toast from '@/components/Toast.vue';
import { useToast } from '@/composables/toast';

export default {
  components: {
    Toast
  },
  setup(){
     const {
            showToast,
            toastMessage,
            toastAlertType,
            triggerToast
        } = useToast();

        return {
           showToast,
           toastMessage,
           toastAlertType,
           triggerToast
        }
  }
}
</script>

<style scoped>
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