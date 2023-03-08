export default function MarketingCTA() {
  return (
    <div className="relative isolate overflow-hidden bg-[rgb(11,115,164)] px-6 text-center shadow-2xl mx-4 lg:mx-auto max-w-7xl py-24 sm:px-6 sm:py-32 lg:px-8 mb-8">
      <h2 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight text-white">
        Boost your productivity today.
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-lg leading-8 text-gray-300">
        Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id
        veniam aliqua proident excepteur commodo do ea.
      </p>
      <div className="mt-4 flex items-center justify-center gap-x-6">
        <a
          href="#"
          className="rounded-md bg-white px-3.5 py-1.5 text-base font-semibold leading-7 text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Get started
        </a>
        <a href="#" className="text-base font-semibold leading-7 text-white">
          Learn more <span aria-hidden="true">→</span>
        </a>
      </div>
      <svg
        viewBox="0 0 1024 1024"
        className="absolute top-1/2 left-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
        aria-hidden="true"
      >
        <circle
          cx={512}
          cy={512}
          r={512}
          fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)"
          fillOpacity="0.7"
        />
        <defs>
          <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
            <stop stopColor="#FFC107" />
            <stop offset={0.5} stopColor="#FFC107" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
