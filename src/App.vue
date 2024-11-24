<template>
  <div class="page-wrapper">
    <div class="container">
      <nav>
        <div  v-if="isLoggedIn">
          <router-link to="/">Home | </router-link>
          <router-link to="/results">Results | </router-link>
          <button @click="handleSignOut">Sign out</button>
        </div>
        <div v-else>
          <router-link to="/login" >Login | </router-link>
          <router-link to="/registration" >registration</router-link>
        </div>
      </nav>
      <hr>
        <router-view />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, defineComponent } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useRouter } from 'vue-router';

const router = useRouter()

const isLoggedIn = ref(false);
let auth;
onMounted(()=>{
  auth = getAuth();
  onAuthStateChanged(auth, (user)=>{
    if(user){
      isLoggedIn.value = true;
    }else{
      isLoggedIn.value = false;
    }
  });
});

const handleSignOut = ()=>{
  signOut(auth).then(()=>{
    router.push("/login");
  });
};


defineComponent({});
</script>

<style scoped>
.page-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Full viewport height */
  margin: 0; /* Reset default margin */
  background-color: #f0f0f0; /* Optional background color */
}
.container{
  width: 400px;
  text-align: center;
  padding: 40px;
  border-radius: 20px;
  background-color: aquamarine;
}

</style>

