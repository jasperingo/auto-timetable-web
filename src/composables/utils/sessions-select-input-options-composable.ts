import { computed } from "vue";

export function useSessionsSelectInputOptions() {
  return computed(() => {
    const year = new Date().getFullYear();

    const options: { text: string; value: number }[] = [];

    for (let i = year; i > 2000; i--) {
      options.push({ text: `${i - 1}/${i}`, value: i });
    }

    return options;
  });
}
