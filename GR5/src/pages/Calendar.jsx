import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  Newspaper,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  X,
  Images,
  Trash2,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const getLocalDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function Calendar() {
  const [capsules, setCapsules] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const navItems = [
    { id: "home", label: "Home", icon: House, path: "/" },
    { id: "newsletter", label: "Newsletter", icon: Newspaper, path: "/newsletter" },
    { id: "capsules", label: "Capsules", icon: Images, path: "/capsules" },
    { id: "calendar", label: "Calendar", icon: CalendarDays, path: "/calendar" },
  ];

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  useEffect(() => {
    const savedCapsules = JSON.parse(localStorage.getItem("wonderCapsules")) || [];

    const sortedCapsules = savedCapsules.sort((a, b) => {
      return new Date(b.createdAt || b.date) - new Date(a.createdAt || a.date);
    });

    setCapsules(sortedCapsules);
  }, []);

  const monthLabel = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

  const startingDayIndex = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const calendarDays = [
    ...Array.from({ length: startingDayIndex }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];

  const remainingCells = 42 - calendarDays.length;

  const fixedCalendarDays = [
    ...calendarDays,
    ...Array.from({ length: remainingCells }, () => null),
  ];

  const handlePrevious = () => {
    setCurrentDate((prevDate) => {
      return new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
    });

    setSelectedEvent(null);
  };

  const handleNext = () => {
    setCurrentDate((prevDate) => {
      return new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
    });

    setSelectedEvent(null);
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(`${dateString}T12:00:00`);

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCapsulesForDay = (day) => {
    if (!day) return [];

    const date = new Date(currentYear, currentMonth, day);
    const dateString = getLocalDateString(date);

    return capsules.filter((capsule) => capsule.date === dateString);
  };

  const openEvent = (capsule) => {
    setSelectedEvent(capsule);
  };

  const closeEvent = () => {
    setSelectedEvent(null);
  };

  const handleDeleteCapsule = () => {
    if (!selectedEvent) return;

    const confirmed = window.confirm("Are you sure you want to delete this capsule?");

    if (!confirmed) return;

    const updatedCapsules = capsules.filter((capsule) => {
      return capsule.id !== selectedEvent.id;
    });

    setCapsules(updatedCapsules);
    localStorage.setItem("wonderCapsules", JSON.stringify(updatedCapsules));
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#2f2a26]">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col px-6 pb-28 pt-4 md:px-10">
        <header className="pt-1 text-center">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <h1 className="text-xl font-semibold tracking-[0.28em] md:text-3xl">
              WONDERCAPSULE
            </h1>
          </motion.div>
        </header>

        <main className="flex-1 py-6">
          <div className="mx-auto max-w-6xl">
            <div className="mb-6 flex items-center justify-center gap-6">
              <button
                type="button"
                onClick={handlePrevious}
                className="grid h-12 w-12 place-items-center rounded-full border border-[#ddd5ca] bg-white text-[#5a534d] shadow-sm transition hover:bg-[#f3ede5]"
                aria-label="Previous month"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <motion.h2
                key={monthLabel}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="w-[260px] text-center text-2xl font-medium tracking-[0.18em] md:w-[420px] md:text-4xl md:tracking-[0.22em]"
              >
                {monthLabel}
              </motion.h2>

              <button
                type="button"
                onClick={handleNext}
                className="grid h-12 w-12 place-items-center rounded-full border border-[#ddd5ca] bg-white text-[#5a534d] shadow-sm transition hover:bg-[#f3ede5]"
                aria-label="Next month"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            <motion.section
              key={monthLabel}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-[30px] border border-[#ddd5ca] bg-white/90 p-4 shadow-[0_12px_40px_rgba(55,40,25,0.06)] md:p-6"
            >
              <div className="grid grid-cols-7 overflow-hidden rounded-t-[24px] border border-b-0 border-[#ddd5ca] bg-[#f6f2eb]">
                {weekDays.map((day) => (
                  <div
                    key={day}
                    className="border-r border-[#ddd5ca] px-2 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#7a7269] last:border-r-0 md:text-sm"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 overflow-hidden rounded-b-[24px] border border-[#ddd5ca]">
                {fixedCalendarDays.map((day, index) => {
                  const dayCapsules = getCapsulesForDay(day);
                  const hasCapsules = dayCapsules.length > 0;

                  return (
                    <div
                      key={`${monthLabel}-${index}`}
                      className={`relative min-h-[120px] border-b border-r border-[#e7dfd4] p-2 md:min-h-[145px] md:p-3 ${day ? "bg-[#fffdf9]" : "bg-[#f3eee7]"
                        }`}
                    >
                      {day ? (
                        <>
                          <div className="mb-2 text-right text-sm font-medium text-[#7a7269] md:text-base">
                            {day}
                          </div>

                          {hasCapsules ? (
                            <div className="space-y-2">
                              {dayCapsules.slice(0, 2).map((capsule) => (
                                <button
                                  key={capsule.id}
                                  type="button"
                                  onClick={() => openEvent(capsule)}
                                  className="w-full space-y-1 rounded-[14px] text-left transition hover:scale-[1.02]"
                                >
                                  <div className="overflow-hidden rounded-[14px] border border-[#e1d8ce] bg-[#f3eee7] shadow-sm">
                                    <img
                                      src={capsule.image}
                                      alt="Saved memory"
                                      className="h-12 w-full object-cover md:h-16"
                                    />
                                  </div>
                                </button>
                              ))}

                              {dayCapsules.length > 2 ? (
                                <p className="rounded-full bg-[#f6f2eb] px-2 py-1 text-center text-xs text-[#7a7269]">
                                  +{dayCapsules.length - 2} more
                                </p>
                              ) : null}
                            </div>
                          ) : (
                            <div className="h-[70px] rounded-[14px] border border-dashed border-[#eee7de] bg-[#fcfaf6] md:h-[90px]" />
                          )}
                        </>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </motion.section>
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

        <AnimatePresence>
          {selectedEvent ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#2f2a26]/45 px-4"
              onClick={closeEvent}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 10 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-xl rounded-[32px] border border-[#ddd5ca] bg-white p-5 shadow-[0_18px_60px_rgba(55,40,25,0.16)] md:p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={closeEvent}
                  className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[#ddd5ca] bg-[#faf8f4] text-[#5a534d] transition hover:bg-[#f2ece4]"
                  aria-label="Close popup"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="overflow-hidden rounded-[24px] border border-[#e1d8ce] bg-[#f3eee7]">
                  <img
                    src={selectedEvent.image}
                    alt="Saved memory"
                    className="h-[240px] w-full object-cover md:h-[300px]"
                  />
                </div>

                <div className="mt-5 space-y-3">
                  <p className="text-sm uppercase tracking-[0.28em] text-[#8c837a]">
                    Saved Capsule
                  </p>

                  <p className="text-base leading-8 text-[#5f5851]">
                    <span className="font-medium text-[#3b3531]">Date:</span>{" "}
                    {formatDisplayDate(selectedEvent.date)}
                  </p>

                  {selectedEvent.caption ? (
                    <p className="rounded-[22px] border border-dashed border-[#ddd5ca] bg-[#fcfaf6] px-4 py-3 text-sm leading-7 text-[#6e655d] md:text-[15px]">
                      {selectedEvent.caption}
                    </p>
                  ) : null}

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={handleDeleteCapsule}
                      className="flex items-center gap-2 rounded-full border border-[#ead7dc] bg-[#fff5f7] px-5 py-3 text-sm uppercase tracking-[0.18em] text-[#9a5c6b] transition hover:bg-[#ffe4ee]"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete Capsule
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
