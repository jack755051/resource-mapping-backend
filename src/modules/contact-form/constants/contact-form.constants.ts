export enum ContactFormStatus {
  UNREAD = 'unread',
  READ = 'read',
  REPLIED = 'replied',
  ARCHIVED = 'archived',
}

export enum ContactProductType {
  COMMUNITY = 'community',
  LPR = 'lpr',
  DVR = 'dvr',
  MAINTENANCE = 'maintenance',
  OTHER = 'other',
}

// 諮詢類型列舉
export enum InquiryIntent {
  CONSULT = 'consult', // 諮詢
  INQUIRY = 'inquiry', // 詢問
  COOPERATION = 'cooperation', // 合作
  REPAIR = 'repair', // 維修
  OTHER = 'other', // 其他
}

// 意圖判斷的關鍵字對照表
export const INTENT_KEYWORDS = [
  { intent: InquiryIntent.REPAIR, keywords: ['維修', '修復', '故障', '壞了'] },
  {
    intent: InquiryIntent.COOPERATION,
    keywords: ['合作', '代理', '廠商', '提案'],
  },
  { intent: InquiryIntent.CONSULT, keywords: ['諮詢', '了解', '想知道'] },
  { intent: InquiryIntent.INQUIRY, keywords: ['詢問', '報價', '多少錢'] },
];

// 違禁詞清單 (未來可以改成從資料庫或環境變數讀取)
export const BANNED_KEYWORDS = ['廣告', '推銷', '融資', '貸款'];

// 統一管理錯誤訊息 (選配，對於大型專案很有幫助)
export const CONTACT_ERROR_MSG = {
  BANNED_WORDS: 'error.contact.banned_words', // 💡 改用翻譯 Key
  URGENT_REQUIRES_PHONE: 'error.contact.urgent_phone_required',
  COOPERATION_VIA_EMAIL: 'error.contact.cooperation_via_email',
  REPAIR_REQUIRES_PHONE: 'error.contact.repair_phone_required',
  OTHER: 'error.contact.other',
};
