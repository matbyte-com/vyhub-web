<template>
  <v-card>
    <v-card-title class="red lighten-1">
      <v-icon left>mdi-step-forward</v-icon>
      {{ $t('_firstSteps.firstSteps') }}
      <v-spacer/>
      <v-icon large @click="$emit('close')">mdi-close</v-icon>
    </v-card-title>
    <v-card-text>
      <v-list dense>
        <v-list-item v-for="(step, index) in steps" :key="step.id" style="cursor:pointer;"
                     :class="{ 'list-item-active': selectedStep === index,
                               'black--text': selectedStep === index}">
          <v-list-item-content @click="selectJourney(index)">
            <v-list-item-title class="d-flex align-center">
              <v-icon left v-if="!stepIsFulfilled(index)">mdi-circle-outline</v-icon>
              <v-icon left v-else color="success" class="animate__animated animate__bounceIn">
                mdi-check-circle-outline
              </v-icon>
              {{ step.title }}
              <v-spacer/>
              <v-icon :class="{ 'black--text': selectedStep === index}">mdi-chevron-right</v-icon>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider/>
      <div v-if="selectedStep !== null">
        <v-fade-transition>
          <v-list dense class="ml-3">
            <v-list-item v-for="substep in steps[selectedStep].steps" :key="substep.id"
                         :to="substep.link" active-class="no-active">
              <v-list-item-content>
                <v-list-item-title class="d-flex align-center">
                  <v-icon left v-if="!substepIsFulfilled(substep.journeyStep)">
                    mdi-circle-outline
                  </v-icon>
                  <v-icon left v-else color="success" class="animate__animated animate__bounceIn">
                    mdi-check-circle-outline
                  </v-icon>
                  {{ substep.title }}
                  <v-spacer/>
                  <v-icon v-if="substep.link">mdi-chevron-right</v-icon>
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-for="s in 4 - steps[selectedStep].steps.length" :key="s" />
          </v-list>
        </v-fade-transition>
      </div>
      <v-divider/>
      <div class="mt-2">Questions, Bugs, Feature Requests? Contact us!</div>
      <div class="d-flex mt-1">
        <v-btn class="red lighten-2" href="https://docs.vyhub.net" target="_blank">
          <v-icon left>
            mdi-help-circle-outline
          </v-icon>
          <span>Docs</span>
        </v-btn>
        <v-btn class="red lighten-2 ml-2" href="https://discord.gg/QycQpd2AQP" target="_blank">
          <v-icon left>
            mdi-discord
          </v-icon>
          <span>Discord</span>
        </v-btn>
        <v-btn class="red lighten-2 ml-2"
               :href="`mailto:support@matbyte.com?subject=Feedback Demo Route: ${$route.path}`">
          <v-icon left>
            mdi-email
          </v-icon>
          <span>Contact</span>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>

</template>

<script>
import openapi from '@/api/openapi';
import EventBus from '@/services/EventBus';

export default {
  name: 'CustomerJourney',
  data() {
    return {
      timer: null,
      selectedStep: 0,
      currentState: null,
      steps: [
        {
          id: 'step0',
          title: this.$t('_firstSteps.welcome'),
          steps: [
            {
              id: '0-1',
              title: this.$t('_firstSteps.login'),
              journeyStep: 'login',
            },
            {
              id: '0-2',
              title: this.$t('_firstSteps.setCommunityName'),
              journeyStep: 'set-community-name',
              link: '/settings/general',
            },
            {
              id: '0-3',
              title: this.$t('_firstSteps.setLanguageAndFeatures'),
              link: '/settings/general',
              journeyStep: 'set-community-name',
            },
          ],
        },
        {
          id: 'step1',
          title: this.$t('_firstSteps.connectGameserver'),
          steps: [
            {
              id: '1-2',
              title: this.$t('_firstSteps.createBundle'),
              link: '/settings/server',
              journeyStep: 'add-bundle',
            },
            {
              id: '1-3',
              title: this.$t('_firstSteps.createServer'),
              link: '/settings/server',
              journeyStep: 'add-server',
            },
            {
              id: '1-4',
              title: this.$t('_firstSteps.connectGameserver'),
              link: '/settings/server',
              journeyStep: 'connect-server',
            },
          ],
        },
        {
          id: 'step2',
          title: this.$t('_firstSteps.syncGroups'),
          steps: [
            {
              id: '2-1',
              title: this.$t('_firstSteps.createGroup'),
              link: '/settings/groups',
              journeyStep: 'add-group',
            },
          ],
        },
        {
          id: 'step3',
          title: this.$t('_firstSteps.setupShop'),
          steps: [
            {
              id: '3-1',
              title: this.$t('_firstSteps.createCategory'),
              link: '/settings/packet-categories',
              journeyStep: 'add-category',
            },
            {
              id: '3-2',
              title: this.$t('_firstSteps.createReward'),
              link: '/settings/rewards',
              journeyStep: 'add-reward',
            },
            {
              id: '3-3',
              title: this.$t('_firstSteps.createPacket'),
              link: '/settings/packets',
              journeyStep: 'add-packet',
            },
            {
              id: '3-4',
              title: this.$t('_firstSteps.addPmGateway'),
              link: '/settings/shop-gateways',
              journeyStep: 'add-pm-gateway',
            },
          ],
        },
      ],
    };
  },
  beforeMount() {
    this.fetchData(true);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  mounted() {
    EventBus.on('customerJourneyUpdate', this.fetchData);
    this.timer = setInterval(() => {
      this.fetchData();
    }, 30000);
  },
  methods: {
    async fetchData(firstOpen = false) {
      (await openapi).general_getCustomerJourney().then((rsp) => {
        this.currentState = rsp.data;
        if (firstOpen) {
          this.selectedStep = this.getFirstJourneyUnfulfilled();
        }
        this.selectJourney(this.selectedStep);
      });
    },
    selectJourney(index) {
      this.selectedStep = index;
      const firstUnfulfilledStep = this.getFirstUnfulfilledStep(index);
      let journeyStep = '';
      if (firstUnfulfilledStep) {
        journeyStep = firstUnfulfilledStep.journeyStep;
      }
      this.$store.dispatch('setActiveCustomerJourneyStep', { activeCustomerJourneyStep: journeyStep });
    },
    getFirstUnfulfilledStep(stepIndex) {
      const step = this.steps[stepIndex];
      // eslint-disable-next-line max-len
      const firstSubstep = step.steps.find((substep) => this.substepIsFulfilled(substep.journeyStep) === false);
      if (firstSubstep) {
        return firstSubstep;
      }
      return null;
    },
    substepIsFulfilled(customerJourneyStep) {
      if (this.currentState) {
        return this.currentState[customerJourneyStep] === true;
      }
      return false;
    },
    stepIsFulfilled(index) {
      if (this.currentState) {
        // eslint-disable-next-line max-len
        return !this.steps[index].steps.some((step) => this.substepIsFulfilled(step.journeyStep) === false);
      }
      return false;
    },
    getFirstJourneyUnfulfilled() {
      const firstJourney = this.steps.find((step, index) => this.stepIsFulfilled(index) === false);
      if (firstJourney) {
        return this.steps.findIndex((s) => s.id === firstJourney.id);
      }
      this.disableCustomerJourney();
      return 0;
    },
    async disableCustomerJourney() {
      (await openapi).general_editConfig(null, { enable_customer_journey: false }).then(() => {
        this.$store.dispatch('setActiveCustomerJourneyStep',
          { activeCustomerJourneyStep: null });
      });
    },
  },
};
</script>

<style scoped lang="sass">
.list-item-active
  background-color: rgb(220, 220, 220)

.no-active::before
  opacity: 0 !important
</style>
