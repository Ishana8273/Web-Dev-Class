function Counter({
  index,
  count,
  onIncrease,
  onDecrease,
  onReset
}) {

  return (
    <div>

      <h2>
        Counter {index + 1}
      </h2>

      <h3>
        {count}
      </h3>

      <button onClick={() => onDecrease(index)}>
        -
      </button>

      <button onClick={() => onIncrease(index)}>
        +
      </button>

      <br />

      <button onClick={() => onReset(index)}>
        Reset
      </button>

    </div>
  );
}

export default Counter;