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
         * AdvertModel
         */
        export interface AdvertModel {
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
             * Sort Id
             */
            sort_id: number;
            /**
             * Color
             */
            color: string; // color
            /**
             * Enabled
             */
            enabled: boolean;
            /**
             * Serverbundles
             */
            serverbundles: /* ServerbundleModelShort */ ServerbundleModelShort[];
        }
        /**
         * AdvertModelAdd
         */
        export interface AdvertModelAdd {
            /**
             * Title
             */
            title: string;
            /**
             * Content
             */
            content: string;
            /**
             * Color
             */
            color?: string; // color
            /**
             * Enabled
             */
            enabled: boolean;
            /**
             * Serverbundle Id
             */
            serverbundle_id?: string /* uuid */[];
        }
        /**
         * AdvertModelPatch
         */
        export interface AdvertModelPatch {
            /**
             * Title
             */
            title?: string;
            /**
             * Content
             */
            content?: string;
            /**
             * Color
             */
            color?: string; // color
            /**
             * Enabled
             */
            enabled?: boolean;
            /**
             * Serverbundle Id
             */
            serverbundle_id?: string /* uuid */[];
        }
        /**
         * SuccessModel
         */
        export interface ApiV1HelpersSuccessModel {
            /**
             * Success
             */
            success?: boolean;
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
            user: /* UserModelShort */ UserModelShort;
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
         * AppliedPacketModelNoUser
         */
        export interface AppliedPacketModelNoUser {
            /**
             * Id
             */
            id: string; // uuid
            status: /**
             * AppliedPacketStatus
             * An enumeration.
             */
            AppliedPacketStatus;
            packet: /* PacketModelVeryShort */ PacketModelVeryShort;
            purchase?: /* PurchaseModelShort */ PurchaseModelShort;
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
            user: /* UserModelShort */ UserModelShort;
            /**
             * Applied Packet Id
             */
            applied_packet_id: string; // uuid
            applied_packet: /* AppliedPacketModelNoUser */ AppliedPacketModelNoUser;
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
         * AppliedRewardModelAdd
         */
        export interface AppliedRewardModelAdd {
            /**
             * Reward Id
             */
            reward_id: string; // uuid
            /**
             * Applied Packet Id
             */
            applied_packet_id: string; // uuid
            /**
             * User Id
             */
            user_id: string; // uuid
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
         * AuthRequestModel
         */
        export interface AuthRequestModel {
            /**
             * Validation Uuid
             */
            validation_uuid: string; // uuid
            user_type: /**
             * UserType
             * An enumeration.
             */
            UserType;
            /**
             * Created
             */
            created: string; // date-time
            /**
             * Identifier
             */
            identifier?: string;
            /**
             * Valid
             */
            valid: boolean;
            /**
             * Confirmed
             */
            confirmed: boolean;
            /**
             * Id
             */
            id: string; // uuid
        }
        /**
         * AuthRequestModelAdd
         */
        export interface AuthRequestModelAdd {
            user_type: /**
             * UserType
             * An enumeration.
             */
            UserType;
        }
        /**
         * AuthRequestModelNoID
         */
        export interface AuthRequestModelNoID {
            /**
             * Validation Uuid
             */
            validation_uuid: string; // uuid
            user_type: /**
             * UserType
             * An enumeration.
             */
            UserType;
            /**
             * Created
             */
            created: string; // date-time
            /**
             * Identifier
             */
            identifier?: string;
            /**
             * Valid
             */
            valid: boolean;
            /**
             * Confirmed
             */
            confirmed: boolean;
        }
        /**
         * AuthRequestModelPatch
         */
        export interface AuthRequestModelPatch {
            user_type: /**
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
         * BanCommentModelAdd
         */
        export interface BanCommentModelAdd {
            /**
             * Message
             */
            message: string;
            /**
             * Date
             */
            date: string; // date-time
            /**
             * Color
             */
            color?: string; // color
            /**
             * Ban Id
             */
            ban_id: string; // uuid
        }
        /**
         * BanConfigModel
         */
        export interface BanConfigModel {
            /**
             * Ban Protest Url
             */
            ban_protest_url?: string; // uri
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
            creator?: /* UserModelShort */ UserModelShort;
            user: /* UserModelShort */ UserModelShort;
            serverbundle?: /* ServerbundleModelShort */ ServerbundleModelShort;
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
            /**
             * Protests
             */
            protests: /* BanProtestModelExtraShort */ BanProtestModelExtraShort[];
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
         * BanModelShort
         */
        export interface BanModelShort {
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
            /**
             * Active
             */
            active: boolean;
        }
        /**
         * BanProtestModelExtraShort
         */
        export interface BanProtestModelExtraShort {
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Created
             */
            created: string; // date-time
            status: /**
             * ThreadStatus
             * An enumeration.
             */
            ThreadStatus;
        }
        /**
         * BanStatus
         * An enumeration.
         */
        export type BanStatus = "ACTIVE" | "UNBANNED";
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
         * Body_start_payment_shop_checkout__post
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
            price_net?: number;
            /**
             * Price Total
             */
            price_total?: number;
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
            user: /* UserModelShort */ UserModelShort;
            /**
             * Recurring
             */
            recurring?: number; // time-delta
            discount?: /* DiscountModel */ DiscountModel;
            /**
             * Editable
             */
            editable: boolean;
            /**
             * Custom Price
             */
            custom_price?: number;
            /**
             * Custom Credits
             */
            custom_credits?: number;
            target_user?: /* UserModelShort */ UserModelShort;
        }
        /**
         * CartPacketModelAdd
         */
        export interface CartPacketModelAdd {
            /**
             * Packet Id
             */
            packet_id: string; // uuid
            /**
             * Custom Price
             */
            custom_price?: number;
            /**
             * Custom Credits
             */
            custom_credits?: number;
            /**
             * Target User Id
             */
            target_user_id?: string; // uuid
        }
        /**
         * CartPacketModelPatch
         */
        export interface CartPacketModelPatch {
            /**
             * Target User Id
             */
            target_user_id?: string; // uuid
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
             * Title
             */
            title: string;
            /**
             * Requirement Set Id
             */
            requirement_set_id?: string; // uuid
            /**
             * Content
             */
            content?: string;
        }
        /**
         * CmsPageModelAdd
         */
        export interface CmsPageModelAdd {
            /**
             * Title
             */
            title: string;
            /**
             * Content
             */
            content?: string;
            /**
             * Requirement Set Id
             */
            requirement_set_id?: string; // uuid
        }
        /**
         * CmsPageModelPatch
         */
        export interface CmsPageModelPatch {
            /**
             * Title
             */
            title?: string;
            /**
             * Content
             */
            content?: string;
            /**
             * Requirement Set Id
             */
            requirement_set_id?: string; // uuid
        }
        /**
         * CmsPageModelShort
         */
        export interface CmsPageModelShort {
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Title
             */
            title: string;
            /**
             * Requirement Set Id
             */
            requirement_set_id?: string; // uuid
        }
        /**
         * CommentModel
         */
        export interface CommentModel {
            creator: /* UserModelShort */ UserModelShort;
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
         * CouponAddModel
         */
        export interface CouponAddModel {
            /**
             * Coupons
             */
            coupons: string[];
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
        export type DebitStatus = "STARTED" | "APPROVED" | "FINISHED" | "CANCELLED" | "FAILED";
        /**
         * SuccessModel
         */
        export interface DepsVyhubCommonApiHelpersSuccessModel {
            /**
             * Success
             */
            success?: boolean;
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
             * Max Usages Per User
             */
            max_usages_per_user?: number;
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
             * Max Usages Per User
             */
            max_usages_per_user?: number;
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
             * Max Usages Per User
             */
            max_usages_per_user?: number;
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
         * DiscountModelShort
         */
        export interface DiscountModelShort {
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
             * Max Usages Per User
             */
            max_usages_per_user?: number;
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Active
             */
            active: boolean;
        }
        /**
         * DiscountModelWithUsages
         */
        export interface DiscountModelWithUsages {
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
             * Max Usages Per User
             */
            max_usages_per_user?: number;
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
            /**
             * Usages
             */
            usages: number;
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
         * FAQModel
         */
        export interface FAQModel {
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
             * Sort Id
             */
            sort_id: number;
        }
        /**
         * FAQModelAdd
         */
        export interface FAQModelAdd {
            /**
             * Title
             */
            title: string;
            /**
             * Content
             */
            content: string;
        }
        /**
         * FAQModelPatch
         */
        export interface FAQModelPatch {
            /**
             * Title
             */
            title?: string;
            /**
             * Content
             */
            content?: string;
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
             * Community Description
             */
            community_description?: string;
            /**
             * Enable Team
             */
            enable_team?: boolean;
            /**
             * Enable Ticket
             */
            enable_ticket?: boolean;
            /**
             * Enable Forum
             */
            enable_forum?: boolean;
            /**
             * Enable Faq
             */
            enable_faq?: boolean;
            /**
             * Legal Exists
             */
            legal_exists?: boolean;
            /**
             * Addons
             */
            addons?: string[];
            /**
             * Language
             */
            language?: string;
        }
        /**
         * GeneralConfigModelPatch
         */
        export interface GeneralConfigModelPatch {
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
            /**
             * Enable Forum
             */
            enable_forum?: boolean;
            /**
             * Enable Faq
             */
            enable_faq?: boolean;
            /**
             * Language
             */
            language?: string;
        }
        /**
         * GroupAndServerbundleModel
         */
        export interface GroupAndServerbundleModel {
            serverbundle: /* ServerbundleModelShort */ ServerbundleModelShort;
            group: /* GroupModel */ GroupModel;
        }
        /**
         * GroupMappingModel
         */
        export interface GroupMappingModel {
            /**
             * Name
             */
            name: string;
            /**
             * Serverbundle Id
             */
            serverbundle_id?: string; // uuid
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Group Id
             */
            group_id: string; // uuid
        }
        /**
         * GroupMappingModelAdd
         */
        export interface GroupMappingModelAdd {
            /**
             * Name
             */
            name: string;
            /**
             * Serverbundle Id
             */
            serverbundle_id?: string; // uuid
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
            color: string; // color
            /**
             * Properties
             */
            properties: {
                [name: string]: /* PropertyModelGroup */ PropertyModelGroup;
            };
            /**
             * Mappings
             */
            mappings: /* GroupMappingModel */ GroupMappingModel[];
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
            color: string; // color
            /**
             * Properties
             */
            properties?: /* PropertyModelAdd */ PropertyModelAdd[];
            /**
             * Mappings
             */
            mappings?: /* GroupMappingModelAdd */ GroupMappingModelAdd[];
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
            color?: string; // color
            /**
             * Properties
             */
            properties?: /* PropertyModelAdd */ PropertyModelAdd[];
            /**
             * Mappings
             */
            mappings?: /* GroupMappingModelAdd */ GroupMappingModelAdd[];
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
            color: string; // color
            /**
             * Permission Level
             */
            permission_level: number;
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
         * HtmlMetaModel
         */
        export interface HtmlMetaModel {
            /**
             * Title
             */
            title?: string;
            /**
             * Description
             */
            description?: string;
            /**
             * Image Url
             */
            image_url?: string; // uri
            /**
             * Favicon Url
             */
            favicon_url?: string; // uri
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
         * Link
         */
        export interface Link {
            /**
             * Name
             */
            name: string;
            /**
             * Kwargs
             */
            kwargs: {
                [key: string]: any;
            };
        }
        /**
         * LogCategory
         * An enumeration.
         */
        export type LogCategory = "SYSTEM" | "USER" | "BAN" | "SHOP" | "PACKET" | "GROUP" | "NEWS" | "REQUIREMENT" | "DESIGN" | "WARNING" | "SERVER" | "DISCORD" | "FAQ" | "ADVERT" | "NAVIGATION" | "FORUM" | "TEAMSPEAK3" | "OTHER";
        /**
         * LogEntryModel
         */
        export interface LogEntryModel {
            /**
             * Id
             */
            id: string; // uuid
            author?: /* UserModelShort */ UserModelShort;
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
         * LogModel
         */
        export interface LogModel {
            /**
             * Id
             */
            id: number;
            /**
             * Message
             */
            message: string;
            /**
             * Severity
             */
            severity?: string;
            /**
             * Category
             */
            category?: string;
            author?: /* UserModelNano */ UserModelNano;
            /**
             * Labels
             */
            labels: {
                [name: string]: string;
            };
            /**
             * Timestamp
             */
            timestamp: number;
            /**
             * Date
             */
            date: string; // date-time
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
            serverbundle: /* ServerbundleModelShort */ ServerbundleModelShort;
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
            serverbundle: /* ServerbundleModelShort */ ServerbundleModelShort;
        }
        /**
         * MembershipModelShort
         */
        export interface MembershipModelShort {
            /**
             * Id
             */
            id: string; // uuid
            group: /* GroupModelShort */ GroupModelShort;
            /**
             * Begin
             */
            begin: string; // date-time
            /**
             * End
             */
            end?: string; // date-time
            /**
             * Bounds
             */
            bounds: string;
            /**
             * User Id
             */
            user_id: string; // uuid
            /**
             * Serverbundle Id
             */
            serverbundle_id: string; // uuid
        }
        /**
         * MembershipModelUserAdd
         */
        export interface MembershipModelUserAdd {
            /**
             * Begin
             */
            begin?: string; // date-time
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
            serverbundle_id: string; // uuid
        }
        /**
         * NavigationLinkLocation
         * An enumeration.
         */
        export type NavigationLinkLocation = "HEADER" | "FOOTER" | "HELP";
        /**
         * NavigationLinkModel
         */
        export interface NavigationLinkModel {
            /**
             * Title
             */
            title: string;
            /**
             * Icon
             */
            icon?: string;
            /**
             * Enabled
             */
            enabled: boolean;
            /**
             * Default
             */
            default?: boolean;
            /**
             * NavigationLinkLocation
             * An enumeration.
             */
            location?: "HEADER" | "FOOTER" | "HELP";
            /**
             * Req Prop
             * Property which is required to access the link
             */
            req_prop?: string;
            /**
             * Link
             */
            link?: string;
            /**
             * Cms Page Id
             */
            cms_page_id?: string; // uuid
            /**
             * Parent Navigation Link Id
             */
            parent_navigation_link_id?: string; // uuid
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Sublinks
             */
            sublinks: /* NavigationLinkModelShort */ NavigationLinkModelShort[];
        }
        /**
         * NavigationLinkModelAdd
         */
        export interface NavigationLinkModelAdd {
            /**
             * Title
             */
            title: string;
            /**
             * Icon
             */
            icon?: string;
            /**
             * Enabled
             */
            enabled: boolean;
            /**
             * Default
             */
            default?: boolean;
            /**
             * NavigationLinkLocation
             * An enumeration.
             */
            location?: "HEADER" | "FOOTER" | "HELP";
            /**
             * Req Prop
             * Property which is required to access the link
             */
            req_prop?: string;
            /**
             * Link
             */
            link?: string;
            /**
             * Cms Page Id
             */
            cms_page_id?: string; // uuid
            /**
             * Parent Navigation Link Id
             */
            parent_navigation_link_id?: string; // uuid
        }
        /**
         * NavigationLinkModelPatch
         */
        export interface NavigationLinkModelPatch {
            /**
             * Title
             */
            title?: string;
            /**
             * Icon
             */
            icon?: string;
            /**
             * Enabled
             */
            enabled?: boolean;
            /**
             * Default
             */
            default?: boolean;
            /**
             * NavigationLinkLocation
             * An enumeration.
             */
            location?: "HEADER" | "FOOTER" | "HELP";
            /**
             * Req Prop
             * Property which is required to access the link
             */
            req_prop?: string;
            /**
             * Link
             */
            link?: string;
            /**
             * Cms Page Id
             */
            cms_page_id?: string; // uuid
            /**
             * Parent Navigation Link Id
             */
            parent_navigation_link_id?: string; // uuid
        }
        /**
         * NavigationLinkModelShort
         */
        export interface NavigationLinkModelShort {
            /**
             * Title
             */
            title: string;
            /**
             * Icon
             */
            icon?: string;
            /**
             * Enabled
             */
            enabled: boolean;
            /**
             * Default
             */
            default?: boolean;
            /**
             * NavigationLinkLocation
             * An enumeration.
             */
            location?: "HEADER" | "FOOTER" | "HELP";
            /**
             * Req Prop
             * Property which is required to access the link
             */
            req_prop?: string;
            /**
             * Link
             */
            link?: string;
            /**
             * Cms Page Id
             */
            cms_page_id?: string; // uuid
            /**
             * Parent Navigation Link Id
             */
            parent_navigation_link_id?: string; // uuid
            /**
             * Id
             */
            id: string; // uuid
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
            creator?: /* UserModelShort */ UserModelShort;
        }
        /**
         * NewsModelAdd
         */
        export interface NewsModelAdd {
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
            link?: /* Link */ Link;
            message: /* NotificationMessage */ NotificationMessage;
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
         * NotificationMessage
         */
        export interface NotificationMessage {
            /**
             * Name
             */
            name: string;
            /**
             * Kwargs
             */
            kwargs: {
                [key: string]: any;
            };
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
            user?: /* UserModelShort */ UserModelShort;
            serverbundle?: /* ServerbundleModelShort */ ServerbundleModelShort;
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
            user?: /* UserModelShort */ UserModelShort;
            serverbundle?: /* ServerbundleModelShort */ ServerbundleModelShort;
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
             * Subcategory
             */
            subcategory?: string;
            /**
             * Custom Price
             */
            custom_price?: boolean;
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
             * Title In Image
             */
            title_in_image?: string;
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
            discount?: /* DiscountModelShort */ DiscountModelShort;
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
             * Currency Code
             */
            currency_code: string; // ^[A-Z]{3}$
            /**
             * Description
             */
            description?: string;
            /**
             * Active For
             */
            active_for?: number; // time-delta
            /**
             * Subcategory
             */
            subcategory?: string;
            /**
             * Custom Price
             */
            custom_price?: boolean;
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
             * Title In Image
             */
            title_in_image?: string;
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
            discount?: /* DiscountModelShort */ DiscountModelShort;
            price_with_discount?: /* TotalPriceModel */ TotalPriceModel;
            price_without_discount?: /* TotalPriceModel */ TotalPriceModel;
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
             * Subcategory
             */
            subcategory?: string;
            /**
             * Custom Price
             */
            custom_price?: boolean;
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
             * Title In Image
             */
            title_in_image?: string;
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
            discount?: /* DiscountModelShort */ DiscountModelShort;
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
             * Currency Code
             */
            currency_code?: string; // ^[A-Z]{3}$
            /**
             * Description
             */
            description?: string;
            /**
             * Active For
             */
            active_for?: number; // time-delta
            /**
             * Subcategory
             */
            subcategory?: string;
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
             * Title In Image
             */
            title_in_image?: string;
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
            discount?: /* DiscountModelShort */ DiscountModelShort;
            price_with_discount?: /* TotalPriceModel */ TotalPriceModel;
            price_without_discount?: /* TotalPriceModel */ TotalPriceModel;
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
             * Title In Image
             */
            title_in_image?: string;
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
             * Subcategory
             */
            subcategory?: string;
            /**
             * Price
             */
            price: number;
            /**
             * Custom Price
             */
            custom_price?: boolean;
            /**
             * Credits
             */
            credits?: number;
            discount?: /* DiscountModelShort */ DiscountModelShort;
            price_with_discount?: /* TotalPriceModel */ TotalPriceModel;
            price_without_discount?: /* TotalPriceModel */ TotalPriceModel;
            /**
             * Id
             */
            id: string; // uuid
            currency: /* CurrencyModel */ CurrencyModel;
        }
        /**
         * PacketModelVeryShort
         */
        export interface PacketModelVeryShort {
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Title
             */
            title: string;
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
         * Page[PostModel]
         */
        export interface PagePostModel {
            /**
             * Items
             */
            items: /* PostModel */ PostModel[];
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
         * Page[PostModelWithThread]
         */
        export interface PagePostModelWithThread {
            /**
             * Items
             */
            items: /* PostModelWithThread */ PostModelWithThread[];
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
         * Page[ThreadModel]
         */
        export interface PageThreadModel {
            /**
             * Items
             */
            items: /* ThreadModel */ ThreadModel[];
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
         * Page[UserAttributeModel]
         */
        export interface PageUserAttributeModel {
            /**
             * Items
             */
            items: /* UserAttributeModel */ UserAttributeModel[];
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
            enabled?: boolean;
        }
        /**
         * PaymentGatewayType
         * An enumeration.
         */
        export type PaymentGatewayType = "PAYPAL" | "STRIPE" | "PAYSAFECARD" | "COUPON" | "CREDITS" | "FREE";
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
             * Created
             */
            created: string; // date-time
            creator?: /* UserModelShort */ UserModelShort;
            /**
             * Last Edit
             */
            last_edit?: string; // date-time
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
         * PostModelExtraShort
         */
        export interface PostModelExtraShort {
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Created
             */
            created: string; // date-time
            creator?: /* UserModelShort */ UserModelShort;
            /**
             * Thread Id
             */
            thread_id: string; // uuid
        }
        /**
         * PostModelPatch
         */
        export interface PostModelPatch {
            /**
             * Content
             */
            content?: string;
        }
        /**
         * PostModelShort
         */
        export interface PostModelShort {
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Created
             */
            created: string; // date-time
            creator?: /* UserModelShort */ UserModelShort;
            thread?: /* ThreadModelExtraShort */ ThreadModelExtraShort;
        }
        /**
         * PostModelWithThread
         */
        export interface PostModelWithThread {
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Content
             */
            content: string;
            /**
             * Created
             */
            created: string; // date-time
            creator?: /* UserModelShort */ UserModelShort;
            /**
             * Last Edit
             */
            last_edit?: string; // date-time
            thread?: /* ThreadModelExtraShort */ ThreadModelExtraShort;
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
            user: /* UserModelShort */ UserModelShort;
            /**
             * Amount Total
             */
            amount_total: number;
            /**
             * Amount Text
             */
            amount_text: string;
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
            user: /* UserModelShort */ UserModelShort;
            /**
             * Amount Total
             */
            amount_total: number;
            /**
             * Amount Text
             */
            amount_text: string;
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
             * Reactivate On Extend
             */
            reactivate_on_extend?: boolean;
            /**
             * Id
             */
            id: string; // uuid
            serverbundle: /* ServerbundleModelShort */ ServerbundleModelShort;
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
             * Reactivate On Extend
             */
            reactivate_on_extend?: boolean;
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
             * Reactivate On Extend
             */
            reactivate_on_extend?: boolean;
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
            serverbundle?: /* ServerbundleModelShort */ ServerbundleModelShort;
            status: /**
             * ServerStatus
             * An enumeration.
             */
            ServerStatus;
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
            secrets?: /* ServerSecretsModel */ ServerSecretsModel;
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
            /**
             * User Activities
             */
            user_activities?: /* UserActivityModelAdd */ UserActivityModelAdd[];
            /**
             * Secrets
             */
            secrets?: {
                [key: string]: any;
            };
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
         * ServerSecretsModel
         */
        export interface ServerSecretsModel {
            /**
             * Username
             */
            username?: string;
            /**
             * Password
             */
            password?: string;
        }
        /**
         * ServerStatus
         * An enumeration.
         */
        export type ServerStatus = "ONLINE" | "OFFLINE" | "UNKNOWN";
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
            server_type: /**
             * ServerType
             * An enumeration.
             */
            ServerType;
            default_group?: /* GroupModelShort */ GroupModelShort;
            /**
             * Sort Id
             */
            sort_id: number;
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
         * ServerbundleModelPatch
         */
        export interface ServerbundleModelPatch {
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
            /**
             * Color
             */
            color: string; // color
            /**
             * Icon
             */
            icon?: string;
            /**
             * Sort Id
             */
            sort_id: number;
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
             * Donation Goal Display Title
             */
            donation_goal_display_title?: string;
            /**
             * Top Donators Enabled
             */
            top_donators_enabled?: boolean;
            /**
             * Top Donators Limit
             */
            top_donators_limit?: number;
            /**
             * Top Donators Display Title
             */
            top_donators_display_title?: string;
            /**
             * Default Currency
             */
            default_currency?: string; // ^[A-Z]{3}$
            /**
             * Checkout Checkboxes
             */
            checkout_checkboxes?: {
                [name: string]: string;
            }[];
            /**
             * Tax Allow Unknown
             */
            tax_allow_unknown?: boolean;
            /**
             * Invoice Logo Url
             */
            invoice_logo_url?: string; // uri
            /**
             * Tax Included In Packet Price
             */
            tax_included_in_packet_price?: boolean;
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
             * Donation Goal Display Title
             */
            donation_goal_display_title?: string;
            /**
             * Top Donators Enabled
             */
            top_donators_enabled?: boolean;
            /**
             * Top Donators Limit
             */
            top_donators_limit?: number;
            /**
             * Top Donators Display Title
             */
            top_donators_display_title?: string;
            /**
             * Default Currency
             */
            default_currency?: string; // ^[A-Z]{3}$
            /**
             * Checkout Checkboxes
             */
            checkout_checkboxes?: {
                [name: string]: string;
            }[];
            /**
             * Tax Allow Unknown
             */
            tax_allow_unknown?: boolean;
            /**
             * Invoice Logo Url
             */
            invoice_logo_url?: string; // uri
            /**
             * Tax Included In Packet Price
             */
            tax_included_in_packet_price?: boolean;
        }
        /**
         * SocialBackendModel
         */
        export interface SocialBackendModel {
            /**
             * Id
             */
            id: string;
            /**
             * Name
             */
            name: string;
            /**
             * Type
             */
            type: string;
            /**
             * Auth Request
             */
            auth_request?: boolean;
        }
        /**
         * SocialConfigModel
         */
        export interface SocialConfigModel {
            /**
             * Discord Oauth Client Id
             */
            discord_oauth_client_id?: string;
            /**
             * Discord Oauth Client Secret
             */
            discord_oauth_client_secret?: string;
            /**
             * Discord Bot Token
             */
            discord_bot_token?: string;
        }
        /**
         * SocialConfigModelPatch
         */
        export interface SocialConfigModelPatch {
            /**
             * Discord Oauth Client Id
             */
            discord_oauth_client_id?: string;
            /**
             * Discord Oauth Client Secret
             */
            discord_oauth_client_secret?: string;
            /**
             * Discord Bot Token
             */
            discord_bot_token?: string;
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
            user: /* UserModelShort */ UserModelShort;
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
         * ThemeConfigModel
         */
        export interface ThemeConfigModel {
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
             * Secondary
             */
            secondary?: string; // color
            /**
             * Header
             */
            header?: string; // color
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
             * Show Information Fab
             */
            show_information_fab?: boolean;
        }
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
             * Is Read
             */
            is_read?: boolean;
            last_post?: /* PostModelExtraShort */ PostModelExtraShort;
            /**
             * Posts Total
             */
            posts_total?: number;
            /**
             * Created
             */
            created: string; // date-time
            creator?: /* UserModelShort */ UserModelShort;
            status: /**
             * ThreadStatus
             * An enumeration.
             */
            ThreadStatus;
            type: /**
             * ThreadType
             * An enumeration.
             */
            ThreadType;
            ban?: /* BanModelShort */ BanModelShort;
            topic?: /* TopicModelExtraShort */ TopicModelExtraShort;
            /**
             * Pinned
             */
            pinned?: boolean;
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
            /**
             * Ban Id
             */
            ban_id?: string; // uuid
            /**
             * Topic Id
             */
            topic_id?: string; // uuid
            /**
             * Pinned
             */
            pinned?: boolean;
        }
        /**
         * ThreadModelExtraShort
         */
        export interface ThreadModelExtraShort {
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Title
             */
            title: string;
        }
        /**
         * ThreadModelPatch
         */
        export interface ThreadModelPatch {
            /**
             * Title
             */
            title?: string;
            /**
             * Icon
             */
            icon?: string;
            /**
             * Pinned
             */
            pinned?: boolean;
            /**
             * Topic Id
             */
            topic_id?: string; // uuid
        }
        /**
         * ThreadStatus
         * An enumeration.
         */
        export type ThreadStatus = "OPEN" | "CLOSED";
        /**
         * ThreadType
         * An enumeration.
         */
        export type ThreadType = "forum_thread" | "ticket" | "ban_protest" | "thread";
        /**
         * TimeInterval
         * An enumeration.
         */
        export type TimeInterval = "microseconds" | "milliseconds" | "second" | "minute" | "hour" | "day" | "week" | "month" | "quarter" | "year" | "decade" | "century" | "millennium";
        /**
         * TopDonatorModel
         */
        export interface TopDonatorModel {
            user?: /* UserModelShort */ UserModelShort;
            /**
             * Purchases Total
             */
            purchases_total?: number;
        }
        /**
         * TopDonatorModelWithCurrency
         */
        export interface TopDonatorModelWithCurrency {
            /**
             * Donators
             */
            donators: /* TopDonatorModel */ TopDonatorModel[];
            currency: /* CurrencyModel */ CurrencyModel;
        }
        /**
         * TopicCategoryModel
         */
        export interface TopicCategoryModel {
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Title
             */
            title: string;
            /**
             * Sort Id
             */
            sort_id: number;
            requirement_set?: /* RequirementSetModelShort */ RequirementSetModelShort;
            /**
             * Topics
             */
            topics: /* TopicModelShort */ TopicModelShort[];
        }
        /**
         * TopicCategoryModelAdd
         */
        export interface TopicCategoryModelAdd {
            /**
             * Title
             */
            title: string;
            /**
             * Requirement Set Id
             */
            requirement_set_id?: string; // uuid
        }
        /**
         * TopicCategoryModelPatch
         */
        export interface TopicCategoryModelPatch {
            /**
             * Title
             */
            title?: string;
            /**
             * Requirement Set Id
             */
            requirement_set_id?: string; // uuid
        }
        /**
         * TopicModel
         */
        export interface TopicModel {
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Title
             */
            title: string;
            /**
             * Description
             */
            description?: string;
            /**
             * Edit Post
             */
            edit_post: boolean;
            /**
             * Icon
             */
            icon?: string;
            /**
             * Sort Id
             */
            sort_id: number;
            /**
             * Admins
             */
            admins: /* UserModelShort */ UserModelShort[];
            /**
             * Posts Total
             */
            posts_total?: number;
            /**
             * Threads Total
             */
            threads_total?: number;
            last_post?: /* PostModelShort */ PostModelShort;
            topic_category: /* TopicCategoryModel */ TopicCategoryModel;
        }
        /**
         * TopicModelAdd
         */
        export interface TopicModelAdd {
            /**
             * Title
             */
            title: string;
            /**
             * Description
             */
            description?: string;
            /**
             * Icon
             */
            icon?: string;
            /**
             * Admin Ids
             */
            admin_ids?: string /* uuid */[];
            /**
             * Topic Category Id
             */
            topic_category_id: string; // uuid
            /**
             * Edit Post
             */
            edit_post: boolean;
        }
        /**
         * TopicModelExtraShort
         */
        export interface TopicModelExtraShort {
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Title
             */
            title: string;
        }
        /**
         * TopicModelPatch
         */
        export interface TopicModelPatch {
            /**
             * Title
             */
            title?: string;
            /**
             * Description
             */
            description?: string;
            /**
             * Icon
             */
            icon?: string;
            /**
             * Admin Ids
             */
            admin_ids?: string /* uuid */[];
            /**
             * Topic Category Id
             */
            topic_category_id?: string; // uuid
            /**
             * Edit Post
             */
            edit_post?: boolean;
        }
        /**
         * TopicModelShort
         */
        export interface TopicModelShort {
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Title
             */
            title: string;
            /**
             * Description
             */
            description?: string;
            /**
             * Edit Post
             */
            edit_post: boolean;
            /**
             * Icon
             */
            icon?: string;
            /**
             * Sort Id
             */
            sort_id: number;
            /**
             * Admins
             */
            admins: /* UserModelShort */ UserModelShort[];
            /**
             * Posts Total
             */
            posts_total?: number;
            /**
             * Threads Total
             */
            threads_total?: number;
            last_post?: /* PostModelShort */ PostModelShort;
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
            author?: /* UserModelShort */ UserModelShort;
            /**
             * Amount
             */
            amount: number;
        }
        /**
         * TransactionModelAdd
         */
        export interface TransactionModelAdd {
            /**
             * Description
             */
            description: string;
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
         * UserActivityModel
         */
        export interface UserActivityModel {
            /**
             * Extra
             */
            extra?: {
                [key: string]: any;
            };
            /**
             * Last Online
             */
            last_online: string; // date-time
        }
        /**
         * UserActivityModelAdd
         */
        export interface UserActivityModelAdd {
            /**
             * User Id
             */
            user_id: string; // uuid
            /**
             * Extra
             */
            extra?: {
                [key: string]: any;
            };
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
            name?: string;
            /**
             * Title
             */
            title?: string;
            /**
             * Unit
             */
            unit?: string;
            type?: /**
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
            unspecific?: boolean;
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
         * UserAttributeModel
         */
        export interface UserAttributeModel {
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
             * Id
             */
            id: string; // uuid
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
             * Activities
             */
            activities: /* UserActivityModel */ UserActivityModel[];
            /**
             * Linked Users
             */
            linked_users: /* UserModelNoLinked */ UserModelNoLinked[];
        }
        /**
         * UserModelActivity
         */
        export interface UserModelActivity {
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
             * Memberships
             */
            memberships: /* MembershipModelShort */ MembershipModelShort[];
            /**
             * Warnings
             */
            warnings: /* WarningModel */ WarningModel[];
            /**
             * Bans
             */
            bans: /* BanModel */ BanModel[];
            /**
             * Activities
             */
            activities: /* UserActivityModel */ UserActivityModel[];
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
            /**
             * Username
             */
            username: string;
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
             * Avatar
             */
            avatar: string;
            /**
             * Linked Users
             */
            linked_users: /* UserModelShort */ UserModelShort[];
        }
        /**
         * UserModelNano
         */
        export interface UserModelNano {
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
            /**
             * Activities
             */
            activities: /* UserActivityModel */ UserActivityModel[];
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
            /**
             * Admin
             */
            admin?: boolean;
        }
        /**
         * UserModelShort
         */
        export interface UserModelShort {
            /**
             * Id
             */
            id: string; // uuid
            /**
             * Username
             */
            username: string;
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
             * Values
             */
            values?: string[];
        }
        /**
         * UserType
         * An enumeration.
         */
        export type UserType = "CENTRAL" | "STEAM" | "DISCORD" | "MINECRAFT" | "TEAMSPEAK3";
        /**
         * ValidationError
         */
        export interface ValidationError {
            /**
             * Location
             */
            loc: (string | number)[];
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
            time_to_live?: number;
            /**
             * Count Till Ban
             */
            count_till_ban?: number;
            /**
             * Ban Length
             */
            ban_length?: number;
            /**
             * Ban Message
             */
            ban_message?: string;
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
            serverbundle?: /* ServerbundleModelShort */ ServerbundleModelShort;
            user: /* UserModelShort */ UserModelShort;
            creator: /* UserModelShort */ UserModelShort;
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
    namespace AdvertCreateAdvert {
        export type RequestBody = /* AdvertModelAdd */ Components.Schemas.AdvertModelAdd;
        namespace Responses {
            export type $200 = /* AdvertModel */ Components.Schemas.AdvertModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace AdvertDeleteAdvert {
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
    namespace AdvertEditAdvert {
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
        export type RequestBody = /* AdvertModelPatch */ Components.Schemas.AdvertModelPatch;
        namespace Responses {
            export type $200 = /* AdvertModel */ Components.Schemas.AdvertModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace AdvertGetAdverts {
        namespace Parameters {
            /**
             * Enabled
             */
            export type Enabled = boolean;
            /**
             * Serverbundle Id
             */
            export type ServerbundleId = string /* uuid */[];
        }
        export interface QueryParameters {
            serverbundle_id?: /* Serverbundle Id */ Parameters.ServerbundleId;
            enabled?: /* Enabled */ Parameters.Enabled;
        }
        namespace Responses {
            /**
             * Response Get Adverts Advert  Get
             */
            export type $200 = /* AdvertModel */ Components.Schemas.AdvertModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace AdvertUpdateOrder {
        /**
         * Ordered List
         */
        export type RequestBody = string /* uuid */[];
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace AuthConfirmAuthRequest {
        namespace Parameters {
            /**
             * Validation Uuid
             */
            export type ValidationUuid = string; // uuid
        }
        export interface PathParameters {
            validation_uuid: /* Validation Uuid */ Parameters.ValidationUuid /* uuid */;
        }
        export type RequestBody = /* AuthRequestModelPatch */ Components.Schemas.AuthRequestModelPatch;
        namespace Responses {
            export type $200 = /* AuthRequestModelNoID */ Components.Schemas.AuthRequestModelNoID;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace AuthCreateAuthRequest {
        export type RequestBody = /* AuthRequestModelAdd */ Components.Schemas.AuthRequestModelAdd;
        namespace Responses {
            export type $200 = /* AuthRequestModel */ Components.Schemas.AuthRequestModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace AuthEditAuthConfig {
        export type RequestBody = /* SocialConfigModelPatch */ Components.Schemas.SocialConfigModelPatch;
        namespace Responses {
            export type $200 = /* SocialConfigModel */ Components.Schemas.SocialConfigModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
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
    namespace AuthGetAuthBackends {
        namespace Responses {
            /**
             * Response Get Auth Backends Auth Social Backends Get
             */
            export type $200 = /* SocialBackendModel */ Components.Schemas.SocialBackendModel[];
        }
    }
    namespace AuthGetAuthConfig {
        namespace Responses {
            export type $200 = /* SocialConfigModel */ Components.Schemas.SocialConfigModel;
        }
    }
    namespace AuthGetAuthRequest {
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
            export type $200 = /* AuthRequestModel */ Components.Schemas.AuthRequestModel;
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
    namespace BanCreateComment {
        export type RequestBody = /* BanCommentModelAdd */ Components.Schemas.BanCommentModelAdd;
        namespace Responses {
            export type $200 = /* CommentModel */ Components.Schemas.CommentModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace BanDeleteBan {
        namespace Parameters {
            /**
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            export type MorphUserId = string; // uuid
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
    namespace BanDeleteComment {
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
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            export type MorphUserId = string; // uuid
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
            morph_user_id?: /**
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            Parameters.MorphUserId /* uuid */;
        }
        export type RequestBody = /* BanModelPatch */ Components.Schemas.BanModelPatch;
        namespace Responses {
            export type $200 = /* BanModel */ Components.Schemas.BanModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace BanGetBan {
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
             * User Id
             */
            export type UserId = string; // uuid
        }
        export interface QueryParameters {
            serverbundle_id?: /* Serverbundle Id */ Parameters.ServerbundleId;
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
    namespace BanGetComments {
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
             * Response Get Comments Ban  Uuid  Comments Get
             */
            export type $200 = /* CommentModel */ Components.Schemas.CommentModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace BanGetConfig {
        namespace Responses {
            export type $200 = /* BanConfigModel */ Components.Schemas.BanConfigModel;
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
            uuid: /**
             * Uuid
             * The UUID of the referenced object.
             */
            Parameters.Uuid;
        }
        namespace Responses {
            /**
             * Response Get Logs Ban  Uuid  Logs Get
             */
            export type $200 = /* LogModel */ Components.Schemas.LogModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace BanUpdateConfig {
        export type RequestBody = /* BanConfigModel */ Components.Schemas.BanConfigModel;
        namespace Responses {
            export type $200 = /* BanConfigModel */ Components.Schemas.BanConfigModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace FaqCreateQuestion {
        export type RequestBody = /* FAQModelAdd */ Components.Schemas.FAQModelAdd;
        namespace Responses {
            export type $200 = /* FAQModel */ Components.Schemas.FAQModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace FaqDeleteQuestion {
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
    namespace FaqEditQuestion {
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
        export type RequestBody = /* FAQModelPatch */ Components.Schemas.FAQModelPatch;
        namespace Responses {
            export type $200 = /* FAQModel */ Components.Schemas.FAQModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace FaqGetFaq {
        namespace Responses {
            /**
             * Response Get Faq Faq  Get
             */
            export type $200 = /* FAQModel */ Components.Schemas.FAQModel[];
        }
    }
    namespace FaqUpdateOrder {
        /**
         * Ordered List
         */
        export type RequestBody = string /* uuid */[];
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace FinanceCreateCreditTransaction {
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
        export type RequestBody = /* TransactionModelAdd */ Components.Schemas.TransactionModelAdd;
        namespace Responses {
            export type $200 = /* TransactionModel */ Components.Schemas.TransactionModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
    namespace FinanceGetTransaction {
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
            export type $200 = /* TransactionModel */ Components.Schemas.TransactionModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumCreatePost {
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
    namespace ForumCreateThread {
        export type RequestBody = /* ThreadModelAdd */ Components.Schemas.ThreadModelAdd;
        namespace Responses {
            export type $200 = /* ThreadModel */ Components.Schemas.ThreadModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumCreateTopic {
        export type RequestBody = /* TopicModelAdd */ Components.Schemas.TopicModelAdd;
        namespace Responses {
            export type $200 = /* TopicModel */ Components.Schemas.TopicModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumCreateTopicCategory {
        export type RequestBody = /* TopicCategoryModelAdd */ Components.Schemas.TopicCategoryModelAdd;
        namespace Responses {
            export type $200 = /* TopicCategoryModel */ Components.Schemas.TopicCategoryModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumDeletePost {
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
            export type $200 = /* SuccessModel */ Components.Schemas.DepsVyhubCommonApiHelpersSuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumDeleteThread {
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
            export type $200 = /* SuccessModel */ Components.Schemas.DepsVyhubCommonApiHelpersSuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumDeleteTopic {
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
            export type $200 = /* SuccessModel */ Components.Schemas.DepsVyhubCommonApiHelpersSuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumDeleteTopicCategory {
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
            export type $200 = /* SuccessModel */ Components.Schemas.DepsVyhubCommonApiHelpersSuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumEditPost {
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
        export type RequestBody = /* PostModelPatch */ Components.Schemas.PostModelPatch;
        namespace Responses {
            export type $200 = /* PostModel */ Components.Schemas.PostModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumEditThread {
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
        export type RequestBody = /* ThreadModelPatch */ Components.Schemas.ThreadModelPatch;
        namespace Responses {
            export type $200 = /* ThreadModel */ Components.Schemas.ThreadModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumEditTopic {
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
        export type RequestBody = /* TopicModelPatch */ Components.Schemas.TopicModelPatch;
        namespace Responses {
            export type $200 = /* TopicModel */ Components.Schemas.TopicModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumEditTopicCategory {
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
        export type RequestBody = /* TopicCategoryModelPatch */ Components.Schemas.TopicCategoryModelPatch;
        namespace Responses {
            export type $200 = /* TopicCategoryModel */ Components.Schemas.TopicCategoryModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumGetPosts {
        namespace Parameters {
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
            page?: /* Page */ Parameters.Page;
            size?: /* Size */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Page[PostModelWithThread] */ Components.Schemas.PagePostModelWithThread;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumGetThread {
        namespace Parameters {
            /**
             * Uuid
             */
            export type Uuid = string; // uuid
        }
        export interface PathParameters {
            uuid: /* Uuid */ Parameters.Uuid /* uuid */;
        }
        namespace Responses {
            export type $200 = /* ThreadModel */ Components.Schemas.ThreadModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumGetThreadPosts {
        namespace Parameters {
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
            page?: /* Page */ Parameters.Page;
            size?: /* Size */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Page[PostModel] */ Components.Schemas.PagePostModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumGetThreads {
        namespace Parameters {
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
            page?: /* Page */ Parameters.Page;
            size?: /* Size */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Page[ThreadModel] */ Components.Schemas.PageThreadModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
            show_closed?: /* Show Closed */ Parameters.ShowClosed;
            page?: /* Page */ Parameters.Page;
            size?: /* Size */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Page[ThreadModel] */ Components.Schemas.PageThreadModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumGetTopic {
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
            export type $200 = /* TopicModel */ Components.Schemas.TopicModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumGetTopicCategories {
        namespace Responses {
            /**
             * Response Get Topic Categories Forum Topic Category Get
             */
            export type $200 = /* TopicCategoryModel */ Components.Schemas.TopicCategoryModel[];
        }
    }
    namespace ForumGetTopicThreads {
        namespace Parameters {
            /**
             * Hide Closed
             */
            export type HideClosed = boolean;
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
            sort_by?: /* Sort By */ Parameters.SortBy;
            sort_desc?: /* Sort Desc */ Parameters.SortDesc;
            query?: /* Query */ Parameters.Query;
            hide_closed?: /* Hide Closed */ Parameters.HideClosed;
            page?: /* Page */ Parameters.Page;
            size?: /* Size */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Page[ThreadModel] */ Components.Schemas.PageThreadModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumGetTopics {
        namespace Responses {
            /**
             * Response Get Topics Forum Topic Get
             */
            export type $200 = /* TopicModel */ Components.Schemas.TopicModel[];
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
    namespace ForumUpdateTopicCategoryOrder {
        /**
         * Ordered List
         */
        export type RequestBody = string /* uuid */[];
        namespace Responses {
            export type $200 = /* SuccessModel */ Components.Schemas.DepsVyhubCommonApiHelpersSuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ForumUpdateTopicOrder {
        /**
         * Ordered List
         */
        export type RequestBody = string /* uuid */[];
        namespace Responses {
            export type $200 = /* SuccessModel */ Components.Schemas.DepsVyhubCommonApiHelpersSuccessModel;
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
        export type RequestBody = /* CmsPageModelAdd */ Components.Schemas.CmsPageModelAdd;
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
            export type $200 = /* SuccessModel */ Components.Schemas.ApiV1HelpersSuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GeneralEditCmsHtml {
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
        export type RequestBody = /* CmsPageModelPatch */ Components.Schemas.CmsPageModelPatch;
        namespace Responses {
            export type $200 = /* CmsPageModel */ Components.Schemas.CmsPageModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GeneralEditConfig {
        export type RequestBody = /* GeneralConfigModelPatch */ Components.Schemas.GeneralConfigModelPatch;
        namespace Responses {
            export type $200 = /* GeneralConfigModel */ Components.Schemas.GeneralConfigModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GeneralEditHtmlMetaTags {
        export type RequestBody = /* HtmlMetaModel */ Components.Schemas.HtmlMetaModel;
        namespace Responses {
            export type $200 = /* HtmlMetaModel */ Components.Schemas.HtmlMetaModel;
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
        export type RequestBody = /* ThemeConfigModel */ Components.Schemas.ThemeConfigModel;
        namespace Responses {
            export type $200 = /* ThemeConfigModel */ Components.Schemas.ThemeConfigModel;
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
            export type $200 = /* CmsPageModel */ Components.Schemas.CmsPageModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace GeneralGetCmsPages {
        namespace Responses {
            /**
             * Response Get Cms Pages General Html Get
             */
            export type $200 = /* CmsPageModelShort */ Components.Schemas.CmsPageModelShort[];
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
    namespace GeneralGetHtmlMetaTags {
        namespace Responses {
            export type $200 = /* HtmlMetaModel */ Components.Schemas.HtmlMetaModel;
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
            export type $200 = /* ThemeConfigModel */ Components.Schemas.ThemeConfigModel;
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
            export type $200 = {
                [name: string]: /* PropertyModelShortWithDescription */ Components.Schemas.PropertyModelShortWithDescription[];
            }[];
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
            export type $200 = /**
             * LogCategory
             * An enumeration.
             */
            Components.Schemas.LogCategory[];
        }
    }
    namespace LogGetLabels {
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
             * Response Get Labels Log Labels Get
             */
            export interface $200 {
                [name: string]: string[];
            }
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace LogGetLog {
        namespace Parameters {
            /**
             * End
             */
            export type End = string; // date-time
            /**
             * Limit
             */
            export type Limit = number;
            /**
             * Query
             */
            export type Query = string;
            /**
             * Search
             */
            export type Search = string;
            /**
             * Start
             */
            export type Start = string; // date-time
        }
        export interface QueryParameters {
            start: /* Start */ Parameters.Start /* date-time */;
            end: /* End */ Parameters.End /* date-time */;
            query?: /* Query */ Parameters.Query;
            limit?: /* Limit */ Parameters.Limit;
            search?: /* Search */ Parameters.Search;
        }
        namespace Responses {
            /**
             * Response Get Log Log  Get
             */
            export type $200 = /* LogModel */ Components.Schemas.LogModel[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace NavigationCreateNavigationLink {
        export type RequestBody = /* NavigationLinkModelAdd */ Components.Schemas.NavigationLinkModelAdd;
        namespace Responses {
            export type $200 = /* NavigationLinkModel */ Components.Schemas.NavigationLinkModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace NavigationDeleteNavigationLink {
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
    namespace NavigationEditNavigationLink {
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
        export type RequestBody = /* NavigationLinkModelPatch */ Components.Schemas.NavigationLinkModelPatch;
        namespace Responses {
            export type $200 = /* NavigationLinkModel */ Components.Schemas.NavigationLinkModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace NavigationGetNavigationLinks {
        namespace Responses {
            /**
             * Response Get Navigation Links Navigation  Get
             */
            export type $200 = /* NavigationLinkModel */ Components.Schemas.NavigationLinkModel[];
        }
    }
    namespace NavigationUpdateOrder {
        /**
         * Ordered List
         */
        export type RequestBody = string /* uuid */[];
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace NewsAddMessage {
        export type RequestBody = /* NewsModelAdd */ Components.Schemas.NewsModelAdd;
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
    namespace NotificationGetNotification {
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
            export type $200 = /* NotificationEntryModel */ Components.Schemas.NotificationEntryModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
    namespace PacketAddAppliedReward {
        export type RequestBody = /* AppliedRewardModelAdd */ Components.Schemas.AppliedRewardModelAdd;
        namespace Responses {
            export type $200 = /* AppliedRewardModel */ Components.Schemas.AppliedRewardModel;
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
            export type $200 = /* SuccessModel */ Components.Schemas.ApiV1HelpersSuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace PacketDeleteAppliedReward {
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
            export type $200 = /* SuccessModel */ Components.Schemas.ApiV1HelpersSuccessModel;
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
            export type $200 = /* SuccessModel */ Components.Schemas.ApiV1HelpersSuccessModel;
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
            export type $200 = /* SuccessModel */ Components.Schemas.ApiV1HelpersSuccessModel;
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
            export type $200 = /* SuccessModel */ Components.Schemas.ApiV1HelpersSuccessModel;
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
             * Applied Packet Id
             * Filter by Applied Packets
             */
            export type AppliedPacketId = string /* uuid */[];
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
            applied_packet_id?: /**
             * Applied Packet Id
             * Filter by Applied Packets
             */
            Parameters.AppliedPacketId;
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
    namespace PacketGetSubcategories {
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
             * Response Get Subcategories Packet Category  Uuid  Subcategory Get
             */
            export type $200 = string[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace PacketUpdateOrder {
        /**
         * Ordered List
         */
        export type RequestBody = string /* uuid */[];
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace RedirectGet {
        namespace Responses {
            export type $200 = any;
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
    namespace ServerCreateServer {
        export type RequestBody = /* ServerModelAdd */ Components.Schemas.ServerModelAdd;
        namespace Responses {
            export type $200 = /* ServerModel */ Components.Schemas.ServerModel;
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
            export type $200 = /* SuccessModel */ Components.Schemas.ApiV1HelpersSuccessModel;
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
            export type $200 = /* SuccessModel */ Components.Schemas.ApiV1HelpersSuccessModel;
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
        export type RequestBody = /* ServerbundleModelPatch */ Components.Schemas.ServerbundleModelPatch;
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
            export type $200 = /* ServerModel */ Components.Schemas.ServerModel;
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
    namespace ServerGetServerTypeToUserType {
        namespace Responses {
            export interface $200 {
                [name: string]: /**
                 * UserType
                 * An enumeration.
                 */
                Components.Schemas.UserType;
            }
        }
    }
    namespace ServerGetServerTypes {
        namespace Responses {
            /**
             * Response Get Server Types Server Type Get
             */
            export type $200 = string[];
        }
    }
    namespace ServerGetServerUserActivity {
        namespace Parameters {
            /**
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            export type MorphUserId = string; // uuid
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
            morph_user_id?: /**
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            Parameters.MorphUserId /* uuid */;
        }
        namespace Responses {
            /**
             * Response Get Server User Activity Server  Uuid  User Activity Get
             */
            export type $200 = /* UserModelActivity */ Components.Schemas.UserModelActivity[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
    namespace ServerUpdateBundleOrder {
        /**
         * Ordered List
         */
        export type RequestBody = string /* uuid */[];
        namespace Responses {
            export type $200 = any;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopAddCouponCodes {
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
        export type RequestBody = /* CouponAddModel */ Components.Schemas.CouponAddModel;
        namespace Responses {
            export type $200 = /* DebitModel */ Components.Schemas.DebitModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopAddPacketToCart {
        export type RequestBody = /* CartPacketModelAdd */ Components.Schemas.CartPacketModelAdd;
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
            export type $200 = /* SuccessModel */ Components.Schemas.ApiV1HelpersSuccessModel;
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
    namespace ShopConfirmCouponDebit {
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
            export type $200 = /* SuccessModel */ Components.Schemas.ApiV1HelpersSuccessModel;
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
            export type $200 = /* SuccessModel */ Components.Schemas.ApiV1HelpersSuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopDeletePurchase {
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
            export type $200 = /* SuccessModel */ Components.Schemas.DepsVyhubCommonApiHelpersSuccessModel;
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
            export type $200 = /* SuccessModel */ Components.Schemas.ApiV1HelpersSuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopEditCartPacket {
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
        export type RequestBody = /* CartPacketModelPatch */ Components.Schemas.CartPacketModelPatch;
        namespace Responses {
            export type $200 = /* CartPacketModel */ Components.Schemas.CartPacketModel;
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
             * Response Get Currencies Shop Purchase Currency Get
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
    namespace ShopGetDebitInvoices {
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
             * Response Get Debit Statistic Shop Statistic Debit Get
             */
            export type $200 = /* DebitModelStatistic */ Components.Schemas.DebitModelStatistic[];
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopGetDebits {
        namespace Parameters {
            /**
             * Has Coupon Data
             * Return only debits with entered coupons
             */
            export type HasCouponData = boolean;
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
             * Status
             */
            export type Status = string[];
        }
        export interface QueryParameters {
            query?: /* Query */ Parameters.Query;
            sort_by?: /* Sort By */ Parameters.SortBy;
            sort_desc?: /* Sort Desc */ Parameters.SortDesc;
            has_coupon_data?: /**
             * Has Coupon Data
             * Return only debits with entered coupons
             */
            Parameters.HasCouponData;
            status?: /* Status */ Parameters.Status;
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
            export type $200 = /* DiscountModelWithUsages */ Components.Schemas.DiscountModelWithUsages[];
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
             * Response Get Report Shop Statistic Report Get
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
             * Response Get Tax Rules Shop Tax  Get
             */
            export type $200 = /* TaxModel */ Components.Schemas.TaxModel[];
        }
    }
    namespace ShopGetTopDonators {
        namespace Responses {
            export type $200 = /* TopDonatorModelWithCurrency */ Components.Schemas.TopDonatorModelWithCurrency;
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
            export type $200 = /* SuccessModel */ Components.Schemas.ApiV1HelpersSuccessModel;
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
            export type $200 = /* SuccessModel */ Components.Schemas.ApiV1HelpersSuccessModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace ShopRemovePacketsFromCart {
        namespace Responses {
            export type $200 = /* SuccessModel */ Components.Schemas.ApiV1HelpersSuccessModel;
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
        export type RequestBody = /* Body_start_payment_shop_checkout__post */ Components.Schemas.BodyStartPaymentShopCheckoutPost;
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
            export type $200 = /* SuccessModel */ Components.Schemas.ApiV1HelpersSuccessModel;
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
            export type $200 = /* SuccessModel */ Components.Schemas.ApiV1HelpersSuccessModel;
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
             * Serverbundle Id
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
            serverbundle_id?: /* Serverbundle Id */ Parameters.ServerbundleId /* uuid */;
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
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            export type MorphUserId = string; // uuid
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
    namespace UserEndMembershipByGroup {
        namespace Parameters {
            /**
             * Group Id
             */
            export type GroupId = string; // uuid
            /**
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            export type MorphUserId = string; // uuid
            /**
             * Serverbundle Id
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
            group_id: /* Group Id */ Parameters.GroupId /* uuid */;
            serverbundle_id?: /* Serverbundle Id */ Parameters.ServerbundleId /* uuid */;
            morph_user_id?: /**
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            Parameters.MorphUserId /* uuid */;
        }
        namespace Responses {
            export type $200 = /* SuccessModel */ Components.Schemas.ApiV1HelpersSuccessModel;
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
    namespace UserGetAttributes {
        namespace Parameters {
            /**
             * Begin
             */
            export type Begin = string; // date-time
            /**
             * Definition Id
             */
            export type DefinitionId = string /* uuid */[];
            /**
             * End
             */
            export type End = string; // date-time
            /**
             * Page
             */
            export type Page = number;
            /**
             * Serverbundle Id
             */
            export type ServerbundleId = string /* uuid */[];
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
            uuid: /**
             * Uuid
             * The UUID or username of the referenced user.
             */
            Parameters.Uuid;
        }
        export interface QueryParameters {
            serverbundle_id?: /* Serverbundle Id */ Parameters.ServerbundleId;
            definition_id?: /* Definition Id */ Parameters.DefinitionId;
            begin?: /* Begin */ Parameters.Begin /* date-time */;
            end?: /* End */ Parameters.End /* date-time */;
            page?: /* Page */ Parameters.Page;
            size?: /* Size */ Parameters.Size;
        }
        namespace Responses {
            export type $200 = /* Page[UserAttributeModel] */ Components.Schemas.PageUserAttributeModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace UserGetCurrentAttributes {
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
             * Response Get Current Attributes User  Uuid  Attribute Current Get
             */
            export interface $200 {
                [name: string]: string;
            }
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
             * Serverbundle Id
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
            serverbundle_id?: /* Serverbundle Id */ Parameters.ServerbundleId /* uuid */;
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
    namespace UserGetUser {
        namespace Parameters {
            /**
             * Identifier
             * UUID or other identifier
             */
            export type Identifier = string;
            /**
             * UserType
             * If searching a user by its identifier, search users of this type.
             */
            export type Type = "CENTRAL" | "STEAM" | "DISCORD" | "MINECRAFT" | "TEAMSPEAK3";
        }
        export interface PathParameters {
            identifier: /**
             * Identifier
             * UUID or other identifier
             */
            Parameters.Identifier;
        }
        export interface QueryParameters {
            type?: /**
             * UserType
             * If searching a user by its identifier, search users of this type.
             */
            Parameters.Type;
        }
        namespace Responses {
            export type $200 = /* UserModel */ Components.Schemas.UserModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            export type MorphUserId = string; // uuid
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
    namespace WarningGetConfig {
        namespace Responses {
            export type $200 = /* WarningConfigModel */ Components.Schemas.WarningConfigModel;
        }
    }
    namespace WarningGetWarning {
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
            export type $200 = /* WarningModel */ Components.Schemas.WarningModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
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
             * Morph User Id
             * Morph system user into given user. Requires user_morph property.
             */
            export type MorphUserId = string; // uuid
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
    namespace WarningUpdateConfig {
        export type RequestBody = /* WarningConfigModel */ Components.Schemas.WarningConfigModel;
        namespace Responses {
            export type $200 = /* WarningConfigModel */ Components.Schemas.WarningConfigModel;
            export type $422 = /* HTTPValidationError */ Components.Schemas.HTTPValidationError;
        }
    }
    namespace WebhookPaypalEvent {
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
        /**
         * Event Data
         */
        export interface RequestBody {
        }
        namespace Responses {
            export type $200 = any;
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
             * Pw
             */
            export type Pw = string;
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
        export interface QueryParameters {
            pw?: /* Pw */ Parameters.Pw;
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
   * auth_getAuthConfig - Get Auth Config
   */
  'auth_getAuthConfig'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthGetAuthConfig.Responses.$200>
  /**
   * auth_editAuthConfig - Edit Auth Config
   */
  'auth_editAuthConfig'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthEditAuthConfig.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthEditAuthConfig.Responses.$200>
  /**
   * auth_getAuthBackends - Get Auth Backends
   */
  'auth_getAuthBackends'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthGetAuthBackends.Responses.$200>
  /**
   * auth_createAuthRequest - Create Auth Request
   * 
   * Create a VyHub auth request that can be confirmed by a gameserver.
   */
  'auth_createAuthRequest'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AuthCreateAuthRequest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthCreateAuthRequest.Responses.$200>
  /**
   * auth_getAuthRequest - Get Auth Request
   * 
   * Check status of VyHub auth request.
   */
  'auth_getAuthRequest'(
    parameters?: Parameters<Paths.AuthGetAuthRequest.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthGetAuthRequest.Responses.$200>
  /**
   * auth_confirmAuthRequest - Confirm Auth Request
   * 
   * Confirm VyHub auth request using the validation uuid
   */
  'auth_confirmAuthRequest'(
    parameters?: Parameters<Paths.AuthConfirmAuthRequest.PathParameters> | null,
    data?: Paths.AuthConfirmAuthRequest.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AuthConfirmAuthRequest.Responses.$200>
  /**
   * general_getCmsPages - Get Cms Pages
   */
  'general_getCmsPages'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralGetCmsPages.Responses.$200>
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
   * general_editCmsHtml - Edit Cms Html
   */
  'general_editCmsHtml'(
    parameters?: Parameters<Paths.GeneralEditCmsHtml.PathParameters> | null,
    data?: Paths.GeneralEditCmsHtml.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralEditCmsHtml.Responses.$200>
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
   * general_getHtmlMetaTags - Get Html Meta Tags
   */
  'general_getHtmlMetaTags'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralGetHtmlMetaTags.Responses.$200>
  /**
   * general_editHtmlMetaTags - Edit Html Meta Tags
   */
  'general_editHtmlMetaTags'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.GeneralEditHtmlMetaTags.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GeneralEditHtmlMetaTags.Responses.$200>
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
   * user_getCurrentUser - Get Current User
   */
  'user_getCurrentUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetCurrentUser.Responses.$200>
  /**
   * user_getUser - Get User
   */
  'user_getUser'(
    parameters?: Parameters<Paths.UserGetUser.PathParameters & Paths.UserGetUser.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetUser.Responses.$200>
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
   * user_getCurrentAttributes - Get Current Attributes
   * 
   * Return a mapping of the current attributes of a user.
   */
  'user_getCurrentAttributes'(
    parameters?: Parameters<Paths.UserGetCurrentAttributes.PathParameters & Paths.UserGetCurrentAttributes.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetCurrentAttributes.Responses.$200>
  /**
   * user_getAttributeHistory - Get Attribute History
   */
  'user_getAttributeHistory'(
    parameters?: Parameters<Paths.UserGetAttributeHistory.PathParameters & Paths.UserGetAttributeHistory.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetAttributeHistory.Responses.$200>
  /**
   * user_getAttributes - Get Attributes
   */
  'user_getAttributes'(
    parameters?: Parameters<Paths.UserGetAttributes.PathParameters & Paths.UserGetAttributes.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserGetAttributes.Responses.$200>
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
    parameters?: Parameters<Paths.UserGetMemberships.PathParameters & Paths.UserGetMemberships.QueryParameters> | null,
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
   * user_endMembershipByGroup - End Membership By Group
   */
  'user_endMembershipByGroup'(
    parameters?: Parameters<Paths.UserEndMembershipByGroup.PathParameters & Paths.UserEndMembershipByGroup.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UserEndMembershipByGroup.Responses.$200>
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
    parameters?: Parameters<Paths.UserEndMembership.PathParameters & Paths.UserEndMembership.QueryParameters> | null,
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
   * server_updateBundleOrder - Update Bundle Order
   */
  'server_updateBundleOrder'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ServerUpdateBundleOrder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerUpdateBundleOrder.Responses.$200>
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
   * server_getServerTypes - Get Server Types
   */
  'server_getServerTypes'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetServerTypes.Responses.$200>
  /**
   * server_getServerTypeToUserType - Get Server Type To User Type
   */
  'server_getServerTypeToUserType'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetServerTypeToUserType.Responses.$200>
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
   * server_getServerUserActivity - Get Server User Activity
   * 
   * Returns online users (within last 3 minutes) with their (global) bans, (global) warnings and groups within the bundle of the server
   * :param server:
   * :param allowed_bundles_ban:
   * :param allowed_bundles_warn:
   * :param c_user:
   * :return:
   */
  'server_getServerUserActivity'(
    parameters?: Parameters<Paths.ServerGetServerUserActivity.PathParameters & Paths.ServerGetServerUserActivity.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ServerGetServerUserActivity.Responses.$200>
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
   * ban_getConfig - Get Config
   */
  'ban_getConfig'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanGetConfig.Responses.$200>
  /**
   * ban_updateConfig - Update Config
   */
  'ban_updateConfig'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.BanUpdateConfig.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanUpdateConfig.Responses.$200>
  /**
   * ban_getBan - Get Ban
   */
  'ban_getBan'(
    parameters?: Parameters<Paths.BanGetBan.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanGetBan.Responses.$200>
  /**
   * ban_editBan - Edit Ban
   */
  'ban_editBan'(
    parameters?: Parameters<Paths.BanEditBan.PathParameters & Paths.BanEditBan.QueryParameters> | null,
    data?: Paths.BanEditBan.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanEditBan.Responses.$200>
  /**
   * ban_deleteBan - Delete Ban
   */
  'ban_deleteBan'(
    parameters?: Parameters<Paths.BanDeleteBan.PathParameters & Paths.BanDeleteBan.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanDeleteBan.Responses.$200>
  /**
   * ban_getLogs - Get Logs
   */
  'ban_getLogs'(
    parameters?: Parameters<Paths.BanGetLogs.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanGetLogs.Responses.$200>
  /**
   * ban_getComments - Get Comments
   */
  'ban_getComments'(
    parameters?: Parameters<Paths.BanGetComments.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanGetComments.Responses.$200>
  /**
   * ban_createComment - Create Comment
   */
  'ban_createComment'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.BanCreateComment.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanCreateComment.Responses.$200>
  /**
   * ban_deleteComment - Delete Comment
   */
  'ban_deleteComment'(
    parameters?: Parameters<Paths.BanDeleteComment.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.BanDeleteComment.Responses.$200>
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
    parameters?: Parameters<Paths.WarningToggleWarningStatus.PathParameters & Paths.WarningToggleWarningStatus.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WarningToggleWarningStatus.Responses.$200>
  /**
   * warning_getWarning - Get Warning
   */
  'warning_getWarning'(
    parameters?: Parameters<Paths.WarningGetWarning.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WarningGetWarning.Responses.$200>
  /**
   * warning_deleteWarning - Delete Warning
   */
  'warning_deleteWarning'(
    parameters?: Parameters<Paths.WarningDeleteWarning.PathParameters & Paths.WarningDeleteWarning.QueryParameters> | null,
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
   * shop_getDebitInvoice - Get Debit Invoice
   */
  'shop_getDebitInvoice'(
    parameters?: Parameters<Paths.ShopGetDebitInvoice.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetDebitInvoice.Responses.$200>
  /**
   * shop_getDebitInvoices - Get Debit Invoices
   */
  'shop_getDebitInvoices'(
    parameters?: Parameters<Paths.ShopGetDebitInvoices.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetDebitInvoices.Responses.$200>
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
   * shop_addCouponCodes - Add Coupon Codes
   * 
   * Save user entered coupons to the specified debit
   */
  'shop_addCouponCodes'(
    parameters?: Parameters<Paths.ShopAddCouponCodes.PathParameters> | null,
    data?: Paths.ShopAddCouponCodes.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopAddCouponCodes.Responses.$200>
  /**
   * shop_confirmCouponDebit - Confirm Coupon Debit
   * 
   * Confirm coupon debit.
   */
  'shop_confirmCouponDebit'(
    parameters?: Parameters<Paths.ShopConfirmCouponDebit.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopConfirmCouponDebit.Responses.$200>
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
   * shop_editCartPacket - Edit Cart Packet
   */
  'shop_editCartPacket'(
    parameters?: Parameters<Paths.ShopEditCartPacket.PathParameters> | null,
    data?: Paths.ShopEditCartPacket.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopEditCartPacket.Responses.$200>
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
   * shop_deletePurchase - Delete Purchase
   */
  'shop_deletePurchase'(
    parameters?: Parameters<Paths.ShopDeletePurchase.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopDeletePurchase.Responses.$200>
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
   * shop_getDebitStatistic - Get Debit Statistic
   */
  'shop_getDebitStatistic'(
    parameters?: Parameters<Paths.ShopGetDebitStatistic.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetDebitStatistic.Responses.$200>
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
   * shop_getTopDonators - Get Top Donators
   */
  'shop_getTopDonators'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ShopGetTopDonators.Responses.$200>
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
   * packet_addAppliedReward - Add Applied Reward
   */
  'packet_addAppliedReward'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PacketAddAppliedReward.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketAddAppliedReward.Responses.$200>
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
   * packet_deleteAppliedReward - Delete Applied Reward
   */
  'packet_deleteAppliedReward'(
    parameters?: Parameters<Paths.PacketDeleteAppliedReward.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketDeleteAppliedReward.Responses.$200>
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
   * packet_getSubcategories - Get Subcategories
   */
  'packet_getSubcategories'(
    parameters?: Parameters<Paths.PacketGetSubcategories.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketGetSubcategories.Responses.$200>
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
   * packet_updateOrder - Update Order
   */
  'packet_updateOrder'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.PacketUpdateOrder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PacketUpdateOrder.Responses.$200>
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
   * finance_getTransaction - Get Transaction
   */
  'finance_getTransaction'(
    parameters?: Parameters<Paths.FinanceGetTransaction.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FinanceGetTransaction.Responses.$200>
  /**
   * finance_createCreditTransaction - Create Credit Transaction
   */
  'finance_createCreditTransaction'(
    parameters?: Parameters<Paths.FinanceCreateCreditTransaction.PathParameters> | null,
    data?: Paths.FinanceCreateCreditTransaction.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FinanceCreateCreditTransaction.Responses.$200>
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
   * notification_getNotification - Get Notification
   */
  'notification_getNotification'(
    parameters?: Parameters<Paths.NotificationGetNotification.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NotificationGetNotification.Responses.$200>
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
   * log_getLabels - Get Labels
   */
  'log_getLabels'(
    parameters?: Parameters<Paths.LogGetLabels.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.LogGetLabels.Responses.$200>
  /**
   * webhook_paypalEvent - Paypal Event
   */
  'webhook_paypalEvent'(
    parameters?: Parameters<Paths.WebhookPaypalEvent.PathParameters> | null,
    data?: Paths.WebhookPaypalEvent.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WebhookPaypalEvent.Responses.$200>
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
    parameters?: Parameters<Paths.WebhookPaysafecardNotification.PathParameters & Paths.WebhookPaysafecardNotification.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.WebhookPaysafecardNotification.Responses.$200>
  /**
   * forum_getTopics - Get Topics
   */
  'forum_getTopics'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumGetTopics.Responses.$200>
  /**
   * forum_createTopic - Create Topic
   */
  'forum_createTopic'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ForumCreateTopic.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumCreateTopic.Responses.$200>
  /**
   * forum_getTopic - Get Topic
   */
  'forum_getTopic'(
    parameters?: Parameters<Paths.ForumGetTopic.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumGetTopic.Responses.$200>
  /**
   * forum_editTopic - Edit Topic
   */
  'forum_editTopic'(
    parameters?: Parameters<Paths.ForumEditTopic.PathParameters> | null,
    data?: Paths.ForumEditTopic.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumEditTopic.Responses.$200>
  /**
   * forum_deleteTopic - Delete Topic
   */
  'forum_deleteTopic'(
    parameters?: Parameters<Paths.ForumDeleteTopic.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumDeleteTopic.Responses.$200>
  /**
   * forum_updateTopicOrder - Update Topic Order
   */
  'forum_updateTopicOrder'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ForumUpdateTopicOrder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumUpdateTopicOrder.Responses.$200>
  /**
   * forum_getTopicCategories - Get Topic Categories
   */
  'forum_getTopicCategories'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumGetTopicCategories.Responses.$200>
  /**
   * forum_createTopicCategory - Create Topic Category
   */
  'forum_createTopicCategory'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ForumCreateTopicCategory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumCreateTopicCategory.Responses.$200>
  /**
   * forum_editTopicCategory - Edit Topic Category
   */
  'forum_editTopicCategory'(
    parameters?: Parameters<Paths.ForumEditTopicCategory.PathParameters> | null,
    data?: Paths.ForumEditTopicCategory.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumEditTopicCategory.Responses.$200>
  /**
   * forum_deleteTopicCategory - Delete Topic Category
   */
  'forum_deleteTopicCategory'(
    parameters?: Parameters<Paths.ForumDeleteTopicCategory.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumDeleteTopicCategory.Responses.$200>
  /**
   * forum_updateTopicCategoryOrder - Update Topic Category Order
   */
  'forum_updateTopicCategoryOrder'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ForumUpdateTopicCategoryOrder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumUpdateTopicCategoryOrder.Responses.$200>
  /**
   * forum_getTopicThreads - Get Topic Threads
   */
  'forum_getTopicThreads'(
    parameters?: Parameters<Paths.ForumGetTopicThreads.PathParameters & Paths.ForumGetTopicThreads.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumGetTopicThreads.Responses.$200>
  /**
   * forum_getThreads - Get Threads
   */
  'forum_getThreads'(
    parameters?: Parameters<Paths.ForumGetThreads.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumGetThreads.Responses.$200>
  /**
   * forum_createThread - Create Thread
   */
  'forum_createThread'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ForumCreateThread.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumCreateThread.Responses.$200>
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
   * forum_editThread - Edit Thread
   */
  'forum_editThread'(
    parameters?: Parameters<Paths.ForumEditThread.PathParameters> | null,
    data?: Paths.ForumEditThread.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumEditThread.Responses.$200>
  /**
   * forum_deleteThread - Delete Thread
   */
  'forum_deleteThread'(
    parameters?: Parameters<Paths.ForumDeleteThread.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumDeleteThread.Responses.$200>
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
    parameters?: Parameters<Paths.ForumGetThreadPosts.PathParameters & Paths.ForumGetThreadPosts.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumGetThreadPosts.Responses.$200>
  /**
   * forum_createPost - Create Post
   */
  'forum_createPost'(
    parameters?: Parameters<Paths.ForumCreatePost.PathParameters> | null,
    data?: Paths.ForumCreatePost.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumCreatePost.Responses.$200>
  /**
   * forum_editPost - Edit Post
   */
  'forum_editPost'(
    parameters?: Parameters<Paths.ForumEditPost.PathParameters> | null,
    data?: Paths.ForumEditPost.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumEditPost.Responses.$200>
  /**
   * forum_deletePost - Delete Post
   */
  'forum_deletePost'(
    parameters?: Parameters<Paths.ForumDeletePost.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumDeletePost.Responses.$200>
  /**
   * forum_getPosts - Get Posts
   */
  'forum_getPosts'(
    parameters?: Parameters<Paths.ForumGetPosts.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ForumGetPosts.Responses.$200>
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
  /**
   * faq_getFaq - Get Faq
   */
  'faq_getFaq'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FaqGetFaq.Responses.$200>
  /**
   * faq_createQuestion - Create Question
   */
  'faq_createQuestion'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.FaqCreateQuestion.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FaqCreateQuestion.Responses.$200>
  /**
   * faq_editQuestion - Edit Question
   */
  'faq_editQuestion'(
    parameters?: Parameters<Paths.FaqEditQuestion.PathParameters> | null,
    data?: Paths.FaqEditQuestion.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FaqEditQuestion.Responses.$200>
  /**
   * faq_deleteQuestion - Delete Question
   */
  'faq_deleteQuestion'(
    parameters?: Parameters<Paths.FaqDeleteQuestion.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FaqDeleteQuestion.Responses.$200>
  /**
   * faq_updateOrder - Update Order
   */
  'faq_updateOrder'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.FaqUpdateOrder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FaqUpdateOrder.Responses.$200>
  /**
   * advert_getAdverts - Get Adverts
   */
  'advert_getAdverts'(
    parameters?: Parameters<Paths.AdvertGetAdverts.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdvertGetAdverts.Responses.$200>
  /**
   * advert_createAdvert - Create Advert
   */
  'advert_createAdvert'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AdvertCreateAdvert.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdvertCreateAdvert.Responses.$200>
  /**
   * advert_editAdvert - Edit Advert
   */
  'advert_editAdvert'(
    parameters?: Parameters<Paths.AdvertEditAdvert.PathParameters> | null,
    data?: Paths.AdvertEditAdvert.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdvertEditAdvert.Responses.$200>
  /**
   * advert_deleteAdvert - Delete Advert
   */
  'advert_deleteAdvert'(
    parameters?: Parameters<Paths.AdvertDeleteAdvert.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdvertDeleteAdvert.Responses.$200>
  /**
   * advert_updateOrder - Update Order
   */
  'advert_updateOrder'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.AdvertUpdateOrder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.AdvertUpdateOrder.Responses.$200>
  /**
   * navigation_getNavigationLinks - Get Navigation Links
   */
  'navigation_getNavigationLinks'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NavigationGetNavigationLinks.Responses.$200>
  /**
   * navigation_createNavigationLink - Create Navigation Link
   */
  'navigation_createNavigationLink'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.NavigationCreateNavigationLink.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NavigationCreateNavigationLink.Responses.$200>
  /**
   * navigation_editNavigationLink - Edit Navigation Link
   */
  'navigation_editNavigationLink'(
    parameters?: Parameters<Paths.NavigationEditNavigationLink.PathParameters> | null,
    data?: Paths.NavigationEditNavigationLink.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NavigationEditNavigationLink.Responses.$200>
  /**
   * navigation_deleteNavigationLink - Delete Navigation Link
   */
  'navigation_deleteNavigationLink'(
    parameters?: Parameters<Paths.NavigationDeleteNavigationLink.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NavigationDeleteNavigationLink.Responses.$200>
  /**
   * navigation_updateOrder - Update Order
   */
  'navigation_updateOrder'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.NavigationUpdateOrder.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.NavigationUpdateOrder.Responses.$200>
  /**
   * redirect__get - Redirect
   */
  'redirect__get'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RedirectGet.Responses.$200>
}

export interface PathsDictionary {
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
  ['/auth/social/config']: {
    /**
     * auth_getAuthConfig - Get Auth Config
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthGetAuthConfig.Responses.$200>
    /**
     * auth_editAuthConfig - Edit Auth Config
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthEditAuthConfig.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthEditAuthConfig.Responses.$200>
  }
  ['/auth/social/backends']: {
    /**
     * auth_getAuthBackends - Get Auth Backends
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthGetAuthBackends.Responses.$200>
  }
  ['/auth/request/']: {
    /**
     * auth_createAuthRequest - Create Auth Request
     * 
     * Create a VyHub auth request that can be confirmed by a gameserver.
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AuthCreateAuthRequest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthCreateAuthRequest.Responses.$200>
  }
  ['/auth/request/{uuid}']: {
    /**
     * auth_getAuthRequest - Get Auth Request
     * 
     * Check status of VyHub auth request.
     */
    'get'(
      parameters?: Parameters<Paths.AuthGetAuthRequest.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthGetAuthRequest.Responses.$200>
  }
  ['/auth/request/{validation_uuid}']: {
    /**
     * auth_confirmAuthRequest - Confirm Auth Request
     * 
     * Confirm VyHub auth request using the validation uuid
     */
    'patch'(
      parameters?: Parameters<Paths.AuthConfirmAuthRequest.PathParameters> | null,
      data?: Paths.AuthConfirmAuthRequest.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AuthConfirmAuthRequest.Responses.$200>
  }
  ['/general/html']: {
    /**
     * general_getCmsPages - Get Cms Pages
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralGetCmsPages.Responses.$200>
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
     * general_editCmsHtml - Edit Cms Html
     */
    'patch'(
      parameters?: Parameters<Paths.GeneralEditCmsHtml.PathParameters> | null,
      data?: Paths.GeneralEditCmsHtml.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralEditCmsHtml.Responses.$200>
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
  ['/general/html-meta-tags']: {
    /**
     * general_getHtmlMetaTags - Get Html Meta Tags
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralGetHtmlMetaTags.Responses.$200>
    /**
     * general_editHtmlMetaTags - Edit Html Meta Tags
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.GeneralEditHtmlMetaTags.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GeneralEditHtmlMetaTags.Responses.$200>
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
     * user_getUser - Get User
     */
    'get'(
      parameters?: Parameters<Paths.UserGetUser.PathParameters & Paths.UserGetUser.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetUser.Responses.$200>
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
  ['/user/{uuid}/attribute/current']: {
    /**
     * user_getCurrentAttributes - Get Current Attributes
     * 
     * Return a mapping of the current attributes of a user.
     */
    'get'(
      parameters?: Parameters<Paths.UserGetCurrentAttributes.PathParameters & Paths.UserGetCurrentAttributes.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetCurrentAttributes.Responses.$200>
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
  ['/user/{uuid}/attribute/']: {
    /**
     * user_getAttributes - Get Attributes
     */
    'get'(
      parameters?: Parameters<Paths.UserGetAttributes.PathParameters & Paths.UserGetAttributes.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserGetAttributes.Responses.$200>
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
      parameters?: Parameters<Paths.UserGetMemberships.PathParameters & Paths.UserGetMemberships.QueryParameters> | null,
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
  ['/user/{uuid}/membership/by-group']: {
    /**
     * user_endMembershipByGroup - End Membership By Group
     */
    'delete'(
      parameters?: Parameters<Paths.UserEndMembershipByGroup.PathParameters & Paths.UserEndMembershipByGroup.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UserEndMembershipByGroup.Responses.$200>
  }
  ['/user/membership/{uuid}']: {
    /**
     * user_endMembership - End Membership
     */
    'delete'(
      parameters?: Parameters<Paths.UserEndMembership.PathParameters & Paths.UserEndMembership.QueryParameters> | null,
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
  ['/server/bundle/order']: {
    /**
     * server_updateBundleOrder - Update Bundle Order
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ServerUpdateBundleOrder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerUpdateBundleOrder.Responses.$200>
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
  ['/server/user-type-mapping']: {
    /**
     * server_getServerTypeToUserType - Get Server Type To User Type
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetServerTypeToUserType.Responses.$200>
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
  ['/server/{uuid}/user-activity']: {
    /**
     * server_getServerUserActivity - Get Server User Activity
     * 
     * Returns online users (within last 3 minutes) with their (global) bans, (global) warnings and groups within the bundle of the server
     * :param server:
     * :param allowed_bundles_ban:
     * :param allowed_bundles_warn:
     * :param c_user:
     * :return:
     */
    'get'(
      parameters?: Parameters<Paths.ServerGetServerUserActivity.PathParameters & Paths.ServerGetServerUserActivity.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ServerGetServerUserActivity.Responses.$200>
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
  ['/ban/config']: {
    /**
     * ban_getConfig - Get Config
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanGetConfig.Responses.$200>
    /**
     * ban_updateConfig - Update Config
     */
    'patch'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.BanUpdateConfig.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanUpdateConfig.Responses.$200>
  }
  ['/ban/{uuid}']: {
    /**
     * ban_getBan - Get Ban
     */
    'get'(
      parameters?: Parameters<Paths.BanGetBan.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanGetBan.Responses.$200>
    /**
     * ban_deleteBan - Delete Ban
     */
    'delete'(
      parameters?: Parameters<Paths.BanDeleteBan.PathParameters & Paths.BanDeleteBan.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanDeleteBan.Responses.$200>
    /**
     * ban_editBan - Edit Ban
     */
    'patch'(
      parameters?: Parameters<Paths.BanEditBan.PathParameters & Paths.BanEditBan.QueryParameters> | null,
      data?: Paths.BanEditBan.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanEditBan.Responses.$200>
  }
  ['/ban/{uuid}/logs']: {
    /**
     * ban_getLogs - Get Logs
     */
    'get'(
      parameters?: Parameters<Paths.BanGetLogs.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanGetLogs.Responses.$200>
  }
  ['/ban/{uuid}/comments']: {
    /**
     * ban_getComments - Get Comments
     */
    'get'(
      parameters?: Parameters<Paths.BanGetComments.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanGetComments.Responses.$200>
  }
  ['/ban/comment']: {
    /**
     * ban_createComment - Create Comment
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.BanCreateComment.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanCreateComment.Responses.$200>
  }
  ['/ban/comment/{uuid}']: {
    /**
     * ban_deleteComment - Delete Comment
     */
    'delete'(
      parameters?: Parameters<Paths.BanDeleteComment.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.BanDeleteComment.Responses.$200>
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
      parameters?: Parameters<Paths.WarningToggleWarningStatus.PathParameters & Paths.WarningToggleWarningStatus.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WarningToggleWarningStatus.Responses.$200>
  }
  ['/warning/{uuid}']: {
    /**
     * warning_getWarning - Get Warning
     */
    'get'(
      parameters?: Parameters<Paths.WarningGetWarning.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WarningGetWarning.Responses.$200>
    /**
     * warning_deleteWarning - Delete Warning
     */
    'delete'(
      parameters?: Parameters<Paths.WarningDeleteWarning.PathParameters & Paths.WarningDeleteWarning.QueryParameters> | null,
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
  ['/shop/tax/']: {
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
  ['/shop/debit/invoices']: {
    /**
     * shop_getDebitInvoices - Get Debit Invoices
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetDebitInvoices.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetDebitInvoices.Responses.$200>
  }
  ['/shop/debit/']: {
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
  ['/shop/debit/{uuid}/coupon']: {
    /**
     * shop_addCouponCodes - Add Coupon Codes
     * 
     * Save user entered coupons to the specified debit
     */
    'post'(
      parameters?: Parameters<Paths.ShopAddCouponCodes.PathParameters> | null,
      data?: Paths.ShopAddCouponCodes.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopAddCouponCodes.Responses.$200>
    /**
     * shop_confirmCouponDebit - Confirm Coupon Debit
     * 
     * Confirm coupon debit.
     */
    'patch'(
      parameters?: Parameters<Paths.ShopConfirmCouponDebit.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopConfirmCouponDebit.Responses.$200>
  }
  ['/shop/cart/']: {
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
    /**
     * shop_editCartPacket - Edit Cart Packet
     */
    'patch'(
      parameters?: Parameters<Paths.ShopEditCartPacket.PathParameters> | null,
      data?: Paths.ShopEditCartPacket.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopEditCartPacket.Responses.$200>
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
  ['/shop/purchase/']: {
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
     * shop_deletePurchase - Delete Purchase
     */
    'delete'(
      parameters?: Parameters<Paths.ShopDeletePurchase.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopDeletePurchase.Responses.$200>
    /**
     * shop_editPurchase - Edit Purchase
     */
    'patch'(
      parameters?: Parameters<Paths.ShopEditPurchase.PathParameters> | null,
      data?: Paths.ShopEditPurchase.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopEditPurchase.Responses.$200>
  }
  ['/shop/purchase/currency']: {
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
  ['/shop/checkout/']: {
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
  ['/shop/statistic/debit']: {
    /**
     * shop_getDebitStatistic - Get Debit Statistic
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetDebitStatistic.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetDebitStatistic.Responses.$200>
  }
  ['/shop/statistic/purchase']: {
    /**
     * shop_getPurchaseStatistic - Get Purchase Statistic
     */
    'get'(
      parameters?: Parameters<Paths.ShopGetPurchaseStatistic.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetPurchaseStatistic.Responses.$200>
  }
  ['/shop/statistic/report']: {
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
  ['/shop/statistic/report/csv']: {
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
  ['/shop/top-donators']: {
    /**
     * shop_getTopDonators - Get Top Donators
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ShopGetTopDonators.Responses.$200>
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
    /**
     * packet_addAppliedReward - Add Applied Reward
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PacketAddAppliedReward.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketAddAppliedReward.Responses.$200>
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
     * packet_deleteAppliedReward - Delete Applied Reward
     */
    'post'(
      parameters?: Parameters<Paths.PacketDeleteAppliedReward.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketDeleteAppliedReward.Responses.$200>
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
  ['/packet/category/{uuid}/subcategory']: {
    /**
     * packet_getSubcategories - Get Subcategories
     */
    'get'(
      parameters?: Parameters<Paths.PacketGetSubcategories.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketGetSubcategories.Responses.$200>
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
  ['/packet/order']: {
    /**
     * packet_updateOrder - Update Order
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.PacketUpdateOrder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PacketUpdateOrder.Responses.$200>
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
  ['/finance/transaction/{uuid}']: {
    /**
     * finance_getTransaction - Get Transaction
     */
    'get'(
      parameters?: Parameters<Paths.FinanceGetTransaction.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FinanceGetTransaction.Responses.$200>
  }
  ['/finance/account/{uuid}/transaction']: {
    /**
     * finance_createCreditTransaction - Create Credit Transaction
     */
    'post'(
      parameters?: Parameters<Paths.FinanceCreateCreditTransaction.PathParameters> | null,
      data?: Paths.FinanceCreateCreditTransaction.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FinanceCreateCreditTransaction.Responses.$200>
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
  ['/notification/{uuid}']: {
    /**
     * notification_getNotification - Get Notification
     */
    'get'(
      parameters?: Parameters<Paths.NotificationGetNotification.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NotificationGetNotification.Responses.$200>
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
  ['/log/labels']: {
    /**
     * log_getLabels - Get Labels
     */
    'get'(
      parameters?: Parameters<Paths.LogGetLabels.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.LogGetLabels.Responses.$200>
  }
  ['/webhook/paypal/{uuid}']: {
    /**
     * webhook_paypalEvent - Paypal Event
     */
    'post'(
      parameters?: Parameters<Paths.WebhookPaypalEvent.PathParameters> | null,
      data?: Paths.WebhookPaypalEvent.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WebhookPaypalEvent.Responses.$200>
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
      parameters?: Parameters<Paths.WebhookPaysafecardNotification.PathParameters & Paths.WebhookPaysafecardNotification.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.WebhookPaysafecardNotification.Responses.$200>
  }
  ['/forum/topic']: {
    /**
     * forum_getTopics - Get Topics
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumGetTopics.Responses.$200>
    /**
     * forum_createTopic - Create Topic
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ForumCreateTopic.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumCreateTopic.Responses.$200>
  }
  ['/forum/topic/{uuid}']: {
    /**
     * forum_getTopic - Get Topic
     */
    'get'(
      parameters?: Parameters<Paths.ForumGetTopic.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumGetTopic.Responses.$200>
    /**
     * forum_deleteTopic - Delete Topic
     */
    'delete'(
      parameters?: Parameters<Paths.ForumDeleteTopic.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumDeleteTopic.Responses.$200>
    /**
     * forum_editTopic - Edit Topic
     */
    'patch'(
      parameters?: Parameters<Paths.ForumEditTopic.PathParameters> | null,
      data?: Paths.ForumEditTopic.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumEditTopic.Responses.$200>
  }
  ['/forum/topic/order']: {
    /**
     * forum_updateTopicOrder - Update Topic Order
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ForumUpdateTopicOrder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumUpdateTopicOrder.Responses.$200>
  }
  ['/forum/topic/category']: {
    /**
     * forum_getTopicCategories - Get Topic Categories
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumGetTopicCategories.Responses.$200>
    /**
     * forum_createTopicCategory - Create Topic Category
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ForumCreateTopicCategory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumCreateTopicCategory.Responses.$200>
  }
  ['/forum/topic/category/{uuid}']: {
    /**
     * forum_deleteTopicCategory - Delete Topic Category
     */
    'delete'(
      parameters?: Parameters<Paths.ForumDeleteTopicCategory.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumDeleteTopicCategory.Responses.$200>
    /**
     * forum_editTopicCategory - Edit Topic Category
     */
    'patch'(
      parameters?: Parameters<Paths.ForumEditTopicCategory.PathParameters> | null,
      data?: Paths.ForumEditTopicCategory.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumEditTopicCategory.Responses.$200>
  }
  ['/forum/topic/category/order']: {
    /**
     * forum_updateTopicCategoryOrder - Update Topic Category Order
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ForumUpdateTopicCategoryOrder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumUpdateTopicCategoryOrder.Responses.$200>
  }
  ['/forum/topic/{uuid}/threads']: {
    /**
     * forum_getTopicThreads - Get Topic Threads
     */
    'get'(
      parameters?: Parameters<Paths.ForumGetTopicThreads.PathParameters & Paths.ForumGetTopicThreads.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumGetTopicThreads.Responses.$200>
  }
  ['/forum/thread']: {
    /**
     * forum_getThreads - Get Threads
     */
    'get'(
      parameters?: Parameters<Paths.ForumGetThreads.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumGetThreads.Responses.$200>
    /**
     * forum_createThread - Create Thread
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ForumCreateThread.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumCreateThread.Responses.$200>
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
  ['/forum/thread/{uuid}']: {
    /**
     * forum_getThread - Get Thread
     */
    'get'(
      parameters?: Parameters<Paths.ForumGetThread.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumGetThread.Responses.$200>
    /**
     * forum_deleteThread - Delete Thread
     */
    'delete'(
      parameters?: Parameters<Paths.ForumDeleteThread.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumDeleteThread.Responses.$200>
    /**
     * forum_editThread - Edit Thread
     */
    'patch'(
      parameters?: Parameters<Paths.ForumEditThread.PathParameters> | null,
      data?: Paths.ForumEditThread.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumEditThread.Responses.$200>
  }
  ['/forum/thread/{uuid}/status']: {
    /**
     * forum_toggleStatus - Toggle Status
     */
    'patch'(
      parameters?: Parameters<Paths.ForumToggleStatus.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumToggleStatus.Responses.$200>
  }
  ['/forum/thread/{uuid}/posts']: {
    /**
     * forum_getThreadPosts - Get Thread Posts
     */
    'get'(
      parameters?: Parameters<Paths.ForumGetThreadPosts.PathParameters & Paths.ForumGetThreadPosts.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumGetThreadPosts.Responses.$200>
  }
  ['/forum/thread/{uuid}/post']: {
    /**
     * forum_createPost - Create Post
     */
    'post'(
      parameters?: Parameters<Paths.ForumCreatePost.PathParameters> | null,
      data?: Paths.ForumCreatePost.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumCreatePost.Responses.$200>
  }
  ['/forum/post/{uuid}']: {
    /**
     * forum_deletePost - Delete Post
     */
    'delete'(
      parameters?: Parameters<Paths.ForumDeletePost.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumDeletePost.Responses.$200>
    /**
     * forum_editPost - Edit Post
     */
    'patch'(
      parameters?: Parameters<Paths.ForumEditPost.PathParameters> | null,
      data?: Paths.ForumEditPost.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumEditPost.Responses.$200>
  }
  ['/forum/post']: {
    /**
     * forum_getPosts - Get Posts
     */
    'get'(
      parameters?: Parameters<Paths.ForumGetPosts.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ForumGetPosts.Responses.$200>
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
  ['/faq/']: {
    /**
     * faq_getFaq - Get Faq
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FaqGetFaq.Responses.$200>
    /**
     * faq_createQuestion - Create Question
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.FaqCreateQuestion.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FaqCreateQuestion.Responses.$200>
  }
  ['/faq/{uuid}']: {
    /**
     * faq_deleteQuestion - Delete Question
     */
    'delete'(
      parameters?: Parameters<Paths.FaqDeleteQuestion.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FaqDeleteQuestion.Responses.$200>
    /**
     * faq_editQuestion - Edit Question
     */
    'patch'(
      parameters?: Parameters<Paths.FaqEditQuestion.PathParameters> | null,
      data?: Paths.FaqEditQuestion.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FaqEditQuestion.Responses.$200>
  }
  ['/faq/order']: {
    /**
     * faq_updateOrder - Update Order
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.FaqUpdateOrder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FaqUpdateOrder.Responses.$200>
  }
  ['/advert/']: {
    /**
     * advert_getAdverts - Get Adverts
     */
    'get'(
      parameters?: Parameters<Paths.AdvertGetAdverts.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdvertGetAdverts.Responses.$200>
    /**
     * advert_createAdvert - Create Advert
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AdvertCreateAdvert.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdvertCreateAdvert.Responses.$200>
  }
  ['/advert/{uuid}']: {
    /**
     * advert_deleteAdvert - Delete Advert
     */
    'delete'(
      parameters?: Parameters<Paths.AdvertDeleteAdvert.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdvertDeleteAdvert.Responses.$200>
    /**
     * advert_editAdvert - Edit Advert
     */
    'patch'(
      parameters?: Parameters<Paths.AdvertEditAdvert.PathParameters> | null,
      data?: Paths.AdvertEditAdvert.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdvertEditAdvert.Responses.$200>
  }
  ['/advert/order']: {
    /**
     * advert_updateOrder - Update Order
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.AdvertUpdateOrder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.AdvertUpdateOrder.Responses.$200>
  }
  ['/navigation/']: {
    /**
     * navigation_getNavigationLinks - Get Navigation Links
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NavigationGetNavigationLinks.Responses.$200>
    /**
     * navigation_createNavigationLink - Create Navigation Link
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.NavigationCreateNavigationLink.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NavigationCreateNavigationLink.Responses.$200>
  }
  ['/navigation/{uuid}']: {
    /**
     * navigation_deleteNavigationLink - Delete Navigation Link
     */
    'delete'(
      parameters?: Parameters<Paths.NavigationDeleteNavigationLink.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NavigationDeleteNavigationLink.Responses.$200>
    /**
     * navigation_editNavigationLink - Edit Navigation Link
     */
    'patch'(
      parameters?: Parameters<Paths.NavigationEditNavigationLink.PathParameters> | null,
      data?: Paths.NavigationEditNavigationLink.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NavigationEditNavigationLink.Responses.$200>
  }
  ['/navigation/order']: {
    /**
     * navigation_updateOrder - Update Order
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.NavigationUpdateOrder.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.NavigationUpdateOrder.Responses.$200>
  }
  ['/']: {
    /**
     * redirect__get - Redirect
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RedirectGet.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>
