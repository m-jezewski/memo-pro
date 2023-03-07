export const BlocksScreenAnimation = () => {
  // Homepage lg screen animation
  return (
    <div
      aria-hidden="true"
      className="fixed -z-10 inset-x-3/5 w-1/5 min-h-screen brightness-110 -skew-x-3 -skew-y-3 hidden lg:block"
    >
      <div className="grid grid-cols-2 gap-2 animate-inf-scroll min-h-screen">
        {[...Array(16)].map((x, i) => (
          <span key={i} className="block bg-light_blue_transparent rounded-lg" />
        ))}
      </div>
      <div className="top-full grid grid-cols-2 gap-2 animate-inf-scroll mt-2 min-h-screen">
        {[...Array(16)].map((x, i) => (
          <span key={i} className="block bg-light_blue_transparent rounded-lg" />
        ))}
      </div>
    </div>
  );
};
