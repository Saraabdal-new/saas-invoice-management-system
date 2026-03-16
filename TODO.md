# DB Standardization to pg Pool - Progress Tracker

## Plan Steps (Approved)

1. ✅ Delete `backend/src/modules/users/user.model.js` (unused Sequelize).
2. ✅ Rewrite `backend/src/modules/users/users.service.js` (Prisma → pg queries).
3. ✅ Fixed `backend/src/modules/invoices/invoices.service.js` (all pg).
4. ✅ Cleaned dead sequelize imports from notifications, settings, items, support services.
5. ✅ Verified & cleaned remaining sequelize imports (dashboard/payments/reports/clients).
6. [ ] Test backend.

## Current Progress

All steps complete except testing.

**Next Action**: Run `cd backend && npm run dev` to test.
