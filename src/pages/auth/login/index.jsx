import axios from "axios";
import Container from "../../../components/Container";
import Form from "../../../components/auth/Form";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
      try {
      const res = await axios.post("/api/auth/login", {
        email,password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.status === 200) {
        toast.success("Login successful", {
        });
      }
      router.push("/");
    } catch (err) {
      setError(err.response.data.error);
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Container className="flex min-h-[calc(100vh-100px)] flex-col max-w-7xl mx-auto px-4">
      <div className="flex-1 flex-grow">
        <Form
          label="Login"
          handleClick={(e) => handleSubmit(e)}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          buttonLabel="Login"
        />
        <Link
          href="/auth/register"
          className="text-sm font-medium text-gray-500"
        >
          {"Don't have an account? Sign up"}
        </Link>
      </div>
    </Container>
  );
}
