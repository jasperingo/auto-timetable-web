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

  const saveStudent = (userId: number, accessToken: string) => {
    window.sessionStorage.setItem("studentUserId", String(userId));
    window.sessionStorage.setItem("studentAccessToken", accessToken);
  };

  const getStudent = () => ({
    userId: window.sessionStorage.getItem("studentUserId"),
    accessToken: window.sessionStorage.getItem("studentAccessToken"),
  });

  const clearStudent = () => ({
    userId: window.sessionStorage.removeItem("studentUserId"),
    accessToken: window.sessionStorage.removeItem("studentAccessToken"),
  });

  return { save, get, clear, saveStudent, getStudent, clearStudent };
}
