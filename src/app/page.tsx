"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { menuData, MenuSection, MenuCategory, MenuItemType } from "@/data/menu";
import { FeedbackForm } from "@/components/FeedbackForm";
import {
  UtensilsCrossed,
  Soup,
  ChefHat,
  Flame,
  GlassWater,
  MapPin,
  Clock,
  Star,
  MessageSquare
} from "lucide-react";

// Category icons mapping
const categoryIcons: { [key: string]: React.ReactNode } = {
  "fast-food": <Flame className="w-5 h-5" />,
  "rice": <UtensilsCrossed className="w-5 h-5" />,
  "noodles": <Soup className="w-5 h-5" />,
  "starters": <ChefHat className="w-5 h-5" />,
  "milkshakes": <GlassWater className="w-5 h-5" />,
};

// Veg/Non-Veg indicator component
function VegIndicator({ isVeg }: { isVeg: boolean }) {
  return (
    <div
      className={isVeg ? "veg-indicator" : "nonveg-indicator"}
      title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
      aria-label={isVeg ? "Vegetarian" : "Non-Vegetarian"}
    />
  );
}

// Menu item component
function MenuItem({ item }: { item: MenuItemType }) {
  return (
    <div className="menu-card bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-[var(--color-border)] hover:border-[var(--color-gold)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <VegIndicator isVeg={item.isVeg} />
          <span className="font-medium text-[var(--color-text)] leading-tight">
            {item.name}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {item.fullPrice ? (
            <div className="text-right">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[var(--color-text-light)]">Single</span>
                <span className="price-tag text-[var(--color-saffron)]">₹{item.price}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[var(--color-text-light)]">Full</span>
                <span className="price-tag text-[var(--color-saffron)]">₹{item.fullPrice}</span>
              </div>
            </div>
          ) : (
            <span className="price-tag text-lg text-[var(--color-saffron)]">₹{item.price}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// Menu category component
function MenuCategorySection({ category }: { category: MenuCategory }) {
  if (!category.name) return (
    <div className="grid gap-3">
      {category.items.map((item, idx) => (
        <MenuItem key={idx} item={item} />
      ))}
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className={`w-3 h-3 rounded-full ${category.name === "Veg" ? "bg-[var(--color-green)]" : "bg-[var(--color-red)]"}`} />
        <h4 className="font-semibold text-[var(--color-text-light)] uppercase tracking-wide text-sm">
          {category.name}
        </h4>
      </div>
      <div className="grid gap-3">
        {category.items.map((item, idx) => (
          <MenuItem key={idx} item={item} />
        ))}
      </div>
    </div>
  );
}

// Menu section component
function MenuSectionComponent({ section }: { section: MenuSection }) {
  return (
    <section id={section.id} className="scroll-mt-32">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-full bg-gradient-to-br from-[var(--color-saffron)] to-[var(--color-turmeric)] text-white">
          {categoryIcons[section.id]}
        </div>
        <h3 className="text-2xl font-bold text-[var(--color-brown)]">
          {section.title}
        </h3>
      </div>
      <div className="space-y-8">
        {section.categories.map((category) => (
          <MenuCategorySection key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}

// Category navigation with scroll spy
function CategoryNav({ activeSection, onSectionClick }: { activeSection: string; onSectionClick: (id: string) => void }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[var(--color-border)] shadow-sm">
      <div className="max-w-4xl mx-auto flex justify-center">
        <div className="flex items-center gap-2 py-3 px-4 overflow-x-auto no-scrollbar scroll-smooth">
          {menuData.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                onSectionClick(section.id);
                const el = document.getElementById(section.id);
                if (el) {
                  const offset = 100;
                  const bodyRect = document.body.getBoundingClientRect().top;
                  const elementRect = el.getBoundingClientRect().top;
                  const elementPosition = elementRect - bodyRect;
                  const offsetPosition = elementPosition - offset;
                  window.scrollTo({ top: offsetPosition, behavior: "smooth" });
                }
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium
                ${activeSection === section.id
                  ? "bg-gradient-to-r from-[var(--color-saffron)] to-[var(--color-turmeric)] text-white shadow-md active-nav-item"
                  : "bg-[var(--color-beige)] text-[var(--color-brown)] hover:bg-[var(--color-gold)] hover:text-white"
                }`}
            >
              {categoryIcons[section.id]}
              <span>{section.title}</span>
            </a>
          ))}
          <a
            href="#feedback"
            onClick={(e) => {
              e.preventDefault();
              onSectionClick("feedback");
              const el = document.getElementById("feedback");
              if (el) {
                const offset = 100;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = el.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
              }
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium
              ${activeSection === "feedback"
                ? "bg-gradient-to-r from-[var(--color-saffron)] to-[var(--color-turmeric)] text-white shadow-md active-nav-item"
                : "bg-[var(--color-beige)] text-[var(--color-brown)] hover:bg-[var(--color-gold)] hover:text-white"
              }`}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Feedback</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

// Header component with logo
function Header() {
  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-[var(--color-brown)] via-[var(--color-brown-light)] to-[var(--color-saffron-dark)] text-white py-6 px-4">
      {/* Decorative pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M20 20.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0-10a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm10 10a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0-10a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zM10 20.5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0-10a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <div className="w-24 h-24 md:w-32 md:h-32 relative rounded-full overflow-hidden border-4 border-[var(--color-gold)] shadow-lg bg-[var(--color-cream)]">
            <Image
              src="/logo.png"
              alt="Lakshmi's Ghumagumalu Logo"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Restaurant name */}
        <div className="mb-1">
          <span className="text-[var(--color-gold)] text-xs md:text-sm tracking-[0.3em] uppercase font-medium">
            ✦ Lakshmi&apos;s ✦
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
          <span className="bg-gradient-to-r from-[var(--color-turmeric)] via-[var(--color-gold)] to-[var(--color-turmeric)] bg-clip-text text-transparent">
            Ghumagumalu
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-sm md:text-base text-white/80 mb-4 font-light">
          Delicious Fast Food & Meals at Affordable Prices
        </p>

        {/* Contact info */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs md:text-sm text-white/70">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[var(--color-saffron)]" />
            <span>40/1, Manga Building, SD Road, Secunderabad</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[var(--color-saffron)]" />
            <span>Open Daily</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// Footer component
function Footer() {
  return (
    <footer className="bg-[var(--color-brown)] text-white/70 py-8 px-4 mt-12">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo in footer */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 relative rounded-full overflow-hidden border-2 border-[var(--color-gold)] bg-[var(--color-cream)]">
            <Image
              src="/logo.png"
              alt="Lakshmi's Ghumagumalu Logo"
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="mb-4">
          <span className="text-[var(--color-gold)] font-semibold">Lakshmi&apos;s Ghumagumalu</span>
        </div>
        <p className="text-sm mb-4">
          40/1, Manga Building, SD Road, Secunderabad, Telangana - 500003
        </p>
        <div className="flex flex-col items-center justify-center gap-4 mt-8 pt-8 border-t border-white/10">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span>Made with</span>
            <span className="text-[var(--color-red)]">❤</span>
            <span>in Hyderabad</span>
          </div>
          <a
            href="https://www.google.com/maps/search/Lakshmi's+Ghumagumalu+Secunderabad"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm border border-white/20"
          >
            <MapPin className="w-4 h-4 text-[var(--color-gold)]" />
            <span>Find us on Google Maps</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  // Memoize section IDs to prevent re-creation on every render
  const sectionIds = useMemo(() => [...menuData.map(s => s.id), "feedback"], []);
  const [activeSection, setActiveSection] = useState("fast-food");

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 130; // Trigger point

      let currentSection = sectionIds[0];

      // Get all sections and their distances from top
      const sections = sectionIds.map(id => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        const rect = el.getBoundingClientRect();
        return { id, top: rect.top + window.scrollY };
      });

      // Find the last section that has started (top <= scrollPosition)
      for (const section of sections) {
        if (scrollPosition >= section.top) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount after a delay to allow layout to settle
    const timer = setTimeout(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, [sectionIds]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleFeedbackSuccess = () => {
    setToastMessage("Thank you for your feedback! 🙏");
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen">
      <Header />
      <CategoryNav activeSection={activeSection} onSectionClick={setActiveSection} />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Menu Sections */}
        <div className="space-y-12">
          {menuData.map((section, idx) => (
            <div key={section.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <MenuSectionComponent section={section} />
              {idx < menuData.length - 1 && (
                <div className="section-divider mt-12" />
              )}
            </div>
          ))}
        </div>

        {/* Feedback Section */}
        <div className="section-divider mt-12 mb-12" />
        <section id="feedback" className="scroll-mt-32">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-full bg-gradient-to-br from-[var(--color-green)] to-[var(--color-green-light)] text-white">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-2xl font-bold text-[var(--color-brown)]">
              Share Your Feedback
            </h3>
          </div>
          <p className="text-[var(--color-text-light)] mb-6">
            We value your opinion! Let us know how we can serve you better.
          </p>
          <div className="w-full">
            <FeedbackForm onSuccess={handleFeedbackSuccess} />
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[var(--color-text-light)] mb-4 italic">
              Or if you have a moment, please share your experience on Google!
            </p>
            <a
              href="https://www.google.com/maps/search/Lakshmi's+Ghumagumalu+Secunderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[var(--color-gold)] text-[var(--color-brown)] font-semibold hover:bg-[var(--color-gold)] hover:text-white transition-all shadow-md active:scale-95"
            >
              <Star className="w-5 h-5 text-[var(--color-gold)] fill-current" />
              <span>Review us on Google Maps</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />

      {/* Toast notification */}
      {showToast && (
        <div className="toast">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
