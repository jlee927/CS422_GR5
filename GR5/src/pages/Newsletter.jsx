import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { House, Newspaper, CalendarDays, Images } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Newsletter() {
  const [capsules, setCapsules] = useState([]);

  const navItems = [
    { id: "home", label: "Home", icon: House, path: "/" },
    { id: "newsletter", label: "Newsletter", icon: Newspaper, path: "/newsletter" },
    { id: "capsules", label: "Capsules", icon: Images, path: "/capsules" },
    { id: "calendar", label: "Calendar", icon: CalendarDays, path: "/calendar" },
  ];

  useEffect(() => {
    const savedCapsules = JSON.parse(localStorage.getItem("wonderCapsules")) || [];

    const sortedCapsules = savedCapsules.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    setCapsules(sortedCapsules);
  }, []);

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "No date";

    const date = new Date(`${dateString}T12:00:00`);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getLocalDateString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const getCurrentMonthCapsules = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const currentMonthPrefix = `${year}-${month}`;

    return capsules.filter((capsule) => {
      return capsule.date?.startsWith(currentMonthPrefix);
    });
  };

  const recentCapsules = getCurrentMonthCapsules();

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#2f2a26]">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col px-6 pb-28 pt-4 md:px-10">
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

            <p className="text-sm uppercase tracking-[0.22em] text-[#8c837a]">
              Current Month
            </p>
          </motion.div>
        </header>

        <main className="flex-1 py-5">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
            {recentCapsules.length > 0 ? (
              recentCapsules.map((capsule, index) => {
                const imageOnRight = index % 2 === 1;

                return (
                  <motion.article
                    key={capsule.id}
                    initial={{ opacity: 0, x: imageOnRight ? 18 : -18 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.08 }}
                    className="rounded-[30px] border border-[#ddd5ca] bg-white/90 p-4 shadow-[0_12px_40px_rgba(55,40,25,0.06)] md:h-[330px] md:p-5"
                  >
                    <div className="flex flex-col gap-5 md:h-full md:flex-row md:items-stretch md:gap-6">
                      <div
                        className={`overflow-hidden rounded-[24px] border border-[#e1d8ce] bg-[#f3eee7] shadow-sm md:basis-[58%] ${imageOnRight ? "md:order-2" : "md:order-1"
                          }`}
                      >
                        <img
                          src={capsule.image}
                          alt={`Memory from ${formatDisplayDate(capsule.date)}`}
                          className="h-[220px] w-full object-cover md:h-full md:min-h-[280px]"
                        />
                      </div>

                      <div
                        className={`flex flex-col justify-center space-y-3 rounded-[22px] border border-[#e8e0d5] bg-[#fcfaf6] px-4 py-4 md:h-full md:basis-[42%] md:px-5 ${imageOnRight ? "md:order-1" : "md:order-2"
                          }`}
                      >
                        <p className="text-lg font-semibold tracking-[0.08em] text-[#3b3531] md:text-xl">
                          {formatDisplayDate(capsule.date)}
                        </p>

                        <p className="text-sm leading-7 text-[#6e655d] md:text-[15px]">
                          {capsule.caption || "No caption added."}
                        </p>
                      </div>
                    </div>
                  </motion.article>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mx-auto mt-8 w-full max-w-2xl rounded-[30px] border border-[#ddd5ca] bg-white/90 px-6 py-10 text-center shadow-[0_12px_40px_rgba(55,40,25,0.06)]"
              >
                <p className="text-lg font-medium tracking-[0.18em] text-[#3b3531]">
                  NO MEMORIES YET
                </p>

                <p className="mt-3 text-sm leading-7 text-[#6e655d]">
                  Create a capsule from the home page, and it will appear here in
                  your newsletter feed if it was created within the last 30 days.
                </p>
              </motion.div>
            )}
          </div>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#ddd5ca] bg-[#f8f6f2]/95 px-6 py-2 backdrop-blur md:px-10">
          <nav className="mx-auto grid max-w-[1400px] grid-cols-4 items-center text-center">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className="flex flex-col items-center justify-center gap-2 py-2 text-xs uppercase tracking-[0.16em] text-[#5a534d] md:text-base md:tracking-[0.22em]"
                >
                  {({ isActive }) => (
                    <>
                      <Icon className="h-5 w-5" />
                      {isActive ? (
                        <span className="rounded-md border border-[#bdb3a8] bg-white px-3 py-1 shadow-sm md:px-4">
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
