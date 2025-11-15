import { useState } from 'react'

const backend = import.meta.env.VITE_BACKEND_URL || ''

function App() {
  const [form, setForm] = useState({ name: '', email: '', school: '', grad_year: '' })
  const [status, setStatus] = useState({ loading: false, success: null, message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: true, success: null, message: '' })
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        school: form.school.trim() || undefined,
        grad_year: form.grad_year ? Number(form.grad_year) : undefined,
      }
      const res = await fetch(`${backend}/api/waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok || data.success !== true) throw new Error(data.detail || 'Something went wrong')
      setStatus({ loading: false, success: true, message: 'You\'re on the list! We\'ll email you soon.' })
      setForm({ name: '', email: '', school: '', grad_year: '' })
    } catch (err) {
      setStatus({ loading: false, success: false, message: err.message || 'Submission failed' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <header className="max-w-6xl mx-auto px-6 pt-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white grid place-items-center font-semibold">CE</div>
          <span className="text-xl font-semibold text-gray-900">Campus Events</span>
        </div>
        <a href="#waitlist" className="text-sm font-medium text-indigo-700 hover:text-indigo-900">Join waitlist</a>
      </header>

      <main className="max-w-6xl mx-auto px-6 pb-24">
        <section className="pt-16 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium">New • Spring Launch</div>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900">All your campus events in one place</h1>
            <p className="mt-4 text-lg text-gray-600">Discover, RSVP, and never miss another club meeting, career fair, or party. We\'re launching soon at select universities.</p>
            <ul className="mt-6 space-y-2 text-gray-700">
              <li className="flex items-start gap-2"><span className="text-indigo-600">✔</span><span>Real-time event feed from clubs and orgs</span></li>
              <li className="flex items-start gap-2"><span className="text-indigo-600">✔</span><span>One-tap RSVPs and calendar sync</span></li>
              <li className="flex items-start gap-2"><span className="text-indigo-600">✔</span><span>Friend activity and trending on your campus</span></li>
            </ul>
            <a href="#waitlist" className="mt-8 inline-flex items-center justify-center px-5 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 transition">Get early access</a>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-3xl blur-2xl opacity-60"></div>
            <div className="relative bg-white rounded-2xl shadow-xl ring-1 ring-black/5 p-4">
              <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 grid place-items-center text-white text-2xl font-bold">
                Campus Events
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-xs text-gray-600">
                <div className="p-3 rounded-lg bg-gray-50">Clubs</div>
                <div className="p-3 rounded-lg bg-gray-50">RSVPs</div>
                <div className="p-3 rounded-lg bg-gray-50">Calendar</div>
              </div>
            </div>
          </div>
        </section>

        <section id="waitlist" className="mt-24">
          <div className="max-w-2xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Join the waitlist</h2>
            <p className="mt-2 text-gray-600">Be first to get access. We\'ll invite schools in waves.</p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 grid md:grid-cols-2 gap-4 bg-white p-6 rounded-xl shadow ring-1 ring-black/5">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Full name</label>
              <input required name="name" value={form.name} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Alex Johnson" />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input required type="email" name="email" value={form.email} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="alex@university.edu" />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">School</label>
              <input name="school" value={form.school} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Your University" />
            </div>
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700">Grad year</label>
              <input type="number" name="grad_year" value={form.grad_year} onChange={handleChange} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="2026" />
            </div>
            <button type="submit" disabled={status.loading} className="md:col-span-2 mt-2 inline-flex items-center justify-center px-5 py-3 rounded-lg bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 disabled:opacity-50">
              {status.loading ? 'Joining...' : 'Join waitlist'}
            </button>
            {status.message && (
              <div className={`md:col-span-2 text-sm ${status.success ? 'text-green-700' : 'text-red-700'}`}>
                {status.message}
              </div>
            )}
          </form>

          <p className="mt-4 text-xs text-gray-500">By joining, you agree to receive occasional updates. No spam.</p>
        </section>
      </main>

      <footer className="border-t bg-white/60 backdrop-blur supports-[backdrop-filter]:bg-white/40">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-600">
          <span>© {new Date().getFullYear()} Campus Events</span>
          <div className="flex items-center gap-4">
            <a className="hover:text-gray-900" href="#">Privacy</a>
            <a className="hover:text-gray-900" href="#">Terms</a>
            <a className="hover:text-gray-900" href="mailto:team@campusevents.app">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
