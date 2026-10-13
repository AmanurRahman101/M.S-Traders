# M.S TRADERS — PRODUCT CONTEXT & SPECIFICATION

## 1. Executive Summary
- **Shop Name**: M.S Traders (এম. এস. ট্রেডার্স)
- **Location**: Suritola, Old Dhaka, Bangladesh (the epicenter of leather, synthetic leather, and rexin trade).
- **Core Business**: Wholesale and retail trading of rexin, PVC leather, PU artificial leather, upholstery fabrics, and accessories.
- **Target Users**: Non-technical shop owners, counter salesmen, and account keepers with zero software onboarding patience.
- **Core Value Proposition**: 100% free forever, zero cloud subscription barrier, instant local storage + permanent Supabase cloud sync, zero horizontal scrolling on mobile, Old Dhaka authentic textile calculation (Gauze & Ghira: $1\text{ Yard} = 16\text{ Girah}$).

---

## 2. Financial & Accounting Model

1. **PAWNA (পাওনা / Receivables)**:
   - What customers and shoe/sofa factory owners owe to M.S Traders.
   - Generated from goods sold on credit (বাকি বিক্রি).
   - Reduced by customer cash deposits/payments (টাকা জমা).
   - Direct WhatsApp billing reminder integration.

2. **DENA (দেনা / Liabilities)**:
   - What M.S Traders owes to suppliers, rexin mills (e.g. Meghna, Noman), and financiers.
   - Generated from goods purchased on credit (বাকিতে মাল ক্রয়).
   - Reduced by cash/bank/cheque payments to suppliers.

3. **DOKAN KHARCHA (দোকান খরচ / Daily Operational Expenses)**:
   - Everyday commercial outlays: চা-নাস্তা (tea/refreshments), লেবার ও কুলি (coolie/labor), পরিবহন ও ভ্যান (van transport), দোকান ভাড়া (rent), বিদ্যুৎ বিল (utilities), স্টাফ বেতন (staff wages), প্যাকিং (packaging), and বিবিধ (misc).

4. **HATE NOGOD (হাতে নগদ / Today's Net Cash Flow)**:
   - Live daily calculation:
     $$\text{Net Cash} = \text{Cash Collected Today} - (\text{Supplier Payments Today} + \text{Expenses Today})$$

---

## 3. Product Constraints & Architectural Floor
- **Zero Server Costs**: Hosted as static application on Vercel.
- **Dual-Layer Persistence**:
  - Layer 1: Instant client-side `localStorage` cache.
  - Layer 2: Optional free-tier Supabase PostgreSQL sync with real-time multi-device support.
- **PIN Security**: PIN `1234` default protection on all financial data.
- **Mobile First**: 95% of operations happen on smartphones behind the shop counter. Minimum touch targets of 48px, minimum input font sizes of 16px (to prevent mobile browser auto-zoom), bottom-sheet modals, and zero horizontal scrolling.
