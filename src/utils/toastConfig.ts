import { toast } from "sonner";

export const showToast = {
  success: (message: string) => toast.success(message, {
    style: {
      background: "#ECFDF5",
      border: "1px solid #6EE7B7",
      color: "#065F46",
    },
    duration: 3000,
    className: "mobile:max-w-[90vw] mobile:text-sm pointer-events-auto",
  }),
  error: (message: string) => toast.error(message, {
    style: {
      background: "#FEE2E2",
      border: "1px solid #FCA5A5",
      color: "#991B1B",
    },
    duration: 3000,
    className: "mobile:max-w-[90vw] mobile:text-sm pointer-events-auto",
  }),
  info: (message: string) => toast.info(message, {
    style: {
      background: "#EFF6FF",
      border: "1px solid #93C5FD",
      color: "#1E40AF",
    },
    duration: 3000,
    className: "mobile:max-w-[90vw] mobile:text-sm pointer-events-auto",
  })
};