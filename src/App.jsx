import { useEffect, useRef, useState } from 'react'
import { profile as P, links, skills, experience, projects, education, certs, soft } from './data'

/* ---------- tiny syntax highlighter for the code cells ---------- */
const hl = (code) =>
  code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(
    /(#.*$)|("[^"]*")|\b(import|from|as|for|in|def|return|True|False|None)\b|\b(\d+\.?\d*)\b/gm,
    (m, c, s, k, n) =>
      c ? `<span class="t-c">${c}</span>` : s ? `<span class="t-s">${s}</span>` : k ? `<span class="t-k">${k}</span>` : `<span class="t-n">${n}</span>`
  )

/* ---------- illustrative forecast chart data ---------- */
const N = 48, F = 20, W = 720, H = 230, PD = 20, LO = 70, HI = 165
const base = (i) => 100 + i * 0.35 + 14 * Math.sin((i * 2 * Math.PI) / 7) + 6 * Math.sin(i / 6)
const act = Array.from({ length: N }, (_, i) => base(i) + (((i * 37) % 11) - 5) * 0.8)
const fc = Array.from({ length: F }, (_, j) => base(N + j))
const X = (i) => PD + (i * (W - 2 * PD)) / (N + F - 1)
const Y = (v) => H - PD - ((v - LO) * (H - 2 * PD)) / (HI - LO)
const line = (arr, s = 0) => arr.map((v, i) => `${i ? 'L' : 'M'}${X(i + s).toFixed(1)} ${Y(v).toFixed(1)}`).join('')
const band =
  fc.map((v, j) => `${j ? 'L' : 'M'}${X(N + j).toFixed(1)} ${Y(v + 4 + j * 0.5).toFixed(1)}`).join('') +
  [...fc].reverse().map((v, j) => `L${X(N + F - 1 - j).toFixed(1)} ${Y(v - 4 - (F - 1 - j) * 0.5).toFixed(1)}`).join('') + 'Z'

/* ---------- small UI pieces ---------- */
const Chip = ({ children }) => (
  <span className="inline-block rounded-full border border-ln bg-cell px-3 py-0.5 text-[13px]">{children}</span>
)
const Btn = ({ href, primary, children, ...r }) => (
  <a href={href} target="_blank" rel="noreferrer" {...r}
    className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold no-underline transition ${primary ? 'bg-ac text-bg hover:opacity-90' : 'border border-ln hover:border-ac hover:text-ac'}`}>
    {children}
  </a>
)
const Timeline = ({ items }) => (
  <ol className="border-l-2 border-ln ml-1.5">
    {items.map((it) => (
      <li key={it.title} className="relative pb-5 pl-5">
        <span className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full bg-ac" />
        <p className="font-semibold leading-snug">{it.title}</p>
        <p className="text-sm text-mut">{[it.where, it.when, it.note].filter(Boolean).join('  |  ')}</p>
        {it.points && (
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px] text-mut">{it.points.map((p) => <li key={p}>{p}</li>)}</ul>
        )}
      </li>
    ))}
  </ol>
)

function Chart({ k }) {
  return (
    <figure>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full rounded-md border border-ln bg-cell" role="img"
        aria-label="Illustrative chart: actual demand and forecast with a confidence band">
        {[0, 1, 2, 3].map((g) => <line key={g} x1={PD} x2={W - PD} y1={PD + (g * (H - 2 * PD)) / 3} y2={PD + (g * (H - 2 * PD)) / 3} stroke="var(--ln)" />)}
        <path key={`a${k}`} d={line(act)} pathLength="1" className="draw" fill="none" stroke="var(--mut)" strokeWidth="2" />
        <path key={`b${k}`} d={band} fill="var(--ac)" opacity=".15" />
        <path key={`f${k}`} d={line(fc, N)} pathLength="1" className="draw draw2" fill="none" stroke="var(--ac)" strokeWidth="2.6" />
        <line x1={X(N)} x2={X(N)} y1={PD} y2={H - PD} stroke="var(--mut)" strokeDasharray="4 4" />
        <text x={X(N) + 6} y={PD + 12} fill="var(--mut)" fontSize="12">forecast starts</text>
      </svg>
      <figcaption className="mt-2 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[13px] text-mut">
        <span>mean WAPE: <b className="text-ac">7.35%</b></span><span>folds: 4</span><span>records: 1M+</span><span>stores: 1,115</span>
        <span className="w-full">Illustrative plot. The WAPE figure comes from the real project.</span>
      </figcaption>
    </figure>
  )
}

/* ---------- the notebook cells: code text + rendered output ---------- */
const cells = [
  {
    code: `me = Profile(\n    name="${P.name}",\n    role="${P.role}",\n    location="${P.location}",\n)\nme.about()`,
    out: () => (
      <div className="space-y-3">
        <p className="max-w-[68ch] text-[17px] leading-relaxed">{P.summary}</p>
        <div className="flex flex-wrap gap-2">{soft.map((s) => <Chip key={s}>{s}</Chip>)}</div>
      </div>
    ),
  },
  {
    code: `skills = load_skills()  # ${Object.keys(skills).length} groups\nfor group, tools in skills.items():\n    print(group, tools)`,
    out: () => (
      <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {Object.entries(skills).map(([g, t]) => (
          <div key={g}>
            <dt className="mb-1.5 font-semibold">{g}</dt>
            <dd className="flex flex-wrap gap-1.5">{t.map((s) => <Chip key={s}>{s}</Chip>)}</dd>
          </div>
        ))}
      </dl>
    ),
  },
  { code: `experience = me.internships()\nexperience.head(2)`, out: () => <Timeline items={experience} /> },
  {
    code: `projects = me.projects()\nprojects.sort_values("impact", ascending=False)`,
    out: () => (
      <div className="space-y-4">
        {projects.map((p) => (
          <article key={p.title} className="rounded-md border border-ln p-4 transition hover:border-ac">
            <div className="space-y-2">
              <h3 className="text-lg font-bold leading-snug">{p.title}</h3>
              <h4 className="w-fit rounded bg-ac px-2 py-0.5 font-mono text-xs font-semibold text-bg">{p.metric}</h4>
            </div>
            <ul className="my-3 list-disc space-y-1 pl-5 text-[15px] text-mut">{p.points.map((x) => <li key={x}>{x}</li>)}</ul>
            <div className="flex flex-wrap items-center gap-1.5 pb-3">
              {p.stack.map((s) => <Chip key={s}>{s}</Chip>)}
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              {p.github && <Btn href={p.github}>Code</Btn>}
              {p.demo && <Btn href={p.demo} primary>Live demo</Btn>}
              </div>
          </article>
        ))}
      </div>
    ),
  },
  { code: `plot_forecast(actual, forecast, horizon=20)  # demand forecasting project`, out: (k) => <Chart k={k} /> },
  {
    code: `me.education`,
    out: () => (
      <div className="space-y-2">
        <Timeline items={education} />
      </div>
    ),
  },
  {
    code: `me.certifications`,
    out: () => (
        <ul className="space-y-3">
            {certs.map((c) => (
              <li key={c.title} className="rounded-md border border-ln p-3">
              <p className="font-semibold">{c.title}</p>
              <p className="text-sm text-mut">{c.by} | {c.year}</p>
              </li>
          ))}
        </ul>
    ),
  },
  {
    code: `me.connect(["linkedin", "github", "leetcode", "hackerrank"])\nme.email  # "${P.email}"`,
    out: () => (
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          {links.map((l) => (
            <a key={l.id} href={l.url} target="_blank" rel="noreferrer"
              className="group flex items-center gap-3 rounded-md border border-ln p-3 no-underline transition hover:border-ac">
              <span className="grid h-10 w-10 place-items-center rounded bg-ink font-mono text-sm font-bold text-bg group-hover:bg-ac">{l.badge}</span>
              <span><b className="block">{l.label}</b><span className="text-sm text-mut">{l.note}</span></span>
            </a>
          ))}
        </div>
               <div className="flex flex-wrap gap-2">
          <Btn href={`mailto:${P.email}`} primary>Email me</Btn>
          <Btn href={P.resume} download>Download resume</Btn>
        </div>
      </div>
    ),
  },

]

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function Cell({ n, code, state, onRun, children }) {
  return (
    <section className="mb-6 grid grid-cols-1 gap-x-3 gap-y-1 sm:grid-cols-[76px_1fr]" id={`cell-${n}`} aria-label={`Cell ${n}`}>
      <div className="pt-3 font-mono text-[13px] text-mut sm:text-right">{state === 'running' ? 'In [*]:' : state === 'done' ? `In [${n}]:` : 'In [ ]:'}</div>
      <div className="relative rounded-md border border-ln bg-cell">
        <button onClick={onRun} aria-label={`Run cell ${n}`}
          className="absolute right-2 top-2 rounded border border-ln bg-bg px-2 py-0.5 font-mono text-xs hover:border-ac hover:text-ac">Run</button>
        <pre className="overflow-x-auto p-4 pr-16 font-mono text-[13.5px] leading-7" dangerouslySetInnerHTML={{ __html: hl(code) }} />
      </div>
      {state === 'running' && (<><div /><p className="busy font-mono text-sm text-mut">running...</p></>)}
      {state === 'done' && (<><div className="pt-2 font-mono text-[13px] text-ac sm:text-right">Out [{n}]:</div><div className="min-w-0 py-2">{children}</div></>)}
    </section>
  )
}

export default function App() {
  const [st, setSt] = useState({})
  const [runs, setRuns] = useState({})
  const [dark, setDark] = useState(() => {
    try { const t = localStorage.getItem('theme'); return t ? t === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches } catch { return false }
  })
  const token = useRef(0)
  const busy = Object.values(st).includes('running')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch {}
  }, [dark])

  const runCell = async (i) => {
    setSt((s) => ({ ...s, [i]: 'running' })); await sleep(380)
    setSt((s) => ({ ...s, [i]: 'done' })); setRuns((r) => ({ ...r, [i]: (r[i] || 0) + 1 }))
  }
  const runAll = async () => {
    const t = ++token.current; setSt({})
    for (let i = 0; i < cells.length; i++) { if (t !== token.current) return; await runCell(i); await sleep(120) }
  }
  const clearAll = () => { token.current++; setSt({}) }
  useEffect(() => {
    const h = (e) => {
      if (e.key === 'Enter' && e.shiftKey) {
        const next = cells.findIndex((_, i) => st[i] !== 'done')
        if (next > -1) { e.preventDefault(); runCell(next); document.getElementById(`cell-${next + 1}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }) }
      }
    }
    window.addEventListener('keydown', h); return () => window.removeEventListener('keydown', h)
  }, [st])

  return (
    <div className="min-h-screen pb-[env(safe-area-inset-bottom)]">
      <header className="sticky top-0 z-20 border-b border-ln bg-bg pt-[env(safe-area-inset-top)]">
        <div className="mx-auto flex max-w-[900px] flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3">
          <span className="mr-auto font-mono text-sm font-medium">{P.file}</span>
          <span className="flex items-center gap-2 font-mono text-xs text-mut">
            <i className={`h-2.5 w-2.5 rounded-full ${busy ? 'busy bg-ac' : 'bg-ok'}`} /> {busy ? 'busy' : 'idle'}
          </span>
          <button onClick={runAll} className="rounded border border-ln px-3 py-1 text-sm hover:border-ac hover:text-ac">Run all</button>
          <button onClick={clearAll} className="rounded border border-ln px-3 py-1 text-sm hover:border-ac hover:text-ac">Clear outputs</button>
          <button onClick={() => setDark(!dark)} aria-pressed={dark} className="rounded border border-ln px-3 py-1 text-sm hover:border-ac hover:text-ac">{dark ? 'Light' : 'Dark'}</button>
        </div>
      </header>

      <main className="mx-auto max-w-[900px] px-5 pb-16 pt-10">
        <section className="mb-10 sm:pl-[88px]" aria-label="Introduction">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-ln bg-cell px-3 py-1 text-sm">
            <i className="h-2 w-2 rounded-full bg-ok" />Open to data science roles and internships
          </p>
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">{P.name}</h1>
          <p className="mt-2 text-2xl font-semibold text-ac">{P.role}</p>
          <p className="mt-4 max-w-[52ch] text-xl text-mut">{P.headline}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Btn href={P.resume} primary download>Download resume</Btn>
            {links.slice(0, 3).map((l) => <Btn key={l.id} href={l.url}>{l.label}</Btn>)}
          </div>
          <p className="mt-4 font-mono text-xs text-mut"> Note : Outputs stay hidden until you run a cell. Click Run on a cell or press Shift + Enter for the next one or use Run all at the top.</p>
        </section>

        {cells.map((c, i) => (
          <Cell key={i} n={i + 1} code={c.code} state={st[i]} onRun={() => runCell(i)}>{c.out(runs[i] || 0)}</Cell>
        ))}
      </main>

      <footer className="border-t border-ln py-6 text-center font-mono text-xs text-mut">
        Saved | Python 3 | {P.name} {new Date().getFullYear()}
      </footer>
    </div>
  )
}
