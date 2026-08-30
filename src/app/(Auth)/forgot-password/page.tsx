import ForgotPasswordForm from './ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-2 text-2xl font-bold text-slate-900">Reset your password</h1>
        <p className="mb-6 text-sm text-gray-500">
          We&apos;ll help you get back into your account in a few steps.
        </p>
        <ForgotPasswordForm />
      </div>
    </main>
  );
}