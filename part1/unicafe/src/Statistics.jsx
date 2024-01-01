const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  return (
    <>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>all: {total}</p>
      <p>average: {(good - bad) / (total ? total : 1)}</p>
      <p>positive: {good / (total ? total : 1)}%</p>
    </>
  );
};

export default Statistics;
