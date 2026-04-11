const SIZES = {
  sm: "w-5 h-5 border-2",
  md: "w-8 h-8 border-4",
  lg: "w-12 h-12 border-4",
};

const Loader = ({ size = "md", fullPage = false }) => {
  const spinner = (
    <div
      className={`
        ${SIZES[size]}
        border-blue-500 border-t-transparent
        rounded-full animate-spin
      `}
    />
  );

  if (fullPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
        {spinner}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      {spinner}
    </div>
  );
};

export default Loader;