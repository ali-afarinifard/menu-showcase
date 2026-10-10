import cafe from '@/assets/cafe.jpg';
import toast from '@/assets/toast.jpg';
import bowl from '@/assets/bowl.jpg';
import pancakes from '@/assets/pancakes.jpg';

export type TemplateId = 'artisan' | 'bento' | 'urban' | 'luxe';
export type Product = { id: string; name: string; description: string; price: number; image: string; category: string; tags: string[]; ingredients: string; allergens: string; available: boolean; pairing?: string };

/** تبدیل ارقام لاتین به ارقام فارسی برای نمایش */
export const faDigits = (value: string | number) => String(value).replace(/\d/g, digit => '۰۱۲۳۴۵۶۷۸۹'.charAt(Number(digit)));
/** قالب‌بندی عدد با ارقام و جداکننده‌ی فارسی */
export const num = (value: number) => new Intl.NumberFormat('fa-IR').format(value);

export const ALL_ITEMS = 'همه‌ی غذاها';
export const CHEF_SPECIAL = 'انتخاب سرآشپز';
export const TAX_RATE = 0.1;

export const templates = [
  { id: 'artisan' as const, label: 'سفارشی', subtitle: 'بیسترو و کافه', caption: 'بیسترو و کافه‌ی دست‌ساز', name: 'زیتون و بلوط', tagline: 'غذای خوب. لحظه‌های آرام.', description: 'مواد اولیه‌ ای که با دقت آماده می‌شوند. در هر لقمه کمی آرامش.', address: 'تهران، خیابان ولیعصر، کوچه‌ی بید، پلاک ۲۴', hours: 'هر روز · ۸ صبح تا ۶ عصر', phone: '021-55501420', eyebrow: 'بیسترو و کافه‌ی محلی', hero: cafe },
  { id: 'bento' as const, label: 'مینیمال', subtitle: 'چیدمان بنتو', caption: 'مینیمال مدرن', name: 'فرم / آشپزخانه', tagline: 'ساده، اما درست و بی‌نقص.', description: 'هر ماده‌ی اولیه دلیلی دارد. کاسه‌های تازه و صبح‌های دلنشین.', address: 'تهران، خیابان نوفل‌لوشاتو، پلاک ۱۸', hours: 'هر روز · ۹ صبح تا ۸ شب', phone: '021-55501421', eyebrow: 'غذای فصلی / هر روز', hero: bowl },
  { id: 'urban' as const, label: 'خیابانی', subtitle: 'غذاخوری شهری', caption: 'غذای خیابانی شهری', name: 'خوشمزه‌ها', tagline: 'طعم بزرگ. بدون هیچ قانونی.', description: 'تست پرمایه. پنکیک‌های افسانه‌ای. کاسه‌های تازه با حال‌وهوایی دیگر.', address: 'تهران، خیابان ستارخان، پلاک ۸۲', hours: 'هر روز · ۱۰ صبح تا ۱۱ شب', phone: '021-55501422', eyebrow: 'تازه‌ترین جای غذای موردعلاقه‌ی شما', hero: toast },
  { id: 'luxe' as const, label: 'لوکس', subtitle: 'رستوران لوکس', caption: 'رستوران لوکس', name: 'مزون اکلا', tagline: 'هنرِ یک شب بی‌شتاب.', description: 'جشنی صمیمی برای فصل، با دقت و ظرافت چیده شده است.', address: 'تهران، الهیه، خیابان گل‌ها، پلاک ۷', hours: 'سه‌شنبه تا یکشنبه · ۵ تا ۱۰ شب', phone: '021-55501423', eyebrow: 'غذای فصلی • تأسیس ۱۳۹۷', hero: cafe },
] as const;
export const products: Product[] = [
  { id: 'toast', name: 'تست آووکادو و تخم‌مرغ پوچ', description: 'نان خمیرترش، آووکادوی له‌شده، تخم‌مرغ پوچ، گوجه‌گیلاسی و سبزی تازه.', price: 145000, image: toast, category: 'صبحانه', tags: ['گیاهی', CHEF_SPECIAL], ingredients: 'نان خمیرترش، آووکادو، تخم‌مرغ محلی، گوجه‌گیلاسی، جعفری، روغن زیتون.', allergens: 'گندم (گلوتن)، تخم‌مرغ', available: true, pairing: 'چای ارل‌گری با لیمو' },
  { id: 'bowl', name: 'کاسه‌ی فصل برداشت', description: 'سیب‌زمینی شیرین کبابی، کینوا، آووکادو، نخود ترد و سس ارده.', price: 160000, image: bowl, category: 'کاسه‌ها و سالادها', tags: ['وگان', 'بدون گلوتن'], ingredients: 'کینوا، کلم کیل، نخود، آووکادو، سیب‌زمینی شیرین، گوجه‌فرنگی، ارده‌ی کنجد.', allergens: 'کنجد', available: true, pairing: 'لیموناد نعنا' },
  { id: 'pancakes', name: 'پنکیک ریکوتا و توت‌ها', description: 'پنکیک‌های پفی ریکوتا، توت‌های فصل و کمی شربت افرا.', price: 135000, image: pancakes, category: 'صبحانه', tags: ['گیاهی'], ingredients: 'آرد، ریکوتا، تخم‌مرغ، شیر، بلوبری، توت‌فرنگی، شربت افرا.', allergens: 'گندم (گلوتن)، شیر، تخم‌مرغ', available: true, pairing: 'لاته‌ی وانیلی' },
  { id: 'green', name: 'کاسه‌ی الهه‌ی سبز', description: 'سبزی‌های باغچه، آووکادو، کینوا و نخود کبابی با سس ارده و لیمو.', price: 150000, image: bowl, category: 'کاسه‌ها و سالادها', tags: ['وگان', 'بدون گلوتن'], ingredients: 'کلم کیل، آووکادو، کینوا، نخود، کنجد، لیمو.', allergens: 'کنجد', available: true, pairing: 'دمنوش بهارنارنج' },
  { id: 'brunch', name: 'تست برانچ باغ', description: 'نان خمیرترش مخصوص ما با گوجه‌ی باغ، آووکادو و تخم‌مرغ عسلی.', price: 125000, image: toast, category: 'پیش‌غذا', tags: ['گیاهی'], ingredients: 'نان خمیرترش، آووکادو، تخم‌مرغ، گوجه‌فرنگی، سبزی تازه.', allergens: 'گندم (گلوتن)، تخم‌مرغ', available: true, pairing: 'نوشیدنی گازدار زنجبیل و لیمو' },
  { id: 'sweet', name: 'استک افرا و توت', description: 'یک خوشی شیرین و کوچک با ریکوتا، توت‌های رسیده و شربت افرای خالص.', price: 110000, image: pancakes, category: 'دسر', tags: ['گیاهی', CHEF_SPECIAL], ingredients: 'آرد، ریکوتا، تخم‌مرغ، شیر، توت‌ها، شربت افرا.', allergens: 'گندم (گلوتن)، شیر، تخم‌مرغ', available: false, pairing: 'قهوه‌ی ترک' },
];
export const categories = [ALL_ITEMS, 'صبحانه', 'کاسه‌ها و سالادها', 'پیش‌غذا', 'دسر'];
export const dietaryTags = ['گیاهی', 'وگان', 'بدون گلوتن', CHEF_SPECIAL];
export const money = (amount: number) => `${num(amount)} تومان`;
export function calculateTotals(cart: Record<string, number>) {
  const subtotal = products.reduce((sum, product) => sum + product.price * (cart[product.id] || 0), 0);
  const tax = Math.round(subtotal * TAX_RATE);
  return { subtotal, tax, total: subtotal + tax };
}
