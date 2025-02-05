import i18n from '@/plugins/i18n';
import Common from '@/forms/Common';
import utilService from "../services/UtilService";

function returnForm() {
  const form = {
    type: 'object',
    required: ['name', 'address', 'port'],
    properties: {
      name: {
        type: 'string',
        title: i18n.global.t('name'),
      },
      hidden: {
        type: 'boolean',
        title: i18n.global.t('_server.labels.hidden'),
        default: false,
        layout: {
          comp: 'switch'
        }
      },
      type: Common.serverTypeSelectField(),
      serverbundle_id: {
        type: "string",
        title: i18n.global.t('serverbundle'),
        layout: {
          getItems: {
            url: {
              type: 'js-tpl',
              expr: `${Common.apiURL}/server/bundle/?server_type=\${rootData.type}`,
              pure: false
            },
            itemKey: 'data.id',
            itemTitle: 'data.name',
          },
          if: {
            expr: 'parent.data?.type != null',
          },
        },
      },
      address: {
        type: 'string',
        title: i18n.global.t('address'),
      },
      port: {
        type: 'integer',
        title: i18n.global.t('port'),
        default: 1,
        minimum: 1,
        maximum: 65535,
        layout: {
          if: {
            expr: 'parent.data?.type !== "DISCORD"',
          },
        }
      },
      extra: {
        type: 'object',
        allOf: [
          {
            properties: {
              /* GMOD */
              sync_bans: {
                type: 'boolean',
                title: i18n.global.t('_server.labels.syncBans'),
                description: i18n.global.t('_server.labels.syncBansDescription'),
                default: true,
                readOnly: false,
                layout: {
                  comp: 'switch',
                  if: {
                    expr: 'parent.parent.parent.data?.type === "GMOD"',
                  },
                },
              },
              res_slots: {
                type: 'integer',
                title: i18n.global.t('_server.labels.numberOfReservedSlots'),
                description: i18n.global.t('_server.labels.numberOfReservedSlotsDesc'),
                minimum: 0,
                default: 0,
                layout: {
                  if: {
                    expr: 'parent.parent.parent.data?.type === "GMOD"',
                  },
                },
              },
              res_slots_keep_free: {
                type: 'boolean',
                title: i18n.global.t('_server.labels.keepReservedSlotsFree'),
                description: i18n.global.t('_server.labels.keepReservedSlotsFreeDesc'),
                default: false,
                layout: {
                  if: {
                    expr: 'parent.parent.parent.data?.type === "GMOD"',
                  },
                },
              },
              res_slots_hide: {
                type: 'boolean',
                title: i18n.global.t('_server.labels.hideReservedSlots'),
                description: i18n.global.t('_server.labels.hideReservedSlotsDesc'),
                default: false,
                layout: {
                  if: {
                    expr: 'parent.parent.parent.data?.type === "GMOD"',
                  },
                },
              },
            },
          },
          {
            //required: ['query_port'],
            properties: {
              /* TS3 */
              query_port: { // Required
                type: 'integer',
                title: i18n.global.t('_server.labels.sshQueryPort'),
                description: i18n.global.t('_server.labels.queryPortDescription'),
                default: 10022,
                minimum: 1,
                maximum: 65535,
                layout: {
                  if: {
                    expr: 'parent.parent.parent.data?.type === "TEAMSPEAK3"',
                  },
                },
              },
            }
          }
        ]
      },
      secrets: {
        type: 'object',
        //required: required_secrets,
        allOf: [{
          properties: {
            /* TS3 */
            username: {
              type: 'string', // Required
              title: i18n.global.t('username'),
              layout: {
                if: {
                  expr: 'parent.parent.parent.data?.type === "TEAMSPEAK3"',
                },
              },
            },
            password: {
              type: 'string', // Required
              title: i18n.global.t('password'),
              layout: {
                if: {
                  expr: 'parent.parent.parent.data?.type === "TEAMSPEAK3"',
                },
              },
            },
          },
        }, {
          properties: {
            /* SOURCE */
            password: {
              type: 'string',
              title: i18n.global.t('_server.labels.rconPassword'),
              layout: {
                if: {
                  expr: 'parent.parent.parent.data?.type === "SOURCE"',
                },
              },
            },
          },
        }]
      },
    },
  };

  if (!utilService.data().utils.showAdvancedSettings()) {
    // Hide sync bans but set false as default
    form.properties.extra.allOf[0].properties.sync_bans.default = false;
    form.properties.extra.allOf[0].properties.sync_bans.readOnly = true;

    delete form.properties.extra.allOf[0].properties.res_slots;
    delete form.properties.extra.allOf[0].properties.res_slots_keep_free;
    delete form.properties.extra.allOf[0].properties.res_slots_hide;
  }

  return form;
}

export default {
  returnForm
};
