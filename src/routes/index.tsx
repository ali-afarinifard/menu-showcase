import { createFileRoute } from "@tanstack/react-router";
import { MenuShowcase } from '@/features/menu/showcase';

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: 'منوفولیو — نمایشگاه منوی دیجیتال تعاملی' },
    { name: 'description', content: 'چهار منوی متمایز رستوران را با علاقه‌مندی‌ها، سبد سفارش و تسویه‌حساب نمایشی تعاملی ببینید.' },
    { property: 'og:title', content: 'منوفولیو — چهار منو، طعمی بی‌پایان' },
    { property: 'og:description', content: 'منوهای دیجیتال دست‌ساز، مینیمال، خیابانی و لوکس را با سفارش‌گذاری کاملاً تعاملی تجربه کنید.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: MenuShowcase,
});
