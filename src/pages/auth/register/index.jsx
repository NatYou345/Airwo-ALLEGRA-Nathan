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
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", {
        email,
        password,
        name,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Registration successful");
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
          label="Register"
          handleClick={handleSubmit}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          buttonLabel={loading ? "Registering..." : "Register"}
        />
        <Link href="/auth/login" className="text-sm font-medium text-gray-500">
          {"Already have an account? Login"}
        </Link>
      </div>
    </Container>
  );
}
