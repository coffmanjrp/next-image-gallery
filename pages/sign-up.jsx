import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { createUser } from '@/firebase/db';
import { Layout } from '@/components/index';
import { toast } from 'react-toastify';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const { name, email, password, confirmPassword } = formData;
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    try {
      await createUser(formData);

      setLoading(true);

      router.push('/');
    } catch (error) {
      toast.error('Something with wrong with the registration');
    }
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center space-y-16 px-3 md:px-14 w-full h-screen">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="form-control space-y-8">
            <div className="relative">
              <label className="input-group input-group-vertical input-group-md">
                <span>Name</span>
                <input
                  type="text"
                  id="name"
                  className="input input-bordered input-md"
                  value={name}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="relative">
              <label className="input-group input-group-vertical input-group-md">
                <span>Email</span>
                <input
                  type="email"
                  id="email"
                  className="input input-bordered input-md"
                  value={email}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="relative">
              <label className="input-group input-group-vertical input-group-md">
                <span>Password</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="input input-bordered input-md"
                  autoComplete="off"
                  value={password}
                  onChange={handleChange}
                />
              </label>
              <button
                type="button"
                className="btn btn-ghost absolute top-1/3 right-1"
                onClick={() => setShowPassword((prevState) => !prevState)}
              >
                {showPassword ? (
                  <AiOutlineEye size="2rem" />
                ) : (
                  <AiOutlineEyeInvisible size="2rem" />
                )}
              </button>
            </div>
            <div className="relative">
              <label className="input-group input-group-vertical input-group-md">
                <span>Confirm Password</span>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  className="input input-bordered input-md"
                  autoComplete="off"
                  value={confirmPassword}
                  onChange={handleChange}
                />
              </label>
              <button
                type="button"
                className="btn btn-ghost absolute top-1/3 right-1"
                onClick={() =>
                  setShowConfirmPassword((prevState) => !prevState)
                }
              >
                {showConfirmPassword ? (
                  <AiOutlineEye size="2rem" />
                ) : (
                  <AiOutlineEyeInvisible size="2rem" />
                )}
              </button>
            </div>
            <button
              type="submit"
              className={`btn btn-block btn-primary uppercase ${
                loading ? 'loading' : ''
              }`}
            >
              Sign Up
            </button>
          </div>
        </form>
        <Link href="/sign-in">
          <a className="text-secondary font-bold text-lg">Sign In instead</a>
        </Link>
      </div>
    </Layout>
  );
};

export default SignUpPage;
