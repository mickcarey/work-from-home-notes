import { useState, useEffect, useCallback, useRef } from 'react';
import type { ComponentType, SVGProps, TouchEvent as ReactTouchEvent } from 'react';

type IconProps = { className?: string };
type Icon = ComponentType<IconProps>;

const svgBase: SVGProps<SVGSVGElement> = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const ChevronLeft: Icon = ({ className }) => (
  <svg className={className} {...svgBase}>
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const ChevronRight: Icon = ({ className }) => (
  <svg className={className} {...svgBase}>
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const Shuffle: Icon = ({ className }) => (
  <svg className={className} {...svgBase}>
    <polyline points="16 3 21 3 21 8"></polyline>
    <line x1="4" y1="20" x2="21" y2="3"></line>
    <polyline points="21 16 21 21 16 21"></polyline>
    <line x1="15" y1="15" x2="21" y2="21"></line>
    <line x1="4" y1="4" x2="9" y2="9"></line>
  </svg>
);

const Home: Icon = ({ className }) => (
  <svg className={className} {...svgBase}>
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const Briefcase: Icon = ({ className }) => (
  <svg className={className} {...svgBase}>
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
  </svg>
);

const Users: Icon = ({ className }) => (
  <svg className={className} {...svgBase}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const TrendingUp: Icon = ({ className }) => (
  <svg className={className} {...svgBase}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
    <polyline points="17 6 23 6 23 12"></polyline>
  </svg>
);

const Coffee: Icon = ({ className }) => (
  <svg className={className} {...svgBase}>
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
    <line x1="6" y1="1" x2="6" y2="4"></line>
    <line x1="10" y1="1" x2="10" y2="4"></line>
    <line x1="14" y1="1" x2="14" y2="4"></line>
  </svg>
);

const Heart: Icon = ({ className }) => (
  <svg className={className} {...svgBase}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const DollarSign: Icon = ({ className }) => (
  <svg className={className} {...svgBase}>
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

type Source = { label: string; url: string };

type Card = {
  id: string;
  icon: Icon;
  category: string;
  question: string;
  answer: string;
  anchor: string;
  color: string;
  sources?: Source[];
};

const cards: Card[] = [
  {
    id: 'fairness',
    icon: Home,
    category: 'Fairness',
    question: "It's not fair that some employees work from home while others have to come in.",
    answer: "Fairness isn't about identical treatment - it's about matching flexibility to the role. Just like we pay different salaries for different responsibilities, flexibility reflects the nature of the job.",
    anchor: "Role-based flexibility is fair. One-size-fits-all isn't.",
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'productivity',
    icon: TrendingUp,
    category: 'Productivity',
    question: "People are more productive in the office.",
    answer: "The data doesn't support that. Stanford and Gallup studies show remote workers are equally or more productive. Commuting doesn't add value - it subtracts time and energy.",
    anchor: "Productivity comes from focus, not postcode.",
    color: 'from-green-500 to-emerald-500',
    sources: [
      { label: 'Stanford / Nature (Bloom, 2024)', url: 'https://www.nature.com/articles/d41586-024-01763-5' },
      { label: 'Stanford SIEPR study', url: 'https://siepr.stanford.edu/news/hybrid-work-win-win-win-companies-workers-study-finds' },
      { label: 'Gallup: Remote Work', url: 'https://www.gallup.com/topic/remote-work.aspx' },
    ],
  },
  {
    id: 'culture',
    icon: Users,
    category: 'Culture',
    question: "We need people in the office to build culture.",
    answer: "Culture isn't built by proximity - it's built on trust, values, and clear communication. Companies like GitLab, Automattic, and Zapier have thriving cultures without mandatory office time.",
    anchor: "Culture is built by how we work, not where we work.",
    color: 'from-purple-500 to-pink-500',
    sources: [
      { label: 'GitLab All-Remote Handbook', url: 'https://handbook.gitlab.com/handbook/company/culture/all-remote/' },
    ],
  },
  {
    id: 'ceo',
    icon: Briefcase,
    category: 'CEO Preference',
    question: "I just prefer everyone in the office - it's better for the company.",
    answer: "Leadership isn't about personal preference. It's about designing for what works best for the organisation. The data consistently supports flexible models - not blanket mandates.",
    anchor: "Good leadership separates preference from strategy.",
    color: 'from-orange-500 to-red-500',
    sources: [
      { label: 'Stanford: Hybrid is a win-win-win', url: 'https://news.stanford.edu/stories/2024/06/hybrid-work-is-a-win-win-win-for-companies-workers' },
    ],
  },
  {
    id: 'collaboration',
    icon: Coffee,
    category: 'Collaboration & Innovation',
    question: "We collaborate better face to face.",
    answer: "In-person time works best when it's intentional - not forced. Hybrid models that use office time for deep collaboration outperform rigid attendance rules.",
    anchor: "Purpose beats presence.",
    color: 'from-amber-500 to-yellow-500',
  },
  {
    id: 'morale',
    icon: Heart,
    category: 'Equity & Morale',
    question: "But won't this hurt morale if some teams are remote?",
    answer: "People are more engaged when trusted with autonomy. Forcing unnecessary attendance lowers morale, especially when it feels arbitrary. Respecting role-specific flexibility shows trust.",
    anchor: "Trust builds morale. Mandates erode it.",
    color: 'from-rose-500 to-pink-500',
  },
  {
    id: 'trends',
    icon: TrendingUp,
    category: 'Trends',
    question: "Big companies are bringing people back - we should too.",
    answer: "And many world-class companies - GitLab, Atlassian, Spotify, Airbnb, Dropbox - are thriving with flexible and remote-first models. Following trends isn't strategy. Data and culture are.",
    anchor: "Don't follow trends. Follow what works.",
    color: 'from-indigo-500 to-purple-500',
    sources: [
      { label: 'GitLab All-Remote Handbook', url: 'https://handbook.gitlab.com/handbook/company/culture/all-remote/' },
      { label: 'Atlassian Team Anywhere', url: 'https://www.atlassian.com/solutions/distributed' },
      { label: 'Atlassian: 1,000 Days of Distributed', url: 'https://www.atlassian.com/blog/distributed-work/distributed-work-report' },
    ],
  },
  {
    id: 'sunk-cost',
    icon: DollarSign,
    category: 'Sunk Cost',
    question: "We're already paying for office space - we need to get our money's worth.",
    answer: "That's the sunk cost fallacy. The lease is paid whether desks are full or empty. Forcing people into the office doesn't recoup costs - it just adds new ones: lower productivity, higher turnover, and burnt-out talent. The question isn't 'how do we use the space?' - it's 'how do we use our people best?'",
    anchor: "Throwing good money after bad doesn't make the bad money good.",
    color: 'from-teal-500 to-cyan-500',
  },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flipCount, setFlipCount] = useState(0);
  const [slideDirection, setSlideDirection] = useState('');
  const [buttonPress, setButtonPress] = useState('');

  const currentCard = cards[currentIndex]!;
  const Icon = currentCard.icon;

  useEffect(() => {
    if (slideDirection) {
      const timer = setTimeout(() => setSlideDirection(''), 400);
      return () => clearTimeout(timer);
    }
  }, [slideDirection]);

  useEffect(() => {
    if (buttonPress) {
      const timer = setTimeout(() => setButtonPress(''), 200);
      return () => clearTimeout(timer);
    }
  }, [buttonPress]);

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setSlideDirection('slide-in-right');
    setButtonPress('next');
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  }, []);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setSlideDirection('slide-in-left');
    setButtonPress('prev');
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }, []);

  const handleShuffle = useCallback(() => {
    setIsFlipped(false);
    setSlideDirection('slide-in-right');
    setButtonPress('shuffle');
    setCurrentIndex((prev) => {
      if (cards.length <= 1) return prev;
      let next = prev;
      while (next === prev) next = Math.floor(Math.random() * cards.length);
      return next;
    });
  }, []);

  const lastSwipeTimeRef = useRef(0);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const minSwipeDistance = 50;
  const swipeClickGuardMs = 300;

  const handleFlip = () => {
    if (Date.now() - lastSwipeTimeRef.current < swipeClickGuardMs) return;
    setIsFlipped((prev) => !prev);
    setFlipCount((prev) => prev + 1);
  };

  const onTouchStart = (e: ReactTouchEvent) => {
    touchEndXRef.current = null;
    touchStartXRef.current = e.targetTouches[0]!.clientX;
  };

  const onTouchMove = (e: ReactTouchEvent) => {
    touchEndXRef.current = e.targetTouches[0]!.clientX;
  };

  const onTouchEnd = () => {
    const start = touchStartXRef.current;
    const end = touchEndXRef.current;
    if (start === null || end === null) return;
    const distance = start - end;
    if (distance > minSwipeDistance) {
      lastSwipeTimeRef.current = Date.now();
      handleNext();
    } else if (distance < -minSwipeDistance) {
      lastSwipeTimeRef.current = Date.now();
      handlePrev();
    }
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [handlePrev, handleNext]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl float-1"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl float-2"></div>
        <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-teal-500/20 rounded-full blur-3xl float-3"></div>
        <div className="absolute bottom-40 right-1/3 w-48 h-48 bg-pink-500/25 rounded-full blur-3xl pulse-glow"></div>
        <div className="absolute top-1/3 right-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl float-4"></div>
        <div className="absolute top-1/2 left-1/3 w-52 h-52 bg-cyan-500/15 rounded-full blur-3xl float-1" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="max-w-4xl w-full relative z-10">
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 md:mb-3">
            The "Back to Office" Playbook
          </h1>
          <p className="text-slate-400 text-base md:text-lg mb-3 md:mb-4">
            Because "just because" isn't a strategy
          </p>
          <p className="text-slate-500 text-xs md:text-sm max-w-2xl mx-auto px-4">
            These are my personal views.<br />If my employer decides on an office mandate,
            I will respect and support that decision.
          </p>
          {flipCount > 20 && (
            <p className="text-slate-500 text-xs md:text-sm mt-2 italic">
              (You've flipped {flipCount} times. Someone's doing their homework.)
            </p>
          )}
        </div>

        <div
          className="perspective-1000 mb-4 md:mb-6 select-none touch-pan-y"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div
            key={currentIndex}
            onClick={handleFlip}
            className={`relative w-full h-[500px] md:h-[450px] cursor-pointer transition-transform duration-500 transform-style-3d ${slideDirection}`}
            style={{
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            <div
              className="absolute inset-0 backface-hidden rounded-2xl shadow-2xl overflow-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className={`h-full bg-gradient-to-br ${currentCard.color} p-6 md:p-8 flex flex-col justify-between`}>
                <div>
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className="bg-white/20 p-2 md:p-3 rounded-lg backdrop-blur-sm">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <span className="text-white/90 font-semibold text-base md:text-lg">
                      {currentCard.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                    "{currentCard.question}"
                  </h2>
                </div>
                <div className="text-white/70 text-xs md:text-sm flex items-center gap-2">
                  <span>Click to flip</span>
                  <span className="animate-pulse">→</span>
                </div>
              </div>
            </div>

            <div
              className="absolute inset-0 backface-hidden rounded-2xl shadow-2xl overflow-hidden bg-white"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="h-full p-6 md:p-8 flex flex-col overflow-y-auto custom-scrollbar">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4 md:mb-6">
                    <div className={`bg-gradient-to-br ${currentCard.color} p-2 md:p-3 rounded-lg flex-shrink-0`}>
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <span className={`bg-gradient-to-r ${currentCard.color} bg-clip-text text-transparent font-semibold text-base md:text-lg`}>
                      {currentCard.category}
                    </span>
                  </div>
                  <p className="text-slate-700 text-lg md:text-2xl leading-relaxed mb-4 md:mb-6">
                    {currentCard.answer}
                  </p>
                  <div className="bg-slate-100 rounded-lg p-3 md:p-4 border-l-4 border-slate-400">
                    <p className="text-slate-600 font-medium italic text-sm md:text-base">
                      ⚓ {currentCard.anchor}
                    </p>
                  </div>
                  {currentCard.sources && currentCard.sources.length > 0 && (
                    <div className="mt-3 md:mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="text-slate-500 text-xs md:text-sm font-semibold">Sources:</span>
                      {currentCard.sources.map((source, i) => (
                        <a
                          key={i}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs md:text-sm text-blue-600 hover:text-blue-800 underline"
                        >
                          {source.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
                <div className="text-slate-400 text-xs md:text-sm flex items-center gap-2 mt-4 flex-shrink-0">
                  <span>Click to flip back</span>
                  <span className="animate-pulse">↻</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 md:gap-4">
          <button
            onClick={handlePrev}
            className={`bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-lg transition-all hover:scale-105 backdrop-blur-sm ${buttonPress === 'prev' ? 'button-press' : ''}`}
            aria-label="Previous card"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <div className="flex-1 flex items-center justify-center gap-2 md:gap-4">
            <button
              onClick={handleShuffle}
              className={`bg-white/10 hover:bg-white/20 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg transition-all hover:scale-105 hover:rotate-3 backdrop-blur-sm flex items-center gap-2 ${buttonPress === 'shuffle' ? 'button-press' : ''}`}
            >
              <Shuffle className="w-4 h-4 md:w-5 md:h-5" />
              <span className="hidden sm:inline text-sm md:text-base">Surprise me</span>
            </button>
            <div className="text-white/60 text-xs md:text-sm">
              {currentIndex + 1} / {cards.length}
            </div>
          </div>

          <button
            onClick={handleNext}
            className={`bg-white/10 hover:bg-white/20 text-white p-3 md:p-4 rounded-lg transition-all hover:scale-105 backdrop-blur-sm ${buttonPress === 'next' ? 'button-press' : ''}`}
            aria-label="Next card"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <p className="text-slate-500 text-xs md:text-sm px-4">
            Built with data, not vibes. Though the vibes are pretty good too.
          </p>
          <p className="text-slate-600 text-xs mt-2">
            Built by{' '}
            <a
              href="https://www.anthropic.com/claude"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-slate-400 transition-colors"
            >
              Claude
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
