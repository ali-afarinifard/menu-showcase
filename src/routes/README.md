# مسیرها

TanStack Start از **مسیریابی فایل‌محور** استفاده می‌کند. هر فایل `.tsx` در این پوشه یک مسیر تعریف می‌کند. پوشه‌هایی مثل `src/pages/` یا `app/layout.tsx` را نسازید؛ آن‌ها قرارداد Next.js / Remix هستند. تنها چیدمان ریشه `src/routes/__root.tsx` است.

## قراردادها

| فایل | نشانی |
| --- | --- |
| `index.tsx` | `/` |
| `about.tsx` | `/about` |
| `users/index.tsx` | `/users` |
| `users/$id.tsx` | `/users/:id` (پویا) |
| `posts/{-$category}.tsx` | `/posts/:category?` (بخش اختیاری) |
| `files/$.tsx` | `/files/*` (splat) |
| `_layout.tsx` | مسیر چیدمان (فرزندها با `<Outlet />` نمایش داده می‌شوند) |
| `__root.tsx` | پوسته‌ی برنامه؛ `<Outlet />` را حفظ کنید |

فایل `routeTree.gen.ts` خودکار تولید می‌شود و نباید دستی ویرایش شود.
