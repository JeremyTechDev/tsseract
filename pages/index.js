import Link from 'next/link';

const App = () => {
  return (
    <div>
      <h1>Tsseract</h1>
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  );
};

export default App;
