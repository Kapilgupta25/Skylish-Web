"use client";

export default function Error({ error }) {
  return (
    <div className="text-red-500">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
    </div>
  );
}
