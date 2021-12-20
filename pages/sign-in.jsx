import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '@/firebase/config';
import { Layout } from '@/components/index';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const router = useRouter();

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user) {
        setLoading(true);
        router.push('/');
      }
    } catch (error) {
      toast.error('Bad User Credentials');
    }
  };

  return (
    <Layout>
      <div className="flex flex-col justify-center items-center space-y-16 px-3 md:px-14 w-full h-screen">
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="form-control space-y-8">
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
            <button
              type="submit"
              className={`btn btn-block btn-primary uppercase ${
                loading ? 'loading' : ''
              }`}
            >
              Sign In
            </button>
          </div>
        </form>
        <Link href="/sign-up">
          <a className="text-secondary font-bold text-lg">Sign Up instead</a>
        </Link>
      </div>
    </Layout>
  );
};

export default SignUpPage;
