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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login successful");
      router.push("/");
    } catch (err) {
      const message = err.response?.data?.message ?? "Something went wrong";
      toast.error(message);
      setLoading(false);
    }
  };

  return (
    <Container className="flex min-h-[calc(100vh-100px)] flex-col max-w-7xl mx-auto px-4">
      <div className="flex-1 flex-grow">
        <Form
          label="Login"
          handleClick={handleSubmit}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          buttonLabel={loading ? "Logging in..." : "Login"}
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
