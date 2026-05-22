import ErrorPage from "../components/ErrorPage";

export default function Forbidden() {
  return (
    <ErrorPage
      code="403"
      message="Akses ditolak"
      image="/public/img/restriction.png" 
    />
  );
}