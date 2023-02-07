import { useCallback, useState } from "react";

export const useClientNode = () => {
  const [node, setNode] = useState(null as HTMLElement | null);
  const ref = useCallback((node: HTMLElement | null) => {
    if (node !== null) {
      setNode(node);
    }
  }, []);
  return [node, ref] as const;
};

export default useClientNode;