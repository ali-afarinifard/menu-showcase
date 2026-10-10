import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Clock3,
  Coffee,
  Heart,
  Leaf,
  MapPin,
  Minus,
  Monitor,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Tablet,
  UtensilsCrossed,
  GlassWater,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import {
  ALL_ITEMS,
  CHEF_SPECIAL,
  categories,
  dietaryTags,
  faDigits,
  money,
  num,
  products,
  templates,
  type Product,
  type TemplateId,
} from "./data";
import { useMenu } from "./use-menu";
import { Checkout, Totals } from "./checkout";

export function MenuShowcase() {
  const [template, setTemplate] = useState<TemplateId>("artisan");
  const [viewport, setViewport] = useState("desktop");
  const [category, setCategory] = useState(ALL_ITEMS);
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const [checkout, setCheckout] = useState(false);
  const [info, setInfo] = useState(false);
  const reducedMotion = useReducedMotion();
  const menu = useMenu();
  const restaurant = templates.find((item) => item.id === template) || templates[0];
  const filtered = products.filter(
    (p) =>
      (category === ALL_ITEMS || p.category === category) &&
      (!tag || p.tags.includes(tag)) &&
      (!favoritesOnly || menu.favorites.includes(p.id)) &&
      `${p.name} ${p.description} ${p.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase()),
  );
  const changeTemplate = (id: TemplateId) => {
    setTemplate(id);
    setCategory(ALL_ITEMS);
    setQuery("");
    setTag("");
    setFavoritesOnly(false);
  };
  return (
    <div className="showcase-shell">
      <header className="showcase-toolbar">
        <div className="showcase-brand">
          <div className="brand-symbol">
            <UtensilsCrossed size={18} />
          </div>
          <span>
            منوفولیو<span className="brand-dot">.</span>
          </span>
          <span className="showcase-label">نمایشگاه قالب‌ها</span>
        </div>
        <div className="template-switcher" aria-label="قالب منو">
          {templates.map((item, index) => (
            <Button
              key={item.id}
              variant="ghost"
              className={`template-option ${template === item.id ? "selected" : ""}`}
              onClick={() => changeTemplate(item.id)}
            >
              <span className={`template-swatch swatch-${item.id}`} />
              <span>{item.label}</span>
              {template === item.id && (
                <span className="template-index">
                  {num(0)}
                  {num(index + 1)}
                </span>
              )}
            </Button>
          ))}
        </div>
        <div className="toolbar-right">
          <div className="viewport-switcher">
            {[
              { id: "mobile", icon: Smartphone, label: "موبایل" },
              { id: "tablet", icon: Tablet, label: "تبلت" },
              { id: "desktop", icon: Monitor, label: "دسکتاپ" },
            ].map((mode) => (
              <Button
                key={mode.id}
                variant="ghost"
                size="icon"
                title={`پیش‌نمایش ${mode.label}`}
                aria-label={`پیش‌نمایش ${mode.label}`}
                className={viewport === mode.id ? "selected" : ""}
                onClick={() => setViewport(mode.id)}
              >
                <mode.icon />
              </Button>
            ))}
          </div>
          <span className="demo-indicator">
            <span />
            نسخه‌ی نمایشی Live
          </span>
        </div>
      </header>
      <div className="showcase-caption">
        <span>
          <span className={`template-swatch swatch-${template}`} />
          {restaurant.caption}
        </span>
        <span>
          {num(0)}
          {num(templates.findIndex((t) => t.id === template) + 1)}{" "}
          <span className="caption-divider">/</span> {num(0)}
          {num(4)}
        </span>
      </div>
      <div className={`preview-stage mode-${viewport}`}>
        <AnimatePresence mode="wait">
          <motion.main
            key={template}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className={`menu-theme theme-${template} menu-preview`}
          >
            <nav className="restaurant-nav">
              <div className="restaurant-logo">
                <span className="restaurant-mark">
                  {template === "luxe" ? (
                    <Sparkles />
                  ) : template === "urban" ? (
                    <UtensilsCrossed />
                  ) : (
                    <Leaf />
                  )}
                </span>
                <span>
                  {restaurant.name}
                  <small>
                    {template === "artisan"
                      ? "بیسترو و کافه"
                      : template === "luxe"
                        ? "رستوران لوکس"
                        : template === "urban"
                          ? "آشپزخانه‌ی خیابانی"
                          : "غذا در بهترین فرم"}
                  </small>
                </span>
              </div>
              <div className="restaurant-actions">
                <Button variant="ghost" className="info-button" onClick={() => setInfo(true)}>
                  آدرس ما <ArrowLeft />
                </Button>
                <span className="nav-divider" />
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="نمایش علاقه‌مندی‌ها"
                  title="علاقه‌مندی‌ها"
                  onClick={() => setFavoritesOnly(!favoritesOnly)}
                  className={favoritesOnly ? "text-primary" : ""}
                >
                  <Heart className={favoritesOnly ? "fill-current" : ""} />
                </Button>
                <Button className="bag-button" onClick={() => setCheckout(true)}>
                  <ShoppingBag />
                  سفارش شما<span className="bag-count">{num(menu.count)}</span>
                </Button>
              </div>
            </nav>
            <section className="restaurant-hero">
              <img
                src={restaurant.hero}
                alt={
                  template === "bento"
                    ? "کاسه‌ی تازه‌ی فصل برداشت"
                    : template === "urban"
                      ? "تست آووکادوی پرمایه‌ی مخصوص"
                      : "فضای آفتابی و دلنشین کافه"
                }
                width={1920}
                height={768}
                className="hero-image"
              />
              <div className="hero-shade" />
              <div className="hero-content">
                <span className="hero-eyebrow">{restaurant.eyebrow}</span>
                <h1>{restaurant.name}</h1>
                <p className="hero-tagline">{restaurant.tagline}</p>
                <p className="hero-description">{restaurant.description}</p>
                <div className="hero-bottom">
                  <span className="open-status">
                    <span />
                    اکنون باز است
                  </span>
                  <span className="hero-rating">
                    <Star className="size-3 fill-current" />
                    ۴٫۹ <span>(۱۲۸ نظر)</span>
                  </span>
                </div>
              </div>
              <div className="hero-stamp">
                {template === "urban" ? (
                  <>
                    <span>۱۰۰٪</span>خوشمزه
                  </>
                ) : template === "bento" ? (
                  <>
                    <span>تازه.</span>هر روز
                  </>
                ) : template === "luxe" ? (
                  <>
                    <Sparkles />
                    <span>فصلی</span>منوی انتخابی
                  </>
                ) : (
                  <>
                    <Leaf />
                    <span>با دقت و عشق</span>از آشپزخانه‌ی ما
                  </>
                )}
              </div>
            </section>
            <div className="restaurant-infobar">
              <span>
                <MapPin />
                {faDigits(restaurant.address)}
              </span>
              <span>
                <Clock3 />
                {faDigits(restaurant.hours)}
              </span>
              <Button variant="ghost" onClick={() => setInfo(true)}>
                <span>اطلاعات رستوران</span>
                <ArrowLeft />
              </Button>
            </div>
            <div className="menu-layout">
              <section className="menu-catalog">
                <div className="menu-heading">
                  <div>
                    <span className="section-eyebrow">
                      {template === "luxe" ? "مجموعه‌ی فصلی" : "تازه از آشپزخانه‌ی ما"}
                    </span>
                    <h2>
                      {template === "urban"
                        ? "هوس خود را انتخاب کنید."
                        : template === "luxe"
                          ? "منوی انتخابی ما"
                          : "برای هر هوسی چیزی داریم."}
                    </h2>
                  </div>
                  <span className="season-label">
                    <Leaf />
                    الهام‌گرفته از فصل
                  </span>
                </div>
                <div className="category-row">
                  {categories.map((item, index) => (
                    <Button
                      key={item}
                      variant="ghost"
                      onClick={() => setCategory(item)}
                      className={`category-pill ${category === item ? "active" : ""}`}
                    >
                      {index === 0 ? (
                        <UtensilsCrossed />
                      ) : index === 1 ? (
                        <Coffee />
                      ) : index === 2 ? (
                        <Leaf />
                      ) : index === 3 ? (
                        <Sparkles />
                      ) : (
                        <Star />
                      )}
                      {item}
                    </Button>
                  ))}
                </div>
                <div className="filter-row">
                  <div className="search-field">
                    <Search />
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="غذای محبوب بعدی خود را پیدا کنید…"
                      aria-label="جستجو در منو"
                    />
                    {query && (
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="پاک کردن جستجو"
                        onClick={() => setQuery("")}
                      >
                        <X />
                      </Button>
                    )}
                  </div>
                  <div className="dietary-filters">
                    {dietaryTags.map((item) => (
                      <Button
                        key={item}
                        variant="ghost"
                        className={`tag-filter ${tag === item ? "active" : ""}`}
                        onClick={() => setTag(tag === item ? "" : item)}
                      >
                        {tag === item && <Check />}
                        {item === "گیاهی" || item === "وگان" ? <Leaf /> : null}
                        {item}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="results-heading">
                  <h3>
                    {favoritesOnly
                      ? "علاقه‌مندی‌های شما"
                      : category === ALL_ITEMS
                        ? template === "luxe"
                          ? "انتخاب‌های فصلی"
                          : "محبوب‌های ما، به‌زودی محبوب شما"
                        : category}
                  </h3>
                  <span>{num(filtered.length)} مورد</span>
                </div>
                <div className="product-grid">
                  {filtered.map((p, index) => (
                    <motion.article
                      layout={!reducedMotion}
                      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.045 }}
                      key={p.id}
                      className={`product-card ${!p.available ? "unavailable" : ""}`}
                    >
                      <div className="product-photo">
                        <div
                          role="button"
                          tabIndex={0}
                          aria-label={`مشاهده‌ی ${p.name}`}
                          onClick={() => setSelected(p)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setSelected(p);
                            }
                          }}
                        >
                          <img
                            src={p.image}
                            alt={p.name}
                            width={1024}
                            height={768}
                            loading="lazy"
                          />
                        </div>
                        {p.tags.includes(CHEF_SPECIAL) && (
                          <span className="chef-badge">
                            <Sparkles />
                            انتخاب سرآشپز
                          </span>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`favorite-button ${menu.favorites.includes(p.id) ? "liked" : ""}`}
                          aria-label={`${menu.favorites.includes(p.id) ? "حذف از علاقه‌مندی‌ها" : "افزودن به علاقه‌مندی‌ها"}: ${p.name}`}
                          onClick={() => menu.toggleFavorite(p.id)}
                        >
                          <Heart className={menu.favorites.includes(p.id) ? "fill-current" : ""} />
                        </Button>
                        {!p.available && <span className="sold-out">امروز تمام شد</span>}
                      </div>
                      <div className="product-content">
                        <div className="product-tags">
                          {p.tags
                            .filter((t) => t !== CHEF_SPECIAL)
                            .map((t) => (
                              <span key={t}>
                                {t === "گیاهی" || t === "وگان" ? <Leaf /> : <Check />}
                                {t}
                              </span>
                            ))}
                        </div>
                        <h4>
                          <Button
                            variant="link"
                            className="product-name"
                            onClick={() => setSelected(p)}
                          >
                            {p.name}
                          </Button>
                        </h4>
                        <p>{p.description}</p>
                        {template === "luxe" && (
                          <div className="wine-pairing">
                            <GlassWater />
                            نوشیدنی پیشنهادی: {p.pairing}
                          </div>
                        )}
                        <div className="product-bottom">
                          <strong>{money(p.price)}</strong>
                          {menu.cart[p.id] ? (
                            <div className="inline-quantity">
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label={`کاهش ${p.name}`}
                                onClick={() => menu.changeQuantity(p.id, -1)}
                              >
                                <Minus />
                              </Button>
                              <span>{num(menu.cart[p.id] ?? 0)}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label={`افزایش ${p.name}`}
                                onClick={() => menu.changeQuantity(p.id, 1)}
                              >
                                <Plus />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              className="add-button"
                              disabled={!p.available}
                              onClick={() => menu.changeQuantity(p.id, 1)}
                            >
                              <Plus />
                              {p.available ? "افزودن" : "ناموجود"}
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
                {filtered.length === 0 && (
                  <div className="empty-results">
                    <Search className="mx-auto mb-4 size-7" />
                    <h3>غذایی پیدا نشد</h3>
                    <Button
                      className="mt-4"
                      variant="outline"
                      onClick={() => {
                        setQuery("");
                        setCategory(ALL_ITEMS);
                        setTag("");
                        setFavoritesOnly(false);
                      }}
                    >
                      پاک کردن فیلترها
                    </Button>
                  </div>
                )}
                <div className="menu-footnote">
                  <Leaf />
                  تازه تهیه می‌شود. از تولیدکنندگان محلی. با عشق سرو می‌شود.
                  <span>لطفاً درباره‌ی هرگونه حساسیت غذایی به ما اطلاع دهید.</span>
                </div>
              </section>
              <aside className="order-sidebar">
                <div className="order-title">
                  <h3>سفارش شما</h3>
                  <span>{num(menu.count)} مورد</span>
                </div>
                {menu.count === 0 ? (
                  <div className="empty-bag">
                    <div className="empty-bag-icon">
                      <ShoppingBag />
                    </div>
                    <h4>یک وعده‌ی خوب از اینجا شروع می‌شود.</h4>
                    <p>به سفارش اضافه کنید</p>
                  </div>
                ) : (
                  <div className="sidebar-items">
                    {products
                      .filter((p) => menu.cart[p.id])
                      .map((p) => (
                        <div className="sidebar-item" key={p.id}>
                          <img src={p.image} alt="" />
                          <div>
                            <strong>{p.name}</strong>
                            <div className="sidebar-quantity">
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label={`کاهش ${p.name} در سفارش`}
                                onClick={() => menu.changeQuantity(p.id, -1)}
                              >
                                <Minus />
                              </Button>
                              <span>{num(menu.cart[p.id] ?? 0)}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label={`افزایش ${p.name} در سفارش`}
                                onClick={() => menu.changeQuantity(p.id, 1)}
                              >
                                <Plus />
                              </Button>
                              <span>{money(p.price * (menu.cart[p.id] || 0))}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
                <Totals subtotal={menu.subtotal} tax={menu.tax} total={menu.total} />
                <Button
                  className="checkout-button"
                  disabled={!menu.count}
                  onClick={() => setCheckout(true)}
                >
                  تکمیل سفارش <ArrowLeft />
                </Button>
                <p className="checkout-note">تازه و مخصوص شما آماده می‌شود</p>
                <div className="order-promise">
                  <Leaf />
                  <span>
                    مواد اولیه‌ی مرغوب
                    <br />
                    <strong>لحظه های زیبا بسازید</strong>
                  </span>
                </div>
              </aside>
            </div>
            <footer className="restaurant-footer">
              <span className="font-display">{restaurant.name}</span>
              <span>کمی محلی. بسیار با محبت.</span>
              <span>منوی نمونه · قیمت‌ها به تومان</span>
            </footer>
          </motion.main>
        </AnimatePresence>
      </div>
      <footer className="showcase-footer">
        <span>
          <span className="demo-indicator">
            <span />
          </span>
          همه‌ی طعم‌ها. بدون هیچ پرداخت واقعی.
        </span>
      </footer>
      <Dialog
        open={!!selected}
        onOpenChange={(value) => {
          if (!value) setSelected(null);
        }}
      >
        <DialogContent className={`menu-theme theme-${template} product-dialog max-h-[90dvh]`}>
          {selected && (
            <>
              <img
                src={selected.image}
                alt={selected.name}
                className="aspect-16/10 w-full rounded-md object-cover"
              />
              <DialogTitle className="font-display text-2xl text-white">{selected.name}</DialogTitle>
              <DialogDescription>{selected.description}</DialogDescription>
              <div className="flex flex-wrap gap-2">
                {selected.tags.map((t) => (
                  <span key={t} className="rounded bg-muted px-2 py-1 text-xs text-white">
                    {t}
                  </span>
                ))}
              </div>
              <div>
                <h4 className="mb-1 text-sm font-semibold text-white">مواد تشکیل‌دهنده</h4>
                <p className="text-sm text-muted-foreground">{selected.ingredients}</p>
              </div>
              <div>
                <h4 className="mb-1 text-sm font-semibold text-white">آلرژن‌ها</h4>
                <p className="text-sm text-muted-foreground">حاوی: {selected.allergens}.</p>
              </div>
              {template === "luxe" && (
                <p className="wine-pairing">
                  <GlassWater />
                  نوشیدنی پیشنهادی: {selected.pairing}
                </p>
              )}
              <div className="flex items-center gap-3">
                <strong className="mr-auto text-xl">{money(selected.price)}</strong>
                <Button
                  variant="outline"
                  size="icon"
                  aria-label="تغییر وضعیت علاقه‌مندی"
                  onClick={() => menu.toggleFavorite(selected.id)}
                >
                  <Heart
                    className={
                      menu.favorites.includes(selected.id) ? "fill-current text-primary" : ""
                    }
                  />
                </Button>
                <Button
                  disabled={!selected.available}
                  onClick={() => menu.changeQuantity(selected.id, 1)}
                >
                  <Plus />
                  {selected.available
                    ? `افزودن به سفارش${menu.cart[selected.id] ? ` (${num(menu.cart[selected.id] ?? 0)})` : ""}`
                    : "امروز تمام شد"}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog open={info} onOpenChange={setInfo}>
        <DialogContent className={`menu-theme theme-${template}`}>
          <DialogTitle className="font-display text-3xl">{restaurant.name}</DialogTitle>
          <DialogDescription>{restaurant.description}</DialogDescription>
          <img
            src={restaurant.hero}
            alt={restaurant.name}
            className="aspect-16/8 w-full rounded-md object-cover"
          />
          <p className="flex items-center gap-3 text-sm">
            <MapPin className="size-4" />
            {faDigits(restaurant.address)}
          </p>
          <p className="flex items-center gap-3 text-sm">
            <Clock3 className="size-4" />
            {faDigits(restaurant.hours)}
          </p>
          <a
            href={`tel:${restaurant.phone.replace(/[^+0-9]/g, "")}`}
            className="flex items-center gap-3 text-sm text-primary"
          >
            <Phone className="size-4" />
            <span dir="ltr">{faDigits(restaurant.phone)}</span>
          </a>
          <p className="text-xs text-muted-foreground">
            اطلاعات نمونه‌ی رستوران برای نمایش این منو.
          </p>
        </DialogContent>
      </Dialog>
      <Checkout
        open={checkout}
        onClose={() => setCheckout(false)}
        menu={menu}
        template={template}
        restaurant={restaurant.name}
      />
    </div>
  );
}
