"use client";

import { motion } from "framer-motion";
import Link from "next/link";

function SectionDivider() {
  return (
    <div className="w-full flex items-center justify-center overflow-hidden">
      <motion.div
        className="h-px w-full origin-center"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(229,62,62,0.5), rgba(255,107,107,0.3), rgba(229,62,62,0.5), transparent)",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  );
}

function SectionHeader({
  label,
  title,
}: {
  label: string;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-12"
    >
      <p className="text-sm font-medium uppercase tracking-[0.15em] text-brand-red mb-3">
        {label}
      </p>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
        <span className="text-brand-red">&gt;</span> {title}
      </h2>
    </motion.div>
  );
}

const BENEFITS = [
  {
    num: "01",
    title: "Free Mac Studio",
    description:
      "Every accepted team receives a Mac Studio funded by Link Ventures. We were sick of seeing students not building with OpenClaw because of upfront hardware costs. You keep it regardless of where you finish.",
  },
  {
    num: "02",
    title: "$17,500 in Prizes",
    description:
      "The top three teams receive cash prizes. The overall winner receives additional high-value networking opportunities — introductions, pitch opportunities, and access to Link ecosystem events.",
  },
  {
    num: "03",
    title: "Fly to Boston",
    description:
      "ClawWeek at Link Studios in Cambridge, Massachusetts. All travel and housing expenses covered by Link Ventures. Four days of in-person building, pitching, and networking.",
  },
  {
    num: "04",
    title: "Build in a Community",
    description:
      "Build alongside the most ambitious OpenClaw innovators from universities across the country. Weekly video updates, community touchpoints, and shared momentum throughout the program.",
  },
  {
    num: "05",
    title: "VC & Investor Access",
    description:
      "Link portfolio companies on site during ClawWeek. Founders, investors, professors from Harvard and MIT — all evaluating pitches and meeting teams in real time.",
  },
  {
    num: "06",
    title: "Media and Virality",
    description:
      "Be a part of ClawComp and Link Ventures' content ecosystem, driving traffic to your project.",
  },
];

const TIMELINE_STEPS = [
  {
    phase: "01",
    title: "Apply",
    description:
      "Submit your application with a team of one to three members. Accepted applicants are invited to the Talvy group and the cohort Discord server to begin connecting with the community.",
  },
  {
    phase: "02",
    title: "Stand Out",
    description: (
      <>
        Show the community what you can do. Final program participants are selected based on how active you are in the{" "}
        <a href="https://talvy.com/" target="_blank" rel="noopener noreferrer" className="text-brand-coral underline underline-offset-2 hover:text-brand-red transition-colors">
          Talvy group
        </a>{" "}
        and Discord, and how impressive the community finds your OpenClaw setups. This is your audition &mdash; stand out and you&rsquo;re in.
      </>
    ),
  },
  {
    phase: "03",
    title: "The Build Period",
    description:
      "Selected teams receive a Mac Studio funded by Link Ventures — yours to keep no matter what. One month to design, build, and iterate on your autonomous AI systems. Submit weekly 60-second video updates documenting your process. Opt in to have content featured across Link Ventures' media channels and partner creator networks.",
  },
  {
    phase: "04",
    title: "ClawWeek — The Finale",
    description:
      "June 15–18 at Link Studios in Cambridge, MA. Teams are flown in to push projects to the finish line in hackathon style. Live leaderboard, founder visits, formal presentations, and an award ceremony. All expenses paid.",
  },
];

const CLAWWEEK_HIGHLIGHTS = [
  "All travel & housing covered",
  "Link ecosystem founders & investors on site",
  "Harvard & MIT researchers in attendance",
  "Portfolio companies evaluating pitches live",
  "Real-time leaderboard tracking scores",
  "Formal presentation & award ceremony",
];

const JUDGING_CRITERIA = [
  {
    title: "Link Ventures Investors",
    description:
      "Investors from Link Ventures and their broader network evaluate your project on technical depth, real-world applicability, and investment potential. These are the people who fund the next generation of companies.",
  },
  {
    title: "Ecosystem Founders",
    description:
      "Founders within the Link ecosystem assess your ability to build something real — how well you execute, how clearly you communicate your vision, and whether what you built could survive outside a demo.",
  },
  {
    title: "The Community",
    description:
      "Your fellow program participants vote democratically. The people who watched you build, collaborated wih you, and know what it took. Peer recognition matters here.",
  },
];

export function AboutContent() {
  return (
    <div>
      {/* ── Overview ── */}
      <SectionDivider />
      <section className="w-full py-14 lg:py-20">
        <div className="max-w-[75rem] mx-auto px-6 lg:px-16">
          <SectionHeader label="The Mission" title="What is ClawComp?" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="max-w-3xl"
          >
            <p className="text-lg leading-relaxed text-text-muted mb-6">
              <strong className="text-text-primary">ClawComp</strong> is a
              month-long build program — not a weekend hackathon — targeted at
              bringing together an elite community of OpenClaw innovators. It is
              designed to fit around what you are already building. The
              program culminates in{" "}
              <span style={{ color: "#22D3EE" }}>ClawWeek</span> at Link Ventures, June
              15&ndash;18.
            </p>
            <p className="text-lg leading-relaxed text-text-muted mb-6">
              Whether you&rsquo;re a startup founder, building an app with
              friends, experimenting with AI tools, or just brainstorming
              business ideas — ClawComp challenges you to integrate OpenClaw into
              that work and push it further than you would on your own.
            </p>
            <p className="text-lg leading-relaxed text-text-muted">
              ClawComp rewards teams who build{" "}
              <strong className="text-brand-coral">
                real OpenClaw automations with measurable outcomes
              </strong>
              , not wrapper products that fall apart under scrutiny.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Benefits Grid ── */}
      <SectionDivider />
      <section className="w-full py-14 lg:py-20">
        <div className="max-w-[75rem] mx-auto px-6 lg:px-16">
          <SectionHeader label="What You Get" title="The Package" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="group bg-background-elevated border border-border rounded-[0.75rem] p-6 hover:border-border-active hover:shadow-[0_0_20px_rgba(229,62,62,0.1)] transition-all duration-300"
              >
                <span className="text-3xl font-extrabold text-brand-red/30 group-hover:text-brand-red/60 transition-colors duration-300 block mb-3">
                  {b.num}
                </span>
                <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-brand-coral transition-colors duration-300">
                  {b.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {b.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <SectionDivider />
      <section className="w-full py-14 lg:py-20">
        <div className="max-w-[75rem] mx-auto px-6 lg:px-16">
          <SectionHeader label="The Program" title="How It Works" />
          <div className="relative max-w-3xl ml-4 md:ml-8">
            <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />

            {TIMELINE_STEPS.map((step, i) => (
              <motion.div
                key={step.phase}
                className="relative pl-10 pb-14 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <div className="absolute left-0 top-1.5 w-3 h-3 -translate-x-1/2 rounded-full bg-brand-red shadow-[0_0_12px_rgba(229,62,62,0.5)]" />
                <span className="text-xs font-bold uppercase tracking-widest text-brand-red mb-1 block">
                  Phase {step.phase}
                </span>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ClawWeek ── */}
      <SectionDivider />
      <section className="w-full py-14 lg:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at center, rgba(229,62,62,0.06), transparent 70%)",
          }}
        />
        <div className="max-w-[75rem] mx-auto px-6 lg:px-16 relative z-10">
          <SectionHeader label="The Finale" title="ClawWeek" />
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-2xl md:text-3xl font-bold text-brand-coral mb-3">
                June 15 – 18
              </p>
              <p className="text-lg font-medium text-text-primary mb-4">
                Link Studios · One Kendall Square Bldg 200, Cambridge MA 02139
              </p>
              <p className="text-text-muted leading-relaxed mb-4">
                The competition culminates in a final summit week. Teams are
                flown in to meet each other in person and push their projects to
                the finish line in hackathon style.
              </p>
              <p className="text-text-muted leading-relaxed">
                Founders and investors from the Link ecosystem and beyond will
                be on site, along with professors and researchers from Harvard,
                MIT, and more. Link portfolio companies will stop by to meet
                teams, ask questions, and evaluate pitches in real time.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CLAWWEEK_HIGHLIGHTS.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-background-elevated/80 border border-border rounded-[0.75rem] p-4 hover:border-border-active transition-all duration-300"
                >
                  <p className="text-sm font-medium text-text-primary flex items-start gap-2">
                    <span className="text-brand-red mt-0.5 shrink-0">
                      &#x25B8;
                    </span>
                    {h}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Prizes ── */}
      <SectionDivider />
      <section className="w-full py-14 lg:py-20">
        <div className="max-w-[75rem] mx-auto px-6 lg:px-16">
          <SectionHeader label="Rewards" title="$17,500 Prize Pool" />
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {(
              [
                {
                  place: "1st Place",
                  title: "$10,000",
                  description:
                    "Grand prize plus exclusive networking opportunities within the Link and venture community — including introductions, pitch opportunities, and access to Link ecosystem events.",
                  featured: true,
                },
                {
                  place: "2nd Place",
                  title: "$5,000",
                  description:
                    "Cash prize and recognition within the ClawComp community and Link Ventures network.",
                  featured: false,
                },
                {
                  place: "3rd Place",
                  title: "$2,500",
                  description:
                    "Cash prize and recognition within the ClawComp community and Link Ventures network.",
                  featured: false,
                },
              ] as const
            ).map((prize, i) => (
              <motion.div
                key={prize.place}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className={`bg-background-elevated border rounded-[0.75rem] p-8 text-center transition-all duration-300 ${
                  prize.featured
                    ? "border-brand-red shadow-[0_0_30px_rgba(229,62,62,0.2)] md:scale-105"
                    : "border-border hover:border-border-active"
                }`}
              >
                <span
                  className={`text-xs font-bold uppercase tracking-widest block mb-2 ${
                    prize.featured ? "text-brand-red" : "text-text-muted"
                  }`}
                >
                  {prize.place}
                </span>
                <h3 className="text-xl font-bold text-text-primary mb-3">
                  {prize.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {prize.description}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-text-muted text-center"
          >
            Every team walks away with their hardware and a documented record of
            what they built.
          </motion.p>
        </div>
      </section>

      {/* ── Judging ── */}
      <SectionDivider />
      <section className="w-full py-14 lg:py-20">
        <div className="max-w-[75rem] mx-auto px-6 lg:px-16">
          <SectionHeader label="Evaluation" title="Who Judges You?" />
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {JUDGING_CRITERIA.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-background-elevated border border-border rounded-[0.75rem] p-6 hover:border-border-active hover:shadow-[0_0_20px_rgba(229,62,62,0.1)] transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {c.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-muted">
                  {c.description}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-text-muted max-w-3xl"
          >
            Scoring combines all three perspectives — investors, founders,
            and your peers. The best teams are not just technically impressive.
            They can also communicate clearly, iterate quickly, and earn the
            respect of the people building alongside them.
          </motion.p>
        </div>
      </section>

      {/* ── CTA ── */}
      <SectionDivider />
      <section className="w-full py-14 lg:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse at center bottom, rgba(229,62,62,0.08), transparent 60%)",
          }}
        />
        <div className="max-w-[75rem] mx-auto px-6 lg:px-16 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-6">
              Ready to Build?
            </h2>
            <p className="text-text-muted text-lg mb-10 max-w-[37.5rem] mx-auto">
              One month. Real hardware. Real prizes. Real connections. Apply
              now and push what you&rsquo;re building further than you would on
              your own.
            </p>
            <Link
              href="/apply"
              className="inline-block bg-brand-red hover:bg-brand-red-hover text-white font-medium px-10 py-4 rounded-lg transition-colors text-sm uppercase tracking-wider"
            >
              Apply Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
