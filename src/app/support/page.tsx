import { Headphones, Mail, MessageSquareText, ShieldCheck } from 'lucide-react';

const supportOptions = [
  {
    title: '24/7 Support',
    description: 'Need help with an order, delivery, or account?',
    icon: Headphones,
  },
  {
    title: 'Email us',
    description: 'support@freshcart.com',
    icon: Mail,
  },
  {
    title: 'Live chat',
    description: 'Talk to our team from the app or website.',
    icon: MessageSquareText,
  },
  {
    title: 'Secure shopping',
    description: 'We protect your payments and personal data.',
    icon: ShieldCheck,
  },
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-neutral-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-3xl bg-linear-to-r from-emerald-600 to-green-500 p-8 text-white shadow-lg">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-100">Support</p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">We’re here to help</h1>
          <p className="mt-3 max-w-2xl text-emerald-50">
            Reach our team for order issues, delivery questions, account support, and product recommendations.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {supportOptions.map(({ title, description, icon: Icon }) => (
            <div key={title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
              <p className="mt-2 text-sm text-slate-600">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900">Need a quick answer?</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Phone</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">+1 (800) 123-4567</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Email</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">support@freshcart.com</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Hours</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">Mon–Sun, 24/7</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
