import Vue2 from 'vue2App/vue2';
import Vuex3 from 'vue2App/vuex3';
import VueRouter3 from 'vue2App/vueRouter3';
import {store} from '../bootstrap'
import router from '../router'
import { createApp, h } from 'vue';

function bindSlotContext(target = {}, context) {
  return Object.keys(target).map(key => {
    const vnode = target[key];
    vnode.context = context;
    return vnode;
  });
}

/*
 * Transform vue2 components to DOM.
 */
export function vue2ToVue3(WrapperComponent) {
  let vm;
  return {
    created() {
      console.log('vue2ToVue3')
      const slots = bindSlotContext(this.$slots, this.__self);
      Vue2.use(Vuex3)
      Vue2.use(VueRouter3)
      vm = new Vue2({
        render: createElement => {
          return createElement(
            WrapperComponent,
            {
              on: this.$attrs,
              attrs: this.$attrs,
              props: this.$props,
              scopedSlots: this.$scopedSlots,
            },
            slots,
          );
        },
        store: vuex4ToVuex3Polyfill(store),
        router: vueRouter4To3Polyfill(router)
      });
      console.log(vm)
     
    },
    mounted() {
      const mountPoint = document.createElement('div');
      this.$el.appendChild(mountPoint)
      vm.$mount(mountPoint);
    },
    props: WrapperComponent.props,
    render() {
      return h('div');
    },
    beforeUnmount() {
      // Destroy the Vue 2 instance when Vue 3 component is unmounted
      console.log('unmounted vue 2')
      console.log(this.$router)
      if (this.$router.cleanupListeners) {
        this.$router.cleanupListeners();
      }
      vm.$destroy();
    },
  };
}

export function wrapVue2ComponentForVue3(Vue2Component) {
  return {
    setup(props, { slots }) {
      // Create a Vue 2 instance
      const vue2Instance = new Vue2({
        render: (h) => h(Vue2Component, { props }, slots.default ? slots.default() : []),
        store: vuex4ToVuex3Polyfill(store)
      });

      // Mount Vue 2 instance on a temporary div
      const mountPoint = document.createElement('div');
      this.$el.appendChild(mountPoint);
      vue2Instance.$mount(mountPoint);

      return () => h('div', { ref: mountPoint });
    },
    mounted() {
      // Append the Vue 2 component to the Vue 3 component
      //  const mountPoint = document.createElement('div');
      // this.$el.appendChild(mountPoint);
      // console.log(this.$el, this.$refs)
      // this.$el.appendChild(this.$refs.mountPoint);
    },
    beforeUnmount() {
      // Destroy the Vue 2 instance when Vue 3 component is unmounted
      console.log(this.$router)
      if (this.$router.cleanupListeners) {
        this.$router.cleanupListeners();
      }
      vue2Instance.$destroy();
    },
  };
}


export function vuex4ToVuex3Polyfill(store) {
  const state = Vue2.observable(store.state);

  // Vuex 3-style commit implementation
  function commit(type, payload) {
    const mutation = store._mutations[type];
    if (mutation) {
      mutation.forEach(handler => {
        handler(payload);
      });
    } else {
      console.error(`[vuex] unknown mutation type: ${type}`);
    }
  }

  // Vuex 3-style dispatch implementation
  function dispatch(type, payload) {
    const action = store._actions[type];
    if (action) {
      return Promise.all(action.map(handler => handler(payload)));
    } else {
      console.error(`[vuex] unknown action type: ${type}`);
      return Promise.resolve();
    }
  }

  // Vuex 3-style getters implementation
  const getters = {};
  Object.keys(store.getters).forEach(key => {
    Object.defineProperty(getters, key, {
      get: () => store.getters[key](state),
      enumerable: true,
    });
  });

  // Polyfilled store
  const polyfilledStore = {
    state,
    getters,
    commit,
    dispatch,
    subscribe: store.subscribe,
    watch: store.watch,
  };

  return polyfilledStore;
}
function mapHistoryToMode(history) {
  if (history.__type === 'hash') return 'hash';
  if (history.__type === 'memory') return 'abstract'; // Closest equivalent in Vue Router 3
  return 'history'; // Default to 'history'
}

function mapRoutes(routes) {
  return routes.map(route => {
    const { name, path, component, components, redirect, meta, children, alias, beforeEnter } = route;

    // Vue Router 3 doesn't support `components`, only `component`.
    // If `components` are used, we'll need to decide how to handle them or ignore them.
    return {
      name,
      path,
      component: component || (components ? components.default : undefined),
      redirect,
      meta,
      children: children ? mapRoutes(children) : undefined,
      alias,
      beforeEnter,
    };
  });
}

export function vueRouter4To3Polyfill(vueRouter4) {
  const { history, routes, ...otherOptions } = vueRouter4.options;
console.log('vueRouter4To3Polyfill')
  // Map history to mode
  const mode = mapHistoryToMode(history);

  // Map Vue Router 4 routes to Vue Router 3-compatible routes
  const mappedRoutes = mapRoutes(routes);
  const listeners = [];
  // Create a Vue Router 3 instance
  const vueRouter3 = new VueRouter3({
    mode,
    routes: mappedRoutes,
    ...otherOptions, // Pass through other options like `linkActiveClass`, `scrollBehavior`, etc.
  });
  const v4L = vueRouter4.afterEach(async(to, from) => {
    console.log('trigger4 start')
   
    //   // Trigger the event on the Vue Router 4 instance
    if(to.fullPath !== vueRouter3.currentRoute.fullPath) {
      console.log('trigger4', to.fullPath, from.fullPath, vueRouter3.currentRoute.fullPath)
      vueRouter3.push(to)
      console.log('trigger4 comp')
    }
  });
  listeners.push(v4L)

  const v3L = vueRouter3.afterEach(async (to, from) => {
    console.log('trigger start')
  //   // Trigger the event on the Vue Router 4 instance
    if(to.fullPath !== vueRouter4.currentRoute.value.fullPath) {
      console.log('trigger', to.fullPath, from.fullPath,  vueRouter4.currentRoute.value.fullPath)
      vueRouter4.push(to)
      console.log('trigger comp')
    }
  });
  listeners.push(v3L)
  console.log(listeners)
  // If Vue Router 4 instance has any guards or hooks, you might need to manually attach them to the Vue Router 3 instance.
  vueRouter4.cleanupListeners = () => {
    listeners.forEach(listener => listener()); // Call each listener to remove it
    listeners.length = 0; // Clear the array
  };
  return vueRouter3;
}