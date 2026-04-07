import { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Mic,
  ArrowUp,
  House,
  Newspaper,
  CalendarDays,
  Plus,
} from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);

  const fileInputRef = useRef(null);

  const navItems = [
    { id: "home", label: "Home", icon: House, path: "/" },
    { id: "newsletter", label: "Newsletter", icon: Newspaper, path: "/newsletter" },
    { id: "calendar", label: "Calendar", icon: CalendarDays, path: "/calendar" },
  ];

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(`${dateString}T12:00:00`);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const canUpload = () => {
    if (!selectedDate) {
      setErrorMessage("Please choose a date before uploading.");
      return false;
    }
    return true;
  };

  const readFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please upload an image file.");
      setUploadedFileName("");
      setPreviewUrl("");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
      setUploadedFileName(file.name);
      setErrorMessage("");
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadAreaClick = () => {
    if (!canUpload()) return;
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (!selectedDate) {
      setErrorMessage("Please choose a date first.");
      return;
    }

    if (!previewUrl) {
      setErrorMessage("Please upload an image first.");
      return;
    }

    if (!prompt.trim()) {
      setErrorMessage("Please enter a description.");
      return;
    }

    setErrorMessage("");
    setIsProcessing(true);

    setTimeout(() => {
      setResult({
        title: "Generated WonderCapsule",
        description: prompt,
        image: previewUrl,
        date: selectedDate,
        note:
          "This is a canned prototype result. The uploaded image, selected date, and prompt are shown in a simulated generated capsule view.",
      });
      setIsProcessing(false);
    }, 1600);
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
    if (!canUpload()) {
      event.target.value = "";
      return;
    }

    const file = event.target.files?.[0];
    readFile(file);
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);

    if (!canUpload()) return;

    const file = event.dataTransfer.files?.[0];
    readFile(file);
  };

  const handleReset = () => {
    setPrompt("");
    setSelectedDate("");
    setUploadedFileName("");
    setPreviewUrl("");
    setErrorMessage("");
    setResult(null);
    setIsProcessing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#2f2a26]">
      <div className="mx-auto flex min-h-screen max-w-[1400px] flex-col px-6 py-4 md:px-10">
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

        <main className="flex-1 py-5">
          <div className="grid w-full grid-cols-1">
            <section className="mx-auto flex w-full max-w-2xl flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.35 }}
                className="w-full"
              >
                {!result ? (
                  <>
                    <div className="mb-5 rounded-[28px] border border-[#d9d1c6] bg-white px-5 py-4 shadow-sm">
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-sm uppercase tracking-[0.26em] text-[#8c837a]">
                            Capsule Date
                          </p>
                          <p className="mt-1 text-sm text-[#6d655d]">
                            Choose a date before uploading media.
                          </p>
                        </div>

                        <div className="w-full md:w-[260px]">
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => {
                              setSelectedDate(e.target.value);
                              setErrorMessage("");
                            }}
                            className="w-full rounded-2xl border border-[#ddd5ca] bg-[#fcfaf6] px-4 py-3 text-[#4d4640] outline-none transition focus:border-[#c9b8ab]"
                          />
                        </div>
                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={handleUploadAreaClick}
                      onDragEnter={handleDragEnter}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={`group flex w-full flex-col items-center justify-center rounded-[34px] border bg-white px-8 py-8 text-center shadow-[0_12px_40px_rgba(55,40,25,0.06)] transition md:min-h-[360px] ${isDragging
                        ? "border-[#d7a9b9] bg-[#fff7fa] shadow-[0_16px_50px_rgba(55,40,25,0.1)]"
                        : "border-[#d9d1c6] hover:shadow-[0_16px_50px_rgba(55,40,25,0.1)]"
                        }`}
                    >
                      {previewUrl ? (
                        <div className="flex w-full flex-col items-center">
                          <div className="w-full overflow-hidden rounded-[28px] border border-[#e1d8ce] bg-[#f3eee7]">
                            <img
                              src={previewUrl}
                              alt="Uploaded preview"
                              className="h-[220px] w-full object-cover md:h-[280px]"
                            />
                          </div>

                          <p className="mt-5 max-w-full truncate rounded-full border border-[#e2d9cf] bg-[#faf7f2] px-4 py-2 text-sm text-[#6d655d]">
                            {uploadedFileName}
                          </p>

                          {selectedDate ? (
                            <p className="mt-3 rounded-full border border-[#e2d9cf] bg-[#faf7f2] px-4 py-2 text-sm text-[#6d655d]">
                              {formatDisplayDate(selectedDate)}
                            </p>
                          ) : null}

                          <p className="mt-3 text-sm uppercase tracking-[0.24em] text-[#8c837a]">
                            Click or drop another image to replace
                          </p>
                        </div>
                      ) : (
                        <>
                          <div className="mb-10 grid h-20 w-20 place-items-center rounded-full border border-[#d8d0c5] text-[#504843] transition group-hover:scale-105 md:h-24 md:w-24">
                            <Plus className="h-10 w-10 md:h-12 md:w-12" strokeWidth={1.75} />
                          </div>

                          <div className="space-y-1 text-[#433d38]">
                            <p className="text-xl font-medium tracking-[0.18em] md:text-2xl">
                              UPLOAD MEDIA
                            </p>
                            <p className="text-sm uppercase tracking-[0.3em] text-[#8c837a]">
                              or
                            </p>
                            <p className="text-xl font-medium tracking-[0.18em] md:text-2xl">
                              DRAG &amp; DROP
                            </p>
                          </div>
                        </>
                      )}
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

                    {errorMessage ? (
                      <p className="mt-4 rounded-2xl border border-[#ead7dc] bg-[#fff5f7] px-4 py-3 text-sm text-[#9a5c6b]">
                        {errorMessage}
                      </p>
                    ) : null}

                    {isProcessing ? (
                      <div className="mt-4 rounded-[24px] border border-[#ddd5ca] bg-white px-5 py-4 text-center shadow-sm">
                        <p className="text-sm uppercase tracking-[0.26em] text-[#8c837a]">
                          Creating capsule...
                        </p>
                        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#efe8df]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 1.4 }}
                            className="h-full rounded-full bg-[#d9b4bf]"
                          />
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35 }}
                    className="rounded-[34px] border border-[#d9d1c6] bg-white p-5 shadow-[0_12px_40px_rgba(55,40,25,0.06)] md:p-6"
                  >
                    <div className="overflow-hidden rounded-[28px] border border-[#e1d8ce] bg-[#f3eee7]">
                      <img
                        src={result.image}
                        alt={result.title}
                        className="h-[260px] w-full object-cover md:h-[330px]"
                      />
                    </div>

                    <div className="mt-5 space-y-3">
                      <p className="text-sm uppercase tracking-[0.28em] text-[#8c837a]">
                        Generated Result
                      </p>
                      <h2 className="text-2xl font-semibold tracking-[0.08em] text-[#3b3531]">
                        {result.title}
                      </h2>
                      <p className="text-base leading-8 text-[#5f5851]">
                        <span className="font-medium text-[#3b3531]">Date:</span>{" "}
                        {formatDisplayDate(result.date)}
                      </p>
                      <p className="text-base leading-8 text-[#5f5851]">
                        <span className="font-medium text-[#3b3531]">Prompt:</span>{" "}
                        {result.description}
                      </p>
                    </div>

                    <div className="mt-5 flex justify-center">
                      <button
                        type="button"
                        onClick={handleReset}
                        className="rounded-full border border-[#d9d1c6] bg-[#f6f2eb] px-6 py-3 text-sm uppercase tracking-[0.22em] text-[#4d4640] transition hover:bg-[#eee7de]"
                      >
                        Create Another Capsule
                      </button>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </section>
          </div>
        </main>

        <footer className="mt-auto pb-2 pt-3">
          <nav className="grid grid-cols-3 items-center text-center">
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
