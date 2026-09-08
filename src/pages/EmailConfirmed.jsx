import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmailConfirmed = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-6 rounded-lg shadow text-center max-w-md">
        <h1 className="text-2xl font-bold text-green-600 mb-2">
          🎉 Signup successful!
        </h1>
        <p className="text-gray-700">
          Your email has been verified successfully.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Redirecting you to login…
        </p>
      </div>
    </div>
  );
};

export default EmailConfirmed;
