<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <!--리로딩 없이 하기위해 a,href -> router-link,to 를 사용함 -->
    <router-link class="navbar-brand" to="/">
      무럭무럭 나무
    </router-link>

    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" to="/todos">
          Todos
        </router-link>
      </li>
    </ul>
  </nav>

  <router-view/>
</template>

<script>
export default {
}
</script>

<style>
 
</style>