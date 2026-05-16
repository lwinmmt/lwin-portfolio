"use client";

import { motion } from "framer-motion";

/**
 * Signature moment for /about. Splits the pull quote word-by-word so each
 * word fades + slides up in stagger. Last word gets a ruby underline.
 */
export function KineticQuote({
  text,
  emphasis,
}: {
  /** Full quote text excluding the emphasized tail. */
  text: string;
  /** Final phrase that receives the ruby underline. */
  emphasis: string;
}) {
  const leadWords = text.split(/\s+/);
  const tailWords = emphasis.split(/\s+/);
  const totalLead = leadWords.length;

  return (
    <motion.blockquote
      className="my-10 max-w-[680px] font-sans text-[1.25rem] leading-[1.5] tracking-[-0.02em] text-[var(--color-fg)]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {leadWords.map((w, i) => (
        <motion.span
          key={`l-${i}`}
          className="inline-block whitespace-pre"
          variants={{
            hidden: { opacity: 0, y: 18 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{
            duration: 0.5,
            delay: i * 0.05,
            ease: [0.2, 0.7, 0.3, 1],
          }}
        >
          {w}
          {i < leadWords.length - 1 ? " " : " "}
        </motion.span>
      ))}
      <span className="inline-block border-b-[3px] border-[var(--color-ruby)] pb-0.5">
        {tailWords.map((w, i) => (
          <motion.span
            key={`t-${i}`}
            className="inline-block whitespace-pre"
            variants={{
              hidden: { opacity: 0, y: 18 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{
              duration: 0.5,
              delay: (totalLead + i) * 0.05,
              ease: [0.2, 0.7, 0.3, 1],
            }}
          >
            {w}
            {i < tailWords.length - 1 ? " " : ""}
          </motion.span>
        ))}
      </span>
    </motion.blockquote>
  );
}
