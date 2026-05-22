import ErrorPage from "../components/ErrorPage";

export default function BadRequest() {
  return (
    <ErrorPage
      code="400"
      message="Permintaan tidak valid"
      image="/public/img/invalid.png" 
    />
  );
}