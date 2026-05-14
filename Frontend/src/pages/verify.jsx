import React from "react";

const Verify = () => {
  return (
    <div className="relative flex items-center justify-center min-h-dvh overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-10">

  {/* Background Glow */}
  <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-500/10 blur-3xl rounded-full" />
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-emerald-500/10 blur-3xl rounded-full" />

  {/* Card */}
  <div
    className="
    relative z-10
    w-full max-w-xl
    rounded-3xl
    border border-cyan-500/20
    bg-gradient-to-br from-slate-800/90 to-slate-900/90
    backdrop-blur-md
    shadow-2xl shadow-cyan-500/10
    p-6 sm:p-8 md:p-10
    text-center
    "
  >
    
    {/* Icon + Heading */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
      
      <div
        className="
        flex items-center justify-center
        w-16 h-16 sm:w-20 sm:h-20
        rounded-full
        bg-emerald-500/10
        border border-emerald-400/30
        shadow-lg shadow-emerald-500/20
        "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      <h1
        className="
        text-2xl sm:text-3xl
        font-bold
        text-cyan-400
        leading-tight
        "
      >
        Verify Your E-mail
      </h1>
    </div>

    {/* Description */}
    <p
      className="
      text-sm sm:text-base md:text-lg
      leading-relaxed
      text-slate-300
      max-w-lg
      mx-auto
      "
    >
      We have sent you an email with a verification link.
      Please check your inbox and click on the link
      to verify your email address.
    </p>

  </div>
</div>
  );
};

export default Verify;
