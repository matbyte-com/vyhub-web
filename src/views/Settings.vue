<template>
  <ThemeChanger />
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import ThemeChanger from '@/components/SettingComponents/ThemeChanger.vue';

@Component({
  components: {
    ThemeChanger,
  },
})
export default class Home extends Vue {}
</script>
