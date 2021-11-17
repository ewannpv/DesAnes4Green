import { Store } from 'vuex';// path to store file
import { VuexState } from './interfaces/vuexState';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<VuexState>;
  }
}
