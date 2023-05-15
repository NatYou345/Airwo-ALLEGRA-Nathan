import axios from "axios";
import Container from "../../../components/Container";
import Form from "../../../components/auth/Form";
import Link from "next/link";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    console.log(email, password, name);
    try {
      const res = await axios.post("/api/auth/register", {
        email,
        password,
        name,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.status === 200) {
        toast.success("Sign in successful");
      }
      router.push("/auth/login");
    } catch (err) {
      setError(err.response.data.error);
      console.log(error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <Container className="flex min-h-[calc(100vh-100px)] flex-col max-w-7xl mx-auto px-4">
      <div className="flex-1 flex-grow">
        <Form
          label="Register"
          handleClick={(e) => handleSubmit(e)}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          buttonLabel="Register"
        />
        <Link href="/auth/login" className="text-sm font-medium text-gray-500">
          {"Already have an account? Login"}
        </Link>
      </div>
    </Container>
  );
}
