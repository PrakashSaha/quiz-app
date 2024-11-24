import {createRouter, createWebHashHistory} from "vue-router"
import { 
    getAuth,
    onAuthStateChanged,} from "firebase/auth"
import { auth } from "../firebase";

//pages routes
import Home from "../components/Home.vue"
import Results from "../components/Results.vue"
import Login from "../components/auth/Login.vue"
import Registration from "../components/auth/Registration.vue"


const  router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path:"/",
            component: Home,
            meta:{
                requiresAuth: true,
            },
        },
        {
            path:"/results",
            component: Results
        },
        {
            path:"/login",
            component: Login
        },
        {
            path:"/registration",
            component: Registration
        }
    ]
});

// Function to get the current authenticated user
const getCurrentUser = () =>{
    return new Promise ((res, rej) =>{
        const removeListener = auth.onAuthStateChanged(
            (user) => {
                removeListener();
                res(user);
            },
            (error) => rej(error)
        )
    });
};

// Navigation Guard
router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth) {
      try {
        const user = await getCurrentUser();
        if (user) {
          next(); // User is authenticated, proceed to the route
        } else {
          alert("You don't have access!");
          next("/registration"); // Redirect to registration if not authenticated
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        next("/registration"); // Redirect to registration as a fallback
      }
    } else {
      next(); // Route does not require authentication, proceed
    }
  });
  
export default router;