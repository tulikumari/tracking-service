import Vue from "vue";
import Router from "vue-router";
import displayer from "@/components/displayer/displayer";
import controller from "@/components/controller/controller";

Vue.use(Router);

export default new Router({
    routes: [
        // {
        //     path: "/",
        //     name: "controller",
        //     component: controller
        // },
        {
            path: "/controller",
            name: "controller",
            component: controller
        },
        {
            path: "/displayer",
            name: "displayer",
            component: displayer
        },
        {
            path: "*",
            redirect: "/"
        } // catch all use case
    ]
});
