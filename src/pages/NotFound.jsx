import ErrorPage from "../components/ErrorPage";

export default function NotFound() {
  return (
    <ErrorPage
      code="404"
      message="Halaman yang kamu cari tidak ditemukan"
      image="/public/img/error-404.png"  
    />
  );
}