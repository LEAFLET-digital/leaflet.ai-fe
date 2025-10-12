// Authentication API service for centralized auth-related requests
class AuthService {
  constructor() {
    this.baseURL = import.meta.env.VITE_BACKEND_API_URL;
  }

  // Helper method to make authenticated requests
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;

    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // Always include cookies for refresh token
      ...options,
    };

    try {
      const response = await fetch(url, defaultOptions);
      const data = await response.json().catch(() => ({}));

      return {
        ok: response.ok,
        status: response.status,
        data,
      };
    } catch (error) {
      console.error(`Request to ${endpoint} failed:`, error);
      return {
        ok: false,
        status: 0,
        data: { error: "Network error. Please check your connection." },
      };
    }
  }

  // Login user
  async login(email, password) {
    return this.makeRequest("/api/user/login-user/", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  // Sign up new user
  async signup(email, password, additionalData = {}) {
    return this.makeRequest("/api/user/signup-user/", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        ...additionalData,
      }),
    });
  }

  // Refresh access token using httpOnly refresh token cookie
  async refreshToken() {
    return this.makeRequest("/api/user/refresh-token/", {
      method: "POST",
    });
  }

  // Logout user
  async logout(accessToken) {
    const headers = accessToken
      ? {
          Authorization: `Bearer ${accessToken}`,
        }
      : {};

    return this.makeRequest("/api/user/logout-user/", {
      method: "POST",
      headers,
    });
  }

  // Get user profile
  async getUserProfile(accessToken) {
    if (!accessToken) {
      return {
        ok: false,
        status: 401,
        data: { error: "No access token provided" },
      };
    }

    return this.makeRequest("/api/user/user-info/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  }

  // Update user profile
  async updateUserProfile(accessToken, profileData) {
    if (!accessToken) {
      return {
        ok: false,
        status: 401,
        data: { error: "No access token provided" },
      };
    }

    return this.makeRequest("/api/user/user-info/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(profileData),
    });
  }

  // Check if token is expired (helper method)
  isTokenExpired(token) {
    if (!token) return true;

    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;
      return payload.exp < currentTime;
    } catch (error) {
      console.error("Error checking token expiration:", error);
      return true;
    }
  }

  // Get token payload (helper method)
  getTokenPayload(token) {
    if (!token) return null;

    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.error("Error parsing token payload:", error);
      return null;
    }
  }
}

// Create and export singleton instance
const authService = new AuthService();
export default authService;
