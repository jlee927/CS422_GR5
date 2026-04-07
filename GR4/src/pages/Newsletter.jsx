import { motion } from "framer-motion";
import { House, Newspaper, CalendarDays } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Newsletter() {
  const navItems = [
    { id: "home", label: "Home", icon: House, path: "/" },
    { id: "newsletter", label: "Newsletter", icon: Newspaper, path: "/newsletter" },
    { id: "calendar", label: "Calendar", icon: CalendarDays, path: "/calendar" },
  ];

  const articles = [
    {
      id: 1,
      title: "Mountain Morning Capsule",
      body:
        "A soft sunrise palette, quiet landscapes, and warm colors set the tone for this week’s creative capsule. This placeholder article stands in for curated inspiration and newsletter content.",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 2,
      title: "City Story Collection",
      body:
        "This section previews another featured capsule with placeholder text. In the final prototype, this area can highlight user stories, new collections, or community updates tied to the WonderCapsule experience.",
      image:
        "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 3,
      title: "Weekend Reflection",
      body:
        "A lighter card for quick reading and scanning. It uses realistic layout spacing and visual hierarchy, while the written content remains intentionally shallow for the GR4 prototype stage.",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#2f2a26]">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col px-6 py-4 md:px-10">
        <header className="pt-1 text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-center gap-4 text-[#a9a094]">
              <span className="text-2xl">≪</span>
              <h1 className="text-xl font-semibold tracking-[0.28em] md:text-2xl">
                WONDERCAPSULE
              </h1>
              <span className="text-2xl">≫</span>
            </div>
            <h2 className="text-2xl font-medium tracking-[0.26em] md:text-4xl">
              NEWSLETTER
            </h2>
          </motion.div>
        </header>

        <main className="flex-1 py-5">
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col gap-6">
              {[articles[0], articles[2]].map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.08 }}
                  className="rounded-[28px] border border-[#ddd5ca] bg-white/90 p-5 shadow-[0_12px_40px_rgba(55,40,25,0.06)]"
                >
                  <div className="grid grid-cols-[110px_minmax(0,1fr)] items-start gap-5 md:grid-cols-[130px_minmax(0,1fr)]">
                    <div className="overflow-hidden rounded-[20px] border border-[#e1d8ce] bg-[#f3eee7] shadow-sm">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="h-[110px] w-full object-cover md:h-[130px]"
                      />
                    </div>

                    <div className="space-y-3 pt-1">
                      <h3 className="text-lg font-semibold tracking-[0.08em] text-[#3b3531] md:text-xl">
                        {article.title}
                      </h3>
                      <div className="space-y-2 text-sm leading-7 text-[#6e655d] md:text-[15px]">
                        <p>{article.body}</p>
                        <p>
                          Placeholder subtext for article preview, summary, and
                          additional reading details.
                        </p>
                        <p>
                          More placeholder copy can be swapped with final
                          newsletter content later.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="flex items-start justify-center">
              <motion.article
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: 0.08 }}
                className="w-full max-w-[620px] rounded-[30px] border border-[#ddd5ca] bg-white/90 p-6 shadow-[0_12px_40px_rgba(55,40,25,0.06)]"
              >
                <div className="grid grid-cols-[minmax(0,1fr)_140px] items-center gap-6 md:grid-cols-[minmax(0,1fr)_170px]">
                  <div className="order-1 space-y-4">
                    <h3 className="text-xl font-semibold tracking-[0.1em] text-[#3b3531] md:text-2xl">
                      {articles[1].title}
                    </h3>
                    <div className="space-y-3 text-sm leading-8 text-[#6e655d] md:text-[15px]">
                      <p>{articles[1].body}</p>
                      <p>
                        Placeholder text continues here to simulate realistic
                        reading length for the prototype and support visual
                        evaluation.
                      </p>
                      <p>
                        This section can later connect to dynamic content, saved
                        capsules, or editorial updates.
                      </p>
                    </div>
                  </div>

                  <div className="order-2 overflow-hidden rounded-[22px] border border-[#e1d8ce] bg-[#f3eee7] shadow-sm">
                    <img
                      src={articles[1].image}
                      alt={articles[1].title}
                      className="h-[150px] w-full object-cover md:h-[190px]"
                    />
                  </div>
                </div>
              </motion.article>
            </div>
          </div>
        </main>

        <footer className="mt-auto pb-2 pt-2">
          <nav className="grid grid-cols-3 items-center border-t border-[#ddd5ca] pt-3 text-center">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className="flex flex-col items-center justify-center gap-2 py-2 text-base uppercase tracking-[0.22em] text-[#5a534d]"
                >
                  {({ isActive }) => (
                    <>
                      <Icon className="h-5 w-5" />
                      {isActive ? (
                        <span className="rounded-md border border-[#bdb3a8] bg-white px-4 py-1 shadow-sm">
                          {item.label}
                        </span>
                      ) : (
                        <span>{item.label}</span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </footer>
      </div>
    </div>
  );
}
