"use client";

import Image from "next/image";
import Stats from "./Stats";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] overflow-hidden flex items-center">
      <div className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT: Texte */}
        <div>
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Explore the World <br />
            <span className="relative inline-block">
              {/* halo coloré */}
              <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] via-transparent to-transparent blur-2xl opacity-40"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-pink-500">
                Through Words
              </span>
            </span>
          </h1>

          <p className="mt-6 text-lg text-[var(--muted)] max-w-lg">
            Discover insightful articles, thought-provoking stories, and expert
            perspectives on technology, lifestyle and innovation.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              className="px-6 py-3 font-semibold rounded-full bg-[var(--accent)] text-white hover:brightness-110 transition shadow-md inline-flex items-center justify-center"
            >
              Start Reading
            </a>
            <a
              href="#"
              className="px-6 py-3 border border-[var(--border)] bg-[color-mix(in srgb, var(--bg) 85%, white)] dark:bg-[color-mix(in srgb, var(--bg) 90%, black)] text-[var(--text)] rounded-full hover:bg-[color-mix(in srgb, var(--accent) 15%, var(--bg))] transition"
            >
              Explore Topics
            </a>
          </div>

          {/* Stats */}
          <div className="mt-16">
            <Stats />
          </div>
        </div>

        {/* RIGHT: Image */}
        <div className="flex justify-center lg:justify-end relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)] to-pink-500 rounded-3xl blur-2xl opacity-25 group-hover:opacity-50 transition"></div>

          <div className="relative w-80 h-80 md:w-96 md:h-96 bg-[color-mix(in srgb, var(--bg) 70%, var(--accent))]/20 backdrop-blur-xl rounded-3xl p-3 shadow-2xl ring-1 ring-[var(--border)]">
            <div className="bg-[color-mix(in srgb, var(--bg) 85%, white)] dark:bg-[color-mix(in srgb, var(--bg) 85%, black)] w-full h-full rounded-2xl overflow-hidden">
              <Image
                src="/bg-blog-img.png"
                alt="Person using laptop with coffee"
                width={500}
                height={300}
                className="rounded-2xl object-cover transform group-hover:scale-105 transition duration-500"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
