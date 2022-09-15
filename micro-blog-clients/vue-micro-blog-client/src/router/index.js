import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddPost from "../views/AddPost.vue";
import EditPost from "@/views/EditPost";
import About from "@/views/About";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/addpost",
        name: "addpost",
        component: AddPost
    },
    {
        path: "/editpost/:id",
        name: "editpost",
        component: EditPost
    },
    {
        path: "/about",
        name: "about",
        component: About
    }
];

const router = new VueRouter({
    routes
});

export default router;
