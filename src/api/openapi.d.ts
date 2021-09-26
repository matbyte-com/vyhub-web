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
     * AccountModel
     */
    export interface AccountModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Name
       */
      name?: string;
      currency?: CurrencyModel;
      /**
       * Balance
       */
      balance?: number;
      /**
       * Transactions
       */
      transactions: TransactionModel[];
    }
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
      /**
       * Vat Number
       */
      vat_number?: string;
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
     * DonationGoalModel
     */
    export interface Api_V1_Design_DonationGoalModel {
      /**
       * Enabled
       */
      enabled: boolean;
      /**
       * Goal
       */
      goal?: number;
      currency: CurrencyModel;
      /**
       * Current
       */
      current?: number;
    }
    /**
     * DonationGoalModel
     */
    export interface Api_V1_Shop_DonationGoalModel {
      /**
       * Enabled
       */
      enabled: boolean;
      /**
       * Goal
       */
      goal?: number;
      currency: CurrencyModel;
      /**
       * Current
       */
      current?: number;
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
      user: Model_User_User_UserModelShort;
    }
    /**
     * AppliedPacketModelPatch
     */
    export interface AppliedPacketModelPatch {
      status?: AppliedPacketStatus;
      /**
       * End
       */
      end?: string; // date-time
    }
    /**
     * AppliedPacketStatus
     * An enumeration.
     */
    export type AppliedPacketStatus = "ENABLED" | "DISABLED";
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
      serverbundle?: Model_Server_Serverbundle_ServerbundleModelShort;
      creator: Model_User_User_UserModelNoLinkedShort;
      user: Model_User_User_UserModelNoLinkedShort;
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
     * Body_add_packet_to_cart_shop_cart_post
     */
    export interface BodyAddPacketToCartShopCartPost {
      /**
       * Packet Id
       */
      packet_id: string; // uuid
    }
    /**
     * Body_start_checkout_shop_cart_checkout_post
     */
    export interface BodyStartCheckoutShopCartCheckoutPost {
      /**
       * Address Id
       */
      address_id: string; // uuid
    }
    /**
     * Body_start_payment_shop_checkout_post
     */
    export interface BodyStartPaymentShopCheckoutPost {
      /**
       * Purchase Id
       */
      purchase_id: string; // uuid
      /**
       * Payment Gateway Id
       */
      payment_gateway_id: string; // uuid
    }
    /**
     * BundleTokenCreateModel
     */
    export interface BundleTokenCreateModel {
      /**
       * Name
       */
      name?: string;
      /**
       * Extra Properties
       */
      extra_properties?: string[];
    }
    /**
     * BusinessAddressModelAdd
     */
    export interface BusinessAddressModelAdd {
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
      /**
       * Vat Number
       */
      vat_number?: string;
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
      recurring?: number; // time-delta
      discount?: DiscountModel;
      /**
       * Editable
       */
      editable: boolean;
    }
    /**
     * CheckoutCheckboxModel
     */
    export interface CheckoutCheckboxModel {
      /**
       * Text
       */
      text: string;
      /**
       * Url
       */
      url: string; // uri
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
      content?: string;
    }
    /**
     * ConfigModel
     */
    export interface ConfigModel {
      /**
       * Time To Live
       */
      time_to_live: number;
      /**
       * Count Till Ban
       */
      count_till_ban: number;
      /**
       * Ban Length
       */
      ban_length: number;
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
       * Ext Transaction Id
       */
      ext_transaction_id?: string;
      /**
       * Transaction Id
       */
      transaction_id?: string; // uuid
      payment_gateway: PaymentGatewayModel;
      /**
       * Amount Total
       */
      amount_total?: number;
      /**
       * Amount Net
       */
      amount_net?: number;
      /**
       * Tax Rate
       */
      tax_rate?: number;
      /**
       * Amount Tax
       */
      amount_tax?: number;
      /**
       * Credits
       */
      credits?: number;
      status: DebitStatus;
      /**
       * Invoice Number
       */
      invoice_number?: string;
      /**
       * Transaction Url
       */
      transaction_url?: string;
      /**
       * Invoice Available
       */
      invoice_available: boolean;
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
       * Ext Transaction Id
       */
      ext_transaction_id?: string;
      /**
       * Transaction Id
       */
      transaction_id?: string; // uuid
      payment_gateway: PaymentGatewayModel;
      /**
       * Amount Total
       */
      amount_total?: number;
      /**
       * Amount Net
       */
      amount_net?: number;
      /**
       * Tax Rate
       */
      tax_rate?: number;
      /**
       * Amount Tax
       */
      amount_tax?: number;
      /**
       * Credits
       */
      credits?: number;
      status: DebitStatus;
      /**
       * Invoice Number
       */
      invoice_number?: string;
      /**
       * Transaction Url
       */
      transaction_url?: string;
      /**
       * Invoice Available
       */
      invoice_available: boolean;
    }
    /**
     * DebitModelStatistic
     */
    export interface DebitModelStatistic {
      /**
       * Date
       */
      date: string; // date-time
      /**
       * Amount Net
       */
      amount_net?: number;
      /**
       * Amount Total
       */
      amount_total?: number;
      /**
       * Amount Tax
       */
      amount_tax?: number;
      /**
       * Credits
       */
      credits?: number;
    }
    /**
     * DebitStatus
     * An enumeration.
     */
    export type DebitStatus = "STARTED" | "APPROVED" | "FINISHED" | "CANCELLED";
    /**
     * DiscordRole
     */
    export interface DiscordRole {
      /**
       * Name
       */
      name: string;
      /**
       * Id
       */
      id: number;
    }
    /**
     * DiscountModel
     */
    export interface DiscountModel {
      /**
       * Name
       */
      name?: string;
      /**
       * Code
       */
      code?: string;
      /**
       * Bounds
       */
      bounds?: string;
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
       * All Packets
       */
      all_packets: boolean;
      /**
       * Max Usages
       */
      max_usages?: number;
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Deletable
       */
      deletable: boolean;
      /**
       * Active
       */
      active: boolean;
      requirement_set?: RequirementSetModel;
      /**
       * Packets
       */
      packets: PacketModelShort[];
    }
    /**
     * DiscountModelAdd
     */
    export interface DiscountModelAdd {
      /**
       * Name
       */
      name?: string;
      /**
       * Code
       */
      code?: string;
      /**
       * Bounds
       */
      bounds?: string;
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
       * All Packets
       */
      all_packets: boolean;
      /**
       * Max Usages
       */
      max_usages?: number;
      /**
       * Requirement Set Id
       */
      requirement_set_id?: string; // uuid
      /**
       * Packet Ids
       */
      packet_ids?: string /* uuid */ [];
    }
    /**
     * DiscountModelPatch
     */
    export interface DiscountModelPatch {
      /**
       * Name
       */
      name?: string;
      /**
       * Code
       */
      code?: string;
      /**
       * Bounds
       */
      bounds?: string;
      /**
       * Begin
       */
      begin?: string; // date-time
      /**
       * End
       */
      end?: string; // date-time
      /**
       * Percentage
       */
      percentage?: number;
      /**
       * Enabled
       */
      enabled?: boolean;
      /**
       * All Packets
       */
      all_packets?: boolean;
      /**
       * Max Usages
       */
      max_usages?: number;
      /**
       * Requirement Set Id
       */
      requirement_set_id?: string; // uuid
      /**
       * Packet Ids
       */
      packet_ids?: string /* uuid */ [];
    }
    /**
     * GeneralSettingModel
     */
    export interface GeneralSettingModel {
      /**
       * Community Name
       */
      community_name: string;
    }
    /**
     * GeneralSettingsModel
     */
    export interface GeneralSettingsModel {
      /**
       * Donation Goal Enabled
       */
      donation_goal_enabled?: boolean;
      /**
       * Donation Goal
       */
      donation_goal?: number;
      /**
       * Checkout Checkboxes
       */
      checkout_checkboxes?: CheckoutCheckboxModel[];
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
      serverbundle: Model_Pydantic_ServerbundleModelShort;
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
      author?: Model_User_UserModelShort;
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
      group: GroupModel;
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
     * MembershipModelEdit
     */
    export interface MembershipModelEdit {
      /**
       * Begin
       */
      begin: string; // date-time
      /**
       * End
       */
      end?: string; // date-time
    }
    /**
     * MembershipModelMemberList
     */
    export interface MembershipModelMemberList {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Begin
       */
      begin: string; // date-time
      /**
       * End
       */
      end?: string; // date-time
      user: UserModelNoLinkedExtraShort;
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
     * ServerbundleModelShort
     */
    export interface Model_Pydantic_ServerbundleModelShort {
      /**
       * Id
       */
      id: string; // uuid
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
    }
    /**
     * ServerbundleModelShort
     */
    export interface Model_Server_Serverbundle_ServerbundleModelShort {
      /**
       * Id
       */
      id: string; // uuid
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
    }
    /**
     * UserModelNoLinkedShort
     */
    export interface Model_User_UserModelNoLinkedShort {
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
       * Username
       */
      username: string;
      /**
       * Avatar
       */
      avatar: string;
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
       * Identifier
       */
      identifier: string;
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
      linked_users: Model_User_UserModelNoLinkedShort[];
    }
    /**
     * UserModelNoLinkedShort
     */
    export interface Model_User_User_UserModelNoLinkedShort {
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
       * Username
       */
      username: string;
      /**
       * Avatar
       */
      avatar: string;
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
       * Identifier
       */
      identifier: string;
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
      linked_users: Model_User_UserModelNoLinkedShort[];
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
     * NotificationEntryModel
     */
    export interface NotificationEntryModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Link
       */
      link?: {
      };
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
      /**
       * Read
       */
      read: boolean;
    }
    /**
     * NotificationRead
     */
    export interface NotificationRead {
      /**
       * All
       */
      all?: boolean;
      /**
       * Id
       */
      id?: string /* uuid */ [];
    }
    /**
     * OAuth2TokenModel
     */
    export interface OAuth2TokenModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Name
       */
      name?: string;
      user?: Model_User_User_UserModelNoLinkedShort;
      serverbundle?: Model_Server_Serverbundle_ServerbundleModelShort;
      /**
       * Scope
       */
      scope: string;
      /**
       * Revoked
       */
      revoked: boolean;
      /**
       * Issued At
       */
      issued_at: number;
      /**
       * Expires In
       */
      expires_in?: number;
      /**
       * Access Token
       */
      access_token: string;
    }
    /**
     * OAuth2TokenModelHidden
     */
    export interface OAuth2TokenModelHidden {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Name
       */
      name?: string;
      user?: Model_User_User_UserModelNoLinkedShort;
      serverbundle?: Model_Server_Serverbundle_ServerbundleModelShort;
      /**
       * Scope
       */
      scope: string;
      /**
       * Revoked
       */
      revoked: boolean;
      /**
       * Issued At
       */
      issued_at: number;
      /**
       * Expires In
       */
      expires_in?: number;
      /**
       * Access Token Hidden
       */
      access_token_hidden: string;
    }
    /**
     * PacketCategoryModel
     */
    export interface PacketCategoryModel {
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
      /**
       * Sort Id
       */
      sort_id: number;
      /**
       * Id
       */
      id: string; // uuid
    }
    /**
     * PacketCategoryModelAdd
     */
    export interface PacketCategoryModelAdd {
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
      /**
       * Sort Id
       */
      sort_id: number;
    }
    /**
     * PacketCategoryModelPatch
     */
    export interface PacketCategoryModelPatch {
      /**
       * Name
       */
      name?: string;
      /**
       * Image Url
       */
      image_url?: string; // uri
      /**
       * Enabled
       */
      enabled?: boolean;
      /**
       * Sort Id
       */
      sort_id?: number;
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
       * Sort Id
       */
      sort_id: number;
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
       * Sort Id
       */
      sort_id: number;
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
     * PacketModelLight
     */
    export interface PacketModelLight {
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
       * Sort Id
       */
      sort_id: number;
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
       * Sort Id
       */
      sort_id?: number;
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
     * Page[AppliedPacketModel]
     */
    export interface PageAppliedPacketModel {
      /**
       * Items
       */
      items: AppliedPacketModel[];
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
     * Page[BanModel]
     */
    export interface PageBanModel {
      /**
       * Items
       */
      items: BanModel[];
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
     * Page[LogEntryModel]
     */
    export interface PageLogEntryModel {
      /**
       * Items
       */
      items: LogEntryModel[];
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
     * Page[MembershipModelMemberList]
     */
    export interface PageMembershipModelMemberList {
      /**
       * Items
       */
      items: MembershipModelMemberList[];
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
     * Page[NotificationEntryModel]
     */
    export interface PageNotificationEntryModel {
      /**
       * Items
       */
      items: NotificationEntryModel[];
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
     * Page[PurchaseModel]
     */
    export interface PagePurchaseModel {
      /**
       * Items
       */
      items: PurchaseModel[];
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
     * Page[ThreadModelShort]
     */
    export interface PageThreadModelShort {
      /**
       * Items
       */
      items: ThreadModelShort[];
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
     * Page[WarningModel]
     */
    export interface PageWarningModel {
      /**
       * Items
       */
      items: WarningModel[];
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
      /**
       * Subtitle
       */
      subtitle?: string;
      type: PaymentGatewayType;
      /**
       * Support Recurring
       */
      support_recurring: boolean;
      /**
       * Deletable
       */
      deletable: boolean;
      /**
       * Enabled
       */
      enabled: boolean;
    }
    /**
     * PaymentGatewayModelAdd
     */
    export interface PaymentGatewayModelAdd {
      /**
       * Name
       */
      name: string;
      /**
       * Subtitle
       */
      subtitle?: string;
      type: PaymentGatewayType;
      /**
       * Attributes
       */
      attributes?: {
        [name: string]: string;
      };
      /**
       * Enabled
       */
      enabled: boolean;
    }
    /**
     * PaymentGatewayModelPatch
     */
    export interface PaymentGatewayModelPatch {
      /**
       * Name
       */
      name?: string;
      /**
       * Subtitle
       */
      subtitle?: string;
      /**
       * Attributes
       */
      attributes?: {
        [name: string]: string;
      };
      /**
       * Enabled
       */
      enabled: boolean;
    }
    /**
     * PaymentGatewayType
     * An enumeration.
     */
    export type PaymentGatewayType = "PAYPAL" | "STRIPE" | "PAYSAFECARD" | "CREDITS";
    /**
     * PostModel
     */
    export interface PostModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Content
       */
      content: string;
      /**
       * Title
       */
      title?: string;
      /**
       * Created
       */
      created: string; // date-time
      creator: Model_User_User_UserModelShort;
    }
    /**
     * PostModelAdd
     */
    export interface PostModelAdd {
      /**
       * Content
       */
      content: string;
    }
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
     * PropertyModelShortWithDescription
     */
    export interface PropertyModelShortWithDescription {
      /**
       * Name
       */
      name: string;
      /**
       * Description
       */
      description: string;
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
      user: Model_User_UserModelNoLinkedShort;
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
       * Amount Tax
       */
      amount_tax: number;
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
      recurring?: number; // time-delta
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
      /**
       * Ext Subscription Id
       */
      ext_subscription_id?: string;
      /**
       * Payment Gateway Id
       */
      payment_gateway_id?: string; // uuid
    }
    /**
     * PurchaseModelPatch
     */
    export interface PurchaseModelPatch {
      status?: PurchaseStatus;
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
      user: Model_User_UserModelNoLinkedShort;
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
     * PurchaseStatistic
     */
    export interface PurchaseStatistic {
      /**
       * Status
       */
      status: {
        [name: string]: PurchaseStatisticEntry;
      };
      /**
       * Country
       */
      country: {
        [name: string]: PurchaseStatisticEntry;
      };
      /**
       * Monthly Revenue
       */
      monthly_revenue: number;
    }
    /**
     * PurchaseStatisticEntry
     */
    export interface PurchaseStatisticEntry {
      /**
       * Count
       */
      count: number;
      /**
       * Amount Total
       */
      amount_total: number;
      /**
       * Amount Net
       */
      amount_net: number;
      /**
       * Amount Tax
       */
      amount_tax: number;
      /**
       * Credits
       */
      credits: number;
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
     * RequirementSetModelPatch
     */
    export interface RequirementSetModelPatch {
      /**
       * Name
       */
      name?: string;
      /**
       * Formula
       */
      formula?: any[];
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
    export type RewardEvent = "DIRECT" | "CONNECT" | "SPAWN" | "DEATH" | "DISCONNECT" | "DISABLE";
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
       * Data
       */
      data?: {
      };
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
      serverbundle: Model_Pydantic_ServerbundleModelShort;
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
       * Data
       */
      data?: {
      };
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
       * Data
       */
      data?: {
      };
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
    export type RewardType = "COMMAND" | "SCRIPT" | "CREDITS" | "MEMBERSHIP";
    /**
     * ServerBundleModelPatch
     */
    export interface ServerBundleModelPatch {
      /**
       * Name
       */
      name?: string;
      /**
       * Color
       */
      color?: string; // color
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
     * ServerModel
     */
    export interface ServerModel {
      /**
       * Users Max
       */
      users_max?: number;
      /**
       * Users Current
       */
      users_current?: number;
      /**
       * Map
       */
      map?: string;
      /**
       * Name
       */
      name: string;
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
      /**
       * Extra
       */
      extra?: {
      };
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Last Update
       */
      last_update?: string; // date-time
      serverbundle?: Model_Server_Serverbundle_ServerbundleModelShort;
    }
    /**
     * ServerModelAdd
     */
    export interface ServerModelAdd {
      /**
       * Name
       */
      name: string;
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
      /**
       * Extra
       */
      extra?: {
      };
    }
    /**
     * ServerModelPatch
     */
    export interface ServerModelPatch {
      /**
       * Users Max
       */
      users_max?: number;
      /**
       * Users Current
       */
      users_current?: number;
      /**
       * Map
       */
      map?: string;
      /**
       * Name
       */
      name?: string;
      type?: ServerType;
      /**
       * Address
       */
      address?: string;
      /**
       * Port
       */
      port?: number;
      /**
       * Serverbundle Id
       */
      serverbundle_id?: string; // uuid
      /**
       * Extra
       */
      extra?: {
      };
      /**
       * Is Alive
       * Set to true if the PATCH request comes from a server signalling that the server is alive. This will cause an update of the `last_update` attribute.
       */
      is_alive?: boolean;
    }
    /**
     * ServerModelShort
     */
    export interface ServerModelShort {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Name
       */
      name: string;
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
     * StartPaymentModel
     */
    export interface StartPaymentModel {
      debit: DebitModelNoPurchase;
      action?: PaymentAction;
    }
    /**
     * StatisticInterval
     * An enumeration.
     */
    export type StatisticInterval = "DAY" | "MONTH" | "YEAR";
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
     * TaxModel
     */
    export interface TaxModel {
      /**
       * Id
       */
      id: string; // uuid
      country?: CountryModel;
      /**
       * Percentage
       */
      percentage: number;
      /**
       * Info
       */
      info?: string;
    }
    /**
     * TaxModelAdd
     */
    export interface TaxModelAdd {
      /**
       * Country Code
       */
      country_code?: string; // ^[A-Z]{2}$
      /**
       * Percentage
       */
      percentage: number;
      /**
       * Info
       */
      info?: string;
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
      primary: string; // color
      /**
       * Success
       */
      success: string; // color
      /**
       * Warning
       */
      warning: string; // color
      /**
       * Error
       */
      error: string; // color
      /**
       * Background
       */
      background: string;
      /**
       * Logo
       */
      logo?: string;
      /**
       * Logo Width
       */
      logo_width?: number;
      /**
       * Show Community Name
       */
      show_community_name: boolean;
      /**
       * Community Name
       */
      community_name?: string;
    }
    /**
     * ThreadCategory
     * An enumeration.
     */
    export type ThreadCategory = "DEFAULT" | "TICKET";
    /**
     * ThreadModel
     */
    export interface ThreadModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Title
       */
      title: string;
      /**
       * Content
       */
      content: string;
      category: ThreadCategory;
      /**
       * Created
       */
      created: string; // date-time
      creator: Model_User_User_UserModelShort;
      status: ThreadStatus;
    }
    /**
     * ThreadModelAdd
     */
    export interface ThreadModelAdd {
      /**
       * Title
       */
      title: string;
      /**
       * Content
       */
      content: string;
      category: ThreadCategory;
    }
    /**
     * ThreadModelShort
     */
    export interface ThreadModelShort {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Title
       */
      title: string;
      /**
       * Content
       */
      content: string;
      /**
       * Created
       */
      created: string; // date-time
      creator: Model_User_User_UserModelShort;
      /**
       * Read
       */
      read: boolean;
      status: ThreadStatus;
    }
    /**
     * ThreadStatus
     * An enumeration.
     */
    export type ThreadStatus = "OPEN" | "CLOSED";
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
       * Amount Tax
       */
      amount_tax: number;
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
     * TransactionModel
     */
    export interface TransactionModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Description
       */
      description: string;
      /**
       * Date
       */
      date: string; // date-time
      author?: Model_User_User_UserModelShort;
      /**
       * Amount
       */
      amount: number;
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
      title: string;
      /**
       * Unit
       */
      unit: string;
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
     * UserAttributeHistoryModel
     */
    export interface UserAttributeHistoryModel {
      /**
       * Date
       */
      date: string; // date-time
      /**
       * Value
       */
      value: string;
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
       * Central User Id
       */
      central_user_id?: string; // uuid
      /**
       * Admin
       */
      admin: boolean;
      /**
       * Credit Account Id
       */
      credit_account_id: string; // uuid
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
     * UserModelAdd
     */
    export interface UserModelAdd {
      type: UserType;
      /**
       * Identifier
       */
      identifier: string;
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
       * Central User Id
       */
      central_user_id?: string; // uuid
      /**
       * Admin
       */
      admin: boolean;
      /**
       * Credit Account Id
       */
      credit_account_id: string; // uuid
      /**
       * Attributes
       */
      attributes: {
      };
    }
    /**
     * UserModelNoLinkedExtraShort
     */
    export interface UserModelNoLinkedExtraShort {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Username
       */
      username: string;
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
    /**
     * WarningModel
     */
    export interface WarningModel {
      /**
       * Id
       */
      id: string; // uuid
      /**
       * Reason
       */
      reason?: string;
      serverbundle?: Model_Server_Serverbundle_ServerbundleModelShort;
      user: Model_User_User_UserModelShort;
      /**
       * Created On
       */
      created_on: string; // date-time
      /**
       * Is Active
       */
      is_active: boolean;
      /**
       * Disabled
       */
      disabled: boolean;
    }
    /**
     * WarningModelAdd
     */
    export interface WarningModelAdd {
      /**
       * Reason
       */
      reason?: string;
      /**
       * Serverbundle Id
       */
      serverbundle_id: string; // uuid
      /**
       * User Id
       */
      user_id: string; // uuid
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
      /**
       * Return Url
       * URL to redirect.
       */
      export type ReturnUrl = string;
    }
    export interface PathParameters {
      backend: Parameters.Backend;
    }
    export interface QueryParameters {
      return_url?: Parameters.ReturnUrl;
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
  namespace AuthRevokeToken {
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
      /**
       * Return Url
       * URL to redirect after login.
       */
      export type ReturnUrl = string;
    }
    export interface PathParameters {
      backend: Parameters.Backend;
    }
    export interface QueryParameters {
      return_url?: Parameters.ReturnUrl;
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
    namespace Parameters {
      /**
       * Bundles Filter
       */
      export type BundlesFilter = string[];
      /**
       * Order By
       */
      export type OrderBy = string;
      /**
       * Page
       */
      export type Page = number;
      /**
       * Query
       */
      export type Query = string;
      /**
       * Size
       */
      export type Size = number;
      /**
       * Sort Desc
       */
      export type SortDesc = boolean;
    }
    export interface QueryParameters {
      bundles_filter?: Parameters.BundlesFilter;
      query?: Parameters.Query;
      order_by?: Parameters.OrderBy;
      sort_desc?: Parameters.SortDesc;
      page?: Parameters.Page;
      size?: Parameters.Size;
    }
    namespace Responses {
      export type $200 = Components.Schemas.PageBanModel;
      export type $422 = Components.Schemas.HTTPValidationError;
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
  namespace DesignDeleteCmsHtml {
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
  namespace DesignEditGeneralSettings {
    export type RequestBody = Components.Schemas.GeneralSettingModel;
    namespace Responses {
      export type $200 = Components.Schemas.GeneralSettingModel;
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
  namespace DesignGetDonationGoal {
    namespace Responses {
      export type $200 = Components.Schemas.Api_V1_Design_DonationGoalModel;
    }
  }
  namespace DesignGetGeneralSettings {
    namespace Responses {
      export type $200 = any;
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
  namespace DiscordGetGuildRoles {
    namespace Responses {
      /**
       * Response Get Guild Roles Discord Roles Get
       */
      export type $200 = Components.Schemas.DiscordRole[];
    }
  }
  namespace FinanceGetAccount {
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
      export type $200 = Components.Schemas.AccountModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ForumGetThread {
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
      export type $200 = Components.Schemas.ThreadModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ForumGetThreadPosts {
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
       * Response Get Thread Posts Forum  Uuid  Post Get
       */
      export type $200 = Components.Schemas.PostModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ForumGetThreads {
    namespace Responses {
      /**
       * Response Get Threads Forum  Get
       */
      export type $200 = Components.Schemas.ThreadModelShort[];
    }
  }
  namespace ForumGetTickets {
    namespace Parameters {
      /**
       * Page
       */
      export type Page = number;
      /**
       * Query
       */
      export type Query = string;
      /**
       * Show Closed
       */
      export type ShowClosed = boolean;
      /**
       * Size
       */
      export type Size = number;
    }
    export interface QueryParameters {
      query?: Parameters.Query;
      show_closed?: Parameters.ShowClosed;
      page?: Parameters.Page;
      size?: Parameters.Size;
    }
    namespace Responses {
      export type $200 = Components.Schemas.PageThreadModelShort;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ForumNewPost {
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
    export type RequestBody = Components.Schemas.PostModelAdd;
    namespace Responses {
      export type $200 = Components.Schemas.PostModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ForumNewThread {
    export type RequestBody = Components.Schemas.ThreadModelAdd;
    namespace Responses {
      export type $200 = Components.Schemas.ThreadModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ForumToggleStatus {
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
      export type $200 = Components.Schemas.ThreadModel;
      export type $422 = Components.Schemas.HTTPValidationError;
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
  namespace GroupGetAllProperties {
    namespace Responses {
      /**
       * Response Get All Properties Group Property  Get
       */
      export type $200 = Components.Schemas.PropertyModelShortWithDescription[];
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
  namespace GroupGetGroupMembers {
    namespace Parameters {
      /**
       * Page
       */
      export type Page = number;
      /**
       * Search
       */
      export type Search = any;
      /**
       * Size
       */
      export type Size = number;
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      uuid: Parameters.Uuid;
    }
    export interface QueryParameters {
      search?: Parameters.Search;
      page?: Parameters.Page;
      size?: Parameters.Size;
    }
    namespace Responses {
      export type $200 = Components.Schemas.PageMembershipModelMemberList;
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
  namespace LogGetCategories {
    namespace Responses {
      export type $200 = any;
    }
  }
  namespace LogGetLog {
    namespace Parameters {
      /**
       * Categories
       */
      export type Categories = string[];
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
      categories?: Parameters.Categories;
      page?: Parameters.Page;
      size?: Parameters.Size;
    }
    namespace Responses {
      export type $200 = Components.Schemas.PageLogEntryModel;
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
  namespace NotificationGetCategories {
    namespace Responses {
      export type $200 = any;
    }
  }
  namespace NotificationGetNotifications {
    namespace Parameters {
      /**
       * Categories
       */
      export type Categories = string[];
      /**
       * Descending
       */
      export type Descending = boolean;
      /**
       * Hide Read
       */
      export type HideRead = boolean;
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
      descending?: Parameters.Descending;
      hide_read?: Parameters.HideRead;
      categories?: Parameters.Categories;
      page?: Parameters.Page;
      size?: Parameters.Size;
    }
    namespace Responses {
      export type $200 = Components.Schemas.PageNotificationEntryModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace NotificationGetStream {
    namespace Responses {
      export type $200 = any;
    }
  }
  namespace NotificationMarkAsRead {
    export type RequestBody = Components.Schemas.NotificationRead;
    namespace Responses {
      export type $200 = any;
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
  namespace PacketCreateCategory {
    export type RequestBody = Components.Schemas.PacketCategoryModelAdd;
    namespace Responses {
      export type $200 = Components.Schemas.PacketCategoryModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace PacketDeleteAppliedPacket {
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
  namespace PacketDeleteCategory {
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
  namespace PacketEditAppliedPacket {
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
    export type RequestBody = Components.Schemas.AppliedPacketModelPatch;
    namespace Responses {
      export type $200 = Components.Schemas.AppliedPacketModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace PacketEditCategory {
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
    export type RequestBody = Components.Schemas.PacketCategoryModelPatch;
    namespace Responses {
      export type $200 = Components.Schemas.PacketCategoryModel;
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
    namespace Parameters {
      /**
       * Active Filter
       */
      export type ActiveFilter = string[];
      /**
       * Page
       */
      export type Page = number;
      /**
       * Query
       */
      export type Query = string;
      /**
       * Size
       */
      export type Size = number;
      /**
       * Sort By
       */
      export type SortBy = string;
      /**
       * Sort Desc
       */
      export type SortDesc = boolean;
    }
    export interface QueryParameters {
      active_filter?: Parameters.ActiveFilter;
      query?: Parameters.Query;
      sort_by?: Parameters.SortBy;
      sort_desc?: Parameters.SortDesc;
      page?: Parameters.Page;
      size?: Parameters.Size;
    }
    namespace Responses {
      export type $200 = Components.Schemas.PageAppliedPacketModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace PacketGetAvailablePacketStatus {
    namespace Responses {
      export type $200 = any;
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
    namespace Parameters {
      /**
       * Category Id
       * Filter by category
       */
      export type CategoryId = string; // uuid
    }
    export interface QueryParameters {
      category_id?: Parameters.CategoryId; // uuid
    }
    namespace Responses {
      /**
       * Response Get Packets Packet  Get
       */
      export type $200 = Components.Schemas.PacketModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
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
  namespace RequirementsEditRequirementSet {
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
    export type RequestBody = Components.Schemas.RequirementSetModelPatch;
    namespace Responses {
      export type $200 = Components.Schemas.RequirementSetModel;
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
  namespace ServerCreateBundleToken {
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
    export type RequestBody = Components.Schemas.BundleTokenCreateModel;
    namespace Responses {
      export type $200 = Components.Schemas.OAuth2TokenModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ServerCreateServer {
    export type RequestBody = Components.Schemas.ServerModelAdd;
    namespace Responses {
      export type $200 = any;
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
      export type $200 = Components.Schemas.ServerbundleModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ServerDeleteServer {
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
      export type $200 = Components.Schemas.ServerbundleModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ServerEditServer {
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
    export type RequestBody = Components.Schemas.ServerModelPatch;
    namespace Responses {
      export type $200 = any;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ServerGetBundleTokens {
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
       * Response Get Bundle Tokens Server Bundle  Uuid  Token Get
       */
      export type $200 = Components.Schemas.OAuth2TokenModelHidden[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ServerGetBundles {
    namespace Parameters {
      export type ServerType = Components.Schemas.ServerType;
    }
    export interface QueryParameters {
      server_type?: Parameters.ServerType;
    }
    namespace Responses {
      /**
       * Response Get Bundles Server Bundle  Get
       */
      export type $200 = Components.Schemas.ServerbundleModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
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
      export type $200 = Components.Schemas.ServerModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ServerGetServerByBundle {
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
       * Response Get Server By Bundle Server Bundle  Uuid  Server Get
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
  namespace ServerRevokeBundleToken {
    namespace Parameters {
      /**
       * Token Id
       * UUID of token to revoke
       */
      export type TokenId = string; // uuid
      /**
       * Uuid
       * The UUID of the referenced object.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      token_id: Parameters.TokenId; // uuid
      uuid: Parameters.Uuid;
    }
    namespace Responses {
      export type $200 = Components.Schemas.OAuth2TokenModelHidden;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopAddPacketToCart {
    export type RequestBody = Components.Schemas.BodyAddPacketToCartShopCartPost;
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
  namespace ShopChangeBusinessAddress {
    export type RequestBody = Components.Schemas.BusinessAddressModelAdd;
    namespace Responses {
      export type $200 = Components.Schemas.AddressModel;
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
  namespace ShopCreateDiscount {
    export type RequestBody = Components.Schemas.DiscountModelAdd;
    namespace Responses {
      export type $200 = Components.Schemas.DiscountModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopCreateGateway {
    export type RequestBody = Components.Schemas.PaymentGatewayModelAdd;
    namespace Responses {
      export type $200 = Components.Schemas.PaymentGatewayModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopCreateTaxRule {
    export type RequestBody = Components.Schemas.TaxModelAdd;
    namespace Responses {
      export type $200 = Components.Schemas.TaxModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopDeleteDiscount {
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
  namespace ShopDeleteGateway {
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
  namespace ShopDeleteTaxRule {
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
  namespace ShopEditDiscount {
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
    export type RequestBody = Components.Schemas.DiscountModelPatch;
    namespace Responses {
      export type $200 = Components.Schemas.DiscountModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopEditGateway {
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
    export type RequestBody = Components.Schemas.PaymentGatewayModelPatch;
    namespace Responses {
      export type $200 = Components.Schemas.PaymentGatewayModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopEditGeneralConfig {
    export type RequestBody = Components.Schemas.GeneralSettingsModel;
    namespace Responses {
      export type $200 = Components.Schemas.GeneralSettingsModel;
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
    export type RequestBody = Components.Schemas.PurchaseModelPatch;
    namespace Responses {
      export type $200 = Components.Schemas.PurchaseModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopFinishPayment {
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
  namespace ShopGetAvailablePurchaseStatus {
    namespace Responses {
      export type $200 = any;
    }
  }
  namespace ShopGetBusinessAddress {
    namespace Responses {
      export type $200 = Components.Schemas.AddressModel;
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
  namespace ShopGetCartPackets {
    namespace Responses {
      /**
       * Response Get Cart Packets Shop Cart Packet Get
       */
      export type $200 = Components.Schemas.CartPacketModel[];
    }
  }
  namespace ShopGetCurrencies {
    namespace Responses {
      /**
       * Response Get Currencies Shop Currency Get
       */
      export type $200 = Components.Schemas.CurrencyModel[];
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
  namespace ShopGetDebitStatistic {
    namespace Parameters {
      /**
       * Currency Code
       */
      export type CurrencyCode = string;
      /**
       * StatisticInterval
       * An enumeration.
       */
      export type Interval = "DAY" | "MONTH" | "YEAR";
      /**
       * Only Successful
       * Only include purchases with a successful status (FINISHED, RECURRING)
       */
      export type OnlySuccessful = boolean;
    }
    export interface QueryParameters {
      interval?: Parameters.Interval;
      only_successful?: Parameters.OnlySuccessful;
      currency_code: Parameters.CurrencyCode;
    }
    namespace Responses {
      /**
       * Response Get Debit Statistic Shop Debit Statistic Get
       */
      export type $200 = Components.Schemas.DebitModelStatistic[];
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
  namespace ShopGetDiscounts {
    namespace Responses {
      /**
       * Response Get Discounts Shop Discount  Get
       */
      export type $200 = Components.Schemas.DiscountModel[];
    }
  }
  namespace ShopGetDonationGoal {
    namespace Responses {
      export type $200 = Components.Schemas.Api_V1_Shop_DonationGoalModel;
    }
  }
  namespace ShopGetGateways {
    namespace Responses {
      /**
       * Response Get Gateways Shop Gateway  Get
       */
      export type $200 = Components.Schemas.PaymentGatewayModel[];
    }
  }
  namespace ShopGetGeneralConfig {
    namespace Responses {
      export type $200 = Components.Schemas.GeneralSettingsModel;
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
      export type $200 = Components.Schemas.PacketModelLight[];
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
  namespace ShopGetPurchaseStatistic {
    namespace Parameters {
      /**
       * Currency Code
       */
      export type CurrencyCode = string;
    }
    export interface QueryParameters {
      currency_code: Parameters.CurrencyCode;
    }
    namespace Responses {
      export type $200 = Components.Schemas.PurchaseStatistic;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopGetPurchases {
    namespace Parameters {
      /**
       * Page
       */
      export type Page = number;
      /**
       * Query
       */
      export type Query = string;
      /**
       * Size
       */
      export type Size = number;
      /**
       * Sort By
       */
      export type SortBy = string;
      /**
       * Sort Desc
       */
      export type SortDesc = boolean;
      export type StatusFilter = Components.Schemas.PurchaseStatus[];
    }
    export interface QueryParameters {
      query?: Parameters.Query;
      sort_by?: Parameters.SortBy;
      sort_desc?: Parameters.SortDesc;
      status_filter?: Parameters.StatusFilter;
      page?: Parameters.Page;
      size?: Parameters.Size;
    }
    namespace Responses {
      export type $200 = Components.Schemas.PagePurchaseModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace ShopGetTaxRules {
    namespace Responses {
      /**
       * Response Get Tax Rules Shop Tax Get
       */
      export type $200 = Components.Schemas.TaxModel[];
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
    export type RequestBody = Components.Schemas.BodyStartCheckoutShopCartCheckoutPost;
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
  namespace UserCreateUser {
    export type RequestBody = Components.Schemas.UserModelAdd;
    namespace Responses {
      export type $200 = Components.Schemas.UserModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace UserEditMembership {
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
    export type RequestBody = Components.Schemas.MembershipModelEdit;
    namespace Responses {
      export type $200 = any;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace UserEndMembership {
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
       * Definition Id
       * ID of the attribute definition.
       */
      export type DefinitionId = string; // uuid
      /**
       * Linked Users
       * Include attributes from linked users.
       */
      export type LinkedUsers = boolean;
      /**
       * Split Servers
       * Split history by server.
       */
      export type SplitServers = boolean;
      /**
       * Uuid
       * The UUID or username of the referenced user.
       */
      export type Uuid = any;
    }
    export interface PathParameters {
      definition_id: Parameters.DefinitionId; // uuid
      uuid: Parameters.Uuid;
    }
    export interface QueryParameters {
      split_servers?: Parameters.SplitServers;
      linked_users?: Parameters.LinkedUsers;
    }
    namespace Responses {
      /**
       * Response Get Attribute History User  Uuid  Attribute  Definition Id  Get
       */
      export type $200 = Components.Schemas.UserAttributeHistoryModel[];
      export type $422 = Components.Schemas.HTTPValidationError;
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
  namespace UserGetCurrentUser {
    namespace Responses {
      export type $200 = any;
    }
  }
  namespace UserGetData {
    namespace Parameters {
      /**
       * Identifier
       * UUID or other identifier
       */
      export type Identifier = string;
      /**
       * Non Central
       * Set to true if searching a user by its identifier (and not uuid or central username)
       */
      export type NonCentral = boolean;
    }
    export interface PathParameters {
      identifier: Parameters.Identifier;
    }
    export interface QueryParameters {
      non_central?: Parameters.NonCentral;
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
       * Page
       */
      export type Page = number;
      /**
       * Size
       */
      export type Size = number;
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
      page?: Parameters.Page;
      size?: Parameters.Size;
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
       * Desc
       * Order descending.
       */
      export type Desc = boolean;
      /**
       * Limit
       * Maximum results
       */
      export type Limit = number;
      /**
       * Query
       * User-ID, external identifier or keyword that the username must include
       */
      export type Query = string;
      /**
       * Sort
       * Sort by value.
       */
      export type Sort = string; // ^(type|registered_on|username)$
    }
    export interface QueryParameters {
      query?: Parameters.Query;
      limit?: Parameters.Limit;
      sort?: Parameters.Sort; // ^(type|registered_on|username)$
      desc?: Parameters.Desc;
    }
    namespace Responses {
      /**
       * Response Get Users User  Get
       */
      export type $200 = Components.Schemas.Model_User_User_UserModelShort[];
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace WarningAddWarning {
    export type RequestBody = Components.Schemas.WarningModelAdd;
    namespace Responses {
      export type $200 = Components.Schemas.WarningModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace WarningDeleteWarning {
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
  namespace WarningGetWarningConfig {
    namespace Responses {
      export type $200 = Components.Schemas.ConfigModel;
    }
  }
  namespace WarningGetWarnings {
    namespace Parameters {
      /**
       * Bundles Filter
       */
      export type BundlesFilter = string[];
      /**
       * Order By
       */
      export type OrderBy = string;
      /**
       * Page
       */
      export type Page = number;
      /**
       * Query
       */
      export type Query = string;
      /**
       * Size
       */
      export type Size = number;
      /**
       * Sort Desc
       */
      export type SortDesc = boolean;
    }
    export interface QueryParameters {
      bundles_filter?: Parameters.BundlesFilter;
      query?: Parameters.Query;
      order_by?: Parameters.OrderBy;
      sort_desc?: Parameters.SortDesc;
      page?: Parameters.Page;
      size?: Parameters.Size;
    }
    namespace Responses {
      export type $200 = Components.Schemas.PageWarningModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace WarningToggleWarningStatus {
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
  namespace WarningUpdateWarningConfig {
    export type RequestBody = Components.Schemas.ConfigModel;
    namespace Responses {
      export type $200 = Components.Schemas.ConfigModel;
      export type $422 = Components.Schemas.HTTPValidationError;
    }
  }
  namespace WebhookStripeEvent {
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
   * design_deleteCmsHtml - Delete Cms Html
   */
  'design_deleteCmsHtml'(
    parameters?: Parameters<Paths.DesignDeleteCmsHtml.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DesignDeleteCmsHtml.Responses.$200 | Paths.DesignDeleteCmsHtml.Responses.$422>
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
   * design_getGeneralSettings - Get General Settings
   */
  'design_getGeneralSettings'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DesignGetGeneralSettings.Responses.$200>
  /**
   * design_editGeneralSettings - Edit General Settings
   */
  'design_editGeneralSettings'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DesignEditGeneralSettings.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DesignEditGeneralSettings.Responses.$200 | Paths.DesignEditGeneralSettings.Responses.$422>
  /**
   * design_getDonationGoal - Get Donation Goal
   */
  'design_getDonationGoal'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DesignGetDonationGoal.Responses.$200>
  /**
   * auth_getToken - Get Token
   */
  'auth_getToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthGetToken.Responses.$200>
  /**
   * auth_revokeToken - Revoke Token
   */
  'auth_revokeToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthRevokeToken.Responses.$200>
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
    parameters?: Parameters<Paths.AuthStart.PathParameters & Paths.AuthStart.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthStart.Responses.$200 | Paths.AuthStart.Responses.$422>
  /**
   * auth_finish - Finish
   */
  'auth_finish'(
    parameters?: Parameters<Paths.AuthFinish.PathParameters & Paths.AuthFinish.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthFinish.Responses.$200 | Paths.AuthFinish.Responses.$422>
  /**
   * auth_finish - Finish
   */
  'auth_finish'(
    parameters?: Parameters<Paths.AuthFinish.PathParameters & Paths.AuthFinish.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthFinish.Responses.$200 | Paths.AuthFinish.Responses.$422>
  /**
   * user_getCurrentUser - Get Current User
   */
  'user_getCurrentUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetCurrentUser.Responses.$200>
  /**
   * user_getData - Get Data
   */
  'user_getData'(
    parameters?: Parameters<Paths.UserGetData.PathParameters & Paths.UserGetData.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetData.Responses.$200 | Paths.UserGetData.Responses.$422>
  /**
   * user_getUsers - Get Users
   */
  'user_getUsers'(
    parameters?: Parameters<Paths.UserGetUsers.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetUsers.Responses.$200 | Paths.UserGetUsers.Responses.$422>
  /**
   * user_createUser - Create User
   */
  'user_createUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UserCreateUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserCreateUser.Responses.$200 | Paths.UserCreateUser.Responses.$422>
  /**
   * user_getAttributeHistory - Get Attribute History
   */
  'user_getAttributeHistory'(
    parameters?: Parameters<Paths.UserGetAttributeHistory.PathParameters & Paths.UserGetAttributeHistory.QueryParameters> | null,
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
   * user_editMembership - Edit Membership
   */
  'user_editMembership'(
    parameters?: Parameters<Paths.UserEditMembership.PathParameters> | null,
    data?: Paths.UserEditMembership.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserEditMembership.Responses.$200 | Paths.UserEditMembership.Responses.$422>
  /**
   * user_endMembership - End Membership
   */
  'user_endMembership'(
    parameters?: Parameters<Paths.UserEndMembership.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserEndMembership.Responses.$200 | Paths.UserEndMembership.Responses.$422>
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
   * server_getBundles - Get Bundles
   */
  'server_getBundles'(
    parameters?: Parameters<Paths.ServerGetBundles.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetBundles.Responses.$200 | Paths.ServerGetBundles.Responses.$422>
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
   * server_getServerByBundle - Get Server By Bundle
   */
  'server_getServerByBundle'(
    parameters?: Parameters<Paths.ServerGetServerByBundle.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetServerByBundle.Responses.$200 | Paths.ServerGetServerByBundle.Responses.$422>
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
   * server_getBundleTokens - Get Bundle Tokens
   */
  'server_getBundleTokens'(
    parameters?: Parameters<Paths.ServerGetBundleTokens.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetBundleTokens.Responses.$200 | Paths.ServerGetBundleTokens.Responses.$422>
  /**
   * server_createBundleToken - Create Bundle Token
   */
  'server_createBundleToken'(
    parameters?: Parameters<Paths.ServerCreateBundleToken.PathParameters> | null,
    data?: Paths.ServerCreateBundleToken.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerCreateBundleToken.Responses.$200 | Paths.ServerCreateBundleToken.Responses.$422>
  /**
   * server_revokeBundleToken - Revoke Bundle Token
   */
  'server_revokeBundleToken'(
    parameters?: Parameters<Paths.ServerRevokeBundleToken.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerRevokeBundleToken.Responses.$200 | Paths.ServerRevokeBundleToken.Responses.$422>
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
   * server_createServer - Create Server
   */
  'server_createServer'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ServerCreateServer.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerCreateServer.Responses.$200 | Paths.ServerCreateServer.Responses.$422>
  /**
   * server_getServer - Get Server
   */
  'server_getServer'(
    parameters?: Parameters<Paths.ServerGetServer.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetServer.Responses.$200 | Paths.ServerGetServer.Responses.$422>
  /**
   * server_editServer - Edit Server
   */
  'server_editServer'(
    parameters?: Parameters<Paths.ServerEditServer.PathParameters> | null,
    data?: Paths.ServerEditServer.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerEditServer.Responses.$200 | Paths.ServerEditServer.Responses.$422>
  /**
   * server_deleteServer - Delete Server
   */
  'server_deleteServer'(
    parameters?: Parameters<Paths.ServerDeleteServer.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerDeleteServer.Responses.$200 | Paths.ServerDeleteServer.Responses.$422>
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
   * group_getGroupMembers - Get Group Members
   */
  'group_getGroupMembers'(
    parameters?: Parameters<Paths.GroupGetGroupMembers.PathParameters & Paths.GroupGetGroupMembers.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupGetGroupMembers.Responses.$200 | Paths.GroupGetGroupMembers.Responses.$422>
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
   * group_getAllProperties - Get All Properties
   * 
   * Returns all possible permission properties with a short description.
   */
  'group_getAllProperties'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupGetAllProperties.Responses.$200>
  /**
   * ban_getBans - Get Bans
   */
  'ban_getBans'(
    parameters?: Parameters<Paths.BanGetBans.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanGetBans.Responses.$200 | Paths.BanGetBans.Responses.$422>
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
   * warning_getWarnings - Get Warnings
   */
  'warning_getWarnings'(
    parameters?: Parameters<Paths.WarningGetWarnings.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WarningGetWarnings.Responses.$200 | Paths.WarningGetWarnings.Responses.$422>
  /**
   * warning_addWarning - Add Warning
   */
  'warning_addWarning'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.WarningAddWarning.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WarningAddWarning.Responses.$200 | Paths.WarningAddWarning.Responses.$422>
  /**
   * warning_getWarningConfig - Get Warning Config
   */
  'warning_getWarningConfig'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WarningGetWarningConfig.Responses.$200>
  /**
   * warning_updateWarningConfig - Update Warning Config
   */
  'warning_updateWarningConfig'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.WarningUpdateWarningConfig.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WarningUpdateWarningConfig.Responses.$200 | Paths.WarningUpdateWarningConfig.Responses.$422>
  /**
   * warning_toggleWarningStatus - Toggle Warning Status
   */
  'warning_toggleWarningStatus'(
    parameters?: Parameters<Paths.WarningToggleWarningStatus.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WarningToggleWarningStatus.Responses.$200 | Paths.WarningToggleWarningStatus.Responses.$422>
  /**
   * warning_deleteWarning - Delete Warning
   */
  'warning_deleteWarning'(
    parameters?: Parameters<Paths.WarningDeleteWarning.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WarningDeleteWarning.Responses.$200 | Paths.WarningDeleteWarning.Responses.$422>
  /**
   * shop_getGateways - Get Gateways
   */
  'shop_getGateways'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetGateways.Responses.$200>
  /**
   * shop_createGateway - Create Gateway
   */
  'shop_createGateway'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ShopCreateGateway.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopCreateGateway.Responses.$200 | Paths.ShopCreateGateway.Responses.$422>
  /**
   * shop_editGateway - Edit Gateway
   */
  'shop_editGateway'(
    parameters?: Parameters<Paths.ShopEditGateway.PathParameters> | null,
    data?: Paths.ShopEditGateway.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopEditGateway.Responses.$200 | Paths.ShopEditGateway.Responses.$422>
  /**
   * shop_deleteGateway - Delete Gateway
   */
  'shop_deleteGateway'(
    parameters?: Parameters<Paths.ShopDeleteGateway.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopDeleteGateway.Responses.$200 | Paths.ShopDeleteGateway.Responses.$422>
  /**
   * shop_getDiscounts - Get Discounts
   */
  'shop_getDiscounts'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetDiscounts.Responses.$200>
  /**
   * shop_createDiscount - Create Discount
   */
  'shop_createDiscount'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ShopCreateDiscount.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopCreateDiscount.Responses.$200 | Paths.ShopCreateDiscount.Responses.$422>
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
   * shop_editDiscount - Edit Discount
   */
  'shop_editDiscount'(
    parameters?: Parameters<Paths.ShopEditDiscount.PathParameters> | null,
    data?: Paths.ShopEditDiscount.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopEditDiscount.Responses.$200 | Paths.ShopEditDiscount.Responses.$422>
  /**
   * shop_deleteDiscount - Delete Discount
   */
  'shop_deleteDiscount'(
    parameters?: Parameters<Paths.ShopDeleteDiscount.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopDeleteDiscount.Responses.$200 | Paths.ShopDeleteDiscount.Responses.$422>
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
   * shop_getCartPackets - Get Cart Packets
   */
  'shop_getCartPackets'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetCartPackets.Responses.$200>
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
   * shop_finishPayment - Finish Payment
   * 
   * Meant for payments than can be finished "in house". For example credits.
   */
  'shop_finishPayment'(
    parameters?: Parameters<Paths.ShopFinishPayment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopFinishPayment.Responses.$200 | Paths.ShopFinishPayment.Responses.$422>
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
    parameters?: Parameters<Paths.ShopGetPurchases.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetPurchases.Responses.$200 | Paths.ShopGetPurchases.Responses.$422>
  /**
   * shop_getAvailablePurchaseStatus - Get Available Purchase Status
   */
  'shop_getAvailablePurchaseStatus'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetAvailablePurchaseStatus.Responses.$200>
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
   * shop_getCurrencies - Get Currencies
   * 
   * Get all currencies that were used in purchases.
   */
  'shop_getCurrencies'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetCurrencies.Responses.$200>
  /**
   * shop_getDebitStatistic - Get Debit Statistic
   */
  'shop_getDebitStatistic'(
    parameters?: Parameters<Paths.ShopGetDebitStatistic.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetDebitStatistic.Responses.$200 | Paths.ShopGetDebitStatistic.Responses.$422>
  /**
   * shop_getPurchaseStatistic - Get Purchase Statistic
   */
  'shop_getPurchaseStatistic'(
    parameters?: Parameters<Paths.ShopGetPurchaseStatistic.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetPurchaseStatistic.Responses.$200 | Paths.ShopGetPurchaseStatistic.Responses.$422>
  /**
   * shop_getTaxRules - Get Tax Rules
   */
  'shop_getTaxRules'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetTaxRules.Responses.$200>
  /**
   * shop_createTaxRule - Create Tax Rule
   */
  'shop_createTaxRule'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ShopCreateTaxRule.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopCreateTaxRule.Responses.$200 | Paths.ShopCreateTaxRule.Responses.$422>
  /**
   * shop_deleteTaxRule - Delete Tax Rule
   */
  'shop_deleteTaxRule'(
    parameters?: Parameters<Paths.ShopDeleteTaxRule.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopDeleteTaxRule.Responses.$200 | Paths.ShopDeleteTaxRule.Responses.$422>
  /**
   * shop_getGeneralConfig - Get General Config
   */
  'shop_getGeneralConfig'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetGeneralConfig.Responses.$200>
  /**
   * shop_editGeneralConfig - Edit General Config
   */
  'shop_editGeneralConfig'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ShopEditGeneralConfig.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopEditGeneralConfig.Responses.$200 | Paths.ShopEditGeneralConfig.Responses.$422>
  /**
   * shop_getDonationGoal - Get Donation Goal
   */
  'shop_getDonationGoal'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetDonationGoal.Responses.$200>
  /**
   * shop_getBusinessAddress - Get Business Address
   */
  'shop_getBusinessAddress'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetBusinessAddress.Responses.$200>
  /**
   * shop_changeBusinessAddress - Change Business Address
   */
  'shop_changeBusinessAddress'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ShopChangeBusinessAddress.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopChangeBusinessAddress.Responses.$200 | Paths.ShopChangeBusinessAddress.Responses.$422>
  /**
   * packet_getCategories - Get Categories
   */
  'packet_getCategories'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketGetCategories.Responses.$200>
  /**
   * packet_createCategory - Create Category
   */
  'packet_createCategory'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PacketCreateCategory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketCreateCategory.Responses.$200 | Paths.PacketCreateCategory.Responses.$422>
  /**
   * packet_editCategory - Edit Category
   */
  'packet_editCategory'(
    parameters?: Parameters<Paths.PacketEditCategory.PathParameters> | null,
    data?: Paths.PacketEditCategory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketEditCategory.Responses.$200 | Paths.PacketEditCategory.Responses.$422>
  /**
   * packet_deleteCategory - Delete Category
   */
  'packet_deleteCategory'(
    parameters?: Parameters<Paths.PacketDeleteCategory.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketDeleteCategory.Responses.$200 | Paths.PacketDeleteCategory.Responses.$422>
  /**
   * packet_getPackets - Get Packets
   */
  'packet_getPackets'(
    parameters?: Parameters<Paths.PacketGetPackets.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketGetPackets.Responses.$200 | Paths.PacketGetPackets.Responses.$422>
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
    parameters?: Parameters<Paths.PacketGetAppliedPackets.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketGetAppliedPackets.Responses.$200 | Paths.PacketGetAppliedPackets.Responses.$422>
  /**
   * packet_getAvailablePacketStatus - Get Available Packet Status
   */
  'packet_getAvailablePacketStatus'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketGetAvailablePacketStatus.Responses.$200>
  /**
   * packet_editAppliedPacket - Edit Applied Packet
   */
  'packet_editAppliedPacket'(
    parameters?: Parameters<Paths.PacketEditAppliedPacket.PathParameters> | null,
    data?: Paths.PacketEditAppliedPacket.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketEditAppliedPacket.Responses.$200 | Paths.PacketEditAppliedPacket.Responses.$422>
  /**
   * packet_deleteAppliedPacket - Delete Applied Packet
   */
  'packet_deleteAppliedPacket'(
    parameters?: Parameters<Paths.PacketDeleteAppliedPacket.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketDeleteAppliedPacket.Responses.$200 | Paths.PacketDeleteAppliedPacket.Responses.$422>
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
  /**
   * requirements_editRequirementSet - Edit Requirement Set
   */
  'requirements_editRequirementSet'(
    parameters?: Parameters<Paths.RequirementsEditRequirementSet.PathParameters> | null,
    data?: Paths.RequirementsEditRequirementSet.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequirementsEditRequirementSet.Responses.$200 | Paths.RequirementsEditRequirementSet.Responses.$422>
  /**
   * finance_getAccount - Get Account
   */
  'finance_getAccount'(
    parameters?: Parameters<Paths.FinanceGetAccount.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FinanceGetAccount.Responses.$200 | Paths.FinanceGetAccount.Responses.$422>
  /**
   * notification_getStream - Get Stream
   */
  'notification_getStream'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NotificationGetStream.Responses.$200>
  /**
   * notification_getNotifications - Get Notifications
   */
  'notification_getNotifications'(
    parameters?: Parameters<Paths.NotificationGetNotifications.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NotificationGetNotifications.Responses.$200 | Paths.NotificationGetNotifications.Responses.$422>
  /**
   * notification_markAsRead - Mark As Read
   */
  'notification_markAsRead'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.NotificationMarkAsRead.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NotificationMarkAsRead.Responses.$200 | Paths.NotificationMarkAsRead.Responses.$422>
  /**
   * notification_getCategories - Get Categories
   */
  'notification_getCategories'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NotificationGetCategories.Responses.$200>
  /**
   * log_getLog - Get Log
   */
  'log_getLog'(
    parameters?: Parameters<Paths.LogGetLog.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LogGetLog.Responses.$200 | Paths.LogGetLog.Responses.$422>
  /**
   * log_getCategories - Get Categories
   */
  'log_getCategories'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LogGetCategories.Responses.$200>
  /**
   * webhook_stripeEvent - Stripe Event
   */
  'webhook_stripeEvent'(
    parameters?: Parameters<Paths.WebhookStripeEvent.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WebhookStripeEvent.Responses.$200 | Paths.WebhookStripeEvent.Responses.$422>
  /**
   * forum_getThreads - Get Threads
   */
  'forum_getThreads'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumGetThreads.Responses.$200>
  /**
   * forum_newThread - New Thread
   */
  'forum_newThread'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ForumNewThread.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumNewThread.Responses.$200 | Paths.ForumNewThread.Responses.$422>
  /**
   * forum_getTickets - Get Tickets
   */
  'forum_getTickets'(
    parameters?: Parameters<Paths.ForumGetTickets.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumGetTickets.Responses.$200 | Paths.ForumGetTickets.Responses.$422>
  /**
   * forum_getThread - Get Thread
   */
  'forum_getThread'(
    parameters?: Parameters<Paths.ForumGetThread.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumGetThread.Responses.$200 | Paths.ForumGetThread.Responses.$422>
  /**
   * forum_toggleStatus - Toggle Status
   */
  'forum_toggleStatus'(
    parameters?: Parameters<Paths.ForumToggleStatus.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumToggleStatus.Responses.$200 | Paths.ForumToggleStatus.Responses.$422>
  /**
   * forum_getThreadPosts - Get Thread Posts
   */
  'forum_getThreadPosts'(
    parameters?: Parameters<Paths.ForumGetThreadPosts.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumGetThreadPosts.Responses.$200 | Paths.ForumGetThreadPosts.Responses.$422>
  /**
   * forum_newPost - New Post
   */
  'forum_newPost'(
    parameters?: Parameters<Paths.ForumNewPost.PathParameters> | null,
    data?: Paths.ForumNewPost.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumNewPost.Responses.$200 | Paths.ForumNewPost.Responses.$422>
  /**
   * discord_getGuildRoles - Get Guild Roles
   */
  'discord_getGuildRoles'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DiscordGetGuildRoles.Responses.$200>
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
     * design_deleteCmsHtml - Delete Cms Html
     */
    'delete'(
      parameters?: Parameters<Paths.DesignDeleteCmsHtml.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DesignDeleteCmsHtml.Responses.$200 | Paths.DesignDeleteCmsHtml.Responses.$422>
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
  ['/design/general-settings']: {
    /**
     * design_getGeneralSettings - Get General Settings
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DesignGetGeneralSettings.Responses.$200>
    /**
     * design_editGeneralSettings - Edit General Settings
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DesignEditGeneralSettings.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DesignEditGeneralSettings.Responses.$200 | Paths.DesignEditGeneralSettings.Responses.$422>
  }
  ['/design/donation-goal']: {
    /**
     * design_getDonationGoal - Get Donation Goal
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DesignGetDonationGoal.Responses.$200>
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
  ['/auth/revoke']: {
    /**
     * auth_revokeToken - Revoke Token
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthRevokeToken.Responses.$200>
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
      parameters?: Parameters<Paths.AuthStart.PathParameters & Paths.AuthStart.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthStart.Responses.$200 | Paths.AuthStart.Responses.$422>
  }
  ['/auth/social/{backend}/finish']: {
    /**
     * auth_finish - Finish
     */
    'get'(
      parameters?: Parameters<Paths.AuthFinish.PathParameters & Paths.AuthFinish.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthFinish.Responses.$200 | Paths.AuthFinish.Responses.$422>
    /**
     * auth_finish - Finish
     */
    'post'(
      parameters?: Parameters<Paths.AuthFinish.PathParameters & Paths.AuthFinish.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthFinish.Responses.$200 | Paths.AuthFinish.Responses.$422>
  }
  ['/user/current']: {
    /**
     * user_getCurrentUser - Get Current User
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetCurrentUser.Responses.$200>
  }
  ['/user/{identifier}']: {
    /**
     * user_getData - Get Data
     */
    'get'(
      parameters?: Parameters<Paths.UserGetData.PathParameters & Paths.UserGetData.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetData.Responses.$200 | Paths.UserGetData.Responses.$422>
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
    /**
     * user_createUser - Create User
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UserCreateUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserCreateUser.Responses.$200 | Paths.UserCreateUser.Responses.$422>
  }
  ['/user/{uuid}/attribute/{definition_id}']: {
    /**
     * user_getAttributeHistory - Get Attribute History
     */
    'get'(
      parameters?: Parameters<Paths.UserGetAttributeHistory.PathParameters & Paths.UserGetAttributeHistory.QueryParameters> | null,
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
  ['/user/membership/{uuid}']: {
    /**
     * user_endMembership - End Membership
     */
    'delete'(
      parameters?: Parameters<Paths.UserEndMembership.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserEndMembership.Responses.$200 | Paths.UserEndMembership.Responses.$422>
    /**
     * user_editMembership - Edit Membership
     */
    'patch'(
      parameters?: Parameters<Paths.UserEditMembership.PathParameters> | null,
      data?: Paths.UserEditMembership.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserEditMembership.Responses.$200 | Paths.UserEditMembership.Responses.$422>
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
     * server_getBundles - Get Bundles
     */
    'get'(
      parameters?: Parameters<Paths.ServerGetBundles.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetBundles.Responses.$200 | Paths.ServerGetBundles.Responses.$422>
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
     * server_getServerByBundle - Get Server By Bundle
     */
    'get'(
      parameters?: Parameters<Paths.ServerGetServerByBundle.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetServerByBundle.Responses.$200 | Paths.ServerGetServerByBundle.Responses.$422>
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
  ['/server/bundle/{uuid}/token']: {
    /**
     * server_getBundleTokens - Get Bundle Tokens
     */
    'get'(
      parameters?: Parameters<Paths.ServerGetBundleTokens.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetBundleTokens.Responses.$200 | Paths.ServerGetBundleTokens.Responses.$422>
    /**
     * server_createBundleToken - Create Bundle Token
     */
    'post'(
      parameters?: Parameters<Paths.ServerCreateBundleToken.PathParameters> | null,
      data?: Paths.ServerCreateBundleToken.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerCreateBundleToken.Responses.$200 | Paths.ServerCreateBundleToken.Responses.$422>
  }
  ['/server/bundle/{uuid}/token/{token_id}']: {
    /**
     * server_revokeBundleToken - Revoke Bundle Token
     */
    'patch'(
      parameters?: Parameters<Paths.ServerRevokeBundleToken.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerRevokeBundleToken.Responses.$200 | Paths.ServerRevokeBundleToken.Responses.$422>
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
    /**
     * server_createServer - Create Server
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ServerCreateServer.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerCreateServer.Responses.$200 | Paths.ServerCreateServer.Responses.$422>
  }
  ['/server/{uuid}']: {
    /**
     * server_getServer - Get Server
     */
    'get'(
      parameters?: Parameters<Paths.ServerGetServer.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetServer.Responses.$200 | Paths.ServerGetServer.Responses.$422>
    /**
     * server_deleteServer - Delete Server
     */
    'delete'(
      parameters?: Parameters<Paths.ServerDeleteServer.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerDeleteServer.Responses.$200 | Paths.ServerDeleteServer.Responses.$422>
    /**
     * server_editServer - Edit Server
     */
    'patch'(
      parameters?: Parameters<Paths.ServerEditServer.PathParameters> | null,
      data?: Paths.ServerEditServer.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerEditServer.Responses.$200 | Paths.ServerEditServer.Responses.$422>
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
  ['/group/{uuid}/members']: {
    /**
     * group_getGroupMembers - Get Group Members
     */
    'get'(
      parameters?: Parameters<Paths.GroupGetGroupMembers.PathParameters & Paths.GroupGetGroupMembers.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupGetGroupMembers.Responses.$200 | Paths.GroupGetGroupMembers.Responses.$422>
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
  ['/group/property/']: {
    /**
     * group_getAllProperties - Get All Properties
     * 
     * Returns all possible permission properties with a short description.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupGetAllProperties.Responses.$200>
  }
  ['/ban/']: {
    /**
     * ban_getBans - Get Bans
     */
    'get'(
      parameters?: Parameters<Paths.BanGetBans.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanGetBans.Responses.$200 | Paths.BanGetBans.Responses.$422>
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
  ['/warning/']: {
    /**
     * warning_getWarnings - Get Warnings
     */
    'get'(
      parameters?: Parameters<Paths.WarningGetWarnings.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WarningGetWarnings.Responses.$200 | Paths.WarningGetWarnings.Responses.$422>
    /**
     * warning_addWarning - Add Warning
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.WarningAddWarning.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WarningAddWarning.Responses.$200 | Paths.WarningAddWarning.Responses.$422>
  }
  ['/warning/config']: {
    /**
     * warning_getWarningConfig - Get Warning Config
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WarningGetWarningConfig.Responses.$200>
    /**
     * warning_updateWarningConfig - Update Warning Config
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.WarningUpdateWarningConfig.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WarningUpdateWarningConfig.Responses.$200 | Paths.WarningUpdateWarningConfig.Responses.$422>
  }
  ['/warning/{uuid}/toggle']: {
    /**
     * warning_toggleWarningStatus - Toggle Warning Status
     */
    'patch'(
      parameters?: Parameters<Paths.WarningToggleWarningStatus.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WarningToggleWarningStatus.Responses.$200 | Paths.WarningToggleWarningStatus.Responses.$422>
  }
  ['/warning/{uuid}']: {
    /**
     * warning_deleteWarning - Delete Warning
     */
    'delete'(
      parameters?: Parameters<Paths.WarningDeleteWarning.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WarningDeleteWarning.Responses.$200 | Paths.WarningDeleteWarning.Responses.$422>
  }
  ['/shop/gateway/']: {
    /**
     * shop_getGateways - Get Gateways
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetGateways.Responses.$200>
    /**
     * shop_createGateway - Create Gateway
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ShopCreateGateway.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopCreateGateway.Responses.$200 | Paths.ShopCreateGateway.Responses.$422>
  }
  ['/shop/gateway/{uuid}']: {
    /**
     * shop_deleteGateway - Delete Gateway
     */
    'delete'(
      parameters?: Parameters<Paths.ShopDeleteGateway.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopDeleteGateway.Responses.$200 | Paths.ShopDeleteGateway.Responses.$422>
    /**
     * shop_editGateway - Edit Gateway
     */
    'patch'(
      parameters?: Parameters<Paths.ShopEditGateway.PathParameters> | null,
      data?: Paths.ShopEditGateway.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopEditGateway.Responses.$200 | Paths.ShopEditGateway.Responses.$422>
  }
  ['/shop/discount/']: {
    /**
     * shop_getDiscounts - Get Discounts
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetDiscounts.Responses.$200>
    /**
     * shop_createDiscount - Create Discount
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ShopCreateDiscount.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopCreateDiscount.Responses.$200 | Paths.ShopCreateDiscount.Responses.$422>
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
  ['/shop/discount/{uuid}']: {
    /**
     * shop_deleteDiscount - Delete Discount
     */
    'delete'(
      parameters?: Parameters<Paths.ShopDeleteDiscount.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopDeleteDiscount.Responses.$200 | Paths.ShopDeleteDiscount.Responses.$422>
    /**
     * shop_editDiscount - Edit Discount
     */
    'patch'(
      parameters?: Parameters<Paths.ShopEditDiscount.PathParameters> | null,
      data?: Paths.ShopEditDiscount.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopEditDiscount.Responses.$200 | Paths.ShopEditDiscount.Responses.$422>
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
     * shop_getCartPackets - Get Cart Packets
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetCartPackets.Responses.$200>
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
     * shop_finishPayment - Finish Payment
     * 
     * Meant for payments than can be finished "in house". For example credits.
     */
    'post'(
      parameters?: Parameters<Paths.ShopFinishPayment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopFinishPayment.Responses.$200 | Paths.ShopFinishPayment.Responses.$422>
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
      parameters?: Parameters<Paths.ShopGetPurchases.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetPurchases.Responses.$200 | Paths.ShopGetPurchases.Responses.$422>
  }
  ['/shop/available_purchase_status']: {
    /**
     * shop_getAvailablePurchaseStatus - Get Available Purchase Status
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetAvailablePurchaseStatus.Responses.$200>
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
  ['/shop/currency']: {
    /**
     * shop_getCurrencies - Get Currencies
     * 
     * Get all currencies that were used in purchases.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetCurrencies.Responses.$200>
  }
  ['/shop/debit/statistic']: {
    /**
     * shop_getDebitStatistic - Get Debit Statistic
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetDebitStatistic.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetDebitStatistic.Responses.$200 | Paths.ShopGetDebitStatistic.Responses.$422>
  }
  ['/shop/purchase/statistic']: {
    /**
     * shop_getPurchaseStatistic - Get Purchase Statistic
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetPurchaseStatistic.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetPurchaseStatistic.Responses.$200 | Paths.ShopGetPurchaseStatistic.Responses.$422>
  }
  ['/shop/tax']: {
    /**
     * shop_getTaxRules - Get Tax Rules
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetTaxRules.Responses.$200>
    /**
     * shop_createTaxRule - Create Tax Rule
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ShopCreateTaxRule.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopCreateTaxRule.Responses.$200 | Paths.ShopCreateTaxRule.Responses.$422>
  }
  ['/shop/tax/{uuid}']: {
    /**
     * shop_deleteTaxRule - Delete Tax Rule
     */
    'delete'(
      parameters?: Parameters<Paths.ShopDeleteTaxRule.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopDeleteTaxRule.Responses.$200 | Paths.ShopDeleteTaxRule.Responses.$422>
  }
  ['/shop/general-settings']: {
    /**
     * shop_getGeneralConfig - Get General Config
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetGeneralConfig.Responses.$200>
    /**
     * shop_editGeneralConfig - Edit General Config
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ShopEditGeneralConfig.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopEditGeneralConfig.Responses.$200 | Paths.ShopEditGeneralConfig.Responses.$422>
  }
  ['/shop/donation-goal']: {
    /**
     * shop_getDonationGoal - Get Donation Goal
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetDonationGoal.Responses.$200>
  }
  ['/shop/business-address']: {
    /**
     * shop_getBusinessAddress - Get Business Address
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetBusinessAddress.Responses.$200>
    /**
     * shop_changeBusinessAddress - Change Business Address
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ShopChangeBusinessAddress.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopChangeBusinessAddress.Responses.$200 | Paths.ShopChangeBusinessAddress.Responses.$422>
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
    /**
     * packet_createCategory - Create Category
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PacketCreateCategory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketCreateCategory.Responses.$200 | Paths.PacketCreateCategory.Responses.$422>
  }
  ['/packet/category/{uuid}']: {
    /**
     * packet_deleteCategory - Delete Category
     */
    'delete'(
      parameters?: Parameters<Paths.PacketDeleteCategory.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketDeleteCategory.Responses.$200 | Paths.PacketDeleteCategory.Responses.$422>
    /**
     * packet_editCategory - Edit Category
     */
    'patch'(
      parameters?: Parameters<Paths.PacketEditCategory.PathParameters> | null,
      data?: Paths.PacketEditCategory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketEditCategory.Responses.$200 | Paths.PacketEditCategory.Responses.$422>
  }
  ['/packet/']: {
    /**
     * packet_getPackets - Get Packets
     */
    'get'(
      parameters?: Parameters<Paths.PacketGetPackets.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketGetPackets.Responses.$200 | Paths.PacketGetPackets.Responses.$422>
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
      parameters?: Parameters<Paths.PacketGetAppliedPackets.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketGetAppliedPackets.Responses.$200 | Paths.PacketGetAppliedPackets.Responses.$422>
  }
  ['/packet/available_packet_status']: {
    /**
     * packet_getAvailablePacketStatus - Get Available Packet Status
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketGetAvailablePacketStatus.Responses.$200>
  }
  ['/packet/applied/{uuid}']: {
    /**
     * packet_deleteAppliedPacket - Delete Applied Packet
     */
    'delete'(
      parameters?: Parameters<Paths.PacketDeleteAppliedPacket.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketDeleteAppliedPacket.Responses.$200 | Paths.PacketDeleteAppliedPacket.Responses.$422>
    /**
     * packet_editAppliedPacket - Edit Applied Packet
     */
    'patch'(
      parameters?: Parameters<Paths.PacketEditAppliedPacket.PathParameters> | null,
      data?: Paths.PacketEditAppliedPacket.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketEditAppliedPacket.Responses.$200 | Paths.PacketEditAppliedPacket.Responses.$422>
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
  ['/requirement/set/{uuid}']: {
    /**
     * requirements_editRequirementSet - Edit Requirement Set
     */
    'patch'(
      parameters?: Parameters<Paths.RequirementsEditRequirementSet.PathParameters> | null,
      data?: Paths.RequirementsEditRequirementSet.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequirementsEditRequirementSet.Responses.$200 | Paths.RequirementsEditRequirementSet.Responses.$422>
  }
  ['/finance/account/{uuid}']: {
    /**
     * finance_getAccount - Get Account
     */
    'get'(
      parameters?: Parameters<Paths.FinanceGetAccount.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FinanceGetAccount.Responses.$200 | Paths.FinanceGetAccount.Responses.$422>
  }
  ['/notification/stream']: {
    /**
     * notification_getStream - Get Stream
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NotificationGetStream.Responses.$200>
  }
  ['/notification/']: {
    /**
     * notification_getNotifications - Get Notifications
     */
    'get'(
      parameters?: Parameters<Paths.NotificationGetNotifications.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NotificationGetNotifications.Responses.$200 | Paths.NotificationGetNotifications.Responses.$422>
    /**
     * notification_markAsRead - Mark As Read
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.NotificationMarkAsRead.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NotificationMarkAsRead.Responses.$200 | Paths.NotificationMarkAsRead.Responses.$422>
  }
  ['/notification/type']: {
    /**
     * notification_getCategories - Get Categories
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NotificationGetCategories.Responses.$200>
  }
  ['/log/']: {
    /**
     * log_getLog - Get Log
     */
    'get'(
      parameters?: Parameters<Paths.LogGetLog.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LogGetLog.Responses.$200 | Paths.LogGetLog.Responses.$422>
  }
  ['/log/type']: {
    /**
     * log_getCategories - Get Categories
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LogGetCategories.Responses.$200>
  }
  ['/webhook/stripe/{uuid}']: {
    /**
     * webhook_stripeEvent - Stripe Event
     */
    'post'(
      parameters?: Parameters<Paths.WebhookStripeEvent.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WebhookStripeEvent.Responses.$200 | Paths.WebhookStripeEvent.Responses.$422>
  }
  ['/forum/']: {
    /**
     * forum_getThreads - Get Threads
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumGetThreads.Responses.$200>
    /**
     * forum_newThread - New Thread
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ForumNewThread.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumNewThread.Responses.$200 | Paths.ForumNewThread.Responses.$422>
  }
  ['/forum/ticket']: {
    /**
     * forum_getTickets - Get Tickets
     */
    'get'(
      parameters?: Parameters<Paths.ForumGetTickets.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumGetTickets.Responses.$200 | Paths.ForumGetTickets.Responses.$422>
  }
  ['/forum/{uuid}']: {
    /**
     * forum_getThread - Get Thread
     */
    'get'(
      parameters?: Parameters<Paths.ForumGetThread.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumGetThread.Responses.$200 | Paths.ForumGetThread.Responses.$422>
    /**
     * forum_toggleStatus - Toggle Status
     */
    'patch'(
      parameters?: Parameters<Paths.ForumToggleStatus.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumToggleStatus.Responses.$200 | Paths.ForumToggleStatus.Responses.$422>
  }
  ['/forum/{uuid}/post']: {
    /**
     * forum_getThreadPosts - Get Thread Posts
     */
    'get'(
      parameters?: Parameters<Paths.ForumGetThreadPosts.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumGetThreadPosts.Responses.$200 | Paths.ForumGetThreadPosts.Responses.$422>
    /**
     * forum_newPost - New Post
     */
    'post'(
      parameters?: Parameters<Paths.ForumNewPost.PathParameters> | null,
      data?: Paths.ForumNewPost.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumNewPost.Responses.$200 | Paths.ForumNewPost.Responses.$422>
  }
  ['/discord/roles']: {
    /**
     * discord_getGuildRoles - Get Guild Roles
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DiscordGetGuildRoles.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
