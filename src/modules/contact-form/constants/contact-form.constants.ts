export enum ContactFormStatus {
  UNREAD = 'unread',
  READ = 'read',
  REPLIED = 'replied',
  ARCHIVED = 'archived',
}

// 諮詢類型列舉
export enum ContactFormType {
  URGENT = 'urgent',
  COOPERATION = 'cooperation',
  REPAIR = 'repair',
  OTHER = 'other',
}

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
