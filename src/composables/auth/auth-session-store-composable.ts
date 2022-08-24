export function useAuthSessionStore() {
  const save = (userId: number, accessToken: string) => {
    window.sessionStorage.setItem("userId", String(userId));
    window.sessionStorage.setItem("accessToken", accessToken);
  };

  const get = () => ({
    userId: window.sessionStorage.getItem("userId"),
    accessToken: window.sessionStorage.getItem("accessToken"),
  });

  const clear = () => ({
    userId: window.sessionStorage.removeItem("userId"),
    accessToken: window.sessionStorage.removeItem("accessToken"),
  });

  return { save, get, clear };
}
