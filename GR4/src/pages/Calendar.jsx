import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  Newspaper,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Calendar() {
  const navItems = [
    { id: "home", label: "Home", icon: House, path: "/" },
    { id: "newsletter", label: "Newsletter", icon: Newspaper, path: "/newsletter" },
    { id: "calendar", label: "Calendar", icon: CalendarDays, path: "/calendar" },
  ];

  const months = [
    {
      label: "March 2026",
      days: Array.from({ length: 28 }, (_, index) => index + 1),
      events: {
        1: {
          title: "Pink Landscape Capsule",
          description:
            "This is a placeholder description of the capsule. In the final version, this area will display the user’s saved text or reflection associated with the selected capsule.",
          image:
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        },
        5: {
          title: "Work Day with Friends Capsule",
          description:
            "This is a placeholder description of the capsule. In the final version, this area will display the user’s saved text or reflection associated with the selected capsule.",
          image:
            "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
        },
        17: {
          title: "Flower Field Memory Capsule",
          description:
            "This is a placeholder description of the capsule. In the final version, this area will display the user’s saved text or reflection associated with the selected capsule.",
          image:
            "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=900&q=80",
        },
      },
    },
    {
      label: "April 2026",
      days: Array.from({ length: 28 }, (_, index) => index + 1),
      events: {
        3: {
          title: "Ocean Capsule",
          description:
            "This is a placeholder description of the capsule. In the final version, this area will display the user’s saved text or reflection associated with the selected capsule.",
          image:
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
        },
        12: {
          title: "City Lights Capsule",
          description:
            "This is a placeholder description of the capsule. In the final version, this area will display the user’s saved text or reflection associated with the selected capsule.",
          image:
            "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=900&q=80",
        },
        22: {
          title: "Golden Hour Capsule",
          description:
            "This is a placeholder description of the capsule. In the final version, this area will display the user’s saved text or reflection associated with the selected capsule.",
          image:
            "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=900&q=80",
        },
      },
    },
  ];

  const [monthIndex, setMonthIndex] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const currentMonth = months[monthIndex];

  const handlePrevious = () => {
    setMonthIndex((prev) => (prev === 0 ? months.length - 1 : prev - 1));
    setSelectedEvent(null);
  };

  const handleNext = () => {
    setMonthIndex((prev) => (prev === months.length - 1 ? 0 : prev + 1));
    setSelectedEvent(null);
  };

  const openEvent = (day, event) => {
    setSelectedEvent({
      ...event,
      date: `${currentMonth.label.split(" ")[0]} ${day}, ${currentMonth.label.split(" ")[1]}`,
    });
  };

  const closeEvent = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#2f2a26]">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col px-6 py-4 md:px-10">
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
                key={currentMonth.label}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="min-w-[220px] text-center text-2xl font-medium tracking-[0.22em] md:min-w-[320px] md:text-4xl"
              >
                {currentMonth.label}
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
              key={currentMonth.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-[30px] border border-[#ddd5ca] bg-white/90 p-4 shadow-[0_12px_40px_rgba(55,40,25,0.06)] md:p-6"
            >
              <div className="grid grid-cols-7 overflow-hidden rounded-[24px] border border-[#ddd5ca]">
                {currentMonth.days.map((day) => {
                  const event = currentMonth.events[day];

                  return (
                    <div
                      key={day}
                      className="relative min-h-[120px] border-b border-r border-[#e7dfd4] bg-[#fffdf9] p-2 md:min-h-[145px] md:p-3"
                    >
                      <div className="mb-2 text-right text-sm font-medium text-[#7a7269] md:text-base">
                        {day}
                      </div>

                      {event ? (
                        <button
                          type="button"
                          onClick={() => openEvent(day, event)}
                          className="w-full space-y-2 rounded-[14px] text-left transition hover:scale-[1.02]"
                        >
                          <div className="overflow-hidden rounded-[14px] border border-[#e1d8ce] bg-[#f3eee7] shadow-sm">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="h-14 w-full object-cover md:h-20"
                            />
                          </div>
                          <p className="line-clamp-2 text-xs leading-5 text-[#645c54] md:text-sm">
                            {event.title}
                          </p>
                        </button>
                      ) : (
                        <div className="h-full rounded-[14px] border border-dashed border-[#eee7de] bg-[#fcfaf6]" />
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.section>
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
                    alt={selectedEvent.title}
                    className="h-[240px] w-full object-cover md:h-[300px]"
                  />
                </div>

                <div className="mt-5 space-y-3">
                  <p className="text-sm uppercase tracking-[0.28em] text-[#8c837a]">
                    Saved Capsule
                  </p>

                  <h2 className="text-2xl font-semibold tracking-[0.08em] text-[#3b3531]">
                    {selectedEvent.title}
                  </h2>

                  <p className="text-base leading-8 text-[#5f5851]">
                    <span className="font-medium text-[#3b3531]">Date:</span>{" "}
                    {selectedEvent.date}
                  </p>

                  <p className="rounded-[22px] border border-dashed border-[#ddd5ca] bg-[#fcfaf6] px-4 py-3 text-sm leading-7 text-[#6e655d] md:text-[15px]">
                    {selectedEvent.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
