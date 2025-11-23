import { Id } from "../../convex/_generated/dataModel";

interface TokenPayload {
  userId: Id<"users">;
  email: string;
  fullName: string;
  iat?: number;
  exp?: number;
}

// Store token in localStorage
export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

// Get token from localStorage
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Remove token (logout)
export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('currentUser');
};

// Decode JWT (without verification - verification happens on backend)
export const decodeToken = (token: string): TokenPayload | null => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    const payload = JSON.parse(jsonPayload);
    
    // Check if token is expired
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null;
    }
    
    return payload;
  } catch {
    return null;
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  if (!token) return false;
  
  const payload = decodeToken(token);
  return payload !== null;
};

// Get current user from token
export const getCurrentUserFromToken = (): TokenPayload | null => {
  const token = getAuthToken();
  if (!token) return null;
  
  return decodeToken(token);
};