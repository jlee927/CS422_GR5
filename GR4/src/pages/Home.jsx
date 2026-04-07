import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Mic, ArrowUp, House, Newspaper, CalendarDays, Plus } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    setPrompt("");
  };

  const handleMic = () => {
    if (isListening) return;
    setIsListening(true);
    setTimeout(() => {
      setPrompt("sunrise over soft mountains");
      setIsListening(false);
    }, 1200);
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadedFileName(file.name);
  };

  const navItems = [
    { id: "home", label: "Home", icon: House, path: "/" },
    { id: "newsletter", label: "Newsletter", icon: Newspaper, path: "/newsletter" },
    { id: "calendar", label: "Calendar", icon: CalendarDays, path: "/calendar" },
  ];

  return (
    <div className="h-screen overflow-hidden bg-[#f8f6f2] text-[#2f2a26]">
      <div className="mx-auto flex h-screen max-w-[1400px] flex-col px-6 py-4 md:px-10">
        <header className="flex justify-center pt-1">
          <motion.h1
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center text-lg font-semibold tracking-[0.28em] md:text-2xl"
          >
            WONDERCAPSULE <span className="mx-3 text-[#8e877f]">|</span> HOME
          </motion.h1>
        </header>

        <main className="flex flex-1 items-center justify-center">
          <div className="grid w-full grid-cols-[70px_minmax(0,1fr)_70px] items-center gap-4 md:grid-cols-[110px_minmax(0,1fr)_110px]">
            <div className="flex h-full flex-col justify-center gap-28 opacity-40">
              <div className="h-16 w-16 rounded-xl border border-[#ddd5ca] bg-white/60 md:h-20 md:w-20" />
              <div className="h-16 w-16 rounded-xl border border-[#ddd5ca] bg-white/60 md:h-20 md:w-20" />
            </div>

            <section className="mx-auto flex w-full max-w-2xl flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="group flex h-[320px] w-full flex-col items-center justify-center rounded-[34px] border border-[#d9d1c6] bg-white px-8 text-center shadow-[0_12px_40px_rgba(55,40,25,0.06)] transition hover:shadow-[0_16px_50px_rgba(55,40,25,0.1)] md:h-[360px]"
                >
                  <div className="mb-10 grid h-20 w-20 place-items-center rounded-full border border-[#d8d0c5] text-[#504843] transition group-hover:scale-105 md:h-24 md:w-24">
                    <Plus className="h-10 w-10 md:h-12 md:w-12" strokeWidth={1.75} />
                  </div>

                  <div className="space-y-1 text-[#433d38]">
                    <p className="text-xl font-medium tracking-[0.18em] md:text-2xl">UPLOAD MEDIA</p>
                    <p className="text-sm uppercase tracking-[0.3em] text-[#8c837a]">or</p>
                    <p className="text-xl font-medium tracking-[0.18em] md:text-2xl">DRAG &amp; DROP</p>
                  </div>

                  {uploadedFileName ? (
                    <p className="mt-8 max-w-full truncate rounded-full border border-[#e2d9cf] bg-[#faf7f2] px-4 py-2 text-sm text-[#6d655d]">
                      {uploadedFileName}
                    </p>
                  ) : null}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="mt-5 rounded-full border border-[#d9d1c6] bg-white px-4 py-3 shadow-sm md:px-5">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSubmit();
                      }}
                      placeholder={isListening ? "Listening..." : "Enter description"}
                      className="flex-1 bg-transparent text-lg outline-none placeholder:text-[#9d958c]"
                    />

                    <button
                      type="button"
                      onClick={handleMic}
                      className={`grid h-12 w-12 place-items-center rounded-full border transition ${isListening
                          ? "border-[#d86d88] bg-[#ffe4ee] text-[#b34f6c]"
                          : "border-[#ddd5ca] bg-[#faf8f4] text-[#6f665d] hover:bg-[#f2ece4]"
                        }`}
                      aria-label="Use voice input"
                    >
                      <Mic className="h-5 w-5" />
                    </button>

                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="grid h-12 w-12 place-items-center rounded-full border border-[#ddd5ca] bg-[#f6f2eb] text-[#4d4640] transition hover:bg-[#eee7de]"
                      aria-label="Submit prompt"
                    >
                      <ArrowUp className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </section>

            <div className="flex h-full flex-col justify-center gap-28 opacity-40">
              <div className="ml-auto h-16 w-16 rounded-xl border border-[#ddd5ca] bg-white/60 md:h-20 md:w-20" />
              <div className="ml-auto h-16 w-16 rounded-xl border border-[#ddd5ca] bg-white/60 md:h-20 md:w-20" />
            </div>
          </div>
        </main>

        <footer className="pb-2 pt-3">
          <nav className="grid grid-cols-3 items-center text-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex flex-col items-center justify-center gap-2 py-2 text-base uppercase tracking-[0.22em] text-[#5a534d] ${isActive ? "" : ""
                    }`
                  }
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
