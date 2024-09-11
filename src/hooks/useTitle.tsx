import { useEffect } from "react";

export const useTitle = (title: string) => {
  useEffect(() => {
    const oldTitle = document.title;
    if (title) {
      document.title = title;
    }
    return () => {
      document.title = oldTitle;
    };
  }, [title]);
};
