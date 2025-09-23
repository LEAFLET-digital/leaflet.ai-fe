/**
 * Utility functions for the application
 */

// Re-export constants
export * from "./constants";

/**
 * Combine CSS classes conditionally
 * @param {...(string|object|array)} classes - Classes to combine
 * @returns {string} Combined class string
 */
export function cn(...classes) {
  return classes.flat().filter(Boolean).join(" ");
}

/**
 * Format camera status for display
 * @param {string} status - Camera status
 * @returns {object} Status configuration
 */
export function formatCameraStatus(status) {
  const statusMap = {
    Online: { variant: "success", color: "bg-green-400" },
    Offline: { variant: "danger", color: "bg-red-400" },
    Warning: { variant: "warning", color: "bg-yellow-400" },
  };

  return statusMap[status] || { variant: "default", color: "bg-gray-400" };
}

/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Generate unique ID
 * @returns {string} Unique identifier
 */
export function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * Format file size in human readable format
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size string
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Format duration in human readable format
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration string
 */
export function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  } else {
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  }
}

/**
 * Validate camera data
 * @param {object} camera - Camera object to validate
 * @returns {object} Validation result
 */
export function validateCamera(camera) {
  const errors = [];

  if (!camera.name || camera.name.trim() === "") {
    errors.push("Camera name is required");
  }

  if (!camera.location || camera.location.trim() === "") {
    errors.push("Camera location is required");
  }

  if (!["Online", "Offline", "Warning"].includes(camera.status)) {
    errors.push("Invalid camera status");
  }

  if (typeof camera.fps !== "number" || camera.fps < 0) {
    errors.push("Invalid FPS value");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Filter cameras based on search term
 * @param {array} cameras - Array of camera objects
 * @param {string} searchTerm - Search term
 * @returns {array} Filtered cameras
 */
export function filterCameras(cameras, searchTerm) {
  if (!searchTerm.trim()) return cameras;

  const term = searchTerm.toLowerCase();
  return cameras.filter(
    (camera) =>
      camera.name.toLowerCase().includes(term) ||
      camera.location.toLowerCase().includes(term)
  );
}

/**
 * Sort cameras by given field
 * @param {array} cameras - Array of camera objects
 * @param {string} field - Field to sort by
 * @param {string} direction - Sort direction ('asc' or 'desc')
 * @returns {array} Sorted cameras
 */
export function sortCameras(cameras, field, direction = "asc") {
  return [...cameras].sort((a, b) => {
    let aValue = a[field];
    let bValue = b[field];

    if (typeof aValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (direction === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
}
