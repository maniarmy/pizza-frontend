import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';
import Username from '../features/user/Username';
import Header from './Header';

function Error() {
  const error = useRouteError();
  console.log(error);

  return (
    <>
    <Header />
    <div className='my-10 px-4 text-center sm:my-16 bg-pink-100 text-4xl h-lvh'>
      <h1>Something went wrong</h1>
      <Username></Username>
      <p>{error.data || error.message}</p>

      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
    </>
  );
}

export default Error;
