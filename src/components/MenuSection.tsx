import { useState } from 'react';
import { UtensilsCrossed, Sparkles, Coffee, Heart, Check, Flame } from 'lucide-react';
import { MenuCategory, MenuItem } from '../types/wedding';

interface MenuSectionProps {
  menu?: MenuCategory[];
}

export default function MenuSection({ menu }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'non-veg' | 'veg' | 'sweet'>('all');

  if (!menu || menu.length === 0) return null;

  const filteredCategories = menu
    .filter((cat) => (activeCategory === 'all' ? true : cat.id === activeCategory))
    .map((cat) => {
      const filteredItems = cat.items.filter((item) => {
        if (dietFilter === 'all') return true;
        if (dietFilter === 'non-veg') return item.type === 'non-veg';
        if (dietFilter === 'veg') return item.type === 'veg';
        if (dietFilter === 'sweet') return item.type === 'sweet' || item.type === 'beverage';
        return true;
      });
      return { ...cat, items: filteredItems };
    })
    .filter((cat) => cat.items.length > 0);

  const getItemBadge = (type: MenuItem['type']) => {
    switch (type) {
      case 'non-veg':
        return (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-rose-400 border border-rose-500/40 px-1.5 py-0.5 rounded bg-rose-950/40">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            Halal Non-Veg
          </span>
        );
      case 'veg':
        return (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 border border-emerald-500/40 px-1.5 py-0.5 rounded bg-emerald-950/40">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Vegetarian
          </span>
        );
      case 'sweet':
        return (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-300 border border-amber-500/40 px-1.5 py-0.5 rounded bg-amber-950/40">
            <Sparkles className="w-2.5 h-2.5" />
            Shahi Sweet
          </span>
        );
      case 'beverage':
        return (
          <span className="flex items-center gap-1 text-[10px] font-semibold text-cyan-300 border border-cyan-500/40 px-1.5 py-0.5 rounded bg-cyan-950/40">
            <Coffee className="w-2.5 h-2.5" />
            Sharbat / Elixir
          </span>
        );
    }
  };

  return (
    <section id="menu" className="relative py-16 md:py-24 px-4 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-cinzel">
          Dastarkhwan-e-Khaas · المائدة الملكية
        </span>
        <h2 className="text-3xl md:text-5xl font-decorative text-gold-gradient font-bold mt-2">
          The Royal Banquet Feast
        </h2>
        <p className="mt-3 text-xs md:text-sm text-[#ebd9bf] max-w-2xl mx-auto font-serif leading-relaxed">
          In celebration of the sacred Nikah, we welcome you to partake in an opulent Mughal and Hyderabadi culinary spread, prepared with authentic herbs, royal saffron, and unconditional love.
        </p>
        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mt-4" />
      </div>

      {/* Filter Tabs Container */}
      <div className="flex flex-col items-center gap-4 mb-12">
        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 text-xs font-cinzel uppercase tracking-wider rounded-lg transition-all ${
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-[#dfb548] to-[#996e1b] text-[#12041d] font-bold shadow-md'
                : 'border border-[#d4af37]/30 text-[#e0cfb0] hover:border-[#f6e27a]'
            }`}
          >
            All Courses
          </button>
          {menu.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-cinzel uppercase tracking-wider rounded-lg transition-all ${
                activeCategory === cat.id
                  ? 'bg-gradient-to-r from-[#dfb548] to-[#996e1b] text-[#12041d] font-bold shadow-md'
                  : 'border border-[#d4af37]/30 text-[#e0cfb0] hover:border-[#f6e27a]'
              }`}
            >
              {cat.categoryName.split('(')[0]}
            </button>
          ))}
        </div>

        {/* Dietary Preferences Pill Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-[#1a072b]/80 border border-[#d4af37]/30 rounded-full text-xs">
          <button
            onClick={() => setDietFilter('all')}
            className={`px-3 py-1 rounded-full transition-colors ${
              dietFilter === 'all' ? 'bg-[#dfb548] text-[#170526] font-semibold' : 'text-[#d4af37] hover:text-white'
            }`}
          >
            Full Spread
          </button>
          <button
            onClick={() => setDietFilter('non-veg')}
            className={`px-3 py-1 rounded-full transition-colors ${
              dietFilter === 'non-veg' ? 'bg-rose-600 text-white font-semibold' : 'text-[#d4af37] hover:text-white'
            }`}
          >
            🍖 Halal Non-Veg
          </button>
          <button
            onClick={() => setDietFilter('veg')}
            className={`px-3 py-1 rounded-full transition-colors ${
              dietFilter === 'veg' ? 'bg-emerald-600 text-white font-semibold' : 'text-[#d4af37] hover:text-white'
            }`}
          >
            🥗 Vegetarian
          </button>
          <button
            onClick={() => setDietFilter('sweet')}
            className={`px-3 py-1 rounded-full transition-colors ${
              dietFilter === 'sweet' ? 'bg-amber-500 text-[#170526] font-semibold' : 'text-[#d4af37] hover:text-white'
            }`}
          >
            🍯 Desserts & Drinks
          </button>
        </div>
      </div>

      {/* Menu Categories Stream */}
      <div className="space-y-12">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="rounded-2xl border border-gold-glow bg-gradient-to-b from-[#250b3d]/90 via-[#1b062b]/95 to-[#240a3a]/90 p-6 md:p-10 shadow-2xl relative overflow-hidden"
          >
            {/* Top Arabic title banner */}
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#d4af37]/30 pb-4 mb-6">
              <div>
                <span className="text-[11px] font-cinzel text-[#dfb548] uppercase tracking-widest block mb-1">
                  Course Selection
                </span>
                <h3 className="text-2xl md:text-3xl font-cinzel font-bold text-[#fcedbb]">
                  {category.categoryName}
                </h3>
                <p className="text-xs text-[#ebd8bd] font-serif italic mt-1">
                  {category.subtitle}
                </p>
              </div>

              {category.categoryArabic && (
                <div className="font-arabic text-2xl md:text-3xl text-[#fce8a9]/75 font-bold mt-2 md:mt-0 text-right">
                  {category.categoryArabic}
                </div>
              )}
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {category.items.map((item, idx) => (
                <div
                  key={idx}
                  className={`group relative rounded-xl border p-4 transition-all duration-300 ${
                    item.highlight
                      ? 'border-[#dfb548]/70 bg-gradient-to-br from-[#2f1049]/90 to-[#200832]/90 shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:border-[#f6e27a]'
                      : 'border-[#d4af37]/25 bg-[#170524]/70 hover:border-[#d4af37]/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-cinzel text-base font-bold text-[#fcedbb] group-hover:text-[#fff] transition-colors">
                        {item.name}
                      </h4>
                      {item.highlight && (
                        <span className="flex items-center gap-0.5 text-[9px] font-cinzel uppercase tracking-wider text-[#160424] bg-gradient-to-r from-[#fcedbb] to-[#dfb548] px-1.5 py-0.5 rounded font-bold">
                          <Flame className="w-2.5 h-2.5" />
                          Signature
                        </span>
                      )}
                    </div>
                    {getItemBadge(item.type)}
                  </div>

                  <p className="text-xs text-[#ebd5ba] font-serif leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Hospitality & Dietary Assurance Footer Card */}
      <div className="mt-12 rounded-xl border border-[#d4af37]/30 bg-[#1e0830]/90 p-5 text-center text-xs md:text-sm text-[#ebd7bd] shadow-lg max-w-3xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-full border border-[#d4af37] bg-[#dfb548]/15 flex items-center justify-center text-[#f6e27a] shrink-0">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <div>
            <p className="font-cinzel font-bold text-[#fcedbb]">
              100% Zabiha Halal & Dedicated Vegetarian Service
            </p>
            <p className="text-xs text-[#d4af37]/80 font-serif">
              Separate service stations with designated vegetarian chefs and crystal glassware.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-cinzel text-[#fce8a9]">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Bismillah & Welcome!</span>
        </div>
      </div>
    </section>
  );
}
