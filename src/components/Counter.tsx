"use client";

import { useCounterStore } from "@/store/store";

export default function Counter() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <div>
      <button onClick={() => increment()}>Increment</button>
      <p>Count: {count}</p>
      <button onClick={() => decrement()}>Decrement</button>
    </div>
  );
}
