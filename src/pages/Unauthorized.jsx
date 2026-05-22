import ErrorPage from "../components/ErrorPage";

export default function Unauthorized() {
  return (
    <ErrorPage
      code="401"
      message="Kamu belum login / tidak punya akses"
      image="/public/img/unauthorized.png" 
    />
  );
}