export function useAuth() {
    return {
      signInWithCredentials: async ({ email, password }) => {
        console.log("🔐 Mock sign-in:", email, password);
        // Simulate network delay
        return new Promise((resolve) => setTimeout(resolve, 1000));
      },
      signUpWithCredentials: async ({ email, password }) => {
        console.log("📝 Mock sign-up:", email, password);
        // Simulate network delay
        return new Promise((resolve) => setTimeout(resolve, 1000));
      }
    };
  }
  