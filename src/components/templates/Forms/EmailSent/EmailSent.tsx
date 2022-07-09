// Todo: sent new mail verification
export function EmailSent() {
  return (
    <div className="flex flex-col gap-7 w-full max-w-md p-4 bg-base-300 rounded p-10">
      <h4 className="text-4xl text-center">Check your inbox!</h4>
      <p>
        An email has been sent to you with a link to confirm your account.
        <br />
        <br />
        If you have not received an email after a few minutes, check your spam
        folder or{" "}
        <a href="#f" className="underline text-red-200">
          click here to resend email
        </a>
      </p>
    </div>
  );
}
