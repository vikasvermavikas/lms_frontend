import { Link, useNavigate } from "react-router-dom";

const NoPage = () => {
  const currentuser = localStorage.getItem('USER');
  return (
    <>
      <div class="container-fluid">


        <div class="text-center">
          <div class="error mx-auto" data-text="404">404</div>
          <p class="lead text-gray-800 mb-5">Page Not Found</p>
          <p class="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
          <Link to={currentuser ? '/user/dashboard' : '/'}>&larr; Back to Home</Link>
        </div>

      </div>
    </>
  );
};

export default NoPage;