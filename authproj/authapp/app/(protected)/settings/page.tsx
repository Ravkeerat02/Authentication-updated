import { auth, signOut } from "../../../auth";

const settingPage = async () => {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      {/* mainly for server side */}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default settingPage;
