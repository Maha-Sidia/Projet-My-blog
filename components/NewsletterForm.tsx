"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;

export default function NewsletterForm() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/newsletters`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data }),
        },
      );
      console.log("STRAPI URL:", process.env.NEXT_PUBLIC_STRAPI_URL);

      if (!res.ok) throw new Error("Failed to submit");

      setStatus("success");
      reset();
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md mx-auto p-6 bg-[color-mix(in srgb, var(--bg) 85%, var(--accent))]/5 border border-[var(--border)] rounded-2xl shadow-md backdrop-blur-md"
    >
      <h3 className="text-xl font-semibold text-[var(--text)] mb-4 text-center">
        Subscribe to our Newsletter
      </h3>

      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          placeholder="Enter your email"
          {...register("email")}
          className="flex-1 px-4 py-2 rounded-md border border-[var(--border)] bg-[var(--bg)] text-[var(--text)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-2 rounded-md font-medium bg-[var(--accent)] text-white hover:brightness-110 transition"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </div>

      {errors.email && (
        <p className="text-red-500 text-sm mt-2">{errors.email.message}</p>
      )}

      {status === "success" && (
        <p className="text-green-500 text-sm mt-2 text-center">
          ✅ You are now subscribed!
        </p>
      )}
      {status === "error" && (
        <p className="text-red-500 text-sm mt-2 text-center">
          Something went wrong. Try again.
        </p>
      )}
    </form>
  );
}
