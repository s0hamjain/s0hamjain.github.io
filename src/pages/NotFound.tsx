import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-slate-100">404</h1>
        <p className="mb-6 text-lg text-slate-400">That page doesn&apos;t exist.</p>
        <Link
          to="/"
          className="text-primary underline-offset-4 transition-colors hover:text-primary/80 hover:underline"
        >
          Return to home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
