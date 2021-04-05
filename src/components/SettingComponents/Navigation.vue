<template>
  <div>
    <dialog-form ref="navAddDialog" :form-schema="navlinkAddSchema"
                 :title="$t('settings.addNavlink')"/>
    <!-- Edit NavLink Dialog -->
    <dialog-form ref="navEditDialog" :form-schema="navlinkAddSchema"
              :title="$t('settings.editNavLink')"
              @updated="isExternalLink"
              :max-width="1000">
      <template slot="linkType-after">
        <v-carousel-transition>
          <v-text-field v-if="externalLink" hide-details="auto"
                        :label="$t('url')"
                        v-model="linkInput" />
          <div v-else>
            <v-divider />
            <v-expansion-panels flat>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  {{ $t('Editor') }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <vue-editor v-model="htmlInput" />
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  {{ $t('Raw HTML') }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-textarea :placeholder="$t('settings.rawHtml')" v-model="rawHtmlInput"/>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-carousel-transition>
      </template>
    </dialog-form>
    <!-- real Component -->
    <v-card flat>
      <v-card-title>
        {{ $t('navigation') }}
      </v-card-title>
      <v-list>
        <draggable
          :list="links">
          <div
            v-for="link in links"
            :key="link.title">
            <v-list-item>
              <v-row :class="!link.enabled ? 'text--disabled' : ''">
                <v-col cols="1">
                  <v-icon>
                    {{ link.icon }}
                  </v-icon>
                </v-col>
                <v-col cols="3">
                  {{ link.title }}
                </v-col>
                <v-col cols="3">
                  {{ link.link }}
                </v-col>
                <v-col class="text-right">
                  <v-icon v-if="link.html">
                    mdi-web
                  </v-icon>
                  <v-icon v-if="!link.defaultLink" class="ml-1">
                    mdi-link
                  </v-icon>
                </v-col>
                <v-col cols="1" class="text-right">
                  <v-icon small class="mr-2" @click="openNavEditDialog(link)">
                    mdi-pencil
                  </v-icon>
                </v-col>
              </v-row>
            </v-list-item>
          </div>
        </draggable>
      </v-list>
      <v-divider class="mb-3"/>
      <v-row>
        <v-col>
          <v-btn text color="primary" @click="$refs.navAddDialog.dialog = true">
            <v-icon left>mdi-plus</v-icon>
            <span>{{ $t('__addLink') }}</span>
          </v-btn>
        </v-col>
        <v-col>
          <v-row class="text--disabled">
            <v-col>
              <v-icon disabled>
                mdi-web
              </v-icon>
              __html content
            </v-col>
            <v-col>
              <v-icon disabled>
                mdi-link
              </v-icon>
              __external link
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>

  </div>
</template>

<script>
import draggable from 'vuedraggable';
import DialogForm from '@/components/DialogForm.vue';
import NavlinkAddForm from '@/forms/NavlinkAddForm';
import { VueEditor } from 'vue2-editor';

export default {
  name: 'Navigation',
  components: {
    DialogForm,
    draggable,
    VueEditor,
  },
  data() {
    return {
      navlinkAddSchema: NavlinkAddForm,
      externalLink: false,
      linkInput: null,
      htmlInput: null,
      rawHtmlInput: null,
      links: [
        {
          title: 'News', icon: 'mdi-newspaper', link: '/news', tabs: [], enabled: false, defaultLink: true, html: false,
        },
        {
          title: 'Dashboard', icon: 'mdi-account', link: '/dashboard', enabled: true, defaultLink: true, html: false,
          // title: 'Dashboard', icon: 'mdi-account', link: '/home', tabs: [{ title: 'Edit', icon:
          // 'mdi-home-edit-outline', link: '/dashboard' }, { title: 'Edit', icon:
          // 'mdi-home-edit-outline', link: '/dashboard' }],
        },
        {
          title: 'Shop', icon: 'mdi-sack', link: '/shop', tabs: [], enabled: true, defaultLink: true, html: false,
        },
        {
          title: 'Bans', icon: 'mdi-account-cancel', link: '/ban', reqProp: 'ban_show', tabs: [], enabled: true, defaultLink: true, html: false,
        },
        {
          title: 'Settings', icon: 'mdi-cog-outline', link: '/settings', tabs: [], enabled: true, defaultLink: true, html: false,
        },
      ],
      linksRight: [
        {
          title: 'Profil', icon: 'mdi-account-circle', link: '/',
        },
        {
          title: 'Settings', icon: 'mdi-cog', link: '/settings',
        },
      ],
    };
  },
  methods: {
    openNavEditDialog(item) {
      this.$refs.navEditDialog.show(item);
      this.$refs.navEditDialog.setData(item);
    },
    isExternalLink() {
      if (this.$refs.navEditDialog.getData().linkType === 'link') {
        this.externalLink = true;
      } else {
        this.externalLink = false;
      }
    },
  },
};
</script>

<style scoped>

</style>