import { h } from "vue";
import type { IconSet, IconProps } from "vuetify";
import vyhub from "../components/Icons/VyHub.vue";
import teamspeak from "../components/Icons/Teamspeak.vue";
import seven_days from "../components/Icons/7Days.vue";
import asa from "../components/Icons/Asa.vue";
import discord from "../components/Icons/Discord.vue";
import errorIcon from "../components/Icons/ErrorIcon.vue";
import fiveM from "../components/Icons/FiveM.vue";
import gmod from "../components/Icons/GMod.vue";
import successIcon from "../components/Icons/SuccessIcon.vue";
import rust from "../components/Icons/Rust.vue";

const customSvgNameToComponent: any = {
  vyhub,
  teamspeak,
  seven_days,
  asa,
  discord,
  errorIcon,
  fiveM,
  gmod,
  successIcon,
  rust
};

const customSVGs: IconSet = {
  component: (props: IconProps) => h(customSvgNameToComponent[props.icon]),
};

export { customSVGs /* aliases */ };
