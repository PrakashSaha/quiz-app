<template>
    <div>
        <h1>Create an account</h1>
        <p><input type="text" placeholder="email" v-model="email" /></p>
        <p><input type="password" placeholder="Password" v-model="password" /></p>
        <p><button @click="register">Submit</button></p>
        <p><button @click="signInWithGoogle">signin with gmail</button></p>
    </div>
</template>

<script setup>
import {ref} from "vue";
import {
    getAuth, 
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup
} from "firebase/auth";
import {useRouter} from "vue-router";
const email = ref("");
const password  = ref("");
const router = useRouter()
const register = ()=>{
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data)=>{
        console.log("User Registerd Sucessfully!")
        router.push('/')
    })
    .catch((error)=>{
        console.log(error.code);
        alert(error.massage)
    })
};

const signInWithGoogle = ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
    .then((result) =>{
        console.log(result.user);
        router.push("/");
    })
    .catch((error) => {
        console.error('Google Sign-In Error:', error.code, error.message);
        alert(error.message);
    });
};
</script>

<style lang="scss" scoped>

</style>

