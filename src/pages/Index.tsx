import { useEffect, useMemo, useState } from 'react';
import Icon from '@/components/ui/icon';

const SALE_DURATION = 12 * 60 * 60; // 12 часов в секундах
const STORAGE_KEY = 'hochu_sale_deadline';

const useCountdown = () => {
  const deadline = useMemo(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const value = parseInt(saved, 10);
      if (!Number.isNaN(value) && value > Date.now()) return value;
    }
    const fresh = Date.now() + SALE_DURATION * 1000;
    localStorage.setItem(STORAGE_KEY, String(fresh));
    return fresh;
  }, []);

  const [remaining, setRemaining] = useState(() =>
    Math.max(0, Math.floor((deadline - Date.now()) / 1000)),
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setRemaining(Math.max(0, Math.floor((deadline - Date.now()) / 1000)));
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  const hours = String(Math.floor(remaining / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
  const seconds = String(remaining % 60).padStart(2, '0');

  return { hours, minutes, seconds, expired: remaining <= 0 };
};

const Star = ({ style }: { style: React.CSSProperties }) => (
  <span className="star" style={style} />
);

const Index = () => {
  const { hours, minutes, seconds, expired } = useCountdown();

  const stars = useMemo(
    () =>
      Array.from({ length: 90 }).map((_, i) => {
        const size = Math.random() * 2.4 + 0.6;
        return {
          id: i,
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${Math.random() * 3 + 2}s`,
        };
      }),
    [],
  );

  const meteors = useMemo(
    () =>
      Array.from({ length: 9 }).map((_, i) => ({
        id: i,
        top: `${Math.random() * 40 - 20}%`,
        left: `${Math.random() * 100 + 20}%`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${Math.random() * 4 + 4}s`,
      })),
    [],
  );

  return (
    <div className="relative min-h-screen overflow-hidden night-sky font-body text-gold-light">
      {/* Звёзды */}
      <div className="stars">
        {stars.map((s) => (
          <Star
            key={s.id}
            style={{
              top: s.top,
              left: s.left,
              width: s.width,
              height: s.height,
              animationDelay: s.animationDelay,
              animationDuration: s.animationDuration,
            }}
          />
        ))}
        {/* Метеоритный дождь */}
        {meteors.map((m) => (
          <span
            key={m.id}
            className="meteor"
            style={{
              top: m.top,
              left: m.left,
              animationDelay: m.animationDelay,
              animationDuration: m.animationDuration,
            }}
          />
        ))}
      </div>

      {/* Лунное свечение */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet/20 blur-[120px]" />

      {/* Контент */}
      <main className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-white/5 px-5 py-2 text-xs uppercase tracking-[0.3em] text-gold backdrop-blur-sm">
            <Icon name="Sparkles" size={14} />
            Тайные знания доступны сейчас
          </div>
        </div>

        <h1
          className="animate-fade-in-up mb-4 max-w-4xl font-display text-6xl font-600 italic leading-none text-shadow-gold opacity-0 sm:text-7xl md:text-8xl"
          style={{ animationDelay: '0.3s' }}
        >
          Я хочу<span className="text-gold">...</span>
        </h1>

        <p
          className="animate-fade-in-up mb-8 max-w-xl font-display text-2xl font-500 italic text-gold-light/90 opacity-0 sm:text-3xl"
          style={{ animationDelay: '0.5s' }}
        >
          Пошаговый практикующий курс по исполнению твоих желаний
        </p>

        <div
          className="animate-fade-in-up mb-12 max-w-xl space-y-4 text-sm leading-relaxed text-gold-light/70 opacity-0 sm:text-base"
          style={{ animationDelay: '0.65s' }}
        >
          <p>
            Чувствуешь, как мгновения ускользают сквозь пальцы? Если ты не
            сделаешь этот шаг сейчас, твоя мечта так и останется призраком в ночи.
          </p>
          <p className="font-display text-lg italic text-gold-light/90 sm:text-xl">
            Мир — это зеркало твоих глубинных убеждений. Твои желания не просто
            мечты, это архитектура твоей новой жизни.
          </p>
          <p>
            Не занимайся визуализацией ради надежды. Познай проверенные
            инструменты влияния на событийный ряд. Ты начнёшь притягивать ресурсы
            и обстоятельства так, словно сама Вселенная ждала твоей команды.
          </p>
        </div>

        {/* Кнопки */}
        <div
          className="animate-fade-in-up flex w-full max-w-md flex-col items-center gap-5 opacity-0"
          style={{ animationDelay: '0.85s' }}
        >
          <a
            href="https://pro.selfwork.ru/kassa/kyrs_hochu"
            className="animate-glow-pulse group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-gold to-gold-light px-8 py-5 font-body text-lg font-700 uppercase tracking-wider text-night-deep transition-transform hover:scale-[1.03]"
          >
            <Icon name="Flame" size={22} />
            Пробудить силу
          </a>

          {!expired && (
            <a
              href="https://pro.selfwork.ru/kassa/kurs_stock"
              className="group relative flex w-full flex-col items-center gap-1 overflow-hidden rounded-2xl border border-violet/60 bg-royal/40 px-8 py-4 backdrop-blur-md transition-all hover:border-violet hover:bg-royal/60 hover:scale-[1.03]"
            >
              <span className="flex items-center gap-2 font-body text-base font-700 uppercase tracking-wider text-gold-light">
                <Icon name="Gift" size={18} />
                Скидка
              </span>
              <span className="font-mono text-2xl font-600 tabular-nums tracking-widest text-white">
                {hours}:{minutes}:{seconds}
              </span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-gold-light/50">
                до конца предложения
              </span>
            </a>
          )}
        </div>
      </main>

      {/* Футер */}
      <footer className="relative z-10 pb-8 text-center text-xs text-gold-light/50">
        <div className="mb-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a href="https://cdn.poehali.dev/projects/367338d0-0330-4f92-a349-8653c9326a6f/bucket/1c266fae-958a-4e73-92b6-62f26f545ed1.pdf" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
            Политика конфиденциальности
          </a>
          <span className="text-gold-light/20">•</span>
          <a href="https://cdn.poehali.dev/projects/367338d0-0330-4f92-a349-8653c9326a6f/bucket/c9a7365d-40ee-411d-820c-7367aa90e62b.pdf" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-gold">
            Оферта
          </a>
        </div>
        <p className="text-gold-light/40">
          Контакты:{' '}
          <a
            href="mailto:infomagz25@gmail.com"
            className="text-gold-light/70 transition-colors hover:text-gold"
          >
            infomagz25@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Index;