import { IconCircleCheck, IconExclamationCircle, IconX } from "@tabler/icons-react";
import ReactHotToast from "react-hot-toast";

import { cn } from "./cn";

type ToastProps = {
  title: string;
  description?: string;
  type?: "success" | "error";
};

export function toast({ title, description, type = "success" }: ToastProps) {
  return ReactHotToast.custom(
    (t) => (
      <div
        className={cn(
          "flex w-full flex-col items-center space-y-4 sm:items-end",
          t.visible ? "animate-enter" : "animate-leave"
        )}
      >
        <div className="w-full max-w-sm overflow-hidden bg-white border-2 border-black shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                {type === "success" ? (
                  <IconCircleCheck className="w-6 h-6 text-green-400" aria-hidden="true" />
                ) : (
                  <IconExclamationCircle className="w-6 h-6 text-red-400" aria-hidden="true" />
                )}
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-sm font-medium text-gray-900">{title}</p>
                <p className="mt-1 text-sm text-gray-700">{description}</p>
              </div>
              <div className="flex flex-shrink-0 ml-4">
                <button
                  type="button"
                  className="inline-flex text-gray-700 bg-white rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                  onClick={() => ReactHotToast.remove(t.id)}
                >
                  <span className="sr-only">Close</span>
                  <IconX className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      duration: 2000,
    }
  );
}
