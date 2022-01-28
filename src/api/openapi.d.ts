import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios'; 

declare namespace Components {
    namespace Schemas {
        /**
         * APITokenCreateModel
         */
        export interface APITokenCreateModel {
            /**
             * Name
             */
            name?: string;
            /**
             * Serverbundle Id
             */
            serverbundle_id?: string; // uuid
            /**
             * Properties
             */
            properties?: string /* ^[a-z][a-z_]*$ */[];
        }
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
            currency?: /* CurrencyModel */ CurrencyModel;
            /**
             * Balance
             */
            balance?: number;
            /**
             * Transactions
             */
            transactions: /* TransactionModel */ TransactionModel[];
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
            country: /* CountryModel */ CountryModel;
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
         * AppliedPacketModel
         */
        export interface AppliedPacketModel {
            /**
             * Id
             */
            id: string; // uuid
            status: /**
             * AppliedPacketStatus
             * An enumeration.
             */
            AppliedPacketStatus;
            packet: /* PacketModelShort */ PacketModelShort;
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
            user: /* UserModelShort */ ModelUserUserUserModelShort;
        }
        /**
         * AppliedPacketModelAdd
         */
        export interface AppliedPacketModelAdd {
            /**
             * Packet Id
             */
            packet_id: string; // uuid
            /**
             * User Id
             */
            user_id: string; // uuid
        }
        /**
         * AppliedPacketModelPatch
         */
        export interface AppliedPacketModelPatch {
            status?: /**
             * AppliedPacketStatus
             * An enumeration.
             */
            AppliedPacketStatus;
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
         * AppliedRewardModel
         */
        export interface AppliedRewardModel {
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Active
             */
            active: boolean;
            reward: /* RewardModel */ RewardModel;
            user: /* UserModelShort */ ModelUserUserModelShort;
            /**
             * Applied Packet Id
             */
            applied_packet_id: string; // uuid
            status: /**
             * RewardStatus
             * An enumeration.
             */
            RewardStatus;
            /**
             * Executed On
             */
            executed_on: string /* uuid */[];
        }
        /**
         * AppliedRewardModelPatch
         */
        export interface AppliedRewardModelPatch {
            status?: /**
             * RewardStatus
             * An enumeration.
             */
            RewardStatus;
            /**
             * Executed On
             */
            executed_on?: string /* uuid */[];
        }
        /**
         * BanModel
         */
        export interface BanModel {
            /**
             * Length
             */
            length?: number; // time-delta
            /**
             * Reason
             */
            reason?: string;
            /**
             * Id
             */
            id: string; // uuid
            creator?: /* UserModelShort */ ModelUserUserUserModelShort;
            user: /* UserModelShort */ ModelUserUserUserModelShort;
            serverbundle?: /* ServerbundleModelShort */ ModelServerServerbundleServerbundleModelShort;
            /**
             * Created On
             */
            created_on: string; // date-time
            status: /**
             * BanStatus
             * An enumeration.
             */
            BanStatus;
            /**
             * Ends On
             */
            ends_on?: string; // date-time
            /**
             * Active
             */
            active: boolean;
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
             * BanStatus
             * An enumeration.
             */
            status?: "ACTIVE" | "UNBANNED";
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
            status?: /**
             * BanStatus
             * An enumeration.
             */
            BanStatus;
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
            extra_properties?: string /* ^[a-z][a-z_]*$ */[];
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
            price: /* TotalPriceModel */ TotalPriceModel;
            /**
             * Packets
             */
            packets: /* CartPacketModel */ CartPacketModel[];
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
            price?: /* TotalPriceModel */ TotalPriceModel;
            /**
             * Credits
             */
            credits?: number;
            currency: /* CurrencyModel */ CurrencyModel;
            packet: /* PacketModelShort */ PacketModelShort;
            /**
             * Packet Title
             */
            packet_title: string;
            /**
             * Last Update
             */
            last_update: string; // date-time
            user: /* UserModelShort */ ModelUserUserUserModelShort;
            /**
             * Recurring
             */
            recurring?: number; // time-delta
            discount?: /* DiscountModel */ DiscountModel;
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
            content?: string;
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
            payment_gateway: /* PaymentGatewayModel */ PaymentGatewayModel;
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
            status: /**
             * DebitStatus
             * An enumeration.
             */
            DebitStatus;
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
            /**
             * Extra
             */
            extra?: {
                [key: string]: any;
            };
            purchase: /* PurchaseModelShort */ PurchaseModelShort;
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
            payment_gateway: /* PaymentGatewayModel */ PaymentGatewayModel;
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
            status: /**
             * DebitStatus
             * An enumeration.
             */
            DebitStatus;
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
            /**
             * Extra
             */
            extra?: {
                [key: string]: any;
            };
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
         * DiscordRoleModel
         */
        export interface DiscordRoleModel {
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
            requirement_set?: /* RequirementSetModel */ RequirementSetModel;
            /**
             * Packets
             */
            packets: /* PacketModelShort */ PacketModelShort[];
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
            packet_ids?: string /* uuid */[];
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
            packet_ids?: string /* uuid */[];
        }
        /**
         * DonationGoalModel
         */
        export interface DonationGoalModel {
            /**
             * Enabled
             */
            enabled: boolean;
            /**
             * Goal
             */
            goal?: number;
            currency: /* CurrencyModel */ CurrencyModel;
            /**
             * Current
             */
            current?: number;
        }
        /**
         * FinanceReportEntry
         */
        export interface FinanceReportEntry {
            /**
             * Country Code
             */
            country_code: string;
            /**
             * Date
             */
            date: string; // date-time
            /**
             * Currency Code
             */
            currency_code: string;
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
             * Amount Total
             */
            amount_total: number;
            /**
             * Payment Gateway Name
             */
            payment_gateway_name: string;
            /**
             * Ext Transaction Id
             */
            ext_transaction_id?: string;
            /**
             * Debit Id
             */
            debit_id: string; // uuid
            /**
             * Invoice Number
             */
            invoice_number?: string;
            /**
             * Recurring
             */
            recurring?: number; // time-delta
            /**
             * Ext Subscription Id
             */
            ext_subscription_id?: string;
            /**
             * User Id
             */
            user_id: string; // uuid
            /**
             * User Name
             */
            user_name: string;
            /**
             * User Email
             */
            user_email: string;
            /**
             * Purchase Id
             */
            purchase_id: string; // uuid
            purchase_status: /**
             * PurchaseStatus
             * An enumeration.
             */
            PurchaseStatus;
        }
        /**
         * FrontendURLModel
         */
        export interface FrontendURLModel {
            /**
             * Frontend Url
             */
            frontend_url: string; // uri
        }
        /**
         * GExtensionImportModel
         */
        export interface GExtensionImportModel {
            /**
             * Url
             */
            url: string; // uri
            /**
             * Api Key
             */
            api_key: string;
            /**
             * Packet Map
             */
            packet_map: {
                [name: string]: string; // uuid
            };
            /**
             * Ignored Reward Ids
             */
            ignored_reward_ids: string /* uuid */[];
            table: /**
             * GExtensionTable
             * An enumeration.
             */
            GExtensionTable;
            /**
             * Page
             */
            page?: number;
        }
        /**
         * GExtensionPacketModel
         */
        export interface GExtensionPacketModel {
            /**
             * Id
             */
            id: number;
            /**
             * Title
             */
            title: string;
            /**
             * Serverbundle Id
             */
            serverbundle_id: number;
        }
        /**
         * GExtensionTable
         * An enumeration.
         */
        export type GExtensionTable = "group" | "serverbundle" | "user" | "user_attribute" | "ban" | "warning" | "applied_packet";
        /**
         * GeneralConfigModel
         */
        export interface GeneralConfigModel {
            /**
             * Community Name
             */
            community_name?: string;
            /**
             * Enable Team
             */
            enable_team?: boolean;
            /**
             * Enable Ticket
             */
            enable_ticket?: boolean;
        }
        /**
         * GroupAndServerbundleModel
         */
        export interface GroupAndServerbundleModel {
            serverbundle: /* ServerbundleModelShort */ ModelServerServerbundleServerbundleModelShort;
            group: /* GroupModel */ GroupModel;
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
             * Properties
             */
            properties: {
                [name: string]: /* PropertyModelGroup */ PropertyModelGroup;
            };
            /**
             * Is Team
             */
            is_team: boolean;
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
             * Properties
             */
            properties?: /* PropertyModelAdd */ PropertyModelAdd[];
            /**
             * Is Team
             */
            is_team: boolean;
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
             * Properties
             */
            properties?: /* PropertyModelAdd */ PropertyModelAdd[];
            /**
             * Is Team
             */
            is_team?: boolean;
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
             * Color
             */
            color: string;
            /**
             * Permission Level
             */
            permission_level: number;
        }
        /**
         * GuildModel
         */
        export interface GuildModel {
            /**
             * Name
             */
            name: string;
            /**
             * Id
             */
            id: number;
            /**
             * Member Count
             */
            member_count: number;
        }
        /**
         * HTTPValidationError
         */
        export interface HTTPValidationError {
            /**
             * Detail
             */
            detail?: /* ValidationError */ ValidationError[];
        }
        /**
         * LegalModel
         */
        export interface LegalModel {
            /**
             * Content
             */
            content: string;
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
            /**
             * Id
             */
            id: string; // uuid
            author?: /* UserModelShort */ ModelUserUserModelShort;
            /**
             * Message
             */
            message: {
                [key: string]: any;
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
            group: /* GroupModelShort */ GroupModelShort;
            /**
             * Active
             */
            active: boolean;
            /**
             * User Id
             */
            user_id: string; // uuid
            serverbundle: /* ServerbundleModelShort */ ModelPydanticServerbundleModelShort;
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
            user: /* UserModelNoLinkedExtraShort */ UserModelNoLinkedExtraShort;
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
            /**
             * Serverbundle Id
             */
            serverbundle_id?: string; // uuid
        }
        /**
         * ServerbundleModelShort
         */
        export interface ModelPydanticServerbundleModelShort {
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
        export interface ModelServerServerbundleServerbundleModelShort {
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
         * UserModelShort
         */
        export interface ModelUserUserModelShort {
            /**
             * Id
             */
            id: string; // uuid
            type: /**
             * UserType
             * An enumeration.
             */
            UserType;
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
        export interface ModelUserUserUserModelShort {
            /**
             * Id
             */
            id: string; // uuid
            type: /**
             * UserType
             * An enumeration.
             */
            UserType;
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
            linkType: /**
             * LinkType
             * An enumeration.
             */
            LinkType;
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
            type: /**
             * NewsType
             * An enumeration.
             */
            NewsType;
            /**
             * Created
             */
            created: string; // date-time
            creator?: /* UserModelShort */ ModelUserUserUserModelShort;
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
            type?: /**
             * NewsType
             * An enumeration.
             */
            NewsType;
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
            type: /**
             * NewsType
             * An enumeration.
             */
            NewsType;
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
                [key: string]: any;
            };
            /**
             * Message
             */
            message: {
                [key: string]: any;
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
            id?: string /* uuid */[];
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
            user?: /* UserModelShort */ ModelUserUserUserModelShort;
            serverbundle?: /* ServerbundleModelShort */ ModelServerServerbundleServerbundleModelShort;
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
             * Artificial
             */
            artificial: boolean;
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
            user?: /* UserModelShort */ ModelUserUserUserModelShort;
            serverbundle?: /* ServerbundleModelShort */ ModelServerServerbundleServerbundleModelShort;
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
             * Artificial
             */
            artificial: boolean;
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
            sort_id?: number;
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
            sort_id?: number;
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
            sort_id?: number;
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
            discount?: /* DiscountModel */ DiscountModel;
            price_with_discount?: /* TotalPriceModel */ TotalPriceModel;
            price_without_discount?: /* TotalPriceModel */ TotalPriceModel;
            /**
             * Id
             */
            id: string; // uuid
            currency: /* CurrencyModel */ CurrencyModel;
            category: /* PacketCategoryModel */ PacketCategoryModel;
            /**
             * Requirement Set Id
             */
            requirement_set_id?: string; // uuid
            /**
             * Relations
             */
            relations: /* PacketRelationModel */ PacketRelationModel[];
            /**
             * Payment Gateways
             */
            payment_gateways: /* PaymentGatewayModel */ PaymentGatewayModel[];
            /**
             * Rewards
             */
            rewards: /* RewardModel */ RewardModel[];
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
            sort_id?: number;
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
            discount?: /* DiscountModel */ DiscountModel;
            price_with_discount?: /* TotalPriceModel */ TotalPriceModel;
            price_without_discount?: /* TotalPriceModel */ TotalPriceModel;
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
            relations: /* PacketRelationModelAdd */ PacketRelationModelAdd[];
            /**
             * Reward Ids
             */
            reward_ids?: string /* uuid */[];
            /**
             * Payment Gateway Ids
             */
            payment_gateway_ids?: string /* uuid */[];
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
            sort_id?: number;
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
            discount?: /* DiscountModel */ DiscountModel;
            price_with_discount?: /* TotalPriceModel */ TotalPriceModel;
            price_without_discount?: /* TotalPriceModel */ TotalPriceModel;
            /**
             * Id
             */
            id: string; // uuid
            currency: /* CurrencyModel */ CurrencyModel;
            category: /* PacketCategoryModel */ PacketCategoryModel;
            /**
             * Requirement Set Id
             */
            requirement_set_id?: string; // uuid
            /**
             * Relations
             */
            relations: /* PacketRelationModel */ PacketRelationModel[];
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
            discount?: /* DiscountModel */ DiscountModel;
            price_with_discount?: /* TotalPriceModel */ TotalPriceModel;
            price_without_discount?: /* TotalPriceModel */ TotalPriceModel;
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
            relations?: /* PacketRelationModelAdd */ PacketRelationModelAdd[];
            /**
             * Reward Ids
             */
            reward_ids?: string /* uuid */[];
            /**
             * Payment Gateway Ids
             */
            payment_gateway_ids?: string /* uuid */[];
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
            discount?: /* DiscountModel */ DiscountModel;
            price_with_discount?: /* TotalPriceModel */ TotalPriceModel;
            price_without_discount?: /* TotalPriceModel */ TotalPriceModel;
            /**
             * Id
             */
            id: string; // uuid
            currency: /* CurrencyModel */ CurrencyModel;
        }
        /**
         * PacketRelationModel
         */
        export interface PacketRelationModel {
            packet_left: /* PacketModelShort */ PacketModelShort;
            packet_right: /* PacketModelShort */ PacketModelShort;
            type: /**
             * PacketRelationType
             * An enumeration.
             */
            PacketRelationType;
        }
        /**
         * PacketRelationModelAdd
         */
        export interface PacketRelationModelAdd {
            /**
             * Packet Right Id
             */
            packet_right_id: string; // uuid
            type: /**
             * PacketRelationType
             * An enumeration.
             */
            PacketRelationType;
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
            items: /* AppliedPacketModel */ AppliedPacketModel[];
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
            items: /* BanModel */ BanModel[];
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
         * Page[DebitModel]
         */
        export interface PageDebitModel {
            /**
             * Items
             */
            items: /* DebitModel */ DebitModel[];
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
            items: /* LogEntryModel */ LogEntryModel[];
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
            items: /* MembershipModelMemberList */ MembershipModelMemberList[];
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
            items: /* NewsModel */ NewsModel[];
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
            items: /* NotificationEntryModel */ NotificationEntryModel[];
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
            items: /* PurchaseModel */ PurchaseModel[];
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
            items: /* ThreadModelShort */ ThreadModelShort[];
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
            items: /* WarningModel */ WarningModel[];
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
                [key: string]: any;
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
            type: /**
             * PaymentGatewayType
             * An enumeration.
             */
            PaymentGatewayType;
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
            type: /**
             * PaymentGatewayType
             * An enumeration.
             */
            PaymentGatewayType;
            /**
             * Attributes
             */
            attributes?: {
                [name: string]: string | any[];
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
                [name: string]: string | any[];
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
        export type PaymentGatewayType = "PAYPAL" | "STRIPE" | "PAYSAFECARD" | "COUPON" | "CREDITS";
        /**
         * PinAddModel
         */
        export interface PinAddModel {
            /**
             * Pins
             */
            pins: string[];
        }
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
            creator: /* UserModelShort */ ModelUserUserUserModelShort;
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
         * PropertyModelAdd
         */
        export interface PropertyModelAdd {
            /**
             * Name
             */
            name: string;
            /**
             * Granted
             */
            granted?: boolean;
            /**
             * Value
             */
            value?: string;
        }
        /**
         * PropertyModelGroup
         */
        export interface PropertyModelGroup {
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
            user: /* UserModelShort */ ModelUserUserModelShort;
            /**
             * Amount Total
             */
            amount_total: number;
            currency: /* CurrencyModel */ CurrencyModel;
            status: /**
             * PurchaseStatus
             * An enumeration.
             */
            PurchaseStatus;
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
            debits: /* DebitModelNoPurchase */ DebitModelNoPurchase[];
            /**
             * Cart Packets
             */
            cart_packets: /* CartPacketModel */ CartPacketModel[];
            address: /* AddressModel */ AddressModel;
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
            status?: /**
             * PurchaseStatus
             * An enumeration.
             */
            PurchaseStatus;
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
            user: /* UserModelShort */ ModelUserUserModelShort;
            /**
             * Amount Total
             */
            amount_total: number;
            currency: /* CurrencyModel */ CurrencyModel;
            status: /**
             * PurchaseStatus
             * An enumeration.
             */
            PurchaseStatus;
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
                [name: string]: /* PurchaseStatisticEntry */ PurchaseStatisticEntry;
            };
            /**
             * Country
             */
            country: {
                [name: string]: /* PurchaseStatisticEntry */ PurchaseStatisticEntry;
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
            type: /**
             * RequirementType
             * An enumeration.
             */
            RequirementType;
            operator: /**
             * RequirementOperator
             * An enumeration.
             */
            RequirementOperator;
            /**
             * Key
             */
            key?: string;
            /**
             * Value
             */
            value?: string;
            /**
             * Requirement Set Id
             */
            requirement_set_id: string; // uuid
        }
        /**
         * RequirementModelAdd
         */
        export interface RequirementModelAdd {
            type: /**
             * RequirementType
             * An enumeration.
             */
            RequirementType;
            operator: /**
             * RequirementOperator
             * An enumeration.
             */
            RequirementOperator;
            /**
             * Key
             */
            key?: string;
            /**
             * Value
             */
            value?: string;
            /**
             * Requirement Set Id
             */
            requirement_set_id: string; // uuid
        }
        /**
         * RequirementOperator
         * An enumeration.
         */
        export type RequirementOperator = "EQ" | "NEQ" | "LEQ" | "GEQ" | "LT" | "GT" | "ACTIVE" | "INACTIVE" | "NEVER_ACTIVE" | "ONLY_ACTIVE" | "ONLY_INACTIVE" | "HAVE" | "NHAVE";
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
            requirements: /* RequirementModel */ RequirementModel[];
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
         * RequirementSetModelShort
         */
        export interface RequirementSetModelShort {
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
             * Fulfilled
             */
            fulfilled?: boolean;
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
            type: /**
             * RewardType
             * An enumeration.
             */
            RewardType;
            /**
             * Data
             */
            data?: {
                [key: string]: any;
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
            on_event: /**
             * RewardEvent
             * An enumeration.
             */
            RewardEvent;
            /**
             * Id
             */
            id: string; // uuid
            serverbundle: /* ServerbundleModelShort */ ModelPydanticServerbundleModelShort;
            requirement_set?: /* RequirementSetModel */ RequirementSetModel;
        }
        /**
         * RewardModelAdd
         */
        export interface RewardModelAdd {
            /**
             * Name
             */
            name: string;
            type: /**
             * RewardType
             * An enumeration.
             */
            RewardType;
            /**
             * Data
             */
            data?: {
                [key: string]: any;
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
            on_event: /**
             * RewardEvent
             * An enumeration.
             */
            RewardEvent;
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
            type?: /**
             * RewardType
             * An enumeration.
             */
            RewardType;
            /**
             * Data
             */
            data?: {
                [key: string]: any;
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
            on_event?: /**
             * RewardEvent
             * An enumeration.
             */
            RewardEvent;
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
         * RewardStatus
         * An enumeration.
         */
        export type RewardStatus = "OPEN" | "EXECUTED" | "FAILED";
        /**
         * RewardType
         * An enumeration.
         */
        export type RewardType = "COMMAND" | "SCRIPT" | "CREDITS" | "MEMBERSHIP";
        /**
         * RoleGroupRelationModel
         */
        export interface RoleGroupRelationModel {
            /**
             * Id
             */
            id: string; // uuid
            group: /* GroupModelShort */ GroupModelShort;
            /**
             * Role Id
             */
            role_id: number;
        }
        /**
         * RoleGroupRelationModelAdd
         */
        export interface RoleGroupRelationModelAdd {
            /**
             * Group Id
             */
            group_id: string; // uuid
            /**
             * Role Id
             */
            role_id: number;
        }
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
            type: /**
             * ServerType
             * An enumeration.
             */
            ServerType;
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
                [key: string]: any;
            };
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Last Update
             */
            last_update?: string; // date-time
            serverbundle?: /* ServerbundleModelShort */ ModelServerServerbundleServerbundleModelShort;
        }
        /**
         * ServerModelAdd
         */
        export interface ServerModelAdd {
            /**
             * Name
             */
            name: string;
            type: /**
             * ServerType
             * An enumeration.
             */
            ServerType;
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
                [key: string]: any;
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
            type?: /**
             * ServerType
             * An enumeration.
             */
            ServerType;
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
                [key: string]: any;
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
            type: /**
             * ServerType
             * An enumeration.
             */
            ServerType;
            /**
             * Serverbundle Id
             */
            serverbundle_id?: string; // uuid
        }
        /**
         * ServerType
         * An enumeration.
         */
        export type ServerType = "GMOD" | "DISCORD";
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
            server_type: /**
             * ServerType
             * An enumeration.
             */
            ServerType;
            default_group?: /* GroupModelShort */ GroupModelShort;
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
         * ShopConfigModel
         */
        export interface ShopConfigModel {
            /**
             * Donation Goal Enabled
             */
            donation_goal_enabled?: boolean;
            /**
             * Donation Goal
             */
            donation_goal?: number;
            /**
             * Donation Goal Currency Code
             */
            donation_goal_currency_code?: string; // ^[A-Z]{3}$
            /**
             * Checkout Checkboxes
             */
            checkout_checkboxes?: any[];
            /**
             * Tax Allow Unknown
             */
            tax_allow_unknown?: boolean;
            /**
             * Invoice Logo Url
             */
            invoice_logo_url?: string; // uri
        }
        /**
         * ShopConfigModelPatch
         */
        export interface ShopConfigModelPatch {
            /**
             * Donation Goal Enabled
             */
            donation_goal_enabled?: boolean;
            /**
             * Donation Goal
             */
            donation_goal?: number;
            /**
             * Donation Goal Currency Code
             */
            donation_goal_currency_code?: string; // ^[A-Z]{3}$
            /**
             * Checkout Checkboxes
             */
            checkout_checkboxes?: any[];
            /**
             * Tax Allow Unknown
             */
            tax_allow_unknown?: boolean;
            /**
             * Invoice Logo Url
             */
            invoice_logo_url?: string; // uri
        }
        /**
         * StartPaymentModel
         */
        export interface StartPaymentModel {
            debit: /* DebitModelNoPurchase */ DebitModelNoPurchase;
            action?: /* PaymentAction */ PaymentAction;
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
            country?: /* CountryModel */ CountryModel;
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
         * TeamMemberModel
         */
        export interface TeamMemberModel {
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Serverbundle Id
             */
            serverbundle_id: string; // uuid
            group: /* GroupModelShort */ GroupModelShort;
            user: /* UserModelShort */ ModelUserUserUserModelShort;
        }
        /**
         * TeamMemberModelPatch
         */
        export interface TeamMemberModelPatch {
            /**
             * Groups
             */
            groups: string /* uuid */[];
        }
        /**
         * ThemeModel
         */
        export interface ThemeModel {
            /**
             * Dark
             */
            dark?: boolean;
            /**
             * Image
             */
            image?: string; // uri
            /**
             * Primary
             */
            primary?: string; // color
            /**
             * Success
             */
            success?: string; // color
            /**
             * Warning
             */
            warning?: string; // color
            /**
             * Error
             */
            error?: string; // color
            /**
             * Background
             */
            background?: string; // color
            /**
             * Logo
             */
            logo?: string; // uri
            /**
             * Logo Width
             */
            logo_width?: number;
            /**
             * Show Community Name
             */
            show_community_name?: boolean;
            /**
             * Community Name
             */
            community_name?: string;
            /**
             * Show Information Fab
             */
            show_information_fab?: boolean;
            /**
             * Favicon
             */
            favicon?: string; // uri
        }
        /**
         * ThemeModelPatch
         */
        export interface ThemeModelPatch {
            /**
             * Dark
             */
            dark?: boolean;
            /**
             * Image
             */
            image?: string; // uri
            /**
             * Primary
             */
            primary?: string; // color
            /**
             * Success
             */
            success?: string; // color
            /**
             * Warning
             */
            warning?: string; // color
            /**
             * Error
             */
            error?: string; // color
            /**
             * Background
             */
            background?: string; // color
            /**
             * Logo
             */
            logo?: string; // uri
            /**
             * Logo Width
             */
            logo_width?: number;
            /**
             * Show Community Name
             */
            show_community_name?: boolean;
            /**
             * Community Name
             */
            community_name?: string;
            /**
             * Show Information Fab
             */
            show_information_fab?: boolean;
            /**
             * Favicon
             */
            favicon?: string; // uri
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
            category: /**
             * ThreadCategory
             * An enumeration.
             */
            ThreadCategory;
            /**
             * Created
             */
            created: string; // date-time
            creator: /* UserModelShort */ ModelUserUserUserModelShort;
            status: /**
             * ThreadStatus
             * An enumeration.
             */
            ThreadStatus;
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
            category: /**
             * ThreadCategory
             * An enumeration.
             */
            ThreadCategory;
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
            creator: /* UserModelShort */ ModelUserUserUserModelShort;
            /**
             * Read
             */
            read: boolean;
            status: /**
             * ThreadStatus
             * An enumeration.
             */
            ThreadStatus;
        }
        /**
         * ThreadStatus
         * An enumeration.
         */
        export type ThreadStatus = "OPEN" | "CLOSED";
        /**
         * TimeInterval
         * An enumeration.
         */
        export type TimeInterval = "microseconds" | "milliseconds" | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | "decade" | "century" | "millennium";
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
            currency: /* CurrencyModel */ CurrencyModel;
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
            author?: /* UserModelShort */ ModelUserUserUserModelShort;
            /**
             * Amount
             */
            amount: number;
        }
        /**
         * UnlimitedPage[AppliedRewardModel]
         */
        export interface UnlimitedPageAppliedRewardModel {
            /**
             * Items
             */
            items: /* AppliedRewardModel */ AppliedRewardModel[];
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
         * UserAttributeDefinitionModel
         */
        export interface UserAttributeDefinitionModel {
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
            type: /**
             * UserAttributeType
             * An enumeration.
             */
            UserAttributeType;
            /**
             * Statistics Interval
             */
            statistics_interval?: string;
            accumulation_interval?: /**
             * TimeInterval
             * An enumeration.
             */
            TimeInterval;
            /**
             * Unspecific
             */
            unspecific: boolean;
            /**
             * Requirement Set Id
             */
            requirement_set_id?: string; // uuid
            /**
             * Id
             */
            id: string; // uuid
        }
        /**
         * UserAttributeDefinitionModelAdd
         */
        export interface UserAttributeDefinitionModelAdd {
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
            type: /**
             * UserAttributeType
             * An enumeration.
             */
            UserAttributeType;
            /**
             * Statistics Interval
             */
            statistics_interval?: string;
            accumulation_interval?: /**
             * TimeInterval
             * An enumeration.
             */
            TimeInterval;
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
         * UserAttributeDefinitionModelPatch
         */
        export interface UserAttributeDefinitionModelPatch {
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
            type: /**
             * UserAttributeType
             * An enumeration.
             */
            UserAttributeType;
            /**
             * Statistics Interval
             */
            statistics_interval?: string;
            accumulation_interval?: /**
             * TimeInterval
             * An enumeration.
             */
            TimeInterval;
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
             * Serverbundle Id
             */
            serverbundle_id?: string; // uuid
        }
        /**
         * UserAttributeModelAdd
         */
        export interface UserAttributeModelAdd {
            /**
             * Date
             */
            date?: string; // date-time
            /**
             * Value
             */
            value: string;
            /**
             * Definition Id
             */
            definition_id: string; // uuid
            /**
             * Serverbundle Id
             */
            serverbundle_id?: string; // uuid
            /**
             * User Id
             */
            user_id: string; // uuid
        }
        /**
         * UserAttributeType
         * An enumeration.
         */
        export type UserAttributeType = "NEWEST" | "ACCUMULATED";
        /**
         * UserLogEntryAdd
         */
        export interface UserLogEntryAdd {
            /**
             * Message
             */
            message: string;
        }
        /**
         * UserModel
         */
        export interface UserModel {
            /**
             * Id
             */
            id: string; // uuid
            type: /**
             * UserType
             * An enumeration.
             */
            UserType;
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
                [key: string]: any;
            };
            /**
             * Email
             */
            email?: string; // email
            /**
             * Email Notification
             */
            email_notification: boolean;
            /**
             * Linked Users
             */
            linked_users: /* UserModelNoLinked */ UserModelNoLinked[];
        }
        /**
         * UserModelAdd
         */
        export interface UserModelAdd {
            type: /**
             * UserType
             * An enumeration.
             */
            UserType;
            /**
             * Identifier
             */
            identifier: string;
        }
        /**
         * UserModelLinkedShort
         */
        export interface UserModelLinkedShort {
            /**
             * Id
             */
            id: string; // uuid
            type: /**
             * UserType
             * An enumeration.
             */
            UserType;
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
            linked_users: /* UserModelShort */ ModelUserUserModelShort[];
        }
        /**
         * UserModelNoLinked
         */
        export interface UserModelNoLinked {
            /**
             * Id
             */
            id: string; // uuid
            type: /**
             * UserType
             * An enumeration.
             */
            UserType;
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
                [key: string]: any;
            };
            /**
             * Email
             */
            email?: string; // email
            /**
             * Email Notification
             */
            email_notification: boolean;
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
         * UserModelPatch
         */
        export interface UserModelPatch {
            /**
             * Email
             */
            email?: string; // email
            /**
             * Email Notification
             */
            email_notification?: boolean;
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
             * Values
             */
            values?: string[];
        }
        /**
         * UserType
         * An enumeration.
         */
        export type UserType = "CENTRAL" | "STEAM" | "DISCORD";
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
         * WarningConfigModel
         */
        export interface WarningConfigModel {
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
            serverbundle?: /* ServerbundleModelShort */ ModelServerServerbundleServerbundleModelShort;
            user: /* UserModelShort */ ModelUserUserUserModelShort;
            creator: /* UserModelShort */ ModelUserUserUserModelShort;
            /**
             * Created On
             */
            created_on: string; // date-time
            /**
             * Active
             */
            active: boolean;
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
    namespace AuthFinishSocial {
        namespace Parameters {
            /**
             * Backend
             */
            export type Backend = string;
        }
        export interface PathParameters {
            backend: /* Backend */ Parameters.Backend;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace AuthGetToken {
        namespace Responses {
            export type $200 = any;
        }
    }
    namespace AuthPrepareSocial {
        namespace Responses {
            export type $200 = any;
        }
    }
    namespace AuthRevokeToken {
        namespace Responses {
            export type $200 = any;
        }
    }
    namespace AuthStartSocial {
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
            backend: /* Backend */ Parameters.Backend;
        }
        export interface QueryParameters {
            return_url?: /**
             * Return Url
             * URL to redirect after login.
             */
            Parameters.ReturnUrl;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace BanCreateBan {
        namespace Parameters {
            /**
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            export type MorphUserId = string; // uuid
        }
        export interface QueryParameters {
            morph_user_id?: /**
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            Parameters.MorphUserId /* uuid */;
        }
        export type RequestBody = /* BanModelAdd */ Components.Schemas.BanModelAdd;
        namespace Responses {
            export type $200 = /* BanModel */ Components.Schemas.BanModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* BanModelPatch */ Components.Schemas.BanModelPatch;
        namespace Responses {
            export type $200 = /* BanModel */ Components.Schemas.BanModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace BanGetBans {
        namespace Parameters {
            /**
             * Active
             * Only return active bans.
             */
            export type Active = boolean;
            /**
             * Bundle Id
             */
            export type BundleId = string[];
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
            /**
             * User Id
             */
            export type UserId = string; // uuid
        }
        export interface QueryParameters {
            bundle_id?: /* Bundle Id */ Parameters.BundleId;
            query?: /* Query */ Parameters.Query;
            sort_by?: /* Sort By */ Parameters.SortBy;
            sort_desc?: /* Sort Desc */ Parameters.SortDesc;
            active?: /**
             * Active
             * Only return active bans.
             */
            Parameters.Active;
            user_id?: /* User Id */ Parameters.UserId /* uuid */;
            page?: /* Page */ Parameters.Page;
            size?: /* Size */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Page[BanModel] */ Components.Schemas.PageBanModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace BanGetLog {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            /**
             * Response Get Log Ban  Uuid  Log Get
             */
            export type $200 = /* LogEntryModel */ Components.Schemas.LogEntryModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace DiscordAddRelation {
        export type RequestBody = /* RoleGroupRelationModelAdd */ Components.Schemas.RoleGroupRelationModelAdd;
        namespace Responses {
            export type $200 = /* RoleGroupRelationModel */ Components.Schemas.RoleGroupRelationModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace DiscordDeleteRelation {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace DiscordGetGuild {
        namespace Responses {
            /**
             * Response Get Guild Discord Guild Get
             */
            export type $200 = /* GuildModel */ Components.Schemas.GuildModel[];
        }
    }
    namespace DiscordGetGuildRoles {
        namespace Responses {
            /**
             * Response Get Guild Roles Discord Roles Get
             */
            export type $200 = /* DiscordRoleModel */ Components.Schemas.DiscordRoleModel[];
        }
    }
    namespace DiscordGetRelations {
        namespace Responses {
            /**
             * Response Get Relations Discord Relation Get
             */
            export type $200 = /* RoleGroupRelationModel */ Components.Schemas.RoleGroupRelationModel[];
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* AccountModel */ Components.Schemas.AccountModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* ThreadModel */ Components.Schemas.ThreadModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            /**
             * Response Get Thread Posts Forum  Uuid  Post Get
             */
            export type $200 = /* PostModel */ Components.Schemas.PostModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumGetThreads {
        namespace Responses {
            /**
             * Response Get Threads Forum  Get
             */
            export type $200 = /* ThreadModelShort */ Components.Schemas.ThreadModelShort[];
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
            query?: /* Query */ Parameters.Query;
            show_closed?: /* Show Closed */ Parameters.ShowClosed;
            page?: /* Page */ Parameters.Page;
            size?: /* Size */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Page[ThreadModelShort] */ Components.Schemas.PageThreadModelShort;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* PostModelAdd */ Components.Schemas.PostModelAdd;
        namespace Responses {
            export type $200 = /* PostModel */ Components.Schemas.PostModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumNewThread {
        export type RequestBody = /* ThreadModelAdd */ Components.Schemas.ThreadModelAdd;
        namespace Responses {
            export type $200 = /* ThreadModel */ Components.Schemas.ThreadModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* ThreadModel */ Components.Schemas.ThreadModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GeneralCreateApiToken {
        export type RequestBody = /* APITokenCreateModel */ Components.Schemas.APITokenCreateModel;
        namespace Responses {
            export type $200 = /* OAuth2TokenModel */ Components.Schemas.OAuth2TokenModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GeneralCreateCmsHtml {
        export type RequestBody = /* CmsPageModelPost */ Components.Schemas.CmsPageModelPost;
        namespace Responses {
            export type $200 = /* CmsPageModel */ Components.Schemas.CmsPageModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GeneralDeleteCmsHtml {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GeneralEditConfig {
        export type RequestBody = /* GeneralConfigModel */ Components.Schemas.GeneralConfigModel;
        namespace Responses {
            export type $200 = /* GeneralConfigModel */ Components.Schemas.GeneralConfigModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GeneralEditTeamMember {
        export type RequestBody = /* TeamMemberModelPatch */ Components.Schemas.TeamMemberModelPatch;
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GeneralEditTheme {
        export type RequestBody = /* ThemeModelPatch */ Components.Schemas.ThemeModelPatch;
        namespace Responses {
            export type $200 = /* ThemeModel */ Components.Schemas.ThemeModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GeneralGetApiTokens {
        namespace Responses {
            /**
             * Response Get Api Tokens General Api Token Get
             */
            export type $200 = /* OAuth2TokenModelHidden */ Components.Schemas.OAuth2TokenModelHidden[];
        }
    }
    namespace GeneralGetCmsHtml {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GeneralGetConfig {
        namespace Responses {
            export type $200 = /* GeneralConfigModel */ Components.Schemas.GeneralConfigModel;
        }
    }
    namespace GeneralGetFrontendUrl {
        namespace Responses {
            export type $200 = /* FrontendURLModel */ Components.Schemas.FrontendURLModel;
        }
    }
    namespace GeneralGetIcons {
        namespace Parameters {
            /**
             * Query
             */
            export type Query = string;
        }
        export interface QueryParameters {
            query?: /* Query */ Parameters.Query;
        }
        namespace Responses {
            /**
             * Response Get Icons General Icons Get
             */
            export type $200 = string[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GeneralGetLegal {
        namespace Responses {
            /**
             * Response Get Legal General Legal Get
             */
            export type $200 = string;
        }
    }
    namespace GeneralGetNavItems {
        namespace Responses {
            /**
             * Response Get Nav Items General Nav Get
             */
            export type $200 = /* NavModel */ Components.Schemas.NavModel[];
        }
    }
    namespace GeneralGetTeamMember {
        namespace Responses {
            /**
             * Response Get Team Member General Team Member Get
             */
            export type $200 = /* TeamMemberModel */ Components.Schemas.TeamMemberModel[];
        }
    }
    namespace GeneralGetTheme {
        namespace Responses {
            export type $200 = /* ThemeModel */ Components.Schemas.ThemeModel;
        }
    }
    namespace GeneralRevokeApiToken {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* OAuth2TokenModelHidden */ Components.Schemas.OAuth2TokenModelHidden;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GeneralUpdateCmsHtml {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* CmsPageModelPost */ Components.Schemas.CmsPageModelPost;
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GeneralUpdateLegal {
        export type RequestBody = /* LegalModel */ Components.Schemas.LegalModel;
        namespace Responses {
            /**
             * Response Update Legal General Legal Patch
             */
            export type $200 = string;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GeneralUpdateNavItems {
        /**
         * Nav Put
         */
        export type RequestBody = /* NavModel */ Components.Schemas.NavModel[];
        namespace Responses {
            /**
             * Response Update Nav Items General Nav Put
             */
            export type $200 = /* NavModel */ Components.Schemas.NavModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GroupAddGroup {
        export type RequestBody = /* GroupModelAdd */ Components.Schemas.GroupModelAdd;
        namespace Responses {
            export type $200 = /* GroupModel */ Components.Schemas.GroupModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* GroupModelPatch */ Components.Schemas.GroupModelPatch;
        namespace Responses {
            export type $200 = /* GroupModel */ Components.Schemas.GroupModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GroupGetAdvancedProperties {
        namespace Responses {
            /**
             * Response Get Advanced Properties Group Advanced Property  Get
             */
            export type $200 = /* PropertyModelShortWithDescription */ Components.Schemas.PropertyModelShortWithDescription[];
        }
    }
    namespace GroupGetAllProperties {
        namespace Responses {
            /**
             * Response Get All Properties Group Property  Get
             */
            export type $200 = /* PropertyModelShortWithDescription */ Components.Schemas.PropertyModelShortWithDescription[];
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* GroupModel */ Components.Schemas.GroupModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GroupGetGroupMembers {
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
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export interface QueryParameters {
            query?: /* Query */ Parameters.Query;
            page?: /* Page */ Parameters.Page;
            size?: /* Size */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Page[MembershipModelMemberList] */ Components.Schemas.PageMembershipModelMemberList;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GroupGetGroups {
        namespace Parameters {
            /**
             * Is Team
             * Returns all groups which are marked as part of the team
             */
            export type IsTeam = boolean;
        }
        export interface QueryParameters {
            is_team?: /**
             * Is Team
             * Returns all groups which are marked as part of the team
             */
            Parameters.IsTeam;
        }
        namespace Responses {
            /**
             * Response Get Groups Group  Get
             */
            export type $200 = /* GroupModel */ Components.Schemas.GroupModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ImportGetGextensionPackets {
        namespace Parameters {
            /**
             * Api Key
             */
            export type ApiKey = string;
            /**
             * Url
             */
            export type Url = string; // uri
        }
        export interface QueryParameters {
            url: /* Url */ Parameters.Url /* uri */;
            api_key: /* Api Key */ Parameters.ApiKey;
        }
        namespace Responses {
            /**
             * Response Get Gextension Packets Import Gextension Packet Get
             */
            export type $200 = /* GExtensionPacketModel */ Components.Schemas.GExtensionPacketModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ImportImportGextension {
        export type RequestBody = /* GExtensionImportModel */ Components.Schemas.GExtensionImportModel;
        namespace Responses {
            /**
             * Response Import Gextension Import Gextension Post
             */
            export interface $200 {
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
             * Category
             */
            export type Category = string[];
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
        }
        export interface QueryParameters {
            category?: /* Category */ Parameters.Category;
            query?: /* Query */ Parameters.Query;
            page?: /* Page */ Parameters.Page;
            size?: /* Size */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Page[LogEntryModel] */ Components.Schemas.PageLogEntryModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace NewsAddMessage {
        export type RequestBody = /* NewsModelPost */ Components.Schemas.NewsModelPost;
        namespace Responses {
            export type $200 = /* NewsModel */ Components.Schemas.NewsModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* NewsModelPatch */ Components.Schemas.NewsModelPatch;
        namespace Responses {
            export type $200 = /* NewsModel */ Components.Schemas.NewsModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            page?: /* Page */ Parameters.Page;
            size?: /* Size */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Page[NewsModel] */ Components.Schemas.PageNewsModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            sort_by?: /* Sort By */ Parameters.SortBy;
            sort_desc?: /* Sort Desc */ Parameters.SortDesc;
            hide_read?: /* Hide Read */ Parameters.HideRead;
            categories?: /* Categories */ Parameters.Categories;
            page?: /* Page */ Parameters.Page;
            size?: /* Size */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Page[NotificationEntryModel] */ Components.Schemas.PageNotificationEntryModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace NotificationGetPreviewNotifications {
        namespace Responses {
            /**
             * Response Get Preview Notifications Notification Preview Get
             */
            export type $200 = /* NotificationEntryModel */ Components.Schemas.NotificationEntryModel[];
        }
    }
    namespace NotificationGetStream {
        namespace Responses {
            export type $200 = any;
        }
    }
    namespace NotificationMarkAsRead {
        export type RequestBody = /* NotificationRead */ Components.Schemas.NotificationRead;
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace PacketAddPacket {
        export type RequestBody = /* PacketModelAdd */ Components.Schemas.PacketModelAdd;
        namespace Responses {
            export type $200 = /* PacketModel */ Components.Schemas.PacketModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace PacketAddReward {
        export type RequestBody = /* RewardModelAdd */ Components.Schemas.RewardModelAdd;
        namespace Responses {
            export type $200 = /* RewardModel */ Components.Schemas.RewardModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace PacketCreateAppliedPacket {
        export type RequestBody = /* AppliedPacketModelAdd */ Components.Schemas.AppliedPacketModelAdd;
        namespace Responses {
            export type $200 = /* AppliedPacketModel */ Components.Schemas.AppliedPacketModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace PacketCreateCategory {
        export type RequestBody = /* PacketCategoryModelAdd */ Components.Schemas.PacketCategoryModelAdd;
        namespace Responses {
            export type $200 = /* PacketCategoryModel */ Components.Schemas.PacketCategoryModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* SuccessModel */ Components.Schemas.SuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* SuccessModel */ Components.Schemas.SuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* SuccessModel */ Components.Schemas.SuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* SuccessModel */ Components.Schemas.SuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* AppliedPacketModelPatch */ Components.Schemas.AppliedPacketModelPatch;
        namespace Responses {
            export type $200 = /* AppliedPacketModel */ Components.Schemas.AppliedPacketModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace PacketEditAppliedReward {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* AppliedRewardModelPatch */ Components.Schemas.AppliedRewardModelPatch;
        namespace Responses {
            export type $200 = /* AppliedRewardModel */ Components.Schemas.AppliedRewardModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* PacketCategoryModelPatch */ Components.Schemas.PacketCategoryModelPatch;
        namespace Responses {
            export type $200 = /* PacketCategoryModel */ Components.Schemas.PacketCategoryModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* PacketModelPatch */ Components.Schemas.PacketModelPatch;
        namespace Responses {
            export type $200 = /* PacketModel */ Components.Schemas.PacketModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* RewardModelPatch */ Components.Schemas.RewardModelPatch;
        namespace Responses {
            export type $200 = /* RewardModel */ Components.Schemas.RewardModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace PacketGetAppliedPacketStatuses {
        namespace Responses {
            export type $200 = any;
        }
    }
    namespace PacketGetAppliedPackets {
        namespace Parameters {
            /**
             * Active
             */
            export type Active = boolean;
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
            export type Status = /**
             * AppliedPacketStatus
             * An enumeration.
             */
            Components.Schemas.AppliedPacketStatus[];
        }
        export interface QueryParameters {
            status?: Parameters.Status;
            active?: /* Active */ Parameters.Active;
            query?: /* Query */ Parameters.Query;
            sort_by?: /* Sort By */ Parameters.SortBy;
            sort_desc?: /* Sort Desc */ Parameters.SortDesc;
            page?: /* Page */ Parameters.Page;
            size?: /* Size */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Page[AppliedPacketModel] */ Components.Schemas.PageAppliedPacketModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace PacketGetAppliedRewards {
        namespace Parameters {
            /**
             * Active
             */
            export type Active = boolean;
            /**
             * For Server Id
             * Only return applied rewards that haven't been executed on the given server yet and that are applicable for the servers type.
             */
            export type ForServerId = string /* uuid */[];
            /**
             * Page
             */
            export type Page = number;
            /**
             * Query
             */
            export type Query = string;
            /**
             * Serverbundle Id
             * Filter by serverbundle.
             */
            export type ServerbundleId = string /* uuid */[];
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
            /**
             * Filter by status.
             */
            export type Status = /**
             * RewardStatus
             * An enumeration.
             */
            Components.Schemas.RewardStatus[];
        }
        export interface QueryParameters {
            active?: /* Active */ Parameters.Active;
            serverbundle_id?: /**
             * Serverbundle Id
             * Filter by serverbundle.
             */
            Parameters.ServerbundleId;
            status?: /* Filter by status. */ Parameters.Status;
            for_server_id?: /**
             * For Server Id
             * Only return applied rewards that haven't been executed on the given server yet and that are applicable for the servers type.
             */
            Parameters.ForServerId;
            query?: /* Query */ Parameters.Query;
            sort_by?: /* Sort By */ Parameters.SortBy;
            sort_desc?: /* Sort Desc */ Parameters.SortDesc;
            page?: /* Page */ Parameters.Page;
            size?: /* Size */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* UnlimitedPage[AppliedRewardModel] */ Components.Schemas.UnlimitedPageAppliedRewardModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace PacketGetAppliedRewardsByUser {
        namespace Parameters {
            /**
             * Active
             */
            export type Active = boolean;
            /**
             * For Server Id
             * Only return applied rewards that haven't been executed on the given server yet and that are applicable for the servers type.
             */
            export type ForServerId = string; // uuid
            /**
             * Foreign Ids
             * Index result by foreign user identifier instead of VyHub user id.
             */
            export type ForeignIds = boolean;
            /**
             * Serverbundle Id
             * Filter by serverbundle.
             */
            export type ServerbundleId = string /* uuid */[];
            /**
             * Filter by status.
             */
            export type Status = /**
             * RewardStatus
             * An enumeration.
             */
            Components.Schemas.RewardStatus[];
            /**
             * User Id
             * Filter by user.
             */
            export type UserId = string /* uuid */[];
        }
        export interface QueryParameters {
            user_id?: /**
             * User Id
             * Filter by user.
             */
            Parameters.UserId;
            serverbundle_id?: /**
             * Serverbundle Id
             * Filter by serverbundle.
             */
            Parameters.ServerbundleId;
            status?: /* Filter by status. */ Parameters.Status;
            for_server_id?: /**
             * For Server Id
             * Only return applied rewards that haven't been executed on the given server yet and that are applicable for the servers type.
             */
            Parameters.ForServerId /* uuid */;
            active?: /* Active */ Parameters.Active;
            foreign_ids?: /**
             * Foreign Ids
             * Index result by foreign user identifier instead of VyHub user id.
             */
            Parameters.ForeignIds;
        }
        namespace Responses {
            /**
             * Response Get Applied Rewards By User Packet Reward Applied User Get
             */
            export interface $200 {
                [name: string]: /* AppliedRewardModel */ Components.Schemas.AppliedRewardModel[];
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace PacketGetCategories {
        namespace Responses {
            /**
             * Response Get Categories Packet Category Get
             */
            export type $200 = /* PacketCategoryModel */ Components.Schemas.PacketCategoryModel[];
        }
    }
    namespace PacketGetPackets {
        namespace Parameters {
            /**
             * Category Id
             * Filter by category
             */
            export type CategoryId = string; // uuid
            /**
             * Query
             * Filter
             */
            export type Query = string;
        }
        export interface QueryParameters {
            category_id?: /**
             * Category Id
             * Filter by category
             */
            Parameters.CategoryId /* uuid */;
            query?: /**
             * Query
             * Filter
             */
            Parameters.Query;
        }
        namespace Responses {
            /**
             * Response Get Packets Packet  Get
             */
            export type $200 = /* PacketModel */ Components.Schemas.PacketModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            query?: /**
             * Query
             * Filter by rewards by name
             */
            Parameters.Query;
        }
        namespace Responses {
            /**
             * Response Get Rewards Packet Reward  Get
             */
            export type $200 = /* RewardModel */ Components.Schemas.RewardModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace RequirementsCreateRequirement {
        export type RequestBody = /* RequirementModelAdd */ Components.Schemas.RequirementModelAdd;
        namespace Responses {
            export type $200 = /* RequirementModel */ Components.Schemas.RequirementModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace RequirementsCreateRequirementSet {
        export type RequestBody = /* RequirementSetModelAdd */ Components.Schemas.RequirementSetModelAdd;
        namespace Responses {
            export type $200 = /* RequirementSetModelAdd */ Components.Schemas.RequirementSetModelAdd;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace RequirementsDeleteRequirement {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace RequirementsDeleteRequirementSet {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* RequirementSetModelPatch */ Components.Schemas.RequirementSetModelPatch;
        namespace Responses {
            export type $200 = /* RequirementSetModel */ Components.Schemas.RequirementSetModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace RequirementsGetRequirementSet {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* RequirementSetModel */ Components.Schemas.RequirementSetModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace RequirementsGetRequirementSets {
        namespace Responses {
            /**
             * Response Get Requirement Sets Requirement Set Get
             */
            export type $200 = /* RequirementSetModelShort */ Components.Schemas.RequirementSetModelShort[];
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
            export type $200 = /* RequirementModel */ Components.Schemas.RequirementModel[];
        }
    }
    namespace ServerAddBundle {
        export type RequestBody = /* ServerbundleModelAdd */ Components.Schemas.ServerbundleModelAdd;
        namespace Responses {
            export type $200 = /* ServerbundleModel */ Components.Schemas.ServerbundleModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* BundleTokenCreateModel */ Components.Schemas.BundleTokenCreateModel;
        namespace Responses {
            export type $200 = /* OAuth2TokenModel */ Components.Schemas.OAuth2TokenModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ServerCreateServer {
        export type RequestBody = /* ServerModelAdd */ Components.Schemas.ServerModelAdd;
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* ServerbundleModel */ Components.Schemas.ServerbundleModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* ServerBundleModelPatch */ Components.Schemas.ServerBundleModelPatch;
        namespace Responses {
            export type $200 = /* ServerbundleModel */ Components.Schemas.ServerbundleModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* ServerModelPatch */ Components.Schemas.ServerModelPatch;
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ServerGetBans {
        namespace Parameters {
            /**
             * Active
             * Only return active bans.
             */
            export type Active = boolean;
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export interface QueryParameters {
            active?: /**
             * Active
             * Only return active bans.
             */
            Parameters.Active;
        }
        namespace Responses {
            /**
             * Response Get Bans Server Bundle  Uuid  Ban Get
             */
            export interface $200 {
                [name: string]: /* BanModel */ Components.Schemas.BanModel[];
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ServerGetBundle {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* ServerbundleModel */ Components.Schemas.ServerbundleModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            /**
             * Response Get Bundle Tokens Server Bundle  Uuid  Token Get
             */
            export type $200 = /* OAuth2TokenModelHidden */ Components.Schemas.OAuth2TokenModelHidden[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ServerGetBundles {
        namespace Parameters {
            export type ServerType = /**
             * ServerType
             * An enumeration.
             */
            Components.Schemas.ServerType;
        }
        export interface QueryParameters {
            server_type?: Parameters.ServerType;
        }
        namespace Responses {
            /**
             * Response Get Bundles Server Bundle  Get
             */
            export type $200 = /* ServerbundleModel */ Components.Schemas.ServerbundleModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            /**
             * Response Get Groups Server Bundle  Uuid  Group Get
             */
            export type $200 = /* GroupModel */ Components.Schemas.GroupModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* ServerModel */ Components.Schemas.ServerModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            /**
             * Response Get Server By Bundle Server Bundle  Uuid  Server Get
             */
            export type $200 = /* ServerModelShort */ Components.Schemas.ServerModelShort[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ServerGetServerTypes {
        namespace Responses {
            export type $200 = any;
        }
    }
    namespace ServerGetServers {
        namespace Parameters {
            export type Type = /**
             * ServerType
             * An enumeration.
             */
            Components.Schemas.ServerType;
        }
        export interface QueryParameters {
            type?: Parameters.Type;
        }
        namespace Responses {
            /**
             * Response Get Servers Server  Get
             */
            export type $200 = /* ServerModel */ Components.Schemas.ServerModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ServerGetWarnings {
        namespace Parameters {
            /**
             * Active
             * Only return active bans.
             */
            export type Active = boolean;
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export interface QueryParameters {
            active?: /**
             * Active
             * Only return active bans.
             */
            Parameters.Active;
        }
        namespace Responses {
            /**
             * Response Get Warnings Server Bundle  Uuid  Warning Get
             */
            export interface $200 {
                [name: string]: /* WarningModel */ Components.Schemas.WarningModel[];
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            token_id: /**
             * Token Id
             * UUID of token to revoke
             */
            Parameters.TokenId /* uuid */;
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* OAuth2TokenModelHidden */ Components.Schemas.OAuth2TokenModelHidden;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopAddCouponCode {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* PinAddModel */ Components.Schemas.PinAddModel;
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopAddPacketToCart {
        export type RequestBody = /* Body_add_packet_to_cart_shop_cart_post */ Components.Schemas.BodyAddPacketToCartShopCartPost;
        namespace Responses {
            export type $200 = /* CartPacketModel */ Components.Schemas.CartPacketModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            code_or_uuid: /**
             * Code Or Uuid
             * Discount id or code
             */
            Parameters.CodeOrUuid;
        }
        namespace Responses {
            export type $200 = /* SuccessModel */ Components.Schemas.SuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* DebitModel */ Components.Schemas.DebitModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopChangeBusinessAddress {
        export type RequestBody = /* BusinessAddressModelAdd */ Components.Schemas.BusinessAddressModelAdd;
        namespace Responses {
            export type $200 = /* AddressModel */ Components.Schemas.AddressModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* DebitModel */ Components.Schemas.DebitModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopConfirmDebit {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopCreateDiscount {
        export type RequestBody = /* DiscountModelAdd */ Components.Schemas.DiscountModelAdd;
        namespace Responses {
            export type $200 = /* DiscountModel */ Components.Schemas.DiscountModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopCreateGateway {
        export type RequestBody = /* PaymentGatewayModelAdd */ Components.Schemas.PaymentGatewayModelAdd;
        namespace Responses {
            export type $200 = /* PaymentGatewayModel */ Components.Schemas.PaymentGatewayModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopCreateTaxRule {
        export type RequestBody = /* TaxModelAdd */ Components.Schemas.TaxModelAdd;
        namespace Responses {
            export type $200 = /* TaxModel */ Components.Schemas.TaxModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* SuccessModel */ Components.Schemas.SuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* SuccessModel */ Components.Schemas.SuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* SuccessModel */ Components.Schemas.SuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopEditConfig {
        export type RequestBody = /* ShopConfigModelPatch */ Components.Schemas.ShopConfigModelPatch;
        namespace Responses {
            export type $200 = /* ShopConfigModel */ Components.Schemas.ShopConfigModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* DiscountModelPatch */ Components.Schemas.DiscountModelPatch;
        namespace Responses {
            export type $200 = /* DiscountModel */ Components.Schemas.DiscountModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* PaymentGatewayModelPatch */ Components.Schemas.PaymentGatewayModelPatch;
        namespace Responses {
            export type $200 = /* PaymentGatewayModel */ Components.Schemas.PaymentGatewayModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* PurchaseModelPatch */ Components.Schemas.PurchaseModelPatch;
        namespace Responses {
            export type $200 = /* PurchaseModel */ Components.Schemas.PurchaseModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* DebitModel */ Components.Schemas.DebitModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopGetBusinessAddress {
        namespace Responses {
            export type $200 = /* AddressModel */ Components.Schemas.AddressModel;
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
            country_code?: /**
             * Country Code
             * Country for price calculation
             */
            Parameters.CountryCode;
        }
        namespace Responses {
            export type $200 = /* CartModel */ Components.Schemas.CartModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopGetCartPackets {
        namespace Responses {
            /**
             * Response Get Cart Packets Shop Cart Packet Get
             */
            export type $200 = /* CartPacketModel */ Components.Schemas.CartPacketModel[];
        }
    }
    namespace ShopGetConfig {
        namespace Responses {
            export type $200 = /* ShopConfigModel */ Components.Schemas.ShopConfigModel;
        }
    }
    namespace ShopGetCurrencies {
        namespace Responses {
            /**
             * Response Get Currencies Shop Currency Get
             */
            export type $200 = /* CurrencyModel */ Components.Schemas.CurrencyModel[];
        }
    }
    namespace ShopGetDebit {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* DebitModel */ Components.Schemas.DebitModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            interval?: /**
             * StatisticInterval
             * An enumeration.
             */
            Parameters.Interval;
            only_successful?: /**
             * Only Successful
             * Only include purchases with a successful status (FINISHED, RECURRING)
             */
            Parameters.OnlySuccessful;
            currency_code: /* Currency Code */ Parameters.CurrencyCode;
        }
        namespace Responses {
            /**
             * Response Get Debit Statistic Shop Debit Statistic Get
             */
            export type $200 = /* DebitModelStatistic */ Components.Schemas.DebitModelStatistic[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopGetDebits {
        namespace Parameters {
            /**
             * Coupon Purchase Open
             */
            export type CouponPurchaseOpen = boolean;
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
            query?: /* Query */ Parameters.Query;
            sort_by?: /* Sort By */ Parameters.SortBy;
            sort_desc?: /* Sort Desc */ Parameters.SortDesc;
            coupon_purchase_open?: /* Coupon Purchase Open */ Parameters.CouponPurchaseOpen;
            page?: /* Page */ Parameters.Page;
            size?: /* Size */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Page[DebitModel] */ Components.Schemas.PageDebitModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            code_or_uuid: /**
             * Code Or Uuid
             * Discount id or code
             */
            Parameters.CodeOrUuid;
        }
        namespace Responses {
            export type $200 = /* DiscountModel */ Components.Schemas.DiscountModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopGetDiscounts {
        namespace Responses {
            /**
             * Response Get Discounts Shop Discount  Get
             */
            export type $200 = /* DiscountModel */ Components.Schemas.DiscountModel[];
        }
    }
    namespace ShopGetDonationGoal {
        namespace Responses {
            export type $200 = /* DonationGoalModel */ Components.Schemas.DonationGoalModel;
        }
    }
    namespace ShopGetGateways {
        namespace Responses {
            /**
             * Response Get Gateways Shop Gateway  Get
             */
            export type $200 = /* PaymentGatewayModel */ Components.Schemas.PaymentGatewayModel[];
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
            category_id?: /**
             * Category Id
             * Filter by category
             */
            Parameters.CategoryId /* uuid */;
            country_code?: /**
             * Country Code
             * Country for price calculation
             */
            Parameters.CountryCode;
        }
        namespace Responses {
            /**
             * Response Get Packets Shop Packet Get
             */
            export type $200 = /* PacketModelLight */ Components.Schemas.PacketModelLight[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            /**
             * Response Get Purchase Gateways Shop Purchase  Uuid  Gateway Get
             */
            export type $200 = /* PaymentGatewayModel */ Components.Schemas.PaymentGatewayModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            currency_code: /* Currency Code */ Parameters.CurrencyCode;
        }
        namespace Responses {
            export type $200 = /* PurchaseStatistic */ Components.Schemas.PurchaseStatistic;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopGetPurchaseStatuses {
        namespace Responses {
            export type $200 = any;
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
            export type Status = /**
             * PurchaseStatus
             * An enumeration.
             */
            Components.Schemas.PurchaseStatus[];
        }
        export interface QueryParameters {
            query?: /* Query */ Parameters.Query;
            sort_by?: /* Sort By */ Parameters.SortBy;
            sort_desc?: /* Sort Desc */ Parameters.SortDesc;
            status?: Parameters.Status;
            page?: /* Page */ Parameters.Page;
            size?: /* Size */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Page[PurchaseModel] */ Components.Schemas.PagePurchaseModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopGetReport {
        namespace Parameters {
            /**
             * End
             */
            export type End = string; // date-time
            /**
             * Start
             */
            export type Start = string; // date-time
        }
        export interface QueryParameters {
            start: /* Start */ Parameters.Start /* date-time */;
            end: /* End */ Parameters.End /* date-time */;
        }
        namespace Responses {
            /**
             * Response Get Report Shop Report Get
             */
            export type $200 = /* FinanceReportEntry */ Components.Schemas.FinanceReportEntry[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopGetReportCsv {
        namespace Parameters {
            /**
             * End
             */
            export type End = string; // date-time
            /**
             * Start
             */
            export type Start = string; // date-time
        }
        export interface QueryParameters {
            start: /* Start */ Parameters.Start /* date-time */;
            end: /* End */ Parameters.End /* date-time */;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopGetTaxRules {
        namespace Responses {
            /**
             * Response Get Tax Rules Shop Tax Get
             */
            export type $200 = /* TaxModel */ Components.Schemas.TaxModel[];
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
            code_or_uuid: /**
             * Code Or Uuid
             * Discount id or code
             */
            Parameters.CodeOrUuid;
        }
        namespace Responses {
            export type $200 = /* SuccessModel */ Components.Schemas.SuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* SuccessModel */ Components.Schemas.SuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopRemovePacketsFromCart {
        namespace Responses {
            export type $200 = /* SuccessModel */ Components.Schemas.SuccessModel;
        }
    }
    namespace ShopStartCheckout {
        export type RequestBody = /* Body_start_checkout_shop_cart_checkout_post */ Components.Schemas.BodyStartCheckoutShopCartCheckoutPost;
        namespace Responses {
            export type $200 = /* PurchaseModel */ Components.Schemas.PurchaseModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopStartPayment {
        export type RequestBody = /* Body_start_payment_shop_checkout_post */ Components.Schemas.BodyStartPaymentShopCheckoutPost;
        namespace Responses {
            export type $200 = /* StartPaymentModel */ Components.Schemas.StartPaymentModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserAddAddress {
        export type RequestBody = /* AddressModelAdd */ Components.Schemas.AddressModelAdd;
        namespace Responses {
            export type $200 = /* AddressModel */ Components.Schemas.AddressModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserAddMembership {
        namespace Parameters {
            /**
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            export type MorphUserId = string; // uuid
            /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            Parameters.Uuid;
        }
        export interface QueryParameters {
            morph_user_id?: /**
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            Parameters.MorphUserId /* uuid */;
        }
        export type RequestBody = /* MembershipModelUserAdd */ Components.Schemas.MembershipModelUserAdd;
        namespace Responses {
            export type $200 = /* MembershipModel */ Components.Schemas.MembershipModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserCreateAttribute {
        export type RequestBody = /* UserAttributeModelAdd */ Components.Schemas.UserAttributeModelAdd;
        namespace Responses {
            export type $200 = /* UserAttributeModelAdd */ Components.Schemas.UserAttributeModelAdd;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserCreateAttributeDefinition {
        export type RequestBody = /* UserAttributeDefinitionModelAdd */ Components.Schemas.UserAttributeDefinitionModelAdd;
        namespace Responses {
            export type $200 = /* UserAttributeDefinitionModel */ Components.Schemas.UserAttributeDefinitionModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserCreateLogEntry {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* UserLogEntryAdd */ Components.Schemas.UserLogEntryAdd;
        namespace Responses {
            export type $200 = /* LogEntryModel */ Components.Schemas.LogEntryModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserCreateUser {
        export type RequestBody = /* UserModelAdd */ Components.Schemas.UserModelAdd;
        namespace Responses {
            export type $200 = /* UserModel */ Components.Schemas.UserModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserDeleteAttribute {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* SuccessModel */ Components.Schemas.SuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserDeleteAttributeDefinition {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* SuccessModel */ Components.Schemas.SuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserEditAttributeDefinition {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* UserAttributeDefinitionModelPatch */ Components.Schemas.UserAttributeDefinitionModelPatch;
        namespace Responses {
            export type $200 = /* UserAttributeDefinitionModel */ Components.Schemas.UserAttributeDefinitionModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* MembershipModelEdit */ Components.Schemas.MembershipModelEdit;
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserEditUser {
        namespace Parameters {
            /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            Parameters.Uuid;
        }
        export type RequestBody = /* UserModelPatch */ Components.Schemas.UserModelPatch;
        namespace Responses {
            export type $200 = /* UserModel */ Components.Schemas.UserModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserEndActiveMemberships {
        namespace Parameters {
            /**
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            export type MorphUserId = string; // uuid
            /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            Parameters.Uuid;
        }
        export interface QueryParameters {
            morph_user_id?: /**
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            Parameters.MorphUserId /* uuid */;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserGetActiveGroups {
        namespace Parameters {
            /**
             * Serverbundle Id
             * Filter by serverbundle
             */
            export type ServerbundleId = string; // uuid
            /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            Parameters.Uuid;
        }
        export interface QueryParameters {
            serverbundle_id?: /**
             * Serverbundle Id
             * Filter by serverbundle
             */
            Parameters.ServerbundleId /* uuid */;
        }
        namespace Responses {
            /**
             * Response Get Active Groups User  Uuid  Group Get
             */
            export type $200 = /* GroupModel */ Components.Schemas.GroupModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserGetActiveGroupsByBundle {
        namespace Parameters {
            /**
             * Serverbundle Id
             * Filter by serverbundle
             */
            export type ServerbundleId = string; // uuid
            /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            Parameters.Uuid;
        }
        export interface QueryParameters {
            serverbundle_id?: /**
             * Serverbundle Id
             * Filter by serverbundle
             */
            Parameters.ServerbundleId /* uuid */;
        }
        namespace Responses {
            /**
             * Response Get Active Groups By Bundle User  Uuid  Group By Bundle Get
             */
            export type $200 = /* GroupAndServerbundleModel */ Components.Schemas.GroupAndServerbundleModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = /* AddressModel */ Components.Schemas.AddressModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            /**
             * Response Get Addresses User  Uuid  Address Get
             */
            export type $200 = /* AddressModel */ Components.Schemas.AddressModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserGetAttributeDefinition {
        namespace Parameters {
            /**
             * Uuid Or Name
             * UUID or name of attribute definition.
             */
            export type UuidOrName = string;
        }
        export interface PathParameters {
            uuid_or_name: /**
             * Uuid Or Name
             * UUID or name of attribute definition.
             */
            Parameters.UuidOrName;
        }
        namespace Responses {
            export type $200 = /* UserAttributeDefinitionModel */ Components.Schemas.UserAttributeDefinitionModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserGetAttributeDefinitions {
        namespace Parameters {
            /**
             * Name
             * Filter by name (exact match).
             */
            export type Name = string;
        }
        export interface QueryParameters {
            name?: /**
             * Name
             * Filter by name (exact match).
             */
            Parameters.Name;
        }
        namespace Responses {
            /**
             * Response Get Attribute Definitions User Attribute Definition Get
             */
            export type $200 = /* UserAttributeDefinitionModel */ Components.Schemas.UserAttributeDefinitionModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
             * Serverbundle Id
             * Filter by serverbundle
             */
            export type ServerbundleId = string; // uuid
            /**
             * Split Serverbundles
             * Split history by serverbundle.
             */
            export type SplitServerbundles = boolean;
            /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            definition_id: /**
             * Definition Id
             * ID of the attribute definition.
             */
            Parameters.DefinitionId /* uuid */;
            uuid: /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            Parameters.Uuid;
        }
        export interface QueryParameters {
            serverbundle_id?: /**
             * Serverbundle Id
             * Filter by serverbundle
             */
            Parameters.ServerbundleId /* uuid */;
            split_serverbundles?: /**
             * Split Serverbundles
             * Split history by serverbundle.
             */
            Parameters.SplitServerbundles;
            linked_users?: /**
             * Linked Users
             * Include attributes from linked users.
             */
            Parameters.LinkedUsers;
        }
        namespace Responses {
            /**
             * Response Get Attribute History User  Uuid  Attribute  Definition Id  Get
             */
            export type $200 = /* UserAttributeHistoryModel */ Components.Schemas.UserAttributeHistoryModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            /**
             * Response Get Current Properties User  Uuid  Property Get
             */
            export type $200 = /* UserPropertyModel */ Components.Schemas.UserPropertyModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            identifier: /**
             * Identifier
             * UUID or other identifier
             */
            Parameters.Identifier;
        }
        export interface QueryParameters {
            non_central?: /**
             * Non Central
             * Set to true if searching a user by its identifier (and not uuid or central username)
             */
            Parameters.NonCentral;
        }
        namespace Responses {
            export type $200 = /* UserModel */ Components.Schemas.UserModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserGetLog {
        namespace Parameters {
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            /**
             * Response Get Log User  Uuid  Log Get
             */
            export type $200 = /* LogEntryModel */ Components.Schemas.LogEntryModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            /**
             * Response Get Memberships User  Uuid  Membership Get
             */
            export type $200 = /* MembershipModel */ Components.Schemas.MembershipModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            /**
             * Response Get Packets User  Uuid  Packet Get
             */
            export type $200 = /* AppliedPacketModel */ Components.Schemas.AppliedPacketModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
             * Price Calculation
             * Included price calculation for cart packets.
             */
            export type PriceCalculation = boolean;
            /**
             * PurchaseStatus
             * Filter by status.
             */
            export type Status = "OPEN" | "CANCELLED" | "FINISHED" | "REFUNDED" | "REVOKED" | "RECURRING";
            /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            Parameters.Uuid;
        }
        export interface QueryParameters {
            cancelled?: /**
             * Cancelled
             * Include cancelled purchases.
             */
            Parameters.Cancelled;
            status?: /**
             * PurchaseStatus
             * Filter by status.
             */
            Parameters.Status;
            price_calculation?: /**
             * Price Calculation
             * Included price calculation for cart packets.
             */
            Parameters.PriceCalculation;
        }
        namespace Responses {
            /**
             * Response Get Purchases User  Uuid  Purchase Get
             */
            export type $200 = /* PurchaseModel */ Components.Schemas.PurchaseModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserGetUnauthProperties {
        namespace Responses {
            /**
             * Response Get Unauth Properties User Property  Get
             */
            export type $200 = /* PropertyModel */ Components.Schemas.PropertyModel[];
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
            query?: /**
             * Query
             * User-ID, external identifier or keyword that the username must include
             */
            Parameters.Query;
            limit?: /**
             * Limit
             * Maximum results
             */
            Parameters.Limit;
            sort?: /**
             * Sort
             * Sort by value.
             */
            Parameters.Sort /* ^(type|registered_on|username)$ */;
            desc?: /**
             * Desc
             * Order descending.
             */
            Parameters.Desc;
        }
        namespace Responses {
            /**
             * Response Get Users User  Get
             */
            export type $200 = /* UserModelLinkedShort */ Components.Schemas.UserModelLinkedShort[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserUnbanActiveBans {
        namespace Parameters {
            /**
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            export type MorphUserId = string; // uuid
            /**
             * Serverbundle Id
             * Only unban bans that belong to the specified serverbundle. Global bans are also included.
             */
            export type ServerbundleId = string; // uuid
            /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            uuid: /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            Parameters.Uuid;
        }
        export interface QueryParameters {
            serverbundle_id?: /**
             * Serverbundle Id
             * Only unban bans that belong to the specified serverbundle. Global bans are also included.
             */
            Parameters.ServerbundleId /* uuid */;
            morph_user_id?: /**
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            Parameters.MorphUserId /* uuid */;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace WarningAddWarning {
        namespace Parameters {
            /**
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            export type MorphUserId = string; // uuid
        }
        export interface QueryParameters {
            morph_user_id?: /**
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            Parameters.MorphUserId /* uuid */;
        }
        export type RequestBody = /* WarningModelAdd */ Components.Schemas.WarningModelAdd;
        namespace Responses {
            export type $200 = /* WarningModel */ Components.Schemas.WarningModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace WarningGetConfig {
        namespace Responses {
            export type $200 = /* WarningConfigModel */ Components.Schemas.WarningConfigModel;
        }
    }
    namespace WarningGetWarnings {
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
             * Serverbundle Id
             */
            export type ServerbundleId = string[];
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
            /**
             * User Id
             */
            export type UserId = string; // uuid
        }
        export interface QueryParameters {
            serverbundle_id?: /* Serverbundle Id */ Parameters.ServerbundleId;
            query?: /* Query */ Parameters.Query;
            sort_by?: /* Sort By */ Parameters.SortBy;
            sort_desc?: /* Sort Desc */ Parameters.SortDesc;
            user_id?: /* User Id */ Parameters.UserId /* uuid */;
            page?: /* Page */ Parameters.Page;
            size?: /* Size */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Page[WarningModel] */ Components.Schemas.PageWarningModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace WarningUpdateConfig {
        export type RequestBody = /* WarningConfigModel */ Components.Schemas.WarningConfigModel;
        namespace Responses {
            export type $200 = /* WarningConfigModel */ Components.Schemas.WarningConfigModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace WebhookPaysafecardNotification {
        namespace Parameters {
            /**
             * Payment Id
             */
            export type PaymentId = string;
            /**
             * Uuid
             * The UUID of the referenced object.
             */
            export type Uuid = any;
        }
        export interface PathParameters {
            payment_id: /* Payment Id */ Parameters.PaymentId;
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
}

export interface OperationMethods {
  /**
   * general_getNavItems - Get Nav Items
   */
  'general_getNavItems'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralGetNavItems.Responses.$200>
  /**
   * general_updateNavItems - Update Nav Items
   */
  'general_updateNavItems'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GeneralUpdateNavItems.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralUpdateNavItems.Responses.$200>
  /**
   * general_createCmsHtml - Create Cms Html
   */
  'general_createCmsHtml'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GeneralCreateCmsHtml.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralCreateCmsHtml.Responses.$200>
  /**
   * general_getCmsHtml - Get Cms Html
   */
  'general_getCmsHtml'(
    parameters?: Parameters<Paths.GeneralGetCmsHtml.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralGetCmsHtml.Responses.$200>
  /**
   * general_updateCmsHtml - Update Cms Html
   */
  'general_updateCmsHtml'(
    parameters?: Parameters<Paths.GeneralUpdateCmsHtml.PathParameters> | null,
    data?: Paths.GeneralUpdateCmsHtml.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralUpdateCmsHtml.Responses.$200>
  /**
   * general_deleteCmsHtml - Delete Cms Html
   */
  'general_deleteCmsHtml'(
    parameters?: Parameters<Paths.GeneralDeleteCmsHtml.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralDeleteCmsHtml.Responses.$200>
  /**
   * general_getFrontendUrl - Get Frontend Url
   */
  'general_getFrontendUrl'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralGetFrontendUrl.Responses.$200>
  /**
   * general_getTheme - Get Theme
   */
  'general_getTheme'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralGetTheme.Responses.$200>
  /**
   * general_editTheme - Edit Theme
   */
  'general_editTheme'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GeneralEditTheme.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralEditTheme.Responses.$200>
  /**
   * general_getIcons - Get Icons
   */
  'general_getIcons'(
    parameters?: Parameters<Paths.GeneralGetIcons.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralGetIcons.Responses.$200>
  /**
   * general_getConfig - Get Config
   */
  'general_getConfig'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralGetConfig.Responses.$200>
  /**
   * general_editConfig - Edit Config
   */
  'general_editConfig'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GeneralEditConfig.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralEditConfig.Responses.$200>
  /**
   * general_getLegal - Get Legal
   */
  'general_getLegal'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralGetLegal.Responses.$200>
  /**
   * general_updateLegal - Update Legal
   */
  'general_updateLegal'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GeneralUpdateLegal.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralUpdateLegal.Responses.$200>
  /**
   * general_getApiTokens - Get Api Tokens
   */
  'general_getApiTokens'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralGetApiTokens.Responses.$200>
  /**
   * general_createApiToken - Create Api Token
   */
  'general_createApiToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GeneralCreateApiToken.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralCreateApiToken.Responses.$200>
  /**
   * general_revokeApiToken - Revoke Api Token
   */
  'general_revokeApiToken'(
    parameters?: Parameters<Paths.GeneralRevokeApiToken.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralRevokeApiToken.Responses.$200>
  /**
   * general_getTeamMember - Get Team Member
   * 
   * Return memberships where users are in groups which are marked as team
   */
  'general_getTeamMember'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralGetTeamMember.Responses.$200>
  /**
   * general_editTeamMember - Edit Team Member
   */
  'general_editTeamMember'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GeneralEditTeamMember.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralEditTeamMember.Responses.$200>
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
   * auth_prepareSocial - Prepare Social
   */
  'auth_prepareSocial'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthPrepareSocial.Responses.$200>
  /**
   * auth_startSocial - Start Social
   */
  'auth_startSocial'(
    parameters?: Parameters<Paths.AuthStartSocial.PathParameters & Paths.AuthStartSocial.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthStartSocial.Responses.$200>
  /**
   * auth_finishSocial - Finish Social
   */
  'auth_finishSocial'(
    parameters?: Parameters<Paths.AuthFinishSocial.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthFinishSocial.Responses.$200>
  /**
   * auth_finishSocial - Finish Social
   */
  'auth_finishSocial'(
    parameters?: Parameters<Paths.AuthFinishSocial.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthFinishSocial.Responses.$200>
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
  ): OperationResponse<Paths.UserGetData.Responses.$200>
  /**
   * user_getUsers - Get Users
   */
  'user_getUsers'(
    parameters?: Parameters<Paths.UserGetUsers.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetUsers.Responses.$200>
  /**
   * user_createUser - Create User
   */
  'user_createUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UserCreateUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserCreateUser.Responses.$200>
  /**
   * user_editUser - Edit User
   */
  'user_editUser'(
    parameters?: Parameters<Paths.UserEditUser.PathParameters> | null,
    data?: Paths.UserEditUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserEditUser.Responses.$200>
  /**
   * user_getAttributeHistory - Get Attribute History
   */
  'user_getAttributeHistory'(
    parameters?: Parameters<Paths.UserGetAttributeHistory.PathParameters & Paths.UserGetAttributeHistory.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetAttributeHistory.Responses.$200>
  /**
   * user_getAttributeDefinitions - Get Attribute Definitions
   */
  'user_getAttributeDefinitions'(
    parameters?: Parameters<Paths.UserGetAttributeDefinitions.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetAttributeDefinitions.Responses.$200>
  /**
   * user_createAttributeDefinition - Create Attribute Definition
   */
  'user_createAttributeDefinition'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UserCreateAttributeDefinition.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserCreateAttributeDefinition.Responses.$200>
  /**
   * user_getAttributeDefinition - Get Attribute Definition
   */
  'user_getAttributeDefinition'(
    parameters?: Parameters<Paths.UserGetAttributeDefinition.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetAttributeDefinition.Responses.$200>
  /**
   * user_editAttributeDefinition - Edit Attribute Definition
   */
  'user_editAttributeDefinition'(
    parameters?: Parameters<Paths.UserEditAttributeDefinition.PathParameters> | null,
    data?: Paths.UserEditAttributeDefinition.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserEditAttributeDefinition.Responses.$200>
  /**
   * user_deleteAttributeDefinition - Delete Attribute Definition
   */
  'user_deleteAttributeDefinition'(
    parameters?: Parameters<Paths.UserDeleteAttributeDefinition.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserDeleteAttributeDefinition.Responses.$200>
  /**
   * user_createAttribute - Create Attribute
   */
  'user_createAttribute'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UserCreateAttribute.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserCreateAttribute.Responses.$200>
  /**
   * user_deleteAttribute - Delete Attribute
   */
  'user_deleteAttribute'(
    parameters?: Parameters<Paths.UserDeleteAttribute.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserDeleteAttribute.Responses.$200>
  /**
   * user_getMemberships - Get Memberships
   * 
   * Returns all memberships of the given and all linked users.
   */
  'user_getMemberships'(
    parameters?: Parameters<Paths.UserGetMemberships.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetMemberships.Responses.$200>
  /**
   * user_addMembership - Add Membership
   */
  'user_addMembership'(
    parameters?: Parameters<Paths.UserAddMembership.PathParameters & Paths.UserAddMembership.QueryParameters> | null,
    data?: Paths.UserAddMembership.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAddMembership.Responses.$200>
  /**
   * user_endActiveMemberships - End Active Memberships
   * 
   * End all currently active memberships.
   */
  'user_endActiveMemberships'(
    parameters?: Parameters<Paths.UserEndActiveMemberships.PathParameters & Paths.UserEndActiveMemberships.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserEndActiveMemberships.Responses.$200>
  /**
   * user_editMembership - Edit Membership
   */
  'user_editMembership'(
    parameters?: Parameters<Paths.UserEditMembership.PathParameters> | null,
    data?: Paths.UserEditMembership.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserEditMembership.Responses.$200>
  /**
   * user_endMembership - End Membership
   */
  'user_endMembership'(
    parameters?: Parameters<Paths.UserEndMembership.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserEndMembership.Responses.$200>
  /**
   * user_getActiveGroups - Get Active Groups
   * 
   * Returns all active groups.
   */
  'user_getActiveGroups'(
    parameters?: Parameters<Paths.UserGetActiveGroups.PathParameters & Paths.UserGetActiveGroups.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetActiveGroups.Responses.$200>
  /**
   * user_getActiveGroupsByBundle - Get Active Groups By Bundle
   * 
   * Returns all active groups, grouped by serverbundle.
   */
  'user_getActiveGroupsByBundle'(
    parameters?: Parameters<Paths.UserGetActiveGroupsByBundle.PathParameters & Paths.UserGetActiveGroupsByBundle.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetActiveGroupsByBundle.Responses.$200>
  /**
   * user_getPackets - Get Packets
   * 
   * Returns all applied packets of the given and all linked users.
   */
  'user_getPackets'(
    parameters?: Parameters<Paths.UserGetPackets.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetPackets.Responses.$200>
  /**
   * user_getCurrentProperties - Get Current Properties
   * 
   * Returns all current properties of the given and all linked users.
   */
  'user_getCurrentProperties'(
    parameters?: Parameters<Paths.UserGetCurrentProperties.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetCurrentProperties.Responses.$200>
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
  ): OperationResponse<Paths.UserGetPurchases.Responses.$200>
  /**
   * user_getAddress - Get Address
   */
  'user_getAddress'(
    parameters?: Parameters<Paths.UserGetAddress.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetAddress.Responses.$200>
  /**
   * user_addAddress - Add Address
   */
  'user_addAddress'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UserAddAddress.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserAddAddress.Responses.$200>
  /**
   * user_getAddresses - Get Addresses
   */
  'user_getAddresses'(
    parameters?: Parameters<Paths.UserGetAddresses.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetAddresses.Responses.$200>
  /**
   * user_unbanActiveBans - Unban Active Bans
   * 
   * Unban all currently active bans.
   */
  'user_unbanActiveBans'(
    parameters?: Parameters<Paths.UserUnbanActiveBans.PathParameters & Paths.UserUnbanActiveBans.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserUnbanActiveBans.Responses.$200>
  /**
   * user_getLog - Get Log
   */
  'user_getLog'(
    parameters?: Parameters<Paths.UserGetLog.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetLog.Responses.$200>
  /**
   * user_createLogEntry - Create Log Entry
   */
  'user_createLogEntry'(
    parameters?: Parameters<Paths.UserCreateLogEntry.PathParameters> | null,
    data?: Paths.UserCreateLogEntry.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserCreateLogEntry.Responses.$200>
  /**
   * server_getBundles - Get Bundles
   */
  'server_getBundles'(
    parameters?: Parameters<Paths.ServerGetBundles.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetBundles.Responses.$200>
  /**
   * server_addBundle - Add Bundle
   */
  'server_addBundle'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ServerAddBundle.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerAddBundle.Responses.$200>
  /**
   * server_getBundle - Get Bundle
   */
  'server_getBundle'(
    parameters?: Parameters<Paths.ServerGetBundle.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetBundle.Responses.$200>
  /**
   * server_editBundle - Edit Bundle
   */
  'server_editBundle'(
    parameters?: Parameters<Paths.ServerEditBundle.PathParameters> | null,
    data?: Paths.ServerEditBundle.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerEditBundle.Responses.$200>
  /**
   * server_deleteBundle - Delete Bundle
   */
  'server_deleteBundle'(
    parameters?: Parameters<Paths.ServerDeleteBundle.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerDeleteBundle.Responses.$200>
  /**
   * server_getGroups - Get Groups
   */
  'server_getGroups'(
    parameters?: Parameters<Paths.ServerGetGroups.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetGroups.Responses.$200>
  /**
   * server_getServerByBundle - Get Server By Bundle
   */
  'server_getServerByBundle'(
    parameters?: Parameters<Paths.ServerGetServerByBundle.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetServerByBundle.Responses.$200>
  /**
   * server_getBans - Get Bans
   * 
   * Returns a dict of all bans in the bundle by user identifier.
   */
  'server_getBans'(
    parameters?: Parameters<Paths.ServerGetBans.PathParameters & Paths.ServerGetBans.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetBans.Responses.$200>
  /**
   * server_getWarnings - Get Warnings
   * 
   * Returns a dict of all warnings in the bundle by user identifier.
   */
  'server_getWarnings'(
    parameters?: Parameters<Paths.ServerGetWarnings.PathParameters & Paths.ServerGetWarnings.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetWarnings.Responses.$200>
  /**
   * server_getBundleTokens - Get Bundle Tokens
   */
  'server_getBundleTokens'(
    parameters?: Parameters<Paths.ServerGetBundleTokens.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetBundleTokens.Responses.$200>
  /**
   * server_createBundleToken - Create Bundle Token
   */
  'server_createBundleToken'(
    parameters?: Parameters<Paths.ServerCreateBundleToken.PathParameters> | null,
    data?: Paths.ServerCreateBundleToken.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerCreateBundleToken.Responses.$200>
  /**
   * server_revokeBundleToken - Revoke Bundle Token
   */
  'server_revokeBundleToken'(
    parameters?: Parameters<Paths.ServerRevokeBundleToken.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerRevokeBundleToken.Responses.$200>
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
  ): OperationResponse<Paths.ServerGetServers.Responses.$200>
  /**
   * server_createServer - Create Server
   */
  'server_createServer'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ServerCreateServer.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerCreateServer.Responses.$200>
  /**
   * server_getServer - Get Server
   */
  'server_getServer'(
    parameters?: Parameters<Paths.ServerGetServer.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetServer.Responses.$200>
  /**
   * server_editServer - Edit Server
   */
  'server_editServer'(
    parameters?: Parameters<Paths.ServerEditServer.PathParameters> | null,
    data?: Paths.ServerEditServer.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerEditServer.Responses.$200>
  /**
   * server_deleteServer - Delete Server
   */
  'server_deleteServer'(
    parameters?: Parameters<Paths.ServerDeleteServer.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerDeleteServer.Responses.$200>
  /**
   * group_getGroups - Get Groups
   */
  'group_getGroups'(
    parameters?: Parameters<Paths.GroupGetGroups.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupGetGroups.Responses.$200>
  /**
   * group_addGroup - Add Group
   */
  'group_addGroup'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GroupAddGroup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupAddGroup.Responses.$200>
  /**
   * group_getGroupMembers - Get Group Members
   */
  'group_getGroupMembers'(
    parameters?: Parameters<Paths.GroupGetGroupMembers.PathParameters & Paths.GroupGetGroupMembers.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupGetGroupMembers.Responses.$200>
  /**
   * group_getGroup - Get Group
   */
  'group_getGroup'(
    parameters?: Parameters<Paths.GroupGetGroup.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupGetGroup.Responses.$200>
  /**
   * group_editGroup - Edit Group
   */
  'group_editGroup'(
    parameters?: Parameters<Paths.GroupEditGroup.PathParameters> | null,
    data?: Paths.GroupEditGroup.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupEditGroup.Responses.$200>
  /**
   * group_deleteGroup - Delete Group
   */
  'group_deleteGroup'(
    parameters?: Parameters<Paths.GroupDeleteGroup.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupDeleteGroup.Responses.$200>
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
   * group_getAdvancedProperties - Get Advanced Properties
   * 
   * Returns all advanced properties with a short description.
   */
  'group_getAdvancedProperties'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GroupGetAdvancedProperties.Responses.$200>
  /**
   * ban_getBans - Get Bans
   * 
   * Returns bans of the current user and all bans of the serverbundles where the user has the `ban_show` property.
   */
  'ban_getBans'(
    parameters?: Parameters<Paths.BanGetBans.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanGetBans.Responses.$200>
  /**
   * ban_createBan - Create Ban
   */
  'ban_createBan'(
    parameters?: Parameters<Paths.BanCreateBan.QueryParameters> | null,
    data?: Paths.BanCreateBan.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanCreateBan.Responses.$200>
  /**
   * ban_editBan - Edit Ban
   */
  'ban_editBan'(
    parameters?: Parameters<Paths.BanEditBan.PathParameters> | null,
    data?: Paths.BanEditBan.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanEditBan.Responses.$200>
  /**
   * ban_deleteBan - Delete Ban
   */
  'ban_deleteBan'(
    parameters?: Parameters<Paths.BanDeleteBan.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanDeleteBan.Responses.$200>
  /**
   * ban_getLog - Get Log
   */
  'ban_getLog'(
    parameters?: Parameters<Paths.BanGetLog.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanGetLog.Responses.$200>
  /**
   * warning_getWarnings - Get Warnings
   */
  'warning_getWarnings'(
    parameters?: Parameters<Paths.WarningGetWarnings.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WarningGetWarnings.Responses.$200>
  /**
   * warning_addWarning - Add Warning
   */
  'warning_addWarning'(
    parameters?: Parameters<Paths.WarningAddWarning.QueryParameters> | null,
    data?: Paths.WarningAddWarning.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WarningAddWarning.Responses.$200>
  /**
   * warning_getConfig - Get Config
   */
  'warning_getConfig'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WarningGetConfig.Responses.$200>
  /**
   * warning_updateConfig - Update Config
   */
  'warning_updateConfig'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.WarningUpdateConfig.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WarningUpdateConfig.Responses.$200>
  /**
   * warning_toggleWarningStatus - Toggle Warning Status
   */
  'warning_toggleWarningStatus'(
    parameters?: Parameters<Paths.WarningToggleWarningStatus.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WarningToggleWarningStatus.Responses.$200>
  /**
   * warning_deleteWarning - Delete Warning
   */
  'warning_deleteWarning'(
    parameters?: Parameters<Paths.WarningDeleteWarning.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WarningDeleteWarning.Responses.$200>
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
  ): OperationResponse<Paths.ShopCreateGateway.Responses.$200>
  /**
   * shop_editGateway - Edit Gateway
   */
  'shop_editGateway'(
    parameters?: Parameters<Paths.ShopEditGateway.PathParameters> | null,
    data?: Paths.ShopEditGateway.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopEditGateway.Responses.$200>
  /**
   * shop_deleteGateway - Delete Gateway
   */
  'shop_deleteGateway'(
    parameters?: Parameters<Paths.ShopDeleteGateway.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopDeleteGateway.Responses.$200>
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
  ): OperationResponse<Paths.ShopCreateDiscount.Responses.$200>
  /**
   * shop_getDiscount - Get Discount
   * 
   * Get discount by UUID or code.
   */
  'shop_getDiscount'(
    parameters?: Parameters<Paths.ShopGetDiscount.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetDiscount.Responses.$200>
  /**
   * shop_editDiscount - Edit Discount
   */
  'shop_editDiscount'(
    parameters?: Parameters<Paths.ShopEditDiscount.PathParameters> | null,
    data?: Paths.ShopEditDiscount.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopEditDiscount.Responses.$200>
  /**
   * shop_deleteDiscount - Delete Discount
   */
  'shop_deleteDiscount'(
    parameters?: Parameters<Paths.ShopDeleteDiscount.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopDeleteDiscount.Responses.$200>
  /**
   * shop_addCouponCode - Add Coupon Code
   * 
   * This saves the users paysafecard pins to the specified debit
   */
  'shop_addCouponCode'(
    parameters?: Parameters<Paths.ShopAddCouponCode.PathParameters> | null,
    data?: Paths.ShopAddCouponCode.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopAddCouponCode.Responses.$200>
  /**
   * shop_confirmDebit - Confirm Debit
   * 
   * Manual confirmation of debit
   */
  'shop_confirmDebit'(
    parameters?: Parameters<Paths.ShopConfirmDebit.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopConfirmDebit.Responses.$200>
  /**
   * shop_getPackets - Get Packets
   * 
   * Returns all packets (in the given category) and does price calculation.
   */
  'shop_getPackets'(
    parameters?: Parameters<Paths.ShopGetPackets.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetPackets.Responses.$200>
  /**
   * shop_getCart - Get Cart
   * 
   * Return cart items and price calculation.
   */
  'shop_getCart'(
    parameters?: Parameters<Paths.ShopGetCart.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetCart.Responses.$200>
  /**
   * shop_addPacketToCart - Add Packet To Cart
   */
  'shop_addPacketToCart'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ShopAddPacketToCart.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopAddPacketToCart.Responses.$200>
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
  ): OperationResponse<Paths.ShopRemovePacketFromCart.Responses.$200>
  /**
   * shop_applyDiscount - Apply Discount
   */
  'shop_applyDiscount'(
    parameters?: Parameters<Paths.ShopApplyDiscount.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopApplyDiscount.Responses.$200>
  /**
   * shop_removeDiscount - Remove Discount
   */
  'shop_removeDiscount'(
    parameters?: Parameters<Paths.ShopRemoveDiscount.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopRemoveDiscount.Responses.$200>
  /**
   * shop_startCheckout - Start Checkout
   */
  'shop_startCheckout'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ShopStartCheckout.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopStartCheckout.Responses.$200>
  /**
   * shop_startPayment - Start Payment
   */
  'shop_startPayment'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ShopStartPayment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopStartPayment.Responses.$200>
  /**
   * shop_checkPayment - Check Payment
   */
  'shop_checkPayment'(
    parameters?: Parameters<Paths.ShopCheckPayment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopCheckPayment.Responses.$200>
  /**
   * shop_finishPayment - Finish Payment
   * 
   * Meant for payments than can be finished "in house". For example credits.
   */
  'shop_finishPayment'(
    parameters?: Parameters<Paths.ShopFinishPayment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopFinishPayment.Responses.$200>
  /**
   * shop_cancelPayment - Cancel Payment
   */
  'shop_cancelPayment'(
    parameters?: Parameters<Paths.ShopCancelPayment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopCancelPayment.Responses.$200>
  /**
   * shop_getPurchases - Get Purchases
   */
  'shop_getPurchases'(
    parameters?: Parameters<Paths.ShopGetPurchases.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetPurchases.Responses.$200>
  /**
   * shop_getPurchaseStatuses - Get Purchase Statuses
   */
  'shop_getPurchaseStatuses'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetPurchaseStatuses.Responses.$200>
  /**
   * shop_getPurchaseGateways - Get Purchase Gateways
   */
  'shop_getPurchaseGateways'(
    parameters?: Parameters<Paths.ShopGetPurchaseGateways.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetPurchaseGateways.Responses.$200>
  /**
   * shop_editPurchase - Edit Purchase
   */
  'shop_editPurchase'(
    parameters?: Parameters<Paths.ShopEditPurchase.PathParameters> | null,
    data?: Paths.ShopEditPurchase.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopEditPurchase.Responses.$200>
  /**
   * shop_getDebitInvoice - Get Debit Invoice
   */
  'shop_getDebitInvoice'(
    parameters?: Parameters<Paths.ShopGetDebitInvoice.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetDebitInvoice.Responses.$200>
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
  ): OperationResponse<Paths.ShopGetDebitStatistic.Responses.$200>
  /**
   * shop_getDebits - Get Debits
   */
  'shop_getDebits'(
    parameters?: Parameters<Paths.ShopGetDebits.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetDebits.Responses.$200>
  /**
   * shop_getDebit - Get Debit
   */
  'shop_getDebit'(
    parameters?: Parameters<Paths.ShopGetDebit.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetDebit.Responses.$200>
  /**
   * shop_getPurchaseStatistic - Get Purchase Statistic
   */
  'shop_getPurchaseStatistic'(
    parameters?: Parameters<Paths.ShopGetPurchaseStatistic.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetPurchaseStatistic.Responses.$200>
  /**
   * shop_getReport - Get Report
   * 
   * Returns a finance report for the given timerange.
   */
  'shop_getReport'(
    parameters?: Parameters<Paths.ShopGetReport.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetReport.Responses.$200>
  /**
   * shop_getReportCsv - Get Report Csv
   * 
   * Returns a finance report for the given timerange in CSV format.
   */
  'shop_getReportCsv'(
    parameters?: Parameters<Paths.ShopGetReportCsv.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetReportCsv.Responses.$200>
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
  ): OperationResponse<Paths.ShopCreateTaxRule.Responses.$200>
  /**
   * shop_deleteTaxRule - Delete Tax Rule
   */
  'shop_deleteTaxRule'(
    parameters?: Parameters<Paths.ShopDeleteTaxRule.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopDeleteTaxRule.Responses.$200>
  /**
   * shop_getConfig - Get Config
   */
  'shop_getConfig'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetConfig.Responses.$200>
  /**
   * shop_editConfig - Edit Config
   */
  'shop_editConfig'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ShopEditConfig.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopEditConfig.Responses.$200>
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
  ): OperationResponse<Paths.ShopChangeBusinessAddress.Responses.$200>
  /**
   * packet_getRewards - Get Rewards
   */
  'packet_getRewards'(
    parameters?: Parameters<Paths.PacketGetRewards.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketGetRewards.Responses.$200>
  /**
   * packet_addReward - Add Reward
   */
  'packet_addReward'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PacketAddReward.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketAddReward.Responses.$200>
  /**
   * packet_editReward - Edit Reward
   */
  'packet_editReward'(
    parameters?: Parameters<Paths.PacketEditReward.PathParameters> | null,
    data?: Paths.PacketEditReward.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketEditReward.Responses.$200>
  /**
   * packet_deleteReward - Delete Reward
   */
  'packet_deleteReward'(
    parameters?: Parameters<Paths.PacketDeleteReward.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketDeleteReward.Responses.$200>
  /**
   * packet_getAppliedRewards - Get Applied Rewards
   */
  'packet_getAppliedRewards'(
    parameters?: Parameters<Paths.PacketGetAppliedRewards.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketGetAppliedRewards.Responses.$200>
  /**
   * packet_getAppliedRewardsByUser - Get Applied Rewards By User
   * 
   * Get rewards for a list of users.
   */
  'packet_getAppliedRewardsByUser'(
    parameters?: Parameters<Paths.PacketGetAppliedRewardsByUser.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketGetAppliedRewardsByUser.Responses.$200>
  /**
   * packet_editAppliedReward - Edit Applied Reward
   */
  'packet_editAppliedReward'(
    parameters?: Parameters<Paths.PacketEditAppliedReward.PathParameters> | null,
    data?: Paths.PacketEditAppliedReward.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketEditAppliedReward.Responses.$200>
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
  ): OperationResponse<Paths.PacketCreateCategory.Responses.$200>
  /**
   * packet_editCategory - Edit Category
   */
  'packet_editCategory'(
    parameters?: Parameters<Paths.PacketEditCategory.PathParameters> | null,
    data?: Paths.PacketEditCategory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketEditCategory.Responses.$200>
  /**
   * packet_deleteCategory - Delete Category
   */
  'packet_deleteCategory'(
    parameters?: Parameters<Paths.PacketDeleteCategory.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketDeleteCategory.Responses.$200>
  /**
   * packet_getPackets - Get Packets
   */
  'packet_getPackets'(
    parameters?: Parameters<Paths.PacketGetPackets.QueryParameters> | null,
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
  ): OperationResponse<Paths.PacketAddPacket.Responses.$200>
  /**
   * packet_editPacket - Edit Packet
   */
  'packet_editPacket'(
    parameters?: Parameters<Paths.PacketEditPacket.PathParameters> | null,
    data?: Paths.PacketEditPacket.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketEditPacket.Responses.$200>
  /**
   * packet_deletePacket - Delete Packet
   */
  'packet_deletePacket'(
    parameters?: Parameters<Paths.PacketDeletePacket.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketDeletePacket.Responses.$200>
  /**
   * packet_getAppliedPackets - Get Applied Packets
   */
  'packet_getAppliedPackets'(
    parameters?: Parameters<Paths.PacketGetAppliedPackets.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketGetAppliedPackets.Responses.$200>
  /**
   * packet_createAppliedPacket - Create Applied Packet
   */
  'packet_createAppliedPacket'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PacketCreateAppliedPacket.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketCreateAppliedPacket.Responses.$200>
  /**
   * packet_getAppliedPacketStatuses - Get Applied Packet Statuses
   */
  'packet_getAppliedPacketStatuses'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketGetAppliedPacketStatuses.Responses.$200>
  /**
   * packet_editAppliedPacket - Edit Applied Packet
   */
  'packet_editAppliedPacket'(
    parameters?: Parameters<Paths.PacketEditAppliedPacket.PathParameters> | null,
    data?: Paths.PacketEditAppliedPacket.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketEditAppliedPacket.Responses.$200>
  /**
   * packet_deleteAppliedPacket - Delete Applied Packet
   */
  'packet_deleteAppliedPacket'(
    parameters?: Parameters<Paths.PacketDeleteAppliedPacket.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketDeleteAppliedPacket.Responses.$200>
  /**
   * news_getMessages - Get Messages
   */
  'news_getMessages'(
    parameters?: Parameters<Paths.NewsGetMessages.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NewsGetMessages.Responses.$200>
  /**
   * news_addMessage - Add Message
   */
  'news_addMessage'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.NewsAddMessage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NewsAddMessage.Responses.$200>
  /**
   * news_editMessage - Edit Message
   */
  'news_editMessage'(
    parameters?: Parameters<Paths.NewsEditMessage.PathParameters> | null,
    data?: Paths.NewsEditMessage.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NewsEditMessage.Responses.$200>
  /**
   * news_deleteMessage - Delete Message
   */
  'news_deleteMessage'(
    parameters?: Parameters<Paths.NewsDeleteMessage.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NewsDeleteMessage.Responses.$200>
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
  ): OperationResponse<Paths.RequirementsCreateRequirementSet.Responses.$200>
  /**
   * requirements_getRequirementSet - Get Requirement Set
   */
  'requirements_getRequirementSet'(
    parameters?: Parameters<Paths.RequirementsGetRequirementSet.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequirementsGetRequirementSet.Responses.$200>
  /**
   * requirements_editRequirementSet - Edit Requirement Set
   */
  'requirements_editRequirementSet'(
    parameters?: Parameters<Paths.RequirementsEditRequirementSet.PathParameters> | null,
    data?: Paths.RequirementsEditRequirementSet.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequirementsEditRequirementSet.Responses.$200>
  /**
   * requirements_deleteRequirementSet - Delete Requirement Set
   */
  'requirements_deleteRequirementSet'(
    parameters?: Parameters<Paths.RequirementsDeleteRequirementSet.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequirementsDeleteRequirementSet.Responses.$200>
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
  ): OperationResponse<Paths.RequirementsCreateRequirement.Responses.$200>
  /**
   * requirements_deleteRequirement - Delete Requirement
   */
  'requirements_deleteRequirement'(
    parameters?: Parameters<Paths.RequirementsDeleteRequirement.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RequirementsDeleteRequirement.Responses.$200>
  /**
   * finance_getAccount - Get Account
   */
  'finance_getAccount'(
    parameters?: Parameters<Paths.FinanceGetAccount.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FinanceGetAccount.Responses.$200>
  /**
   * notification_getStream - Get Stream
   */
  'notification_getStream'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NotificationGetStream.Responses.$200>
  /**
   * notification_getPreviewNotifications - Get Preview Notifications
   */
  'notification_getPreviewNotifications'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NotificationGetPreviewNotifications.Responses.$200>
  /**
   * notification_getNotifications - Get Notifications
   */
  'notification_getNotifications'(
    parameters?: Parameters<Paths.NotificationGetNotifications.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NotificationGetNotifications.Responses.$200>
  /**
   * notification_markAsRead - Mark As Read
   */
  'notification_markAsRead'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.NotificationMarkAsRead.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NotificationMarkAsRead.Responses.$200>
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
  ): OperationResponse<Paths.LogGetLog.Responses.$200>
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
  ): OperationResponse<Paths.WebhookStripeEvent.Responses.$200>
  /**
   * webhook_paysafecardNotification - Paysafecard Notification
   * 
   * Get Payment Notification from PSC system. Check if IP's match PSC Ips taken from docs. (not in SANDBOX system)
   */
  'webhook_paysafecardNotification'(
    parameters?: Parameters<Paths.WebhookPaysafecardNotification.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WebhookPaysafecardNotification.Responses.$200>
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
  ): OperationResponse<Paths.ForumNewThread.Responses.$200>
  /**
   * forum_getTickets - Get Tickets
   */
  'forum_getTickets'(
    parameters?: Parameters<Paths.ForumGetTickets.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumGetTickets.Responses.$200>
  /**
   * forum_getThread - Get Thread
   */
  'forum_getThread'(
    parameters?: Parameters<Paths.ForumGetThread.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumGetThread.Responses.$200>
  /**
   * forum_toggleStatus - Toggle Status
   */
  'forum_toggleStatus'(
    parameters?: Parameters<Paths.ForumToggleStatus.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumToggleStatus.Responses.$200>
  /**
   * forum_getThreadPosts - Get Thread Posts
   */
  'forum_getThreadPosts'(
    parameters?: Parameters<Paths.ForumGetThreadPosts.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumGetThreadPosts.Responses.$200>
  /**
   * forum_newPost - New Post
   */
  'forum_newPost'(
    parameters?: Parameters<Paths.ForumNewPost.PathParameters> | null,
    data?: Paths.ForumNewPost.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumNewPost.Responses.$200>
  /**
   * discord_getGuild - Get Guild
   */
  'discord_getGuild'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DiscordGetGuild.Responses.$200>
  /**
   * discord_getGuildRoles - Get Guild Roles
   */
  'discord_getGuildRoles'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DiscordGetGuildRoles.Responses.$200>
  /**
   * discord_getRelations - Get Relations
   */
  'discord_getRelations'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DiscordGetRelations.Responses.$200>
  /**
   * discord_addRelation - Add Relation
   */
  'discord_addRelation'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.DiscordAddRelation.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DiscordAddRelation.Responses.$200>
  /**
   * discord_deleteRelation - Delete Relation
   */
  'discord_deleteRelation'(
    parameters?: Parameters<Paths.DiscordDeleteRelation.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DiscordDeleteRelation.Responses.$200>
  /**
   * import_getGextensionPackets - Get Gextension Packets
   */
  'import_getGextensionPackets'(
    parameters?: Parameters<Paths.ImportGetGextensionPackets.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ImportGetGextensionPackets.Responses.$200>
  /**
   * import_importGextension - Import Gextension
   */
  'import_importGextension'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ImportImportGextension.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ImportImportGextension.Responses.$200>
}

export interface PathsDictionary {
  ['/general/nav']: {
    /**
     * general_getNavItems - Get Nav Items
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralGetNavItems.Responses.$200>
    /**
     * general_updateNavItems - Update Nav Items
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GeneralUpdateNavItems.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralUpdateNavItems.Responses.$200>
  }
  ['/general/html']: {
    /**
     * general_createCmsHtml - Create Cms Html
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GeneralCreateCmsHtml.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralCreateCmsHtml.Responses.$200>
  }
  ['/general/html/{uuid}']: {
    /**
     * general_getCmsHtml - Get Cms Html
     */
    'get'(
      parameters?: Parameters<Paths.GeneralGetCmsHtml.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralGetCmsHtml.Responses.$200>
    /**
     * general_deleteCmsHtml - Delete Cms Html
     */
    'delete'(
      parameters?: Parameters<Paths.GeneralDeleteCmsHtml.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralDeleteCmsHtml.Responses.$200>
    /**
     * general_updateCmsHtml - Update Cms Html
     */
    'patch'(
      parameters?: Parameters<Paths.GeneralUpdateCmsHtml.PathParameters> | null,
      data?: Paths.GeneralUpdateCmsHtml.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralUpdateCmsHtml.Responses.$200>
  }
  ['/general/frontend-url']: {
    /**
     * general_getFrontendUrl - Get Frontend Url
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralGetFrontendUrl.Responses.$200>
  }
  ['/general/theme']: {
    /**
     * general_getTheme - Get Theme
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralGetTheme.Responses.$200>
    /**
     * general_editTheme - Edit Theme
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GeneralEditTheme.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralEditTheme.Responses.$200>
  }
  ['/general/icons']: {
    /**
     * general_getIcons - Get Icons
     */
    'get'(
      parameters?: Parameters<Paths.GeneralGetIcons.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralGetIcons.Responses.$200>
  }
  ['/general/config']: {
    /**
     * general_getConfig - Get Config
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralGetConfig.Responses.$200>
    /**
     * general_editConfig - Edit Config
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GeneralEditConfig.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralEditConfig.Responses.$200>
  }
  ['/general/legal']: {
    /**
     * general_getLegal - Get Legal
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralGetLegal.Responses.$200>
    /**
     * general_updateLegal - Update Legal
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GeneralUpdateLegal.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralUpdateLegal.Responses.$200>
  }
  ['/general/api-token']: {
    /**
     * general_getApiTokens - Get Api Tokens
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralGetApiTokens.Responses.$200>
    /**
     * general_createApiToken - Create Api Token
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GeneralCreateApiToken.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralCreateApiToken.Responses.$200>
  }
  ['/general/api-token/{uuid}']: {
    /**
     * general_revokeApiToken - Revoke Api Token
     */
    'patch'(
      parameters?: Parameters<Paths.GeneralRevokeApiToken.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralRevokeApiToken.Responses.$200>
  }
  ['/general/team-member']: {
    /**
     * general_getTeamMember - Get Team Member
     * 
     * Return memberships where users are in groups which are marked as team
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralGetTeamMember.Responses.$200>
    /**
     * general_editTeamMember - Edit Team Member
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GeneralEditTeamMember.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralEditTeamMember.Responses.$200>
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
     * auth_prepareSocial - Prepare Social
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthPrepareSocial.Responses.$200>
  }
  ['/auth/social/{backend}/start']: {
    /**
     * auth_startSocial - Start Social
     */
    'get'(
      parameters?: Parameters<Paths.AuthStartSocial.PathParameters & Paths.AuthStartSocial.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthStartSocial.Responses.$200>
  }
  ['/auth/social/{backend}/finish']: {
    /**
     * auth_finishSocial - Finish Social
     */
    'get'(
      parameters?: Parameters<Paths.AuthFinishSocial.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthFinishSocial.Responses.$200>
    /**
     * auth_finishSocial - Finish Social
     */
    'post'(
      parameters?: Parameters<Paths.AuthFinishSocial.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthFinishSocial.Responses.$200>
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
    ): OperationResponse<Paths.UserGetData.Responses.$200>
  }
  ['/user/']: {
    /**
     * user_getUsers - Get Users
     */
    'get'(
      parameters?: Parameters<Paths.UserGetUsers.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetUsers.Responses.$200>
    /**
     * user_createUser - Create User
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UserCreateUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserCreateUser.Responses.$200>
  }
  ['/user/{uuid}']: {
    /**
     * user_editUser - Edit User
     */
    'patch'(
      parameters?: Parameters<Paths.UserEditUser.PathParameters> | null,
      data?: Paths.UserEditUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserEditUser.Responses.$200>
  }
  ['/user/{uuid}/attribute/{definition_id}']: {
    /**
     * user_getAttributeHistory - Get Attribute History
     */
    'get'(
      parameters?: Parameters<Paths.UserGetAttributeHistory.PathParameters & Paths.UserGetAttributeHistory.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetAttributeHistory.Responses.$200>
  }
  ['/user/attribute/definition']: {
    /**
     * user_getAttributeDefinitions - Get Attribute Definitions
     */
    'get'(
      parameters?: Parameters<Paths.UserGetAttributeDefinitions.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetAttributeDefinitions.Responses.$200>
    /**
     * user_createAttributeDefinition - Create Attribute Definition
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UserCreateAttributeDefinition.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserCreateAttributeDefinition.Responses.$200>
  }
  ['/user/attribute/definition/{uuid_or_name}']: {
    /**
     * user_getAttributeDefinition - Get Attribute Definition
     */
    'get'(
      parameters?: Parameters<Paths.UserGetAttributeDefinition.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetAttributeDefinition.Responses.$200>
  }
  ['/user/attribute/definition/{uuid}']: {
    /**
     * user_deleteAttributeDefinition - Delete Attribute Definition
     */
    'delete'(
      parameters?: Parameters<Paths.UserDeleteAttributeDefinition.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserDeleteAttributeDefinition.Responses.$200>
    /**
     * user_editAttributeDefinition - Edit Attribute Definition
     */
    'patch'(
      parameters?: Parameters<Paths.UserEditAttributeDefinition.PathParameters> | null,
      data?: Paths.UserEditAttributeDefinition.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserEditAttributeDefinition.Responses.$200>
  }
  ['/user/attribute/']: {
    /**
     * user_createAttribute - Create Attribute
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UserCreateAttribute.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserCreateAttribute.Responses.$200>
  }
  ['/user/attribute/{uuid}']: {
    /**
     * user_deleteAttribute - Delete Attribute
     */
    'delete'(
      parameters?: Parameters<Paths.UserDeleteAttribute.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserDeleteAttribute.Responses.$200>
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
    ): OperationResponse<Paths.UserGetMemberships.Responses.$200>
    /**
     * user_addMembership - Add Membership
     */
    'post'(
      parameters?: Parameters<Paths.UserAddMembership.PathParameters & Paths.UserAddMembership.QueryParameters> | null,
      data?: Paths.UserAddMembership.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAddMembership.Responses.$200>
    /**
     * user_endActiveMemberships - End Active Memberships
     * 
     * End all currently active memberships.
     */
    'delete'(
      parameters?: Parameters<Paths.UserEndActiveMemberships.PathParameters & Paths.UserEndActiveMemberships.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserEndActiveMemberships.Responses.$200>
  }
  ['/user/membership/{uuid}']: {
    /**
     * user_endMembership - End Membership
     */
    'delete'(
      parameters?: Parameters<Paths.UserEndMembership.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserEndMembership.Responses.$200>
    /**
     * user_editMembership - Edit Membership
     */
    'patch'(
      parameters?: Parameters<Paths.UserEditMembership.PathParameters> | null,
      data?: Paths.UserEditMembership.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserEditMembership.Responses.$200>
  }
  ['/user/{uuid}/group']: {
    /**
     * user_getActiveGroups - Get Active Groups
     * 
     * Returns all active groups.
     */
    'get'(
      parameters?: Parameters<Paths.UserGetActiveGroups.PathParameters & Paths.UserGetActiveGroups.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetActiveGroups.Responses.$200>
  }
  ['/user/{uuid}/group-by-bundle']: {
    /**
     * user_getActiveGroupsByBundle - Get Active Groups By Bundle
     * 
     * Returns all active groups, grouped by serverbundle.
     */
    'get'(
      parameters?: Parameters<Paths.UserGetActiveGroupsByBundle.PathParameters & Paths.UserGetActiveGroupsByBundle.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetActiveGroupsByBundle.Responses.$200>
  }
  ['/user/{uuid}/packet']: {
    /**
     * user_getPackets - Get Packets
     * 
     * Returns all applied packets of the given and all linked users.
     */
    'get'(
      parameters?: Parameters<Paths.UserGetPackets.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetPackets.Responses.$200>
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
    ): OperationResponse<Paths.UserGetCurrentProperties.Responses.$200>
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
    ): OperationResponse<Paths.UserGetPurchases.Responses.$200>
  }
  ['/user/address/{uuid}']: {
    /**
     * user_getAddress - Get Address
     */
    'get'(
      parameters?: Parameters<Paths.UserGetAddress.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetAddress.Responses.$200>
  }
  ['/user/address']: {
    /**
     * user_addAddress - Add Address
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UserAddAddress.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserAddAddress.Responses.$200>
  }
  ['/user/{uuid}/address']: {
    /**
     * user_getAddresses - Get Addresses
     */
    'get'(
      parameters?: Parameters<Paths.UserGetAddresses.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetAddresses.Responses.$200>
  }
  ['/user/{uuid}/ban']: {
    /**
     * user_unbanActiveBans - Unban Active Bans
     * 
     * Unban all currently active bans.
     */
    'patch'(
      parameters?: Parameters<Paths.UserUnbanActiveBans.PathParameters & Paths.UserUnbanActiveBans.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserUnbanActiveBans.Responses.$200>
  }
  ['/user/{uuid}/log']: {
    /**
     * user_getLog - Get Log
     */
    'get'(
      parameters?: Parameters<Paths.UserGetLog.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetLog.Responses.$200>
    /**
     * user_createLogEntry - Create Log Entry
     */
    'post'(
      parameters?: Parameters<Paths.UserCreateLogEntry.PathParameters> | null,
      data?: Paths.UserCreateLogEntry.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserCreateLogEntry.Responses.$200>
  }
  ['/server/bundle/']: {
    /**
     * server_getBundles - Get Bundles
     */
    'get'(
      parameters?: Parameters<Paths.ServerGetBundles.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetBundles.Responses.$200>
    /**
     * server_addBundle - Add Bundle
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ServerAddBundle.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerAddBundle.Responses.$200>
  }
  ['/server/bundle/{uuid}']: {
    /**
     * server_getBundle - Get Bundle
     */
    'get'(
      parameters?: Parameters<Paths.ServerGetBundle.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetBundle.Responses.$200>
    /**
     * server_deleteBundle - Delete Bundle
     */
    'delete'(
      parameters?: Parameters<Paths.ServerDeleteBundle.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerDeleteBundle.Responses.$200>
    /**
     * server_editBundle - Edit Bundle
     */
    'patch'(
      parameters?: Parameters<Paths.ServerEditBundle.PathParameters> | null,
      data?: Paths.ServerEditBundle.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerEditBundle.Responses.$200>
  }
  ['/server/bundle/{uuid}/group']: {
    /**
     * server_getGroups - Get Groups
     */
    'get'(
      parameters?: Parameters<Paths.ServerGetGroups.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetGroups.Responses.$200>
  }
  ['/server/bundle/{uuid}/server']: {
    /**
     * server_getServerByBundle - Get Server By Bundle
     */
    'get'(
      parameters?: Parameters<Paths.ServerGetServerByBundle.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetServerByBundle.Responses.$200>
  }
  ['/server/bundle/{uuid}/ban']: {
    /**
     * server_getBans - Get Bans
     * 
     * Returns a dict of all bans in the bundle by user identifier.
     */
    'get'(
      parameters?: Parameters<Paths.ServerGetBans.PathParameters & Paths.ServerGetBans.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetBans.Responses.$200>
  }
  ['/server/bundle/{uuid}/warning']: {
    /**
     * server_getWarnings - Get Warnings
     * 
     * Returns a dict of all warnings in the bundle by user identifier.
     */
    'get'(
      parameters?: Parameters<Paths.ServerGetWarnings.PathParameters & Paths.ServerGetWarnings.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetWarnings.Responses.$200>
  }
  ['/server/bundle/{uuid}/token']: {
    /**
     * server_getBundleTokens - Get Bundle Tokens
     */
    'get'(
      parameters?: Parameters<Paths.ServerGetBundleTokens.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetBundleTokens.Responses.$200>
    /**
     * server_createBundleToken - Create Bundle Token
     */
    'post'(
      parameters?: Parameters<Paths.ServerCreateBundleToken.PathParameters> | null,
      data?: Paths.ServerCreateBundleToken.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerCreateBundleToken.Responses.$200>
  }
  ['/server/bundle/{uuid}/token/{token_id}']: {
    /**
     * server_revokeBundleToken - Revoke Bundle Token
     */
    'patch'(
      parameters?: Parameters<Paths.ServerRevokeBundleToken.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerRevokeBundleToken.Responses.$200>
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
    ): OperationResponse<Paths.ServerGetServers.Responses.$200>
    /**
     * server_createServer - Create Server
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ServerCreateServer.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerCreateServer.Responses.$200>
  }
  ['/server/{uuid}']: {
    /**
     * server_getServer - Get Server
     */
    'get'(
      parameters?: Parameters<Paths.ServerGetServer.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetServer.Responses.$200>
    /**
     * server_deleteServer - Delete Server
     */
    'delete'(
      parameters?: Parameters<Paths.ServerDeleteServer.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerDeleteServer.Responses.$200>
    /**
     * server_editServer - Edit Server
     */
    'patch'(
      parameters?: Parameters<Paths.ServerEditServer.PathParameters> | null,
      data?: Paths.ServerEditServer.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerEditServer.Responses.$200>
  }
  ['/group/']: {
    /**
     * group_getGroups - Get Groups
     */
    'get'(
      parameters?: Parameters<Paths.GroupGetGroups.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupGetGroups.Responses.$200>
    /**
     * group_addGroup - Add Group
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GroupAddGroup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupAddGroup.Responses.$200>
  }
  ['/group/{uuid}/members']: {
    /**
     * group_getGroupMembers - Get Group Members
     */
    'get'(
      parameters?: Parameters<Paths.GroupGetGroupMembers.PathParameters & Paths.GroupGetGroupMembers.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupGetGroupMembers.Responses.$200>
  }
  ['/group/{uuid}']: {
    /**
     * group_getGroup - Get Group
     */
    'get'(
      parameters?: Parameters<Paths.GroupGetGroup.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupGetGroup.Responses.$200>
    /**
     * group_deleteGroup - Delete Group
     */
    'delete'(
      parameters?: Parameters<Paths.GroupDeleteGroup.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupDeleteGroup.Responses.$200>
    /**
     * group_editGroup - Edit Group
     */
    'patch'(
      parameters?: Parameters<Paths.GroupEditGroup.PathParameters> | null,
      data?: Paths.GroupEditGroup.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupEditGroup.Responses.$200>
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
  ['/group/advanced-property/']: {
    /**
     * group_getAdvancedProperties - Get Advanced Properties
     * 
     * Returns all advanced properties with a short description.
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GroupGetAdvancedProperties.Responses.$200>
  }
  ['/ban/']: {
    /**
     * ban_getBans - Get Bans
     * 
     * Returns bans of the current user and all bans of the serverbundles where the user has the `ban_show` property.
     */
    'get'(
      parameters?: Parameters<Paths.BanGetBans.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanGetBans.Responses.$200>
    /**
     * ban_createBan - Create Ban
     */
    'post'(
      parameters?: Parameters<Paths.BanCreateBan.QueryParameters> | null,
      data?: Paths.BanCreateBan.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanCreateBan.Responses.$200>
  }
  ['/ban/{uuid}']: {
    /**
     * ban_deleteBan - Delete Ban
     */
    'delete'(
      parameters?: Parameters<Paths.BanDeleteBan.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanDeleteBan.Responses.$200>
    /**
     * ban_editBan - Edit Ban
     */
    'patch'(
      parameters?: Parameters<Paths.BanEditBan.PathParameters> | null,
      data?: Paths.BanEditBan.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanEditBan.Responses.$200>
  }
  ['/ban/{uuid}/log']: {
    /**
     * ban_getLog - Get Log
     */
    'get'(
      parameters?: Parameters<Paths.BanGetLog.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanGetLog.Responses.$200>
  }
  ['/warning/']: {
    /**
     * warning_getWarnings - Get Warnings
     */
    'get'(
      parameters?: Parameters<Paths.WarningGetWarnings.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WarningGetWarnings.Responses.$200>
    /**
     * warning_addWarning - Add Warning
     */
    'post'(
      parameters?: Parameters<Paths.WarningAddWarning.QueryParameters> | null,
      data?: Paths.WarningAddWarning.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WarningAddWarning.Responses.$200>
  }
  ['/warning/config']: {
    /**
     * warning_getConfig - Get Config
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WarningGetConfig.Responses.$200>
    /**
     * warning_updateConfig - Update Config
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.WarningUpdateConfig.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WarningUpdateConfig.Responses.$200>
  }
  ['/warning/{uuid}/toggle']: {
    /**
     * warning_toggleWarningStatus - Toggle Warning Status
     */
    'patch'(
      parameters?: Parameters<Paths.WarningToggleWarningStatus.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WarningToggleWarningStatus.Responses.$200>
  }
  ['/warning/{uuid}']: {
    /**
     * warning_deleteWarning - Delete Warning
     */
    'delete'(
      parameters?: Parameters<Paths.WarningDeleteWarning.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WarningDeleteWarning.Responses.$200>
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
    ): OperationResponse<Paths.ShopCreateGateway.Responses.$200>
  }
  ['/shop/gateway/{uuid}']: {
    /**
     * shop_deleteGateway - Delete Gateway
     */
    'delete'(
      parameters?: Parameters<Paths.ShopDeleteGateway.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopDeleteGateway.Responses.$200>
    /**
     * shop_editGateway - Edit Gateway
     */
    'patch'(
      parameters?: Parameters<Paths.ShopEditGateway.PathParameters> | null,
      data?: Paths.ShopEditGateway.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopEditGateway.Responses.$200>
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
    ): OperationResponse<Paths.ShopCreateDiscount.Responses.$200>
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
    ): OperationResponse<Paths.ShopGetDiscount.Responses.$200>
  }
  ['/shop/discount/{uuid}']: {
    /**
     * shop_deleteDiscount - Delete Discount
     */
    'delete'(
      parameters?: Parameters<Paths.ShopDeleteDiscount.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopDeleteDiscount.Responses.$200>
    /**
     * shop_editDiscount - Edit Discount
     */
    'patch'(
      parameters?: Parameters<Paths.ShopEditDiscount.PathParameters> | null,
      data?: Paths.ShopEditDiscount.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopEditDiscount.Responses.$200>
  }
  ['/shop/coupon/{uuid}/start']: {
    /**
     * shop_addCouponCode - Add Coupon Code
     * 
     * This saves the users paysafecard pins to the specified debit
     */
    'post'(
      parameters?: Parameters<Paths.ShopAddCouponCode.PathParameters> | null,
      data?: Paths.ShopAddCouponCode.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopAddCouponCode.Responses.$200>
  }
  ['/shop/coupon/{uuid}/confirm']: {
    /**
     * shop_confirmDebit - Confirm Debit
     * 
     * Manual confirmation of debit
     */
    'patch'(
      parameters?: Parameters<Paths.ShopConfirmDebit.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopConfirmDebit.Responses.$200>
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
    ): OperationResponse<Paths.ShopGetPackets.Responses.$200>
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
    ): OperationResponse<Paths.ShopGetCart.Responses.$200>
    /**
     * shop_addPacketToCart - Add Packet To Cart
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ShopAddPacketToCart.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopAddPacketToCart.Responses.$200>
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
    ): OperationResponse<Paths.ShopRemovePacketFromCart.Responses.$200>
  }
  ['/shop/cart/discount/{code_or_uuid}']: {
    /**
     * shop_applyDiscount - Apply Discount
     */
    'post'(
      parameters?: Parameters<Paths.ShopApplyDiscount.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopApplyDiscount.Responses.$200>
    /**
     * shop_removeDiscount - Remove Discount
     */
    'delete'(
      parameters?: Parameters<Paths.ShopRemoveDiscount.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopRemoveDiscount.Responses.$200>
  }
  ['/shop/cart/checkout']: {
    /**
     * shop_startCheckout - Start Checkout
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ShopStartCheckout.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopStartCheckout.Responses.$200>
  }
  ['/shop/checkout']: {
    /**
     * shop_startPayment - Start Payment
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ShopStartPayment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopStartPayment.Responses.$200>
  }
  ['/shop/checkout/{uuid}']: {
    /**
     * shop_checkPayment - Check Payment
     */
    'get'(
      parameters?: Parameters<Paths.ShopCheckPayment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopCheckPayment.Responses.$200>
    /**
     * shop_finishPayment - Finish Payment
     * 
     * Meant for payments than can be finished "in house". For example credits.
     */
    'post'(
      parameters?: Parameters<Paths.ShopFinishPayment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopFinishPayment.Responses.$200>
    /**
     * shop_cancelPayment - Cancel Payment
     */
    'patch'(
      parameters?: Parameters<Paths.ShopCancelPayment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopCancelPayment.Responses.$200>
  }
  ['/shop/purchase']: {
    /**
     * shop_getPurchases - Get Purchases
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetPurchases.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetPurchases.Responses.$200>
  }
  ['/shop/purchase/status']: {
    /**
     * shop_getPurchaseStatuses - Get Purchase Statuses
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetPurchaseStatuses.Responses.$200>
  }
  ['/shop/purchase/{uuid}/gateway']: {
    /**
     * shop_getPurchaseGateways - Get Purchase Gateways
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetPurchaseGateways.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetPurchaseGateways.Responses.$200>
  }
  ['/shop/purchase/{uuid}']: {
    /**
     * shop_editPurchase - Edit Purchase
     */
    'patch'(
      parameters?: Parameters<Paths.ShopEditPurchase.PathParameters> | null,
      data?: Paths.ShopEditPurchase.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopEditPurchase.Responses.$200>
  }
  ['/shop/debit/{uuid}/invoice']: {
    /**
     * shop_getDebitInvoice - Get Debit Invoice
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetDebitInvoice.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetDebitInvoice.Responses.$200>
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
    ): OperationResponse<Paths.ShopGetDebitStatistic.Responses.$200>
  }
  ['/shop/debit']: {
    /**
     * shop_getDebits - Get Debits
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetDebits.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetDebits.Responses.$200>
  }
  ['/shop/debit/{uuid}']: {
    /**
     * shop_getDebit - Get Debit
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetDebit.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetDebit.Responses.$200>
  }
  ['/shop/purchase/statistic']: {
    /**
     * shop_getPurchaseStatistic - Get Purchase Statistic
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetPurchaseStatistic.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetPurchaseStatistic.Responses.$200>
  }
  ['/shop/report']: {
    /**
     * shop_getReport - Get Report
     * 
     * Returns a finance report for the given timerange.
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetReport.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetReport.Responses.$200>
  }
  ['/shop/report/csv']: {
    /**
     * shop_getReportCsv - Get Report Csv
     * 
     * Returns a finance report for the given timerange in CSV format.
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetReportCsv.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetReportCsv.Responses.$200>
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
    ): OperationResponse<Paths.ShopCreateTaxRule.Responses.$200>
  }
  ['/shop/tax/{uuid}']: {
    /**
     * shop_deleteTaxRule - Delete Tax Rule
     */
    'delete'(
      parameters?: Parameters<Paths.ShopDeleteTaxRule.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopDeleteTaxRule.Responses.$200>
  }
  ['/shop/config']: {
    /**
     * shop_getConfig - Get Config
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetConfig.Responses.$200>
    /**
     * shop_editConfig - Edit Config
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ShopEditConfig.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopEditConfig.Responses.$200>
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
    ): OperationResponse<Paths.ShopChangeBusinessAddress.Responses.$200>
  }
  ['/packet/reward/']: {
    /**
     * packet_getRewards - Get Rewards
     */
    'get'(
      parameters?: Parameters<Paths.PacketGetRewards.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketGetRewards.Responses.$200>
    /**
     * packet_addReward - Add Reward
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PacketAddReward.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketAddReward.Responses.$200>
  }
  ['/packet/reward/{uuid}']: {
    /**
     * packet_deleteReward - Delete Reward
     */
    'delete'(
      parameters?: Parameters<Paths.PacketDeleteReward.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketDeleteReward.Responses.$200>
    /**
     * packet_editReward - Edit Reward
     */
    'patch'(
      parameters?: Parameters<Paths.PacketEditReward.PathParameters> | null,
      data?: Paths.PacketEditReward.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketEditReward.Responses.$200>
  }
  ['/packet/reward/applied']: {
    /**
     * packet_getAppliedRewards - Get Applied Rewards
     */
    'get'(
      parameters?: Parameters<Paths.PacketGetAppliedRewards.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketGetAppliedRewards.Responses.$200>
  }
  ['/packet/reward/applied/user']: {
    /**
     * packet_getAppliedRewardsByUser - Get Applied Rewards By User
     * 
     * Get rewards for a list of users.
     */
    'get'(
      parameters?: Parameters<Paths.PacketGetAppliedRewardsByUser.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketGetAppliedRewardsByUser.Responses.$200>
  }
  ['/packet/reward/applied/{uuid}']: {
    /**
     * packet_editAppliedReward - Edit Applied Reward
     */
    'patch'(
      parameters?: Parameters<Paths.PacketEditAppliedReward.PathParameters> | null,
      data?: Paths.PacketEditAppliedReward.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketEditAppliedReward.Responses.$200>
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
    ): OperationResponse<Paths.PacketCreateCategory.Responses.$200>
  }
  ['/packet/category/{uuid}']: {
    /**
     * packet_deleteCategory - Delete Category
     */
    'delete'(
      parameters?: Parameters<Paths.PacketDeleteCategory.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketDeleteCategory.Responses.$200>
    /**
     * packet_editCategory - Edit Category
     */
    'patch'(
      parameters?: Parameters<Paths.PacketEditCategory.PathParameters> | null,
      data?: Paths.PacketEditCategory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketEditCategory.Responses.$200>
  }
  ['/packet/']: {
    /**
     * packet_getPackets - Get Packets
     */
    'get'(
      parameters?: Parameters<Paths.PacketGetPackets.QueryParameters> | null,
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
    ): OperationResponse<Paths.PacketAddPacket.Responses.$200>
  }
  ['/packet/{uuid}']: {
    /**
     * packet_deletePacket - Delete Packet
     */
    'delete'(
      parameters?: Parameters<Paths.PacketDeletePacket.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketDeletePacket.Responses.$200>
    /**
     * packet_editPacket - Edit Packet
     */
    'patch'(
      parameters?: Parameters<Paths.PacketEditPacket.PathParameters> | null,
      data?: Paths.PacketEditPacket.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketEditPacket.Responses.$200>
  }
  ['/packet/applied']: {
    /**
     * packet_getAppliedPackets - Get Applied Packets
     */
    'get'(
      parameters?: Parameters<Paths.PacketGetAppliedPackets.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketGetAppliedPackets.Responses.$200>
    /**
     * packet_createAppliedPacket - Create Applied Packet
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PacketCreateAppliedPacket.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketCreateAppliedPacket.Responses.$200>
  }
  ['/packet/applied/status']: {
    /**
     * packet_getAppliedPacketStatuses - Get Applied Packet Statuses
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketGetAppliedPacketStatuses.Responses.$200>
  }
  ['/packet/applied/{uuid}']: {
    /**
     * packet_deleteAppliedPacket - Delete Applied Packet
     */
    'delete'(
      parameters?: Parameters<Paths.PacketDeleteAppliedPacket.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketDeleteAppliedPacket.Responses.$200>
    /**
     * packet_editAppliedPacket - Edit Applied Packet
     */
    'patch'(
      parameters?: Parameters<Paths.PacketEditAppliedPacket.PathParameters> | null,
      data?: Paths.PacketEditAppliedPacket.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketEditAppliedPacket.Responses.$200>
  }
  ['/news/']: {
    /**
     * news_getMessages - Get Messages
     */
    'get'(
      parameters?: Parameters<Paths.NewsGetMessages.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewsGetMessages.Responses.$200>
    /**
     * news_addMessage - Add Message
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.NewsAddMessage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewsAddMessage.Responses.$200>
  }
  ['/news/{uuid}']: {
    /**
     * news_deleteMessage - Delete Message
     */
    'delete'(
      parameters?: Parameters<Paths.NewsDeleteMessage.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewsDeleteMessage.Responses.$200>
    /**
     * news_editMessage - Edit Message
     */
    'patch'(
      parameters?: Parameters<Paths.NewsEditMessage.PathParameters> | null,
      data?: Paths.NewsEditMessage.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NewsEditMessage.Responses.$200>
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
    ): OperationResponse<Paths.RequirementsCreateRequirementSet.Responses.$200>
  }
  ['/requirement/set/{uuid}']: {
    /**
     * requirements_getRequirementSet - Get Requirement Set
     */
    'get'(
      parameters?: Parameters<Paths.RequirementsGetRequirementSet.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequirementsGetRequirementSet.Responses.$200>
    /**
     * requirements_deleteRequirementSet - Delete Requirement Set
     */
    'delete'(
      parameters?: Parameters<Paths.RequirementsDeleteRequirementSet.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequirementsDeleteRequirementSet.Responses.$200>
    /**
     * requirements_editRequirementSet - Edit Requirement Set
     */
    'patch'(
      parameters?: Parameters<Paths.RequirementsEditRequirementSet.PathParameters> | null,
      data?: Paths.RequirementsEditRequirementSet.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequirementsEditRequirementSet.Responses.$200>
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
    ): OperationResponse<Paths.RequirementsCreateRequirement.Responses.$200>
  }
  ['/requirement{uuid}']: {
    /**
     * requirements_deleteRequirement - Delete Requirement
     */
    'delete'(
      parameters?: Parameters<Paths.RequirementsDeleteRequirement.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RequirementsDeleteRequirement.Responses.$200>
  }
  ['/finance/account/{uuid}']: {
    /**
     * finance_getAccount - Get Account
     */
    'get'(
      parameters?: Parameters<Paths.FinanceGetAccount.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FinanceGetAccount.Responses.$200>
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
  ['/notification/preview']: {
    /**
     * notification_getPreviewNotifications - Get Preview Notifications
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NotificationGetPreviewNotifications.Responses.$200>
  }
  ['/notification/']: {
    /**
     * notification_getNotifications - Get Notifications
     */
    'get'(
      parameters?: Parameters<Paths.NotificationGetNotifications.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NotificationGetNotifications.Responses.$200>
    /**
     * notification_markAsRead - Mark As Read
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.NotificationMarkAsRead.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NotificationMarkAsRead.Responses.$200>
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
    ): OperationResponse<Paths.LogGetLog.Responses.$200>
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
    ): OperationResponse<Paths.WebhookStripeEvent.Responses.$200>
  }
  ['/webhook/paysafecard/{uuid}/{payment_id}']: {
    /**
     * webhook_paysafecardNotification - Paysafecard Notification
     * 
     * Get Payment Notification from PSC system. Check if IP's match PSC Ips taken from docs. (not in SANDBOX system)
     */
    'post'(
      parameters?: Parameters<Paths.WebhookPaysafecardNotification.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WebhookPaysafecardNotification.Responses.$200>
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
    ): OperationResponse<Paths.ForumNewThread.Responses.$200>
  }
  ['/forum/ticket']: {
    /**
     * forum_getTickets - Get Tickets
     */
    'get'(
      parameters?: Parameters<Paths.ForumGetTickets.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumGetTickets.Responses.$200>
  }
  ['/forum/{uuid}']: {
    /**
     * forum_getThread - Get Thread
     */
    'get'(
      parameters?: Parameters<Paths.ForumGetThread.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumGetThread.Responses.$200>
    /**
     * forum_toggleStatus - Toggle Status
     */
    'patch'(
      parameters?: Parameters<Paths.ForumToggleStatus.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumToggleStatus.Responses.$200>
  }
  ['/forum/{uuid}/post']: {
    /**
     * forum_getThreadPosts - Get Thread Posts
     */
    'get'(
      parameters?: Parameters<Paths.ForumGetThreadPosts.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumGetThreadPosts.Responses.$200>
    /**
     * forum_newPost - New Post
     */
    'post'(
      parameters?: Parameters<Paths.ForumNewPost.PathParameters> | null,
      data?: Paths.ForumNewPost.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumNewPost.Responses.$200>
  }
  ['/discord/guild']: {
    /**
     * discord_getGuild - Get Guild
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DiscordGetGuild.Responses.$200>
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
  ['/discord/relation']: {
    /**
     * discord_getRelations - Get Relations
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DiscordGetRelations.Responses.$200>
    /**
     * discord_addRelation - Add Relation
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.DiscordAddRelation.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DiscordAddRelation.Responses.$200>
  }
  ['/discord/relation/{uuid}']: {
    /**
     * discord_deleteRelation - Delete Relation
     */
    'delete'(
      parameters?: Parameters<Paths.DiscordDeleteRelation.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DiscordDeleteRelation.Responses.$200>
  }
  ['/import/gextension/packet']: {
    /**
     * import_getGextensionPackets - Get Gextension Packets
     */
    'get'(
      parameters?: Parameters<Paths.ImportGetGextensionPackets.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ImportGetGextensionPackets.Responses.$200>
  }
  ['/import/gextension']: {
    /**
     * import_importGextension - Import Gextension
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ImportImportGextension.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ImportImportGextension.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
