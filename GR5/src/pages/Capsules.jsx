import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  Newspaper,
  CalendarDays,
  Images,
  Search,
  X,
  Trash2,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Capsules() {
  const [capsules, setCapsules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [selectedCapsule, setSelectedCapsule] = useState(null);

  const navItems = [
    { id: "home", label: "Home", icon: House, path: "/" },
    { id: "newsletter", label: "Newsletter", icon: Newspaper, path: "/newsletter" },
    { id: "capsules", label: "Capsules", icon: Images, path: "/capsules" },
    { id: "calendar", label: "Calendar", icon: CalendarDays, path: "/calendar" },
  ];

  useEffect(() => {
    const savedCapsules = JSON.parse(localStorage.getItem("wonderCapsules")) || [];
    setCapsules(savedCapsules);
  }, []);

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "No date";

    const date = new Date(`${dateString}T12:00:00`);

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDeleteCapsule = () => {
    if (!selectedCapsule) return;

    const confirmed = window.confirm("Are you sure you want to delete this capsule?");

    if (!confirmed) return;

    const updatedCapsules = capsules.filter((capsule) => {
      return capsule.id !== selectedCapsule.id;
    });

    setCapsules(updatedCapsules);
    localStorage.setItem("wonderCapsules", JSON.stringify(updatedCapsules));
    setSelectedCapsule(null);
  };

  const filteredCapsules = capsules
    .filter((capsule) => {
      const caption = capsule.caption || "";
      const date = capsule.date || "";

      return (
        caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
        date.includes(searchTerm)
      );
    })
    .sort((a, b) => {
      if (sortOrder === "oldest") {
        return new Date(a.date) - new Date(b.date);
      }

      return new Date(b.date) - new Date(a.date);
    });

  const closeCapsule = () => {
    setSelectedCapsule(null);
  };

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
              CAPSULES
            </h2>

            <p className="text-sm uppercase tracking-[0.22em] text-[#8c837a]">
              Full Memory Archive
            </p>
          </motion.div>
        </header>

        <main className="flex-1 py-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="mb-6 grid gap-4 rounded-[28px] border border-[#ddd5ca] bg-white/90 p-4 shadow-[0_12px_40px_rgba(55,40,25,0.06)] md:grid-cols-[1fr_220px] md:p-5">
              <div className="flex items-center gap-3 rounded-full border border-[#ddd5ca] bg-[#fcfaf6] px-4 py-3">
                <Search className="h-5 w-5 text-[#8c837a]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by caption or date... (mm/dd)"
                  className="w-full bg-transparent text-base text-[#4d4640] outline-none placeholder:text-[#9d958c]"
                />
              </div>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="rounded-full border border-[#ddd5ca] bg-[#fcfaf6] py-3 pl-4 pr-10 text-[#4d4640] outline-none transition focus:border-[#c9b8ab]"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>

            {filteredCapsules.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredCapsules.map((capsule, index) => (
                  <motion.button
                    key={capsule.id}
                    type="button"
                    onClick={() => setSelectedCapsule(capsule)}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, delay: index * 0.04 }}
                    className="group overflow-hidden rounded-[30px] border border-[#ddd5ca] bg-white/90 p-4 text-left shadow-[0_12px_40px_rgba(55,40,25,0.06)] transition hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(55,40,25,0.1)]"
                  >
                    <div className="overflow-hidden rounded-[24px] border border-[#e1d8ce] bg-[#f3eee7]">
                      <img
                        src={capsule.image}
                        alt="Saved capsule"
                        className="h-[220px] w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="mt-4 space-y-3 rounded-[22px] border border-[#e8e0d5] bg-[#fcfaf6] px-4 py-4">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a7269]">
                        {formatDisplayDate(capsule.date)}
                      </p>

                      <p className="line-clamp-3 text-sm leading-7 text-[#6e655d]">
                        {capsule.caption || "No caption added."}
                      </p>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="mx-auto mt-8 w-full max-w-2xl rounded-[30px] border border-[#ddd5ca] bg-white/90 px-6 py-10 text-center shadow-[0_12px_40px_rgba(55,40,25,0.06)]"
              >
                <p className="text-lg font-medium tracking-[0.18em] text-[#3b3531]">
                  NO CAPSULES FOUND
                </p>

                <p className="mt-3 text-sm leading-7 text-[#6e655d]">
                  Create a capsule from the home page, or try changing your search.
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

        <AnimatePresence>
          {selectedCapsule ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-[#2f2a26]/45 px-4"
              onClick={closeCapsule}
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
                  onClick={closeCapsule}
                  className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-[#ddd5ca] bg-[#faf8f4] text-[#5a534d] transition hover:bg-[#f2ece4]"
                  aria-label="Close capsule"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="overflow-hidden rounded-[24px] border border-[#e1d8ce] bg-[#f3eee7]">
                  <img
                    src={selectedCapsule.image}
                    alt="Saved capsule"
                    className="h-[260px] w-full object-cover md:h-[330px]"
                  />
                </div>

                <div className="mt-5 space-y-3">
                  <p className="text-sm uppercase tracking-[0.28em] text-[#8c837a]">
                    Saved Capsule
                  </p>

                  <p className="text-base leading-8 text-[#5f5851]">
                    <span className="font-medium text-[#3b3531]">Date:</span>{" "}
                    {formatDisplayDate(selectedCapsule.date)}
                  </p>

                  <p className="rounded-[22px] border border-dashed border-[#ddd5ca] bg-[#fcfaf6] px-4 py-3 text-sm leading-7 text-[#6e655d] md:text-[15px]">
                    {selectedCapsule.caption || "No caption added."}
                  </p>

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
