import React, { useState } from "react";
import SearchInput from "../components/SearchInput";
import PlacesList from "../components/Places/PlacesList";
import Container from "../components/Container";

export default function Home() {
  const [search, setSearch] = useState("");
  return (
    <Container className="flex min-h-[calc(100vh-100px)] flex-col items-center">
      <SearchInput search={search} setSearch={setSearch} />
      <PlacesList search={search} />
    </Container>
  );
}
