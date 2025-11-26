/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
export interface UserData {
  name: string;
  email: string;
  ageRange?: string;
  country?: string;
  deviceUsed?: string;
  survivorStage?: string;
}
export type User = {
  userId: string;
  email: string;
  fullName: string;
};
export interface Message {
  id: number;
  content: string;
  date: string;
}

export const getMessages = (): Message[] => {
  return JSON.parse(localStorage.getItem('messages') || '[]');
};

export const addMessage = (content: string): void => {
  const messages = getMessages();
  const newMessage = {
    id: Date.now(),
    content,
    date: new Date().toLocaleString(),
  };
  localStorage.setItem('messages', JSON.stringify([...messages, newMessage]));
};

export const setUser = (user: UserData): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = (): UserData | null => {
  const data = localStorage.getItem('user');
  return data ? (JSON.parse(data) as UserData) : null;
};

export const clearUser = (): void => {
  localStorage.removeItem('user');
  localStorage.removeItem('messages');
};

export const getUserFromStorage = (): User => {
  const data = localStorage.getItem('currentUser');
  return data ? (JSON.parse(data) as User) : { userId: '', email: '', fullName: '' };
};
