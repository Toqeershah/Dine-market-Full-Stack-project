import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className=" mt-14 mb-16 align-items: center">
      <SignIn />
    </div>
  );
}
