
const MyComponent = () => {
  const arrayData = [1, 2, 3, 4, 5];

  return (
    <div>
      <h1>Array Mapping</h1>
      <ul>
        {arrayData.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;
