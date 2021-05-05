import {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
  namespace Schemas {
    /**
     * AddressModel
     */
    export interface AddressModel {
      /**
       * Name
       */
      name: string;
      /**
       * Street And Number
       */
      street_and_number: string;
      /**
       * Addition
       */
      addition?: string;
      /**
       * City
       */
      city: string;
      /**
       * State
       */
      state: string;
      /**
       * Zip Code
       */
      zip_code: string;
      /**
       * Id
       */
      id: string; // uuid
      country: CountryModel;
    }
    /**
     * AddressModelAdd
     */
    export interface AddressModelAdd {
      /**
       * Name
       */
      name: string;
      /**
       * Street And Number
       */
      street_and_number: string;
      /**
       * Addition
       */
      addition?: string;
      /**
       * City
       */
      city: string;
      /**
       * State
       */
      state: string;
      /**
       * Zip Code
       */
      zip_code: string;
      /**
       * Country Code
       */
      country_code: string; // ^[A-Z]{2}$
    }
    /**
     * AppliedPacketModel
     */
    export interface AppliedPacketModel {
      /**
       * Id
       */
      id: string; // uuid
      status: AppliedPacketStatus;
      packet: PacketModelShort;
      /**
       * Purchase Id
       */
      purchase_id?: string; // uuid
      /**
       * Bounds
       */
      bounds: string;
      /**
       * Begin
       */
      begin: string; // date-time
      /**
       * End
       */
      end?: string; // date-time
      /**
       * Active
       */
      active: boolean;
      /**
       * User Id
       */
      user_id: string; // uuid
    }
    /**
     * AppliedPacketStatus
     * An enumeration.
     */
    export type AppliedPacketStatus = "ACTIVE" | "DISABLED_PERM" | "DISABLED_TEMP";
    /**
     * BanModel
     */
    export interface BanModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Length
       */
      length?: number; // time-delta
      /**
       * Reason
       */
      reason?: string;
      serverbundle?: ServerbundleModelShort;
      creator: Model_User_User_UserModelShort;
      user: Model_User_User_UserModelShort;
      /**
       * Created On
       */
      created_on: string; // date-time
      /**
       * Ends On
       */
      ends_on?: string; // date-time
      status: BanStatus;
      /**
       * Is Active
       */
      is_active: boolean;
    }
    /**
     * BanModelAdd
     */
    export interface BanModelAdd {
      /**
       * Length
       */
      length?: number; // time-delta
      /**
       * Reason
       */
      reason?: string;
      /**
       * Serverbundle Id
       */
      serverbundle_id?: string; // uuid
      /**
       * Creator Id
       */
      creator_id?: string; // uuid
      /**
       * User Id
       */
      user_id: string; // uuid
      /**
       * Created On
       */
      created_on?: string; // date-time
    }
    /**
     * BanModelPatch
     */
    export interface BanModelPatch {
      /**
       * Length
       */
      length?: number; // time-delta
      /**
       * Reason
       */
      reason?: string;
      /**
       * Serverbundle Id
       */
      serverbundle_id?: string; // uuid
      status?: BanStatus;
    }
    /**
     * BanStatus
     * An enumeration.
     */
    export type BanStatus = "ACTIVE" | "UNBANNED";
    /**
     * Body_start_payment_shop_checkout_post
     */
    export interface BodyStartPaymentShopCheckoutPost {
      purchase: UUIDModel;
      payment_gateway: UUIDModel;
    }
    /**
     * CartModel
     */
    export interface CartModel {
      /**
       * Correct
       */
      correct: boolean;
      price: TotalPriceModel;
      /**
       * Packets
       */
      packets: CartPacketModel[];
    }
    /**
     * CartPacketModel
     */
    export interface CartPacketModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Price Net
       */
      price_net: number;
      price?: TotalPriceModel;
      /**
       * Credits
       */
      credits?: number;
      currency: CurrencyModel;
      packet: PacketModelShort;
      /**
       * Packet Title
       */
      packet_title: string;
      /**
       * Last Update
       */
      last_update: string; // date-time
      user: Model_User_User_UserModelShort;
      /**
       * Recurring
       */
      recurring: boolean;
      discount?: DiscountModel;
      /**
       * Editable
       */
      editable: boolean;
    }
    /**
     * CmsPageModel
     */
    export interface CmsPageModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Content
       */
      content: string;
    }
    /**
     * CmsPageModelPost
     */
    export interface CmsPageModelPost {
      /**
       * Content
       */
      content: string;
    }
    /**
     * CountryModel
     */
    export interface CountryModel {
      /**
       * Code
       */
      code: string;
      /**
       * Name
       */
      name: string;
    }
    /**
     * CurrencyModel
     */
    export interface CurrencyModel {
      /**
       * Symbol
       */
      symbol: string;
      /**
       * Name
       */
      name: string;
      /**
       * Code
       */
      code: string; // ^[A-Z]{3}$
    }
    /**
     * DebitModel
     */
    export interface DebitModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Date
       */
      date: string; // date-time
      /**
       * Transaction Id
       */
      transaction_id?: string;
      payment_gateway: PaymentGatewayModel;
      /**
       * Amount
       */
      amount?: number;
      /**
       * Credits
       */
      credits?: number;
      status: DebitStatus;
      /**
       * Invoice Number
       */
      invoice_number: string;
      /**
       * Transaction Url
       */
      transaction_url?: string;
      purchase: PurchaseModelShort;
    }
    /**
     * DebitModelNoPurchase
     */
    export interface DebitModelNoPurchase {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Date
       */
      date: string; // date-time
      /**
       * Transaction Id
       */
      transaction_id?: string;
      payment_gateway: PaymentGatewayModel;
      /**
       * Amount
       */
      amount?: number;
      /**
       * Credits
       */
      credits?: number;
      status: DebitStatus;
      /**
       * Invoice Number
       */
      invoice_number: string;
      /**
       * Transaction Url
       */
      transaction_url?: string;
    }
    /**
     * DebitStatus
     * An enumeration.
     */
    export type DebitStatus = "STARTED" | "APPROVED" | "FINISHED" | "CANCELLED";
    /**
     * DiscountModel
     */
    export interface DiscountModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Name
       */
      name?: string;
      /**
       * Bounds
       */
      bounds: string;
      /**
       * Begin
       */
      begin: string; // date-time
      /**
       * End
       */
      end?: string; // date-time
      /**
       * Percentage
       */
      percentage: number;
      /**
       * Enabled
       */
      enabled: boolean;
      /**
       * Active
       */
      active: boolean;
      /**
       * Max Usages
       */
      max_usages?: number;
      requirement_set?: RequirementSetModel;
    }
    /**
     * GroupModel
     */
    export interface GroupModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Name
       */
      name: string;
      /**
       * Permission Level
       */
      permission_level: number;
      /**
       * Color
       */
      color: string;
      /**
       * Serverbundle Id
       */
      serverbundle_id: string; // uuid
      /**
       * Properties
       */
      properties: {
      };
    }
    /**
     * GroupModelAdd
     */
    export interface GroupModelAdd {
      /**
       * Name
       */
      name: string;
      /**
       * Permission Level
       */
      permission_level: number;
      /**
       * Color
       */
      color: string;
      /**
       * Serverbundle Id
       */
      serverbundle_id: string; // uuid
    }
    /**
     * GroupModelPatch
     */
    export interface GroupModelPatch {
      /**
       * Name
       */
      name?: string;
      /**
       * Permission Level
       */
      permission_level?: number;
      /**
       * Color
       */
      color?: string;
      /**
       * Serverbundle Id
       */
      serverbundle_id?: string; // uuid
      /**
       * Properties
       */
      properties?: any[];
    }
    /**
     * GroupModelShort
     */
    export interface GroupModelShort {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Name
       */
      name: string;
      /**
       * Serverbundle Id
       */
      serverbundle_id: string; // uuid
    }
    /**
     * HTTPValidationError
     */
    export interface HTTPValidationError {
      /**
       * Detail
       */
      detail?: ValidationError[];
    }
    /**
     * LinkType
     * An enumeration.
     */
    export type LinkType = "default" | "link" | "html";
    /**
     * LogEntryModel
     */
    export interface LogEntryModel {
      author: Model_User_UserModelShort;
      /**
       * Message
       */
      message: {
      };
      /**
       * Created On
       */
      created_on: string; // date-time
      /**
       * Category
       */
      category: string;
    }
    /**
     * MembershipModel
     */
    export interface MembershipModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Bounds
       */
      bounds: string;
      /**
       * Begin
       */
      begin: string; // date-time
      /**
       * End
       */
      end?: string; // date-time
      /**
       * Group Id
       */
      group_id: string; // uuid
      /**
       * Active
       */
      active: boolean;
      /**
       * User Id
       */
      user_id: string; // uuid
    }
    /**
     * MembershipModelUserAdd
     */
    export interface MembershipModelUserAdd {
      /**
       * Begin
       */
      begin: string; // date-time
      /**
       * End
       */
      end?: string; // date-time
      /**
       * Group Id
       */
      group_id: string; // uuid
    }
    /**
     * UserModelShort
     */
    export interface Model_User_UserModelShort {
      /**
       * Id
       */
      id: string; // uuid
      type: UserType;
      /**
       * Username
       */
      username: string;
      /**
       * Avatar
       */
      avatar: string;
      /**
       * Linked Users
       */
      linked_users: UserModelNoLinkedShort[];
    }
    /**
     * UserModelShort
     */
    export interface Model_User_User_UserModelShort {
      /**
       * Id
       */
      id: string; // uuid
      type: UserType;
      /**
       * Username
       */
      username: string;
      /**
       * Avatar
       */
      avatar: string;
      /**
       * Linked Users
       */
      linked_users: UserModelNoLinkedShort[];
    }
    /**
     * NavModel
     */
    export interface NavModel {
      /**
       * Title
       */
      title: string;
      /**
       * Icon
       */
      icon: string;
      /**
       * Enabled
       */
      enabled: boolean;
      linkType: LinkType;
      /**
       * Reqprop
       */
      reqProp?: string;
      /**
       * Html
       */
      html?: string;
      /**
       * Link
       */
      link?: string;
      /**
       * Tabs
       */
      tabs?: any;
    }
    /**
     * NewsModel
     */
    export interface NewsModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Subject
       */
      subject: string;
      /**
       * Content
       */
      content?: string;
      type: NewsType;
      /**
       * Created
       */
      created: string; // date-time
      creator?: Model_User_User_UserModelShort;
    }
    /**
     * NewsModelPatch
     */
    export interface NewsModelPatch {
      /**
       * Subject
       */
      subject?: string;
      /**
       * Content
       */
      content?: string;
      type?: NewsType;
    }
    /**
     * NewsModelPost
     */
    export interface NewsModelPost {
      /**
       * Subject
       */
      subject: string;
      /**
       * Content
       */
      content?: string;
      type: NewsType;
    }
    /**
     * NewsType
     * An enumeration.
     */
    export type NewsType = "PINNED" | "DEFAULT";
    /**
     * PacketCategoryModel
     */
    export interface PacketCategoryModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Name
       */
      name: string;
      /**
       * Image Url
       */
      image_url?: string; // uri
      /**
       * Enabled
       */
      enabled: boolean;
    }
    /**
     * PacketModel
     */
    export interface PacketModel {
      /**
       * Description
       */
      description?: string;
      /**
       * Active For
       */
      active_for?: number; // time-delta
      /**
       * Custom Price
       */
      custom_price: boolean;
      /**
       * Enabled
       */
      enabled: boolean;
      /**
       * Buyable
       */
      buyable: boolean;
      /**
       * Buyable Active
       */
      buyable_active: boolean;
      /**
       * Buyable Inactive
       */
      buyable_inactive: boolean;
      /**
       * Recurring
       */
      recurring: boolean;
      /**
       * Title
       */
      title: string;
      /**
       * Subtitle
       */
      subtitle?: string;
      /**
       * Image Url
       */
      image_url?: string; // uri
      /**
       * Abstract
       */
      abstract?: string[];
      /**
       * Price
       */
      price: number;
      /**
       * Credits
       */
      credits?: number;
      discount?: DiscountModel;
      price_with_discount?: TotalPriceModel;
      price_without_discount?: TotalPriceModel;
      /**
       * Id
       */
      id: string; // uuid
      currency: CurrencyModel;
      category: PacketCategoryModel;
      /**
       * Requirement Set Id
       */
      requirement_set_id?: string; // uuid
      /**
       * Relations
       */
      relations: PacketRelationModel[];
      /**
       * Payment Gateways
       */
      payment_gateways: PaymentGatewayModel[];
      /**
       * Rewards
       */
      rewards: RewardModel[];
      /**
       * Deletable
       */
      deletable: boolean;
    }
    /**
     * PacketModelAdd
     */
    export interface PacketModelAdd {
      /**
       * Description
       */
      description?: string;
      /**
       * Active For
       */
      active_for?: number; // time-delta
      /**
       * Custom Price
       */
      custom_price: boolean;
      /**
       * Enabled
       */
      enabled: boolean;
      /**
       * Buyable
       */
      buyable: boolean;
      /**
       * Buyable Active
       */
      buyable_active: boolean;
      /**
       * Buyable Inactive
       */
      buyable_inactive: boolean;
      /**
       * Recurring
       */
      recurring: boolean;
      /**
       * Title
       */
      title: string;
      /**
       * Subtitle
       */
      subtitle?: string;
      /**
       * Image Url
       */
      image_url?: string; // uri
      /**
       * Abstract
       */
      abstract?: string[];
      /**
       * Price
       */
      price: number;
      /**
       * Credits
       */
      credits?: number;
      discount?: DiscountModel;
      price_with_discount?: TotalPriceModel;
      price_without_discount?: TotalPriceModel;
      /**
       * Currency Code
       */
      currency_code: string; // ^[A-Z]{3}$
      /**
       * Category Id
       */
      category_id: string; // uuid
      /**
       * Requirement Set Id
       */
      requirement_set_id?: string; // uuid
      /**
       * Relations
       */
      relations: PacketRelationModelAdd[];
      /**
       * Reward Ids
       */
      reward_ids?: string /* uuid */ [];
      /**
       * Payment Gateway Ids
       */
      payment_gateway_ids?: string /* uuid */ [];
    }
    /**
     * PacketModelPatch
     */
    export interface PacketModelPatch {
      /**
       * Description
       */
      description?: string;
      /**
       * Active For
       */
      active_for?: number; // time-delta
      /**
       * Custom Price
       */
      custom_price?: boolean;
      /**
       * Enabled
       */
      enabled?: boolean;
      /**
       * Buyable
       */
      buyable?: boolean;
      /**
       * Buyable Active
       */
      buyable_active?: boolean;
      /**
       * Buyable Inactive
       */
      buyable_inactive?: boolean;
      /**
       * Recurring
       */
      recurring?: boolean;
      /**
       * Title
       */
      title?: string;
      /**
       * Subtitle
       */
      subtitle?: string;
      /**
       * Image Url
       */
      image_url?: string; // uri
      /**
       * Abstract
       */
      abstract?: string[];
      /**
       * Price
       */
      price?: number;
      /**
       * Credits
       */
      credits?: number;
      discount?: DiscountModel;
      price_with_discount?: TotalPriceModel;
      price_without_discount?: TotalPriceModel;
      /**
       * Currency Code
       */
      currency_code?: string; // ^[A-Z]{3}$
      /**
       * Category Id
       */
      category_id?: string; // uuid
      /**
       * Requirement Set Id
       */
      requirement_set_id?: string; // uuid
      /**
       * Relations
       */
      relations?: PacketRelationModelAdd[];
      /**
       * Reward Ids
       */
      reward_ids?: string /* uuid */ [];
      /**
       * Payment Gateway Ids
       */
      payment_gateway_ids?: string /* uuid */ [];
    }
    /**
     * PacketModelShort
     */
    export interface PacketModelShort {
      /**
       * Title
       */
      title: string;
      /**
       * Subtitle
       */
      subtitle?: string;
      /**
       * Image Url
       */
      image_url?: string; // uri
      /**
       * Abstract
       */
      abstract?: string[];
      /**
       * Price
       */
      price: number;
      /**
       * Credits
       */
      credits?: number;
      discount?: DiscountModel;
      price_with_discount?: TotalPriceModel;
      price_without_discount?: TotalPriceModel;
      /**
       * Id
       */
      id: string; // uuid
      currency: CurrencyModel;
    }
    /**
     * PacketRelationModel
     */
    export interface PacketRelationModel {
      packet_left: PacketModelShort;
      packet_right: PacketModelShort;
      type: PacketRelationType;
    }
    /**
     * PacketRelationModelAdd
     */
    export interface PacketRelationModelAdd {
      /**
       * Packet Right Id
       */
      packet_right_id: string; // uuid
      type: PacketRelationType;
    }
    /**
     * PacketRelationType
     * An enumeration.
     */
    export type PacketRelationType = "DISABLES" | "REQUIRES" | "UPGRADES" | "NOT_COMPATIBLE";
    /**
     * Page[NewsModel]
     */
    export interface PageNewsModel {
      /**
       * Items
       */
      items: NewsModel[];
      /**
       * Total
       */
      total: number;
      /**
       * Page
       */
      page: number;
      /**
       * Size
       */
      size: number;
    }
    /**
     * PaymentAction
     */
    export interface PaymentAction {
      /**
       * Type
       */
      type: string;
      /**
       * Data
       */
      data?: {
      };
    }
    /**
     * PaymentGatewayModel
     */
    export interface PaymentGatewayModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Name
       */
      name: string;
      type: PaymentGatewayType;
      /**
       * Support Recurring
       */
      support_recurring: boolean;
    }
    /**
     * PaymentGatewayType
     * An enumeration.
     */
    export type PaymentGatewayType = "PAYPAL" | "STRIPE" | "PAYSAFECARD";
    /**
     * PropertyModel
     */
    export interface PropertyModel {
      /**
       * Name
       */
      name: string;
      /**
       * Granted
       */
      granted: boolean;
      /**
       * Group Id
       */
      group_id: string; // uuid
      /**
       * Value
       */
      value?: string;
    }
    /**
     * PurchaseModel
     */
    export interface PurchaseModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Date
       */
      date: string; // date-time
      user: Model_User_User_UserModelShort;
      /**
       * Amount Total
       */
      amount_total: number;
      currency: CurrencyModel;
      status: PurchaseStatus;
      /**
       * Credits
       */
      credits?: number;
      /**
       * Amount Net
       */
      amount_net: number;
      /**
       * Tax Rate
       */
      tax_rate: number;
      /**
       * Tax Amount
       */
      tax_amount: number;
      /**
       * Tax Info
       */
      tax_info?: string;
      /**
       * Last Update
       */
      last_update: string; // date-time
      /**
       * Recurring
       */
      recurring: boolean;
      /**
       * Debits
       */
      debits: DebitModelNoPurchase[];
      /**
       * Cart Packets
       */
      cart_packets: CartPacketModel[];
      address: AddressModel;
      /**
       * Credits Used
       */
      credits_used: boolean;
      /**
       * Refundable
       */
      refundable: boolean;
    }
    /**
     * PurchaseModelPatch
     */
    export interface PurchaseModelPatch {
      /**
       * Id
       */
      id?: string; // uuid
      /**
       * Date
       */
      date?: string; // date-time
      user?: Model_User_User_UserModelShort;
      /**
       * Amount Total
       */
      amount_total?: number;
      currency?: CurrencyModel;
      status?: PurchaseStatus;
      /**
       * Credits
       */
      credits?: number;
    }
    /**
     * PurchaseModelShort
     */
    export interface PurchaseModelShort {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Date
       */
      date: string; // date-time
      user: Model_User_User_UserModelShort;
      /**
       * Amount Total
       */
      amount_total: number;
      currency: CurrencyModel;
      status: PurchaseStatus;
      /**
       * Credits
       */
      credits?: number;
    }
    /**
     * PurchaseStatus
     * An enumeration.
     */
    export type PurchaseStatus = "OPEN" | "CANCELLED" | "FINISHED" | "REFUNDED" | "REVOKED" | "RECURRING";
    /**
     * RequirementModel
     */
    export interface RequirementModel {
      /**
       * Id
       */
      id: string; // uuid
      type: RequirementType;
      operator: RequirementOperator;
      /**
       * Key
       */
      key?: string;
      /**
       * Value
       */
      value: string;
      /**
       * Requirement Set Id
       */
      requirement_set_id: string; // uuid
    }
    /**
     * RequirementModelAdd
     */
    export interface RequirementModelAdd {
      type: RequirementType;
      operator: RequirementOperator;
      /**
       * Key
       */
      key?: string;
      /**
       * Value
       */
      value: string;
      /**
       * Requirement Set Id
       */
      requirement_set_id: string; // uuid
    }
    /**
     * RequirementOperator
     * An enumeration.
     */
    export type RequirementOperator = "EQ" | "LEQ" | "GEQ" | "LT" | "GT" | "ACTIVE" | "INACTIVE" | "NEVER_ACTIVE" | "HAVE";
    /**
     * RequirementSetModel
     */
    export interface RequirementSetModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Name
       */
      name: string;
      /**
       * Formula
       */
      formula?: any[];
      /**
       * Requirements
       */
      requirements: RequirementModel[];
      /**
       * Fulfilled
       */
      fulfilled?: boolean;
    }
    /**
     * RequirementSetModelAdd
     */
    export interface RequirementSetModelAdd {
      /**
       * Name
       */
      name: string;
    }
    /**
     * RequirementType
     * An enumeration.
     */
    export type RequirementType = "GROUP_MEMBER" | "PERMISSION_LEVEL" | "PERMISSION_LEVEL_SB" | "PROPERTY" | "PROPERTY_SB" | "USER_ATTRIBUTE" | "PACKET" | "DATE" | "USER_SELF";
    /**
     * RewardEvent
     * An enumeration.
     */
    export type RewardEvent = "DIRECT" | "CONNECT" | "SPAWN" | "DEATH" | "DISCONNECT";
    /**
     * RewardModel
     */
    export interface RewardModel {
      /**
       * Name
       */
      name: string;
      type: RewardType;
      /**
       * Value
       */
      value: string;
      /**
       * Order
       */
      order: number;
      /**
       * Once
       */
      once: boolean;
      /**
       * Once From All
       */
      once_from_all: boolean;
      on_event: RewardEvent;
      /**
       * Id
       */
      id: string; // uuid
      serverbundle: ServerbundleModelShort;
      requirement_set?: RequirementSetModel;
    }
    /**
     * RewardModelAdd
     */
    export interface RewardModelAdd {
      /**
       * Name
       */
      name: string;
      type: RewardType;
      /**
       * Value
       */
      value: string;
      /**
       * Order
       */
      order: number;
      /**
       * Once
       */
      once: boolean;
      /**
       * Once From All
       */
      once_from_all: boolean;
      on_event: RewardEvent;
      /**
       * Serverbundle Id
       */
      serverbundle_id: string; // uuid
      /**
       * Requirement Set Id
       */
      requirement_set_id?: string; // uuid
    }
    /**
     * RewardModelPatch
     */
    export interface RewardModelPatch {
      /**
       * Name
       */
      name?: string;
      type?: RewardType;
      /**
       * Value
       */
      value?: string;
      /**
       * Order
       */
      order?: number;
      /**
       * Once
       */
      once?: boolean;
      /**
       * Once From All
       */
      once_from_all?: boolean;
      on_event?: RewardEvent;
      /**
       * Serverbundle Id
       */
      serverbundle_id?: string; // uuid
      /**
       * Requirement Set Id
       */
      requirement_set_id?: string; // uuid
    }
    /**
     * RewardType
     * An enumeration.
     */
    export type RewardType = "COMMAND" | "SCRIPT";
    /**
     * ServerBundleModelPatch
     */
    export interface ServerBundleModelPatch {
      /**
       * Name
       */
      name: string;
      /**
       * Color
       */
      color: string; // color
      /**
       * Icon
       */
      icon?: string;
      /**
       * Default Group Id
       */
      default_group_id?: string; // uuid
      /**
       * Multigroup
       */
      multigroup?: boolean;
      /**
       * Server
       */
      server?: any[];
    }
    /**
     * ServerModel
     */
    export interface ServerModel {
      /**
       * Name
       */
      name: string;
      /**
       * Id
       */
      id: string; // uuid
      type: ServerType;
      /**
       * Address
       */
      address: string;
      /**
       * Port
       */
      port: number;
      /**
       * Serverbundle Id
       */
      serverbundle_id?: string; // uuid
    }
    /**
     * ServerModelShort
     */
    export interface ServerModelShort {
      /**
       * Name
       */
      name: string;
      /**
       * Id
       */
      id: string; // uuid
      type: ServerType;
      /**
       * Serverbundle Id
       */
      serverbundle_id?: string; // uuid
    }
    /**
     * ServerType
     * An enumeration.
     */
    export type ServerType = "GMOD" | "MINECRAFT" | "TEAMSPEAK3" | "DISCORD";
    /**
     * ServerbundleModel
     */
    export interface ServerbundleModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Name
       */
      name: string;
      /**
       * Icon
       */
      icon?: string;
      /**
       * Multigroup
       */
      multigroup: boolean;
      /**
       * Color
       */
      color: string; // color
      server_type: ServerType;
      default_group?: GroupModelShort;
    }
    /**
     * ServerbundleModelAdd
     */
    export interface ServerbundleModelAdd {
      /**
       * Name
       */
      name: string;
      /**
       * Color
       */
      color: string; // color
      /**
       * Server Type
       */
      server_type: string;
      /**
       * Icon
       */
      icon?: string;
      /**
       * Default Group Id
       */
      default_group_id?: string; // uuid
      /**
       * Multigroup
       */
      multigroup?: boolean;
    }
    /**
     * ServerbundleModelShort
     */
    export interface ServerbundleModelShort {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Name
       */
      name: string;
    }
    /**
     * StartPaymentModel
     */
    export interface StartPaymentModel {
      debit: DebitModel;
      action?: PaymentAction;
    }
    /**
     * SuccessModel
     */
    export interface SuccessModel {
      /**
       * Success
       */
      success?: boolean;
    }
    /**
     * ThemeModel
     */
    export interface ThemeModel {
      /**
       * Dark
       */
      dark: boolean;
      /**
       * Image
       */
      image?: string;
      /**
       * Primary
       */
      primary: string;
      /**
       * Background
       */
      background: string;
    }
    /**
     * TotalPriceModel
     */
    export interface TotalPriceModel {
      /**
       * Net
       */
      net: number;
      /**
       * Total
       */
      total: number;
      /**
       * Tax Rate
       */
      tax_rate: number;
      /**
       * Tax Amount
       */
      tax_amount: number;
      currency: CurrencyModel;
      /**
       * Tax Info
       */
      tax_info?: string;
      /**
       * Credits
       */
      credits?: number;
    }
    /**
     * UUIDModel
     */
    export interface UUIDModel {
      /**
       * Id
       */
      id: string; // uuid
    }
    /**
     * UserAttributeDefinitionModel
     */
    export interface UserAttributeDefinitionModel {
      /**
       * Id
       */
      id: string; // uuid
      user_type: UserType;
      /**
       * Name
       */
      name: string;
      /**
       * Title
       */
      title?: string;
      type: UserAttributeType;
      /**
       * Statistics Interval
       */
      statistics_interval?: string;
      /**
       * Accumulation Interval
       */
      accumulation_interval?: string;
      /**
       * Unspecific
       */
      unspecific: boolean;
      /**
       * Requirement Set Id
       */
      requirement_set_id?: string; // uuid
    }
    /**
     * UserAttributeModel
     */
    export interface UserAttributeModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Date
       */
      date: string; // date-time
      /**
       * Value
       */
      value: string;
      /**
       * Definition Id
       */
      definition_id: string; // uuid
      /**
       * Server Id
       */
      server_id?: string; // uuid
    }
    /**
     * UserAttributeType
     * An enumeration.
     */
    export type UserAttributeType = "NEWEST" | "ACCUMULATED";
    /**
     * UserModel
     */
    export interface UserModel {
      /**
       * Id
       */
      id: string; // uuid
      type: UserType;
      /**
       * Identifier
       */
      identifier: string;
      /**
       * Registered On
       */
      registered_on: string; // date-time
      /**
       * Username
       */
      username?: string;
      /**
       * Avatar
       */
      avatar?: string;
      /**
       * Country Code
       */
      country_code?: string;
      /**
       * Central User Id
       */
      central_user_id?: string; // uuid
      /**
       * Admin
       */
      admin: boolean;
      /**
       * Attributes
       */
      attributes: {
      };
      /**
       * Linked Users
       */
      linked_users: UserModelNoLinked[];
    }
    /**
     * UserModelNoLinked
     */
    export interface UserModelNoLinked {
      /**
       * Id
       */
      id: string; // uuid
      type: UserType;
      /**
       * Identifier
       */
      identifier: string;
      /**
       * Registered On
       */
      registered_on: string; // date-time
      /**
       * Username
       */
      username?: string;
      /**
       * Avatar
       */
      avatar?: string;
      /**
       * Country Code
       */
      country_code?: string;
      /**
       * Central User Id
       */
      central_user_id?: string; // uuid
      /**
       * Admin
       */
      admin: boolean;
      /**
       * Attributes
       */
      attributes: {
      };
    }
    /**
     * UserModelNoLinkedShort
     */
    export interface UserModelNoLinkedShort {
      /**
       * Id
       */
      id: string; // uuid
      type: UserType;
      /**
       * Username
       */
      username: string;
      /**
       * Avatar
       */
      avatar: string;
    }
    /**
     * UserPropertyModel
     */
    export interface UserPropertyModel {
      /**
       * Name
       */
      name: string;
      /**
       * Granted
       */
      granted: boolean;
      /**
       * Value
       */
      value?: string;
      /**
       * Serverbundle Id
       */
      serverbundle_id: string; // uuid
      /**
       * User Id
       */
      user_id: string; // uuid
    }
    /**
     * UserType
     * An enumeration.
     */
    export type UserType = "CENTRAL" | "STEAM";
    /**
     * ValidationError
     */
    export interface ValidationError {
      /**
       * Location
       */
      loc: string[];
      /**
       * Message
       */
      msg: string;
      /**
       * Error Type
       */
      type: string;
    }
  }
}
declare namespace Paths {
  namespace AuthFinish {
    namespace Parameters {
      /**
       * Backend
       */
      export type Backend = string;
    }
    export interface PathParameters {
      backend: Parameters.Backend;
    }
    namespace Responses {
      export type $200 = any;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace AuthGetToken {
    namespace Responses {
      export type $200 = any;
    }
  }
  namespace AuthPrepare {
    namespace Responses {
      export type $200 = any;
    }
  }
  namespace AuthStart {
    namespace Parameters {
      /**
       * Backend
       */
      export type Backend = string;
    }
    export interface PathParameters {
      backend: Parameters.Backend;
    }
    namespace Responses {
      export type $200 = any;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace BanAddBan {
    export type RequestBody = Components.Schemas.BanModelAdd;
    namespace Responses {
      export type $200 = Components.Schemas.BanModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace BanDeleteBan {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      export type $200 = any;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace BanEditBan {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    export type RequestBody = Components.Schemas.BanModelPatch;
    namespace Responses {
      export type $200 = Components.Schemas.BanModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace BanGetBans {
    namespace Responses {
      /**
       * Response Get Bans Ban  Get
       */
      export type $200 = Components.Schemas.BanModel[];
    }
  }
  namespace BanGetLogs {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      /**
       * Response Get Logs Ban  Uuid  Log Get
       */
      export type $200 = Components.Schemas.LogEntryModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace DesignCreateCmsHtml {
    export type RequestBody = Components.Schemas.CmsPageModelPost;
    namespace Responses {
      export type $200 = Components.Schemas.CmsPageModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace DesignGetCmsHtml {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      export type $200 = any;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace DesignGetIcons {
    namespace Parameters {
      /**
       * Query
       */
      export type Query = string;
    }
    export interface QueryParameters {
      query: Parameters.Query;
    }
    namespace Responses {
      export type $200 = any;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace DesignGetNavItems {
    namespace Responses {
      /**
       * Response Get Nav Items Design Nav Get
       */
      export type $200 = Components.Schemas.NavModel[];
    }
  }
  namespace DesignGetTheme {
    namespace Responses {
      export type $200 = Components.Schemas.ThemeModel;
    }
  }
  namespace DesignUpdateCmsHtml {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    export type RequestBody = Components.Schemas.CmsPageModelPost;
    namespace Responses {
      export type $200 = any;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace DesignUpdateNavItems {
    /**
     * Nav Put
     */
    export type RequestBody = Components.Schemas.NavModel[];
    namespace Responses {
      /**
       * Response Update Nav Items Design Nav Put
       */
      export type $200 = Components.Schemas.NavModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace DesignUpdateTheme {
    export type RequestBody = Components.Schemas.ThemeModel;
    namespace Responses {
      export type $200 = Components.Schemas.ThemeModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace GatewayGetGateways {
    namespace Responses {
      /**
       * Response Get Gateways Payment Gateway  Get
       */
      export type $200 = Components.Schemas.PaymentGatewayModel[];
    }
  }
  namespace GroupAddGroup {
    export type RequestBody = Components.Schemas.GroupModelAdd;
    namespace Responses {
      export type $200 = Components.Schemas.GroupModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace GroupDeleteGroup {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      export type $200 = any;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace GroupEditGroup {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    export type RequestBody = Components.Schemas.GroupModelPatch;
    namespace Responses {
      export type $200 = Components.Schemas.GroupModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace GroupGetGroup {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      export type $200 = Components.Schemas.GroupModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace GroupGetGroups {
    namespace Parameters {
      /**
       * Serverbundle Id
       */
      export type ServerbundleId = string; // uuid
      export type Type = Components.Schemas.ServerType;
    }
    export interface QueryParameters {
      type?: Parameters.Type;
      serverbundle_id?: Parameters.ServerbundleId; // uuid
    }
    namespace Responses {
      /**
       * Response Get Groups Group  Get
       */
      export type $200 = Components.Schemas.GroupModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace NewsAddMessage {
    export type RequestBody = Components.Schemas.NewsModelPost;
    namespace Responses {
      export type $200 = Components.Schemas.NewsModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace NewsDeleteMessage {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      export type $200 = any;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace NewsEditMessage {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    export type RequestBody = Components.Schemas.NewsModelPatch;
    namespace Responses {
      export type $200 = Components.Schemas.NewsModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace NewsGetMessages {
    namespace Parameters {
      /**
       * Page
       */
      export type Page = number;
      /**
       * Size
       */
      export type Size = number;
    }
    export interface QueryParameters {
      page?: Parameters.Page;
      size?: Parameters.Size;
    }
    namespace Responses {
      export type $200 = Components.Schemas.PageNewsModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace PacketAddPacket {
    export type RequestBody = Components.Schemas.PacketModelAdd;
    namespace Responses {
      export type $200 = Components.Schemas.PacketModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace PacketAddReward {
    export type RequestBody = Components.Schemas.RewardModelAdd;
    namespace Responses {
      export type $200 = Components.Schemas.RewardModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace PacketDeletePacket {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      export type $200 = Components.Schemas.SuccessModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace PacketDeleteReward {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      export type $200 = Components.Schemas.SuccessModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace PacketEditPacket {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    export type RequestBody = Components.Schemas.PacketModelPatch;
    namespace Responses {
      export type $200 = Components.Schemas.PacketModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace PacketEditReward {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    export type RequestBody = Components.Schemas.RewardModelPatch;
    namespace Responses {
      export type $200 = Components.Schemas.RewardModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace PacketGetAppliedPackets {
    namespace Responses {
      /**
       * Response Get Applied Packets Packet Applied Get
       */
      export type $200 = Components.Schemas.AppliedPacketModel[];
    }
  }
  namespace PacketGetCategories {
    namespace Responses {
      /**
       * Response Get Categories Packet Category Get
       */
      export type $200 = Components.Schemas.PacketCategoryModel[];
    }
  }
  namespace PacketGetPackets {
    namespace Responses {
      /**
       * Response Get Packets Packet  Get
       */
      export type $200 = Components.Schemas.PacketModel[];
    }
  }
  namespace PacketGetRewards {
    namespace Parameters {
      /**
       * Query
       * Filter by rewards by name
       */
      export type Query = string;
    }
    export interface QueryParameters {
      query?: Parameters.Query;
    }
    namespace Responses {
      /**
       * Response Get Rewards Packet Reward Get
       */
      export type $200 = Components.Schemas.RewardModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace RequirementsCreateRequirement {
    export type RequestBody = Components.Schemas.RequirementModelAdd;
    namespace Responses {
      export type $200 = Components.Schemas.RequirementModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace RequirementsCreateRequirementSet {
    export type RequestBody = Components.Schemas.RequirementSetModelAdd;
    namespace Responses {
      export type $200 = Components.Schemas.RequirementSetModelAdd;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace RequirementsGetRequirementSets {
    namespace Responses {
      /**
       * Response Get Requirement Sets Requirement Set Get
       */
      export type $200 = Components.Schemas.RequirementSetModel[];
    }
  }
  namespace RequirementsGetRequirementTypes {
    namespace Responses {
      export type $200 = any;
    }
  }
  namespace RequirementsGetRequirements {
    namespace Responses {
      /**
       * Response Get Requirements Requirement  Get
       */
      export type $200 = Components.Schemas.RequirementModel[];
    }
  }
  namespace ServerAddBundle {
    export type RequestBody = Components.Schemas.ServerbundleModelAdd;
    namespace Responses {
      export type $200 = Components.Schemas.ServerbundleModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ServerDeleteBundle {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      export type $200 = any;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ServerEditBundle {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    export type RequestBody = Components.Schemas.ServerBundleModelPatch;
    namespace Responses {
      export type $200 = any;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ServerGetAllBundles {
    namespace Responses {
      /**
       * Response Get All Bundles Server Bundle  Get
       */
      export type $200 = Components.Schemas.ServerbundleModel[];
    }
  }
  namespace ServerGetGroups {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      /**
       * Response Get Groups Server Bundle  Uuid  Group Get
       */
      export type $200 = Components.Schemas.GroupModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ServerGetServer {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      /**
       * Response Get Server Server Bundle  Uuid  Server Get
       */
      export type $200 = Components.Schemas.ServerModelShort[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ServerGetServerTypes {
    namespace Responses {
      export type $200 = any;
    }
  }
  namespace ServerGetServers {
    namespace Parameters {
      export type Type = Components.Schemas.ServerType;
    }
    export interface QueryParameters {
      type?: Parameters.Type;
    }
    namespace Responses {
      /**
       * Response Get Servers Server  Get
       */
      export type $200 = Components.Schemas.ServerModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopAddPacketToCart {
    export type RequestBody = Components.Schemas.UUIDModel;
    namespace Responses {
      export type $200 = Components.Schemas.CartPacketModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopApplyDiscount {
    namespace Parameters {
      /**
       * Code Or Uuid
       * Discount id or code
       */
      export type CodeOrUuid = string;
    }
    export interface PathParameters {
      code_or_uuid: Parameters.CodeOrUuid;
    }
    namespace Responses {
      export type $200 = Components.Schemas.SuccessModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopCancelPayment {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      export type $200 = Components.Schemas.DebitModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopCheckPayment {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      export type $200 = Components.Schemas.DebitModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopEditPurchase {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    /**
     * PurchaseModelPatch
     * Only status can be changed.
     */
    export interface RequestBody {
      /**
       * Id
       */
      id?: string; // uuid
      /**
       * Date
       */
      date?: string; // date-time
      user?: Components.Schemas.Model_User_User_UserModelShort;
      /**
       * Amount Total
       */
      amount_total?: number;
      currency?: Components.Schemas.CurrencyModel;
      status?: Components.Schemas.PurchaseStatus;
      /**
       * Credits
       */
      credits?: number;
    }
    namespace Responses {
      export type $200 = Components.Schemas.PurchaseModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopGetCart {
    namespace Parameters {
      /**
       * Country Code
       * Country for price calculation
       */
      export type CountryCode = string;
    }
    export interface QueryParameters {
      country_code?: Parameters.CountryCode;
    }
    namespace Responses {
      export type $200 = Components.Schemas.CartModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopGetDebitInvoice {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      export type $200 = any;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopGetDiscount {
    namespace Parameters {
      /**
       * Code Or Uuid
       * Discount id or code
       */
      export type CodeOrUuid = string;
    }
    export interface PathParameters {
      code_or_uuid: Parameters.CodeOrUuid;
    }
    namespace Responses {
      export type $200 = Components.Schemas.DiscountModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopGetPackets {
    namespace Parameters {
      /**
       * Category Id
       * Filter by category
       */
      export type CategoryId = string; // uuid
      /**
       * Country Code
       * Country for price calculation
       */
      export type CountryCode = string;
    }
    export interface QueryParameters {
      category_id?: Parameters.CategoryId; // uuid
      country_code?: Parameters.CountryCode;
    }
    namespace Responses {
      /**
       * Response Get Packets Shop Packet Get
       */
      export type $200 = Components.Schemas.PacketModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopGetPurchaseGateways {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      /**
       * Response Get Purchase Gateways Shop Purchase  Uuid  Gateway Get
       */
      export type $200 = Components.Schemas.PaymentGatewayModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopGetPurchases {
    namespace Responses {
      /**
       * Response Get Purchases Shop Purchase Get
       */
      export type $200 = Components.Schemas.PurchaseModel[];
    }
  }
  namespace ShopRemoveDiscount {
    namespace Parameters {
      /**
       * Code Or Uuid
       * Discount id or code
       */
      export type CodeOrUuid = string;
    }
    export interface PathParameters {
      code_or_uuid: Parameters.CodeOrUuid;
    }
    namespace Responses {
      export type $200 = Components.Schemas.SuccessModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopRemovePacketFromCart {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      export type $200 = Components.Schemas.SuccessModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopRemovePacketsFromCart {
    namespace Responses {
      export type $200 = Components.Schemas.SuccessModel;
    }
  }
  namespace ShopStartCheckout {
    export type RequestBody = Components.Schemas.UUIDModel;
    namespace Responses {
      export type $200 = Components.Schemas.PurchaseModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopStartPayment {
    export type RequestBody = Components.Schemas.BodyStartPaymentShopCheckoutPost;
    namespace Responses {
      export type $200 = Components.Schemas.StartPaymentModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace UserAddAddress {
    export type RequestBody = Components.Schemas.AddressModelAdd;
    namespace Responses {
      export type $200 = Components.Schemas.AddressModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace UserAddMembership {
    namespace Parameters {
      /**
       * Uuid
       * The UUID or username of the referenced user.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    export type RequestBody = Components.Schemas.MembershipModelUserAdd;
    namespace Responses {
      export type $200 = Components.Schemas.MembershipModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace UserGetActiveGroups {
    namespace Parameters {
      /**
       * Uuid
       * The UUID or username of the referenced user.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      /**
       * Response Get Active Groups User  Uuid  Group Get
       */
      export type $200 = Components.Schemas.GroupModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace UserGetAddress {
    namespace Parameters {
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      export type $200 = Components.Schemas.AddressModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace UserGetAddresses {
    namespace Parameters {
      /**
       * Uuid
       * The UUID or username of the referenced user.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      /**
       * Response Get Addresses User  Uuid  Address Get
       */
      export type $200 = Components.Schemas.AddressModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace UserGetAttributeDefinitions {
    namespace Responses {
      /**
       * Response Get Attribute Definitions User Attribute Definition Get
       */
      export type $200 = Components.Schemas.UserAttributeDefinitionModel[];
    }
  }
  namespace UserGetAttributeHistory {
    namespace Parameters {
      /**
       * Attribute Name
       */
      export type AttributeName = string;
      /**
       * Uuid
       * The UUID or username of the referenced user.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      attribute_name: Parameters.AttributeName;
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      /**
       * Response Get Attribute History User  Uuid  Attribute  Attribute Name  Get
       */
      export type $200 = Components.Schemas.UserAttributeModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace UserGetCurrentData {
    namespace Responses {
      export type $200 = any;
    }
  }
  namespace UserGetCurrentProperties {
    namespace Parameters {
      /**
       * Uuid
       * The UUID or username of the referenced user.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      /**
       * Response Get Current Properties User  Uuid  Property Get
       */
      export type $200 = Components.Schemas.UserPropertyModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace UserGetData {
    namespace Parameters {
      /**
       * Uuid
       * The UUID or username of the referenced user.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      export type $200 = Components.Schemas.UserModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace UserGetMemberships {
    namespace Parameters {
      /**
       * Uuid
       * The UUID or username of the referenced user.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      /**
       * Response Get Memberships User  Uuid  Membership Get
       */
      export type $200 = Components.Schemas.MembershipModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace UserGetPackets {
    namespace Parameters {
      /**
       * Uuid
       * The UUID or username of the referenced user.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      /**
       * Response Get Packets User  Uuid  Packet Get
       */
      export type $200 = Components.Schemas.AppliedPacketModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace UserGetPurchases {
    namespace Parameters {
      /**
       * Cancelled
       * Include cancelled purchases.
       */
      export type Cancelled = boolean;
      /**
       * Uuid
       * The UUID or username of the referenced user.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    export interface QueryParameters {
      cancelled?: Parameters.Cancelled;
    }
    namespace Responses {
      /**
       * Response Get Purchases User  Uuid  Purchase Get
       */
      export type $200 = Components.Schemas.PurchaseModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace UserGetUnauthProperties {
    namespace Responses {
      /**
       * Response Get Unauth Properties User Property  Get
       */
      export type $200 = Components.Schemas.PropertyModel[];
    }
  }
  namespace UserGetUsers {
    namespace Parameters {
      /**
       * Max
       * Maximum results
       */
      export type Max = number;
      /**
       * Query
       * User-ID, external identifier or keyword that the username must include
       */
      export type Query = string;
    }
    export interface QueryParameters {
      query?: Parameters.Query;
      max?: Parameters.Max;
    }
    namespace Responses {
      /**
       * Response Get Users User  Get
       */
      export type $200 = Components.Schemas.Model_User_User_UserModelShort[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
}

export interface OperationMethods {
  /**
   * design_getNavItems - Get Nav Items
   */
  'design_getNavItems'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DesignGetNavItems.Responses.$200>
  /**
   * design_updateNavItems - Update Nav Items
   */
  'design_updateNavItems'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DesignUpdateNavItems.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DesignUpdateNavItems.Responses.$200 | Paths.DesignUpdateNavItems.Responses.$422>
  /**
   * design_createCmsHtml - Create Cms Html
   */
  'design_createCmsHtml'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DesignCreateCmsHtml.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DesignCreateCmsHtml.Responses.$200 | Paths.DesignCreateCmsHtml.Responses.$422>
  /**
   * design_getCmsHtml - Get Cms Html
   */
  'design_getCmsHtml'(
    parameters?: Parameters<Paths.DesignGetCmsHtml.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DesignGetCmsHtml.Responses.$200 | Paths.DesignGetCmsHtml.Responses.$422>
  /**
   * design_updateCmsHtml - Update Cms Html
   */
  'design_updateCmsHtml'(
    parameters?: Parameters<Paths.DesignUpdateCmsHtml.PathParameters> | null,
    data?: Paths.DesignUpdateCmsHtml.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DesignUpdateCmsHtml.Responses.$200 | Paths.DesignUpdateCmsHtml.Responses.$422>
  /**
   * design_getTheme - Get Theme
   */
  'design_getTheme'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DesignGetTheme.Responses.$200>
  /**
   * design_updateTheme - Update Theme
   */
  'design_updateTheme'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DesignUpdateTheme.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DesignUpdateTheme.Responses.$200 | Paths.DesignUpdateTheme.Responses.$422>
  /**
   * design_getIcons - Get Icons
   */
  'design_getIcons'(
    parameters?: Parameters<Paths.DesignGetIcons.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DesignGetIcons.Responses.$200 | Paths.DesignGetIcons.Responses.$422>
  /**
   * auth_getToken - Get Token
   */
  'auth_getToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthGetToken.Responses.$200>
  /**
   * auth_prepare - Prepare
   */
  'auth_prepare'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthPrepare.Responses.$200>
  /**
   * auth_start - Start
   */
  'auth_start'(
    parameters?: Parameters<Paths.AuthStart.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthStart.Responses.$200 | Paths.AuthStart.Responses.$422>
  /**
   * auth_finish - Finish
   */
  'auth_finish'(
    parameters?: Parameters<Paths.AuthFinish.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthFinish.Responses.$200 | Paths.AuthFinish.Responses.$422>
  /**
   * auth_finish - Finish
   */
  'auth_finish'(
    parameters?: Parameters<Paths.AuthFinish.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthFinish.Responses.$200 | Paths.AuthFinish.Responses.$422>
  /**
   * user_getCurrentData - Get Current Data
   */
  'user_getCurrentData'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetCurrentData.Responses.$200>
  /**
   * user_getData - Get Data
   */
  'user_getData'(
    parameters?: Parameters<Paths.UserGetData.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetData.Responses.$200 | Paths.UserGetData.Responses.$422>
  /**
   * user_getAttributeHistory - Get Attribute History
   */
  'user_getAttributeHistory'(
    parameters?: Parameters<Paths.UserGetAttributeHistory.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetAttributeHistory.Responses.$200 | Paths.UserGetAttributeHistory.Responses.$422>
  /**
   * user_getAttributeDefinitions - Get Attribute Definitions
   */
  'user_getAttributeDefinitions'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetAttributeDefinitions.Responses.$200>
  /**
   * user_getMemberships - Get Memberships
   * 
   * Returns all memberships of the given and all linked users.
   */
  'user_getMemberships'(
    parameters?: Parameters<Paths.UserGetMemberships.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetMemberships.Responses.$200 | Paths.UserGetMemberships.Responses.$422>
  /**
   * user_addMembership - Add Membership
   */
  'user_addMembership'(
    parameters?: Parameters<Paths.UserAddMembership.PathParameters> | null,
    data?: Paths.UserAddMembership.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAddMembership.Responses.$200 | Paths.UserAddMembership.Responses.$422>
  /**
   * user_getActiveGroups - Get Active Groups
   * 
   * Returns all active groups.
   */
  'user_getActiveGroups'(
    parameters?: Parameters<Paths.UserGetActiveGroups.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetActiveGroups.Responses.$200 | Paths.UserGetActiveGroups.Responses.$422>
  /**
   * user_getPackets - Get Packets
   * 
   * Returns all user packets of the given and all linked users.
   */
  'user_getPackets'(
    parameters?: Parameters<Paths.UserGetPackets.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetPackets.Responses.$200 | Paths.UserGetPackets.Responses.$422>
  /**
   * user_getUsers - Get Users
   */
  'user_getUsers'(
    parameters?: Parameters<Paths.UserGetUsers.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetUsers.Responses.$200 | Paths.UserGetUsers.Responses.$422>
  /**
   * user_getCurrentProperties - Get Current Properties
   * 
   * Returns all current properties of the given and all linked users.
   */
  'user_getCurrentProperties'(
    parameters?: Parameters<Paths.UserGetCurrentProperties.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetCurrentProperties.Responses.$200 | Paths.UserGetCurrentProperties.Responses.$422>
  /**
   * user_getUnauthProperties - Get Unauth Properties
   * 
   * Returns all properties that are available without authentification.
   */
  'user_getUnauthProperties'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetUnauthProperties.Responses.$200>
  /**
   * user_getPurchases - Get Purchases
   */
  'user_getPurchases'(
    parameters?: Parameters<Paths.UserGetPurchases.PathParameters & Paths.UserGetPurchases.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetPurchases.Responses.$200 | Paths.UserGetPurchases.Responses.$422>
  /**
   * user_getAddress - Get Address
   */
  'user_getAddress'(
    parameters?: Parameters<Paths.UserGetAddress.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetAddress.Responses.$200 | Paths.UserGetAddress.Responses.$422>
  /**
   * user_addAddress - Add Address
   */
  'user_addAddress'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UserAddAddress.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAddAddress.Responses.$200 | Paths.UserAddAddress.Responses.$422>
  /**
   * user_getAddresses - Get Addresses
   */
  'user_getAddresses'(
    parameters?: Parameters<Paths.UserGetAddresses.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetAddresses.Responses.$200 | Paths.UserGetAddresses.Responses.$422>
  /**
   * server_getAllBundles - Get All Bundles
   */
  'server_getAllBundles'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetAllBundles.Responses.$200>
  /**
   * server_addBundle - Add Bundle
   */
  'server_addBundle'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ServerAddBundle.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerAddBundle.Responses.$200 | Paths.ServerAddBundle.Responses.$422>
  /**
   * server_getGroups - Get Groups
   */
  'server_getGroups'(
    parameters?: Parameters<Paths.ServerGetGroups.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetGroups.Responses.$200 | Paths.ServerGetGroups.Responses.$422>
  /**
   * server_getServer - Get Server
   */
  'server_getServer'(
    parameters?: Parameters<Paths.ServerGetServer.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetServer.Responses.$200 | Paths.ServerGetServer.Responses.$422>
  /**
   * server_editBundle - Edit Bundle
   */
  'server_editBundle'(
    parameters?: Parameters<Paths.ServerEditBundle.PathParameters> | null,
    data?: Paths.ServerEditBundle.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerEditBundle.Responses.$200 | Paths.ServerEditBundle.Responses.$422>
  /**
   * server_deleteBundle - Delete Bundle
   */
  'server_deleteBundle'(
    parameters?: Parameters<Paths.ServerDeleteBundle.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerDeleteBundle.Responses.$200 | Paths.ServerDeleteBundle.Responses.$422>
  /**
   * server_getServerTypes - Get Server Types
   */
  'server_getServerTypes'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetServerTypes.Responses.$200>
  /**
   * server_getServers - Get Servers
   */
  'server_getServers'(
    parameters?: Parameters<Paths.ServerGetServers.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetServers.Responses.$200 | Paths.ServerGetServers.Responses.$422>
  /**
   * server_deleteBundle - Delete Bundle
   */
  'server_deleteBundle'(
    parameters?: Parameters<Paths.ServerDeleteBundle.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerDeleteBundle.Responses.$200 | Paths.ServerDeleteBundle.Responses.$422>
  /**
   * group_getGroups - Get Groups
   */
  'group_getGroups'(
    parameters?: Parameters<Paths.GroupGetGroups.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupGetGroups.Responses.$200 | Paths.GroupGetGroups.Responses.$422>
  /**
   * group_addGroup - Add Group
   */
  'group_addGroup'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GroupAddGroup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupAddGroup.Responses.$200 | Paths.GroupAddGroup.Responses.$422>
  /**
   * group_getGroup - Get Group
   */
  'group_getGroup'(
    parameters?: Parameters<Paths.GroupGetGroup.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupGetGroup.Responses.$200 | Paths.GroupGetGroup.Responses.$422>
  /**
   * group_editGroup - Edit Group
   */
  'group_editGroup'(
    parameters?: Parameters<Paths.GroupEditGroup.PathParameters> | null,
    data?: Paths.GroupEditGroup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupEditGroup.Responses.$200 | Paths.GroupEditGroup.Responses.$422>
  /**
   * group_deleteGroup - Delete Group
   */
  'group_deleteGroup'(
    parameters?: Parameters<Paths.GroupDeleteGroup.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupDeleteGroup.Responses.$200 | Paths.GroupDeleteGroup.Responses.$422>
  /**
   * ban_getBans - Get Bans
   */
  'ban_getBans'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanGetBans.Responses.$200>
  /**
   * ban_addBan - Add Ban
   */
  'ban_addBan'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.BanAddBan.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanAddBan.Responses.$200 | Paths.BanAddBan.Responses.$422>
  /**
   * ban_editBan - Edit Ban
   */
  'ban_editBan'(
    parameters?: Parameters<Paths.BanEditBan.PathParameters> | null,
    data?: Paths.BanEditBan.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanEditBan.Responses.$200 | Paths.BanEditBan.Responses.$422>
  /**
   * ban_deleteBan - Delete Ban
   */
  'ban_deleteBan'(
    parameters?: Parameters<Paths.BanDeleteBan.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanDeleteBan.Responses.$200 | Paths.BanDeleteBan.Responses.$422>
  /**
   * ban_getLogs - Get Logs
   */
  'ban_getLogs'(
    parameters?: Parameters<Paths.BanGetLogs.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanGetLogs.Responses.$200 | Paths.BanGetLogs.Responses.$422>
  /**
   * shop_getPackets - Get Packets
   * 
   * Returns all packets (in the given category) and does price calculation.
   */
  'shop_getPackets'(
    parameters?: Parameters<Paths.ShopGetPackets.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetPackets.Responses.$200 | Paths.ShopGetPackets.Responses.$422>
  /**
   * shop_getCart - Get Cart
   * 
   * Return cart items and price calculation.
   */
  'shop_getCart'(
    parameters?: Parameters<Paths.ShopGetCart.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetCart.Responses.$200 | Paths.ShopGetCart.Responses.$422>
  /**
   * shop_addPacketToCart - Add Packet To Cart
   */
  'shop_addPacketToCart'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ShopAddPacketToCart.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopAddPacketToCart.Responses.$200 | Paths.ShopAddPacketToCart.Responses.$422>
  /**
   * shop_removePacketsFromCart - Remove Packets From Cart
   */
  'shop_removePacketsFromCart'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopRemovePacketsFromCart.Responses.$200>
  /**
   * shop_getCart - Get Cart
   */
  'shop_getCart'(
    parameters?: Parameters<Paths.ShopGetCart.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetCart.Responses.$200 | Paths.ShopGetCart.Responses.$422>
  /**
   * shop_removePacketFromCart - Remove Packet From Cart
   */
  'shop_removePacketFromCart'(
    parameters?: Parameters<Paths.ShopRemovePacketFromCart.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopRemovePacketFromCart.Responses.$200 | Paths.ShopRemovePacketFromCart.Responses.$422>
  /**
   * shop_applyDiscount - Apply Discount
   */
  'shop_applyDiscount'(
    parameters?: Parameters<Paths.ShopApplyDiscount.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopApplyDiscount.Responses.$200 | Paths.ShopApplyDiscount.Responses.$422>
  /**
   * shop_removeDiscount - Remove Discount
   */
  'shop_removeDiscount'(
    parameters?: Parameters<Paths.ShopRemoveDiscount.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopRemoveDiscount.Responses.$200 | Paths.ShopRemoveDiscount.Responses.$422>
  /**
   * shop_startCheckout - Start Checkout
   */
  'shop_startCheckout'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ShopStartCheckout.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopStartCheckout.Responses.$200 | Paths.ShopStartCheckout.Responses.$422>
  /**
   * shop_startPayment - Start Payment
   */
  'shop_startPayment'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ShopStartPayment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopStartPayment.Responses.$200 | Paths.ShopStartPayment.Responses.$422>
  /**
   * shop_checkPayment - Check Payment
   */
  'shop_checkPayment'(
    parameters?: Parameters<Paths.ShopCheckPayment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopCheckPayment.Responses.$200 | Paths.ShopCheckPayment.Responses.$422>
  /**
   * shop_cancelPayment - Cancel Payment
   */
  'shop_cancelPayment'(
    parameters?: Parameters<Paths.ShopCancelPayment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopCancelPayment.Responses.$200 | Paths.ShopCancelPayment.Responses.$422>
  /**
   * shop_getPurchases - Get Purchases
   */
  'shop_getPurchases'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetPurchases.Responses.$200>
  /**
   * shop_getDiscount - Get Discount
   * 
   * Get discount by UUID or code.
   */
  'shop_getDiscount'(
    parameters?: Parameters<Paths.ShopGetDiscount.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetDiscount.Responses.$200 | Paths.ShopGetDiscount.Responses.$422>
  /**
   * shop_getPurchaseGateways - Get Purchase Gateways
   */
  'shop_getPurchaseGateways'(
    parameters?: Parameters<Paths.ShopGetPurchaseGateways.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetPurchaseGateways.Responses.$200 | Paths.ShopGetPurchaseGateways.Responses.$422>
  /**
   * shop_editPurchase - Edit Purchase
   */
  'shop_editPurchase'(
    parameters?: Parameters<Paths.ShopEditPurchase.PathParameters> | null,
    data?: Paths.ShopEditPurchase.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopEditPurchase.Responses.$200 | Paths.ShopEditPurchase.Responses.$422>
  /**
   * shop_getDebitInvoice - Get Debit Invoice
   */
  'shop_getDebitInvoice'(
    parameters?: Parameters<Paths.ShopGetDebitInvoice.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetDebitInvoice.Responses.$200 | Paths.ShopGetDebitInvoice.Responses.$422>
  /**
   * packet_getCategories - Get Categories
   */
  'packet_getCategories'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketGetCategories.Responses.$200>
  /**
   * packet_getPackets - Get Packets
   */
  'packet_getPackets'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketGetPackets.Responses.$200>
  /**
   * packet_addPacket - Add Packet
   */
  'packet_addPacket'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PacketAddPacket.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketAddPacket.Responses.$200 | Paths.PacketAddPacket.Responses.$422>
  /**
   * packet_editPacket - Edit Packet
   */
  'packet_editPacket'(
    parameters?: Parameters<Paths.PacketEditPacket.PathParameters> | null,
    data?: Paths.PacketEditPacket.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketEditPacket.Responses.$200 | Paths.PacketEditPacket.Responses.$422>
  /**
   * packet_deletePacket - Delete Packet
   */
  'packet_deletePacket'(
    parameters?: Parameters<Paths.PacketDeletePacket.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketDeletePacket.Responses.$200 | Paths.PacketDeletePacket.Responses.$422>
  /**
   * packet_getRewards - Get Rewards
   */
  'packet_getRewards'(
    parameters?: Parameters<Paths.PacketGetRewards.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketGetRewards.Responses.$200 | Paths.PacketGetRewards.Responses.$422>
  /**
   * packet_addReward - Add Reward
   */
  'packet_addReward'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PacketAddReward.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketAddReward.Responses.$200 | Paths.PacketAddReward.Responses.$422>
  /**
   * packet_editReward - Edit Reward
   */
  'packet_editReward'(
    parameters?: Parameters<Paths.PacketEditReward.PathParameters> | null,
    data?: Paths.PacketEditReward.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketEditReward.Responses.$200 | Paths.PacketEditReward.Responses.$422>
  /**
   * packet_deleteReward - Delete Reward
   */
  'packet_deleteReward'(
    parameters?: Parameters<Paths.PacketDeleteReward.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketDeleteReward.Responses.$200 | Paths.PacketDeleteReward.Responses.$422>
  /**
   * packet_getAppliedPackets - Get Applied Packets
   */
  'packet_getAppliedPackets'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketGetAppliedPackets.Responses.$200>
  /**
   * gateway_getGateways - Get Gateways
   */
  'gateway_getGateways'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GatewayGetGateways.Responses.$200>
  /**
   * news_getMessages - Get Messages
   */
  'news_getMessages'(
    parameters?: Parameters<Paths.NewsGetMessages.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NewsGetMessages.Responses.$200 | Paths.NewsGetMessages.Responses.$422>
  /**
   * news_addMessage - Add Message
   */
  'news_addMessage'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.NewsAddMessage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NewsAddMessage.Responses.$200 | Paths.NewsAddMessage.Responses.$422>
  /**
   * news_editMessage - Edit Message
   */
  'news_editMessage'(
    parameters?: Parameters<Paths.NewsEditMessage.PathParameters> | null,
    data?: Paths.NewsEditMessage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NewsEditMessage.Responses.$200 | Paths.NewsEditMessage.Responses.$422>
  /**
   * news_deleteMessage - Delete Message
   */
  'news_deleteMessage'(
    parameters?: Parameters<Paths.NewsDeleteMessage.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NewsDeleteMessage.Responses.$200 | Paths.NewsDeleteMessage.Responses.$422>
  /**
   * requirements_getRequirementTypes - Get Requirement Types
   */
  'requirements_getRequirementTypes'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequirementsGetRequirementTypes.Responses.$200>
  /**
   * requirements_getRequirementSets - Get Requirement Sets
   */
  'requirements_getRequirementSets'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequirementsGetRequirementSets.Responses.$200>
  /**
   * requirements_createRequirementSet - Create Requirement Set
   */
  'requirements_createRequirementSet'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RequirementsCreateRequirementSet.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequirementsCreateRequirementSet.Responses.$200 | Paths.RequirementsCreateRequirementSet.Responses.$422>
  /**
   * requirements_getRequirements - Get Requirements
   */
  'requirements_getRequirements'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequirementsGetRequirements.Responses.$200>
  /**
   * requirements_createRequirement - Create Requirement
   */
  'requirements_createRequirement'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RequirementsCreateRequirement.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequirementsCreateRequirement.Responses.$200 | Paths.RequirementsCreateRequirement.Responses.$422>
}

export interface PathsDictionary {
  ['/design/nav']: {
    /**
     * design_getNavItems - Get Nav Items
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DesignGetNavItems.Responses.$200>
    /**
     * design_updateNavItems - Update Nav Items
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DesignUpdateNavItems.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DesignUpdateNavItems.Responses.$200 | Paths.DesignUpdateNavItems.Responses.$422>
  }
  ['/design/html']: {
    /**
     * design_createCmsHtml - Create Cms Html
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DesignCreateCmsHtml.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DesignCreateCmsHtml.Responses.$200 | Paths.DesignCreateCmsHtml.Responses.$422>
  }
  ['/design/html/{uuid}']: {
    /**
     * design_getCmsHtml - Get Cms Html
     */
    'get'(
      parameters?: Parameters<Paths.DesignGetCmsHtml.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DesignGetCmsHtml.Responses.$200 | Paths.DesignGetCmsHtml.Responses.$422>
    /**
     * design_updateCmsHtml - Update Cms Html
     */
    'patch'(
      parameters?: Parameters<Paths.DesignUpdateCmsHtml.PathParameters> | null,
      data?: Paths.DesignUpdateCmsHtml.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DesignUpdateCmsHtml.Responses.$200 | Paths.DesignUpdateCmsHtml.Responses.$422>
  }
  ['/design/theme']: {
    /**
     * design_getTheme - Get Theme
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DesignGetTheme.Responses.$200>
    /**
     * design_updateTheme - Update Theme
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DesignUpdateTheme.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DesignUpdateTheme.Responses.$200 | Paths.DesignUpdateTheme.Responses.$422>
  }
  ['/design/icons']: {
    /**
     * design_getIcons - Get Icons
     */
    'get'(
      parameters?: Parameters<Paths.DesignGetIcons.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DesignGetIcons.Responses.$200 | Paths.DesignGetIcons.Responses.$422>
  }
  ['/auth/token']: {
    /**
     * auth_getToken - Get Token
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthGetToken.Responses.$200>
  }
  ['/auth/social/prepare']: {
    /**
     * auth_prepare - Prepare
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthPrepare.Responses.$200>
  }
  ['/auth/social/{backend}/start']: {
    /**
     * auth_start - Start
     */
    'get'(
      parameters?: Parameters<Paths.AuthStart.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthStart.Responses.$200 | Paths.AuthStart.Responses.$422>
  }
  ['/auth/social/{backend}/finish']: {
    /**
     * auth_finish - Finish
     */
    'get'(
      parameters?: Parameters<Paths.AuthFinish.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthFinish.Responses.$200 | Paths.AuthFinish.Responses.$422>
    /**
     * auth_finish - Finish
     */
    'post'(
      parameters?: Parameters<Paths.AuthFinish.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthFinish.Responses.$200 | Paths.AuthFinish.Responses.$422>
  }
  ['/user/current']: {
    /**
     * user_getCurrentData - Get Current Data
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetCurrentData.Responses.$200>
  }
  ['/user/{uuid}']: {
    /**
     * user_getData - Get Data
     */
    'get'(
      parameters?: Parameters<Paths.UserGetData.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetData.Responses.$200 | Paths.UserGetData.Responses.$422>
  }
  ['/user/{uuid}/attribute/{attribute_name}']: {
    /**
     * user_getAttributeHistory - Get Attribute History
     */
    'get'(
      parameters?: Parameters<Paths.UserGetAttributeHistory.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetAttributeHistory.Responses.$200 | Paths.UserGetAttributeHistory.Responses.$422>
  }
  ['/user/attribute/definition']: {
    /**
     * user_getAttributeDefinitions - Get Attribute Definitions
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetAttributeDefinitions.Responses.$200>
  }
  ['/user/{uuid}/membership']: {
    /**
     * user_getMemberships - Get Memberships
     * 
     * Returns all memberships of the given and all linked users.
     */
    'get'(
      parameters?: Parameters<Paths.UserGetMemberships.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetMemberships.Responses.$200 | Paths.UserGetMemberships.Responses.$422>
    /**
     * user_addMembership - Add Membership
     */
    'post'(
      parameters?: Parameters<Paths.UserAddMembership.PathParameters> | null,
      data?: Paths.UserAddMembership.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAddMembership.Responses.$200 | Paths.UserAddMembership.Responses.$422>
  }
  ['/user/{uuid}/group']: {
    /**
     * user_getActiveGroups - Get Active Groups
     * 
     * Returns all active groups.
     */
    'get'(
      parameters?: Parameters<Paths.UserGetActiveGroups.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetActiveGroups.Responses.$200 | Paths.UserGetActiveGroups.Responses.$422>
  }
  ['/user/{uuid}/packet']: {
    /**
     * user_getPackets - Get Packets
     * 
     * Returns all user packets of the given and all linked users.
     */
    'get'(
      parameters?: Parameters<Paths.UserGetPackets.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetPackets.Responses.$200 | Paths.UserGetPackets.Responses.$422>
  }
  ['/user/']: {
    /**
     * user_getUsers - Get Users
     */
    'get'(
      parameters?: Parameters<Paths.UserGetUsers.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetUsers.Responses.$200 | Paths.UserGetUsers.Responses.$422>
  }
  ['/user/{uuid}/property']: {
    /**
     * user_getCurrentProperties - Get Current Properties
     * 
     * Returns all current properties of the given and all linked users.
     */
    'get'(
      parameters?: Parameters<Paths.UserGetCurrentProperties.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetCurrentProperties.Responses.$200 | Paths.UserGetCurrentProperties.Responses.$422>
  }
  ['/user/property/']: {
    /**
     * user_getUnauthProperties - Get Unauth Properties
     * 
     * Returns all properties that are available without authentification.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetUnauthProperties.Responses.$200>
  }
  ['/user/{uuid}/purchase']: {
    /**
     * user_getPurchases - Get Purchases
     */
    'get'(
      parameters?: Parameters<Paths.UserGetPurchases.PathParameters & Paths.UserGetPurchases.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetPurchases.Responses.$200 | Paths.UserGetPurchases.Responses.$422>
  }
  ['/user/address/{uuid}']: {
    /**
     * user_getAddress - Get Address
     */
    'get'(
      parameters?: Parameters<Paths.UserGetAddress.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetAddress.Responses.$200 | Paths.UserGetAddress.Responses.$422>
  }
  ['/user/address']: {
    /**
     * user_addAddress - Add Address
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UserAddAddress.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAddAddress.Responses.$200 | Paths.UserAddAddress.Responses.$422>
  }
  ['/user/{uuid}/address']: {
    /**
     * user_getAddresses - Get Addresses
     */
    'get'(
      parameters?: Parameters<Paths.UserGetAddresses.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetAddresses.Responses.$200 | Paths.UserGetAddresses.Responses.$422>
  }
  ['/server/bundle/']: {
    /**
     * server_getAllBundles - Get All Bundles
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetAllBundles.Responses.$200>
    /**
     * server_addBundle - Add Bundle
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ServerAddBundle.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerAddBundle.Responses.$200 | Paths.ServerAddBundle.Responses.$422>
  }
  ['/server/bundle/{uuid}/group']: {
    /**
     * server_getGroups - Get Groups
     */
    'get'(
      parameters?: Parameters<Paths.ServerGetGroups.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetGroups.Responses.$200 | Paths.ServerGetGroups.Responses.$422>
  }
  ['/server/bundle/{uuid}/server']: {
    /**
     * server_getServer - Get Server
     */
    'get'(
      parameters?: Parameters<Paths.ServerGetServer.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetServer.Responses.$200 | Paths.ServerGetServer.Responses.$422>
  }
  ['/server/bundle/{uuid}']: {
    /**
     * server_deleteBundle - Delete Bundle
     */
    'delete'(
      parameters?: Parameters<Paths.ServerDeleteBundle.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerDeleteBundle.Responses.$200 | Paths.ServerDeleteBundle.Responses.$422>
    /**
     * server_editBundle - Edit Bundle
     */
    'patch'(
      parameters?: Parameters<Paths.ServerEditBundle.PathParameters> | null,
      data?: Paths.ServerEditBundle.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerEditBundle.Responses.$200 | Paths.ServerEditBundle.Responses.$422>
  }
  ['/server/type']: {
    /**
     * server_getServerTypes - Get Server Types
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetServerTypes.Responses.$200>
  }
  ['/server/']: {
    /**
     * server_getServers - Get Servers
     */
    'get'(
      parameters?: Parameters<Paths.ServerGetServers.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetServers.Responses.$200 | Paths.ServerGetServers.Responses.$422>
  }
  ['/server/{uuid}']: {
    /**
     * server_deleteBundle - Delete Bundle
     */
    'delete'(
      parameters?: Parameters<Paths.ServerDeleteBundle.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerDeleteBundle.Responses.$200 | Paths.ServerDeleteBundle.Responses.$422>
  }
  ['/group/']: {
    /**
     * group_getGroups - Get Groups
     */
    'get'(
      parameters?: Parameters<Paths.GroupGetGroups.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupGetGroups.Responses.$200 | Paths.GroupGetGroups.Responses.$422>
    /**
     * group_addGroup - Add Group
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GroupAddGroup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupAddGroup.Responses.$200 | Paths.GroupAddGroup.Responses.$422>
  }
  ['/group/{uuid}']: {
    /**
     * group_getGroup - Get Group
     */
    'get'(
      parameters?: Parameters<Paths.GroupGetGroup.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupGetGroup.Responses.$200 | Paths.GroupGetGroup.Responses.$422>
    /**
     * group_deleteGroup - Delete Group
     */
    'delete'(
      parameters?: Parameters<Paths.GroupDeleteGroup.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupDeleteGroup.Responses.$200 | Paths.GroupDeleteGroup.Responses.$422>
    /**
     * group_editGroup - Edit Group
     */
    'patch'(
      parameters?: Parameters<Paths.GroupEditGroup.PathParameters> | null,
      data?: Paths.GroupEditGroup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupEditGroup.Responses.$200 | Paths.GroupEditGroup.Responses.$422>
  }
  ['/ban/']: {
    /**
     * ban_getBans - Get Bans
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanGetBans.Responses.$200>
    /**
     * ban_addBan - Add Ban
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.BanAddBan.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanAddBan.Responses.$200 | Paths.BanAddBan.Responses.$422>
  }
  ['/ban/{uuid}']: {
    /**
     * ban_deleteBan - Delete Ban
     */
    'delete'(
      parameters?: Parameters<Paths.BanDeleteBan.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanDeleteBan.Responses.$200 | Paths.BanDeleteBan.Responses.$422>
    /**
     * ban_editBan - Edit Ban
     */
    'patch'(
      parameters?: Parameters<Paths.BanEditBan.PathParameters> | null,
      data?: Paths.BanEditBan.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanEditBan.Responses.$200 | Paths.BanEditBan.Responses.$422>
  }
  ['/ban/{uuid}/log']: {
    /**
     * ban_getLogs - Get Logs
     */
    'get'(
      parameters?: Parameters<Paths.BanGetLogs.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanGetLogs.Responses.$200 | Paths.BanGetLogs.Responses.$422>
  }
  ['/shop/packet']: {
    /**
     * shop_getPackets - Get Packets
     * 
     * Returns all packets (in the given category) and does price calculation.
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetPackets.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetPackets.Responses.$200 | Paths.ShopGetPackets.Responses.$422>
  }
  ['/shop/cart']: {
    /**
     * shop_getCart - Get Cart
     * 
     * Return cart items and price calculation.
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetCart.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetCart.Responses.$200 | Paths.ShopGetCart.Responses.$422>
    /**
     * shop_addPacketToCart - Add Packet To Cart
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ShopAddPacketToCart.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopAddPacketToCart.Responses.$200 | Paths.ShopAddPacketToCart.Responses.$422>
    /**
     * shop_removePacketsFromCart - Remove Packets From Cart
     */
    'delete'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopRemovePacketsFromCart.Responses.$200>
  }
  ['/shop/cart/packet']: {
    /**
     * shop_getCart - Get Cart
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetCart.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetCart.Responses.$200 | Paths.ShopGetCart.Responses.$422>
  }
  ['/shop/cart/{uuid}']: {
    /**
     * shop_removePacketFromCart - Remove Packet From Cart
     */
    'delete'(
      parameters?: Parameters<Paths.ShopRemovePacketFromCart.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopRemovePacketFromCart.Responses.$200 | Paths.ShopRemovePacketFromCart.Responses.$422>
  }
  ['/shop/cart/discount/{code_or_uuid}']: {
    /**
     * shop_applyDiscount - Apply Discount
     */
    'post'(
      parameters?: Parameters<Paths.ShopApplyDiscount.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopApplyDiscount.Responses.$200 | Paths.ShopApplyDiscount.Responses.$422>
    /**
     * shop_removeDiscount - Remove Discount
     */
    'delete'(
      parameters?: Parameters<Paths.ShopRemoveDiscount.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopRemoveDiscount.Responses.$200 | Paths.ShopRemoveDiscount.Responses.$422>
  }
  ['/shop/cart/checkout']: {
    /**
     * shop_startCheckout - Start Checkout
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ShopStartCheckout.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopStartCheckout.Responses.$200 | Paths.ShopStartCheckout.Responses.$422>
  }
  ['/shop/checkout']: {
    /**
     * shop_startPayment - Start Payment
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ShopStartPayment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopStartPayment.Responses.$200 | Paths.ShopStartPayment.Responses.$422>
  }
  ['/shop/checkout/{uuid}']: {
    /**
     * shop_checkPayment - Check Payment
     */
    'get'(
      parameters?: Parameters<Paths.ShopCheckPayment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopCheckPayment.Responses.$200 | Paths.ShopCheckPayment.Responses.$422>
    /**
     * shop_cancelPayment - Cancel Payment
     */
    'patch'(
      parameters?: Parameters<Paths.ShopCancelPayment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopCancelPayment.Responses.$200 | Paths.ShopCancelPayment.Responses.$422>
  }
  ['/shop/purchase']: {
    /**
     * shop_getPurchases - Get Purchases
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetPurchases.Responses.$200>
  }
  ['/shop/discount/{code_or_uuid}']: {
    /**
     * shop_getDiscount - Get Discount
     * 
     * Get discount by UUID or code.
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetDiscount.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetDiscount.Responses.$200 | Paths.ShopGetDiscount.Responses.$422>
  }
  ['/shop/purchase/{uuid}/gateway']: {
    /**
     * shop_getPurchaseGateways - Get Purchase Gateways
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetPurchaseGateways.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetPurchaseGateways.Responses.$200 | Paths.ShopGetPurchaseGateways.Responses.$422>
  }
  ['/shop/purchase/{uuid}']: {
    /**
     * shop_editPurchase - Edit Purchase
     */
    'patch'(
      parameters?: Parameters<Paths.ShopEditPurchase.PathParameters> | null,
      data?: Paths.ShopEditPurchase.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopEditPurchase.Responses.$200 | Paths.ShopEditPurchase.Responses.$422>
  }
  ['/shop/debit/{uuid}/invoice']: {
    /**
     * shop_getDebitInvoice - Get Debit Invoice
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetDebitInvoice.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetDebitInvoice.Responses.$200 | Paths.ShopGetDebitInvoice.Responses.$422>
  }
  ['/packet/category']: {
    /**
     * packet_getCategories - Get Categories
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketGetCategories.Responses.$200>
  }
  ['/packet/']: {
    /**
     * packet_getPackets - Get Packets
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketGetPackets.Responses.$200>
    /**
     * packet_addPacket - Add Packet
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PacketAddPacket.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketAddPacket.Responses.$200 | Paths.PacketAddPacket.Responses.$422>
  }
  ['/packet/{uuid}']: {
    /**
     * packet_deletePacket - Delete Packet
     */
    'delete'(
      parameters?: Parameters<Paths.PacketDeletePacket.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketDeletePacket.Responses.$200 | Paths.PacketDeletePacket.Responses.$422>
    /**
     * packet_editPacket - Edit Packet
     */
    'patch'(
      parameters?: Parameters<Paths.PacketEditPacket.PathParameters> | null,
      data?: Paths.PacketEditPacket.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketEditPacket.Responses.$200 | Paths.PacketEditPacket.Responses.$422>
  }
  ['/packet/reward']: {
    /**
     * packet_getRewards - Get Rewards
     */
    'get'(
      parameters?: Parameters<Paths.PacketGetRewards.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketGetRewards.Responses.$200 | Paths.PacketGetRewards.Responses.$422>
    /**
     * packet_addReward - Add Reward
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PacketAddReward.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketAddReward.Responses.$200 | Paths.PacketAddReward.Responses.$422>
  }
  ['/packet/reward/{uuid}']: {
    /**
     * packet_deleteReward - Delete Reward
     */
    'delete'(
      parameters?: Parameters<Paths.PacketDeleteReward.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketDeleteReward.Responses.$200 | Paths.PacketDeleteReward.Responses.$422>
    /**
     * packet_editReward - Edit Reward
     */
    'patch'(
      parameters?: Parameters<Paths.PacketEditReward.PathParameters> | null,
      data?: Paths.PacketEditReward.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketEditReward.Responses.$200 | Paths.PacketEditReward.Responses.$422>
  }
  ['/packet/applied']: {
    /**
     * packet_getAppliedPackets - Get Applied Packets
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketGetAppliedPackets.Responses.$200>
  }
  ['/payment-gateway/']: {
    /**
     * gateway_getGateways - Get Gateways
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GatewayGetGateways.Responses.$200>
  }
  ['/news/']: {
    /**
     * news_getMessages - Get Messages
     */
    'get'(
      parameters?: Parameters<Paths.NewsGetMessages.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewsGetMessages.Responses.$200 | Paths.NewsGetMessages.Responses.$422>
    /**
     * news_addMessage - Add Message
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.NewsAddMessage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewsAddMessage.Responses.$200 | Paths.NewsAddMessage.Responses.$422>
  }
  ['/news/{uuid}']: {
    /**
     * news_deleteMessage - Delete Message
     */
    'delete'(
      parameters?: Parameters<Paths.NewsDeleteMessage.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewsDeleteMessage.Responses.$200 | Paths.NewsDeleteMessage.Responses.$422>
    /**
     * news_editMessage - Edit Message
     */
    'patch'(
      parameters?: Parameters<Paths.NewsEditMessage.PathParameters> | null,
      data?: Paths.NewsEditMessage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewsEditMessage.Responses.$200 | Paths.NewsEditMessage.Responses.$422>
  }
  ['/requirement/type']: {
    /**
     * requirements_getRequirementTypes - Get Requirement Types
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequirementsGetRequirementTypes.Responses.$200>
  }
  ['/requirement/set']: {
    /**
     * requirements_getRequirementSets - Get Requirement Sets
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequirementsGetRequirementSets.Responses.$200>
    /**
     * requirements_createRequirementSet - Create Requirement Set
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RequirementsCreateRequirementSet.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequirementsCreateRequirementSet.Responses.$200 | Paths.RequirementsCreateRequirementSet.Responses.$422>
  }
  ['/requirement/']: {
    /**
     * requirements_getRequirements - Get Requirements
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequirementsGetRequirements.Responses.$200>
    /**
     * requirements_createRequirement - Create Requirement
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RequirementsCreateRequirement.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequirementsCreateRequirement.Responses.$200 | Paths.RequirementsCreateRequirement.Responses.$422>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
