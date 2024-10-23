import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';

function Home() {
  const username = useSelector((state) => state.user.username);

  return (
    <div className="my-10 px-4 text-center sm:my-16">
      <h1 className="mb-8  text-xl font-semibold md:text-3xl text-yellow-700">
        The Best Online Pizza Delivery Application.
        <br /> <br />
        <span className="italic text-stone-950">
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {/* <Button
  to={
    username === '' ? '#' :
    username === 'admin123' ? '/admin' :
    '/menu'
  }
  type="primary"
>
  {
    username === '' ? 'Create User' :
    username === 'admin123' ? 'as an admin' :
    `Continue ordering, ${username}`
  }
</Button> */}


{username === 'admin123' && (
    <Button to="/admin" type="primary">
      admin
    </Button>
  ) }

{
  username !== 'admin123' ? (
    <CreateUser />
  ) : (
    <Button to="/menu" type="primary">
      Continue ordering, {username}
    </Button>
  )
}

    </div>
  );
}

export default Home;
