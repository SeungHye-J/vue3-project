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
  <Toast 
    v-if="showToast"
    :message="toastMessage"
    :type="toastAlertType"
  />
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

<style>
 
</style>