export default function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
  type = "button",
}) {
  const base =
    "px-5 py-2 rounded-md text-sm font-medium transition";

  const styles = {
    primary: "bg-black text-white hover:bg-gray-800",
    outline: "border border-black text-black hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
