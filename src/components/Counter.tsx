"use client";

import { useCounterStore } from "@/store/store";
import { Button } from "@/components/ui/button";

export default function Counter() {
  const { count, increment, decrement, incrementAsync } = useCounterStore(
    (state) => state
  );

  return (
    <div>
      <Button variant="outline" onClick={() => increment()}>
        Increment
      </Button>
      <p className="text-2xl font-semibold">Count: {count}</p>
      <Button variant="outline" onClick={() => decrement()}>
        Decrement
      </Button>
    </div>
  );
}
