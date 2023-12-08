
<!--하나의 엘리멘트로 감싸줘야 코드가 작동하였음..-->
<template>
  <div class="name">
    {{ name }}
  <!-- {{ great }} -->
    <!-- {{ greeting(name) }} -->
    <!-- {{ greeting('무럭무럭나무') }} -->
  </div> 
  <button 
    class="btn btn-primary"
    v-on:click="updateName"
  >
    Click
  </button> 
</template>

<script>
import { ref } from 'vue';
// import { reactive } from 'vue';
//vue.js3의 컴포지션API에서 일반변수를 사용할 때 데이터가 바뀌어도 위에
//템플릿의 값에 적용이 안되기 때문에 vuejs에서 기능제공함 ref를 사용하여 담아줘야함
 //ref안에 기본자료형과 오브젝트, 어레이 모두 사용가능 
 //reactive 는 value를 안적어도 되지만 기본자료형(String,숫자) 사용 못하고
 //어레이나 오브젝트만 사용 가능하다.
export default {
  
  setup() {
   // const name = ref('무럭나무'); //const는 변경이 안되기때문에 let으로 변경함
   

//오브젝트 예시
// import { reactive } from 'vue'; // .value를 안쓰는법. 만약ref를 쓴다면 .value.id 로 사용하기
    const name = ref({ id:1 }); 
    //리턴에서 name.value 말고 name.id =2 이런식으로 변경


    // const greeting = (name)=> {
    //   return 'Hello, ' + name;
    // };

    // const great = greeting(name);

  const updateName = () => {

    //name.value = '무럭무럭나무'; //ref 를 사용하면 .value를 붙여줘야함 그럼 template까지 같이 업데이트됨
    //이것을 리액티브하다고 함.. (데이터가 변경되면 템플릿에서도 같이 변경되는 것)
    // name = '무럭무럭나무';

    name.value.id = 2;
    console.log(name);
  }

    return { //오브젝트 리턴 - > template에 접근 
      // great
       name //변수명
      // greeting
      ,updateName
    };
  }

}
</script>

<style>
 .name {
  color : red;
 }
</style>