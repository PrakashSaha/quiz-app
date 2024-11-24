<template>
    <div>
        <h1>Login into your Account</h1>
        <p><input type="text" placeholder="email" v-model="email" /></p>
        <p><input type="password" placeholder="Password" v-model="password" /></p>
        <p v-if="errMsg">{{ errMsg }}</p>
        <p><button @click="register">Submit</button></p>
    </div>
</template>

<script setup>
import {ref} from "vue";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useRouter} from "vue-router";
const email = ref("");
const password  = ref("");
const errMsg  = ref();
const router = useRouter()
const register = ()=>{
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data)=>{
        console.log("Sign in Sucessfully!")
        router.push('/')
    })
    .catch((error)=>{
        console.log(error.code);
        switch(error.code){
            case "auth/invalid-email":
                errMsg.value = "Invalid Email";
                brake;
            case "auth/user-not-found":
                errMsg.value = "no account is available with this Email";
                brake;
            case "auth/worng-password":
                errMsg.value = "Incorrect Password";
                brake;
            default:
                errMsg.value = "Email and Password is incorrect";
                brake;
        }
    })
};


</script>

<style lang="scss" scoped>

</style>