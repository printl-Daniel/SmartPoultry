import Swal from "sweetalert2";

// Inject minimal elegant styles
(function injectStyles() {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = `
    .alert-popup {
      border-radius: 10px;
      padding: 1.25rem;
      box-shadow: 0 4px 14px rgba(0,0,0,0.1);
      font-family: system-ui, sans-serif;
    }

    .alert-title {
      font-weight: 600;
      font-size: 1.3rem;
      margin-bottom: 0.5rem;
    }

    .alert-content {
      font-size: 0.95rem;
      color: #444;
    }

    .alert-btn {
      border-radius: 6px !important;
      padding: 0.5rem 1rem !important;
      font-size: 0.9rem !important;
      font-weight: 500 !important;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1) !important;
      border: none !important;
      transition: all 0.2s ease !important;
    }

    .alert-btn:hover {
      transform: translateY(-1px) !important;
      box-shadow: 0 5px 10px rgba(0,0,0,0.15) !important;
    }

    .toast-popup {
      border-radius: 8px;
      padding: 0.75rem 1rem;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      max-width: 320px;
      font-family: system-ui, sans-serif;
    }

    .toast-title {
      font-weight: 600;
      font-size: 1rem;
    }

    .toast-content {
      font-size: 0.85rem;
      color: #444;
    }
  `;
  document.head.appendChild(styleTag);
})();

// ===== Common Configs =====

const commonClasses = {
  popup: "alert-popup",
  title: "alert-title",
  content: "alert-content",
  confirmButton: "alert-btn",
  cancelButton: "alert-btn",
};

const showAnim = { popup: "animate__animated animate__fadeIn animate__faster" };
const hideAnim = {
  popup: "animate__animated animate__fadeOut animate__faster",
};

// ===== Alert Functions =====

export function successAlert(title = "Success", text = "", options = {}) {
  return Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonColor: "#4CAF50",
    confirmButtonText: "OK",
    showClass: showAnim,
    hideClass: hideAnim,
    customClass: commonClasses,
    backdrop: "rgba(0,0,0,0.3)",
    ...options,
  });
}

export function errorAlert(title = "Error", text = "", options = {}) {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: "#E53935",
    confirmButtonText: "OK",
    showClass: showAnim,
    hideClass: hideAnim,
    customClass: commonClasses,
    backdrop: "rgba(0,0,0,0.3)",
    ...options,
  });
}

export function infoAlert(title = "Info", text = "", options = {}) {
  return Swal.fire({
    icon: "info",
    title,
    text,
    confirmButtonColor: "#2196F3",
    confirmButtonText: "OK",
    showClass: showAnim,
    hideClass: hideAnim,
    customClass: commonClasses,
    backdrop: "rgba(0,0,0,0.3)",
    ...options,
  });
}

export function confirmAlert(
  title = "Are you sure?",
  text = "This action cannot be undone.",
  confirmText = "Yes",
  cancelText = "Cancel",
  options = {}
) {
  return Swal.fire({
    icon: "question",
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    confirmButtonColor: "#4CAF50",
    cancelButtonColor: "#E0E0E0",
    showClass: showAnim,
    hideClass: hideAnim,
    customClass: commonClasses,
    backdrop: "rgba(0,0,0,0.3)",
    ...options,
  });
}

// ===== Toast Function =====

export function toastAlert(
  title = "",
  text = "",
  icon = "success",
  options = {}
) {
  return Swal.fire({
    toast: true,
    position: options.position || "top-end",
    icon,
    title,
    text,
    showConfirmButton: false,
    timer: options.timer || 2500,
    timerProgressBar: true,
    customClass: {
      popup: "toast-popup",
      title: "toast-title",
      content: "toast-content",
    },
    ...options,
  });
}
