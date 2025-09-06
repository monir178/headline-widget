import { Toaster } from "react-hot-toast";

export const ToastConfig = () => (
  <Toaster
    position="top-center"
    reverseOrder={false}
    gutter={12}
    containerStyle={{
      top: 24,
    }}
    toastOptions={{
      duration: 3000,
      style: {
        background: "rgba(0, 0, 0, 0.85)",
        color: "#fff",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        borderRadius: "20px",
        fontSize: "14px",
        fontWeight: "500",
        padding: "16px 20px",
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
      },
    }}
  />
);
