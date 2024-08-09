// Maybe remove after successfull Vue 3 Upgrade TODO
declare module 'vue' {
  import { CompatVue } from '@vue/runtime-dom';

  const Vue: CompatVue;
  export default Vue;
  export * from '@vue/runtime-dom';
  const { configureCompat } = Vue;
  export { configureCompat };
}

export {};
