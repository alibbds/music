import Vue from "vue";
Vue.directive('lazyImg', {
    inserted(el, binding, vnode) {
        let callback = (changes)=>{
            changes.forEach(element => {
                if(element.intersectionRatio>0){
                    element.target.src = binding.value;
                    observer.unobserve(element.target)
                }
            });
        }
        let options = {};
        let observer = new IntersectionObserver(callback,options);
        observer.observe(el);
    },
});